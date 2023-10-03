/* eslint-disable no-console */
import { FiChevronLeft } from 'react-icons/fi';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layouts/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import TextLink from '@/components/links/TextLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';
import useDialogStore from '@/store/useDialogStore';

export default function DialogPage() {
  const dialog = useDialogStore.useDialog();

  const openSuccess = () => {
    dialog({
      title: 'Success Title',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      submitText: 'Yes',
      variant: 'success',
      catchOnCancel: true,
    })
      .then(() => console.log('success'))
      .catch(() => console.log('error'));
  };
  const openWarning = () => {
    dialog({
      title: 'Warning Title',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      submitText: 'Maybe',
      variant: 'warning',
      catchOnCancel: true,
    })
      .then(() => console.log('warning'))
      .catch(() => console.log('error'));
  };
  const openDanger = () => {
    dialog({
      title: 'Danger Title',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      submitText: 'No',
      variant: 'danger',
      catchOnCancel: true,
    })
      .then(() => console.log('danger'))
      .catch(() => console.log('error'));
  };

  return (
    <Layout>
      <Seo title='Dialog' />
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
          <Typography variant='d' className='font-medium mb-4'>
            Click to open the dialog
          </Typography>
          <div className='flex flex-col items-start space-y-3'>
            <Button onClick={openSuccess}>Success Alert</Button>
            <Button onClick={openWarning}>Warning Alert</Button>
            <Button onClick={openDanger}>Danger Alert</Button>
          </div>
          <Typography variant='d' className='font-medium'>
            See the implementation example in the{' '}
            <TextLink size='small' href='/sandbox/form'>
              form page
            </TextLink>
          </Typography>
        </div>
      </main>
    </Layout>
  );
}
