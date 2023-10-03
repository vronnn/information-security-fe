import { FiChevronLeft } from 'react-icons/fi';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layouts/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import ExampleModal from '@/components/modal/ExampleModal';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default function ModalPage() {
  return (
    <Layout>
      <Seo title='Modal' />
      <main className='layout min-h-screen py-10'>
        <div className='space-y-4'>
          <ButtonLink
            size='small'
            variant='outline'
            href='/sandbox'
            leftIcon={FiChevronLeft}
          >
            Back
          </ButtonLink>
          <Typography variant='d' className='font-medium mb-4'>
            Click to open the modal
          </Typography>
          <ExampleModal>
            {({ openModal }) => <Button onClick={openModal}>Open Modal</Button>}
          </ExampleModal>
        </div>
      </main>
    </Layout>
  );
}
