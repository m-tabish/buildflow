
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import DagreMap from "./components/Dagre-Map.jsx"
import './index.css'
import Error404 from './pages/Error404.jsx'
import store from './store/store.js'
const router = createBrowserRouter(
  [

    {
      path: "/",
      // element: <App />
      element: <App />
    },
    {
      path: "/map/:id",
      element: <DagreMap />
    },
    {
      path: "/error",
      element: <Error404/>
    }
  ]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
