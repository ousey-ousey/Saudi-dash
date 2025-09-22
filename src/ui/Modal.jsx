import styled from "styled-components";
import PropTypes from "prop-types";
import { createContext, useContext, useState, cloneElement } from "react";
import { createPortal } from "react-dom";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-1000);
    stroke: var(--color-grey-1000); */
    color: var(--color-grey-1000);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const open = (name) => setOpenName(name);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens, ...props }) {
  const { open } = useContext(ModalContext);
  return (
    <button {...props} onClick={() => open(opens)}>
      {children}
    </button>
  );
}

function Window({ name, children }) {
  const { openName, close } = useContext(ModalContext);
  if (openName !== name) return null;

  return createPortal(
    <Overlay onClick={close}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        {cloneElement(children, { closeModal: close })}
        <Button onClick={close} aria-label="Close modal">
          ×
        </Button>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

// PropTypes for ESLint prop validation
Modal.propTypes = {
  children: PropTypes.node,
};

Open.propTypes = {
  children: PropTypes.node,
  opens: PropTypes.string.isRequired,
};

Window.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
};
