import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";

export default function ResolveAuthScreen({ navigation }) {
  const { localSignIn } = useContext(AuthContext);

  useEffect(() => {
    localSignIn();
  }, []);
  return null;
}
