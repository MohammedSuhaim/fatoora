import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 28px;
  flex-wrap: wrap;
  gap: 10px;
`;

const TextBox = styled.div`
  margin-right: 10px;
  padding: 4px 12px;
  background-color: #e9e9e9;
  border-radius: 8px;
  white-space: nowrap;
`;

const Input = styled.input`
  padding: 4px 12px;
  outline: none;
  border-radius: 8px;
  border: 1px solid #ccc;
  min-width: 10rem;
  width: 10rem;
`;

const TextInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setItems((prevItems) => [...prevItems, inputValue]);
      setInputValue(""); // Clear the input after adding
    }
  };

  const handleDeleteItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };
  return (
    <div className="">
       <Container className="mt-2">

       {items.map((text, index) => (
          <TextBox key={index}>
            {text}
            <button style={{background: 'none', border: 'none', padding: '5px', color: 'red'}} onClick={() => handleDeleteItem(index)}>x</button>
          </TextBox>
        ))}
    <form onSubmit={handleAddItem}>
        <Input
          className="text-input-item"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text"
        />
    </form>
    </Container>
    </div>
  );
};

export default TextInput;
