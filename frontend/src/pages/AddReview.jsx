import Logo from "../components/Logo/Logo";
import TextField from "@mui/material/TextField";
import { FileUploader } from "react-drag-drop-files";
import { account } from "../services/appwriteConfig.js";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Client, Databases, ID } from "appwrite";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LinearProgress } from '@mui/material';

const FLASK_API_URL = "https://pathfinder-backend.up.railway.app";
const fileTypes = ["MP3"];

export default function AddReview() {
  const [input, setInput] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [options, setOptions] = useState({ name: "loading..." });
  const [file, setFile] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [textFile, setTextFile] = useState();
  const [sentAudio, setSentAudio] = useState(false); 
  const [recievedAudio, setRecievedAudio] = useState(false);
  const [response, setResponse] = useState({
    total: 0,
    documents: [{ name: "loading..." }],
  });

  const handleTextChange = (e) => {
    setInput(e.target.value);
  };

  const handleChange = (file) => {
    setFile(file);
    console.log(file);
    const body = new FormData();
    body.append("file", file);
    
    // create body with file as key name
    try {
      setSentAudio(true);
      fetch(FLASK_API_URL + "/getText", {
        method: "POST",
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data from uploaded audio: ", data);
          setTextFile(data);
          setRecievedAudio(true);
          setSentAudio(false);
          
        });
    } catch (error) {
      console.log(error);
    }
    
  };
  
  //get the id of the company based on the input given
  
  
  const handleSubmit = () => {
    const body = new FormData();
    let x = response.documents;
    for (let i = 0; i < x.length; i++) {
      if (x[i].company_name === input) {
        let input1 = x[i].$id;
        console.log(input1);
        body.append("company_id", input1);
      }
    }
    body.append("user_id", userDetails.$id);
    body.append("review_text", textFile.text);
    console.log("userid",body.get("user_id"));
    console.log("companyid",body.get("company_id"));
    console.log("reviewtext",body.get("review_text"));

    const client = new Client();
    const databases = new Databases(client);
    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('PathFinder7567') // Your project ID
    ;

    const promise = databases.createDocument('647839f66db4047862f5', '647c80b0cbd672f3bb5a', ID.unique(), {'review_text': body.get("review_text"), 'user_id': body.get("user_id"), 'company_id': body.get("company_id")});

    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
});
    
  }

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
          setResponse(response);
          let options = [];
          response.documents
            .map((company_name) => company_name.company_name)
            .forEach((company_name) => options.push({ name: company_name }));
          setOptions(options);
          setDataLoaded(true);
          console.log(options);
        },
        function (error) {
          console.log(error);
        }
      );
    };
    getData();
  }, [userDetails]);

  if(!dataLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="bg-[#95D6F2] h-screen">
      <Link to ="/home"><Logo /></Link>
      <div className="container mx-auto">
        <div className="flex flex-row bg-white shadow-2xl shadow-indigo-500/40 mt-10">
          <div className="basis-1/2 justify-center items-center p-48 flex flex-col border-r-2 border-black">
              {dataLoaded ? (
                <div className="w-full">
                <Stack spacing={2} sx={{ width: 300, padding: "10px" }}>
                  <Autocomplete
                    //disabled = {!isLoggedIn}
                    freeSolo
                    notched
                    sx={{ "& fieldset": { paddingBottom: "30px" } }}
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
                  <FileUploader
                    className="m-12"
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                  />
                  <div className="justify-center">
                    {sentAudio  ? <LinearProgress /> : null }
                    
                   
                    <Button
                      variant="contained"
                      sx={{
                        margin: "20px",
                      }}
                      disabled={(input === null) || (file === null) || (recievedAudio === false)}
                      onClick={() => {handleSubmit()}}
                    >
                      Submit
                    </Button>
                  </div>
                </Stack>
                </div>
              ) : (
                <div className="flex justify-center items-center h-screen">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              )}
          </div>
          {recievedAudio ? 
          <div className="basis-1/2">
            <div className="flex flex-col p-28">
              <h1 className="text-3xl font-bold pt-2 ">Transcribed Text From Audio</h1> 
              <textarea value={textFile.text} onChange={handleTextChange} className="h-96 w-130 mt-4"></textarea>
            </div>
          </div>
            : 
          <div className="basis-1/2">
            <div className="flex flex-col pl-44">
              <h1 className="text-4xl font-bold pt-32">Add Review</h1>
              <div className="pt-10">
                <h1 className="text-2xl font-normal mb-10">
                  <div className="inline-block">
                    <div className="inline-block h-7 w-7 bg-[#95D6F2] text-grey-700 rounded-full mt-1 mr-2 pb-1 flex items-center justify-center float-left">
                      1
                    </div>
                    <div className="inline-block flex ml-2 ">
                      Select the company
                    </div>
                  </div>
                </h1>
                <h1 className="text-2xl font-normal mb-10">
                  <div className="inline-block">
                    <div className="inline-block h-7 w-7 bg-[#95D6F2] text-grey-700 rounded-full mt-1 mr-2 pb-1 flex items-center justify-center float-left">
                      2
                    </div>
                    <div className="inline-block flex ml-2 ">Upload Audio</div>
                  </div>
                </h1>
                <h1 className="text-2xl font-normal">
                  <div className="inline-block">
                    <div className="inline-block h-7 w-7 bg-[#95D6F2] text-grey-700 rounded-full mt-1 mr-2 pb-1 flex items-center justify-center float-left">
                      3
                    </div>
                    <div className="inline-block flex ml-2 ">Submit</div>
                  </div>
                </h1>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
}
