import { useState,useEffect } from 'react';
import axios from 'axios';

const questions = [
{
question: 'What type of holiday do you prefer?',
options: ['Beach', 'City', 'Mountains', 'Countryside'],
},
{
question: 'Who are you travelling with?',
options: ['Friends', 'Family', 'Partner']
},
{
question: 'What is your preferred travel activity?',
options: ['Relaxing on the beach', 'Watersports','Sightseeing', 'Wintersports','Eating','Party'],
},
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [suggestedDestination, setSuggestedDestination] = useState(null);

  useEffect(() => {
    if (currentQuestion === questions.length) {
      // All questions have been answered, fetch suggested destination
      const fetchSuggestedDestination = async () => {
        try {
          const userPreferences = {
            type: answers[0],
            companions: answers[1],
            activities: answers[2],
          };

          // Make API request to backend
          const response = await axios.post('http://localhost:5000/suggest-destination', userPreferences);

          // Update suggestedDestination state with the fetched destination
          setSuggestedDestination(response.data);
        } catch (error) {
          console.error('Error fetching suggested destination:', error);
        }
      };

      fetchSuggestedDestination();
    }
  }, [currentQuestion, answers]);

  const handleAnswer = (selectedOption) => {
    setAnswers([...answers, selectedOption]);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (currentQuestion < questions.length) {
    // Display the current question and options
    const { question, options } = questions[currentQuestion];

    return (
      <div>
        <h2>{question}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
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
        <img src={suggestedDestination.image} style={{width:'100px',height:'100px'}}/>
      </div>
    );
  } else {
    // Loading state while waiting for destination data
    return <p>Loading...</p>;
  }
};

export default Questionnaire;