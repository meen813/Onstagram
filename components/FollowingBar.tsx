'use client';

import { DetailUser } from '@/model/user';
import useSWR from 'swr';
import { BeatLoader } from 'react-spinners'
import Link from 'next/link';
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';

export default function Followingbar() {
    const { data, isLoading: loading, error } = useSWR<DetailUser>('/api/me')
    const users = data?.following && [...data?.following, ...data?.following, ...data?.following]
    // console.log(data?.following);
    //plans
    //1. get the user(api/me) info from client components by making a request to the back-end
    //2. With session info of a current logged-in user, (back-end)
    //3. get the user's info(following) information from Sanity. (back-end)
    //4. here,(on this page) client componet, show the info(username and image) of followings. 
    return (
        <div className='w-full flex justify-center item-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0'>
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