/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import PersonIcon from '@mui/icons-material/Person';
import TableRowsIcon from '@mui/icons-material/TableRows';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';
import TableChartIcon from '@mui/icons-material/TableChart';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArticleIcon from '@mui/icons-material/Article';
import LanguageIcon from '@mui/icons-material/Language';

import Logo from '../../Layout/Logo';
import NavItem from './NavItem';

const { DEVELOPER } = require('../../../utils/const/user_types');

const navConfig = [
  {
    items: [
      {
        title: 'Monitoreo',
        icon: VisibilityIcon,
        items: [
          {
            title: 'Panel de control',
            icon: SettingsApplicationsIcon,
            href: '/administracion/panel-de-control',
          },
          {
            title: 'Gráfico proyectos',
            icon: LeaderboardIcon,
            href: '/administracion/proyecto/grafico',
          },
          {
            title: 'Gráfico developers',
            icon: TrendingUpIcon,
            href: '/administracion/developers/grafico',
          },
          {
            title: 'Panel mis proyectos',
            icon: FolderSharedIcon,
            href: '/administracion/usuarios',
          },
        ],
      },
      {
        title: 'Gestión recursos',
        icon: ManageAccountsIcon,
        items: [
          {
            title: 'Dashboard',
            icon: DashboardIcon,
            href: '/administracion/usuarios',
          },
          {
            title: 'Proyecciones demanda',
            icon: BarChartIcon,
            href: '/administracion/proyecto/demanda',
          },
          {
            title: 'Asignación proyectos ',
            icon: AssignmentIndIcon,
            href: '/administracion/celulas-de-proyecto/panel',
          },
          {
            title: 'Asignación developers',
            icon: SupervisorAccountIcon,
            href: '/administracion/asignaciones/panel',
          },
        ],
      },
      {
        title: 'Developers',
        icon: PersonIcon,
        items: [
          {
            title: 'Tabla',
            icon: TableRowsIcon,
            href: '/administracion/developers',
          },
          {
            title: 'Vacaciones',
            icon: BeachAccessIcon,
            href: '/administracion/vacations-requests/all',
          },
          {
            title: 'Talento',
            icon: StarIcon,
            href: '/administracion/talento',
          },
        ],
      },
      {
        title: 'Proyectos',
        icon: WorkIcon,
        items: [
          {
            title: 'Tabla',
            icon: TableChartIcon,
            href: '/administracion/proyecto',
          },
          {
            title: 'Características',
            icon: FactCheckIcon,
            href: '/administracion/caracteristicas',
          },
          {
            title: 'Roles de proyectos',
            icon: AssignmentTurnedInIcon,
            href: '/administracion/proyecto-roles',
          },
        ],
      },
      {
        title: 'Datos generales',
        icon: InfoIcon,
        items: [
          {
            title: 'Clientes',
            icon: GroupIcon,
            href: '/administracion/clientes',
          },
          {
            title: 'Dimensiones',
            icon: SpaceDashboardIcon,
            href: '/administracion/dimensiones',
          },
          {
            title: 'Ciclos',
            icon: AssessmentIcon,
            href: '/administracion/performance-cycles',
          },
        ],
      },
      {
        title: 'Administración',
        icon: AdminPanelSettingsIcon,
        items: [
          {
            title: 'Usuarios',
            icon: PeopleIcon,
            href: '/administracion/usuarios',
          },
          {
            title: 'Roles de usuario',
            icon: AssessmentIcon,
            href: '/administracion/roles',
          },
        ],
      },
      {
        title: 'Tubesoft Website',
        icon: LanguageIcon,
        items: [
          {
            title: 'Blog',
            icon: ArticleIcon,
            href: '/administracion/blog',
          },
        ],
      },
    ],
  },
];

const navConfigDeveloper = (id) => [
  {
    subheader: 'Administración',
    items: [
      {
        title: 'Mis Asignaciones',
        icon: SupervisorAccountIcon,
        href: '/administracion/developers/grafico',
      },
      {
        title: 'Proyectos',
        icon: WorkIcon,
        href: '/administracion/proyecto/developers',
      },
      {
        title: 'Vacaciones',
        icon: BeachAccessIcon,
        href: `/administracion/vacation-requests/${id}`,
      },
      {
        title: 'Ciclos',
        icon: AssessmentIcon,
        href: '/administracion/performance-cycles',
      },
    ],
  },
  {
    subheader: 'Tubesoft Website',
    icon: LanguageIcon,
    items: [
      {
        title: 'Blog',
        icon: ArticleIcon,
        href: '/administracion/blog',
      },
    ],
  },
];

function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        [],
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc, pathname, item, depth = 0,
}) {
  const key = item.title + depth;

  if (item.items) {
    let open = false;
    for (let i = 0; i < item.items.length; i += 1) {
      const element = item.items[i];
      const path = matchPath(pathname, {
        path: element.href,
        exact: true,
      });
      if (path) {
        open = true;
        break;
      }
    }
    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>,
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />,
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
  logo: {
    maxWidth: '300px',
    maxHeight: '100px',
  },
}));

function NavBar({ openMobile, onMobileClose }) {
  const classes = useStyles();
  const location = useLocation();
  const account = useSelector((state) => state.account);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box p={2} display="flex" justifyContent="center">
            <RouterLink to="/">
              <Logo className={classes.logo} />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <RouterLink to="/">
              <Avatar alt="User" className={classes.avatar} />
            </RouterLink>
          </Box>
          <Box mt={2} textAlign="center">
            <Link
              component={RouterLink}
              to="/"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {account.user && account.user.name}
            </Link>
            <Typography variant="body2" color="textSecondary">
              {account.user && account.user.email}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {account.user.role.name !== DEVELOPER
            ? navConfig.map((config, index) => (
                <List
                  key={index}
                >
                  {renderNavItems({
                    items: config.items,
                    pathname: location.pathname,
                  })}
                </List>
            ))
            : navConfigDeveloper(account.user.developer.id).map((config, index) => (
                <List
                  key={index}
                >
                  {renderNavItems({
                    items: config.items,
                    pathname: location.pathname,
                  })}
                </List>
            ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
