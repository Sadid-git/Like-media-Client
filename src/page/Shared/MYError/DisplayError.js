import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../UserContext/UserContext";

const DisplayError = () => {
  const { logOut } = useContext(AuthContext);
  const error = useRouteError();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <p className="text-red-500">Something went wrong!!!</p>
        <p className="text-red-400">{error.statusText || error.message}</p>
        <h4 className="text-3xl">
          {" "}
          Please{" "}
          <button onClick={handleLogOut} className="btn btn-outline">
            Sign out
          </button>{" "}
          and log back in
        </h4>
      </div>
    </div>
  );
};

export default DisplayError;