import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [text, setText] = useState('');
  const originalText = 'Harvesting Global Wellbeing: Cultivating a Fresh Tomorrow.';

  useEffect(() => {
    let i = 0;

    const updateText = () => {
      setText((prevText) => prevText + originalText[i]);
      i++;

      // Stop interval when all letters are displayed
      if (i === originalText.length) {
        clearInterval(intervalId);
        setText(originalText); // Set the final text once the animation is complete
      }
    };

    const intervalId = setInterval(updateText, 100);

    // Set the initial state before starting the interval
    setText(originalText[0]);

    // Clear interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [originalText]);

  return (
    <div>
      <h1>
        {text.includes('Cultivating a Fresh Tomorrow.') ? (
          <>
            <span style={{ color: 'white' }}>Harvesting Global Wellbeing: </span>
            <span className='text-green-500'>Cultivating a Fresh Tomorrow.</span>
          </>
        ) : (
          text
        )}
      </h1>
      {/* Rest of your dashboard content */}
    </div>
  );
};

export default Dashboard;
