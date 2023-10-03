import { Disclosure, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { IconType } from 'react-icons';
import { BiBuildings } from 'react-icons/bi';
import { CgBowl } from 'react-icons/cg';
import { FaStethoscope, FaUserNurse } from 'react-icons/fa';
import { FiChevronDown, FiCornerDownRight } from 'react-icons/fi';
import { GiMedicines } from 'react-icons/gi';
import {
  MdAccessible,
  MdOutlineMedicalServices,
  MdPostAdd,
} from 'react-icons/md';
import { RiServiceLine } from 'react-icons/ri';
import { TbCreditCard, TbDiscount } from 'react-icons/tb';

import UnstyledLink from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';

export type Navigation = {
  name: string;
  href: string;
  icon: IconType;
  /**
   * Use this when the route is also used as a nested route
   * @example Use exactMatch for '/dashboard' to avoid both navigation links active when visiting '/dashboard/edit'
   */
  exactMatch?: boolean;
  children?: Navigation[];
};

type Navigations = Navigation[][];

type NavigationProps = React.ComponentPropsWithoutRef<'nav'>;

const navigations: Navigations = [
  [
    {
      name: 'Resep Dokter',
      href: '/apotek/resep-dokter',
      icon: CgBowl,
    },
    {
      name: 'Obat',
      href: '/apotek/obat',
      icon: GiMedicines,
      children: [
        {
          name: 'Master Obat',
          href: '/apotek/obat',
          exactMatch: true,
          icon: FiCornerDownRight,
        },
        {
          name: 'Dead Stock',
          href: '/apotek/obat/obat-expired',
          icon: FiCornerDownRight,
        },
        {
          name: 'Near Dead Stock',
          href: '/apotek/obat/obat-near-expired',
          icon: FiCornerDownRight,
        },
      ],
    },
    {
      name: 'Permintaan Obat',
      href: '#',
      icon: MdPostAdd,
      children: [
        {
          name: 'Pre Order',
          href: '/apotek/pre-order',
          icon: FiCornerDownRight,
        },
        {
          name: 'Stock In',
          href: '/apotek/stock-in',
          icon: FiCornerDownRight,
        },
      ],
    },
    {
      name: 'Vendor',
      href: '#',
      icon: BiBuildings,
      children: [
        {
          name: 'List Vendor',
          href: '/apotek/vendor',
          icon: FiCornerDownRight,
        },
      ],
    },
    {
      name: 'Diskon',
      href: '/apotek/diskon',
      icon: TbDiscount,
    },
  ],
  [
    {
      name: 'Sesi Berobat',
      href: '/klinik/sesi-berobat',
      icon: MdOutlineMedicalServices,
    },
    {
      name: 'Pasien',
      href: '/klinik/pasien',
      icon: MdAccessible,
    },
  ],
  [
    {
      name: 'Perawat',
      href: '/perawat',
      icon: FaUserNurse,
    },
  ],
  [
    {
      name: 'Dokter',
      href: '/dokter',
      icon: FaStethoscope,
    },
  ],
  [
    {
      name: 'POS',
      href: '/pos',
      icon: TbCreditCard,
    },
  ],
  [
    {
      name: 'Layanan',
      href: '/klinik/layanan',
      icon: RiServiceLine,
    },
  ],
];

export default function Navigation({ className, ...rest }: NavigationProps) {
  return (
    <nav className={clsxm('px-2 md:px-3', className)} {...rest}>
      <div className='space-y-1.5'>
        {navigations.map((navs) =>
          navs.map((nav) => {
            return nav.children ? (
              <NestedNavigation key={nav.name} navigation={nav} />
            ) : (
              <NavigationLink key={nav.name} navigation={nav} />
            );
          }),
        )}
      </div>
    </nav>
  );
}

function NestedNavigation({
  navigation: navChildren,
}: {
  navigation: Navigation;
}) {
  const router = useRouter();
  // Recursively check if any children is active
  function checkActive(nav?: Navigation[]): boolean {
    if (!nav) return false;

    const currentRoute: string = router.pathname;

    return nav.some((n) => {
      if (!n.children) {
        const isActive = n.exactMatch
          ? currentRoute === n.href
          : currentRoute.startsWith(n.href);

        return isActive;
      }

      return checkActive(n.children);
    });
  }
  return (
    <Disclosure as='div' defaultOpen={checkActive(navChildren.children)}>
      {({ open }) => (
        <div>
          <Disclosure.Button
            className={clsx(
              'hover:bg-blue-500 hover:text-white',
              'text-typo-primary',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500  focus-visible:ring-offset-blue-500',
              'transition duration-100',
            )}
          >
            <navChildren.icon
              className={clsx(
                'mr-1.5 flex-shrink-0',
                'text-lg text-base-dark group-hover:text-white',
                open && 'mt-[1px] self-start',
              )}
              aria-hidden='true'
            />
            <span className={clsx('text-left', !open && 'truncate')}>
              {navChildren.name}
            </span>
            <FiChevronDown
              className={clsx(
                'flex-shrink-0 transition-transform duration-150',
                'ml-auto text-lg text-typo-icons group-hover:text-white',
                open && 'mt-[1px] rotate-180 self-start',
              )}
            />
          </Disclosure.Button>
          <Transition
            className='transition-all duration-300'
            enterFrom='opacity-0 max-h-0'
            enterTo='opacity-100 max-h-96'
            leaveFrom='opacity-100 max-h-96'
            leaveTo='opacity-0 max-h-0'
          >
            <Disclosure.Panel className='ml-5 mt-0.5'>
              {navChildren.children?.map((nav) =>
                nav.children ? (
                  <NestedNavigation key={nav.name} navigation={nav} />
                ) : (
                  <NavigationLink key={nav.name} navigation={nav} />
                ),
              )}
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
}

function NavigationLink({
  navigation,
  className,
}: {
  navigation: Navigation;
  className?: string;
}) {
  const router = useRouter();
  let currentRoute: string = router.pathname;
  if (currentRoute.startsWith('/[medic]')) {
    currentRoute = '/' + router.query.medic?.toString() || '';
  }

  const isActive = navigation.exactMatch
    ? currentRoute === navigation.href
    : currentRoute.startsWith(navigation.href);

  return (
    <UnstyledLink
      href={navigation.href}
      className={clsxm(
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-base-dark hover:bg-blue-500 hover:text-white',
        'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500  focus-visible:ring-offset-blue-500',
        'transition duration-100',
        className,
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <navigation.icon
        className={clsx(
          'mr-1.5 flex-shrink-0',
          'text-lg group-hover:text-white',
          isActive ? 'text-white' : 'text-typo-secondary',
        )}
        aria-hidden='true'
      />
      <span className='truncate'>{navigation.name}</span>
    </UnstyledLink>
  );
}
