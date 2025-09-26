import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const PageTitleContext = createContext();

function PageTitleProvider({ children }) {
  const [pageTitle, setPageTitle] = useState("لوحة التحكم");

  const updatePageTitle = (title) => {
    setPageTitle(title);
  };

  return (
    <PageTitleContext.Provider
      value={{
        pageTitle,
        updatePageTitle,
      }}
    >
      {children}
    </PageTitleContext.Provider>
  );
}

PageTitleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function usePageTitle() {
  const context = useContext(PageTitleContext);
  if (context === undefined)
    throw new Error("PageTitleContext was used outside PageTitleProvider");
  return context;
}

export { PageTitleProvider, usePageTitle };
