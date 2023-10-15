import React from 'react';

import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Seo title='Dashboard' />
      <div className='px-8'>
        <Typography as='h1' variant='h1' className='font-medium'>
          Documents
        </Typography>
      </div>
    </DashboardLayout>
  );
}
