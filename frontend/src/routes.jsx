// router.jsx
import { createBrowserRouter } from 'react-router-dom';
import Container from './components/Container';
import InternLayOut from './components/Intern/InternLayOut'
import InternRegister2 from './components/Intern/InternRegister2';
import InternRegister from './components/Intern/InternRegister';
import InternLogin from './components/Intern/InternLogin'
import InternDashboard from './components/Intern/InternDashboard';
import DefaultDashboardPage from './components/Intern/DefaultDashboardPage';
import InternProfileUpdate from './components/Intern/InternProfileUpdate';
import Internships from './components/internships';
import InternshipDetails from './components/InternshipDetails';
import Settings from './components/Settings';
import Applications from './components/Intern/Applications';
import ApplicationDetails from './components/Intern/ApplicationDetails';
const router = createBrowserRouter([
    {
      path: '/',
      element: <Container />,
      children: [
        {
          

          path: 'stagaire/',
          element:<InternLayOut/>,
          children : [
            {
                path:'inscription/',
                element:<InternRegister/>
            },
            {
              path:'connexion/',
              element:<InternLogin/>
          },
          {
            path:'creer_profil/',
            element:<InternRegister2/>
          },
          {
            path:'dashboard/',
            element:<InternDashboard/>,
            children:[
              {
                index:true,
                element:<DefaultDashboardPage/>,                               
              },
              {
                path:'profile/',
                element:<InternProfileUpdate/>
              },
              {
                path:'candidatures/',
                element:<Applications/>
              },
              {
                path:'candidatures/details/',
                element:<ApplicationDetails/>
              }
            ]
          }

          ],
        
        },
        {
          path:'stages/',
          element:<Internships/>
        },
        {
          path:'stage/titre-de-stage/',
          element:<InternshipDetails/>
        },
        {
          path:'utilisateur/profil',
          element:<Settings/>
        }
        

        
      ],
    },
  
   
  ])

export default router;
