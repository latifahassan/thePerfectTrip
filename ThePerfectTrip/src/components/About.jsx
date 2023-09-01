import { Link } from 'react-router-dom'

export default function About() {
  const containerStyle = {
    padding: '0 10%', // Equal padding on left and right
   
    maxWidth: '800px',
    margin: '0 auto',
  };

  const headingStyle = {
    paddingTop: '100px',
  };

  const paragraphStyle = {
    fontSize: '20px',
    paddingTop: '20px',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 400,
    color: '#333',
  };

  const buttonStyle = {
    borderRadius: '6px',
    padding: '15px 30px',
    background: 'black',
    color: 'white',
    fontSize: '13px',
    marginBottom: '100px',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>The Perfect Trip</h1>
      <p style={paragraphStyle}>
        Discover your dream destination effortlessly with our holiday generator!
        Unleash amazing travel possibilities even when unsure.
      </p>
      <Link to="/questionnaire" style={{ textDecoration: 'none' }}>
        <button style={buttonStyle}>Find your dream destination</button>
      </Link>
    </div>
  );
}
