import { UserSearchResult } from "@/model/user";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
    user: UserSearchResult;
}


export default function UserCard({ user: { firstname, lastname, username, image, following, followers } }: Props) {

    return (
        <Link
            className="flex items-center w-full rounded-sm border border-neutral-300 mb-2 p-3 bg-white hover:bg-natrual-50"
            href={`/user/${username}`}>
            <Avatar image={image} />
            <div className="text-neutral-500">
                <p className="text-black font-bold leading-4">{username}</p>
                <p>{firstname} {lastname}</p>
                <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
            </div>
        </Link>)
}