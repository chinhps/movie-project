import requests
from bs4 import BeautifulSoup
import pandas as pd
import logging
from typing import List
import random
import time
import json
import configparser

# CONFIG
config = configparser.ConfigParser()
config.read('config.ini')

TokenAdmin = config['DEFAULT']['TokenAdmin']

# Check proxy
def get_proxy(api_key):
    payload = { "api_key": api_key }
    response = requests.post("https://tmproxy.com/api/proxy/get-current-proxy", json=payload).json()
    return response

# Check and create new proxy
def proxy(api_keys, type = 'default'):
    api_key = random.choice(api_keys)
    proxyData = get_proxy(api_key)
    if proxyData['code'] == 27 or type == "change":
        # create new proxy
        payload = {
            "api_key": random.choice(api_keys),
            "sign": "string",
            "id_location": 1
        }
        newProxyData = requests.post("https://tmproxy.com/api/proxy/get-new-proxy", json=payload).json()
        if newProxyData['code'] == 0:
            return newProxyData['data']['https']
    if proxyData['code'] == 0:
        return proxyData['data']['https']

    return None

API_KEY_PROXY = ["aafa6d4682f4b366c983acfdd8354dae"]

proxy_current = None

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
            genres = [a.text for a in movieDetail.select('.film-info-genre a')]
            other_name = movieDetail.find_all('div', class_='film-info-genre')[1].text.strip()
            description = movieDetail.find('div', class_='film-info-description').text.strip()
            div_tag = movieDetail.find('div', class_='container play')
            movieId = div_tag['data-id'] if div_tag else None
            urlTrailer = div_tag['data-trailer'] if div_tag else None

            # Thêm dữ liệu vào danh sách
            movieInfo = {
                'ID Movie': movieId,
                'Image URL': image_url,
                'Title': title,
                'Movie name other': other_name,
                'Genres': genres,
                'Description': description,
                'Episodes current': currentEpisode if 'currentEpisode' in locals() else None,
                'Episodes max': totalEpisodes if 'totalEpisodes' in locals() else None,
                'Movie Duration (minutes)': duration if 'duration' in locals() else None,
                'Episode Default': episodesData,
                'Views': views,
                'URL Movie': urlMovie,
                'URL Trailer': urlTrailer
            }
            data.append(movieInfo)
            with open('episodes.json', 'a', encoding='utf-8') as f:
                f.write(json.dumps(movieInfo, ensure_ascii=False) + '\n')
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
    def __init__(self, ids=[]):
        self.visited_movieIds = []
        self.movieIds_to_visit = ids

    def add_id_to_visit(self, id):
        if id not in self.visited_movieIds and id not in self.movieIds_to_visit:
            self.movieIds_to_visit.append(id)

    def getEpisodeList(self, id):
        global proxy_current
        while True:
            try:
                response = requests.get(f"https://vuighe3.com/api/v2/films/{id}/episodes?sort=name", headers={
                    "x-requested-with": "XMLHttpRequest",
                    "referer": "https://vuighe3.com",
                    "Accept": "application/json"
                }, proxies={'https': proxy_current})
                data = response.json()
                if 'message' in data:
                    time.sleep(60)
                    proxy_current = proxy(API_KEY_PROXY, 'change')
                    print("Change proxy getEpisodeList", id)
                    continue  # Thử lại yêu cầu với proxy mới
                return data
            except requests.exceptions.RequestException as e:
                print(f"Request failed: {e}, trying with new proxy.")
                time.sleep(30)
                proxy_current = proxy(API_KEY_PROXY, 'change')

    def getMovieDetail(self, idMovie, idEpisode, referer):
        global proxy_current
        while True:
            try:
                response = requests.get(f"https://vuighe3.com/api/v2/films/{idMovie}/episodes/{idEpisode}/true", headers={
                    "x-requested-with": "XMLHttpRequest",
                    "referer": f"https://vuighe3.com{referer}",
                    "Accept": "application/json"
                }, proxies={'https': proxy_current})
                data = response.json()
                if 'message' in data:
                    print("Change proxy getMovieDetail", idMovie, idEpisode, proxy_current)
                    time.sleep(60)
                    proxy_current = proxy(API_KEY_PROXY, 'change')
                    continue  # Thử lại yêu cầu với proxy mới
                return data
            except requests.exceptions.RequestException as e:
                print(f"Request failed: {e}, trying with new proxy.")
                time.sleep(30)
                proxy_current = proxy(API_KEY_PROXY, 'change')
    
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
        if len(source['m3u8']) == 0:
            return None
        if isinstance(source['m3u8'], dict) and not bool(source['m3u8']):
            return None
        return self.decode_m3u8_data(source['m3u8']['1'], id)

        
    def crawl(self):
        for idMovie in self.movieIds_to_visit:
            episodes = self.getEpisodeList(idMovie)
            for episode in episodes['data']:
                movieDetail = self.getMovieDetail(idMovie, episode['id'], episode['link'])
                # Thêm dữ liệu vào danh sách
                print(movieDetail['sources'], "movieDetail['sources']")
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
                
                if m3u8 is not None:
                    for index, link in enumerate(self.m3u8Link(m3u8), start=1):
                        episode_info[f'M3u8 {index}'] = link

                dataEpisodes.append(episode_info)

                with open('movies.json', 'a', encoding='utf-8') as f:
                    f.write(json.dumps(episode_info, ensure_ascii=False) + '\n')

            print(idMovie, "Done")


class CrawlerCategory:
    def download_url(self, url):
        return requests.get(url).content
    def crawl(self, url):
        # html = self.download_url(url)
        # soup = BeautifulSoup(html, 'html.parser')
        # genres = [a.text for a in soup.find_all('a', class_='genre-item')]
        # for genre in genres:
        #     print(genre)
        global TokenAdmin
        anime_genres = []
        for genre in anime_genres:
            response = requests.post(url="http://localhost:8000/api/admin/categories/upsert", json={
                "id": None,
                "name": genre['Thể loại'],
                "description": genre['Mô tả']
            }, headers={
                "authorization": TokenAdmin
            })
            print(response.content)


if __name__ == '__main__':
    # CrawlerCategory().crawl("https://vuighe3.com/anime")
    Crawler(urls=['https://vuighe3.com/anime']).run()
    # # Tạo DataFrame từ danh sách dữ liệu
    # df = pd.DataFrame(data)
    # df.to_excel('output.xlsx', index=False)

    # craw = CrawlerDetail(ids=data)
    # # for movie in data:
    # # craw.add_id_to_visit(id=7252)
    # craw.crawl()

    # # Tạo DataFrame từ danh sách dữ liệu
    # df = pd.DataFrame(dataEpisodes)
    # df.to_excel('episode.xlsx', index=False)