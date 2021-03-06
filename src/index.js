import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache ,ApolloProvider } from '@apollo/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          project: {
            merge: true,
          }
        }
      }
    }
  }
    
  )
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />,
  </ApolloProvider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
