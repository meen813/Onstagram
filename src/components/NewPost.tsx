'use client'
import { AuthUser } from "@/model/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Button from "./ui/Button";
import FileIcons from "./ui/icons/FileIcons";

type Props = {
  user: AuthUser;
}
export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String>();
  const router = useRouter();
  const textRef = useRef<HTMLTextAreaElement>(null)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  }
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
    }
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', textRef.current?.value ?? "");

    fetch('/api/posts/', { method: 'POST', body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .catch(err => setError(err.toString()))
      .finally(() => setLoading(false))
  }

  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-7">
      {loading && (
        <div className="absolute inset-0 z-20 text-center pt-[30%]">
          <p>Loading...</p>
        </div>)
      }
      {
        error && (
          <p className="w-full bg-red-100 text-red-600 text-center font-bold p-4">
            {error}
          </p>
        )
      }
      <form className="w-full flex flex-col mt-3 gap-3" onSubmit={handleSubmit}>
        <input
          type="file"
          className="hidden"
          name="input"
          id="input-upload"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full h-60 sm:h-80 flex flex-col items-center justify-center gap-4 ${!file && ' border-2 border-teal-500 border-dashed'} `}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (<div className="absolute inset-0 z-10 bg-neutral-900/20 pointer-events-none" />)}
          {!file && (
            <div>
              <FileIcons />
              <p className="mt-3">Upload Your Image By Drag or Click here</p>
            </div>
          )}
          {file && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                className="object-cover max-h-full"
                src={URL.createObjectURL(file)}
                alt='local file'
                fill
                sizes='650px'
              />
            </div>
          )}
        </label>
        <textarea
          className="outline-none text-lg border border-neutral-300 p-3 mb-2 dark:bg-neutral-900"
          name="text"
          id="input-text"
          required rows={10}
          placeholder={'Comment Here...'}
          ref={textRef}
        >
        </textarea>
        <Button text='Create Your Post' onClick={() => { }}></Button>
      </form>

    </section>
  )
}