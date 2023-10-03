import * as React from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { MdOutlineLogout } from 'react-icons/md';

import TextButton from '@/components/buttons/TextButton';
import Navigation from '@/components/layouts/dashboard/Navigation';
import Typography from '@/components/typography/Typography';

type DesktopNavigationProps = {
  withFooter?: boolean;
};

export default function DesktopNavigation({
  withFooter = false,
}: DesktopNavigationProps) {
  return (
    <div className='hidden md:fixed md:inset-y-0 md:flex md:w-56 md:flex-col'>
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className='flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 relative'>
        <div className='flex flex-shrink-0 items-center px-4'>
          <Typography variant='s1'>⚡️ Dashboard</Typography>
        </div>
        <div className='mt-5 flex flex-grow flex-col'>
          <nav className='flex-1 space-y-1 pb-4'>
            <Navigation />
          </nav>
        </div>
        {withFooter && (
          <div className='sticky bottom-0 bg-white inset-x-0 pb-8 pt-4 px-3 flex flex-col items-start gap-1'>
            <TextButton
              leftIcon={FiHelpCircle}
              variant='basic'
              size='small'
              className='text-sm md:text-sm p-2'
              leftIconClassName='text-lg'
            >
              Bantuan
            </TextButton>
            <TextButton
              leftIcon={MdOutlineLogout}
              variant='danger'
              size='small'
              className='text-sm md:text-sm p-2'
              leftIconClassName='text-lg'
            >
              Log out
            </TextButton>
          </div>
        )}
      </div>
    </div>
  );
}
