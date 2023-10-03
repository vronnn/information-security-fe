import { toast } from 'react-hot-toast';
import { FiChevronLeft } from 'react-icons/fi';
import { RiErrorWarningLine } from 'react-icons/ri';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layouts/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default function ToastPage() {
  return (
    <Layout>
      <Seo title='Toast' />
      <main className='layout min-h-screen pt-10'>
        <div className='space-y-4'>
          <ButtonLink
            size='small'
            variant='outline'
            href='/sandbox'
            leftIcon={FiChevronLeft}
          >
            Back
          </ButtonLink>
          <Typography variant='h1' className='text-xl'>
            Toast
          </Typography>
          <div className='flex flex-wrap gap-2'>
            <Button
              onClick={() =>
                toast('hello', { icon: <RiErrorWarningLine size={22} /> })
              }
            >
              Default
            </Button>
            <Button onClick={() => toast.success('success')}>Success</Button>
            <Button onClick={() => toast.error('something went wrong')}>
              Danger
            </Button>
            <Button
              onClick={() => toast.loading('loading...', { duration: 3000 })}
            >
              Loading
            </Button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
