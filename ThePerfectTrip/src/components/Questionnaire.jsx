import { useState, useEffect } from 'react';
import axios from 'axios';
import './Questionnaire.css';

const questions = [
  {
    question: 'What type of holiday do you prefer?',
    options: ['Beach', 'City', 'Mountains', 'Countryside'],
  },
  {
    question: 'Who are you travelling with?',
    options: ['Friends', 'Family', 'Partner'],
  },
  {
    question: 'What is your preferred travel activity?',
    options: ['Relaxing on the beach', 'Watersports', 'Sightseeing', 'Wintersports', 'Eating', 'Party'],
  },
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [suggestedDestination, setSuggestedDestination] = useState(null);

  useEffect(() => {
    if (selectedActivities.length === 2) {
      // Two activities have been selected, fetch suggested destination
      const fetchSuggestedDestination = async () => {
        try {
          const userPreferences = {
            type: answers[0],
            companions: answers[1],
            activities: selectedActivities,
          };

          // Make API request to backend
          const response = await axios.post('https://perfecttripbackend.onrender.com/suggest-destination', userPreferences);

          // Update suggestedDestination state with the fetched destination
          setSuggestedDestination(response.data);
        } catch (error) {
          console.error('Error fetching suggested destination:', error);
        }
      };

      fetchSuggestedDestination();
    }
  }, [answers, selectedActivities]);

  const handleAnswer = (selectedOption) => {
    if (currentQuestion === questions.length - 1) {
      // For the last question (activities), allow selecting two options
      if (selectedActivities.length < 2) {
        setSelectedActivities([...selectedActivities, selectedOption]);
      }
    } else {
      setAnswers([...answers, selectedOption]);
      setCurrentQuestion(currentQuestion + 1); // Increment for non-last questions
    }
  };

  if (suggestedDestination) {
    // Display the suggested destination
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // This ensures that the content is vertically centered within the viewport
      }}>
        <div>
          <h2 style={{ fontSize: '1.5em' }}>Suggested Destination</h2>
          <p style={{ fontSize: '1.2rem' }}>Name: {suggestedDestination.name}</p>
          <p style={{ fontSize: '1.2rem' }}>Country: {suggestedDestination.country}</p>
          <img src={suggestedDestination.image} style={{ width: '300px', height: '300px' }} alt="Destination" />
        </div>
      </div>
    );    
  } else if (currentQuestion < questions.length) {
    // Display the current question and options
    const { question, options } = questions[currentQuestion];
   // ...
return (
  <div className='card' style={{
    width: '40%', // Adjust the width to your preference
    height: '100%', // Set the height to 50% of the viewport height
    border: '5px solid #000',
    borderRadius: '15px',
    margin: 'auto',
    marginTop: '200px',
    background: '#9faee6',
    paddingBottom: '80px',
    paddingTop: '80px',
  }}>
    <div>
      <h2 style={{ fontSize: '2rem', textAlign: 'center' }}>{question}</h2>
      <div
        style={{
          display: 'grid',
          gap: '20px', // Add gap between options vertically
          gridColumnGap: '10px', // Add gap between options horizontally (adjust as needed)
          width: '40%', // Adjust the width of the options
          margin: 'auto',
        }}
      >
        {options.map((option, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              cursor: 'pointer',
              border: '2px solid #ccc',
              backgroundColor: selectedActivities.includes(option) ? 'lightblue' : 'white',
              fontSize: '1.5rem',
              textAlign: 'center',
              width: '105%', // Adjust the width of the options
              marginLeft: '-20px',

            }}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  </div>
);

  } else {
    return null; // If there are no more questions and no suggested destination, return null
  }
};

export default Questionnaire;
