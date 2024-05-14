'use client';
import useMe from "@/hooks/me";
import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";

type Props = {
    user: ProfileUser;
}

export default function FollowButton({user}: Props) { //this 'user' is the target user I want to follow
    const {username} = user;
    const {user: loggedInUser, toggleFollow} = useMe(); //this is you

    const showButton = loggedInUser && loggedInUser.username !== username;
    const following = loggedInUser && loggedInUser.following.find((item) => item.username === username)

    const followingText = following ? "Unfollow" : "Follow";

    const hanldeFollow = () => {
        toggleFollow(user.id, !following);
    }
    return<>
        {showButton && <Button text={followingText} onClick={hanldeFollow} red={followingText === 'Unfollow'}/>}
    </>;
}