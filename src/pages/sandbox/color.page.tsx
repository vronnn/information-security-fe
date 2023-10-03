import { FiChevronLeft } from 'react-icons/fi';

import Layout from '@/components/layouts/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

const ColorCode = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const BaseColorCode = [
  'white',
  'light',
  'icon',
  'secondary',
  'black',
  'subtle',
  'dark',
];
const Color = ['primary', 'secondary', 'base'];

export default function ColorPage() {
  return (
    <Layout>
      <Seo title='Color' />
      <main className='layout min-h-screen py-10'>
        <div className='space-y-4 grid'>
          <ButtonLink
            size='small'
            variant='outline'
            href='/sandbox'
            leftIcon={FiChevronLeft}
          >
            Back
          </ButtonLink>
          <Typography variant='h2' className='text-lg'>
            Colors
          </Typography>
          <section className='grid grid-rows-4 gap-8'>
            <ColorSet label='Main' color='main' />
            <ColorSet label='Primary' color='primary' />
            <ColorSet label='Secondary' color='secondary' />
            <ColorSet label='Base' color='base' />
          </section>
        </div>
      </main>
    </Layout>
  );
}

type ColorSetProps = {
  label: string;
  color: (typeof Color)[number];
};

function ColorSet({ label, color }: ColorSetProps) {
  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap gap-3.5'>
        {color === 'primary' || color === 'secondary' || color === 'main'
          ? ColorCode.map((code, index) => (
              <div
                key={index}
                className={clsxm(
                  'w-[6.5rem] h-[6.5rem] flex justify-center rounded-xl',
                  color === 'main' && [
                    code === 50 && 'bg-blue-50 text-base-black',
                    code === 100 && 'bg-blue-100 text-base-black',
                    code === 200 && 'bg-blue-200 text-base-black',
                    code === 300 && 'bg-blue-300 text-base-light',
                    code === 400 && 'bg-blue-400 text-base-light',
                    code === 500 && 'bg-blue-500 text-base-light',
                    code === 600 && 'bg-blue-600 text-base-light',
                    code === 700 && 'bg-blue-700 text-base-light',
                    code === 800 && 'bg-blue-800 text-base-light',
                    code === 900 && 'bg-blue-900 text-base-light',
                  ],
                  color === 'primary' && [
                    code === 50 && 'bg-primary-50 text-base-black',
                    code === 100 && 'bg-primary-100 text-base-black',
                    code === 200 && 'bg-primary-200 text-base-black',
                    code === 300 && 'bg-primary-300 text-base-light',
                    code === 400 && 'bg-primary-400 text-base-light',
                    code === 500 && 'bg-primary-500 text-base-light',
                    code === 600 && 'bg-primary-600 text-base-light',
                    code === 700 && 'bg-primary-700 text-base-light',
                    code === 800 && 'bg-primary-800 text-base-light',
                    code === 900 && 'bg-primary-900 text-base-light',
                  ],
                  color === 'secondary' && [
                    code === 50 && 'bg-secondary-50 text-base-black',
                    code === 100 && 'bg-secondary-100 text-base-black',
                    code === 200 && 'bg-secondary-200 text-base-black',
                    code === 300 && 'bg-secondary-300 text-base-light',
                    code === 400 && 'bg-secondary-400 text-base-light',
                    code === 500 && 'bg-secondary-500 text-base-light',
                    code === 600 && 'bg-secondary-600 text-base-light',
                    code === 700 && 'bg-secondary-700 text-base-light',
                    code === 800 && 'bg-secondary-800 text-base-light',
                    code === 900 && 'bg-secondary-900 text-base-light',
                  ],
                )}
              >
                <div className='w-full h-full py-4 flex flex-col justify-between items-center text-center'>
                  <Typography
                    variant='s4'
                    className={clsxm(
                      'w-fit px-2.5 py-1 mx-auto rounded-full bg-inherit',
                      color === 'main' && [
                        code === 50 && 'bg-blue-100',
                        code === 100 && 'bg-blue-200',
                        code === 200 && 'bg-blue-300',
                        code === 300 && 'bg-blue-400',
                        code === 400 && 'bg-blue-500',
                        code === 500 && 'bg-blue-600',
                        code === 600 && 'bg-blue-700',
                        code === 700 && 'bg-blue-800',
                        code === 800 && 'bg-blue-900',
                        code === 900 && 'bg-blue-950',
                      ],
                      color === 'primary' && [
                        code === 50 && 'bg-primary-100',
                        code === 100 && 'bg-primary-200',
                        code === 200 && 'bg-primary-300',
                        code === 300 && 'bg-primary-400',
                        code === 400 && 'bg-primary-500',
                        code === 500 && 'bg-primary-600',
                        code === 600 && 'bg-primary-700',
                        code === 700 && 'bg-primary-800',
                        code === 800 && 'bg-primary-900',
                        code === 900 && 'bg-primary-950',
                      ],
                      color === 'secondary' && [
                        code === 50 && 'bg-secondary-100',
                        code === 100 && 'bg-secondary-200',
                        code === 200 && 'bg-secondary-300',
                        code === 300 && 'bg-secondary-400',
                        code === 400 && 'bg-secondary-500',
                        code === 500 && 'bg-secondary-600',
                        code === 600 && 'bg-secondary-700',
                        code === 700 && 'bg-secondary-800',
                        code === 800 && 'bg-secondary-900',
                        code === 900 && 'bg-secondary-950',
                      ],
                    )}
                  >
                    {label}
                  </Typography>
                  <Typography variant='d'>{code}</Typography>
                </div>
              </div>
            ))
          : BaseColorCode.map((code, index) => (
              <div
                key={index}
                className={clsxm(
                  'w-[6.5rem] h-[6.5rem] flex justify-center rounded-xl',
                  code === 'white' && 'bg-base-white',
                  code === 'light' && 'bg-base-light',
                  code === 'icon' && 'bg-base-icon',
                  code === 'secondary' && 'bg-base-secondary',
                  code === 'subtle' && 'bg-base-subtle text-base-light',
                  code === 'black' && 'bg-base-black text-base-light',
                  code === 'dark' && 'bg-base-dark text-base-light',
                )}
              >
                <div className='w-full h-full py-4 flex flex-col justify-between items-center text-center'>
                  <Typography
                    variant='s4'
                    className={clsxm(
                      'w-fit px-2.5 py-1 mx-auto rounded-full bg-inherit',
                      code === 'white' && 'bg-base-white',
                      code === 'light' && 'bg-base-light',
                      code === 'icon' && 'bg-base-icon',
                      code === 'secondary' && 'bg-base-secondary',
                      code === 'subtle' && 'bg-base-subtle text-base-light',
                      code === 'black' && 'bg-base-black text-base-light',
                      code === 'dark' && 'bg-base-dark text-base-light',
                    )}
                  >
                    {label}
                  </Typography>
                  <Typography variant='d'>{code}</Typography>
                </div>
                {/* <Typography
                  variant='s3'
                  className={clsxm(
                    code === 'secondary' && 'break-all text-center',
                  )}
                >
                  {code}
                </Typography> */}
              </div>
            ))}
      </div>
    </div>
  );
}
