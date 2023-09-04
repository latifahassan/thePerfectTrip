import { useState, useEffect } from 'react';
import axios from 'axios';

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
      <div>
        <h2>Suggested Destination</h2>
        <p>Name: {suggestedDestination.name}</p>
        <p>Country: {suggestedDestination.country}</p>
        <img src={suggestedDestination.image} style={{ width: '100px', height: '100px' }} alt="Destination" />
      </div>
    );
  } else if (currentQuestion < questions.length) {
    // Display the current question and options
    const { question, options } = questions[currentQuestion];
    return (
      <div> 
      <div className='card' style={{
        width: '50%',
        border: '5px solid #000',
        padding: '100px',
        borderRadius: '10px',
        margin: 'auto',
        marginTop: '300px',
        paddingBottom: '60px',
        backgroundColor: '#799B98',
        
      }}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center' }}>{question}</h2>
        <div
          style={{
            display: 'grid',
            gap: '20px', // Add gap between options vertically
            gridColumnGap: '10px', // Add gap between options horizontally (adjust as needed)
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
                fontSize: '1.2rem',
                textAlign: 'center',
                width: '500px',
                marginLeft: 'auto',
                marginRight: 'auto',
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
