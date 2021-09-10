import React from "react";
import {  Form } from "shards-react";
import { Grid, Typography } from "@material-ui/core";

export default () => (
  <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
    <Grid container justifyContent={'center'}>
      <Grid item>
        <Typography variant={"h6"}>
          COVID-19 Dashboard by Government of Mizoram
        </Typography>
      </Grid>
    </Grid>
  </Form>
);
