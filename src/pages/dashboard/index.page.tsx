import React from 'react';

import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout';
import Seo from '@/components/Seo';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Seo title='Dashboard' />
    </DashboardLayout>
  );
}
