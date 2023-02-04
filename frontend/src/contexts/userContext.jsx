import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";

const initialState = {
  error: null
};

const UserContext = createContext({});

export function useAuth() {
  return useContext(UserContext);
}
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "loginStart":
      return {
        error: null
      };
    case "loginSuccess":
      return {
        error: null
      };
    case "signupStart":
      return {
        error: null
      };
    case "signupSuccess":
      return {
        error: null
      };
    case "actionFailure":
      return {
        error: action.payload
      };
    case "logout":
      return {
        error: null
      };
    default:
      return state;
  }
};

export function UserContextProvider({children}) {
  const stateAndDispatch = useReducer(AuthReducer, initialState);
  const [state, dispatch] = stateAndDispatch;
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({data}) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{user, setUser, ready, error: state.error, dispatch}}>
      {children}
    </UserContext.Provider>
  );
}
