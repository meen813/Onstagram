import useMe from "@/hooks/me";
import usePosts from "@/hooks/posts";
import { Comment, SimplePost } from "@/model/post";
import { parseDate } from "@/util/date";
import CommentForm from "./CommentForm";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import ToggleButton from "./ui/ToggleButton";

type Props = {
    post: SimplePost;
    children?: React.ReactNode;
    onComment: (comment: Comment) => void;
}
export default function ActionBar({ post, children, onComment }: Props) {
    const { id, createdAt, likes } = post;
    const { user, setBookmark } = useMe();
    const { setLike } = usePosts();
    const liked = user ? likes.includes(user.username) : false;
    const bookmarked = user?.bookmarks ? user.bookmarks.includes(id) : false;


    const handleLike = (like: boolean) => {
        user && setLike(post, user.username, like)
    }

    const handleBookmark = (bookmark: boolean) => {
        user && setBookmark(id, bookmark);
    }

    const handleComment = (comment: string) => {
        user && onComment({ comment, username: user.username, image: user.image })
    }


    return (
        <>
            <div className="flex justify-between my-2 px-4 ">
                <div className="transition duration-300 ease-in-out transform hover:-translate-y-0.5">
                    <ToggleButton
                        toggled={liked}
                        onToggle={handleLike}
                        onIcon={<HeartFillIcon />}
                        offIcon={<HeartIcon />}
                    />
                </div>
                <div className="transition duration-300 ease-in-out transform hover:-translate-y-0.5">
                    <ToggleButton
                        toggled={bookmarked}
                        onToggle={handleBookmark}
                        onIcon={<BookmarkFillIcon />}
                        offIcon={<BookmarkIcon />}
                    />
                </div>
            </div>
            <div className="px-4 py-1">
                <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
                {children}
                <p className="text-xs text-neutral-500 uppercase my-2">{parseDate(createdAt)}</p>
            </div>
            <CommentForm onPostComment={handleComment} authorUsername={post.username} />
        </>
    )
}