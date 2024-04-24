import { getUserForProfile } from "@/service/user";
import { notFound } from "next/navigation";
import { UserPosts } from "../../../../components/UserPosts";
import UserProfile from "../../../../components/UserProfile";

type Props = { params: { username: string } };

export default async function UserPage({ params: { username } }: Props) {
    //top: shows user's profile image and information(username, name etc)
    const user = await getUserForProfile(username);

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