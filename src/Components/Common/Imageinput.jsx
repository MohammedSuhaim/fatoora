import React, { useState } from 'react';
import styled from 'styled-components';

const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px dashed #33C433;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  justify-content: center;
  cursor: pointer;
  position: relative;
  BACKGROUND: #F5FFF5;
`;

const ImageInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const ImageLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #33C433;
  font-size: 20px;
  font-weight: bold;
  pointer-events: none;
  text-align: center;
  background-size: cover;
  background-position: center;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  display: ${props => (props.src ? 'block' : 'none')};
`;

const ImageInputComponent = () => {
  const [imageSrc, setImageSrc] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ImageInputContainer>
      <ImageInput
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
      />
      {imageSrc ? (
        <ImagePreview src={imageSrc} alt="Uploaded Image" />
      ) : (
        <ImageLabel htmlFor="imageInput">
          <span>+</span>
        </ImageLabel>
      )}
    </ImageInputContainer>
  );
};

export default ImageInputComponent;
