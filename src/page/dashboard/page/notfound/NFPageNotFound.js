import React, { useContext } from "react";
import { AuthContext } from "../../../../helper/context/Context";

function NFPageNotFound() {
  const { userRole } = useContext(AuthContext);
  return (
    <>
      {userRole === "" ? (
        <p>Loading...</p>
      ) : userRole !== "admin" || userRole !== "teller" ? (
        <div>
          <p>Can't find the page that you looking for!</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default NFPageNotFound;
