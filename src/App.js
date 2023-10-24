import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { backend_url } from "./constants";
import UserCard from "./User";
import { Button, Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function App() {
  const [userTaskData, setUserTaskData] = useState([]);
  const [loginArr, setloginArr] = useState([0, 0, 0, 0, 0, 0]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserTaskData = async () => {
    setIsLoading(true);
    const data = await fetch(`${backend_url}`, {
      method: "GET",
    });
    const jsonData = await data.json().then((jsonData) => {
      console.log(jsonData["all_data"]);
      setUserTaskData(jsonData.all_data);
      setIsLoading(false);
    });
  };

  const reset_application_to_original_state = async () => {
    setIsLoading(true);
    const data = await fetch(`${backend_url}/reset_db`, {
      method: "GET",
    });
    const jsonData = await data.json().then((jsonData) => {
      fetchUserTaskData();
      // setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUserTaskData();
    // setIsLoading(false);
  }, []);
  return (
    <div className="App">
      Demo Application to showcase automatic Task assignment
      <Button
        sx={{ color: "Highlight", margin: "20px", border: "1px solid white" }}
        varient="contained"
        onClick={reset_application_to_original_state}
      >
        Reset Demo Application to initial state
      </Button>
      <Box sx={{ display: "flex" }}>
        {isLoading ? <CircularProgress /> : ""}
      </Box>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "10px",
          rowGap: "15px",
        }}
      >
        {userTaskData.map((userTask, index) => (
          <UserCard
            key={index}
            userTask={userTask}
            index={index}
            userTaskData={userTaskData}
            setUserTaskData={setUserTaskData}
            loginArr={loginArr}
            setloginArr={setloginArr}
            fetchUserTaskData={fetchUserTaskData}
            setIsLoading={setIsLoading}
          />
        ))}
      </Container>
    </div>
  );
}

export default App;
