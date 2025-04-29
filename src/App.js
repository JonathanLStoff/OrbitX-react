import logo from './logo.svg';
import './App.css';
import React from 'react';
import './FeaturesList.css'; 

function App() {
  // Apply background color to the body
  document.body.style.backgroundColor = '#000';

  const containerStyle = {
    height: '300vh',
    overflowY: 'scroll',
    scrollSnapType: 'y mandatory',
    backgroundColor: '#000',
    overscrollBehaviorY: 'none',
  };

  const containerScrollbarStyle = `
    &::-webkit-scrollbar { width: 8px; }
    &::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.2);
      border-radius: 4px;
    }
  `;

  const sectionStyle = {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    scrollSnapAlign: 'start',
    transition: 'background-color 0.5s ease',
  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'blur(10px)',
    transition: 'filter 0.3s ease',
  };

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.85) 100%)',
  };
  const featuresData = [
    { text: 'Streamline your workflow with custom cue sheets' },
    { text: 'Control your production with a single click with custom midi cues' },
    { text: 'Simple interface for easy navigation and control' },
    { text: 'Built for Musicians, Thespians, and Performers by a team of Artists' },
    { text: 'Built for the future of live performance' },
    {
      text: 'First generation will include these features:',
      subFeatures: [
        'Audio cues',
        'Video cues',
        'Image cues',
        'MIDI control & note cues',
        'Group cues',
        'Customizable plugins',
      ],
    },
  ];
  return (
    <div style={containerStyle}>
      {/* First Section */}
      <section style={{ ...sectionStyle, backgroundColor: '#000' }}>
        <img
          src={"./orbitbgro.gif"}
          alt="logo"
          style={{ ...backgroundStyle, filter: 'blur(20px)' }}
        />
        <div style={overlayStyle} />

        <div style={{
          position: 'relative',
          color: '#fff',
          fontSize: '4rem',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(0,0,0,0.7)',
        }}>
          Orbit‑X:
          <br />
        </div>
        <div style={{
          position: 'relative',
          color: '#fff',
          fontSize: '2rem',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(0,0,0,0.7)',
        }}>
          Orchestrating your production made easy
          <br />
        </div>
        <div style={{
          position: 'relative',
          color: '#fff',
          fontSize: '2rem',
          fontStyle: 'italic',
          textShadow: '0 0 10px rgba(0,0,0,0.7)',
        }}>
          Coming in 2026
        </div>
      </section>

      {/* Second Section */}
      <section style={{ ...sectionStyle, backgroundColor: '#121212', color: '#eee' }}>
        <img
          src='./screencap.png'
          alt="second background"
          style={{ ...backgroundStyle, filter: 'blur(10px)' }}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            A revolutionary platform for production management
          </h2>
          <div className="features-container">
      <ul className="main-features-list">
        {featuresData.map((feature, index) => (
          <li key={index} className="main-feature-item">
            {feature.text}
            {feature.subFeatures && (
              <ul className="sub-features-list">
                {feature.subFeatures.map((subFeature, subIndex) => (
                  <li key={subIndex} className="sub-feature-item">
                    {subFeature}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
        </div>
      </section>
    {/* Third Section */}
    <section style={{ ...sectionStyle, backgroundColor: '#121212', color: '#eee' }}>
        <img
          src='./soundb.jpeg'
          alt="third background"
          style={{ ...backgroundStyle, filter: 'blur(10px)' }}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Contact Us with Questions or Comments:
          </h2>
          <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            <a href="mailto:stoffaudio@gmail.com" style={{ color: '#fff', textDecoration: 'underline' }}>
            stoffaudio@gmail.com
            </a>
          </p>
      
        
        </div>
      </section>
    </div>
  );
}

export default App;