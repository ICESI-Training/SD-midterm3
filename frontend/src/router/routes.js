import FrontComponent from '@/components/FrontComponent'

const routes = [

  {path: '/home', component: FrontComponent},

  { path: '/', redirect: '/home' },
  { path: '*', redirect: '/' }   
];

export default routes;