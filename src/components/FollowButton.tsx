'use client';
import useMe from "@/hooks/me";
import { ProfileUser } from "@/model/user";
import { useRouter } from "next/navigation";

import { useState, useTransition } from "react";
import Button from "./ui/Button";

type Props = {
  user: ProfileUser;
}

export default function FollowButton({ user }: Props) { //this 'user' is the target user I want to follow
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe(); //this is you

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following = loggedInUser && loggedInUser.following.find((item) => item.username === username)

  const followingText = following ? "Unfollow" : "Follow";

  const hanldeFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !following);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  }
  return (
    <>
      {showButton && (
        <div>
          {isUpdating && <p>Now Loading...</p>}
          <Button
            text={followingText}
            onClick={hanldeFollow}
            red={followingText === 'Unfollow'} />
        </div>
      )}
    </>
  )
}