import React from 'react';
import './App.css';
import {Widget} from './components';
import {createBrowserHistory} from "history";
const history=createBrowserHistory();
const widgetName:string='DataGrid';
export const App=()=> {
  return (
    <div className="App">
      <div className={"App-container"}>
        <div>
          Hey Iam a Container!
        </div>
        <div>
          "I use the following widget to share there individual working in order to make a complete application."
        </div>
        <div className={"widget-container"}>
        <Widget name={widgetName} host={process.env.REACT_APP_DATAGRID_WIDGET_HOST} history={history}/>
        </div>
      </div>
    </div>
  );
};
