//import App from 'next/app'
import '../styles/dist/styles.css'

//import 'bootstrap/dist/css/bootstrap.min.css';

//redux-store
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '../store/reducers/combineReducers'

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),    
));


function MyApp({ Component, pageProps }) {
    return <Provider store={store}> <Component {...pageProps} /></Provider>
  }
  

  
  export default MyApp