import { Dispatch, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { Group, Indicator, Navbar, SegmentedControl } from "@mantine/core";
import {
  IconSettings,
  IconDatabaseImport,
  IconLogout,
  IconHome,
  IconReport,
  IconHomeStats,
} from "@tabler/icons-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../..";
import { useStyles } from "./navbarSegmentedStyles";
import { getPathNameURL } from "../../helpers/getPathNameURL";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { usePrevPropValue } from "../../hooks/usePrevPropValue";

type NewNavBarProps = {
  hidden: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
};

const tabs = {
  history: [
    { link: "/", label: "Home", icon: IconHome },
    { link: "/history", label: "History", icon: IconDatabaseImport },
    { link: "/statistic", label: "Statistic", icon: IconHomeStats },
    { link: "/settings", label: "Settings", icon: IconSettings },
  ],
  todo: [{ link: "/todo", label: "ToDo", icon: IconReport }],
};

export function NavbarSegmented({ hidden, setOpened }: NewNavBarProps) {
  // const capitalizedURL = getPathNameURL()
  const { classes, cx } = useStyles();
  const [section, setSection] = useState<"history" | "todo">("history");
  const [active, setActive] = useState<string>("Home");
  
  const { auth , firestore} = useContext(Context);
  const [user] = useAuthState(auth);
  

  const links = tabs[section].map((item) => (
    item.label === 'History' ?
    <Indicator color="orange" position="middle-end" size={12} withBorder>
      <Link
        className={cx(classes.link, {
          [classes.linkActive]: item.label === active,
        })}
        to={item.link}
        key={item.label}
        onClick={() => {
          setOpened((o) => !o);
          setActive(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
    </Indicator>: <Link
        className={cx(classes.link, {
          [classes.linkActive]: item.label === active,
        })}
        to={item.link}
        key={item.label}
        onClick={() => {
          setOpened((o) => !o);
          setActive(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
  ));

  const logout = () => {
    setOpened((o) => !o);
    // event.preventDefault();
    auth.signOut();
  };

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!hidden}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section>
        <SegmentedControl
          value={section}
          onChange={(value: "history" | "todo") => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: "History", value: "history" },
            { label: "ToDo", value: "todo" },
          ]}
        />
      </Navbar.Section>

      <Navbar.Section grow mt="xl">
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link to={"/login"} className={classes.link} onClick={logout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          {user ? <span>Logout {auth.currentUser.displayName}</span> : ""}
        </Link>
      </Navbar.Section>
    </Navbar>
  );
}
