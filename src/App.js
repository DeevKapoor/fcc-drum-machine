import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  // Define audio clips with public URLs
  const audioClips = [
    { id: 'Q', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3', label: 'Heater 1' },
    { id: 'W', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3', label: 'Heater 2' },
    { id: 'E', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3', label: 'Clap' },
    { id: 'A', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3', label: 'Kick' },
    { id: 'S', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3', label: 'Heater 3' },
    { id: 'D', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3', label: 'Open HH' },
    { id: 'Z', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3', label: 'Closed HH' },
    { id: 'X', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3', label: 'Kick n Hat' },
    { id: 'C', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3', label: 'Heater 4' },
  ];

  const [displayText, setDisplayText] = useState('');
  const [activePad, setActivePad] = useState(null); // Track the active drum pad
  const audioRefs = useRef({});

  // Play audio and update the display
  const playAudio = (clip) => {
    // Pause all the audio clips before playing the new one, but only if they are not already playing.
    Object.keys(audioRefs.current).forEach((key) => {
      const audio = audioRefs.current[key];
      if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0; // Reset audio to the start
      }
    });

    const audio = audioRefs.current[clip.id];
    if (audio) {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
      setDisplayText(clip.label);
      setActivePad(clip.id); // Set active pad when audio is played
    }
  };

  // Handle key press events for playing audio
  const handleKeyPress = (e) => {
    const key = e.key.toUpperCase();
    const clip = audioClips.find((clip) => clip.id === key);
    if (clip) {
      playAudio(clip);
    }
  };

  useEffect(() => {
    // Set up the event listener for key presses
    document.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{displayText}</div>
      <div className="drum-pads">
        {audioClips.map((clip) => (
          <div
            key={clip.id}
            className={`drum-pad ${activePad === clip.id ? 'active' : ''}`} // Add active class for visual feedback
            id={clip.id}
            onClick={() => playAudio(clip)}
            tabIndex={0}
            role="button"
            aria-label={clip.label} // Added for better accessibility
          >
            {clip.id}
            <audio
              className="clip"
              id={clip.id}
              src={clip.src}
              ref={(el) => (audioRefs.current[clip.id] = el)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
