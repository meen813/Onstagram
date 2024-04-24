import { getUserForProfile } from "@/service/user";
import { notFound } from "next/navigation";
import UserProfile from "../../../../components/UserProfile";

type Props = {params: {username: string}};

export default async function UserPage({params: {username}}: Props) {
    //top: user's profile image and information(username, name etc)
    const user = await getUserForProfile(username);

    if(!user){
        notFound();
    }


    //bottom: posts, liked, bookmarks

    return <UserProfile user={user}/>
}