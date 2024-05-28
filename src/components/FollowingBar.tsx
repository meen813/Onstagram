'use client';
import { BeatLoader } from 'react-spinners'
import Link from 'next/link';
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';
import useMe from '@/hooks/me';

export default function Followingbar() {
    const { user, isLoading: loading, error } = useMe();
    const users = user?.following;
    return (
        <div className='w-full flex justify-center item-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0 dark:bg-neutral-900'>
            {loading ? (<BeatLoader size={8} color="#36d7b7" />
            ) : (
                (!users || users.length === 0) && <p>{`You Do Not Have Any Followings`}</p>
            )}
            {users && users.length > 0 && (
                
                    <ScrollableBar>
                        {users.map(({ image, username }) =>
                                <Link 
                                    key={username}
                                    className='flex flex-col items-center w-20'
                                    href={`/user/${username}`}>
                                    <Avatar image={image} highlight />
                                    <p className='w-full text-sm text-center text-ellipsis overflow-hidden'>
                                        {username}
                                    </p>
                                </Link>
                            )}
                    </ScrollableBar>
                
            )}
        </div>
    );
}