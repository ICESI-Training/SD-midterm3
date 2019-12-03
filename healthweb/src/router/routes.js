import HealthCheck from '@/components/HealthCheck'

const routes = [

  {path: '/home', component: HealthCheck},

  { path: '/', redirect: '/home' },
  { path: '*', redirect: '/' }   
];

export default routes;