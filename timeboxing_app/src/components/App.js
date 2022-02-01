import React from "react";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import Error from "./Error";

function App() {
  return (
    <div className="App">
      <Error message="Coś nie działa w całej aplikacji">
        <TimeboxList />
        <Error message="Coś nie działa w EditableTimebox">
          <EditableTimebox />
        </Error>
      </Error>
    </div>
  );
}

export default App;
