import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button type="danger">Click Me</Button>
        <Button type="primary">Click Me</Button>
        <Button>Click Me</Button>
      </header>
    </div>
  );
}

function Button(props) {
  const buttonStyle = {};
  if (props.type === "primary") {
    buttonStyle["--normal-background"] = "blue";
    buttonStyle["--hover-background"] = "darkblue";
    buttonStyle["--active-background"] = "lightblue";
  } else if (props.type === "danger") {
    buttonStyle["--normal-background"] = "red";
    buttonStyle["--hover-background"] = "darkred";
    buttonStyle["--active-background"] = "pink";
  }
  buttonStyle["--border-radius"] = "5px";
  return (
    <button className="Button" style={buttonStyle}>
      {props.children}
    </button>
  );
}

export default App;
