import { getUserForProfile } from "@/service/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { UserPosts } from "../../../../components/UserPosts";
import UserProfile from "../../../../components/UserProfile";

type Props = { params: { username: string } };

//using cache
const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({ params: { username } }: Props) {
    //top: shows user's profile image and information(username, name etc)
    const user = await getUser(username);

    if (!user) {
        notFound();
    }


    //bottom: shows posts, liked, and bookmarks

    return (
        <section className="w-full">
            <UserProfile user={user}/> 
            <UserPosts user={user}/>
        </section>
    );
}

export async function generateMetadata({ params: { username } }: Props): Promise<Metadata> {
    const user = await getUser(username);
    return {
        title: `${user?.firstname} ${user?.lastname} (@${user?.username}) - Onstagram Photos`,
        description: `${user?.firstname} ${user?.lastname}'s all posts`,
    }
}