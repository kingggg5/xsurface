import styled from 'styled-components';

// Primary Button (Red)
export const PrimaryButton = styled.button`
  background-color: #E04132;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  border: none;
  border-radius: 9999px; /* Full rounded */
  padding: 0 2rem;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 6px -1px rgba(224, 65, 50, 0.2), 0 2px 4px -1px rgba(224, 65, 50, 0.1);

  &:hover {
    background-color: #b91c1c;
    transform: translateY(-1px);
    box-shadow: 0 10px 15px -3px rgba(224, 65, 50, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Secondary Button (Outline)
export const SecondaryButton = styled.button`
  background-color: transparent;
  color: #111827;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  border: 2px solid #111827;
  border-radius: 9999px;
  padding: 0 2rem;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #111827;
    color: white;
  }
`;

// Input Field Styled
export const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  border: 1px solid #D9D9D9;
  border-radius: 24px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #E04132;
  }

  &::placeholder {
    color: #BCBCC0;
  }
`;
