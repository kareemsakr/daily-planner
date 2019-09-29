import React, { useReducer } from "react";
import API from "../api/event";
import { navigate } from "../navigationRef";

const Context = React.createContext();
const Provider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "api_error":
        return {
          ...state,
          error: "An error occurred while contacting the server."
        };
      case "fetch_events":
        return { ...state, events: action.payload };

      //   case "add_event":
      //     return {
      //       ...state,
      //       events: [...state.events, { ...action.payload, isNew: true }]
      //     };

      case "delete_event":
        return {
          ...state,
          events: [...state.events.filter(i => i._id !== action.payload)]
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, { error: "", events: [] });

  const fetchEvents = async () => {
    try {
      const response = await API.get("/events");
      dispatch({ type: "fetch_events", payload: response.data });
    } catch (error) {
      console.log(error.response.data.error);
      dispatch({ type: "api_error" });
    }
  };
  const addEvent = async event => {
    try {
      dispatch({ type: "add_event", payload: event });

      await API.post("/events", event);
      await fetchEvents();
    } catch (error) {
      console.log(error.response.data.error);
      dispatch({ type: "api_error" });
    }
  };
  const deleteEvent = async id => {
    try {
      dispatch({ type: "delete_event", payload: id });
      await API.delete(`/events/${id}`);
    } catch (error) {
      console.log(error.response.data.error);
      dispatch({ type: "api_error" });
    }
  };
  const updateEvent = async () => {
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
