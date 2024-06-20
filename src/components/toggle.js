import "./toggle.css";
import React, {useState} from 'react';

export const Toggle = ({ handleChange, isChecked }) => {
  const [modeText, setModeText] = React.useState('Dark Mode');


  const handleToggleText = () => {
    if (modeText === 'Dark Mode') {
      setModeText('Light Mode');
    } else {
      setModeText('Dark Mode');
    }
  };

  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={handleChange}
        checked={isChecked}
        onClick={handleToggleText}
      />
      <label htmlFor="check">{modeText}</label>
    </div>
  );
};