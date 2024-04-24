'use client'

import { SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from 'next/image';
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import { useSession } from "next-auth/react";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";


type Props = {
    post: SimplePost;
};

export default function PostListCard({ post }: Props) {
    const { username, userImage, image, createdAt, likes, text } = post;
    const [openModal, setOpenModal] = useState(false);

    const { data: session } = useSession();
    const user = session?.user;
    return <>
        <article className="rounded-lg shadow-md border border-gray-300">
            <PostUserAvatar image={userImage} username={username} />
            <Image
                className="w-full object-cover aspect-square"
                src={image}
                alt={`photo by ${username}`}
                width={500}
                height={500}
                onClick={() => setOpenModal(true)}
            />
            <ActionBar likes={likes} username={username} createdAt={createdAt} text={text} />
            <CommentForm authorUsername={username} />
            {openModal && (<ModalPortal>
                <PostModal onClose={() => setOpenModal(false)}>
                    <div>
                        <PostDetail post={post} />
                    </div>
                </PostModal>
            </ModalPortal>
            )}
        </article>
    </>
}