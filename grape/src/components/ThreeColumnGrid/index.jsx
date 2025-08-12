import React from "react";

const ThreeColumnGrid = ({ children, listView = false, longVertical = false, className = "" }) => {
  const classes = ["product-grid", "cols-3"];
  if (listView) classes.push("list-view");
  if (longVertical) classes.push("long-vertical");
  if (className) classes.push(className);

  return <div className={classes.join(" ")}>{children}</div>;
};

export default ThreeColumnGrid;


