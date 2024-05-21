type Props = {
  text: string;
  onClick: () => void;
  red?: boolean
}

export default function Button({ text, onClick, red }: Props) {

  return (
    <button className={`border-none w-full rounded-md py-2 px-8 text-white font-bold leading-4 ${red ? 'bg-red-500' : 'bg-teal-500'}`} onClick={()=> onClick()}>
      {text}
    </button>
  )
}