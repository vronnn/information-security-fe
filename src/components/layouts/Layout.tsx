import * as React from 'react';

import BaseDialog from '@/components/dialog/BaseDialog';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import clsxm from '@/lib/clsxm';
import useDialogStore from '@/store/useDialogStore';

type LayoutProps = {
  children: React.ReactNode;
  withNavbar?: boolean;
  withFooter?: boolean;
} & React.ComponentPropsWithRef<'div'>;

export default function Layout({
  children,
  withNavbar,
  withFooter,
  className,
}: LayoutProps) {
  const open = useDialogStore.useOpen();
  const state = useDialogStore.useState();
  const handleClose = useDialogStore.useHandleClose();
  const handleSubmit = useDialogStore.useHandleSubmit();

  //#region //*============ Sidebar =========
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  //#endregion //*========= Sidebar =========
  return (
    <div className={clsxm('overflow-x-hidden', className)}>
      {withNavbar && (
        <Navbar
          isSidebarOpen={isSidebarOpen}
          openSidebar={openSidebar}
          closeSidebar={closeSidebar}
        />
      )}
      {children}
      <BaseDialog
        open={open}
        options={state}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
      {withFooter && <Footer />}
    </div>
  );
}
