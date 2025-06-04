import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Footer from './Components/Footer'
import Hero from './Components/Hero'
import RootLayout from './Pages/RootLayout'
import OurStoryHome from './Pages/AboutusPage/OurStoryHome'


const router = createBrowserRouter(([
  {
    index: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Hero
      },

      {
        path: "ourstory",
        Component: OurStoryHome
      },

    
    ]
  }

]))

const App = () => {
  return <RouterProvider router={router} />

}
export default App
