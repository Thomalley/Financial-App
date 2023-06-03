import React, { Fragment, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthGuard from './components/Auth/AuthGuard';
import DashboardLayout from './components/Navigation';
import LoadingScreen from './components/Loading/LoadingScreen';

import Login from './views/Login';
import PostRegister from './views/Register/PostRegister';

import AdminListView from './views/Admin/Users/UserListView';
import AdminCreateView from './views/Admin/Users/UserCreateView';
import AdminEditView from './views/Admin/Users/UserEditView';

const routesConfig = [
  {
    id: 1,
    exact: true,
    path: '/',
    component: () => <Login />,
  },
  {
    id: 4,
    exact: true,
    path: '/reset-password?token=:token',
    component: () => <Redirect to="/reset-password/:token" />,
  },
  {
    id: 5,
    exact: true,
    path: '/postRegister',
    component: () => <PostRegister />,
  },
  {
    id: 6,
    exact: true,
    path: '/login',
    component: () => <Login />,
  },
  {
    path: '/administracion',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        id: 11,
        exact: true,
        path: '/administracion',
        component: () => <Redirect to="/administracion/usuarios" />,
      },
      {
        id: 12,
        exact: true,
        path: '/administracion/usuarios',
        component: () => <AdminListView />,
      },
      {
        id: 13,
        exact: true,
        path: '/administracion/usuarios/crear',
        component: () => <AdminCreateView />,
      },
      {
        id: 14,
        exact: true,
        path: '/administracion/usuarios/:id/editar',
        component: () => <AdminEditView />,
      },
      {
        id: 100,
        component: () => <Redirect to="/administracion/usuarios" />,
      },
    ],
  },
];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
