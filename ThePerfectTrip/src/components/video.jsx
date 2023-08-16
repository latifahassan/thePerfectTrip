import { useState, useEffect } from 'react';
import './video.css';
import backdrop from '../assets/perfect.mp4';
import perfectLogo from './the-perfect-trip-logo.png'; // Make sure the image path is correct

const Video = () => {
  const texts = [
    'Cannot decide on a holiday destination?',
    'Let us help you!',
    'Have fun!',
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const delay = 7000; // milliseconds

    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='main'>
      <video className="video-element" src={backdrop} autoPlay loop muted />
      <div className="overlay">
        <div className='content'>
          <h1 className="perfect-trip-sign">The Perfect Trip</h1>
          <img src={perfectLogo} alt="The Perfect Trip Logo" className="logo" />
          {texts.map((text, index) => (
            <h1
              key={index}
              className={`fade-in-text ${currentTextIndex === index ? 'show' : ''}`}
            >
              {text}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;
