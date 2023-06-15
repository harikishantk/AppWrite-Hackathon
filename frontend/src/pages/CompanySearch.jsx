import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import { FaSearch } from "react-icons/fa";

import { Client, Databases } from "appwrite";

export default function CompanySearch({}) {
  const navigate = useNavigate();
  const [options, setOptions] = useState({ name: "loading..." });
  const [input, setInput] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  
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
  }, []);

  if (!dataLoaded) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="p-20">
      <div className="mb-20">
        <HowItWorks />
      </div>
      <div className="flex flex-row justify-center bg-white">
        <Stack spacing={2} sx={{ width: 300 }}>
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
                onClose={(e) => setInput(e.target.value)}
                label=<FaSearch />
              />
            )}
            onChange={(e) => setInput(e.target.innerHTML)}
          />
        </Stack>
        <div className="flex flex-row justify-center ml-5">
          <Button
            className="rounded-full"
            variant="contained"
            startIcon={<FaSearch />}
            disabled={input === null ? true : false}
            sx={{ borderRadius: 28 }}
            onClick={(e) => navigate("/" + input)}
          >
            Getting Started
          </Button>
        </div>
      </div>
    </div>
  );
}