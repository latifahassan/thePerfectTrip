export default function About() {
    const containerStyle = {
      paddingLeft: '300px',
    };
  
    return (
      <div style={containerStyle}>
        <h1 style={{paddingTop:'50px'}}>The Perfect Trip</h1>
        <p style={{fontSize:'20px', paddingTop:'20px',fontFamily: 'Montserrat, sans-serif', fontWeight: 50, color: '#333' }}>Discover your dream destination effortlessly with our holiday generator! Unleash amazing travel possibilities even when unsure.</p>
        <button style={{borderRadius:'6px', padding:'15px',background:'black',color:'white',fontSize:'13px', marginTop:'10px'}}>Find your dream destination</button>
      </div>
    );
  }
  