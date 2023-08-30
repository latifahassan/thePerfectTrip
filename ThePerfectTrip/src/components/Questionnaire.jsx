import { useState } from 'react';


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


const handleAnswer = (selectedOption) => {
setAnswers([...answers, selectedOption]);
if (currentQuestion < questions.length - 1) {
setCurrentQuestion(currentQuestion + 1);
} else {
// All questions answered, show result
// Make API call to get the destination based on answers
}
};


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
};


export default Questionnaire;



