import { React } from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = (theme) =>
  makeStyles((e) => ({
    root: {
      "& .MuiFilledInput-root": {
        background: theme.primaryColor,
        color: theme.brightColor,
        borderColor: theme.brightColor,
      },
      "& .MuiInput-root": {
        // background: theme.primaryColor,
        color: theme.brightColor,
        borderColor: theme.brightColor,
      },
    },
    cssLabel: {
      color: theme.brightColor,
      "&.Mui-focused": {
        color: theme.secondaryColor,
      },
    },
    cssOutlinedInput: {
      borderColor: theme.brightColor,
      "&:not(hover):not($disabled):not($cssFocused) $notchedOutline": {
        borderColor: theme.brightColor, //default
      },
      "&:hover:not($disabled):not($cssFocused) $notchedOutline": {
        borderColor: theme.brightColor, //hovered #DCDCDC
      },
      "&$cssFocused $notchedOutline": {
        borderColor: theme.brightColor, //focused
      },
    },
    cssInputLabel: {
      color: theme.brightColor,
    },
    notchedOutline: {},
    cssFocused: {
      color: theme.brightColor,
      borderColor: theme.brightColor,
    },
    disabled: {},
  }));

const CustomTextField = ({ props }) => {
  const brightColor = "#e4e4e4c5",
    primaryColor = "#222831",
    secondaryColor = "#393e46",
    highlightColor = "#00adb5";
  const classes = useStyles({
    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
    highlightColor: highlightColor,
    brightColor: brightColor,
  })();

  return (
    <div>
      <TextField
        className={classes.root}
        id="standard-basic"
        label="Title"
        variant="standard"
        fullWidth={true}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
          },
          inputMode: "numeric",
        }}
        onChange={(e) => {
          props.textHandler(e.target.value);
          console.log(e.target.value);
        }}
      />
    </div>
  );
};

export default CustomTextField;
