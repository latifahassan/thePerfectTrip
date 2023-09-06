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
  document.body.style.backgroundImage = 'radial-gradient(circle, #d0d2e4, #a8aabe, #a1a4bd, #898db2, #898db2)';
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
    // Display the suggested destination uniquely
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom, #b3b6d4, #a1a4bd)',
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          paddingTop: '75%', // Set to 75% of the width to maintain aspect ratio
          overflow: 'hidden',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}>
            <img src={suggestedDestination.image} style={{
              width: '100%',
              height: '50%',
              objectFit: 'cover',
            }} alt="Destination" />
          </div>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
            zIndex: 1,
          }}></div>
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
            fontSize: '1.5rem',
            zIndex: 2,
          }}>
            <h2 style={{ fontSize: '2em' }}>Suggested Destination</h2>
            <p>Name: {suggestedDestination.name}</p>
            <p>Country: {suggestedDestination.country}</p>
          </div>
        </div>
      </div>
    );
  }
  else if (currentQuestion < questions.length) {
    // Display the current question and options
    const { question, options } = questions[currentQuestion];
   // ...
   return (
    <div className='card' style={{
      width: '50%', // Adjust the width to your preference
      height: '50%', // Set the height to 50% of the viewport height
      border: '10px solid #996dc0',
      borderRadius: '15px',
      margin: 'auto',
      marginTop: '200px',
      background:'#b3b6d4',
      paddingBottom: '80px',
      paddingTop: '30px',
      transition: 'transform 0.2s ease-in-out',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)'; // Scale up on hover
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)'; // Return to normal scale
    }}
    >
      <div>
        <h2 style={{ fontSize: '2rem', textAlign: 'center',paddingTop:'50px' }}>{question}</h2>
        <div
          style={{
            display: 'grid',
            gap: '20px', // Add gap between options vertically
            gridColumnGap: '10px', // Add gap between options horizontally (adjust as needed)
            width: '40%', // Adjust the width of the options
            margin: 'auto',
            paddingTop: '50px',
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
  