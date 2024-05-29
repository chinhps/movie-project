import os
import shutil

def copy_and_rename_files(folder_path, destination_folder, prefix):
    # Đảm bảo folder đích tồn tại
    if not os.path.exists(destination_folder):
        os.makedirs(destination_folder)
    
    # Lấy danh sách tất cả các file trong folder gốc và sắp xếp chúng
    files = sorted(os.listdir(folder_path))
    
    # Sao chép và đổi tên các file
    for index, filename in enumerate(files):
        # Tạo tên file mới với prefix và số thứ tự
        new_name = f"{prefix}{index}{os.path.splitext(filename)[1]}"
        # Đường dẫn đầy đủ đến file gốc và file đích mới
        source_file = os.path.join(folder_path, filename)
        destination_file = os.path.join(destination_folder, new_name)
        
        # Sao chép và đổi tên file
        shutil.copy2(source_file, destination_file)
        print(f"Đã sao chép và đổi tên '{filename}' thành '{new_name}'")

# Sử dụng hàm
folder_path = './assets/flags'
destination_folder = './assets/flags2'
prefix = ''  # Prefix bạn muốn thêm vào trước tên file mới
copy_and_rename_files(folder_path, destination_folder, prefix)
