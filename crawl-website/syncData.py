import configparser
import requests
import json
import os
import concurrent.futures
import unicodedata
import re

# CONFIG
config = configparser.ConfigParser()
config.read('config.ini')

TokenAdmin = config['DEFAULT']['TokenAdmin']
ApiUrl = config['DEFAULT']['ApiUrl']
M3u8ApiUrl = config['DEFAULT']['M3u8ApiUrl']
ServerM3u8 = config['DEFAULT']['ServerM3u8']
ImageApiUrl = config['DEFAULT']['ImageApiUrl']

def normalize_text(text):
    # Chuẩn hóa văn bản
    normalized_text = unicodedata.normalize('NFKC', text)
    cleaned_data = re.sub(r'\s+', ' ', normalized_text).strip()
    cleaned_data = re.sub(r'\xa0', '', cleaned_data)
    return cleaned_data

class M3u8:
    def __init__(self, id):
        self.id = id

    def get_m3u8_links(self, source_url):
        response = requests.get(source_url, headers={
            "referer": "https://vuighe3.com",
        })
        response.raise_for_status()
        lines = response.text.splitlines()
        m3u8_links = [ServerM3u8 + line for line in lines if line.endswith('.m3u8')]
        return m3u8_links

    def download_m3u8_file(self, url):
        response = requests.post(url=f"{ApiUrl}/proxy/convert", json={
            "m3u8_link": url,
            "header_custom": {
                "Origin": "https://vuighe3.com/",
                "Referer": "https://vuighe3.com/"
            }
        })
        response.raise_for_status()
        return response.content

    def upload_file(self, file_content, upload_url):
        files = {'fileToUpload': ('file.m3u8', file_content)}
        response = requests.post(upload_url, files=files, data={
            "id": self.id
        })
        response.raise_for_status()
        return response.json()['fileName']

    def process_m3u8_files(self, source_url, upload_url):
        m3u8_links = self.get_m3u8_links(source_url)
        new_links = []

        with concurrent.futures.ThreadPoolExecutor() as executor:
            # Tải xuống các file m3u8 đồng thời
            download_futures = {executor.submit(self.download_m3u8_file, link): link for link in m3u8_links}
            for future in concurrent.futures.as_completed(download_futures):
                file_content = future.result()
                # Upload các file m3u8 đồng thời
                upload_future = executor.submit(self.upload_file, file_content, upload_url)
                new_links.append(upload_future.result())

        return new_links

    def run(self, source_url, upload_url):
        new_links = self.process_m3u8_files(source_url, upload_url)
        response = requests.get(source_url, headers={
            "referer": "https://vuighe3.com",
        })
        response.raise_for_status()
        lines = response.text.splitlines()

        # Thay thế các link cũ bằng các link mới
        new_lines = []
        link_index = 0
        for line in lines:
            if line.endswith('.m3u8'):
                new_lines.append(new_links[link_index])
                link_index += 1
            else:
                new_lines.append(line)

        # Upload file m3u8 đã cập nhật lên server
        updated_content = '\n'.join(new_lines)
        updated_link = self.upload_file(updated_content.encode('utf-8'), upload_url)

        return updated_link

def upload_image(image_url):
    global ImageApiUrl
    # Tải hình ảnh từ liên kết
    image_response = requests.get(image_url)
    if image_response.status_code == 200:
        # Lưu hình ảnh tạm thời
        with open("temp_image.jpg", "wb") as temp_image:
            temp_image.write(image_response.content)
        
        # Upload hình ảnh lên server
        with open("temp_image.jpg", "rb") as image_file:
            files = {'fileToUpload': image_file}
            response = requests.post(ImageApiUrl, files=files)

        # remove temp
        os.remove("temp_image.jpg")
        # Kiểm tra kết quả
        if response.status_code == 200:
            res = response.json()
            return f"{res['server_url']}/{res['link']}"
        
    return None
class ImportDataMovie:
    


    def handleData(self, dataFactory):
        
        data = {
            "movie_id_cache": dataFactory['ID Movie'],
            "movie_name": dataFactory['Title'],
            "movie_name_other": normalize_text(dataFactory['Movie name other']),
            "release": "2024",
            "status": True,
            "categories": dataFactory['Genres'],
            "episodes_counter": None if dataFactory.get('Episodes max') == "???" or dataFactory.get('Episodes max') == "??" else dataFactory.get('Episodes max'),
            "description": dataFactory.get('Description') or "Chưa có thông tin",
            "banner_image[0]": upload_image(dataFactory['Image URL']),
            "movie_image[0]": upload_image(dataFactory['Image URL']) if dataFactory['Banner URL'] == "" else upload_image(dataFactory['Banner URL']),
        }
        data['dataDefault'] = json.dumps(data, ensure_ascii=False)
        data.update({f'categories[{i}]': category for i, category in enumerate(dataFactory['Genres'])})
        print(dataFactory['ID Movie'])
        return data
         
    def run(self):
        with open('movies.json', 'r', encoding='utf-8') as file:
            for line in file:
                data = self.handleData(json.loads(line.strip()))
                response = requests.post(url=f"{ApiUrl}/admin/movies/upsert", data=data, headers={
                    "authorization": TokenAdmin
                }).json()
                print(response)
                with open('movie_sync.json', 'a', encoding='utf-8') as f:
                    f.write(json.dumps({
                        "movie_id": data['movie_id_cache'], 
                        "movie_sync_id": response['data']['id']
                    }, ensure_ascii=False) + '\n')

class ImportDetailMovie:
    def getIdSync(self, movie_id):
        with open("movie_sync.json", 'r', encoding='utf-8') as file:
            for line in file:
                movie = json.loads(line)
                if movie['movie_id'] == movie_id:
                    return movie['movie_sync_id']
                
        path_nonsync = "movie_nonsync.json"
        if os.path.exists(path_nonsync):
            with open(path_nonsync, 'r', encoding='utf-8') as file:
                if any(movie['movie_id'] == movie_id for movie in map(json.loads, file)):
                    return None  # Nếu movie_id đã tồn tại, không lưu và trả về None

        with open(path_nonsync, 'a', encoding='utf-8') as file:
            file.write(json.dumps({"movie_id": movie_id}, ensure_ascii=False) + '\n')
        return None

    def handleData(self, movieIdSync, data, m3u8Url):
        data = {
            "idMovie": movieIdSync,
            "data": [
                {
                    "id": 0,
                    "idEpisode": None,
                    "episode_name": data['Episode name'],
                    "episode_image": upload_image(data['Thumbnail medium']),
                    "status": True,
                    "servers": [
                        {
                            "id": 0,
                            "idSource": None,
                            "status": True,
                            "server_name": "GV",
                            "server_source": f"http://localhost:80{m3u8Url}"
                        }
                    ]
                }
            ]
        }
        return data

    def uploadEpisode(self, payload):
        response = requests.post(f"{ApiUrl}/admin/episodes/upsert", json=payload, headers={
                    "authorization": TokenAdmin
        }).json()
        return response
    
    def run(self):
        global M3u8ApiUrl
        with open('episodes4.json', 'r', encoding='utf-8') as file:
            for line in file:
                data = json.loads(line.strip())
                movieIdSync = self.getIdSync(data['ID Movie'])
                if data['Sources m3u8'] is None:
                    with open("nonsource.json", 'a', encoding='utf-8') as file:
                        file.write(json.dumps({"movie_id": data['ID Movie'], "movie_sync_id": movieIdSync}, ensure_ascii=False) + '\n')
                else:
                    m3u8Url = M3u8(id=movieIdSync).run(source_url=data['Sources m3u8'],upload_url=M3u8ApiUrl)
                    payload = self.handleData(movieIdSync, data=data, m3u8Url=m3u8Url)
                    res = self.uploadEpisode(payload)
                    print(res)

if __name__ == '__main__':
    # ImportDataMovie().run()
    print("DONE: create movie")
    ImportDetailMovie().run()
