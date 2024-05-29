import { SearchUser } from "@/model/user";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
    user: SearchUser;
}


export default function UserCard({ user: { firstname, lastname, username, image, following, followers } }: Props) {

    return (
        <Link
            className="flex items-center w-full rounded-sm border border-neutral-300 mb-2 p-3 bg-light-beige hover:bg-natrual-50 dark:bg-neutral-900"
            href={`/user/${username}`}>
            <Avatar image={image} />
            <div className="text-neutral-500 ml-3 dark:text-white">
                <p className="text-black font-bold leading-4 dark:text-white">{username}</p>
                <p>{firstname} {lastname}</p>
                <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
            </div>
        </Link>)
}