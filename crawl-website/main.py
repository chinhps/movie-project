import requests
from bs4 import BeautifulSoup
import pandas as pd
import logging
from typing import List
import random
import time
import json

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

                with open('episodes.json', 'a', encoding='utf-8') as f:
                    f.write(json.dumps(episode_info, ensure_ascii=False) + '\n')

            print(idMovie, "Done")

if __name__ == '__main__':
    # Crawler(urls=['https://vuighe3.com/anime']).run()
    # # Tạo DataFrame từ danh sách dữ liệu
    # df = pd.DataFrame(data)
    # df.to_excel('output.xlsx', index=False)

    data = [ '7243', '7242', '7241', '7240', '7239', '7238', '7237', '7236', '7235', '7234', '7233', '7232', '7231', '7230', '7229', '7228', '7227', '7226', '7225', '7224', '7223', '7222', '7221', '7220', '7219', '7218', '7217', '7216', '7215', 
    '7214', '7213', '7212', '7211', '7210', '7209', '7208', '7207', '7206', '7205', '7204', '7203', '7202', '7201', '7199', '7198', '7197', '7196', '7195', '7194', '7193', '7192', '7191', '7190', '7189', '7188', '7187', '7186', '7185', '7184', '7183', '7182', '7181', '7180', '7179', '7177', '7176', '7175', '7174', '7173', '7172', '7171', '7170', '7169', '7168', '7167', '7166', '7165', '7164', '7163', '7162', '7160', '7159', '7158', '7156', '7155', '7154', '7153', '7152', '7151', '7150', '7149', '7148', '7147', '7146', '7145', '7144', '7143', '7142', '7141', '7140', '7139', '7138', '7137', '7136', '7135', '7134', '7133', '7132', '7131', '7130', '7129', '7128', '7127', '7126', '7125', '7124', '7123', '7122', '7121', '7120', '7119', '7118', '7117', '7116', '7115', '7114', '7113', '7112', '7111', '7110', '7109', '7108', '7107', '7106', '7105', '7104', '7103', '7102', '7101', '7100', '7099', '7098', '7097', '7096', '7095', '7094', '7093', '7092', '7091', '7090', '7089', '7088', '7087', '7086', '7085', '7084', '7083', '7082', '7081', '7080', '7079', '7078', '7077', '7076', '7075', '7074', '7073', '7072', '7071', '7070', '7069', '7068', '7067', '7066', '7065', '7064', 
    '7063', '7062', '7061', '7060', '7059', '7058', '7057', '7056', '7055', '7054', '7053', '7052', '7051', '7050', '7049', '7048', '7047', '7046', '7045', '7044', '7043', '7042', '7041', '7038', '7037', '7036', '7035', '7034', '7033', '7032', '7031', '7030', '7029', '7028', '7027', '7026', '7025', '7023', '7022', '7021', '7020', '7019', '7018', '7017', '7016', '7015', '7014', '7013', '7012', '7011', '7010', '7009', '7008', '7007', '7006', '7005', '7004', '7003', '7002', '7001', '7000', '6999', '6998', '6996', '6995', '6994', '6992', '6991', '6990', '6989', '6988', '6987', '6986', '6985', '6984', '6983', '6982', '6981', '6980', '6979', '6978', '6977', '6976', '6975', '6974', '6973', '6972', '6971', '6970', '6969', '6968', '6967', '6966', '6965', '6964', '6963', '6962', '6961', '6960', '6959', '6958', '6957', '6956', '6955', '6919', '6918', '6917', '6916', '6915', '6914', '6913', '6912', '6911', '6910', '6909', '6908', '6907', '6906', '6905', '6904', '6903', '6902', '6901', '6900', '6899', '6898', '6897', '6896', '6895', '6894', '6893', '6892', '6891', '6889', '6888', '6887', '6886', '6885', '6884', '6883', '6882', '6881', '6880', '6879', '6878', '6877', '6876', 
    '6875', '6874', '6873', '6872', '6869', '6868', '6867', '6866', '6865', '6864', '6863', '6862', '6861', '6860', '6859', '6858', '6857', '6856', '6855', '6854', '6853', '6852', '6851', '6850', '6849', '6848', '6847', '6846', '6845', '6844', '6843', '6842', '6841', '6840', '6839', '6838', '6837', '6836', '6835', '6834', '6833', '6832', '6831', '6830', '6829', '6828', '6827', '6826', '6825', '6824', '6823', '6822', '6821', '6820', '6819', '6818', '6817', '6816', '6815', '6813', '6812', '6811', '6810', '6809', '6808', '6807', '6806', '6805', '6804', '6803', '6802', '6800', '6799', '6798', '6797', '6796', '6795', '6794', '6793', '6792', '6791', '6790', '6789', '6788', '6787', '6786', '6785', '6784', '6783', '6782', '6781', '6780', '6779', '6778', '6777', '6776', '6775', '6774', '6773', '6772', '6771', '6770', '6769', '6768', '6767', '6766', '6765', '6764', '6763', '6762', '6761', '6760', '6759', '6757', '6756', '6755', '6754', '6753', '6752', '6750', '6749', '6748', '6747', '6746', '6744', '6743', '6742', '6741', '6740', '6739', '6738', '6736', '6735', '6734', '6733', '6732', '6731', '6730', '6729', '6728', '6727', '6726', '6725', '6724', '6723', '6722', '6721', 
    '6720', '6719', '6718', '6717', '6716', '6715', '6714', '6713', '6712', '6711', '6710', '6709', '6708', '6707', '6706', '6705', '6704', '6703', '6702', '6701', '6700', '6699', '6698', '6696', '6695', '6694', '6693', '6692', '6691', '6690', '6689', '6687', '6686', '6685', '6683', '6682', '6681', '6680', '6679', '6678', '6677', '6676', '6675', '6674', '6673', '6672', '6670', '6669', '6668', '6666', '6665', '6664', '6663', '6662', '6661', '6659', '6658', '6657', '6656', '6655', '6654', '6653', '6652', '6651', '6650', '6649', '6648', '6647', '6646', '6644', '6643', '6642', '6640', '6639', '6638', '6637', '6636', '6635', '6634', '6633', '6632', '6631', '6630', '6629', '6628', '6627', '6625', '6624', '6562', '6560', '6559', '6555', '6554', '6551', '6550', '6548', '6547', '6544', '6543', '6542', '6540', '6533', '6531', '6530', '6524', '6521', '6520', '6517', '6516', '6515', '6514', '6513', '6512', '6511', '6510', '6509', '6508', '6507', '6502', '6501', '6499', '6497', '6493', '6492', '6491', '6490', '6488', '6487', '6482', '6480', '6478', '6476', '6475', '6473', '6472', '6470', '6469', '6465', '6464', '6462', '6461', '6458', '6456', '6454', '6452', '6451', '6450', 
    '6439', '6438', '6436', '6430', '6427', '6426', '6425', '6424', '6422', '6420', '6419', '6416', '6415', '6412', '6409', '6406', '6401', '6400', '6398', '6397', '6396', '6394', '6391', '6390', '6382', '6380', '6379', '6376', '6374', '6372', '6371', '6370', '6369', '6368', '6367', '6364', '6363', '6359', '6356', '6353', '6351', '6348', '6345', '6341', '6340', '6339', '6338', '6337', '6333', '6332', '6331', '6329', '6323', '6319', '6318', '6317', '6310', '6309', '6308', '6307', '6306', '6302', '6299', '6298', '6296', '6295', '6293', '6292', '6289', '6284', '6280', '6277', '6276', '6275', '6273', '6272', '6270', '6267', '6266', '6264', '6263', '6254', '6252', '6251', '6250', '6249', '6245', '6244', '6243', '6242', '6234', '6233', '6232', '6231', '6230', '6228', '6224', '6223', '6222', '6220', '6217', '6215', '6214', '6213', '6211', '6210', '6209', '6208', '6205', '6202', '6200', '6185', '6184', '6183', '6182', '6179', '6178', '6173', '6170', '6169', '6165', '6164', '6163', '6162', '6160', '6159', '6158', '6157', '6154', '6153', '6151', '6149', '6148', '6141', '6135', '6129', '6128', '6125', '6124', '6121', '6120', '6119', '6118', '6116', '6115', '6114', '6112', 
    '6105', '6104', '6103', '6097', '6095', '6090', '6089', '6082', '6080', '6079', '6074', '6071', '6070', '6069', '6068', '6067', '6066', '6065', '6063', '6061', '6060', '6056', '6055', '6054', '6053', '6052', '6051', '6050', '6047', '6043', '6040', '6037', '6035', '6033', '6031', '6026', '6025', '6022', '6018', '6017', '6016', '6015', '6014', '6013', '6010', '6008', '6007', '6006', '6004', '6001', '5999', '5997', '5996', '5994', '5993', '5991', '5990', '5989', '5987', '5986', '5985', '5983', '5982', '5981', '5979', '5978', '5976', '5975', '5974', '5973', '5972', '5971', '5969', '5968', '5967', '5964', '5963', '5958', '5957', '5955', '5954', '5953', '5952', '5950', '5947', '5945', '5944', '5943', '5942', '5940', '5938', '5934', '5933', '5932', '5929', '5928', '5927', '5926', '5925', '5922', '5921', '5918', '5917', '5916', '5915', '5913', '5912', '5911', '5910', '5909', '5908', '5906', '5903', '5901', '5899', '5896', '5888', '5887', '5886', '5885', '5883', '5880', '5876', '5875', '5874', '5873', '5871', '5868', '5867', '5866', '5865', '5864', '5862', '5861', '5860', '5859', '5858', '5857', '5856', '5855', '5854', '5853', '5851', '5850', '5843', '5839', '5838', 
    '5836', '5833', '5830', '5819', '5817', '5816', '5811', '5810', '5807', '5800', '5794', '5793', '5790', '5789', '5787', '5786', '5785', '5783', '5779', '5777', '5776', '5771', '5769', '5768', '5764', '5763', '5760', '5757', '5756', '5755', '5751', '5750', '5748', '5743', '5740', '5739', '5737', '5730', '5729', '5716', '5709', '5703', '5702', '5693', '5692', '5687', '5686', '5681', '5679', '5664', '5662', '5656', '5652', '5650', '5649', '5648', '5643', '5642', '5641', '5640', '5639', '5638', '5637', '5636', '5635', '5634', '5632', '5631', '5630', '5629', '5628', '5627', '5626', '5625', '5624', '5623', '5621', '5616', '5609', '5593', '5592', '5578', '5577', '5575', '5573', '5572', '5571', '5563', '5561', '5558', '5557', '5556', '5555', '5554', '5553', '5550', '5546', '5539', '5537', '5534', '5532', '5531', '5530', '5529', '5528', '5527', '5525', '5524', '5522', '5517', '5512', '5506', '5505', '5504', '5498', '5492', '5491', '5490', '5488', '5484', '5480', '5477', '5476', '5475', '5474', '5470', '5466', '5457', '5437', '5434', '5424', '5423', '5422', '5418', '5416', '5415', '5405', '5404', '5403', '5401', '5400', '5395', '5392', '5391', '5390', '5389', '5388', 
    '5379', '5375', '5374', '5373', '5364', '5360', '5357', '5354', '5352', '5349', '5347', '5344', '5339', '5333', '5332', '5331', '5329', '5328', '5327', '5325', '5324', '5322', '5321', '5320', '5318', '5316', '5315', '5314', '5313', '5311', '5310', '5309', '5308', '5305', '5304', '5302', '5301', '5298', '5294', '5288', '5287', '5285', '5282', '5281', '5280', '5278', '5276', '5275', '5274', '5272', '5271', '5269', '5268', '5265', '5263', '5262', '5261', '5260', '5259', '5257', '5250', '5244', '5243', '5242', '5238', '5234', '5233', '5223', '5215', '5210', '5209', '5208', '5207', '5204', '5201', '5200', '5199', '5198', '5196', '5194', '5193', '5192', '5191', '5190', '5189', '5188', '5187', '5186', '5185', '5181', '5180', '5178', '5176', '5171', '5168', '5164', '5161', '5158', '5156', '5155', '5154', '5151', '5144', '5142', '5141', '5140', '5139', '5138', '5134', '5131', '5130', '5126', '5124', '5122', '5121', '5120', '5115', '5114', '5113', '5112', '5110', '5109', '5108', '5107', '5105', '5103', '5102', '5101', '5100', '5097', '5096', '5094', '5093', '5092', '5090', '5089', '5088', '5085', '5083', '5080', '5079', '5078', '5077', '5075', '5074', '5073', '5068', 
    '5067', '5066', '5064', '5061', '5060', '5059', '5058', '5053', '5052', '5051', '5050', '5040', '5035', '5034', '5033', '5032', '5030', '5029', '5023', '5022', '5021', '5012', '5011', '5008', '5007', '5003', '5002', '5001', '5000', '4999', '4998', '4997', '4993', '4987', '4985', '4983', '4981', '4980', '4978', '4976', '4974', '4970', '4963', '4962', '4960', '4959', '4956', '4955', '4954', '4953', '4951', '4948', '4947', '4944', '4941', '4940', '4939', '4938', '4937', '4936', '4935', '4934', '4933', '4932', '4928', '4927', '4925', '4921', '4918', '4913', '4910', '4902', '4900', '4899', '4897', '4894', '4893', '4890', '4887', '4886', '4885', '4884', '4883', '4879', '4870', '4869', '4868', '4861', '4860', '4859', '4857', '4856', '4855', '4852', '4836', '4835', '4834', '4830', '4829', '4812', '4808', '4807', '4790', '4788', '4782', '4780', '4775', '4773', '4770', '4765', '4762', '4759', '4753', '4746', '4742', '4727', '4716', '4710', '4709', '4706', '4689', '4688', '4686', '4683', '4681', '4674', '4672', '4669', '4644', '4639', '4638', '4636', '4630', '4629', '4628', '4622', '4612', '4610', '4591', '4566', '4553', '4549', '4547', '4542', '4520', '4517', '4500', 
    '4499', '4494', '4488', '4487', '4485', '4484', '4482', '4481', '4480', '4479', '4476', '4475', '4462', '4461', '4460', '4436', '4423', '4406', '4404', '4403', '4378', '4347', '4346', '4328', '4325', '4314', '4305', '4300', '4299', '4293', '4292', '4271', '4266', '4256', '4255', '4254', '4251', '4123', '4130', '4131', '4139', '4140', '4162', '4163', '4179', '4180', '4202', '4211', '4213', '4216', '4228', '3992', '3993', '4052', '4053', '4066', '1439', '3940', '3927', '3924', '3908', '3907', '3899', '3889', '3887', '3886', '3864', '3856', '3851', '3850', '3847', '3836', '3829', '3808', '3807', '3799', '3798', '3795', '3790', '3789', '3771', '3770', '3765', '3764', '3758', '3755', '3749', '3748', '3746', '3745', '3744', '3743', '3742', '3739', '3737', '3736', '3734', '3732', '3728', '3720', '3719', '3715', '3713', '3712', '3710', '3708', '3704', '3703', '3701', '3697', '3696', '3695', '3694', '3691', '3690', '3678', '3675', '3668', '3664', '3663', '3662', '3653', '3652', '3651', '3644', '3613', '3612', '3611', '3600', '3591', '3590', '3587', '3578', '3562', '3557', '3549', '3512', '3485', '3481', '3480', '3477', '3442', '3404', '3394', '3385', '3371', '3343', 
    '3332', '3331', '3325', '3309', '3295', '3287', '3285', '3281', '3235', '3208', '3191', '3188', '3183', '2053', '2087', '1834', '2092', '1844', '1847', '1850', '1855', '1856', '1916', '1990', '2004', '1792', '2304', '2560', '3079', '2824', '2571', '2323', '2324', '2839', '1563', '2080', '2081', '3105', '3107', '3110', '3111', '3120', '2359', '2360', '2106', '2618', '3130', '2111', '578', '3140', '2121', '2127', '2135', '2391', '3161', '2653', '1887', '3170', '2406', '2411', '2672', '882', '2162', '2164', '2698', '2196', '2708', '2208', '2720', '1956', '2212', '1960', '2216', '1967', '2736', '2742', '2232', '2746', '2749', '2751', '2754', '2755', '1476', '2756', '2757', '2758', '456', '3016', '1737', '3017', '2250', '2762', '3018', '2252', '1744', '2000', '2258', '2774', '1498', '2522', '2523', '2524', '2525', '2529', '2787', '2788', '2789']
    craw = CrawlerDetail(ids=data)
    # for movie in data:
    # craw.add_id_to_visit(id=7252)
    craw.crawl()

    # Tạo DataFrame từ danh sách dữ liệu
    df = pd.DataFrame(dataEpisodes)
    df.to_excel('episode.xlsx', index=False)