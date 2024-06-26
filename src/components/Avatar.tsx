type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
type Props = {
    image?: string | null;
    size?: AvatarSize;
    highlight?: boolean;
};

export default function Avatar({
    image,
    size = 'large',
    highlight = false,
}: Props) {
    return (
        <div className={getContainerStyle(size, highlight)}>
            <img
                className={`bg-white object-cover rounded-full 
                ${getImageSizeStyle(size).image}`}
                src={image ?? undefined}
                alt="user profile"
                referrerPolicy="no-referrer" //prevent the x-box issue
            />
        </div>
    );
};



function getContainerStyle(size: AvatarSize, highlight: boolean): string {
    const baseStyle = 'rounded-full flex justify-center items-center';
    const highlightStyle = highlight
        ? 'bg-gradient-to-bl from-purple-400 via-green-200 to-yellow-300'
        : '';
    const sizeStyle = size === 'small'
    const { container } = getImageSizeStyle(size);
    return `${baseStyle} ${highlightStyle} ${container} `;
};

type ImageSizeStyle = {
    container: string;
    image: string;
};

//white space btw ring and image
function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
    switch (size) {
        case 'small':
            return {
                container: 'w-9 h-9',
                image: 'w-[34px] h-[34px] p-[0.1rem]',
            };
        case 'medium':
            return {
                container: 'w-11 h-11',
                image: 'w-[42px] h-[42px] p-[0.1rem]',
            };
        case 'large':
            return {
                container: 'w-[68px] h-[68px]',
                image: 'w-16 h-16 p-[0.2rem]',
            };
        case 'xlarge':
            return {
                container: 'w-[142px] h-[142px]',
                image: 'w-[138px] h-[138px] p-[0.3rem]',
            };
        default:
            throw new Error(`Unsupported type size: ${size}`);
    }
}

