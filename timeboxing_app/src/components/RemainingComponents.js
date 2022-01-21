import React from "react";
import { v4 } from "uuid";

import Clock from "./Clock";

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

function ProgressBar({ className = "", percent = 33 }) {
  return (
    <div className={"ProgressBar " + className}>
      <div style={{ width: `${percent}%` }}></div>
    </div>
  );
}

class CurrentTimebox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    };
  }

  handleStart() {
    this.setState({
      isRunning: true,
    });
    this.startTimer();
  }

  handleStop() {
    this.setState({
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    });
    this.stopTimer();
  }

  startTimer() {
    this.intervalId = window.setInterval(() => {
      this.setState((prevState) => ({
        elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1,
      }));
    }, 100);
  }

  stopTimer() {
    window.clearInterval(this.intervalId);
  }

  togglePause() {
    this.setState(function (prevState) {
      const isPaused = !prevState.isPaused;
      if (isPaused) {
        this.stopTimer();
      } else {
        this.startTimer();
      }
      return {
        isPaused,
        pausesCount: isPaused
          ? prevState.pausesCount + 1
          : prevState.pausesCount,
      };
    });
  }

  render() {
    const { isPaused, isRunning, pausesCount, elapsedTimeInSeconds } =
      this.state;
    const { title, totalTimeInMinutes, isEditable, onEdit } = this.props;
    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
    const minutesLeft = Math.floor(timeLeftInSeconds / 60);
    const secondsLeft = Math.floor(timeLeftInSeconds % 60);
    const progressInPercent =
      (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
    return (
      <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
        <h1>{title}</h1>
        <Clock
          minutes={minutesLeft}
          seconds={secondsLeft}
          className={isPaused ? "inactive" : ""}
        />
        <ProgressBar
          percent={progressInPercent}
          className={isPaused ? "inactive" : ""}
        />
        <button onClick={onEdit} disabled={isEditable}>
          Edytuj
        </button>
        <button onClick={this.handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={this.handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={this.togglePause} disabled={!isRunning}>
          {isPaused ? "Wznów" : "Pauzuj"}
        </button>
        Liczba przerw: {pausesCount}
      </div>
    );
  }
}

class EditableTimebox extends React.Component {
  state = {
    title: "Uczę się wyciagać stan w górę!",
    totalTimeInMinutes: 20,
    isEditable: true,
  };

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleTotalTimeInMinutesChange = (event) => {
    this.setState({ totalTimeInMinutes: event.target.value });
  };

  handleConfirm = () => {
    this.setState({ isEditable: false });
  };

  handleEdit = () => {
    this.setState({ isEditable: true });
  };

  render() {
    const { title, totalTimeInMinutes, isEditable } = this.state;
    return (
      <>
        <TimeboxEditor
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          isEditable={isEditable}
          onConfirm={this.handleConfirm}
          onTitleChange={this.handleTitleChange}
          onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
        />
        <CurrentTimebox
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          isEditable={isEditable}
          onEdit={this.handleEdit}
        />
      </>
    );
  }
}

class TimeboxCreator extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  handleEditTimebox = () => {
    this.formRef.current.elements[0].value = this.props.editTimebox.title;
    this.formRef.current.elements[1].value =
      this.props.editTimebox.totalTimeInMinutes;
  };

  handleSubmitUpdate = (event) => {
    event.preventDefault();
    this.props.onUpdate({
      id: this.props.editTimebox.id,
      title: this.formRef.current.elements[0].value,
      totalTimeInMinutes: this.formRef.current.elements[1].value,
    });
    this.formRef.current.elements[0].value = "";
    this.formRef.current.elements[1].value = "";
  };

  handleSubmitAdd = (event) => {
    event.preventDefault();
    this.props.onCreate({
      id: v4(),
      title: this.formRef.current.elements[0].value,
      totalTimeInMinutes: this.formRef.current.elements[1].value,
    });
    this.formRef.current.elements[0].value = "";
    this.formRef.current.elements[1].value = "";
  };
  render() {
    this.props.isEdit && this.handleEditTimebox();
    return (
      <form
        ref={this.formRef}
        onSubmit={
          this.props.isEdit ? this.handleSubmitUpdate : this.handleSubmitAdd
        }
        className="TimeboxCreator"
      >
        <label>
          Co robisz?
          <input type="text" />
        </label>
        <br />
        <label>
          Ile minut?
          <input type="number" />
        </label>
        <br />
        <button>
          {this.props.isEdit ? "Zatwierdź zmiany" : "Utwórz Timebox"}
        </button>
      </form>
    );
  }
}

class TimeboxList extends React.Component {
  state = {
    timeboxes: [
      { id: "a", title: "Uczę się list", totalTimeInMinutes: 23 },
      { id: "b", title: "Uczę się formularzy", totalTimeInMinutes: 22 },
      {
        id: "c",
        title: "Uczę się komponentow niekontrolowanych",
        totalTimeInMinutes: 21,
      },
    ],
    isEdit: false,
    editTimebox: {},
  };

  addTimebox = (timebox) => {
    this.setState((prevState) => {
      const timeboxes = [timebox, ...prevState.timeboxes];
      return { timeboxes };
    });
  };

  handleCreate = (createdTimebox) => {
    this.addTimebox(createdTimebox);
  };

  removeTimebox = (indexToRemove) => {
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.filter(
        (timebox, index) => index !== indexToRemove
      );
      return { timeboxes };
    });
  };

  updateTimebox = (updateTimebox) => {
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.map((timebox) =>
        timebox.id === updateTimebox.id ? updateTimebox : timebox
      );
      return { timeboxes };
    });
    this.setState({ isEdit: false });
  };

  editTimebox = (indexToUpdate, editTimebox) => {
    this.setState({
      isEdit: true,
      editTimebox: editTimebox,
    });
  };

  render() {
    return (
      <>
        <TimeboxCreator
          onCreate={this.handleCreate}
          onUpdate={this.updateTimebox}
          editTimebox={this.state.editTimebox}
          isEdit={this.state.isEdit}
        />
        {this.state.timeboxes.map((e, index) => (
          <Timebox
            key={e.id}
            title={e.title}
            totalTimeInMinutes={e.totalTimeInMinutes}
            onEdit={() =>
              this.editTimebox(index, {
                id: e.id,
                title: e.title,
                totalTimeInMinutes: e.totalTimeInMinutes,
              })
            }
            onDelete={() => this.removeTimebox(index)}
          />
        ))}
      </>
    );
  }
}

function Timebox({ title, totalTimeInMinutes, onDelete, onEdit }) {
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

export { EditableTimebox, TimeboxList };
