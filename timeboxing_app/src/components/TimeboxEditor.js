import React from "react";

function TimeboxEditor({
  title,
  totalTimeInMinutes,
  isEditable,
  onTitleChange,
  onTotalTimeInMinutesChange,
  onConfirm,
}) {
  return (
    <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
      <label>
        Co robisz?
        <input
          disabled={!isEditable}
          onChange={onTitleChange}
          defaultValue={title}
          type="text"
        />
      </label>
      <br />
      <label>
        Ile minut?
        <input
          disabled={!isEditable}
          onChange={onTotalTimeInMinutesChange}
          defaultValue={totalTimeInMinutes}
          type="number"
        />
      </label>
      <br />
      <button onClick={onConfirm} disabled={!isEditable}>
        Zatwierdz zmiany
      </button>
    </div>
  );
}

export default TimeboxEditor;
