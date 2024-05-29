import os
import requests
from urllib.parse import urljoin

# Đường dẫn đến file m3u8
m3u8_url = 'https://xn--chnh-wpa.vn/hls/61389.m3u8'

# Thư mục để lưu các file ts
output_dir = './assets/flags'

# Lấy nội dung file m3u8
m3u8_content = requests.get(m3u8_url).text


def download_image(image_url, filename):
    # Gửi một HTTP GET request đến URL của hình ảnh
    response = requests.get(image_url)

    # Kiểm tra nếu request thành công (HTTP status code 200)
    if response.status_code == 200:
        # Mở một file mới ở chế độ binary ('wb') để ghi hình ảnh
        with open(filename, 'wb') as file:
            # Ghi nội dung của response (hình ảnh) vào file
            file.write(response.content)
        print(f"Hình ảnh đã được tải xuống: {filename}")
    else:
        print(f"Không thể tải hình ảnh. HTTP status code: {response.status_code}")

# Xử lý từng dòng trong file m3u8
for index, line in enumerate(m3u8_content.split('\n')):
    if line.endswith('=d'):
        download_image(line, f"{output_dir}/{index}.png")
