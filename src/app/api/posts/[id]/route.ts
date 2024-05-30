import { getPost, softDeletePostById } from "@/service/posts";
import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
}

export async function GET(request: NextRequest, context: Context) {
  return withSessionUser(async (user) => {
    return getPost(context.params.id)
      .then((data) => NextResponse.json(data));
  })
}

export async function DELETE(request: NextRequest, context: Context) {
  return withSessionUser(async (user) => {
    try {
      await softDeletePostById(context.params.id);
      return new Response("Post soft deleted successfully", { status: 200 });
    } catch (error) {
      console.error("Failed to soft delete post", error);
      return new Response("Failed to soft delete post", { status: 500 });
    }
  })
}