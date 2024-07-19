import re
import uuid
import json
import requests
import os.path
import glob
import tkinter as tk
from tkinter import filedialog
from tkinter import ttk

folderPath = "./vtts"


def vtt_to_multiple_files(vtt_file_path):
    with open(vtt_file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    dialogue_count = 0
    file_count = 1
    output_lines = []
    key = 0
   
    if not os.path.exists(folderPath):
        os.makedirs(folderPath)
    
    for line in lines:
        if '-->' in line:
            if dialogue_count == 100:  # Khi đạt 70 câu thoại, tạo file mới
                # Ghi nội dung vào file hiện tại
                with open(f'{folderPath}/output_{file_count}.txt', 'w', encoding='utf-8') as file:
                    file.writelines(output_lines)
                # Chuẩn bị cho file tiếp theo
                file_count += 1
                dialogue_count = 0
                output_lines = []
            time_code = line.strip()
            with open(f'{folderPath}/key.txt', 'a') as file:
                file.write(f'{key}|{time_code}\n')
            output_lines.append(f'\n{key}|')
            dialogue_count += 1
            key += 1
        elif line.strip() != '':
            text = line.strip()
            output_lines.append(f'{text}\n')

    # Ghi nội dung còn lại vào file cuối cùng
    if output_lines:
        with open(f'{folderPath}/output_{file_count}.txt', 'w', encoding='utf-8') as file:
            file.writelines(output_lines)

def convert_to_vtt(folder_path):
    # Lấy danh sách tất cả các file .txt trong thư mục
    txt_files = glob.glob(os.path.join(folder_path, 'final', 'content_*.txt'))
    
    # Sắp xếp các file theo tên để đảm bảo thứ tự chính xác
    txt_files.sort()
    
    key_timecodes = {}
    with open(os.path.join(folder_path, 'key.txt'), 'r', encoding='utf-8') as key_file:
        for line in key_file:
            if '|' in line:
                key, timecode = line.strip().split('|')
            key_timecodes[key] = timecode

    # Tạo file .vtt mới
    with open(os.path.join(folder_path, 'final', 'combined.vtt'), 'w', encoding='utf-8') as vtt_file:
        # Xử lý từng file .txt
        for txt_file in txt_files:
            with open(txt_file, 'r', encoding='utf-8') as file:
                # Đọc từng dòng trong file .txt
                for line in file:
                    if '|' in line:
                        keyTimeCode, text = line.split('|')
                        vtt_file.write(f'{key_timecodes[keyTimeCode]}\n{text}')
                    else:
                        vtt_file.write(f'{line}')


def UI(id, txt_file):
    root = tk.Tk()
    root.title(f"Translate Subtitle {id}")
    root.geometry("648x465")
    
    textareaCurrent = tk.Text(root, height=11, width=75)
    textareaCurrent.pack()
    textareaCurrent.place(x=20, y=30)

    labelCountCurrent = tk.Label(root, text="Số dòng: n/a")
    labelCountCurrent.place(x=20, y=8)

    with open(txt_file, 'r', encoding='utf-8') as file:
        content = file.read()
        labelCountCurrent.config(text=f"Số dòng: {content.count('\n')}")
        textareaCurrent.insert(tk.END, "dịch đoạn hội thoại sau sang tiếng anh và không nói gì thêm, và cho tôi những từ vựng tiếng anh bạn vừa dịch mà ít khi gặp trong cuộc sống để tôi học (từ vựng dịch sang tiếng việt chia danh từ\động từ) \n\n")
        textareaCurrent.insert(tk.END, content)
        textareaCurrent.see(tk.END)  # Cuộn đến dòng mới nhất

    textareaSubtitles = tk.Text(root, height=11, width=50)
    textareaSubtitles.pack()
    textareaSubtitles.place(x=20, y=218)

    textareaVocabularies = tk.Text(root, height=11, width=23)
    textareaVocabularies.pack()
    textareaVocabularies.place(x=439, y=218)

    def createOutput():
        if not os.path.exists(os.path.join(folderPath, 'final')):
            os.makedirs(os.path.join(folderPath, 'final'))
        # subtitle
        with open(os.path.join(folderPath, 'final', f'content_{id}.txt'), 'w', encoding='utf-8') as file:
            content = textareaSubtitles.get("1.0", "end-1c")
            file.writelines(content)
        # vocabulary
        with open(os.path.join(folderPath, 'final', f'vocabularies.txt'), 'w', encoding='utf-8') as file:
            content = textareaVocabularies.get("1.0", "end-1c")
            file.writelines(content)
        root.destroy()

    
    tk.Button(root, text=f"Xác nhận subtitle lần {id}", command=createOutput, width=86, height=2).place(x=19, y=410)

    root.resizable(False, False)
    root.mainloop()

def main(): 
    # file_path = filedialog.askopenfilename(filetypes=[("VTT files", "*.vtt")])
    # vtt_to_multiple_files(file_path)  # Chuyển file VTT thành văn bản với mã định danh

    # txt_files = glob.glob(os.path.join(folderPath, 'output_*.txt'))
    # txt_files.sort()
    # id = 1

    # for txt_file in txt_files:
    #     UI(id, txt_file)
    #     id += 1

    convert_to_vtt('./vtts')

main()