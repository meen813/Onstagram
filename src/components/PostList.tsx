'use client';
import usePosts from "@/hooks/posts";
import { DotLoader } from "react-spinners";
import PostListCard from "./postListCard";

export default function PostList() {
    //since we are actually trying to load an array of posts, the generic type should be SimplePost[].
    const { posts, isLoading: loading, error } = usePosts();
    // console.log(posts);

    return (
        <section>
            {loading && (
                <div className="text-center mt-20">
                    <DotLoader color="#36d7b7" />
                </div>
            )}
            {posts && (
                <ul>
                    {posts && posts.map(post =>
                        <li className="mb-5" key={post.id}>
                            <PostListCard post={post} />
                        </li>)}
                </ul>
            )

            }
        </section>
    )
}


