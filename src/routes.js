import React from 'react';


const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Logout = React.lazy(() => import('./views/Logout'));
const Wall = React.lazy(() => import('./views/Wall'));
const Documents = React.lazy(() => import('./views/Documents'));
const Reservations = React.lazy(() => import('./views/Reservations'));
const Cosplay = React.lazy(() => import('./views/Cosplay'));
const Kpop = React.lazy(() => import('./views/Kpop'));
const DevJogos = React.lazy(() => import('./views/DevJogos'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/wall', name: 'Wall', component: Wall },
  { path: '/documents', name: 'Documents', component: Documents },
  { path: '/reservations', name: 'Reservations', component: Reservations },
  { path: '/cosplay', name: 'Cosplay', component: Cosplay },
  { path: '/kpop', name: 'Kpop', component: Kpop },
  { path: '/devjogos', name: 'DevJogos', component: DevJogos },

];

export default routes;
