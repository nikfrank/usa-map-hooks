import React, { useState } from 'react';
import './App.css';

import USA from './USA';

const colors = ['red', 'blue', 'green'];

const App = ()=> {

  const [mapColors, setMapColors] = useState({});

  const changeStateColor = (event)=>{
    setMapColors({
      ...mapColors,
      [event.target.id]: colors[
        (colors.indexOf( mapColors[event.target.id]) + 1 ) % colors.length
      ]
    })
  };

  
  return (
    <div className="App">
      <USA mapColors={mapColors}
           onClick={changeStateColor}
      />
    </div>
  );
}

export default App;
