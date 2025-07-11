import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Footer from './Components/Footer'
import Hero from './Components/Hero'
import RootLayout from './Pages/RootLayout'
import OurStoryHome from './Pages/AboutusPage/OurStoryHome'
import TrainPage from './Pages/ServicesPage/TrainingPage/TrainPage'
import MissionVision from './Pages/AboutusPage/MissionVission'
import GrainHero from './Pages/ServicesPage/GrainPage/GrainHero'
import ContactUsPage from './Pages/ContactUsPage/ContactUs'
import ShopItems from './Pages/ShopPage/ShopItems'
import PoultryHero from './Pages/ServicesPage/PoutryPage/PoultryHero'
import SeedHero from './Pages/ServicesPage/SeedsPage/SeedHero'
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

      // {
      //   path: "mission",
      //   Component: MissionVision
      // },

      // {
      //   path: "team",
      //   Component: TeamPage
      // },

      {
        path: "train",
        Component: TrainPage
      },

      {
        path: "grain",
        Component: GrainHero
      },
      {
        path: "contact",
        Component: ContactUsPage
      },

      {
        path: "shop",
        Component: ShopItems
      },

      {
        path: "poultry",
        Component: PoultryHero
      },

      {
        path: "seed",
        Component: SeedHero
      }

    ]
  }

]))

const App = () => {
  return <RouterProvider router={router} />

}
export default App
