import React, { Fragment } from 'react';
import { Menu } from '@headlessui/react';

const links = [
  { href: '/account-settings', label: 'Account Settings' },
  { href: '/support', label: 'Support' },
  { href: '/license', label: 'License' },
  { href: '/sign-out', label: 'Sign Out' }
]

const Dropdown = () => {
  const renderLink = () => {
    return links.map((link) => (
      <Menu.Item key={link.href} as={Fragment}>
        {({ active }) => (
          <a
            href={link.href}
            className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }`}
          >
            {link.label}
          </a>
        )}
      </Menu.Item>
    ));
  }

  return (
    <Menu>
      <Menu.Button>More</Menu.Button>
      <Menu.Items as="div" className="flex flex-col border-2 border-red-200 py-2 px-2">
        {renderLink()}
      </Menu.Items>
    </Menu>
  )
};

export default Dropdown;