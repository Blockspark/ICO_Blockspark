import React, { useContext } from "react";
import { LayoutContext } from "./../StateProvider";
import { Link } from "react-router-dom";
import './style.css'

const LinkButton = (props) => {
  const { layout } = useContext(LayoutContext);
  return (
    <Link
      key={props?.key}
      type={props.type}
      to={props.href}
      title={props.toolTip}
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
      style={
        props.style
          ? props.style
          : {
            backgroundColor: layout?.buttonBackgroundColor
              ? layout.buttonBackgroundColor
              : "rgb(0, 148, 182)",
            color: layout?.buttonForegroundColor
              ? layout.buttonForegroundColor
              : "rgb(255, 255, 255)",
          }
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width}
        height={props.height}
        viewBox={props.viewBox}
        fill="none"
      >
        <path
          d={props.path}
          fill={
            props.fillColor
              ? props.fillColor
              : layout?.buttonForegroundColor
                ? layout?.buttonForegroundColor
                : "white"
          }
        />
      </svg>
      {props.text}

    </Link>
  );
};

export default LinkButton;