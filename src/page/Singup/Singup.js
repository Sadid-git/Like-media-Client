import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../UserContext/UserContext";

const Singup = () => {
  const { createUser } = useContext(AuthContext);
  const [signUpError, setSignUPError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const singUpHandle = (data) => {
    console.log(data.email, data.password);
    setSignUPError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
        console.log(error.message);
        setSignUPError(error.message);
      });
  };
  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="bg-slate-100 rounded-xl boxColor">
        <div className="w-96 p-7">
          <h3 className="text-xl text-center">Sing Up</h3>
          <form onSubmit={handleSubmit(singUpHandle)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && <p className="text-red-500">Name is required</p>}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "password is required" })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters long",
                  },
                  // pattern: {
                  //   value:
                  //     /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}/,
                  //   message: "Need a Storng passord",
                  // },
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <input
              className="btn btn-accent w-full my-5"
              value="Login"
              type="submit"
            />
            <div></div>
            {signUpError && <p className="text-red-600">{signUpError}</p>}
          </form>
          <p>
            {" "}
            Already have an account{" "}
            <Link className="text-secondary" to="/login">
              Please Login
            </Link>
          </p>
          <div className="divider"></div>
          <button className="btn btn-outline w-full">
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Singup;