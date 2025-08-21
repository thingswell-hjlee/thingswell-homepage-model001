import React from "react";
import "./TrackRecordGrid.css";

const TrackRecordGrid = ({ children, className = "" }) => {
  const classes = ["track-record-grid", "track-record-grid-4cols"];
  if (className) classes.push(className);

  return <div className={classes.join(" ")}>{children}</div>;
};

export default TrackRecordGrid;
