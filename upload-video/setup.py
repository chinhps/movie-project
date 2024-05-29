from cx_Freeze import setup, Executable

options = {
    'build_exe': {
        'packages': ['socks'],
    }
}

setup(
    name = "Uload file to Drive",
    version = "0.1",
    description = "Upload file to drive by chinh.dev",
    options = options,
    executables = [Executable("main.py", base="Win32GUI")]
)