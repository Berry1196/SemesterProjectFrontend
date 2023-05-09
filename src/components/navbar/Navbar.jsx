import { Disclosure } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import NavLogo from "./NavLogo";
import DesktopNavMenu from "./DesktopNavMenu";
import NavHamburgerButton from "./NavHamburgerButton";
import MobileNavMenu from "./MobileNavMenu";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import facade from "../../ApiFacade";
import UsernameButton from "./UsernameButton";
import RoleButton from "./RoleButton";
import SignUpButton from "./SignUpButton";
import {useEffect, useState} from "react";

// Customized navigation page for the GUEST
const guestNavigation = [
  { name: "Home", href: "/", current: false },
  // { name: "Exercises", href: "/exercises", current: false },
  { name: "About", href: "/about", current: false },
];
// Customized navigation page for the USER
const userNavigation = [
    { name: "Home", href: "/", current: false },
    { name: "About", href: "/about", current: false },
    { name: "Exercises", href: "/exercises", current: false },
];
// Customized navigation page for the ADMIN
const adminNavigation = [
    { name: "Home", href: "/", current: false },
    { name: "About", href: "/about", current: false },
    { name: "Exercises", href: "/exercises", current: false },
];

export default function Navbar({ username, role }) {
  const [navigation, setNavigation] = useState([]);

  // Set customized navigation based on role
  useEffect(() => {
    if (facade.loggedIn() && role === "admin") {
      setNavigation(adminNavigation);
    } else if (facade.loggedIn() && role === "user") {
      setNavigation(userNavigation);
    } else {
      setNavigation(guestNavigation);
    }

  }, [])

  navigation.map((item) => {
    if (item.href === useLocation().pathname) {
      item.current = true;
    } else {
      item.current = false;
    }
  });

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <NavLogo />
                <DesktopNavMenu navigation={navigation} />
              </div>
              {facade.loggedIn() ? (
                <div className="flex gap-6">
                  <RoleButton role={role} />
                  <UsernameButton username={username} />
                  <LogOutButton />
                </div>
              ) : (
                <div className="flex gap-6">
                  <SignUpButton />
                  <LogInButton />
                </div>
              )}
            </div>
            <NavHamburgerButton open={open} />
          </div>

          <MobileNavMenu open={open} navigation={navigation} />
        </>
      )}
    </Disclosure>
  );
}
