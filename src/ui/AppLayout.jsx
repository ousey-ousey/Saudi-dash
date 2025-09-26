import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageHeader from "./PageHeader";
import styled from "styled-components";
import { SidebarProvider, useSidebar } from "../contexts/SidebarContext";
import { PageTitleProvider } from "../contexts/PageTitleContext";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isCollapsed ? "8rem 1fr" : "26rem 1fr"};
  grid-template-rows: 1fr;
  min-height: 100vh;
  width: 100%;
  transition: grid-template-columns 0.1s ease;
`;

const Main = styled.main`
  background: var(--color-dark);
  padding: 2rem 1rem 2rem;
  overflow: hidden;
  width: 100vw;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    padding: 1.5rem 0.8rem 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 0.5rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.3rem 0.5rem;
  }
`;

function AppLayoutContent() {
  const { isCollapsed } = useSidebar();

  return (
    <StyledAppLayout isCollapsed={isCollapsed}>
      <Sidebar style={{ zIndex: 100 }} />
      <Main style={{}}>
        <PageHeader />
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

function AppLayout() {
  return (
    <SidebarProvider>
      <PageTitleProvider>
        <AppLayoutContent />
      </PageTitleProvider>
    </SidebarProvider>
  );
}

export default AppLayout;
