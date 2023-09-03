import React from 'react';
import { styled } from '@mui/system';

const FooterContainer = styled('footer')({
  backgroundColor: (theme) => theme.palette.primary.main,
  color: (theme) => theme.palette.primary.contrastText,
  padding: '20px 0',
  textAlign: 'center',
});

function Footer() {
  return (
    <FooterContainer>
      <p>&copy; 2023 Mi Empresa</p>
    </FooterContainer>
  );
}

export default Footer;
