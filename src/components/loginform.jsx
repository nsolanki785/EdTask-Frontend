import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice"; // Ensure correct path
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    const response = await dispatch(loginUser(values));
    if (response?.payload.status == 200) {
      console.log("message: ", response?.payload.status);

      localStorage.setItem("token", response?.payload.data.token);
      navigate("/dashboard");
      // toast.success(response?.payload?.data?.message);
    } else {
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex justify-center items-center px-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 sm:p-8">
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center">
            Sign in to your account
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="••••••••"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      name="remember"
                      id="remember"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-3 focus:ring-primary-300"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  {/* <a
                    href="#"
                    className="text-sm text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Forgot password?
                  </a> */}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full cursor-pointer text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>

                {/* Signup Redirect */}
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  {/* Don’t have an account yet?{" "} */}
                  <span
                    onClick={() => navigate("/admin/signup")}
                    className="text-primary-600 hover:underline cursor-pointer dark:text-primary-500"
                  >
                    Admin Sign up
                  </span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  {/* Don’t have an account yet?{" "} */}
                  <span
                    onClick={() => navigate("/Customer/signup")}
                    className="text-primary-600 hover:underline cursor-pointer dark:text-primary-500"
                  >
                    Customer Sign up
                  </span>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
