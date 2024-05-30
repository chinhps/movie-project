from cx_Freeze import setup, Executable

options = {
    'build_exe': {
        'packages': ['socks'],
    }
}

setup(
    name = "Uload file multi server",
    version = "0.1",
    description = "Upload file to multi server by chinh.dev",
    options = options,
    executables = [Executable("main.py", base="Win32GUI")]
)