import React from "react";

function Clock({ className = "", minutes = 20, seconds = 48 }) {
  return (
    <h2 className={"Clock " + className}>
      <div className="clock__left">Pozostało: </div>
      <div className="clock__minutes">{minutes}</div>
      <div className="clock__separator">:</div>
      <div className="clock__seconds">{seconds}</div>
    </h2>
  );
}

export default Clock;
