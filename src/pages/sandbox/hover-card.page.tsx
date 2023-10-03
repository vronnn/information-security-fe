import { FiChevronLeft } from 'react-icons/fi';

import TextButton from '@/components/buttons/TextButton';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/hovercard/HoverCard';
import Layout from '@/components/layouts/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default function HoverCardPage() {
  return (
    <Layout>
      <Seo title='Hover Card' />
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
                Hover to open
              </Typography>
              <HoverCardExample />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

function HoverCardExample() {
  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild>
        <TextButton>@hover</TextButton>
      </HoverCardTrigger>
      <HoverCardContent>
        <Typography variant='d' className='!text-base-tertiary text-mid'>
          Place your card content here!
        </Typography>
      </HoverCardContent>
    </HoverCard>
  );
}
