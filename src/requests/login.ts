export interface UserData {
  username: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  objectId: string;
  sessionToken: string;
  admin: boolean;
  expireAt: string;
}

export const login = (username: string, password: string): Promise<UserData> =>
  fetch(process.env.REACT_APP_PARSE_URL + "login", {
    headers: {
      "X-Parse-Application-Id": process.env.REACT_APP_PARSE_ID,
      "X-Parse-Rest-Api-Key": process.env.REACT_APP_REST_API_KEY,
    } as HeadersInit,
    method: "POST",
    body: JSON.stringify({ username, password }),
  }).then((r) => {
    if (r.status === 200) return r.json();
    if (r.json)
      return r
        .json()
        .then((e) => {
          throw new Error(e.error);
        })
        .catch(() => {
          throw new Error("Something went wrong. contact the administrator.");
        });
    throw new Error("Something went wrong. contact the administrator.");
  });
