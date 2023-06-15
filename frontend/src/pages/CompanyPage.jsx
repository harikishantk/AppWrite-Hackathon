import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Client, Databases } from "appwrite";
import ChatBot from "../components/ChatBot/ChatBot";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { account } from "../services/appwriteConfig.js";
import { Button, styled } from "@mui/material";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import PersonIcon from "@mui/icons-material/Person";
import LinkIcon from "@mui/icons-material/Link";
import Logo from "../components/Logo/Logo";

export default function CompanyPage() {
  const CustomButton = styled(Button)`
    &:hover {
      background-color: white !important;
    }
  `;

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await account.deleteSession("current");
      setUserDetails(null);
      // redirect to home page
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const [input, setInput] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const [options, setOptions] = useState({ name: "loading..." });
  const [companyName, setCompanyName] = useState("loading...");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [desc, setDesc] = useState("");
  const [companyURL, setCompanyURL] = useState("");

  const displayCompany = (company_name) => {
    const client = new Client();
    const databases = new Databases(client);
    client
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject("PathFinder7567"); // Your project ID

    const promise = databases.listDocuments(
      "647839f66db4047862f5",
      "647b690e7ecfdbc8dce7"
    );
    promise.then(
      function (response) {
        response.documents.forEach((company) => {
          console.log(company_name);
          // remove amp; in the company name
          company_name = company_name.replace(/&amp;/g, "&");
          if (company.company_name === company_name) {
            console.log("passes");
            setCompanyName(company_name);
            setDesc(company.company_info);
            setCompanyURL(company.company_url);
            console.log(desc);
          }
          setDataLoaded(true);
        });
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = await account.get();
      setUserDetails(user);
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const getData = () => {
      const client = new Client();
      const databases = new Databases(client);
      client
        .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
        .setProject("PathFinder7567"); // Your project ID

      const promise = databases.listDocuments(
        "647839f66db4047862f5",
        "647b690e7ecfdbc8dce7"
      );
      promise.then(
        function (response) {
          let options = [];
          response.documents
            .map((company_name) => company_name.company_name)
            .forEach((company_name) => options.push({ name: company_name }));
          setOptions(options);
          setDataLoaded(true);
        },
        function (error) {
          console.log(error);
        }
      );
    };
    getData();
  }, [userDetails]);

  return (
    <div className="bg-[#95D6F2] h-screen flex flex-row">
      <div className="basis-1/5 bg-white">
        <Link onClick={() => handleRefresh()}>
          <Logo />
        </Link>

        {dataLoaded ? (
          <Stack spacing={2} sx={{ width: 300, padding: "10px" }}>
            <Autocomplete
              //disabled = {!isLoggedIn}
              freeSolo
              notched
              sx={{ "& fieldset": { borderRadius: 10 } }}
              getOptionLabel={(option) => option.name || ""}
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) => setInput(e.target.value)}
                  label={<FaSearch />}
                />
              )}
              onChange={(e) => setInput(e.target.innerHTML)}
            />
          </Stack>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}

        <div className="pl-16">
          <Button
            className="rounded-full"
            variant="contained"
            startIcon={<FaSearch />}
            disabled={input === null ? true : false}
            sx={{ borderRadius: 28 }}
            onClick={() => displayCompany(input)}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="basis-4/5 pr-10">
        <div>
          <div className="float-right pt-10">
            <CustomButton
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "10px",
              }}
            >
              <div>
                {userDetails === null ? null : (
                  <div>
                    <PersonIcon />
                    <span className="font-bold">{userDetails.name}</span>
                    <span className="font-bold"> | </span>
                    <span
                      className="font-bold text-red-600"
                      onClick={(e) => handleLogout(e)}
                    >
                      Logout
                    </span>
                  </div>
                )}
              </div>
            </CustomButton>
          </div>
          <div className="float-right pt-10 mr-10">
            <Link to="/add">
              <CustomButton
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "10px",
                }}
                className="rounded-full"
                variant="contained"
              >
                Add your Review here (BETA)
              </CustomButton>
            </Link>
          </div>

          <div className="pt-48 ml-10">
            {desc === "" ? (
              <HowItWorks />
            ) : (
              <>
                <h1 className="font-extrabold text-4xl uppercase">
                  {companyName}
                </h1>
                <p className="pt-16 text-lg font-bold font-mono">{desc}</p>
                <div className="pt-16">
                  <CustomButton
                    className="rounded-full"
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "10px",
                    }}
                    variant="contained"
                    href={companyURL}
                    target="_blank"
                  >
                    <LinkIcon />
                    Company URL
                  </CustomButton>
                </div>
              </>
            )}
          </div>
        </div>
        <ChatBot />
      </div>
    </div>
  );
}
