import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { authentication } from "utils/firebase";

import "./style.scss";

export default function FormComp() {
  const [number, setNumber] = useState();
  const [otp, setOtp] = useState();
  const [expandForm, setExpandForm] = useState(false);

  const handleInputChange = (e) => {
    setNumber(e.target.value);
  };
  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOTPSubmit = (e) => {
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          alert("User logged in");
        })
        .catch((error) => {
          alert("Wrong OTP");
          console.log(error);
        });
    }
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      authentication
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (number.length === 13) {
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, number, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="form-wrapper">
      <h1 className="title">Welcome back</h1>
      <h2 className="subtitle">Please enter your details.</h2>
      <form onSubmit={handleSubmit}>
        {expandForm ? (
          <>
            <label className="input-label">OTP</label>
            <input
              className="form-input"
              type="tel"
              placeholder="Enter your OTP"
              value={otp}
              onChange={handleOTPChange}
              maxLength="6"
            />
          </>
        ) : (
          <>
            <label className="input-label">Phone Number</label>
            <input
              className="form-input"
              type="tel"
              placeholder="Enter your phone number"
              value={number}
              onChange={handleInputChange}
              maxLength="13"
            />
            <label className="label-info">
              Please prefix your number with +91
            </label>
          </>
        )}
        {expandForm ? (
          <button onClick={handleOTPSubmit} className="submit-btn">
            Verify OTP
          </button>
        ) : (
          <button type="submit" className="submit-btn">
            Sign in
          </button>
        )}

        <div id="recaptcha-container"></div>
      </form>
    </div>
  );
}
