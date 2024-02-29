import { useSession } from "next-auth/react";
import Avatar from "./Avatar";


type Props = {
        authorUsername: string;
};

export default function CommentForm({ authorUsername}: Props) {
    const { data: session } = useSession();
    const user = session?.user;
    
    return(
        <form className="flex items-center px-3 border-t border-neutral-300">
        <Avatar image={user?.image} size="small" />
        <input
            className="w-full ml-2 border-none outline-none p-3"
            type="text"
            placeholder={`Add a comment for ${authorUsername}`}
        />
        <button className="font-bold text-blue-300">
            Post
        </button>
    </form>
    )
}