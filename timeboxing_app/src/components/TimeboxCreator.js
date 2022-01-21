import React from "react";
import { v4 } from "uuid";

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

export default TimeboxCreator;
