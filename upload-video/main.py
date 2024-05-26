import tkinter as tk
from tkinter import filedialog
from tkinter import ttk
from tkinter import messagebox

import sys

import os.path
import subprocess

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"]
USER = None
 
def main():
    
    if not os.path.exists("credentials.json"):
      messagebox.showwarning("Thông báo!", "Bạn cần file credentials.json để có thể tiếp tục sử dụng!")
      sys.exit()

    root = tk.Tk()
    FILEUPLOAD = tk.StringVar(root)

    root.title("Upload file with Google Photo")
    root.geometry("650x185")
    
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
      loginWithGoogle()
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


      uploadButton = tk.Button(root, text="Upload File right now!", command=button_clicked, state="disabled", width=20, height=2)
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

def button_clicked():
    print("Button đã được nhấn!")

if __name__ == "__main__":
    main()
