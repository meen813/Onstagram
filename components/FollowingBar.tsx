'use client';

import { DetailUser } from '@/model/user';
import useSWR from 'swr';
import { BeatLoader } from 'react-spinners'
import Link from 'next/link';
import Avatar from './Avatar';

export default function Followingbar() {
    const { data, isLoading: loading, error } = useSWR<DetailUser>('/api/me')
    const users = data?.following;
    console.log(data?.following);
    //plans
    //1. get the user info from client compenets by making a request to the back-end
    //2. With session info of a current logged-in user,
    //3. get the user's info(following) information from Sanity.
    //4. here, client componet, show the info(username and image) of followings. 
    return (
        <div>
            {loading ? (<BeatLoader size={8} color="#36d7b7" />
            ) : (
                (!users || users.length === 0) && <p>{`You Do Not Have Any Followings`}</p>
            )}
            {users && users.length > 0 && (
                <ul>
                    {users.map(({image, username}) =>
                        <li key={username}>
                            <Link href={`/user/${username}`}>
                                <Avatar image={image} highlight />
                                <p>{username}</p>
                            </Link>
                        </li>)}
                </ul>
                )}
        </div>
    );
}