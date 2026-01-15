# Hand Gesture Recognition Web Application - Windows Setup and Run Instructions

## Prerequisites Setup for Running on Windows

Below are detailed step-by-step instructions to set up all prerequisites on a Windows machine. These ensure you have Python 3.11, the project files, and the virtual environment with all necessary dependencies installed.

### 1. Install Python 3.11 on Windows
   - Download Python 3.11 from the official website: [python.org/downloads](https://www.python.org/downloads/).
   - Choose the Windows installer (e.g., `python-3.11.x-amd64.exe` for 64-bit systems).
   - Run the installer as administrator.
   - During installation:
     - Check "Add Python 3.11 to PATH".
     - Select "Install for all users" if prompted.
     - Click "Install Now".
   - Verify installation: Open Command Prompt and run `python --version`. It should show `Python 3.11.x`.

### 2. Copy the Project Directory to Your Windows Machine
   - Locate the project folder `hand-gesture-recognition-main 2` on your current machine (macOS, based on the path `/Users/sahilpatil/Documents/hand-gesture-recognition-main 2`).
   - Copy the entire folder to your Windows machine (e.g., to `C:\Users\YourUsername\Documents\hand-gesture-recognition-main 2`).
     - You can use a USB drive, cloud storage (e.g., Google Drive, OneDrive), or network transfer.
   - Ensure all files are copied, including subfolders like `model/`, `static/`, `templates/`, `utils/`, and `venv311/`.

### 3. Set Up the Virtual Environment (venv311) with Dependencies
   - Open Command Prompt as administrator.
   - Navigate to the project directory:
     ```
     cd "C:\Users\YourUsername\Documents\hand-gesture-recognition-main 2"
     ```
   - If `venv311` doesn't exist, create it:
     ```
     python -m venv venv311
     ```
   - Activate the virtual environment:
     ```
     venv311\Scripts\activate
     ```
     (You should see `(venv311)` in the prompt.)
   - Install required dependencies. Since the project uses ML libraries, install them one by one or from a requirements file if available. Based on the project structure, key dependencies include:
     - Flask: `python -m pip install flask`
     - TensorFlow: `python -m pip install "tensorflow>=2.15.0,<2.17.0"`
     - MediaPipe: `python -m pip install mediapipe`
     - OpenCV: `python -m pip install opencv-python`
     - NumPy: `python -m pip install numpy`
     - SciPy: `python -m pip install scipy`
     - Pillow: `python -m pip install pillow`
     - Matplotlib: `python -m pip install matplotlib`
     - Keras: `python -m pip install keras`
     - Other potential deps: `python -m pip install h5py requests absl-py`
     - If a `requirements.txt` file exists in the project, run: `python -m pip install -r requirements.txt`
   - Verify installations:
     ```
     python -c "import tensorflow as tf; import mediapipe as mp; import cv2; import flask; print('All imports OK')"
     ```
     If errors occur (e.g., TensorFlow issues), reinstall TensorFlow as noted in troubleshooting.

### Additional Notes
- **Hardware Requirements:** Ensure your Windows machine has a compatible GPU for TensorFlow if using GPU acceleration (optional; CPU works for basic use).
- **Permissions:** Run Command Prompt as administrator for installations.
- **Troubleshooting Common Issues:**
  - If `pip` fails, upgrade it: `python -m pip install --upgrade pip`
  - For TensorFlow on Windows, ensure you have Visual C++ Redistributables installed (download from Microsoft).
  - If virtual environment activation fails, check your antivirus (it might block `Scripts\activate`).

## Instructions for Running the Hand Gesture Recognition Web Application on Windows

Based on the existing `RUN_INSTRUCTIONS.md` file, which is tailored for macOS, here are the adapted instructions for running the application on Windows. These assume you have the project files copied to your Windows machine, including the `venv311` virtual environment with all dependencies installed.

### Prerequisites
- Python 3.11 installed on Windows.
- The project directory (`hand-gesture-recognition-main 2`) copied to your Windows machine.
- Virtual environment `venv311` (created with Python 3.11) with all ML dependencies (e.g., TensorFlow, MediaPipe, Flask) already installed.

### Steps to Run

1. **Navigate to the project directory:**
   Open Command Prompt or PowerShell and run:
   ```
   cd "C:\path\to\hand-gesture-recognition-main 2"
   ```
   Replace `C:\path\to\` with the actual path where you placed the project folder.

2. **Activate the virtual environment:**
   ```
   venv311\Scripts\activate
   ```
   You should see `(venv311)` at the start of your command prompt.

3. **Verify Flask is installed (install if missing):**
   ```
   python -m pip install flask
   ```

4. **Run the application:**
   ```
   python app.py
   ```
   The Flask server should start, and you'll see output like `* Running on http://127.0.0.1:5000/`.

5. **Access the application:**
   - Open your web browser and navigate to: `http://localhost:5000`
   - The login page should load.

6. **Stop the server:**
   - Press `Ctrl+C` in the Command Prompt or PowerShell window.

### Terminal Commands Summary
```
# Check Python version
python --version

# Install Flask (if needed)
python -m pip install flask

# Run application
python app.py
```

### Notes
- Flask version: 3.1.2 (should be pre-installed in `venv311`).
- Application runs on: `http://localhost:5000`.
- Virtual environment: `venv311` (Python 3.11).
- All ML model dependencies (e.g., TensorFlow 2.16.2, MediaPipe 0.10.14) should already be installed in `venv311`.

### Troubleshooting
If you encounter TensorFlow import errors:
1. Check TensorFlow installation:
   ```
   python -m pip list | findstr tensorflow
   ```
2. If TensorFlow is broken, reinstall compatible versions:
   ```
   python -m pip uninstall -y tensorflow
   python -m pip install "tensorflow>=2.15.0,<2.17.0"
   ```
3. Verify imports:
   ```
   python -c "import tensorflow as tf; import mediapipe as mp; print('OK')"
   ```

If you need to set up the virtual environment from scratch on Windows:
- Install Python 3.11.
- Create venv: `python -m venv venv311`
- Activate: `venv311\Scripts\activate`
- Install dependencies: `python -m pip install -r requirements.txt` (assuming a requirements.txt exists; if not, install manually: flask, tensorflow, mediapipe, opencv-python, etc.).
