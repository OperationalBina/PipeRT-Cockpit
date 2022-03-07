import { useState } from "react";
import LoginView from "./login-view";
import { apiPost } from "../utils/http-calls";
import { useRouter } from "next/router";
import * as CryptoJS from "crypto-js";
import { HOME_ROUTE } from "../config";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(true);
  const router = useRouter();

  const submitLogin = async () => {
    try {
      await apiPost("login", {
        username: username,
        password: CryptoJS.SHA256(password).toString(),
      });
      router.push(HOME_ROUTE);
    } catch (error) {
        setFailed(false)
        console.log(error);
    }
  };

  return (
    <LoginView
      handleSubmit={submitLogin}
      changePassword={setPassword}
      changeUsername={setUsername}
      failed={failed}
    ></LoginView>
  );
}
