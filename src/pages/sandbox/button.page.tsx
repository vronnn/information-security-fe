import {
  FiArrowRight,
  FiChevronLeft,
  FiEdit2,
  FiEye,
  FiPlus,
  FiX,
} from 'react-icons/fi';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layouts/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';
import { ExtractProps } from '@/lib/helper';

export default function ButtonPage() {
  return (
    <Layout>
      <Seo title='Button' />
      <main className='layout min-h-screen py-10'>
        <ButtonLink
          size='small'
          variant='outline'
          href='/sandbox'
          leftIcon={FiChevronLeft}
        >
          Back
        </ButtonLink>
        <section className='grid grid-cols-1 lg:grid-cols-2 text-base-black gap-12 mt-4'>
          <div className='space-y-4'>
            <Typography variant='h2' className='text-lg'>
              Button
            </Typography>
            <ButtonVariantSet />
          </div>
          <div className='space-y-4'>
            <Typography variant='h2' className='text-lg'>
              Icon Button
            </Typography>
            <IconButtonVariantSet />
          </div>
        </section>
      </main>
    </Layout>
  );
}

type ButtonProps = ExtractProps<typeof Button>;

function ButtonSizeSet(props: ButtonProps) {
  return (
    <div className='flex flex-wrap items-end gap-3'>
      <Button
        leftIcon={FiPlus}
        rightIcon={FiArrowRight}
        size='large'
        {...props}
      >
        {props.children ? props.children : 'Default'}
      </Button>
      <Button leftIcon={FiPlus} rightIcon={FiArrowRight} size='base' {...props}>
        {props.children ? props.children : 'Default'}
      </Button>
      <Button
        leftIcon={FiPlus}
        rightIcon={FiArrowRight}
        size='small'
        {...props}
      >
        {props.children ? props.children : 'Default'}
      </Button>
    </div>
  );
}

function ButtonSet(props: ButtonProps) {
  return (
    <div className='space-y-2.5'>
      <ButtonSizeSet {...props} />
      <ButtonSizeSet disabled {...props}>
        Disabled
      </ButtonSizeSet>
      <ButtonSizeSet isLoading {...props}>
        Loading
      </ButtonSizeSet>
    </div>
  );
}

function ButtonVariantSet() {
  return (
    <div className='space-y-10'>
      <div className='space-y-4'>
        <Typography variant='h3'>Primary</Typography>
        <ButtonSet variant='primary' />
      </div>
      <div className='space-y-4'>
        <Typography variant='h3'>Secondary</Typography>
        <ButtonSet variant='secondary' />
      </div>
      <div className='space-y-4'>
        <Typography variant='h3'>Ghost</Typography>
        <ButtonSet variant='ghost' />
      </div>
      <div className='space-y-4'>
        <Typography variant='h3'>Outline</Typography>
        <ButtonSet variant='outline' />
      </div>
      <div className='space-y-4'>
        <Typography variant='h3'>Danger</Typography>
        <ButtonSet variant='danger' />
      </div>
    </div>
  );
}

function IconButtonSizeSet(props: ButtonProps) {
  return (
    <div className='flex items-end gap-x-3'>
      <Button icon={FiPlus} size='large' {...props} />
      <Button icon={FiEye} size='base' {...props} />
      <Button icon={FiEdit2} size='small' {...props} />
      <Button icon={FiX} size='icon' {...props} />
    </div>
  );
}

function IconButtonSet(props: ButtonProps) {
  return (
    <div className='space-y-2.5'>
      <IconButtonSizeSet {...props} />
      <IconButtonSizeSet disabled {...props} />
      <IconButtonSizeSet isLoading {...props} />
    </div>
  );
}

function IconButtonVariantSet() {
  return (
    <div className='space-y-10'>
      <div className='space-y-4'>
        <Typography variant='h3'>Primary</Typography>
        <IconButtonSet variant='primary' />
      </div>
      <div className='space-y-4'>
        <Typography variant='h3'>Secondary</Typography>
        <IconButtonSet variant='secondary' />
      </div>
      <div className='space-y-4'>
        <Typography variant='h3'>Ghost</Typography>
        <IconButtonSet variant='ghost' />
      </div>
      <div className='space-y-4'>
        <Typography variant='h3'>Outline</Typography>
        <IconButtonSet variant='outline' />
      </div>
      <div className='space-y-4'>
        <Typography variant='h3'>Danger</Typography>
        <IconButtonSet variant='danger' />
      </div>
    </div>
  );
}
