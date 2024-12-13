import React from 'react';

const DrumPad = ({ id, audioSrc, label, onClick, audioRef }) => {
  return (
    <div className="drum-pad" id={id} onClick={() => onClick(id)}>
      <audio
        id={id}
        className="clip"
        src={audioSrc}
        ref={audioRef} // Use the passed reference to store the audio element
      />
      {label}
    </div>
  );
};

export default DrumPad;
