import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: '100px'
  }
});

function Error(props) {
  const { classes } = props;

  return (
      <div className={classes.root}>
        <h1>404 no page found</h1>
      </div>
  );
}

Error.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Error);