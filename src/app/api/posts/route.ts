import { createNewPost, getFollowingPostsOf } from "@/service/posts";
import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return withSessionUser(async (user) => {
    return getFollowingPostsOf(user.username)
      .then((data) => NextResponse.json(data));
  })
}

export async function POST(request: NextRequest) {
  return withSessionUser(async (user) => {
    const form = await request.formData();
    const text = form.get('text')?.toString();
    const file = form.get('file') as Blob;

    if (!text || !file === undefined) {
      return new Response('Bad Response', { status: 400 });
    }

    return createNewPost(user.id, text, file)
      .then((data) => NextResponse.json(data));
  })
}