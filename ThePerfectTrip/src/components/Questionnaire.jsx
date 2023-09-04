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
    options: [
      'Relaxing on the beach',
      'Watersports',
      'Sightseeing',
      'Wintersports',
      'Eating',
      'Party',
    ],
  },
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [suggestedDestination, setSuggestedDestination] = useState(null);

  useEffect(() => {
    if (currentQuestion === questions.length) {
      // All questions have been answered, fetch suggested destination
      const fetchSuggestedDestination = async () => {
        try {
          const userPreferences = {
            type: answers[0],
            companions: answers[1],
            activities: selectedActivities, // Use selectedActivities instead of answers[2]
          };

          // Ensure that exactly two activities are selected
          if (selectedActivities.length === 2) {
            // Make API request to backend
            const response = await axios.post(
              'https://perfecttripbackend.onrender.com/suggest-destination',
              userPreferences
            );

            // Update suggestedDestination state with the fetched destination
            setSuggestedDestination(response.data);
          } else {
            console.error('Please select exactly two activities.');
          }
        } catch (error) {
          console.error('Error fetching suggested destination:', error);
        }
      };

      fetchSuggestedDestination();
    }
  }, [currentQuestion, answers, selectedActivities]);

  const handleAnswer = (selectedOption) => {
    if (currentQuestion === 2) {
      // Check if the selected option is already in the selectedActivities array
      if (!selectedActivities.includes(selectedOption)) {
        // Ensure that only two activities are selected
        if (selectedActivities.length < 2) {
          setSelectedActivities([...selectedActivities, selectedOption]);
        }
      }
    } else {
      setAnswers([...answers, selectedOption]);
    }

    setCurrentQuestion(currentQuestion + 1);
  };
  if (currentQuestion < questions.length) {
    // Display the current question and options
    const { question, options } = questions[currentQuestion];

    return (
      <div>
        <h2>{question}</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                cursor: 'pointer',
                border: '1px solid #ccc',
              }}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    );
  } else if (suggestedDestination) {
    // Display only the name and country properties
    return (
      <div>
        <h2>Suggested Destination</h2>
        <p>Name: {suggestedDestination.name}</p>
        <p>Country: {suggestedDestination.country}</p>
        <img
          src={suggestedDestination.image}
          style={{ width: '100px', height: '100px' }}
          alt="Suggested Destination"
        />
      </div>
    );
  }
};

export default Questionnaire;
