type Props = {
    text: string;
    onClick: () => void;
    size?: 'small' | 'large'
}

export default function ColorButton({ text, onClick, size = 'small' }: Props) {
    return (
      <div className={`rounded-md bg-gradient-to-bl from-purple-400 via-green-200 to-yellow-300 p-[0.15rem] ${size === 'large' ? 'p-[0.3rem' : 'p-0.15rem'}`}>
        <button
          className={`bg-white rounded-sm text-base p-[0.3rem] hover:opacity-80 transition-opacity ${size === 'large' ? 'p-4 text-2xl' : 'p-[0.3rem] text-base' }`}
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    );
  }
  