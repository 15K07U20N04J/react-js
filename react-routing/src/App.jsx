
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import StudentDetails from './components/StudentDetails'


const router = createBrowserRouter([
  {
    path: '/',
    element: <div>
      <Navbar />
      <Home />
    </div>
  },
  {
    path: '/about',
    element: <div>
      <Navbar />
      <About />
    </div>
  },
  {
    path: '/dashboard',
    element: <div>
      <Navbar />
      <Dashboard />
    </div>,
    children: [
      {
        path: 'report',
        element: <div>
          <h1>Report</h1>
        </div>
      },
    ]
  },
  {
    path: '/student/:id',
    element: <div>
      <Navbar />
      <StudentDetails />
    </div>
  },
  {
    path: '*',
    element: <div>
      <h1>404 Not Found</h1>
    </div>
  }
])

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
