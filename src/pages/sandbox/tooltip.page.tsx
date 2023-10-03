import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layouts/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip';
import Typography from '@/components/typography/Typography';

export default function TooltipPage() {
  return (
    <Layout>
      <Seo title='Tooltip' />
      <main className='layout min-h-screen py-10'>
        <ButtonLink
          size='small'
          variant='outline'
          href='/sandbox'
          leftIcon={FiChevronLeft}
        >
          Back
        </ButtonLink>
        <div className='mt-6'>
          {/* note: tooltip doesn't work well with 'space-y' tailwind class, use margin instead */}
          <div className='mt-4'>
            <Typography variant='d' className='font-medium mb-4'>
              Hover to see the tooltip
            </Typography>
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button>Button Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <Typography variant='b4'>Add your content</Typography>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </main>
    </Layout>
  );
}
