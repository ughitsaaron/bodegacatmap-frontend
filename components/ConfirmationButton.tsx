import { Button, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useToggle } from '../hooks';

const StyledButton = styled(Button)``;
const ButtonContainer = styled.div`
  display: flex;

  ${StyledButton} {
    margin-right: ${(p) => p.theme.spacing(1)}px;
  }
`;

export default function ConfirmationButton({
  children,
  confirmationMessage,
  onConfirm = () => {},
  disabled,
  className,
}) {
  const { isToggled, toggle } = useToggle();

  return (
    <div className={className}>
      {isToggled ? (
        <React.Fragment>
          <Typography gutterBottom>{confirmationMessage}</Typography>
          <ButtonContainer>
            <StyledButton onClick={toggle} variant="contained">
              Cancel
            </StyledButton>
            <Button color="secondary" variant="contained" disabled={disabled} onClick={onConfirm}>
              Yes
            </Button>
          </ButtonContainer>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Button onClick={toggle} color="secondary" variant="contained" disabled={disabled}>
            {children}
          </Button>
        </React.Fragment>
      )}
    </div>
  );
}
