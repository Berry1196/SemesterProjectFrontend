import { Disclosure } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import NavLogo from "./NavLogo";
import DesktopNavMenu from "./DesktopNavMenu";
import NavHamburgerButton from "./NavHamburgerButton";
import MobileNavMenu from "./MobileNavMenu";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import facade from "../../ApiFacade";
import { useEffect, useState } from "react";
import UsernameButton from "./UsernameButton";
import RoleButton from "./RoleButton";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },
];

export default function Navbar({ username, role }) {
  navigation.map((item) => {
    if (item.href === useLocation().pathname) {
      item.current = true;
    } else {
      item.current = false;
    }
  });

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 items-center justify-between'>
              <div className='flex items-center'>
                <NavLogo />
                <DesktopNavMenu navigation={navigation} />
              </div>
              {facade.loggedIn() ? (
                <div className='flex gap-6'>
                  <RoleButton role={role} />
                  <UsernameButton username={username} />
                  <LogOutButton />
                </div>
              ) : (
                <LogInButton />
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
