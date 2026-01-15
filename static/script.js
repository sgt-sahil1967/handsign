// Hand Sign Detection JavaScript
let video = null;
let canvas = null;
let stream = null;
let isPredicting = false;
let predictionInterval = null;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    
    if (!video) {
        console.error('Video element not found!');
        return;
    }
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }
    
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    
    if (!startBtn || !stopBtn) {
        console.error('Buttons not found!');
        return;
    }
    
    startBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Start button clicked');
        startBtn.textContent = 'Starting...';
        startBtn.disabled = true;
        startWebcam();
    });
    stopBtn.addEventListener('click', function() {
        console.log('Stop button clicked');
        stopWebcam();
    });
    
    console.log('Initialization complete');
});

function startWebcam() {
    console.log('startWebcam() called');
    
    // Check if browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('getUserMedia not supported');
        alert('Your browser does not support webcam access. Please use a modern browser like Chrome, Firefox, or Safari.');
        return;
    }
    
    // Show loading message
    const resultsDiv = document.getElementById('predictionResults');
    if (resultsDiv) {
        resultsDiv.innerHTML = '<p class="no-prediction">Requesting camera access...</p>';
    }
    
    console.log('Requesting camera access...');
    
    // Request webcam access
    navigator.mediaDevices.getUserMedia({ 
        video: { 
            width: 640, 
            height: 480,
            facingMode: 'user' // Front-facing camera
        } 
    })
    .then(function(mediaStream) {
        stream = mediaStream;
        video.srcObject = stream;
        
        // Wait for video to be ready
        video.onloadedmetadata = function() {
            video.play()
                .then(function() {
                    // Update button states
                    const startBtn = document.getElementById('startBtn');
                    const stopBtn = document.getElementById('stopBtn');
                    startBtn.disabled = true;
                    startBtn.textContent = 'Webcam Active';
                    stopBtn.disabled = false;
                    
                    // Start prediction loop
                    startPrediction();
                    
                    resultsDiv.innerHTML = '<p class="no-prediction">Camera started. Showing your hand to the camera...</p>';
                })
                .catch(function(err) {
                    console.error('Error playing video:', err);
                    alert('Error starting video. Please try again.');
                });
        };
    })
    .catch(function(err) {
        console.error('Error accessing webcam:', err);
        const startBtn = document.getElementById('startBtn');
        startBtn.disabled = false;
        startBtn.textContent = 'Start Webcam';
        
        let errorMsg = 'Error accessing webcam. ';
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            errorMsg += 'Please allow camera permissions in your browser settings and try again.';
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
            errorMsg += 'No camera found. Please connect a camera and try again.';
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
            errorMsg += 'Camera is being used by another application. Please close other apps using the camera.';
        } else {
            errorMsg += 'Please make sure you have granted camera permissions.';
        }
        alert(errorMsg);
        if (resultsDiv) {
            resultsDiv.innerHTML = '<p class="no-prediction">Camera access failed. Please check permissions and try again.</p>';
        }
    });
}

function stopWebcam() {
    // Stop prediction
    stopPrediction();
    
    // Stop video stream
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    
    if (video) {
        video.srcObject = null;
    }
    
    // Update button states
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    startBtn.disabled = false;
    startBtn.textContent = 'Start Webcam';
    stopBtn.disabled = true;
    
    // Clear prediction results
    document.getElementById('predictionResults').innerHTML = 
        '<p class="no-prediction">Start webcam to see predictions</p>';
}

function startPrediction() {
    if (isPredicting) return;
    
    isPredicting = true;
    
    // Send frames to server every 500ms (adjust as needed)
    predictionInterval = setInterval(function() {
        captureAndPredict();
    }, 500);
}

function stopPrediction() {
    isPredicting = false;
    if (predictionInterval) {
        clearInterval(predictionInterval);
        predictionInterval = null;
    }
}

function captureAndPredict() {
    if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) {
        return;
    }
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to base64 image
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    // Send to Flask backend for prediction
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image: imageData
        })
    })
    .then(response => response.json())
    .then(data => {
        displayPrediction(data);
    })
    .catch(error => {
        console.error('Prediction error:', error);
    });
}

function displayPrediction(data) {
    const resultsDiv = document.getElementById('predictionResults');
    
    if (data.success) {
        resultsDiv.innerHTML = `
            <div class="prediction-item">
                <strong>Hand Sign:</strong>
                <span class="label">${data.hand_sign}</span>
            </div>
            <div class="prediction-item">
                <strong>Confidence:</strong>
                <span class="confidence">${(data.confidence * 100).toFixed(1)}%</span>
            </div>
            ${data.finger_gesture ? `
            <div class="prediction-item">
                <strong>Finger Gesture:</strong>
                <span class="gesture">${data.finger_gesture}</span>
            </div>
            ` : ''}
            ${data.handedness ? `
            <div class="prediction-item">
                <strong>Hand:</strong>
                <span class="gesture">${data.handedness}</span>
            </div>
            ` : ''}
        `;
    } else {
        resultsDiv.innerHTML = `
            <p class="no-prediction">${data.message || 'No hand detected. Please show your hand to the camera.'}</p>
        `;
    }
}


