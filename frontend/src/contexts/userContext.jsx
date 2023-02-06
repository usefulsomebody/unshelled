import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';

const initialState = {
  error: null
};

const UserContext = createContext({});

export function useAuth() {
  return useContext(UserContext);
}
const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'loginStart':
      return {
        error: null
      };
    case 'loginSuccess':
      return {
        error: null
      };
    case 'signupStart':
      return {
        error: null
      };
    case 'signupSuccess':
      return {
        error: null
      };
    case 'actionFailure':
      return {
        error: action.payload
      };
    case 'logout':
      return {
        error: null
      };
    default:
      return state;
  }
};

export function UserContextProvider({ children }) {
  const stateAndDispatch = useReducer(AuthReducer, initialState);
  const [state, dispatch] = stateAndDispatch;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dataFetchedRef = useRef(false);

  const fetchData = () => {
    axios.get('/account/fetch').then(({ data }) => {
      setUser(data);
      setLoading(false);
    });
  };
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    if (!user) {
      fetchData();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error: state.error, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
