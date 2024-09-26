
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx' 
import DagreMap from "./components/Dagre-Map.jsx"
import './index.css'
import store from './store/store.js'
const router = createBrowserRouter(
  [

    {
      path: "/",
      element: <App />
    },
    {
      path: "/map/:id",
      element: <DagreMap />
    }
  ]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
