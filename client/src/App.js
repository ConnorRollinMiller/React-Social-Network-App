import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { Provider } from 'react-redux';

import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Layout from './components/layout/Layout';
import Routes from './components/routing/Routes';

import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
   setAuthToken(localStorage.token);
}

const App = () => {
   useEffect(() => {
      store.dispatch(loadUser());
   }, []);

   return (
      <Provider store={store}>
         <Router>
            <div className='min-vh-100'>
               <NavBar />
               <Switch>
                  <Route exact path='/' component={Landing} />
                  <Layout>
                     <Route component={Routes} />
                  </Layout>
               </Switch>
               <ToastContainer
                  toastClassName='text-center text-capitalize rounded font-weight-bold'
                  hideProgressBar
                  enableMultiContainer
                  autoClose={4000}
                  pauseOnVisibilityChange={false}
                  pauseOnHover={false}
                  position={toast.POSITION.BOTTOM_CENTER}
                  transition={Zoom}
               />
            </div>
         </Router>
      </Provider>
   );
};
export default App;
