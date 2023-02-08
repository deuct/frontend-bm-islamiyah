import { AuthContext } from "./Context";
import { useContext } from "react";

export const useAuthContext = () => {
  const userRole = useContext(AuthContext);

  if (userRole === undefined) {
    throw new Error("useAuthContext can only be used inside AuthProvider");
  }
  return userRole;
};
