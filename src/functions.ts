import { UserData } from "./requests/login";

export const storeLocalUser = (userInfo: UserData) =>
  window.localStorage.setItem("userInfo", JSON.stringify(userInfo));

export const loadLocalUser = (): UserData | null => {
  const userInfo: any = window.localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
};

export const cleanLocalUser = () => window.localStorage.removeItem("userInfo");

export const cleanLogFileName = (logFileName: string) =>
  logFileName.replace(/^logs\/(.+)-log\.txt$/, "$1");
