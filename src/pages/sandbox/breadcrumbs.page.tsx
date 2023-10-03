import * as React from 'react';

import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs';
import Layout from '@/components/layouts/Layout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default function BreadcrumbsPage() {
  return (
    <Layout>
      <Seo title='Breadcrumbs' />
      <main className='layout min-h-screen py-10'>
        <div className='space-y-6'>
          <Typography variant='h2'>Breadcrumbs</Typography>
          <div className='space-y-2'>
            <Typography variant='s3'>Default routing</Typography>
            <Breadcrumbs />
            <Breadcrumbs withCurrentPathRouting />
          </div>
          <div className='space-y-2'>
            <Typography variant='s3'>Listed routing</Typography>
            <Breadcrumbs
              currentPath={{ label: 'Table', href: '/sandbox/table' }}
              listItem={[{ label: 'Sandbox', href: '/sandbox' }]}
            />
            <Breadcrumbs
              currentPath={{ label: 'Table', href: '/sandbox/table' }}
              withCurrentPathRouting
              listItem={[{ label: 'Sandbox', href: '/sandbox' }]}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
