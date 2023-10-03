import * as React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { HiLightningBolt } from 'react-icons/hi';

import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';
import {
  FooterContent1,
  FooterContent2,
  FooterContent3,
} from '@/constant/layout';
import clsxm from '@/lib/clsxm';

export default function Footer() {
  const [isServiceOpen, setIsServiceOpen] = React.useState(false);
  const [isResourceOpen, setIsResourceOpen] = React.useState(false);

  const toggleService = () => setIsServiceOpen((prev) => !prev);
  const toggleResource = () => setIsResourceOpen((prev) => !prev);
  return (
    <footer
      className={clsxm(
        'w-full bg-base-dark text-white',
        'flex flex-col items-center gap-2.5 md:gap-12 pt-12 pb-8 px-6 md:px-20',
        'divide-y divide-base-black',
      )}
    >
      <div
        className={clsxm(
          'flex w-full flex-col items-center gap-4 pb-6',
          'md:min-h-[200px] md:flex-row md:items-start md:justify-between md:gap-y-12',
        )}
      >
        <UnstyledLink href='' className='flex items-center pb-4 gap-4'>
          <HiLightningBolt size={40} />
          <Typography variant='h1' className='hidden md:block text-xl'>
            Brand
          </Typography>
        </UnstyledLink>
        <div className='space-y-4 md:space-y-6 cursor-pointer'>
          <div onClick={toggleService} className='flex items-center gap-2'>
            <Typography variant='h2'>Services</Typography>
            <FiChevronDown
              className={clsxm(
                'text-xl md:hidden',
                'transition-transform duration-200 ease-in-out',
                isServiceOpen && 'rotate-180',
              )}
            />
          </div>
          <div
            className={clsxm(
              'flex flex-col gap-2.5 text-base-icon',
              'overflow-y-hidden transition-all duration-300 ease-in-out',
              isServiceOpen
                ? 'max-h-96 opacity-100'
                : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100',
            )}
          >
            {FooterContent1.map(({ label, href }, index) => (
              <UnstyledLink key={index} href={href}>
                {label}
              </UnstyledLink>
            ))}
          </div>
        </div>
        <div className='space-y-4 md:space-y-6 cursor-pointer'>
          <div onClick={toggleResource} className='flex items-center gap-2'>
            <Typography variant='h2'>Resources</Typography>
            <FiChevronDown
              className={clsxm(
                'text-xl md:hidden',
                'transition-transform duration-200 ease-in-out',
                isResourceOpen && 'rotate-180',
              )}
            />
          </div>
          <div
            className={clsxm(
              'flex flex-col gap-2.5 text-base-icon',
              'overflow-y-hidden transition-all duration-300 ease-in-out',
              isResourceOpen
                ? 'max-h-96 opacity-100'
                : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100',
            )}
          >
            {FooterContent2.map(({ label, href }, index) => (
              <UnstyledLink key={index} href={href}>
                {label}
              </UnstyledLink>
            ))}
          </div>
        </div>
        <div className='space-y-4 md:space-y-6'>
          <Typography variant='h2' className='hidden md:inline'>
            Social
          </Typography>
          <div className='flex flex-col gap-2.5 text-base-icon'>
            {FooterContent3.slice(0, 2).map(
              ({ label, href, icon: Icon }, index) => (
                <UnstyledLink
                  key={index}
                  href={href}
                  className='md:flex items-center gap-2 hidden'
                >
                  <Icon size={20} className='flex-shrink-0' />
                  {label}
                </UnstyledLink>
              ),
            )}
            <div className='flex items-center gap-2.5 md:mt-2'>
              {FooterContent3.slice(0, 2).map(({ href, icon: Icon }, index) => (
                <ButtonLink
                  key={index}
                  href={href}
                  icon={Icon}
                  className='md:hidden'
                />
              ))}
              {FooterContent3.slice(2, 6).map(({ href, icon: Icon }, index) => (
                <ButtonLink key={index} href={href} icon={Icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='w-full pt-4 md:pt-6 flex flex-col md:flex-row justify-between gap-y-4 items-center md:items-start'>
        <UnstyledLink
          openNewTab
          target='_blank'
          href='https://www.flaticon.com/free-icons/arrow'
          title='arrow icons'
          className='text-xs text-base-icon'
        >
          Arrow icons created by Freepik - Flaticon
        </UnstyledLink>
        <Typography variant='c0' className='text-base-icon text-center text-sm'>
          &copy; Your Brand 2023
        </Typography>
      </div>
    </footer>
  );
}
