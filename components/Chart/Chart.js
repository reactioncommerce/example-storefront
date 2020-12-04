import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, CircularProgress, Card } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    position: "absolute",
    right: 10,
    top: "60px",
    zIndex: 1,
    borderRadius: "10px"
  },
  content: {
    textAlign: "center"
  },
  progress: {
    marginTop: 20,
    color: (props) => props.color
  },
  value: {
    position: "absolute",
    top: 81,
    right: 49,
    fontSize: "14px"
  }
});

const Chart = (props) => {
  const { value, label } = props;
  const classes = useStyles(props);
  const roundValue = Math.round(value * 100);
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography component="div" variant="body1">{label}</Typography>
        <Typography className={classes.value} component="div" variant="body1">{roundValue}%</Typography>
        <CircularProgress className={classes.progress} variant="static" value={roundValue} size={60}/>
      </CardContent>
    </Card>
  );
};

export default Chart;

Chart.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number
};
