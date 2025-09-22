import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const SidebarContext = createContext();

function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Load collapsed state from localStorage
    const saved = localStorage.getItem("saudi-dash-sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem(
        "saudi-dash-sidebar-collapsed",
        JSON.stringify(newState)
      );
      return newState;
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined)
    throw new Error("SidebarContext was used outside SidebarProvider");
  return context;
}

export { SidebarProvider, useSidebar };
