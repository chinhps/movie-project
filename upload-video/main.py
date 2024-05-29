import tkinter as tk
from tkinter import filedialog
from tkinter import ttk
from tkinter import messagebox

import sys
import random
import binascii
import shutil

import os.path
import subprocess
import string
import requests
import fileinput
import re
from collections import OrderedDict
import configparser
from concurrent.futures import ThreadPoolExecutor

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload

URL_FINAL = "./assets/finals"
URL_FLAGS = "./assets/flags"
URL_OUTPUT = "./assets/output"
# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive.metadata.readonly"]
USER = None

# CONFIG
config = configparser.ConfigParser()
config.read('config.ini')

SecondShortVideo = config['DEFAULT']['SecondShortVideo']
ThreadUpload = config['DEFAULT']['ThreadUpload']
LinkApiUploadM3u8 = config['DEFAULT']['LinkApiUploadM3u8']


def main():
  
  global SecondShortVideo, ThreadUpload, LinkApiUploadM3u8

  if not os.path.exists("credentials.json"):
    messagebox.showwarning("Thông báo!", "Bạn cần file credentials.json để có thể tiếp tục sử dụng!")
    sys.exit()

  root = tk.Tk()
  FILEUPLOAD = tk.StringVar(root)

  root.title("Upload file with Google Photo")
  root.geometry("650x210")
  
  UI(root, FILEUPLOAD)

  root.resizable(False, False)
  root.mainloop()

def UI(root, FILEUPLOAD):
    
    for widget in root.winfo_children():
        widget.destroy()

    if USER is None and not os.path.exists("token.json"):
      tk.Label(root, text="Bạn cần đăng nhập tài khoản Google Photo để thực hiện!").pack(pady=(50, 20))
      tk.Button(root, text="Đăng nhập ngay", command=lambda: loginFirst(root, FILEUPLOAD), width=20, height=2).pack()
    else:
      creds = loginWithGoogle()
      tk.Label(root, text="Tài khoản: " + USER).place(x=20, y=10)
      checkFFMPEG = tk.Label(root, text="Trạng thái: Đang kiểm tra")
      checkFFMPEG.place(x=20, y=40)

      try:
        subprocess.run(["./ffmpeg/ffmpeg.exe", "-version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        checkFFMPEG.config(text="Trạng thái: Đã sẵn sàng!")
      except Exception as e:
        checkFFMPEG.config(text="Trạng thái: Chưa sẵn sàng! Vui lòng kiểm tra lại!")

      fileLabel = tk.Label(root, text="File đã chọn: Chưa chọn file để upload!")
      fileLabel.place(x=20, y=70)

      # final upload
      serverName = tk.Entry(root, fg='grey', width=15, state='readonly').place(x=20, y=180)
      source = tk.Entry(root, fg='grey',width=75, state='readonly').place(x=120, y=180)
      tk.Button(root, text="😁", width=6, height=1).place(x=579, y=180)

      uploadButton = tk.Button(root, text="Upload File right now!", command=lambda: handleUpload(FILEUPLOAD, creds), state="disabled", width=20, height=2)
      uploadButton.place(x=480, y=100)
      tk.Button(root, text="Chọn file để upload", command=lambda: fileChoose(fileLabel, FILEUPLOAD, uploadButton), width=20, height=2).place(x=20, y=100)
      
      progressbar = ttk.Progressbar(root, orient='horizontal', length=610, mode='determinate')
      progressbar.place(x=20, y=150)
      progressbar['value'] = 80

def loginFirst(root, FILEUPLOAD):
   loginWithGoogle()
   UI(root, FILEUPLOAD)

def loginWithGoogle():
  global USER
  creds = None
  # The file token.json stores the user's access and refresh tokens, and is
  # created automatically when the authorization flow completes for the first
  # time.
  if os.path.exists("token.json"):
    creds = Credentials.from_authorized_user_file("token.json", SCOPES)
  # If there are no (valid) credentials available, let the user log in.
  if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
      creds.refresh(Request())
    else:
      flow = InstalledAppFlow.from_client_secrets_file(
          "credentials.json", SCOPES
      )
      creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open("token.json", "w") as token:
      token.write(creds.to_json())
  USER = creds.client_id
  return creds
    
def fileChoose(fileLabel, FILEUPLOAD, uploadButton):
  filepath = filedialog.askopenfilename()
  FILEUPLOAD.set(filepath)
  uploadButton.config(state=tk.NORMAL)
  fileLabel.config(text="File đã chọn: " + FILEUPLOAD.get())

def ffmpegHandle(FILEUPLOAD):

  global URL_OUTPUT
  global SecondShortVideo

  # check and create output folder
  if os.path.exists(URL_OUTPUT):
    shutil.rmtree(URL_OUTPUT)
  os.makedirs(URL_OUTPUT)

  # ffmpeg -i input.mp4 -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls output.m3u8
  command = [
    "./ffmpeg/ffmpeg.exe", "-i", 
    FILEUPLOAD.get(), 
    "-codec", "copy",
    "-start_number", "0",
    "-hls_time", SecondShortVideo,
    "-hls_list_size", "0",
    "-f", "hls", f"{URL_OUTPUT}/output.m3u8"
  ]
  process = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
  # Kiểm tra nếu có lỗi
  if process.returncode != 0:
    print("Có lỗi xảy ra khi chạy FFmpeg:", process.stderr.decode())
    return False
  else:
    print("FFmpeg chạy thành công, output.m3u8 đã được tạo.")
    return True

def handleCombineVideoWithImage():

  global URL_FINAL
  global URL_FLAGS 
  global URL_OUTPUT

  # remove finals
  if os.path.exists(URL_FINAL):
    shutil.rmtree(URL_FINAL)
    
  # create new folder final
  os.makedirs(URL_FINAL)

  # check exists output
  if not os.path.exists(f"{URL_OUTPUT}/output.m3u8"):
    messagebox.showwarning("Thông báo!", "Thao tác thất bại! x31")
    sys.exit()
  # get count file output
  flagsCount = countFile(URL_FLAGS)
  sourceCount = countFile(URL_OUTPUT)
  
  # convert .ts to image
  for i in range(0, sourceCount - 1):
    # random flag to video
    randomFlag = random.randint(0, flagsCount - 1)
    with open(f"{URL_FLAGS}/{randomFlag}.png", "rb") as fileFlag:
      flagHex = binascii.hexlify(fileFlag.read()).decode('utf-8')
    with open(f"{URL_OUTPUT}/output{i}.ts", "rb") as fileOutput:
      outputHex = binascii.hexlify(fileOutput.read()).decode('utf-8')

    finalFile = f"{URL_FINAL}/image-{i}.png"
    # combine 2 hex to new file
    with open(finalFile, "wb") as newFile:
      # convert hex to binary and save new file
      newFile.write(binascii.unhexlify(flagHex + outputHex))

  print("Đã xong convert files!")

def createFolderDrive(creds, folderName):
  try:
    # create drive api client
    service = build("drive", "v3", credentials=creds)
    file_metadata = {
        "name": folderName,
        "mimeType": "application/vnd.google-apps.folder",
    }

    # pylint: disable=maybe-no-member
    file = service.files().create(body=file_metadata, fields="id").execute()
    print(f'Folder ID: "{file.get("id")}".')
    return file.get("id")

  except HttpError as error:
    print(f"An error occurred: {error}")
    file = None

def uploadToDrive(creds,folderId,fileName,locationFile):
  try:
    # create drive api client
    service = build("drive", "v3", credentials=creds)

    file_metadata = {
        "name": fileName,
        "parents": [folderId]
    }
    media = MediaFileUpload(locationFile, mimetype="image/png", resumable=True)
    # pylint: disable=maybe-no-member
    file = (
        service.files()
        .create(body=file_metadata, media_body=media, fields="id")
        .execute()
    )

    setPublicPermission(service, file.get("id"))

    print(f'File with ID: "{file.get("id")}" has been uploaded.')

  except HttpError as error:
    print(f"An error occurred: {error}")
    file = None

  return file.get("id")

def setPublicPermission(service, fileId):
    permission = {
        'type': 'anyone',
        'role': 'reader',
    }
    chinh = service.permissions().create(
        fileId=fileId,
        body=permission,
        fields='id',
    ).execute()
    print(chinh)

def countFile(folderPath):
  with os.scandir(folderPath) as entries:
    filesCount = sum(1 for entry in entries if entry.is_file())
  return filesCount

def randomWord(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

def getLinkDriveByFileId(fileId):
  drive_url = f"https://drive.google.com/file/d/{fileId}/view"
  # get html drive
  response = requests.get(drive_url)
  image_url_pattern = re.compile(r'(https://lh3\.googleusercontent\.com/[^"]+)\\u003d')
  match = image_url_pattern.search(response.text)
  if match:
      clean_url = match.group(1)
      print(f'Image URL: {clean_url}')
      return clean_url
  else:
      print('No image URLs found in the JavaScript code.')
      return None

def UploadToLinkDrive(creds, filename, folderId):
  print(f"Đang xử lý: {filename}")
  imageIdDrive = uploadToDrive(
    creds=creds,
    folderId=folderId, 
    fileName=filename, 
    locationFile=f"./assets/finals/{filename}"
  )
  linkDrive = getLinkDriveByFileId(imageIdDrive)
  return filename, f"{linkDrive}=d"

def handleUpload(FILEUPLOAD, creds):
  
  global ThreadUpload

  ffmpegCheck = ffmpegHandle(FILEUPLOAD)
  if ffmpegCheck:
    handleCombineVideoWithImage()

  nameFolder = f"{randomWord(10)}_{random.randint(11111,99999)}"
  folderId = createFolderDrive(creds, nameFolder)

  # create OrderedDict
  mapM3u8 = OrderedDict()

  with ThreadPoolExecutor(max_workers=ThreadUpload) as executor:
    filesToProcess = os.listdir("./assets/finals")
    # upload all file to drive
    results = list(executor.map(lambda file: UploadToLinkDrive(creds=creds, filename=file, folderId=folderId), filesToProcess))
  
  # update link by thread
  for filename, link in results:
        mapM3u8[filename] = link

  for key, value in mapM3u8.items():
    # get number in file output
    number = key.split('-')[1].split('.')[0]
    with fileinput.FileInput("./assets/output/output.m3u8", inplace=True) as file:
      for line in file:
          sys.stdout.write(line.replace(f"output{number}.ts", value))

  messagebox.showinfo("Thông báo!", "Đã thực hiện xong bạn có thể thấy link stream ở dưới!")

if __name__ == "__main__":
    main()
