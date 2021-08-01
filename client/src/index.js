import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState as saveStateLocalStorage } from './utils/localStorage'
import { saveState as saveStateSessionStorage } from './utils/sessionStorage'
import {transitions,positions,Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'

const persistentState = loadState();


const store = createStore(
  reducers,
  persistentState,
  composeWithDevTools(
    applyMiddleware())
);

store.subscribe(() => {
  saveStateLocalStorage(store.getState());
});

store.subscribe(() => {
  saveStateSessionStorage(store.getState());
});


const options = {
  position: positions.BUTTOM_CENTER,
  timeout: 6000,
  offset: '50%',
  transition: transitions.SCALE
}


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <AlertProvider template={AlertTemplate} {...options}>
        <Provider store={store}>
          <App />
        </Provider>
      </AlertProvider>
    </React.StrictMode>

  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
