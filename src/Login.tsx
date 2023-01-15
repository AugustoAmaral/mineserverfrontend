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
      .catch((e) => setFormData({ user: "", pass: "", error: e.toString() }));
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p>{error}</p>}
      <p>Usuário: </p>
      <input
        title="Usuário"
        value={user}
        onChange={(e) =>
          setFormData((data: any) => ({ ...data, user: e.target.value }))
        }
      />
      <br />
      <p>Senha: </p>
      <input
        title="senha"
        type="password"
        value={pass}
        onChange={(e) =>
          setFormData((data: any) => ({ ...data, pass: e.target.value }))
        }
      />
      <br />
      <input title="Entrar" type="submit" />
    </form>
  );
};

export default Login;
