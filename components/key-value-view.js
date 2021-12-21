import { Grid } from "@mui/material";

export default function KeyValueView({ field, value }) {
  return (
    <>
      <Grid item xs={6}>
        {field}:
      </Grid>
      <Grid item xs={6}>
        {value}
      </Grid>
    </>
  );
}
