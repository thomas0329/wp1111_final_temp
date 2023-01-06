import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { ComicProvider } from './containers/hooks/useComic';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import createUploadLink from "apollo-upload-client/public/createUploadLink.js";

const URI = 
  process.env.NODE_ENV === "production"
    ? '/'
    : 'http://localhost:4000'

console.log('URI: ', URI);

const httpLink = createHttpLink({
  uri: URI
});

const uploadLink = createUploadLink({ uri: URI });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: uploadLink,
});

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache()
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
        <ComicProvider>
          <App />
        </ComicProvider>
      </ApolloProvider>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
