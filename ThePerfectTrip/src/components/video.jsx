import './video.css';
import backdrop from '../assets/perfect.mp4';
import perfectLogo from './the-perfect-trip-logo.png'; // Make sure the image path is correct
//import { Link } from 'react-router-dom'


const Video = () => {
return (
<div className='main'>
<video className="video-element" src={backdrop} autoPlay loop muted playsInline />
<div className="overlay">
<div className='content'>
<img src={perfectLogo} alt="The Perfect Trip Logo" className="logo" />
<h1 className="static-text-top">An Amazing trip Starts <br/> with You</h1>
<h1 className="static-text plan-trip">Plan the trip of a Lifetime</h1>
</div>
</div>
</div>
);
};


export default Video;