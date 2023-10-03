import { FiChevronRight } from 'react-icons/fi';
import { MdWbTwilight } from 'react-icons/md';

import Layout from '@/components/layouts/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo title='Not Found' />
      <main>
        <section className='text-base-black'>
          <div className='flex min-h-screen w-full flex-col items-center justify-center gap-y-2'>
            <MdWbTwilight
              size={70}
              className='drop-shadow-glow animate-pulse text-red-500'
            />
            <Typography variant='j2' className='text-3xl'>
              Page Not Found
            </Typography>
            <div className='group mt-1'>
              <div className='flex items-center'>
                <UnstyledLink href='/'>
                  <Typography variant='s2'>Back to home</Typography>
                </UnstyledLink>
                <FiChevronRight size={18} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
