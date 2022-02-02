import React from "react";
import PropTypes from "prop-types";

function Timebox({ title, totalTimeInMinutes, onDelete, onEdit }) {
  if (totalTimeInMinutes <= 0) {
    throw new Error("Całkowity czas musi być większy niz zero");
  }
  if (typeof title !== "string") {
    throw new Error("Typ propa title musi być string");
  }
  if (typeof totalTimeInMinutes !== "number") {
    throw new Error("Typ propa totalTimeInMinutes musi być number");
  }
  return (
    <div className="Timebox">
      <h3>
        {title} - {totalTimeInMinutes} min.
      </h3>
      <button onClick={onDelete}>Usuń</button>
      <button onClick={onEdit}>Edytuj</button>
    </div>
  );
}

Timebox.propTypes = {
  title: PropTypes.string.isRequired,
  totalTimeInMinutes: PropTypes.number.isRequired,
};

export default Timebox;
