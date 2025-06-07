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
import RecruiterLayOut from './components/Recruiter/RecruiterLayOut';
import RecruiterRegister from './components/Recruiter/RecruiterRegister';
import RecruiterLogin from './components/Recruiter/RecruiterLogin';
import RecruiterDashboard from './components/Recruiter/RecruiterDashboard';
import RecruiterDefaultDashboardPage from './components/Recruiter/RecruiterDefaultDashboardPage';
import ReceivedApplication from './components/Recruiter/ReceivedApplication';
import RecruiterApplicationDetails from './components/Recruiter/RecruiterApplicationDetails';
import RecruiterRegister2 from './components/Recruiter/RecruiterRegister2';
import UpdateEnterprise from './components/Recruiter/UpdateEnterprise';
import CreateInternshipOffer from './components/Recruiter/CreateInternshipOffer';
import RecruiterInternships from './components/Recruiter/RecruiterInternships';
import PrivateRoute from './PrivateRoute';
import RequireProfileRoute from './components/Intern/RequireProfileRoute';
import PublicRoute from './PublicRoute';
import RequireNoProfileRoute from './components/Intern/RequireNoProfileRoute';
const router = createBrowserRouter([
    {
      path: '/',
      element: <Container />,
      children: [
        {
          //Recruiter Routes 
          path: 'recruteur/',
          element:<RecruiterLayOut/>,
          children : [
            {
                path:'inscription/',
                element: <PublicRoute children={ <RecruiterRegister/>}/>
            },
            {
              path:'connexion/',
              element: <PublicRoute children={  <RecruiterLogin/>}/>
          },
          
          {
            element:<PrivateRoute allowedRoles={['recruiter']}/>,
            children:[

              {
                path:'creer_entreprise/',
                element:<RecruiterRegister2/>
              },
              {
                path:'dashboard/',
                children:[
                  {
                    index:true,
                    element:<RecruiterDefaultDashboardPage/>,                               
                  },
                
                  {
                    path:'candidatures/',
                    element:<ReceivedApplication/>
                  },
                  {
                    path:'candidatures/details/',
                    element:<RecruiterApplicationDetails/>
                  },
                  {
                    path:'entreprise/',
                    element:<UpdateEnterprise/>
                  },
                  {
                    path:'offre-stage/',
                    element:<CreateInternshipOffer/>
                  },
                  {
                    path:'offres-stage/',
                    element:<RecruiterInternships/>
                  }
                ]
              }
            ]
          },

          ],

        },
        {    
          //Intern Routes
          path: 'stagaire/',
          element:<InternLayOut/>,
          //protected routes of intern user type ,it includes : /creer_profil,/dashboard
          children : [
            {
                path:'inscription/',
                element: <PublicRoute children={<InternRegister/>}/>
            },
            {
              path:'connexion/',
              element:<PublicRoute children={ <InternLogin/>}/>
          },
          {
            element:<PrivateRoute allowedRoles={['intern']} />,
            children:[
                     {  
                      path:'creer_profil/',
                      element: <RequireNoProfileRoute children={<InternRegister2/>}/> 
                    },
                    {
                       path:'dashboard/',
                       element:<RequireProfileRoute children={<InternDashboard/>}/>,                        
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
                    ]
          },
          ],
          //end protected routes of user type intern
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
