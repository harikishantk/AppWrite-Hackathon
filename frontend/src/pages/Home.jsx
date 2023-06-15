import React, { useEffect, useState } from "react";
import { Button, CssBaseline, styled } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { account } from "../services/appwriteConfig.js";
import GoogleIcon from "@mui/icons-material/Google";
import { redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";

export default function Home1() {
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
        "https://app-write-hackathon.vercel.app/",
        "https://app-write-hackathon.vercel.app/login"
      );
      toast.success("Redirecting to Google Auth");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-[#95D6F2] min-h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 flex flex-col items-center justify-center">
        <Link to="/">
          <h1 className="font-extrabold text-4xl lg:text-6xl leading-10 p-10">
            PATHFINDER
          </h1>
        </Link>
        <div className="container flex flex-col items-center mt-10 lg:mt-40">
          <h2 className="font-bold text-3xl lg:text-4xl leading-loose text-center lg:text-left tracking-[.305em]">
            Empower.
            <br />
            Your.
            <br />
            Career.
          </h2>
        </div>

        <div className="container flex justify-center items-center mt-10">
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
      <div className="lg:w-1/2 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
      
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
