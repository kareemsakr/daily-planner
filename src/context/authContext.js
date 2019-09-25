import React, { useReducer } from "react";
import { AsyncStorage } from "react-native";
import API from "../api/event";
import { navigate } from "../navigationRef";
const reducer = (state, action) => {
  switch (action.type) {
    case "signOut":
      return { token: null, errorMessage: "" };
    case "serverError":
    case "signUpError":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { token: action.payload.token, errorMessage: "" };
    case "clearErrorMessage":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const Context = React.createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    token: null,
    errorMessage: ""
  });

  const signUp = dispatch => {
    return async ({ email, password }) => {
      try {
        const { data } = await API.post("/signup", {
          email,
          password
        });
        const { user, token } = data;
        await AsyncStorage.setItem("token", token);
        dispatch({ type: "signUp", payload: { user, token } });
        navigate("TrackListScreen");
      } catch (error) {
        console.log(error.message);
        if (error.response.status === 500) {
          dispatch({ type: "serverError", payload: "Something went wrong" });
        } else {
          dispatch({ type: "signUpError", payload: error.response.data });
        }
      }
    };
  };
  const login = async ({ email, password }) => {
    console.log("trying to login");
    try {
      const { data } = await API.post("/login", { email, password });
      const { user, token } = data;
      await AsyncStorage.setItem("token", token);
      dispatch({ type: "login", payload: { user, token } });
      navigate("TrackListScreen");
    } catch (error) {
      if (error.response.status === 500) {
        dispatch({ type: "serverError", payload: "Something went wrong" });
      } else {
        dispatch({ type: "signUpError", payload: error.response.data });
      }
    }
  };

  const localSignIn = async () => {
    const token = await AsyncStorage.getItem("token", token);
    console.log(token);
    if (token) {
      dispatch({ type: "login", payload: { token } });
      navigate("mainFlow");
    } else {
      navigate("LoginFlow");
    }
  };

  const clearErrorMessage = () => dispatch({ type: "clearErrorMessage" });

  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signOut", payload: "" });
    navigate("LoginFlow");
  };

  return (
    <Context.Provider
      value={{ state, signUp, login, clearErrorMessage, localSignIn, signOut }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
