import React from "react";

function ProgressBar({ className = "", percent = 33 }) {
  return (
    <div className={"progress progress--big progress--color--red" + className}>
      <div
        className="progress__bar progress__bar--green"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
