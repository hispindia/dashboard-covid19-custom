import React from "react";
import { Grid } from '@material-ui/core';
import jhpiegoLogo from "../../images/jhpiego-logo.svg";
import nishthaLogo from "../../images/nishtha-logo.png";
import usaidLogo from "../../images/usaid-logo.png";
import hispIndia from "../../images/hispIndia-logo.png";

const MainFooter = ({ contained, menuItems, copyright }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
   <Grid container justifyContent={'space-evenly'}  alignItems={'center'}>
        <Grid item>
          <img src={usaidLogo} style={{maxWidth:"100px"}}/>
        </Grid>
        <Grid item>
          <img src={nishthaLogo} style={{maxWidth:"100px"}}/>
        </Grid>
        <Grid item>
          <img src={jhpiegoLogo} style={{maxWidth:"100px"}} /> 
        </Grid>
        <Grid item>
          <img src={hispIndia} style={{maxWidth:"100px"}} /> 
        </Grid>
    </Grid>
  </footer>
);


MainFooter.defaultProps = {
  contained: false,
  copyright: "Hisp India",
  
};

export default MainFooter;
