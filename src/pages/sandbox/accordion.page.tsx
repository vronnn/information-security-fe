import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/disclosure/Accordion';
import Layout from '@/components/layouts/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default function AccordionPage() {
  return (
    <Layout>
      <Seo title='Accordion' />
      <main className='layout min-h-screen py-10'>
        <ButtonLink
          size='small'
          variant='outline'
          href='/sandbox'
          leftIcon={FiChevronLeft}
        >
          Back
        </ButtonLink>
        <div className='mt-4 space-y-4'>
          <Typography variant='h2'>Accordion</Typography>
          <ExampleAccordion />
        </div>
      </main>
    </Layout>
  );
}

function ExampleAccordion() {
  return (
    <Accordion
      type='single'
      collapsible={true}
      className='w-full max-w-sm rounded-lg shadow-sm border text-base-dark divide-y'
    >
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          <Typography variant='d' className='font-medium'>
            What library do I use for this?
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <Typography variant='b4'>
            I use Radix UI react primitives component
          </Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>
          <Typography variant='d' className='font-medium'>
            Is it reusable and adjustable?
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <Typography variant='b4'>
            Yes. It is reusable and adjustable as you need.
          </Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>
          <Typography variant='d' className='font-medium'>
            How can i use it?
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <Typography variant='b4'>
            You can look at the Radix UI documentation
          </Typography>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
