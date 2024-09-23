 
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Home />
    <App />
  </Provider>,
)
