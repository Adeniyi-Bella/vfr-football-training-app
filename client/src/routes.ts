import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Training = React.lazy(() => import('./views/training/Training'))

const Login = React.lazy(() => import('./views/pages/login/Login'))

const routes = [
  { path: '/', exact: true, name: 'Login', element: Login },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/training', name: 'Training', element: Training },
]

export default routes
