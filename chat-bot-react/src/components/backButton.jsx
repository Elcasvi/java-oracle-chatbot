import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { BackIcon } from '../assets/icons/back_icon.tsx';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <Button variant="bordered" display="flex" css={{ position: 'relative' }} onClick={handleBack}>
      <BackIcon></BackIcon>
    </Button>
  );
};

export default BackButton;
