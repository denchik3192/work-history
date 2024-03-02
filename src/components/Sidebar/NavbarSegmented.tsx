import { Dispatch, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Indicator, Navbar, SegmentedControl } from '@mantine/core';
import { IconDatabaseImport, IconLogout, IconHome, IconHomeStats } from '@tabler/icons-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useStyles } from './navbarSegmentedStyles';
import { auth } from '../../FireBase/Config';

type NewNavBarProps = {
  hidden: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
};

const tabs = {
  history: [
    { link: '/', label: 'Home', icon: IconHome },
    { link: '/history', label: 'History', icon: IconDatabaseImport },
    { link: '/statistic', label: 'Statistic', icon: IconHomeStats },
  ],
};

export function NavbarSegmented({ hidden, setOpened }: NewNavBarProps) {
  const { classes, cx } = useStyles();
  const [section, setSection] = useState<'history'>('history');
  const [active, setActive] = useState<string>('');
  const [isNewRecord] = useState<boolean>(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const currentUrl = window.location.pathname;
    const getNavURL = (currentUrl: string) => {
      if (currentUrl === '/') {
        return setActive('Home');
      } else {
        return setActive(currentUrl.charAt(1).toUpperCase() + currentUrl.slice(2));
      }
    };
    getNavURL(currentUrl);
  }, []);

  const links = tabs[section].map((item, idx) =>
    item.label === 'History' && isNewRecord ? (
      <Indicator color="orange" key={idx} position="middle-end" size={12} withBorder>
        <Link
          className={cx(classes.link, {
            [classes.linkActive]: item.label === active,
          })}
          to={item.link}
          key={item.label}
          onClick={() => {
            setOpened((o) => !o);
            setActive(item.label);
          }}>
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Link>
      </Indicator>
    ) : (
      <Link
        className={cx(classes.link, {
          [classes.linkActive]: item.label === active,
        })}
        to={item.link}
        key={item.label}
        onClick={() => {
          setOpened((o) => !o);
          setActive(item.label);
        }}>
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
    ),
  );

  const logout = () => {
    setOpened((o) => !o);
    // e.preventDefault();
    auth.signOut();
  };

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!hidden} width={{ sm: 200, lg: 300 }}>
      <Navbar.Section>
        <SegmentedControl
          value={section}
          onChange={(value: 'history') => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[{ label: 'Dash', value: 'dash' }]}
        />
      </Navbar.Section>

      <Navbar.Section grow mt="xl">
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link to={'/login'} className={classes.link} onClick={logout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          {user ? <span>Logout {auth?.currentUser?.displayName}</span> : ''}
        </Link>
      </Navbar.Section>
    </Navbar>
  );
}
