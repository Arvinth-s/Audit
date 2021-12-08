import React from "react";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";

const DatePicker = (props) => {
  return (
    <DateTimePicker
      onChange={(date) => {
        props.dateHandler(date);
      }}
      value={props.value}
    />
  );
};

export default DatePicker;
