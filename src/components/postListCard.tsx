'use client'

import { SimplePost, Comment } from "@/model/post";
import Image from 'next/image';
import ActionBar from "./ActionBar";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";
import usePosts from "@/hooks/posts";


type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post }: Props) {
  const { username, userImage, image, comments, text } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();
  const handlePostComment = (comment: Comment) => {
    postComment(post, comment)
  };
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
      <ActionBar post={post} onComment={handlePostComment}>
        <p>
          <span className="font-bold mr-1">{username}</span>
          {text}
        </p>
        {comments > 1 && <button
          className=" my-2 text-neutral-600"
          onClick={() => setOpenModal(true)}>{`view all ${comments} comments`}</button>}
      </ActionBar>
      
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