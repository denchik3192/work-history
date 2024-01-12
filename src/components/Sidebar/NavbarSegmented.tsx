import { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
  Group,
  Navbar,
  SegmentedControl,
  Text,
  createStyles,
  getStylesRef,
  rem,
} from '@mantine/core';
import {
  IconSettings,
  IconDatabaseImport,
  IconLogout,
  IconSwitchHorizontal,
  IconHome,
  IconReport,
  IconHomeStats,
} from '@tabler/icons-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    textTransform: 'uppercase',
    letterSpacing: rem(-0.25),
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },

  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingTop: theme.spacing.md,
  },
}));

const tabs = {
  history: [
    { link: '/', label: 'Home', icon: IconHome },
    { link: '/history', label: 'History', icon: IconDatabaseImport },
    { link: '/statistic', label: 'Statistic', icon: IconHomeStats },
    { link: '/settings', label: 'Settings', icon: IconSettings },
  ],
  todo: [{ link: '/todo', label: 'ToDo', icon: IconReport }],
};

export function NavbarSegmented() {
  const { classes, cx } = useStyles();
  const [section, setSection] = useState<'history' | 'todo'>('history');
  const [active, setActive] = useState('Home');
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  const links = tabs[section].map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        // event.preventDefault();
        setActive(item.label);
      }}>
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  const logout = (event: any) => {
    event.preventDefault();
    auth.signOut();
  };

  return (
    <Navbar height={'100vh'} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section>
        <Group>
          <Text weight={500} size="sm" className={classes.title} color="dimmed" mb="xs">
            Diary
          </Text>
        </Group>

        <SegmentedControl
          value={section}
          onChange={(value: 'history' | 'todo') => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: 'History', value: 'history' },
            { label: 'ToDo', value: 'todo' },
          ]}
        />
      </Navbar.Section>

      <Navbar.Section grow mt="xl">
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        {/* <Link to="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </Link> */}

        <Link to="/login" className={classes.link} onClick={logout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          {user ? <span>Logout {auth.currentUser.displayName}</span> : ''}
        </Link>
      </Navbar.Section>
    </Navbar>
  );
}
