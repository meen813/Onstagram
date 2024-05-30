import { likePost, unlikePost } from "@/service/posts";
import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  return withSessionUser(async(user) => {
    const { id, like } = await req.json();
  
    if (!id || like == null) {
      return new Response('Bad Response', { status: 400 });
    }
  
    const request = like ? likePost : unlikePost;
  
    return request(id, user.id)
      .then(res => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 })) //internal error
  })
}