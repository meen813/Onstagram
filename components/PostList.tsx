'use client';

import { SimplePost } from "@/model/post";
import useSWR from "swr";
import post from "../sanity-studio/schemas/post";

export default function PostList() {
    //since we are actually trying to load an array of posts, the generic type should be SimplePost[].
    const { data: posts, isLoading: loading, error } = useSWR<SimplePost[]>('/api/posts')
    console.log(posts);

    return <ul>
        {posts && posts.map(post => 
            <li key={post.id}> {post.text}</li>)}
    </ul>
}