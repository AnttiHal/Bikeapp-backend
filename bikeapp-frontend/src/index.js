import ReactDOM from 'react-dom/client'
import App from './App'

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: '.',
  }),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)