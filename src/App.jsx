import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Footer from './Components/Footer'
import Hero from './Components/Hero'
import RootLayout from './Pages/RootLayout'
import OurStoryHome from './Pages/AboutusPage/OurStoryHome'
import TrainPage from './Pages/AboutusPage/TrainPage'
import MissionVision from './Pages/AboutusPage/MissionVission'
import TeamPage from './Pages/AboutusPage/AboutTeam'


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

      {
        path: "mission",
        Component: MissionVision
      },

      {
        path: "team",
        Component: TeamPage
      },

      {
        path: "train",
        Component: TrainPage
      }

    
    ]
  }

]))

const App = () => {
  return <RouterProvider router={router} />

}
export default App
