import HelloWorld from '@/components/HelloWorld'

const routes = [

  {path: '/home', component: HelloWorld},

  { path: '/', redirect: '/home' },
  { path: '*', redirect: '/' }   
];

export default routes;