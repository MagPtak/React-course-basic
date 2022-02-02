import React from "react";
import PropTypes from "prop-types";

function ProgressBar({ className = "", percent = 33, color = "blue" }) {
  if (typeof percent !== "number") {
    throw new Error("Typ propa percent musi być number");
  }
  if (percent < 0 || percent > 100) {
    throw new Error("Prop percent przyjmuje wartości 0 - 100");
  }
  if (typeof percent === null || typeof percent === undefined) {
    throw new Error(
      "Prop percent nie moze przyjmować wartoścu null oraz undefined"
    );
  }

  return (
    <div className={"progress progress--big progress--color--red" + className}>
      <div
        className="progress__bar progress__bar--green"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
};

export default ProgressBar;
