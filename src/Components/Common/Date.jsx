import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import calendarAlt from '../../Assets/Images/chevron-down.svg';

const DatePickerComponent = ({ selected, onChange }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className='container'>
      <div className="custom-input" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
        <div className='date-input align-items-center d-flex'>
          {selected ? selected.toLocaleDateString() : 'Select Date'}
        </div>
        <div className="">
          <img src={calendarAlt} onClick={() => setIsCalendarOpen(!isCalendarOpen)} alt="Calendar icon" />
          {isCalendarOpen && (
            <div className="" style={{ position: 'absolute' }}>
              <DatePicker
                className='date-picker'
                selected={selected}
                onChange={(date) => {
                  onChange(date);
                  setIsCalendarOpen(false);
                }}
                inline
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePickerComponent;
