# How to Run the Hand Sign Recognition Web Application

## How to Run on This Computer

1. **Navigate to project directory:**
   ```bash
   cd "/Users/sahilpatil/Documents/hand-gesture-recognition-main 2"
   ```

2. **Activate virtual environment:**
   ```bash
   
   source venv311/bin/activate
   ```

3. **Verify Flask is installed (install if missing):**
   ```bash
   ./venv311/bin/python3 -m pip install flask
   ```

4. **Run the application:**
   ```bash
   python app.py
   ```

5. **Access the application:**
   - Open browser and navigate to: `http://localhost:5000`
   - The login page will be displayed

6. **Stop the server:**
   - Press `Ctrl+C` in the terminal

---

## How to Run on a Different Computer

1. **Prerequisites:**
   - Python 3.11 installed
   - Project files copied to the new computer
   - Virtual environment `venv311` with all ML dependencies

2. **Navigate to project directory:**
   ```bash
   cd /path/to/hand-gesture-recognition-main\ 2
   ```

3. **Activate virtual environment:**
   ```bash
   source venv311/bin/activate
   ```
   (On Windows: `venv311\Scripts\activate`)

4. **Install Flask (if not already installed):**
   ```bash
   python -m pip install flask
   ```
   (Or: `./venv311/bin/python3 -m pip install flask`)

5. **Run the application:**
   ```bash
   python app.py
   ```

6. **Access the application:**
   - Open browser and navigate to: `http://localhost:5000`

7. **Stop the server:**
   - Press `Ctrl+C` in the terminal

---

## Terminal Commands Used

```bash
# Check Python version
./venv311/bin/python3 --version

# Install Flask
./venv311/bin/python3 -m pip install flask

# Run application
./venv311/bin/python3 app.py
```

---

## Notes

- Flask version installed: 3.1.2
- Application runs on: `http://localhost:5000`
- Virtual environment: `venv311` (Python 3.11)
- All ML model dependencies should already be installed in `venv311`

## Troubleshooting

If you encounter TensorFlow import errors:

1. **Check TensorFlow installation:**
   ```bash
   ./venv311/bin/python3 -m pip list | grep tensorflow
   ```

2. **If TensorFlow is broken, reinstall compatible versions:**
   ```bash
   ./venv311/bin/python3 -m pip uninstall -y tensorflow tensorflow-macos jax jaxlib
   ./venv311/bin/python3 -m pip install "tensorflow>=2.15.0,<2.17.0"
   ```

3. **Verify imports work:**
   ```bash
   ./venv311/bin/python3 -c "import tensorflow as tf; import mediapipe as mp; print('OK')"
   ```

## Verified Working Configuration

- TensorFlow: 2.16.2
- MediaPipe: 0.10.14
- Flask: 3.1.2
- Protobuf: 4.25.8
- Python: 3.11.13

