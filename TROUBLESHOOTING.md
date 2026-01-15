# Troubleshooting: Server Not Accessible

## Current Status
✅ Server is running on port 5000
✅ Server is responding to requests
✅ Port is listening on all interfaces (0.0.0.0:5000)

## Quick Fixes

### 1. Try Different URLs
The server accepts connections on:
- `http://127.0.0.1:5000`
- `http://localhost:5000`
- `http://0.0.0.0:5000`

### 2. Check if Server is Running
```bash
# Check if process is running
ps aux | grep "app.py" | grep -v grep

# Check if port is listening
lsof -i :5000
```

### 3. Restart the Server
If the server is not running, start it:
```bash
cd "/Users/sahilpatil/Documents/hand-gesture-recognition-main 2"
source venv311/bin/activate
python app.py
```

Wait for these messages:
```
Initializing models...
Models loaded successfully!
Starting Flask server at http://localhost:5000
 * Running on http://0.0.0.0:5000
```

### 4. Browser Issues
- **Clear browser cache**: Press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- **Try a different browser**: Chrome, Firefox, Safari
- **Check browser console**: Press F12 and look for errors
- **Disable browser extensions**: Some extensions block localhost

### 5. Firewall/Security
- Check if macOS Firewall is blocking the connection
- System Preferences → Security & Privacy → Firewall

### 6. Test with curl
```bash
curl http://127.0.0.1:5000
```
If this works but browser doesn't, it's a browser issue.

### 7. Check Server Logs
Look at the terminal where you ran `python app.py` for any error messages.

## Common Issues

**Issue**: "Connection refused"
- **Solution**: Server is not running. Start it with `python app.py`

**Issue**: "This site can't be reached"
- **Solution**: Check if server is running and wait for "Models loaded successfully!" message

**Issue**: Page loads but is blank
- **Solution**: Check browser console (F12) for JavaScript errors

**Issue**: "Address already in use"
- **Solution**: Another process is using port 5000. Kill it:
  ```bash
  lsof -ti:5000 | xargs kill -9
  ```

## Verify Server is Working

Run this command to test:
```bash
curl -I http://127.0.0.1:5000
```

You should see:
```
HTTP/1.1 200 OK
```

If you see this, the server is working correctly.



