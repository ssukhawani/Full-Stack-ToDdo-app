import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './bootstrap.min.css'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import {reducer} from './Reducer/reducer'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const initValue = {
  userInfo : {},
  errorLogin:null,
  errorRegister:{},
  showProfile:false,
  todos:[]
}

const store = createStore(
  reducer,
  initValue,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


