import Grid from "@mui/material/Grid";
import { height } from "@mui/system";
import styles from "../styles/utils.module.css";


export default function ImageView({imageName, imageBase64}) {
    return <Grid container>
        <Grid item xs={12}>
            <h2 className={styles.centered}>{imageName}</h2>
        </Grid>
        <Grid item xs={12} className={styles.centered}>
            <img className={styles.centered} style={{
                maxWidth:"100%"
            }} layout="responsive" objectFit="contain" src={`data:image/png;base64,${imageBase64}`} />
        </Grid>
    </Grid>
}