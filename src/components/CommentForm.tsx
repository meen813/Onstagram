import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import Avatar from "./Avatar";


type Props = {
        authorUsername: string;
        onPostComment: (comment: string) => void;
};

export default function CommentForm({ authorUsername, onPostComment }: Props) {
    const [comment, setComment] = useState('');
    const buttonDisabled = comment.length === 0;
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
            onPostComment(comment);
            setComment('');
    };
    const { data: session } = useSession();
    const user = session?.user;
    
    return(
        <form onSubmit={handleSubmit} className="flex items-center px-3 border-t border-neutral-300">
        <Avatar image={user?.image} size="small" />
        <input
            className="w-full ml-2 border-none outline-none p-3"
            type="text"
            placeholder={`Add a comment for ${authorUsername}`}
            required
            value={comment}
            onChange={e => setComment(e.target.value)}
        />
        <button disabled={buttonDisabled} className={`font-bold ${buttonDisabled? ' text-blue-200' : ' text-blue-500'}`}>
            Post
        </button>
    </form>
    )
}