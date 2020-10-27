import './App.css';
import React from "react";
import {BrowserRouter as Router, Route}from 'react-router-dom'
import CaseDetail from "./pages/CaseDetail";
import Case from "./pages/Case";
import Main from "./pages/Main";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Main}/>
        <Route exact path="/cases" component={Case}/>
        <Route path="/cases/:caseId" component={CaseDetail}/>
      </Router>
    </div>
  );
}

export default App;
