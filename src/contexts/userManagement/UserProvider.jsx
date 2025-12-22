/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useCallback, useMemo } from "react";

export const userContext = createContext("Provider Not Found");

const initialState = {
  registeredUsers: [],
  isLoading: false,
  error: null
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_START":
      return {
        ...state,
        isLoading: true,
        error: null
      };
    
    case "REGISTER_SUCCESS":
      return {
        ...state,
        registeredUsers: [...state.registeredUsers, action.payload],
        isLoading: false,
        error: null
      };
    
    case "REGISTER_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

const getRegisteredUsersFromStorage = () => {
  try {
    const users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error getting users from localStorage:", error);
    return [];
  }
};

const saveRegisteredUsersToStorage = (users) => {
  try {
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users to localStorage:", error);
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    ...initialState,
    registeredUsers: getRegisteredUsersFromStorage()
  });

  const registerUser = useCallback(async (email, password) => {
    dispatch({ type: "REGISTER_START" });
    
    try {
      if (!email || !password) {
        throw new Error("Email dan password harus diisi");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Format email tidak valid");
      }

      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
        throw new Error(
          "Password minimal 8 karakter dan harus mengandung setidaknya satu huruf dan satu angka."
        );
      }

      const existingUser = state.registeredUsers.find(user => user.email === email);
      if (existingUser) {
        throw new Error("Email ini sudah terdaftar. Silakan gunakan email lain.");
      }

      const newUser = { email, password };
      
      const updatedUsers = [...state.registeredUsers, newUser];
      saveRegisteredUsersToStorage(updatedUsers);
      
      dispatch({ 
        type: "REGISTER_SUCCESS", 
        payload: newUser 
      });
      
      return { success: true };
    } catch (error) {
      dispatch({ 
        type: "REGISTER_FAILURE", 
        payload: error.message 
      });
      return { success: false, error: error.message };
    }
  }, [state.registeredUsers]);

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  const value = useMemo(() => ({
    registeredUsers: state.registeredUsers,
    isLoading: state.isLoading,
    error: state.error,
    registerUser,
    clearError
  }), [state.registeredUsers, state.isLoading, state.error, registerUser, clearError]);

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};