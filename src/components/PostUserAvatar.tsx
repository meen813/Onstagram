import Avatar from "./Avatar";

type Props = {
    image: string;
    username: string;
}

export default function PostUserAvatar({ image, username }: Props) {
    return (
        <div className="flex items-center p-2 dark:bg-black-900">
            <Avatar image={image} highlight size="small" />
            <span className="text-gray-900 dark:text-gray-100 font-bold ml-2">{username}</span>
        </div>
    );
}