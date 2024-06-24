import React, { Component } from "react";
import QuestionsComponent from "./components/QuestionsComponent";

class App extends Component {
  state = {
  };


  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <h1>Questions</h1>
          <QuestionsComponent />
        </main>
      </div>
    );
  }
}

export default App;
