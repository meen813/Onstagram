import { SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from 'next/image';
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import SmileIcon from "./ui/icons/SmileIcons";
import { useSession } from "next-auth/react";


type Props = {
    post: SimplePost;
};

export default function PostListCard({ post }: Props) {
    const { username, userImage, image, createdAt, likes, text } = post;

    const { data: session } = useSession();
    const user = session?.user;
    return <>
        <article className="rounded-lg shadow-md border border-gray-300">
            <div className="flex items-center p-2">
                <Avatar image={userImage} highlight size="small" />
                <span className="text-gray-900 font-bold ml-2">{username}</span>
            </div>
            <Image
                className="w-full object-cover aspect-square"
                src={image}
                alt={`photo by ${username}`}
                width={500}
                height={500}
            />
            <div className="flex justify-between my-2 px-4">
                <HeartIcon />
                <BookmarkIcon />
            </div>
            <div className="px-4 py-1">
                <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
                <p>
                    <span className="font-bold mr-1">{username}</span>
                    {text}
                </p>
                <p className="text-xs text-neutral-500 uppercase my-2">{parseDate(createdAt)}</p>
                <form className="flex items-center border-t border-neutral-300">
                    <Avatar image={user?.image} size="small" />
                    <input
                        className="w-full ml-2 border-none outline-none p-3"
                        type="text"
                        placeholder={`Add a comment for ${username}`}
                    />
                    <button className="font-bold text-blue-300">
                        Post
                    </button>
                </form>
            </div>
        </article>
    </>
}