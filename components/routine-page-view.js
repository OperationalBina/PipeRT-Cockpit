import Grid from "@mui/material/Grid";
import RoutineLogsView from "./routine-logs-view";
import ImageView from "./image-view";
import RoutineAppBar from "./routine-app-bar";
import { selectedRoutineState } from "../utils/shared_atoms";
import { useRecoilState } from 'recoil';
import { useEffect, useState } from "react";
import io from 'socket.io-client'

function GetExtraImages(extraImages) {
  return extraImages.map(function (extraImage, index) {
    return (
      <Grid item xs={4} key={index}>
        <ImageView
          imageName={extraImage["name"]}
          imageBase64={extraImage["base64"]}
        />
      </Grid>
    );
  });
}

export default function RoutinePageView({
  routineName,
}) {
  const [selectedRoutine, setSelectedRoutine] = useRecoilState(selectedRoutineState);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [extraImages, setExtraImages] = useState([]);


  setSelectedRoutine(routineName)

  useEffect(() => {
    fetch(`/api/routine_data/${selectedRoutine}`).finally(() => {
      const socket = io()

      socket.on('input', input => {
        setInput(input)
      })

      socket.on('output', output => {
        setOutput(output)
      })

      socket.on('extraImages', extraImages => {
        setExtraImages(extraImages)
      })

    })
  }, [])

  const existingExtraImages = extraImages != null && extraImages.length > 0;

  let inputOutputXS = 6;
  let extraImagesView = <></>;

  if (existingExtraImages) {
    inputOutputXS = 4;
    extraImagesView = GetExtraImages(extraImages);
  }

  return (
    <>
      <RoutineAppBar routineName={routineName} />
      <Grid container spacing={3} paddingLeft={1} paddingRight={1}>
        <Grid item xs={inputOutputXS}>
          <ImageView imageName={"Input"} imageBase64={input} />
        </Grid>
        {extraImagesView}
        <Grid item xs={inputOutputXS}>
          <ImageView imageName={"Output"} imageBase64={output} />
        </Grid>
        <Grid item xs={12}>
          <RoutineLogsView logsPerPage={15} />
        </Grid>
      </Grid>
    </>
  );
}
