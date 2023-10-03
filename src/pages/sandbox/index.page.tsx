import Layout from '@/components/layouts/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

const sandboxContent = [
  {
    href: '/sandbox/toast',
    label: 'Toast',
  },
  {
    href: '/sandbox/button',
    label: 'Button',
  },
  {
    href: '/sandbox/color',
    label: 'Color',
  },
  {
    href: '/sandbox/modal',
    label: 'Modal',
  },
  {
    href: '/sandbox/dialog',
    label: 'Dialog',
  },
  {
    href: '/sandbox/popover',
    label: 'Popover',
  },
  {
    href: '/sandbox/form',
    label: 'Form',
  },
  {
    href: '/sandbox/table',
    label: 'Table',
  },
  {
    href: '/sandbox/tooltip',
    label: 'Tooltip',
  },
  {
    href: '/sandbox/accordion',
    label: 'Accordion',
  },
  {
    href: '/sandbox/breadcrumbs',
    label: 'Breadcrumbs',
  },
  {
    href: '/sandbox/hover-card',
    label: 'Hover Card',
  },
  {
    href: '/sandbox/text-button',
    label: 'Text Button & Link',
  },
];

export default function Sandbox() {
  return (
    <Layout withNavbar>
      <Seo title='Sandbox' />
      <main className='h-screen overflow-hidden grid place-items-center text-base-dark px-6'>
        <div className='space-y-6 md:space-y-8'>
          <div className='mx-auto text-center space-y-2.5 flex flex-col items-center'>
            <Typography
              variant='j2'
              className='text-center font-semibold text-2xl w-fit mr-5'
            >
              ⚡️ Template Design System
            </Typography>
            <Typography variant='b4' className='text-base-black w-fit'>
              Reusable and adjustable UI components
            </Typography>
          </div>
          <div className='flex flex-wrap justify-center gap-2.5 md:max-w-[70%] mx-auto'>
            {sandboxContent.map(({ href, label }, index) => (
              <ButtonLink key={index} href={href} variant='outline'>
                {label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </main>
      <Typography
        variant='b4'
        className='absolute bottom-6 inset-x-0 text-center text-base-secondary'
      >
        Copyright &copy; 2023 <UnstyledLink href=''>zhafran dzaky</UnstyledLink>
      </Typography>
    </Layout>
  );
}
