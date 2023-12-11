import { useRouter } from 'next/router';
import * as React from 'react';
import { FiMenu } from 'react-icons/fi';
import { HiLightningBolt } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { PiRocketBold } from 'react-icons/pi';

import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';
import { NavbarItem } from '@/constant/layout';
import clsxm from '@/lib/clsxm';
import useAuthStore from '@/store/useAuthStore';

type NavbarProps = {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
};

export default function Navbar({
  isSidebarOpen,
  openSidebar,
  closeSidebar,
}: NavbarProps) {
  const router = useRouter();
  const user = useAuthStore.useUser();

  //#region  //*=========== Navbar Scroll Effect ===========
  const [isScrolled, setIsScrolled] = React.useState(false);
  const handleScroll = () => {
    setIsScrolled(window.scrollY >= 10);
  };
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //#endregion  //*======== Navbar Scroll Effect ===========

  return (
    <header className='fixed top-0 z-50 w-full'>
      {/* desktop navbar */}
      <div
        className={clsxm(
          'flex flex-row-reverse md:flex-row',
          'items-center justify-between',
          'px-6 md:px-20 min-h-[4.5rem]',
          isScrolled &&
            'bg-white bg-opacity-50 shadow-sm backdrop-blur transition-colors duration-150',
        )}
      >
        <UnstyledLink href='/' className='flex items-center gap-1.5'>
          <PiRocketBold className='text-xl' />
          <Typography variant='h3'>Workhub</Typography>
        </UnstyledLink>

        <Button icon={FiMenu} onClick={openSidebar} className='md:hidden' />

        <nav className='hidden md:flex items-center gap-6'>
          {NavbarItem.map(({ label, href }, index) => (
            <UnstyledLink
              key={index}
              href={href}
              className={clsxm(
                'p-2.5 text-base-icon hover:text-base-secondary',
                'transition-colors duration-100',
                router.asPath.split('/')[1] === href.slice(1) &&
                  '!text-base-black',
              )}
            >
              <Typography variant='d' className='font-medium'>
                {label}
              </Typography>
            </UnstyledLink>
          ))}
          {user ? (
            <Typography>{user.name}</Typography>
          ) : (
            <ButtonLink href='/login'>Log in</ButtonLink>
          )}
        </nav>
      </div>
      {/* mobile navbar */}
      <nav
        className={clsxm(
          'fixed top-0 left-0 w-full h-full bg-white',
          'transition duration-200 ease-in-out',
          'grid grid-rows-2 place-items-center md:hidden',
          isSidebarOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0',
        )}
      >
        <div className='flex flex-col items-center gap-12 py-10'>
          <UnstyledLink href='/'>
            <HiLightningBolt size={30} className='text-primary-800' />
          </UnstyledLink>

          <div className='flex flex-col items-center gap-6'>
            {NavbarItem.map(({ label, href }, index) => (
              <UnstyledLink key={index} href={href}>
                {label}
              </UnstyledLink>
            ))}
            <ButtonLink href='/login'>Log in</ButtonLink>
          </div>
        </div>

        <div>
          <Button onClick={closeSidebar} icon={IoClose} />
        </div>
      </nav>
    </header>
  );
}
