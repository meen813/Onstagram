import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getFollowingPostsOf, getPost, softDeletePostById } from "@/service/posts";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type Context = {
    params: {id: string};
}

export async function GET(request: NextRequest, context: Context) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return new Response('Authentication Error', { status: 401 });
    }

    return getPost(context.params.id)
        .then((data) => NextResponse.json(data));
}


export async function DELETE(request: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  try {
    await softDeletePostById(context.params.id);
    return new Response("Post soft deleted successfully", { status: 200 }); 
  } catch (error) {
    console.error("Failed to soft delete post", error);
    return new Response("Failed to soft delete post", { status: 500 });
  }
}