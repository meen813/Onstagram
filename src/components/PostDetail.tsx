import { SimplePost } from "@/model/post";
import Image from 'next/image';
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import useFullPost from "@/hooks/post";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DeleteIcon from "./ui/icons/DeleteIcon";


type Props = {
	post: SimplePost;
}

export default function PostDetail({ post }: Props) {
	const { id, userImage, username, image } = post;
	const { post: data, postComment } = useFullPost(id);
	const comments = data?.comments;
	const { data: session } = useSession();
	const currentUser = session?.user?.username;
	const router = useRouter();

	const handleDelete = async () => {
		if (confirm('Are you sure you want to delete this post?')) {
			try {
				const response = await fetch(`/api/posts/${id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (response.ok) {
					alert('Post deleted successfully');
					router.refresh();
				} else {
					alert('Failed to delete post');
				}
			} catch (error) {
				console.error('Failed to delete post:', error);
				alert('Failed to delete post');
			}
		}
	};

	return (
		<section className="flex flex-col sm:flex-row w-full h-full">
			<div className="relative w-full sm:w-3/5 h-60 sm:h-auto">
				<Image
					className="object-cover"
					src={image}
					alt={`photo by ${username}`}
					priority
					fill
					sizes="(max-width: 640px) 100vw, 50vw" />
			</div>
			<div className="w-full sm:w-2/5 flex flex-col h-full">
				<PostUserAvatar image={userImage} username={username} />
				<ul className="border-t border-gray-300 h-full overflow-y-auto p-4 mb-1">
					{comments && comments.map(({ image, username: commentUsername, comment }, index) =>
						<li key={index} className='flex items-start mb-1'>
							<div className="flex-shrink-0">
								<Avatar
									image={image}
									size='small'
									highlight={commentUsername === username}
								/>
							</div>
							<div className="ml-2">
								<span className="font-bold mr-1">{commentUsername}</span>
								<span>{comment}</span>
							</div>
						</li>
					)}
				</ul>
				<ActionBar post={post} onComment={postComment} />
			</div>
			
				{currentUser === username && (
					<button
						onClick={handleDelete}
						className="bg-red-500 text-white fixed top-5 left-5 p-3 rounded mt-2 transition duration-300 ease-in-out hover:bg-red-600 shadow-md hover:shadow-lg">
						<DeleteIcon />
					</button>
				)}
			

		</section>
	);
}
