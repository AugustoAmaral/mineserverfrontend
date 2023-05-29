import React, { useState } from "react";
import { login } from "./requests/login";
import { storeLocalUser } from "./functions";

const Login = () => {
  const [{ user, pass, error }, setFormData] = useState<any>({
    user: "",
    pass: "",
    error: "",
  });
  const handleLogin = (e: any) => {
    e.preventDefault();
    login(user, pass)
      .then((r) => {
        storeLocalUser({
          ...r,
          expireAt: new Date(
            new Date().valueOf() + 1000 * 60 * 60 * 24 * 30
          ).toISOString(),
        });
        window.location.reload();
      })
      .catch((e) =>
        setFormData((data: any) => ({ ...data, pass: "", error: e.toString() }))
      );
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p>{error}</p>}
      <p>Username: </p>
      <input
        title="Username"
        value={user}
        onChange={(e) =>
          setFormData((data: any) => ({ ...data, user: e.target.value }))
        }
      />
      <br />
      <p>Password: </p>
      <input
        title="Password"
        type="password"
        value={pass}
        onChange={(e) =>
          setFormData((data: any) => ({ ...data, pass: e.target.value }))
        }
      />
      <br />
      <input title="Login" type="submit" />
    </form>
  );
};

export default Login;
