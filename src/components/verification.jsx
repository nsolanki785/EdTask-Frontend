import React from "react";
import { Field, ErrorMessage } from "formik";

const Verification = ({
  values,
  handleChange,
  setFieldValue,
  disableEmailField,
  showOtpField,
  setOtp,
  handleVerify,
  requestToOtp,
  resetForm,
  isRequesting,
  showRequestOtpbtn,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <div>
          <label
            htmlFor="email"
            className="mb-2.5 block text-gray-600 dark:text-white"
          >
            Your email
          </label>
          <Field
            type="email"
            name="email"
            id="email"
            className="w-full rounded border-[1.5px] mb-2 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            onChange={(e) => {
              handleChange(e);
              setFieldValue("email", e.target.value);
            }}
            disabled={disableEmailField}
            value={values?.email}
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-xs"
          />
        </div>
      </div>
      {showOtpField && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-5">
          <div>
            <div className="w-full">
              <label className="mb-2.5 block text-gray-600 dark:text-white">
                Enter Your OTP
              </label>
              <input
                type="text"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter Your OTP"
                maxLength={6}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="flex items-center pt-7">
            <button
              type="button"
              className="bg-green-700 text-white py-2 px-4 rounded flex gap-1 items-center"
              onClick={() => handleVerify(values)}
            >
              Verify
            </button>
            <button
              type="button"
              onClick={() => requestToOtp(values, resetForm)}
              className="bg-red-700 ml-3 text-white py-2 px-4 rounded flex gap-1 items-center"
            >
              {isRequesting ? "Please wait" : "Resend OTP"}
            </button>
          </div>
        </div>
      )}
      {showRequestOtpbtn && (
        <div className="mt-4 mb-4  md:col-span-4 text-right">
          <button
            type="button"
            onClick={() => requestToOtp(values, resetForm)}
            className="bg-red-700 ml-3 text-white py-2 px-4 rounded flex gap-1 items-center"
          >
            {isRequesting ? "Please wait" : "Send OTP"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Verification;
