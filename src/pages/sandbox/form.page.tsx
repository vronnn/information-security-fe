import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FiChevronLeft, FiSave, FiX } from 'react-icons/fi';
import { HiOutlineSearch } from 'react-icons/hi';
import { LuUndo } from 'react-icons/lu';

import Button from '@/components/buttons/Button';
import Checkbox from '@/components/form/Checkbox';
import DatePicker from '@/components/form/DatePicker';
import DropzoneInput from '@/components/form/Dropzone';
import Input from '@/components/form/Input';
import Radio from '@/components/form/Radio';
import SearchableSelectInput from '@/components/form/SearchableSelectInput';
import TextArea from '@/components/form/TextArea';
import Layout from '@/components/layouts/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';
import { REGEX } from '@/constant/regex';
import { formatDateForAPI } from '@/lib/date';
import useDialogStore from '@/store/useDialogStore';
import { FileWithPreview } from '@/types/dropzone';

type ExampleForm = {
  email: string;
  password: string;
  link: string;
  phone: string;
  price: number;
  search: string;
  birth_date: string;
  gender: string;
  fruit: string[];
  photo: FileWithPreview[];
  checkboxshowcase: string[];
  radioshowcase: string[];
  checkboxlabel: string[];
  radiolabel: string[];
  address: string;
};

const GenderOptions: { value: string; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-Binary' },
];

const FruitOptions: { value: string; label: string }[] = [
  { value: 'banana', label: 'Banana' },
  { value: 'apple', label: 'Apple' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'passionFruit', label: 'Ripe Passion Fruit' },
  { value: 'manggo', label: 'Manggo' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'pomegranate', label: 'Pomegranate' },
];

export default function FormPage() {
  const dialog = useDialogStore.useDialog();
  const methods = useForm<ExampleForm>({
    mode: 'onTouched',
  });
  const { handleSubmit, setValue, reset } = methods;
  const onSubmit: SubmitHandler<ExampleForm> = (data) => {
    data.phone = '+62' + data.phone;
    data.link = 'https://' + data.link;
    data.birth_date = formatDateForAPI(new Date(data.birth_date));
    dialog({
      title: <>Submitting Form</>,
      description: 'Are you sure you want to submit this form?',
      variant: 'success',
      submitText: 'yes',
      listenForLoadingToast: true,
      // eslint-disable-next-line no-console
    }).then(() => console.log(data));
  };

  return (
    <Layout>
      <Seo title='Form' />
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
          <Typography variant='h2' className='text-lg'>
            Form Input
          </Typography>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='max-w-sm space-y-3'
            >
              <Input
                id='email'
                type='email'
                label='Email'
                placeholder='Enter your email'
                validation={{
                  required: 'Email must be filled',
                  pattern: {
                    value: REGEX.EMAIL,
                    message: 'Email is not valid',
                  },
                }}
              />
              <Input
                id='password'
                type='password'
                label='Password'
                placeholder='Enter your password'
                validation={{
                  required: 'Password must be filled',
                  minLength: {
                    value: 4,
                    message: 'Minimum password length is 4 characters',
                  },
                }}
                autoComplete='on' // for handling password verbose
              />
              <Input
                id='phone'
                type='text'
                label='Phone Number'
                placeholder='810900396'
                leftIcon='+62'
                inputWithLeftIconClassName='pl-[3.25rem]'
                validation={{
                  required: 'Phone number must be filled',
                  pattern: {
                    value: REGEX.PHONE,
                    message: 'Phone number is not valid',
                  },
                }}
                helperText='Enter the number without 0 or +62'
              />
              <Input
                id='price'
                type='number'
                label='Price'
                placeholder='Enter your price'
                leftIcon='Rp.'
                inputWithLeftIconClassName='pl-11'
                validation={{
                  required: 'Price must be filled',
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: 'The minimum price is 0',
                  },
                }}
              />
              <Input
                id='link'
                type='text'
                label='Link'
                placeholder='example.com'
                addon='https://'
                validation={{
                  required: 'Link must be filled',
                  pattern: {
                    value: REGEX.URL,
                    message: 'Link url is not valid',
                  },
                }}
              />
              <Input
                id='search'
                type='search'
                label='Search'
                placeholder='Find something here'
                leftIcon={HiOutlineSearch}
                rightNode={
                  <Button
                    size='icon'
                    variant='ghost'
                    icon={FiX}
                    onClick={() => setValue('search', '')}
                    iconClassName='text-base text-base-icon group-hover:text-base-secondary'
                  />
                }
              />
              <DatePicker
                id='birth_date'
                label='Birth Date'
                placeholder='dd-mm-yyyy'
                format='dd-MM-yyyy'
                validation={{
                  required: 'Birth date must be filled',
                  valueAsDate: true,
                }}
              />
              <SearchableSelectInput
                id='gender'
                label='Gender'
                placeholder='Pick your gender'
                options={GenderOptions}
                validation={{
                  required: 'Gender must be filled',
                }}
              />
              <DropzoneInput
                id='photo'
                label='Photo'
                maxFiles={2}
                validation={{ required: 'Photo must be filled' }}
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                helperText='Please upload files with .png, .jpg, or .jpeg extension.'
              />
              <SearchableSelectInput
                id='fruit'
                label='Favorite Fruit'
                placeholder='Select your favorite fruits'
                options={FruitOptions}
                isMulti
              />
              <div className='grid grid-cols-2 gap-6 items-start min-h-[135px] !my-5'>
                <div className='space-y-4'>
                  <Typography variant='s3' className='text-base-black'>
                    Checkbox
                  </Typography>
                  <div className='flex items-center gap-3'>
                    <Checkbox
                      name='checkboxshowcase'
                      label={null}
                      value='disabled'
                      disabled
                      hideError
                    />
                    <Checkbox
                      name='checkboxshowcase'
                      label={null}
                      value='unchecked'
                      hideError
                    />
                    <Checkbox
                      name='checkboxshowcase'
                      label={null}
                      value='checked'
                      checked
                      hideError
                    />
                    <Checkbox
                      name='checkboxshowcase'
                      label={null}
                      value='checked-disabled'
                      checked
                      disabled
                      hideError
                    />
                    <Checkbox
                      name='checkboxshowcase'
                      label={null}
                      value='error'
                      hideError
                      checked={false}
                      errorExample
                    />
                  </div>
                  <div className='space-y-2'>
                    <Checkbox
                      name='checkboxlabel'
                      label='Label'
                      value='small'
                      size='small'
                      hideError
                    />
                    <Checkbox
                      name='checkboxlabel'
                      label='Label'
                      value='base'
                      hideError
                    />
                    <Checkbox
                      name='checkboxlabel'
                      label='Label'
                      value='large'
                      size='large'
                      validation={{ required: 'Checkbox must be checked' }}
                    />
                  </div>
                </div>
                <div className='space-y-4'>
                  <Typography variant='s3' className='text-base-black'>
                    Radio Button
                  </Typography>
                  <div className='flex items-center gap-3'>
                    <Radio
                      name='radioshowcase'
                      label={null}
                      value='disabled'
                      disabled
                      hideError
                    />
                    <Radio
                      name='radioshowcase'
                      label={null}
                      value='unchecked'
                      hideError
                    />
                    <Radio
                      name='radioshowcase'
                      label={null}
                      value='checked'
                      checked
                      hideError
                    />
                    <Radio
                      name='radioshowcase-disabled'
                      label={null}
                      value='checked-disabled'
                      checked
                      disabled
                      hideError
                    />
                    <Radio
                      name='radioshowcase'
                      label={null}
                      value='error'
                      hideError
                      checked={false}
                      errorExample
                    />
                  </div>
                  <div className='space-y-2'>
                    <Radio
                      name='radiolabel'
                      label='Label'
                      value='small'
                      size='small'
                      hideError
                    />
                    <Radio
                      name='radiolabel'
                      label='Label'
                      value='base'
                      size='base'
                      hideError
                    />
                    <Radio
                      name='radiolabel'
                      label='Label'
                      value='large'
                      size='large'
                      validation={{ required: 'Radio must be picked' }}
                    />
                  </div>
                </div>
              </div>
              <TextArea
                id='address'
                label='Address'
                placeholder='Enter your address here...'
                validation={{ required: 'Address must be filled' }}
              />
              <div className='flex items-center gap-2.5'>
                <Button
                  onClick={() => reset()}
                  variant='outline'
                  leftIcon={LuUndo}
                >
                  Reset
                </Button>
                <Button type='submit' rightIcon={FiSave}>
                  Submit
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </main>
    </Layout>
  );
}
