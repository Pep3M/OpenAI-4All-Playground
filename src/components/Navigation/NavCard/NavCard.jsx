import { Card } from '@mui/material';
import React from 'react';

const NavCard = ({children}) => {
  return (
    <Card elevation={3} sx={{
      p: 2
    }}>
      {children}
    </Card>
  );
}

export default NavCard;
