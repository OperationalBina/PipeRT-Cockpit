import { useState } from "react";
import LoginView from "./login-view";
import { apiPost } from "../utils/http-calls";
import { useRouter } from "next/router";
import { HOME_ROUTE } from "../config";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const router = useRouter();

  const submitLogin = () => {
    apiPost("login", {
      username: username,
      password: password,
    })
      .then(() => router.push(HOME_ROUTE))
      .catch(() => setIsValid(false));
  };

  return (
    <LoginView
      handleSubmit={submitLogin}
      changePassword={setPassword}
      changeUsername={setUsername}
      isValid={isValid}
    ></LoginView>
  );
}
