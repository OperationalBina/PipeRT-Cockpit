import Grid from "@mui/material/Grid";
import styles from "../styles/utils.module.css";


export default function ImageView({imageName, imageBase64}) {
    return <Grid container>
        <Grid item xs={12}>
            <h2 className={styles.centered}>{imageName}</h2>
        </Grid>
        <Grid item xs={12}>
            <img width={"100%"} height={"100%"} src={`data:image/png;base64,${imageBase64}`} />
        </Grid>
    </Grid>
}