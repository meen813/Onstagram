'use client';

import { SimplePost } from "@/model/post";
import { HashLoader } from "react-spinners";
import useSWR from "swr";
import post from "../sanity-studio/schemas/post";
import PostListCard from "./postListCard";

export default function PostList() {
    //since we are actually trying to load an array of posts, the generic type should be SimplePost[].
    const { data: posts, isLoading: loading, error } = useSWR<SimplePost[]>('/api/posts')
    console.log(posts);

    return (
        <section>
            {loading && (
                <div>
                    <HashLoader color="#36d7b7" />
                </div>
            )}
            {posts && (
                <ul>
                    {posts && posts.map(post =>
                        <li key={post.id}>
                            <PostListCard post={post} />
                        </li>)}
                </ul>
            )

            }
        </section>
    )
}


