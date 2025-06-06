/* AUDIO */
const backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.volume = 0.5; // Set volume to 50% to start

// Create audio controls UI
function createAudioControls() {
  const controls = document.createElement('div');
  controls.style.position = 'absolute';
  controls.style.bottom = '20px';
  controls.style.left = '20px';
  controls.style.zIndex = '1000';
  controls.style.display = 'flex';
  controls.style.gap = '10px';
  controls.style.alignItems = 'center';

  // Play/Pause button
  const playPauseBtn = document.createElement('button');
  playPauseBtn.innerHTML = '⏵';
  playPauseBtn.style.background = '#ee5282';
  playPauseBtn.style.color = 'white';
  playPauseBtn.style.border = 'none';
  playPauseBtn.style.borderRadius = '50%';
  playPauseBtn.style.width = '40px';
  playPauseBtn.style.height = '40px';
  playPauseBtn.style.cursor = 'pointer';
  playPauseBtn.style.fontSize = '16px';

  // Volume control
  const volumeSlider = document.createElement('input');
  volumeSlider.type = 'range';
  volumeSlider.min = '0';
  volumeSlider.max = '1';
  volumeSlider.step = '0.01';
  volumeSlider.value = '0.5';
  volumeSlider.style.width = '100px';
  volumeSlider.style.accentColor = '#ee5282';

  // Current time display
  const timeDisplay = document.createElement('span');
  timeDisplay.style.color = 'white';
  timeDisplay.style.fontFamily = 'Arial, sans-serif';
  timeDisplay.style.fontSize = '14px';

  controls.appendChild(playPauseBtn);
  controls.appendChild(volumeSlider);
  controls.appendChild(timeDisplay);
  document.body.appendChild(controls);

  // Event listeners
  playPauseBtn.addEventListener('click', () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      playPauseBtn.innerHTML = '⏸';
    } else {
      backgroundMusic.pause();
      playPauseBtn.innerHTML = '⏵';
    }
  });

  volumeSlider.addEventListener('input', () => {
    backgroundMusic.volume = volumeSlider.value;
  });

  // Update time display
  setInterval(() => {
    const minutes = Math.floor(backgroundMusic.currentTime / 60);
    const seconds = Math.floor(backgroundMusic.currentTime % 60);
    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

// Start audio when user interacts with the page
function initAudio() {
  // Try to play audio
  const playPromise = backgroundMusic.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log("Autoplay prevented - showing play button");
      // Still create controls even if autoplay is blocked
      createAudioControls();
    });
  } else {
    createAudioControls();
  }
}

document.body.addEventListener('click', initAudio, { once: true });
