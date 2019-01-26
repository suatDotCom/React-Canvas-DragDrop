import React, { Component } from "react";
import "./App.css";
import { Container as CanvasContainer } from "./components/Canvas";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
            <CanvasContainer />
        </div>
      </div>
    );
  }
}

export default App;
