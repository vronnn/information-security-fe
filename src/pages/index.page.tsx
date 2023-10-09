import Image from 'next/image';
import * as React from 'react';

import Layout from '@/components/layouts/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';

export default function Home() {
  return (
    <Layout withNavbar>
      <Seo />
      <main className='min-h-screen flex flex-col lg:flex-row items-center w-10/12 justify-center mx-auto py-32 relative'>
        {/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]"></div> */}
        <div className='flex flex-col items-center lg:items-start gap-y-7 basis-1/2'>
          <div className='flex flex-col gap-y-5 items-center text-center lg:items-start lg:text-start'>
            <h1 className='text-3xl lg:text-5xl font-bold max-w-sm lg:max-w-md 2xl:max-w-none'>
              Discover Your Next Career Move
            </h1>
            <p className='text-gray-500 max-w-md lg:max-w-none'>
              Explore diverse career opportunities on Workhub. Find full-time
              jobs, freelance gigs, and remote work in one place. Join us today
              to advance your career!
            </p>
          </div>
          <div className='flex items-center gap-2.5'>
            <ButtonLink href='/register'>Get Started</ButtonLink>
            <ButtonLink
              href='https://github.com/vronnn/information-security-fe'
              variant='outline'
            >
              Github
            </ButtonLink>
          </div>
        </div>
        <div className='order-1 md:order-2'>
          <div className='max-w-xs lg:max-w-lg h-full flex items-center max-h-72 lg:max-h-96 overflow-hidden'>
            <Image
              src='/work-from-home.svg'
              alt='regist-illustration'
              width={960}
              height={960}
              className='scale-x-[-1]'
            />
          </div>
        </div>
        <p className='absolute bottom-12 text-sm font-light text-gray-600 flex items-center divide-x divide-gray-500 [&>*]:px-2'>
          <span>
            Image:{' '}
            <a
              href='https://popsy.co'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              popsy.co
            </a>
          </span>
        </p>
      </main>
    </Layout>
  );
}
