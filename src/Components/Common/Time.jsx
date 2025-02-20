// TimePickerComponent.js
import React, { useState } from 'react';

const TimePickerComponent = ({ selected, onChange }) => {
  const [time, setTime] = useState(selected || "");

  const handleTimeChange = (event) => {
    const [hours, minutes] = event.target.value.split(':');
    const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
    setTime(formattedTime);
    onChange(formattedTime);
  };

  return (
   <div className="container">
     <div className="time-picker-container">
      <input
        type="time"
        value={time.slice(0, 5)}
        onChange={handleTimeChange}
        className="custom-time-input custom-input"
      />
    </div>
   </div>
  );
};

export default TimePickerComponent;
