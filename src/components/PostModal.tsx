import CloseIcon from "./ui/icons/CloseIcon";

type Props = {
	children: React.ReactNode;
	onClose: () => void;

}
export default function PostModal({ onClose, children }: Props) {
	return (
		<section
			className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70 "
			onClick={(event) => {
				if (event.target === event.currentTarget) {
					onClose();
				}
			}}>
			<button
				className="fixed top-0 right-0 p-8 text-white transition duration-300 ease-in-out hover:text-gray-300 transform hover:-translate-y-0.5"
				onClick={() => onClose()}
			>
				<CloseIcon />
			</button>
			<div className="bg-white w-3/4 h-3/5 max-w-3xl border border-gray-300 dark:bg-neutral-900 overflow-y-auto max-h-full">{children}</div>
		</section>
	)
}
