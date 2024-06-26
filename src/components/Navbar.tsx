'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import ColorButton from "./ui/ColorButton";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import HomeIcon from "./ui/icons/HomeIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
];

export default function Navbar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className='flex flex-col sm:flex-row justify-between items-center px-6 bg-light-beige dark:bg-neutral-900 border-b dark:border-neutral-700'>
      <Link href='/'>
        <h1 className='text-3xl font-bold text-black dark:text-white'>Onstagram</h1>
      </Link>
      <nav className="w-full sm:w-auto">
        <ul className='flex gap-4 items-center md:p-4 sm:p-1 justify-between'>
          {menu.map((item) => (
            <li key={item.href} className="transition duration-300 ease-in-out transform hover:-translate-y-0.5">
              <Link href={item.href}>
                {pathName === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size='small' highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text='Sign Out' onClick={() => { signOut() }} />)
              : (
                <ColorButton text='Sign In' onClick={() => { signIn() }} />)
            }
          </li>
        </ul>
      </nav>
    </div>
  );
}
