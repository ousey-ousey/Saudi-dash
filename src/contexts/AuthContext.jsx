import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  showSettingsDropdown: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        showSettingsDropdown: false,
      };
    case "init":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case "toggleSettingsDropdown":
      return {
        ...state,
        showSettingsDropdown: !state.showSettingsDropdown,
      };
    case "closeSettingsDropdown":
      return {
        ...state,
        showSettingsDropdown: false,
      };
    default:
      throw new Error("Unknown action type");
  }
}

const FAKE_USER = {
  name: "Super Admin",
  email: "super@admin.com",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isLoading, showSettingsDropdown }, dispatch] =
    useReducer(authReducer, initialState);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const savedUser = localStorage.getItem("saudi-dash-user");
    if (savedUser) {
      dispatch({ type: "init", payload: JSON.parse(savedUser) });
    } else {
      dispatch({ type: "init", payload: null });
    }
  }, []);

  function login(email, password) {
    dispatch({ type: "loading" });

    // Simulate API call delay
    setTimeout(() => {
      if (email === "super@admin.com" && password === "123456") {
        dispatch({ type: "login", payload: FAKE_USER });
        localStorage.setItem("saudi-dash-user", JSON.stringify(FAKE_USER));
      } else {
        dispatch({ type: "logout" });
        throw new Error("Invalid email or password");
      }
    }, 500);
  }

  function logout() {
    dispatch({ type: "logout" });
    localStorage.removeItem("saudi-dash-user");
  }

  function toggleSettingsDropdown() {
    dispatch({ type: "toggleSettingsDropdown" });
  }

  function closeSettingsDropdown() {
    dispatch({ type: "closeSettingsDropdown" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        showSettingsDropdown,
        login,
        logout,
        toggleSettingsDropdown,
        closeSettingsDropdown,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
