import { useEffect } from "react";
import { usePageTitle as usePageTitleContext } from "../contexts/PageTitleContext";

/**
 * Custom hook to set the page title dynamically
 * @param {string} title - The title to set for the current page
 */
function usePageTitle(title) {
  const { updatePageTitle } = usePageTitleContext();

  useEffect(() => {
    if (title) {
      updatePageTitle(title);
    }
  }, [title, updatePageTitle]);
}

export default usePageTitle;
