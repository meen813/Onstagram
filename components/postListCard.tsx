import { SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from 'next/image';
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import SmileIcon from "./ui/icons/SmileIcons";


type Props = {
    post: SimplePost;
};

export default function PostListCard({post}: Props) {
        const {username, userImage, image, createdAt, likes, text} = post;
    return <>
        <div>
            <Avatar image={userImage} highlight/>
            <span>{username}</span>
        </div>
        <Image 
            src={image} 
            alt={`photo by ${username}`} 
            width = {500}
            height = {500}
            />
            <div>
                <HeartIcon/>
                <BookmarkIcon/>
            </div>
            <div>
                <p>{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
                <p>
                    <span>{username}</span>
                    {text}
                </p>
                <p>{parseDate(createdAt)}</p>
                <form action="">
                    {/* <SmileIcon/> */}
                    <input className="w-3/4" type="text" placeholder={`Add a comment for ${username}`}/>
                </form>
            </div>
    </>
}