import { getImageSize } from "next/dist/server/image-optimizer";

type Props = { 
    image?: string | null;
    size?: 'small' | 'normal';
    highlight?: boolean;
};

export default function Avatar({ 
    image, 
    size ='normal',
    highlight = false,
}: Props) {
    return (
        <div className={getContainerStyle(size, highlight)}>
            <img
                className={`bg-white object-cover rounded-full p=[0.1rem] ${getImageSizeStyle(size)}`}
                
                src={image ?? undefined}
                alt="user profile"
                referrerPolicy="no-referrer" //prevent the x-box issue
            />
        </div>
    );
};

function getContainerStyle(size: string, highlight: boolean): string {
    const baseStyle = 'rounded-full flex justify-center items-center'; 
    const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-purple-400 via-green-200 to-yellow-300 p-[0.15rem]' 
    : '';
    const sizeStyle = size === 'small'
    ? 'w-9 h-9 ' 
    : 'w-[68px] h-[68px]';
    return `${baseStyle} ${highlightStyle} ${sizeStyle} `;
};

function getImageSizeStyle(size: string): string {
    return size === 'small'
    ? 'w-[34px] p-[0.1rem]' 
    : 'w-16 h-16 p-[0.2rem]';
};