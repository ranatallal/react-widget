import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import * as serviceWorker from './serviceWorker';
declare global {
    interface Window { renderDataGrid: any;unmountDataGrid:any}
}
window.renderDataGrid = (containerId:any, history:any) => {
    ReactDOM.render(
        <React.StrictMode>
        <App history={history} widget={true} />
        </React.StrictMode>,
        document.getElementById(containerId),
    );
};

window.unmountDataGrid = (containerId:any) => {
    ReactDOM.unmountComponentAtNode(document.getElementById(containerId)!);
};
if(!document.getElementById('DataGrid-container')){
    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
