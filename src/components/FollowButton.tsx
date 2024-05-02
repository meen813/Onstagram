'use client';
import useMe from "@/hooks/me";
import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";

type Props = {
    user: ProfileUser;
}

export default function FollowButton({user}: Props) {
    const {username} = user;
    const {user: loggedInUser} = useMe();

    const showButton = loggedInUser && loggedInUser.username !== username;
    const following = loggedInUser && loggedInUser.following.find((item) => item.username === username)

    const followingText = following ? "Unfollow" : "Follow";
    return<>
        {showButton && <Button text={followingText} onClick={()=>{}} red={followingText === 'Unfollow'}/>}
    </>;
}