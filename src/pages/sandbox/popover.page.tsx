import { Popover } from '@headlessui/react';
import { Float } from '@headlessui-float/react';
import React from 'react';
import { FiChevronLeft, FiX } from 'react-icons/fi';
import { TbPointerQuestion } from 'react-icons/tb';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layouts/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default function PopoverPage() {
  return (
    <Layout>
      <Seo title='Popover' />
      <main className='layout min-h-screen py-10'>
        <div className='space-y-6'>
          <ButtonLink
            size='small'
            variant='outline'
            href='/sandbox'
            leftIcon={FiChevronLeft}
          >
            Back
          </ButtonLink>
          <div className='h-[calc(100vh-14rem)] grid place-items-center'>
            <div className='flex flex-col items-center gap-2'>
              <Typography variant='d' className='font-medium'>
                Click to open
              </Typography>
              <ExamplePopover />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

function ExamplePopover() {
  return (
    <Popover className='relative w-fit'>
      {({ close }) => (
        <Float
          placement='bottom'
          offset={8}
          flip={10}
          className={'border border-red-400'}
          enter='transition duration-200 ease-out'
          enterFrom='scale-95 opacity-0'
          enterTo='scale-100 opacity-100'
          leave='transition duration-150 ease-in'
          leaveFrom='scale-100 opacity-100'
          leaveTo='scale-95 opacity-0'
        >
          <Popover.Button as='div'>
            <Button
              variant='ghost'
              icon={TbPointerQuestion}
              iconClassName='text-lg'
            />
          </Popover.Button>
          <Popover.Panel className='ring-1 ring-gray-50 rounded-lg w-screen max-w-xs'>
            <div className='overflow-hidden rounded-lg shadow-md ring-1 ring-black ring-opacity-5'>
              <div className='bg-white pl-5 pr-4 py-4 flex items-center justify-between gap-1'>
                <Typography
                  variant='d'
                  className='!text-base-tertiary text-mid'
                >
                  Place your popover content here!
                </Typography>
                <Button
                  size='icon'
                  variant='ghost'
                  icon={FiX}
                  className='shadow-none text-sm shrink-0'
                  onClick={() => close()}
                />
              </div>
            </div>
          </Popover.Panel>
        </Float>
      )}
    </Popover>
  );
}
