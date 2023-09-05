
import PropTypes from 'prop-types';

const DestinationCard = ({ destination }) => {
  return (
    <div className="destination-card">
      <div className="destination-image">
        <img src={destination.image} alt={destination.name} />
      </div>
      <div className="destination-details">
        <h2>{destination.name}</h2>
        <p>Country: {destination.country}</p>
        <p>Description: {destination.description}</p>
        <p>Attractions: {destination.attractions.join(', ')}</p>
        {/* Add more information as needed */}
      </div>
    </div>
  );
};

DestinationCard.propTypes = {
  destination: PropTypes.shape({
    image: PropTypes.string.isRequired, // Make sure 'image' is a required string
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    description: PropTypes.string,
    attractions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default DestinationCard;
