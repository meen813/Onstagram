import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { createNewPost, getFollowingPostsOf } from "@/service/posts";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getFollowingPostsOf(user.username)
    .then((data) => NextResponse.json(data));
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const form = await request.formData();
  const text = form.get('text')?.toString();
  const file = form.get('file') as Blob;

  if (!text || !file === undefined) {
    return new Response('Bad Response', { status: 400 });
  }

  return createNewPost(user.id, text, file)
    .then((data) => NextResponse.json(data));
}