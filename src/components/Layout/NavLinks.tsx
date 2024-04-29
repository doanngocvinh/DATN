'use client';
import {
  Square3Stack3DIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { RectangleGroupIcon } from '@heroicons/react/24/outline';
const links = [
  { name: 'Home', href: '/', icon: Squares2X2Icon },
  {
    name: 'Templates',
    href: '/templates',
    icon: RectangleGroupIcon,
  },
  { name: 'Kit', href: '/kit', icon: Square3Stack3DIcon },
  { name: 'Trash', href: '/trash', icon: TrashIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium hover:bg-gray-200 hover:text-black-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-100 text-black': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}


