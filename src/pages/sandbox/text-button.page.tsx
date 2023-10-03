import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';

import TextButton, { TextButtonVariant } from '@/components/buttons/TextButton';
import Layout from '@/components/layouts/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import TextLink, { TextLinkVariant } from '@/components/links/TextLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default function TextButtonPage() {
  return (
    <Layout>
      <Seo title='Text Button' />
      <main className='layout min-h-screen py-10'>
        <ButtonLink
          size='small'
          variant='outline'
          href='/sandbox'
          leftIcon={FiChevronLeft}
        >
          Back
        </ButtonLink>
        <div className='space-y-4 mt-4'>
          <Typography variant='h2' className='text-lg'>
            Text Button
          </Typography>
          <TextButtonLinkVariantSet />
        </div>
      </main>
    </Layout>
  );
}

function TextButtonLinkSet({
  buttonVariant,
  linkVariant,
}: {
  buttonVariant: keyof typeof TextButtonVariant;
  linkVariant: keyof typeof TextLinkVariant;
}) {
  return (
    <div className='grid grid-rows-3 gap-2'>
      <div className='flex flex-wrap items-end gap-4'>
        <TextButton variant={buttonVariant} size='large'>
          Button
        </TextButton>
        <TextButton variant={buttonVariant} size='base'>
          Button
        </TextButton>
        <TextButton variant={buttonVariant} size='small'>
          Button
        </TextButton>
      </div>
      <div className='flex flex-wrap items-end gap-4'>
        <TextButton variant={buttonVariant} size='large' disabled>
          Button
        </TextButton>
        <TextButton variant={buttonVariant} size='base' disabled>
          Button
        </TextButton>
        <TextButton variant={buttonVariant} size='small' disabled>
          Button
        </TextButton>
      </div>
      <div className='flex flex-wrap items-end gap-4'>
        <TextLink variant={linkVariant} href='' size='large'>
          Link
        </TextLink>
        <TextLink variant={linkVariant} href='' size='base'>
          Link
        </TextLink>
        <TextLink variant={linkVariant} href='' size='small'>
          Link
        </TextLink>
      </div>
    </div>
  );
}

function TextButtonLinkVariantSet() {
  return (
    <div className='space-y-10'>
      <TextButtonLinkSet linkVariant='basic' buttonVariant='basic' />
      <TextButtonLinkSet linkVariant='primary' buttonVariant='primary' />
      <TextButtonLinkSet linkVariant='danger' buttonVariant='danger' />
    </div>
  );
}
