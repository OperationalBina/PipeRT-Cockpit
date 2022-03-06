import { useState } from "react";
import LoginView from "./login-view";

function submitLogin(username, password) {
  const usr = username;
  const pass = password;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LoginView
      handleSubmit={submitLogin}
      changePassword={setPassword}
      changeUsername={setUsername}
    ></LoginView>
  );
}
