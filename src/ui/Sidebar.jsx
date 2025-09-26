import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
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

function Sidebar() {
  const { isCollapsed } = useSidebar();

  return (
    <StyledSidebar isCollapsed={isCollapsed}>
      {/* {!isCollapsed && <Header />} */}
      {!isCollapsed && <Logo />}
      <MainNav isCollapsed={isCollapsed} />
    </StyledSidebar>
  );
}

export default Sidebar;
