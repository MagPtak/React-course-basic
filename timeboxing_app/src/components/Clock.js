import React from "react";
import PropTypes from "prop-types";

function Clock({ className = "", minutes, seconds }) {
  return (
    <h2 className={"Clock  " + className}>
      Pozostało {minutes}:{seconds}
    </h2>
  );
}

Clock.defaultProps = {
  className: "",
};

function NonNegativeNumberType(props, propName, componentName) {
  if (props[propName] < 0) {
    return new Error(
      `Invalid prop '${propName}' issued to component '${componentName}'. It has to be greater or equal to 0.`
    );
  }
}

const NumberOrStringType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

Clock.propTypes = {
  className: PropTypes.string.isRequired,
  minutes: NumberOrStringType.isRequired,
  seconds: NonNegativeNumberType,
};

export default Clock;
