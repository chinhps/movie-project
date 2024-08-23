import requests
from bs4 import BeautifulSoup
import pandas as pd
import logging
from typing import List

# # URL của trang web bạn muốn crawl
# url = 'https://vuighe3.com/anime'

# # # Gửi yêu cầu HTTP GET đến trang web và lấy nội dung trang
# # response = requests.get(url)
# # web_content = response.content
# # # print(web_content)
# # # Tạo đối tượng BeautifulSoup để phân tích cú pháp HTML

# soup = BeautifulSoup(requests.get("https://vuighe3.com/tokidoki-bosotto-russia-go-de-dereru-tonari-no-alya-san/tap-1-alya-giau-cam-xuc-cua-minh-bang-tieng-nga").content, 'html.parser')
# print(soup)

# Danh sách để lưu trữ dữ liệu

SERVER_M3U8 = "https://s680.imacdn.com"

data = []

logging.basicConfig(
    format='%(asctime)s %(levelname)s:%(message)s',
    level=logging.INFO)

def is_empty(obj):
    # Kiểm tra xem obj có phải là dictionary hoặc list và nếu nó rỗng
    return (isinstance(obj, dict) or isinstance(obj, list)) and not obj

class Crawler:
    def __init__(self, urls=[]):
        self.visited_urls = []
        self.urls_to_visit = urls
        
    def getSection(self, soup):
        sections = soup.find_all('div', class_='tray-item')
        return sections
    
    def download_url(self, url):
        return requests.get(url).content

    def getTotalPage(self, soup):
        input_tag = soup.find('input', {'name': 'total-item'})
        total_item_value = input_tag['value'] if input_tag else None
        return total_item_value

    def getCurrentPage(self, soup):
        input_tag = soup.find('input', {'name': 'current-page'})
        currentPage = input_tag['value'] if input_tag else None
        return currentPage
    
    def add_url_to_visit(self, url):
        if url not in self.visited_urls and url not in self.urls_to_visit:
            self.urls_to_visit.append(url)

    def crawl(self, url):
        html = self.download_url(url)
        soup = BeautifulSoup(html, 'html.parser')
        page = int(self.getTotalPage(soup)) / 24 # 6 * 4
        currentPage = int(self.getCurrentPage(soup)) + 1
        if page > currentPage:
            self.add_url_to_visit(f"https://vuighe3.com/anime/trang-{currentPage}")
        for section in self.getSection(soup):
            # Lấy dữ liệu từ các tag và thuộc tính tương ứng
            image_url = section.find('img').get('data-src')
            title = section.find('div', class_='tray-item-title').text.strip()
            a_tag = (section.find('a'))
            urlMovie = a_tag['href'] if a_tag else None
            
            episodesData = section.find('div', class_='tray-film-update').text.strip()
            if 'tập' in episodesData:
                current, total = episodesData.split('/')
                currentEpisode = current.strip()
                totalEpisodes = total.strip().replace(' tập', '')
            elif 'phút' in episodesData:
                duration = episodesData.replace(' phút', '')

            view_string_clean = section.find('div', class_='tray-film-views').text.strip().replace('lượt xem', '').replace(',', '')
            # Chuyển chuỗi thành số nguyên
            views = int(view_string_clean)

            responseDetail = requests.get(f"https://vuighe3.com{urlMovie}").content
            movieDetail = BeautifulSoup(responseDetail, 'html.parser')

            div_tag = movieDetail.find('div', class_='container play')
            movieId = div_tag['data-id'] if div_tag else None
            urlTrailer = div_tag['data-trailer'] if div_tag else None

            # Thêm dữ liệu vào danh sách
            data.append({
                'ID Movie': movieId,
                'Image URL': image_url,
                'Title': title,
                'Episodes current': currentEpisode if 'currentEpisode' in locals() else None,
                'Episodes max': totalEpisodes if 'totalEpisodes' in locals() else None,
                'Movie Duration (minutes)': duration if 'duration' in locals() else None,
                'Episode Default': episodesData,
                'Views': views,
                'URL Movie': urlMovie,
                'URL Trailer': urlTrailer
            })
            currentEpisode = None
            totalEpisodes = None
            duration = None
    
    def run(self):
        while self.urls_to_visit:
            url = self.urls_to_visit.pop(0)
            logging.info(f'Crawling: {url}')
            try:
                self.crawl(url)
            except Exception:
                logging.exception(f'Failed to crawl: {url}')
            finally:
                self.visited_urls.append(url)

dataEpisodes = []
class CrawlerDetail:
    def __init__(self, urls=[]):
        self.visited_movieIds = []
        self.movieIds_to_visit = urls

    def add_id_to_visit(self, id):
        if id not in self.visited_movieIds and id not in self.movieIds_to_visit:
            self.movieIds_to_visit.append(id)

    def getEpisodeList(self, id):
        return requests.get(f"https://vuighe3.com/api/v2/films/{id}/episodes?sort=name", headers={
            "x-requested-with": "XMLHttpRequest",
            "referer": "https://vuighe3.com",
            "Accept": "application/json"
        }).json()

    def getMovieDetail(self, idMovie, idEpisode, referer):
        return requests.get(f"https://vuighe3.com/api/v2/films/{idMovie}/episodes/{idEpisode}/true", headers={
            "x-requested-with": "XMLHttpRequest",
            "referer": f"https://vuighe3.com{referer}",
            "Accept": "application/json"
        }).json()
    
    def subtitleLink(self, subtitle):
        if is_empty(subtitle):
            return None
        return f"https://vuighe3.com/subtitle/{subtitle['vi']}.vtt"
    
    def m3u8Link(self, url) -> List[str]:
        data = requests.get(url, headers={
            "referer": "https://vuighe3.com",
        }).content
        data = data.decode('utf-8')
        if not is_empty(data):
            return [SERVER_M3U8 + line for line in data.split('\n') if line.endswith('.m3u8')]
        return []

    def decode_m3u8_data(self, encoded_str, id):
        key = id % 100
        decoded_str = ""
        
        for char in encoded_str:
            decoded_char = chr(ord(char) ^ key)
            decoded_str += decoded_char
        
        return decoded_str

    def getM3u8(self, source, id):
        if isinstance(source['m3u8'], dict) and not bool(source['m3u8']):
            return None
        return self.decode_m3u8_data(source['m3u8']['1'], id)

        
    def crawl(self):
        for idMovie in self.movieIds_to_visit:
            episodes = self.getEpisodeList(idMovie)
            for episode in episodes['data']:
                movieDetail = self.getMovieDetail(idMovie, episode['id'], episode['link'])
                # Thêm dữ liệu vào danh sách
                m3u8 = self.getM3u8(movieDetail['sources'], movieDetail['id'])
                episode_info = {
                    'ID Movie': idMovie,
                    'ID Episode': movieDetail['id'],
                    'Episode name': movieDetail['full_name'],
                    'Detail name': movieDetail['detail_name'],
                    'Views': movieDetail['views'],
                    'Thumbnail small': movieDetail['thumbnail_small'],
                    'Thumbnail medium': movieDetail['thumbnail_medium'],
                    'Subtitle link': self.subtitleLink(movieDetail['subtitle']),
                    'Sources m3u8': m3u8,
                }
                
                for index, link in enumerate(self.m3u8Link(m3u8), start=1):
                    episode_info[f'M3u8 {index}'] = link

                dataEpisodes.append(episode_info)


if __name__ == '__main__':
    Crawler(urls=['https://vuighe3.com/anime']).run()
    craw = CrawlerDetail()
    for movie in data:
        print(movie['ID Movie'])
    # craw.add_id_to_visit(id=6959)
    # craw.crawl()

# # Tạo DataFrame từ danh sách dữ liệu
# df = pd.DataFrame(dataEpisodes)

# # Lưu DataFrame vào file Excel
# df.to_excel('episode.xlsx', index=False)


# # Tạo DataFrame từ danh sách dữ liệu
# df = pd.DataFrame(data)

# # Lưu DataFrame vào file Excel
# df.to_excel('output.xlsx', index=False)
