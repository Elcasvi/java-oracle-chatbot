import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <Button className='back-button' auto flat color="danger" onClick={handleBack}>
      Back
    </Button>
  );
};

export default BackButton;
