import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  color: var(--color-grey-700);

  &:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }

  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }
`;

export default Input;
