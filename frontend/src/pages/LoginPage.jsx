import React, { useState } from "react";
import { Button, styled } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { account } from "../services/appwriteConfig.js";
import GoogleIcon from "@mui/icons-material/Google";
import { redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";

export default function LoginPage() {
  const CustomButton = styled(Button)`
    &:hover {
      background-color: white !important;
    }
  `;
  const GoogleAuth = (e) => {
    e.preventDefault();

    try {
      account.createOAuth2Session(
        "google",
        "http://localhost:3000/home",
        "http://localhost:3000/"
      );
      toast.success("Redirecting to Google Auth");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="bg-[#95D6F2] h-screen flex flex-row">
        <div className="basis-1/2">
          <Link to="/">
            <h1 className="font-extrabold text-4xl leading-10 p-10">
              PATHFINDER
            </h1>
          </Link>
          <div className="container flex justify-center h-100 items-center pt-40 pb-24">
            <h2 className="font-bold leading-loose text-4xl tracking-[.305em] center-text justify-center stroke-2">
              Empower.
              <br />
              Your.
              <br />
              Career.
            </h2>
          </div>
          <div className="container flex justify-center items-center">
            <CustomButton
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "10px",
              }}
              onClick={GoogleAuth}
            >
              <div className="p-2">
                <GoogleIcon />
              </div>
              Continue with Google
            </CustomButton>
          </div>
        </div>
        <div className="basis-1/2 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
      </div>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
