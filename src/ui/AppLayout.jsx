import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { SidebarProvider, useSidebar } from "../contexts/SidebarContext";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isCollapsed ? "8rem 1fr" : "26rem 1fr"};
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  transition: grid-template-columns 0.1s ease;
`;

const Main = styled.main`
  background-color: var(--color-grey-100);
  padding: 4rem 4.8rem 6.4rem;
  overflow: visible;
`;

function AppLayoutContent() {
  const { isCollapsed } = useSidebar();

  return (
    <StyledAppLayout isCollapsed={isCollapsed}>
      <Sidebar style={{ zIndex: 40 }} />
      <Header />
      <Main style={{ zIndex: 0, width: "100%" }}>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

function AppLayout() {
  return (
    <SidebarProvider>
      <AppLayoutContent />
    </SidebarProvider>
  );
}

export default AppLayout;
