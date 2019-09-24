import React, { useReducer } from "react";
import API from "../api/event";

const Context = React.createContext();
const Provider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "api_error":
        return {
          ...state,
          error: "An error occurred while contanting the server."
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, { error: "", events: "" });

  const fetchEvents = async () => {
    try {
      const response = await API.get("/events");
      console.log(response.data);
      dispatch({ type: "fetch_events", payload: response.data });
    } catch (error) {
      console.log(error.response.data.error);
      dispatch({ type: "fetch_events" });
    }
  };
  const addEvent = () => {
    dispatch();
  };
  const deleteEvent = () => {
    dispatch();
  };
  const updateEvent = () => {
    dispatch();
  };

  return (
    <Context.Provider
      value={{ state, fetchEvents, addEvent, deleteEvent, updateEvent }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
