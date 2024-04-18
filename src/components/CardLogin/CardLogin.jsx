import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
import lockImage from "../../assets/images/lock.svg";
import crownImage from "../../assets/images/crown-blur.svg";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

import axios from "axios";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/slices/userSlice";
import { baseUrl } from "../../utils/config";

YupPassword(yup);

const validationSchema = yup.object().shape({
  usernameOrEmail: yup.string().required("Username or Email cannot be empty"),
  password: yup
    .string()
    .required("Password cannot be empty")
    .min(6)

    .password(
      "Password must contain at least 6 characters, 1 uppercase, 1 lowercase, and 1 number"
    ),
});

const CardLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const isEmail = values.usernameOrEmail.includes("@");
      try {
        let userData;
        if (isEmail) {
          userData = await axios.get(
            baseUrl +
              `/users?email=${values.usernameOrEmail}&&password=${values.password}`
          );
        } else {
          userData = await axios.get(
            baseUrl +
              `/users?username=${values.usernameOrEmail}&&password=${values.password}`
          );
        }
        if (!userData.data.length) {
          return alert("wrong credentials");
        }
        localStorage.setItem("twitter_app", JSON.stringify(userData.data[0]));
        dispatch(loginAction(userData.data[0]));
        alert("Login Success!!!");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <section className="px-8 md:px-40 w-full flex justify-center items-center gap-x-32 min-h-screen">
      <div className="w-full">
        <div className="pb-10 flex flex-col gap-y-1">
          <h2 className="font-bold text-4xl">Happening Today</h2>
          <p className="">{`What's trending, what's good for you.`}</p>
          {/* <div
              id="instantFeedback"
              className="mt-3 flex flex-row p-3 rounded-xl text-base bg-red-500 text-white font-bold"
            ></div> */}
        </div>

        <form
          id="formManager"
          className="flex flex-col gap-4"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="usernameOrEmail"
              className="block text-base font-medium"
            >
              Username/Email
            </label>

            <div className="flex items-center justify-start rounded-full bg-[#121316]">
              <img src={crownImage} alt="crown" className="w-6 h-6 ml-4 mr-3" />
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.usernameOrEmail}
                type="text"
                placeholder="Username/Email"
                id="usernameOrEmail"
                className={`w-96 h-12 py-3 text-white bg-[#121316] text-base placeholder:text-base placeholder:text-paragraph rounded-full focus:outline-none focus:ring-0 focus:font-semibold ${
                  formik.values.usernameOrEmail ? "" : "bg-[#121316]"
                }`}
              />
            </div>

            {formik.errors.usernameOrEmail &&
              formik.touched.usernameOrEmail && (
                <div className="text-red-500">
                  {formik.errors.usernameOrEmail}
                </div>
              )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="block text-base font-medium">
              Password
            </label>
            <div className="flex items-center justify-start rounded-full bg-[#121316]">
              <img src={lockImage} alt="lock" className="w-6 h-6 ml-4 mr-3" />
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                className="w-96 h-12 py-3 text-white bg-[#121316] text-base placeholder:text-base placeholder:text-paragraph rounded-full focus:outline-none focus:ring-0 focus:font-semibold"
              />

              <button
                type="button"
                className="focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoEyeOutline className="  mr-4  md:w-6 md:h-6" />
                ) : (
                  <IoEyeOffOutline className=" mr-4 md:w-6 md:h-6" />
                )}
              </button>
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>

          <div className="flex flex-col gap-4 mt-10">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-bold transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign In
            </button>

            <div className="bg-white text-center hover:bg-blue-500 text-black hover:text-white py-3 rounded-full font-bold transition duration-300 ease-in-out transform hover:scale-105">
              <Link to="/register">Create New Account</Link>
            </div>
          </div>
        </form>
      </div>

      <div className="hidden md:block w-fit h-fit">
        <h1 className="font-extrabold text-9xl">twittr.</h1>
      </div>
    </section>
  );
};

export default CardLogin;
