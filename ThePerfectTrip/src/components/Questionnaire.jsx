// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const questions = [
//   {
//     question: 'What type of holiday do you prefer?',
//     options: ['Beach', 'City', 'Mountains', 'Countryside'],
//   },
//   {
//     question: 'Who are you travelling with?',
//     options: ['Friends', 'Family', 'Partner'],
//   },
//   {
//     question: 'What is your preferred travel activity?',
//     options: ['Relaxing on the beach', 'Watersports', 'Sightseeing', 'Wintersports', 'Eating', 'Party'],
//   },
// ];

// const Questionnaire = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [selectedActivities, setSelectedActivities] = useState([]);
//   const [suggestedDestination, setSuggestedDestination] = useState(null);

//   useEffect(() => {
//     if (currentQuestion === questions.length && selectedActivities.length === 2) {
//       // All questions have been answered and two activities have been selected, fetch suggested destination
//       const fetchSuggestedDestination = async () => {
//         try {
//           const userPreferences = {
//             type: answers[0],
//             companions: answers[1],
//             activities: selectedActivities,
//           };

//           // Make API request to backend
//           const response = await axios.post('https://perfecttripbackend.onrender.com/suggest-destination', userPreferences);

//           // Update suggestedDestination state with the fetched destination
//           setSuggestedDestination(response.data);
//         } catch (error) {
//           console.error('Error fetching suggested destination:', error);
//         }
//       };

//       fetchSuggestedDestination();
//     }
//   }, [currentQuestion, answers, selectedActivities]);

//   const handleAnswer = (selectedOption) => {
//     if (currentQuestion === questions.length - 1) {
//       // For the last question (activities), allow selecting two options
//       if (selectedActivities.length < 2) {
//         setSelectedActivities([...selectedActivities, selectedOption]);

//         if (selectedActivities.length === 1) {
//           // If one activity is selected, don't increment currentQuestion
//           return;
//         } else if (selectedActivities.length === 2) {
//           // If two activities are selected, you can now increment currentQuestion
//           setCurrentQuestion(currentQuestion + 1);
//         }
//       }
//     } else {
//       setAnswers([...answers, selectedOption]);
//       setCurrentQuestion(currentQuestion + 1); // Increment for non-last questions
//     }
//   };

//   if (currentQuestion < questions.length) {
//     // Display the current question and options
//     const { question, options } = questions[currentQuestion];

//     return (
//       <div>
//         <h2>{question}</h2>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
//           {options.map((option, index) => (
//             <div
//               key={index}
//               style={{
//                 padding: '10px',
//                 cursor: 'pointer',
//                 border: '1px solid #ccc',
//                 backgroundColor: selectedActivities.includes(option) ? 'lightblue' : 'white',
//               }}
//               onClick={() => handleAnswer(option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//         {currentQuestion === questions.length - 1 && selectedActivities.length === 2 && (
//           <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
//         )}
//       </div>
//     );
//   } else if (suggestedDestination) {
//     // Display only the name and country properties
//     return (
//       <div>
//         <h2>Suggested Destination</h2>
//         <p>Name: {suggestedDestination.name}</p>
//         <p>Country: {suggestedDestination.country}</p>
//         <img src={suggestedDestination.image} style={{ width: '100px', height: '100px' }} alt="Destination" />
//       </div>
//     );
//   }
// };

// export default Questionnaire;

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
        <h2>{question}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {options.map((option, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                cursor: 'pointer',
                border: '1px solid #ccc',
                backgroundColor: selectedActivities.includes(option) ? 'lightblue' : 'white',
              }}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return null; // If there are no more questions and no suggested destination, return null
  }
};

export default Questionnaire;
