import React from 'react';

import './App.css';

import LgOperatePanel from "./LgOperatePanel";
import LgEvolutionPanel from "./LgEvolutionPanel";

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign:'center'}}>生命游戏</h1>
      <div className="operateP">
        <LgOperatePanel/>
      </div>
      <div className="evolutionP">
        <LgEvolutionPanel/>
      </div>
    </div>
  );
}

export default App;
