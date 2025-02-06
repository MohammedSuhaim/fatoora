import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import calendarAlt  from '../../Assets/Images/Insta.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
`;

const DateInput = styled.input`
  border: none;
  outline: none;
  padding: 5px;
  flex: 1;
`;


// const CalendarIcon = CalendarAlt`
//   cursor: pointer;
//   margin-left: 5px;
// `;

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <Container>
      <DateInput
        type="text"
        value={selectedDate ? selectedDate.toLocaleDateString() : ''}
        readOnly
      />
      <div className="">
      <img src={calendarAlt} onClick={() => setIsCalendarOpen(!isCalendarOpen)} />
      {isCalendarOpen && (
        <div className="" style={{position: 'absolute', right: '0'}}>
        <DatePicker
        className='date-picker'
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setIsCalendarOpen(false);
          }}
          inline
        /></div>
      )}</div>
    </Container>
  );
};

export default DatePickerComponent;
