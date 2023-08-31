import airplanes from './airplanes.jpg';
import './Mission1.css'; // Import your CSS file


const Mission = () => {
return (
<div className="content-box mission-container">
<img src={airplanes} alt="Airplanes" className="mission-image" />
<div className="contents">
<h2>How is This Site Different?</h2>
<p>
Unlike regular travel sites that primarily facilitate the booking process, this site focuses on aiding users
in the decision-making phase. It helps users explore and discover potential holiday destinations based on
their preferences, interests, and constraints.
</p>
</div>
</div>
);
};


export default Mission;


