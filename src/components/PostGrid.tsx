import usePosts from "@/hooks/posts";
import PostGridCard from "./PostGridCard";

type Props = {
    username: string;
    query: string;
}

export default function PostGrid() {
    const {
        posts,
        isLoading,
        error
    } = usePosts();

    return (
        <div className="w-full text-center">
            {isLoading && "Now Loading"}
            <ul className="grid grid-cols-3 gap-4 py-4 px-8">
                {posts && posts.map((post, index) => (
                    <li key={post.id}>
                        <PostGridCard post={post} priority={index < 6} />
                    </li>
                ))}
            </ul>
        </div>
    );
}