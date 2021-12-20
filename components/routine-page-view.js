import Grid from "@mui/material/Grid";
import RoutineLogsView from "./routine-logs-view";
import ImageView from "./image-view";
import RoutinePageAppBar from "./routine-page-app-bar";

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
  logs,
  input,
  output,
  extraImages,
}) {
  const existingExtraImages = extraImages != null;

  let inputOutputXS = 6;
  let extraImagesView = <></>;

  if (existingExtraImages) {
    inputOutputXS = 4;
    extraImagesView = GetExtraImages(extraImages);
  }

  return (
    <>
      <RoutinePageAppBar routineName={routineName} />
      <Grid container spacing={3} paddingLeft={1} paddingRight={1}>
        <Grid item xs={inputOutputXS}>
          <ImageView imageName={"Input"} imageBase64={input} />
        </Grid>
        {extraImagesView}
        <Grid item xs={inputOutputXS}>
          <ImageView imageName={"Output"} imageBase64={output} />
        </Grid>
        <Grid item xs={12}>
          <RoutineLogsView logs={logs} logsPerPage={15} />
        </Grid>
      </Grid>
    </>
  );
}
