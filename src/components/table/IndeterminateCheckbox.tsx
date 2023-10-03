import * as React from 'react';

type Props = {
  indeterminate?: boolean;
} & React.HTMLProps<HTMLInputElement>;

function IndeterminateCheckbox({ indeterminate, ...rest }: Props) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <div className='relative leading-[0]'>
      <input
        ref={ref}
        type='checkbox'
        className='w-4 h-4 shrink-0 cursor-pointer shadow-sm peer appearance-none ring-1 ring-base-icon rounded accent-blue-600 checked:bg-blue-600 checked:ring-blue-600 hover:checked:ring-blue-700 hover:checked:!bg-blue-700 checked:focus:bg-blue-600 checked:active:bg-blue-700 focus:outline-2 outline-blue-300 indeterminate:bg-white hover:indeterminate:bg-base-bluegray indeterminate:ring-2 indeterminate:ring-blue-600 hover:indeterminate:ring-blue-700'
        {...rest}
      />
      <svg
        className='absolute top-1/2 -translate-y-[46%] left-1/2 -translate-x-1/2 w-3.5 h-3.5 hidden peer-checked:block peer-indeterminate:block pointer-events-none'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke={indeterminate ? '#2563eb' : '#fff'}
        strokeWidth='3.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        {indeterminate ? (
          <line x1='4' y1='46%' x2='20' y2='46%'></line>
        ) : (
          <polyline points='20 6 9 17 4 12'></polyline>
        )}
      </svg>
    </div>
  );
}

export default IndeterminateCheckbox;
