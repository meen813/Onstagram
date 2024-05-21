'use client'
import { AuthUser } from "@/model/user";
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
    if(files && files[0]) {
      setFile(files[0]);
      console.log(files[0])
    }
  };
  const handleDrag = (e: React.DragEvent) => {
    if(e.type === 'dragenter') {
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
    if(files && files[0]) {
      setFile(files[0]);
      console.log(files[0])
    }
  }

  return (
    <section >
      <PostUserAvatar username={username} image={image ?? ''} />
      <form>
        <input
          type="file"
          className="hidden"
          name="input"
          id="input-upload"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          <FileIcons />
          <p>Upload Your Image or Video File By Drag or Click here</p>
        </label>
        <textarea name="text" id="input-text" required rows={10} placeholder={'Comment Here...'}></textarea>
      </form>
      <Button text='Create Your Post' onClick={() => { }}></Button>
    </section>
  )
}