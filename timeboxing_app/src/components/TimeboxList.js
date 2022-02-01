import React from "react";
import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";
import Error from "./Error";

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
    hasError: false,
  };

  addTimebox = (timebox) => {
    throw new Error("Nie udało się utworzyć timeboxa");
    this.setState((prevState) => {
      const timeboxes = [timebox, ...prevState.timeboxes];
      return { timeboxes };
    });
  };

  handleCreate = (createdTimebox) => {
    try {
      this.addTimebox(createdTimebox);
    } catch (error) {
      console.log("Jest błąd przy tworzeniu timeboxa", error);
      // this.setState(hasError: true)
    }
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
        <Error message="Coś się wykrzaczyło ;[">
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
        </Error>
      </>
    );
  }
}

export default TimeboxList;
