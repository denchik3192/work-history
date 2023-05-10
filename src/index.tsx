import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter as Router } from 'react-router-dom';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { store } from './store/store';
import { Provider } from 'react-redux';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ApolloProvider client={client}>
          <Notifications />
          <App />
        </ApolloProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
