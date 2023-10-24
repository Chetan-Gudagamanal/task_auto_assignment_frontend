import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useEffect } from "react";
import { backend_url } from "./constants";

export default function UserCard({
  userTask,
  index,
  userTaskData,
  setUserTaskData,
  loginArr,
  setloginArr,
  fetchUserTaskData,
  setIsLoading,
}) {
  const handleLogin = async (userId, index) => {
    setIsLoading(true);
    const data = await fetch(`${backend_url}/login/${userId}`, {
      method: "GET",
    });
    const jsonData = await data.json().then((jsonData) => {
      setloginArr((loginArr) => {
        let newArr = loginArr;
        newArr[index] = 1;
        return newArr;
      });
      // loginArr[index] = 1;
      fetchUserTaskData();
      // setIsLoading(false);
    });
  };

  const updateLoginArray = (index) => {
    setIsLoading(true);
    setloginArr((loginArr) => {
      let newArr = loginArr;
      newArr[index] = 0;
      console.log(newArr);
      return newArr;
    });
    fetchUserTaskData();
    // setIsLoading(false);
  };

  const handleFinishTask = async (userId, taskId) => {
    setIsLoading(true);
    const data = await fetch(`${backend_url}/task_finish/${taskId}/${userId}`, {
      method: "GET",
    });
    const jsonData = await data.json().then((jsonData) => {
      fetchUserTaskData();
      // setIsLoading(false);
    });
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "#ebde71",
        border: "1px solid black",
        padding: "10px",
      }}
    >
      {loginArr && loginArr[index] === 0 ? (
        <Button
          variant="contained"
          onClick={() => {
            handleLogin(userTask[0], index);
          }}
        >
          log In
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            updateLoginArray(index);
          }}
        >
          LogOut
        </Button>
      )}
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="div">
          {/* <p>'User id '{userTask[0]}</p> */}
          User Name: {userTask[1]}
          {/* <p>'Assigned task '{userTask[2]}</p> */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <p>Assigned task Name: {userTask[3] ? userTask[3] : "None"}</p>
        </Typography>
      </CardContent>
      <div sx={{ textAlign: "center" }}>
        {/* <Button size="small">Share</Button> */}
        {userTask[2] && loginArr[index] == 1 ? (
          <Button
            variant="outlined"
            sx={{ border: "1px solid green", textAlign: "center" }}
            size="small"
            onClick={() => {
              handleFinishTask(userTask[0], userTask[2]);
            }}
          >
            Finish Current Task
          </Button>
        ) : (
          ""
        )}
        {/* <Button size="small">Learn More</Button> */}
      </div>
    </Card>
  );
}
