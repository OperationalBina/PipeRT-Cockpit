import { Grid } from "@mui/material";
import KeyValueView from "./key-value-view";


export default function RoutineLogsSummeryView({exceptions, warnings, info, avg_fps}) {
    return <Grid container spacing={3}>
        <KeyValueView field="Exceptions" value={exceptions}/>
        <KeyValueView field="Warnings" value={warnings}/>
        <KeyValueView field="Info" value={info}/>
        <KeyValueView field="AVG FPS" value={avg_fps}/>
    </Grid>
}