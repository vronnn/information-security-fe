import { TabsContent } from '@radix-ui/react-tabs';
import { useMutation } from '@tanstack/react-query';
import copy from 'copy-to-clipboard';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiCheck } from 'react-icons/fi';
import { RxCopy } from 'react-icons/rx';
import { TbRefresh } from 'react-icons/tb';

import Button from '@/components/buttons/Button';
import SearchableSelectInput from '@/components/form/SearchableSelectInput';
import Modal from '@/components/modal/Modal';
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';
import Typography from '@/components/typography/Typography';
import useMutationToast from '@/hooks/useMutationToast';
import api from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import { inter } from '@/lib/font';
import useAuthStore from '@/store/useAuthStore';

type ModalReturnType = {
  openModal: () => void;
};

type ModalPropsType = {
  public_key?: string;
  symmetric_key?: string;
  children: (props: ModalReturnType) => JSX.Element;
};

type ShareOptionPropsType = {
  public_key?: string;
  symmetric_key?: string;
  closeModal: () => void;
};

type GetKeyForm = {
  key: string;
};

type GetKeyResponse = {
  id: string;
  key: string;
};

const mockOptionsRaw: { name: string; key: string }[] = [
  { name: 'vron', key: '49023842' },
  { name: 'kilo', key: '98372645' },
  { name: 'quex', key: '57291038' },
  { name: 'zark', key: '18756432' },
  { name: 'flid', key: '65432098' },
  { name: 'blip', key: '34987651' },
];

const mockOptions: { value: string; label: string }[] = mockOptionsRaw.map(
  ({ name, key }) => ({ value: key, label: name }),
);

const ShareOptions = ({ public_key, closeModal }: ShareOptionPropsType) => {
  const refetch = useAuthStore.useRefetch();

  const [isPublicKeyCopied, setIsPublicKeyCopied] = React.useState(false);
  const methods = useForm<GetKeyForm>();
  const { handleSubmit, watch } = methods;
  const wuser = watch('key');
  const selectedUser = mockOptions.find(({ value }) => value === wuser)?.label;

  const { mutate: refreshKey, isLoading: refreshKeyIsLoading } = useMutation({
    mutationFn: () => {
      return api.post('/api/user/key');
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  const publicKey =
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores necessitatibus, sapiente dolorem quae nihil dolore commodi pariatur expedita tempore sed.';

  const symmetricKey =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem rem nemo accusantium vitae reiciendis repellat numquam esse autem quam et.';

  const handleRefresh = () => {
    refreshKey();
  };

  const handleCopyPublicKey = () => {
    copy(public_key ?? publicKey);
    setIsPublicKeyCopied(true);
    setTimeout(() => {
      setIsPublicKeyCopied(false);
    }, 3000);
  };

  const { isLoading: getKeyIsLoading } = useMutationToast<
    GetKeyResponse,
    GetKeyForm
  >(
    useMutation({
      mutationFn: () => {
        return api.post('/api/user/publicKey');
      },
    }),
  );
  const onSubmit = (data: GetKeyForm) => {
    // eslint-disable-next-line no-console
    console.log(data);
    // getKey(data);
  };

  return (
    <div>
      <Tabs defaultValue='public'>
        <TabsList className='w-full'>
          <TabsTrigger className='w-full' value='public'>
            Public
          </TabsTrigger>
          <TabsTrigger className='w-full' value='private'>
            Private
          </TabsTrigger>
        </TabsList>
        <TabsContent value='public'>
          <div className='relative pb-2.5 rounded-md border border-gray-300 mt-3.5 divide-y divide-gray-300'>
            <div className='flex items-center justify-between py-1 px-3.5'>
              <Typography variant='d' className='font-medium'>
                Symmetric key
              </Typography>
              <div className='flex items-center gap-1'>
                <Button
                  icon={TbRefresh}
                  type='button'
                  onClick={handleRefresh}
                  variant='outline'
                  size='small'
                  isLoading={refreshKeyIsLoading}
                />
              </div>
            </div>
            <Typography
              variant='d'
              className={clsxm(
                inter.className,
                'pt-2.5 px-3.5 text-gray-500 break-all',
              )}
            >
              {refreshKeyIsLoading
                ? '...'
                : symmetricKey
                ? symmetricKey
                : symmetricKey}
            </Typography>
          </div>
          <div className='relative pb-2.5 rounded-md border border-gray-300 mt-3.5 divide-y divide-gray-300'>
            <div className='flex items-center justify-between py-1 px-3.5'>
              <Typography variant='d' className='font-medium'>
                Encrypted symmetric key
              </Typography>
              <div className='flex items-center gap-1'>
                <Button
                  icon={isPublicKeyCopied ? FiCheck : RxCopy}
                  type='button'
                  onClick={handleCopyPublicKey}
                  variant='outline'
                  size='small'
                />
              </div>
            </div>
            <Typography
              variant='d'
              className={clsxm(inter.className, 'pt-2.5 px-3.5 text-gray-500')}
            >
              {refreshKeyIsLoading ? '...' : publicKey}
            </Typography>
          </div>
        </TabsContent>
        <TabsContent value='private' className='mt-3.5'>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <SearchableSelectInput
                id='key'
                label={null}
                placeholder='Pick a receiver'
                options={mockOptions}
                validation={{
                  required: 'user must be filled',
                }}
                menuHeight='8rem'
              />
              <div className='relative pb-2.5 rounded-md border border-gray-300 mt-3.5'>
                <Typography
                  variant='d'
                  className='font-medium px-3.5 py-2.5 border-b border-gray-300'
                >
                  {selectedUser ? selectedUser + "'s " : 'No one' + "'s "}
                  public key
                </Typography>
                <Typography
                  variant='d'
                  className={clsxm(
                    inter.className,
                    'pt-2.5 px-3.5',
                    !wuser && 'text-base-placeholder',
                  )}
                >
                  {getKeyIsLoading ? '...' : wuser ? wuser : 'No user selected'}
                </Typography>
              </div>
              <div className='relative pb-2.5 rounded-md border border-gray-300 mt-3.5 divide-y divide-gray-300'>
                <div className='flex items-center justify-between py-1 px-3.5'>
                  <Typography variant='d' className='font-medium'>
                    Symmetric key
                  </Typography>
                  <div className='flex items-center gap-1'>
                    <Button
                      icon={TbRefresh}
                      type='button'
                      onClick={handleRefresh}
                      variant='outline'
                      size='small'
                      isLoading={refreshKeyIsLoading}
                    />
                  </div>
                </div>
                <Typography
                  variant='d'
                  className={clsxm(
                    inter.className,
                    'pt-2.5 px-3.5 text-gray-500 break-all',
                  )}
                >
                  {refreshKeyIsLoading
                    ? '...'
                    : public_key
                    ? public_key
                    : publicKey}
                </Typography>
              </div>
              {/* <div className='relative pb-2.5 rounded-md border border-gray-300 mt-3.5'>
                <div className='flex items-center justify-between px-3.5 py-1 border-b border-gray-300'>
                  <Typography variant='d' className='font-medium'>
                    Encrypted symmetric key
                  </Typography>
                  <div className='flex items-center gap-1'>
                    <Button
                      icon={isSymmetricKeyCopied ? FiCheck : RxCopy}
                      type='button'
                      onClick={handleCopySymmetricKey}
                      variant='outline'
                      size='small'
                    />
                  </div>
                </div>
                <Typography
                  variant='d'
                  className={clsxm(
                    inter.className,
                    'pt-2.5 px-3.5 max-h-20 overflow-y-auto',
                    !encryptedKey?.data.data.key && 'text-base-placeholder',
                  )}
                >
                  {getKeyIsLoading
                    ? '...'
                    : encryptedKey?.data.data.key
                    ? encryptedKey?.data.data.key
                    : symmetricKey}
                </Typography>
              </div> */}
              <div className='flex items-center gap-2.5 mt-3.5'>
                <Button
                  className='w-full'
                  type='button'
                  variant='outline'
                  onClick={closeModal}
                >
                  Close
                </Button>
                <Button className='w-full' type='submit' variant='secondary'>
                  Submit
                </Button>
              </div>
            </form>
          </FormProvider>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default function ShareModal({
  public_key,
  symmetric_key,
  children,
}: ModalPropsType) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title='Share Options'>
        <Modal.Body>
          <ShareOptions
            closeModal={closeModal}
            public_key={public_key}
            symmetric_key={symmetric_key}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
