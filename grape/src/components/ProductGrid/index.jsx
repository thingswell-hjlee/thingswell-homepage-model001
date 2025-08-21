import React from "react";
import "./ProductGrid.css";

const ProductGrid = ({ children, className = "", cols = 4 }) => {
  const classes = ["product-grid", `product-grid-${cols}cols`];
  if (className) classes.push(className);

  return <div className={classes.join(" ")}>{children}</div>;
};

export default ProductGrid;
