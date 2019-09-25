import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/authForm";

export default function Login({ navigation }) {
  const { state, login, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        onSubmit={login}
        formTitle="Login"
        navigateTo="Signup"
        linkTitle="Sign Up Instead ?"
        errorMessage={state.errorMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200
  }
});
