'use client'
import { AuthUser } from "@/model/user";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import PostUserAvatar from "./PostUserAvatar";
import Button from "./ui/Button";
import FileIcons from "./ui/icons/FileIcons";

type Props = {
  user: AuthUser;
}
export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0])
    }
  };
  const handleDrag = (e: React.DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  }
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0])
    }
  }

  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-7">
      <PostUserAvatar username={username} image={image ?? ''} />
      <form className="w-full flex flex-col mt-3 gap-3">
        <input
          type="file"
          className="hidden"
          name="input"
          id="input-upload"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full h-60 flex flex-col items-center justify-center gap-4 ${!file && ' border-2 border-teal-500 border-dashed'}`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (<div className="absolute inset-0 z-10 bg-teal-500/20 pointer-events-none" />)}
          {!file && (
            <div>
              <FileIcons />
              <p>Upload Your Image or Video File By Drag or Click here</p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt='local file'
                fill
                sizes='650px'
              />
            </div>
          )}
        </label>
        <textarea
          className="outline-none text-lg border border-neutral-300 p-2 mb-2"
          name="text"
          id="input-text"
          required rows={10}
          placeholder={'Comment Here...'}>
        </textarea>
      </form>
      <Button text='Create Your Post' onClick={() => { }}></Button>
    </section>
  )
}