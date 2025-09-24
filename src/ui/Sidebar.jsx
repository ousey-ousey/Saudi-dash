import styled from "styled-components";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Header from "./Header";
import { useSidebar } from "../contexts/SidebarContext";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-50);
  padding: ${(props) =>
    props.isCollapsed ? "3.2rem 1.2rem" : "3.2rem 2.4rem"};
  border-right: 1px solid var(--color-grey-200);
  transition: padding 0.1s ease;

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  position: relative;
  min-height: 100vh;
  overflow: visible;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(16, 185, 129, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(34, 197, 94, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 40%,
        rgba(22, 163, 74, 0.1) 0%,
        transparent 50%
      );
    pointer-events: none;
    z-index: -1;
    will-change: auto;
    transform: translateZ(0);
    backface-visibility: hidden;
    isolation: isolate;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 2rem;
  right: -1.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--color-brand-500),
    var(--color-brand-600)
  );
  border: 2px solid var(--color-grey-50);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: linear-gradient(
      135deg,
      var(--color-brand-600),
      var(--color-brand-700)
    );
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <StyledSidebar isCollapsed={isCollapsed}>
      <ToggleButton onClick={toggleSidebar}>
        {isCollapsed ? <HiOutlineBars3 /> : <HiOutlineXMark />}
      </ToggleButton>

      {/* {!isCollapsed && <Header />} */}
      {!isCollapsed && <Logo />}
      <MainNav isCollapsed={isCollapsed} />
    </StyledSidebar>
  );
}

export default Sidebar;
