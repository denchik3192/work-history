import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar, SegmentedControl, Text, createStyles, getStylesRef, rem } from '@mantine/core';
import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconBellRinging,
  IconMessages,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconUsers,
  IconFileAnalytics,
  IconDatabaseImport,
  IconReceipt2,
  IconReceiptRefund,
  IconLogout,
  IconSwitchHorizontal,
  IconHome,
  IconSettingsAutomation,
  IconReport,
} from '@tabler/icons-react';
import { IconSettings2 } from '@tabler/icons-react';
import { IconSettingsBolt } from '@tabler/icons-react';
import { Logo } from './Logo';

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
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
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
  account: [
    { link: '/', label: 'Home', icon: IconHome },
    { link: '/dashboard', label: 'Dashboard', icon: IconDatabaseImport },
    { link: '/security', label: 'Security', icon: IconFingerprint },
    { link: '/settings', label: 'Settings', icon: IconSettings },
    // { link: '', label: 'Billing', icon: IconReceipt2 },
    // { link: '', label: 'SSH Keys', icon: IconKey },
    // { link: '', label: 'Authentication', icon: Icon2fa },
  ],
  general: [{ link: '/oracle', label: 'Oracle reports', icon: IconReport }],
};

export function NavbarSegmented() {
  const { classes, cx } = useStyles();
  const [section, setSection] = useState<'account' | 'general'>('account');
  const [active, setActive] = useState('Billing');

  const links = tabs[section].map((item) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
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

  return (
    <Navbar height={'100vh'} width={{ sm: 250 }} p="md" className={classes.navbar}>
      <Navbar.Section>
        <Text weight={500} size="sm" className={classes.title} color="dimmed" mb="xs">
          <Logo /> Diary
        </Text>

        <SegmentedControl
          value={section}
          onChange={(value: 'account' | 'general') => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: 'Main', value: 'account' },
            { label: 'More', value: 'general' },
          ]}
        />
      </Navbar.Section>

      <Navbar.Section grow mt="xl">
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link to="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </Link>

        <Link to="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </Navbar.Section>
    </Navbar>
  );
}
