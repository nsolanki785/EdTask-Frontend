import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CreateAccountsvg from "../assets/4957136.jpg";
// import h from "../../../components/common/h/index.jsx";
import api from "../services/api.js";
import Verfication from "./verification.jsx";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice.js";

const Registration = ({ selectedrole }) => {
  const [disableSubmitBtn, setdisableSubmitBtn] = useState(true);
  const [showRequestOtpbtn, setshowRequestOtpbtn] = useState(true);
  const [showOtpField, setShowOtpField] = useState(false);
  const [showVerificationMessage, setVerificationMessage] = useState(true);
  const [disableEmailField, setDisableEmailField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [otp, setOtp] = useState("");
  const [userDetails, setUserdetails] = useState({});
  const [isRequesting, setIsRequesting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, resetForm, setSubmitting) => {
    try {
      const registeruser = await dispatch(
        registerUser({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          role: values.role,
          isVerified: true,
        })
      );

      if (registeruser?.payload?.status === 201) {
        toast.success(registeruser?.data?.message);
        resetForm();
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        toast.error(registeruser?.payload?.message);
      }
      setSubmitting(false);
    } catch (err) {
      toast.error(err?.response?.data?.message);

      console.log(err);
      setSubmitting(false);
    }
  };

  const requestToOtp = async (values, resetForm) => {
    try {
      if (values?.email) {
        setIsRequesting(true);
        const sendOtpforverification = await api.post("/auth/request-otp", {
          email: values.email,
        });

        if (sendOtpforverification.status == 201) {
          setDisableEmailField(true);
          setIsRequesting(false);
          setUserdetails({
            email: values.email,
          });
          resetForm();
          setShowErrorMessage(true);
          toast.success(sendOtpforverification.data.message);
          setshowRequestOtpbtn(false);
          setShowOtpField(true);
        } else {
          setIsRequesting(false);
          toast.error(sendOtpforverification?.response?.data.message);
        }
      } else {
        toast.error("Please fill email.");
      }
    } catch (err) {
      console.log(err?.response?.data?.message);

      toast.error(err?.response?.data?.message);
    }
    // if error occur show error message
  };
  const handleVerify = async (values) => {
    console.log("Verify", values);
    if (otp) {
      const verifyOtpforuserragister = await api.post("/auth/verify-otp", {
        email: values.email,
        otp: otp,
      });
      if (verifyOtpforuserragister.status == 200) {
        toast.success(verifyOtpforuserragister.data.message);
        // setShowErrorMessage(true);
        setdisableSubmitBtn(false);
        setshowRequestOtpbtn(false);
        setShowOtpField(false);
        // setVerificationMessage(false);
      } else {
        toast.error(verifyOtpforuserragister?.response?.data?.message);
      }
    } else {
      toast.error("OTP is required for verification ");
    }
  };

  const signupValidation = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one special character (e.g., !@#$%^&*), and be at least 8 characters long."
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    role: Yup.string().required("Role is required"),
  });

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: userDetails?.email || "admin@eracalculations.com",
                password: "",
                confirmPassword: "",
                role: selectedrole || "customer", // Default role
                isVerified: true,
              }}
              validationSchema={signupValidation}
              onSubmit={(values, { resetForm, setSubmitting }) => {
                handleSubmit(values, resetForm, setSubmitting);
              }}
            >
              {({
                values,
                errors,
                isSubmitting,
                handleChange,
                setFieldValue,
                resetForm,
              }) => (
                <Form className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="flex flex-col justify-center text-gray-600">
                    <img src={CreateAccountsvg} alt="create account" />
                  </div>
                  <div className="lg:col-span-2">
                    <h1 className="font-bold text-3xl">
                      Create{" "}
                      {selectedrole?.[0]?.toUpperCase() +
                        selectedrole?.slice(1, selectedrole.length)}{" "}
                      Account
                    </h1>
                    <div className="text-gray-600 mt-1 mb-2">
                      <p className="font-large text-sm">
                        Please First Verify Email Address
                      </p>
                    </div>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                      <div className="md:col-span-4  border-b-1 mb-4">
                        <Verfication
                          handleChange={handleChange}
                          setFieldValue={setFieldValue}
                          values={values}
                          showRequestOtpbtn={showRequestOtpbtn}
                          showOtpField={showOtpField}
                          // showVerificationMessage={showVerificationMessage}
                          disableEmailField={disableEmailField}
                          requestToOtp={requestToOtp}
                          handleVerify={handleVerify}
                          setOtp={setOtp}
                          resetForm={resetForm}
                          isRequesting={isRequesting}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label
                          className="mb-2.5 block text-black dark:text-white"
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                        <Field
                          type="text"
                          name="firstName"
                          id="firstName"
                          className="w-full rounded border-[1.5px] border-[#a7a7a7] bg-transparent py-2 px-2 text-gray-600 outline-none transition focus:border-primary active:border-primary"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label
                          className="mb-2.5 block text-black dark:text-white"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <Field
                          type="text"
                          name="lastName"
                          id="lastName"
                          className="w-full rounded border-[1.5px] border-[#a7a7a7] bg-transparent py-2 px-2 text-gray-600 outline-none transition focus:border-primary active:border-primary"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      <div className="md:col-span-2 relative">
                        <label
                          className="mb-2.5 block text-black dark:text-white"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          className="w-full rounded border-[1.5px] border-[#a7a7a7] bg-transparent py-2 px-2 text-gray-600 outline-none transition focus:border-primary active:border-primary"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                        <div
                          className="absolute top-11 right-4 "
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {!showPassword ? <LuEyeOff /> : <LuEye />}
                        </div>
                      </div>
                      <div className="md:col-span-2 relative">
                        <label
                          className="mb-2.5 block text-black dark:text-white"
                          htmlFor="confirmPassword"
                        >
                          Confirm Password
                        </label>
                        <Field
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          id="confirmPassword"
                          className="w-full rounded border-[1.5px] border-[#a7a7a7] bg-transparent py-2 px-2 text-gray-600 outline-none transition focus:border-primary active:border-primary"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                        <div
                          className="absolute top-11 right-4 "
                          onClick={() => setShowConfirmPassword(!showPassword)}
                        >
                          {!showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex relative text-right">
                      <button
                        className="bg-blue-700 cursor-pointer  text-white py-2 px-4 rounded flex gap-1 items-center"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                      <button
                        className="ml-3 cursor-pointer bg-white border-1 text-black py-2 px-4 rounded flex gap-1 items-center"
                        type="button"
                        onClick={() => navigate(-1)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
