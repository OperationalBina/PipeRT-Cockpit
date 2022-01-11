import Grid from "@mui/material/Grid";
import RoutineLogsView from "./routine-logs-view";
import ImageView from "./image-view";
import RoutineAppBar from "./routine-app-bar";
import { selectedRoutineState } from "../utils/shared_atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { SERVER_URL } from '../config';


export default function RoutinePageView({ routineName }) {
  const [selectedRoutine, setSelectedRoutine] =
    useRecoilState(selectedRoutineState);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [extraImages, setExtraImages] = useState({});

  setSelectedRoutine(routineName);

  useEffect(() => {
    fetch(`${SERVER_URL}/api/socketio`).finally(() => {
      const socket = io();

      socket.emit("join_room", `${routineName}`);

      socket.on("input", (input) => {
        setInput(input);
      });

      socket.on("output", (output) => {
        setOutput(output);
      });

      socket.on("extra_image", (extraImage) => {
        extraImages[extraImage["name"]] = extraImage["image_base64"];
        setExtraImages(extraImages);
      });
    });
  }, []);


  const existingInput = input != null && input.length > 0;
  const existingOutput = output != null && output.length > 0;

  let imagesNumber = 0;

  existingInput && imagesNumber++;
  existingOutput && imagesNumber++;
  imagesNumber += Object.keys(extraImages).length;

  let imagesXS = 0;

  if (imagesNumber > 0) {
    if (imagesNumber > 3) {
      imagesXS = 4;
    } else {
      imagesXS = 12 / imagesNumber;
    }
  }

  return (
    <>
      <RoutineAppBar routineName={routineName} />
      <Grid
        container
        spacing={3}
        paddingTop={2}
        paddingLeft={1}
        paddingRight={1}
      >
        {existingInput && (
          <Grid item xs={imagesXS}>
            <ImageView imageName={"Input"} imageBase64={input} />
          </Grid>
        )}
        {extraImages != null &&
          Object.keys(extraImages).length > 0 &&
          Object.keys(extraImages).map((key) => {
            return (
              <Grid item xs={imagesXS} key={key}>
                <ImageView imageName={key} imageBase64={extraImages[key]} />
              </Grid>
            );
          })}
        {existingOutput && (
          <Grid item xs={imagesXS}>
            <ImageView imageName={"Output"} imageBase64={output} />
          </Grid>
        )}
        <Grid item xs={12} paddingTop={2}>
          <RoutineLogsView logsPerPage={15} />
        </Grid>
      </Grid>
    </>
  );
}
