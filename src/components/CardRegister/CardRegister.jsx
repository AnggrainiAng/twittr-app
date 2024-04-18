import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
import axios from "axios";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import lockImage from "../../assets/images/lock.svg";
import crownImage from "../../assets/images/crown-blur.svg";
import { useState } from "react";
import { baseUrl } from "../../utils/config";

YupPassword(yup);

const validationSchema = yup.object().shape({
  fullname: yup.string().required("Fullname cannot be empty"),
  username: yup.string().required("Username cannot be empty"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email cannot be empty"),
  password: yup
    .string()
    .required("Password cannot be empty")
    .min(6)
    .password(
      "Password must contain at least 6 characters, 1 uppercase, 1 lowercase, and 1 number"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password cannot be empty"),
});

const CardRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data: isUsernameExist } = await axios.get(
          baseUrl + `/users?username=${values.username}`
        );

        if (isUsernameExist.length) return alert("username already exist");

        const { data: isEmailExist } = await axios.get(
          baseUrl + `/users?email=${values.email}`
        );

        if (isEmailExist.length) return alert("email already exist");

        await axios.post(baseUrl + "/users", {
          fullname: values.fullname,
          username: values.username,
          email: values.email,
          password: values.password,
        });
        alert("register success");
        navigate("/login");
      } catch (error) {
        console.error("Registration error:", error);
        alert("An error occurred during registration. Please try again later.");
      }
    },
  });

  return (
    <section className="px-8 py-8 md:px-40 w-full flex justify-center items-center gap-x-32 min-h-screen">
      <div className="w-full">
        <div className="pb-10 flex flex-col gap-y-1">
          <h2 className="font-bold text-4xl">Sign Up</h2>
          <p>{"What's trend, what's good for you."}</p>
        </div>

        <form
          id="formManager"
          className="flex flex-col gap-4"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="fullname" className="block text-base font-medium">
              Fullname
            </label>
            <div className="flex items-center justify-start rounded-full bg-[#121316]">
              <img src={crownImage} alt="crown" className="w-6 h-6 ml-4 mr-3" />
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fullname}
                type="text"
                placeholder="Fullname"
                id="fullname"
                className={`w-96 h-12 py-3 text-white bg-[#121316] text-base placeholder:text-base placeholder:text-paragraph rounded-full focus:outline-none focus:ring-0 focus:font-semibold ${
                  formik.values.fullname ? "" : "bg-[#121316]"
                }`}
              />
            </div>
            {formik.errors.fullname && formik.touched.fullname && (
              <div className="text-red-500">{formik.errors.fullname}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="block text-base font-medium">
              Username
            </label>
            <div className="flex items-center justify-start rounded-full bg-[#121316]">
              <img src={crownImage} alt="crown" className="w-6 h-6 ml-4 mr-3" />
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.username}
                type="text"
                placeholder="Username"
                id="username"
                className={`w-96 h-12 py-3 text-white bg-[#121316] text-base placeholder:text-base placeholder:text-paragraph rounded-full focus:outline-none focus:ring-0 focus:font-semibold ${
                  formik.values.username ? "" : "bg-[#121316]"
                }`}
              />
            </div>
            {formik.errors.username && formik.touched.username && (
              <div className="text-red-500">{formik.errors.username}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="block text-base font-medium">
              Email
            </label>
            <div className="flex items-center justify-start rounded-full bg-[#121316]">
              <img src={crownImage} alt="crown" className="w-6 h-6 ml-4 mr-3" />
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                placeholder="Email"
                id="email"
                className={`w-96 h-12 py-3 text-white bg-[#121316] text-base placeholder:text-base placeholder:text-paragraph rounded-full focus:outline-none focus:ring-0 focus:font-semibold ${
                  formik.values.email ? "" : "bg-[#121316]"
                }`}
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500">{formik.errors.email}</div>
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
                  <IoEyeOutline className="w-6 h-6" />
                ) : (
                  <IoEyeOffOutline className="w-6 h-6" />
                )}
              </button>
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="block text-base font-medium"
            >
              Confirm Password
            </label>
            <div className="flex items-center justify-start rounded-full bg-[#121316]">
              <img src={lockImage} alt="lock" className="w-6 h-6 ml-4 mr-3" />
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                id="confirmPassword"
                className="w-96 h-12 py-3 text-white bg-[#121316] text-base placeholder:text-base placeholder:text-paragraph rounded-full focus:outline-none focus:ring-0 focus:font-semibold"
              />
              <button
                type="button"
                className="focus:outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <IoEyeOutline className="w-6 h-6" />
                ) : (
                  <IoEyeOffOutline className="w-6 h-6" />
                )}
              </button>
            </div>
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <div className="text-red-500">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <div className="flex flex-col gap-4 mt-10">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-bold transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </button>

            <div className="bg-white text-center hover:bg-blue-500 text-black hover:text-white py-3 rounded-full font-bold transition duration-300 ease-in-out transform hover:scale-105">
              <Link to="/login">Already have an account? Sign In</Link>
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

export default CardRegister;
