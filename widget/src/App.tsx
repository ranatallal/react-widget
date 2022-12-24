import React from 'react';
import './App.css';
import {createBrowserHistory} from "history";
import {CustomDataGrid} from "./components";

export const App=({history=createBrowserHistory(),widget=false})=> {

    return (
    <div className="Widget">
      <div className="Widget-container">
          <CustomDataGrid/>
      </div>
    </div>
  );
};
