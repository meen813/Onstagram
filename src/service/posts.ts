import { SimplePost } from "@/model/post";
import { client, urlFor } from "./sanity";

const simplePostProjection = `
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "likes": likes[]->username,
    "text": comments[0].comment,
    "comments": count(comments),
    "id":_id,
    "createdAt":_createdAt,
    "deleted": deleted 
`;

function mapPosts(posts: SimplePost[]) {
  return posts
    .filter((post) => !post.deleted)
    .map((post: SimplePost) => ({
      ...post,
      likes: post.likes ?? [],
      image: urlFor(post.image),
    }));
}

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type =="post" && author->username == "${username}"
        || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
        | order(_createdAt desc){
        ${simplePostProjection}
        }`
    )
    .then(mapPosts);
}

export async function getPost(id: string) {
  return client.fetch(
    `*[_type == "post" && _id == "${id}"][0]{
            ...,
            "username": author->username,
            "userImage": author->image,
            "image": photo,
            "likes": likes[]->username,
            comments[]{comment, "username": author->username, "image": author->image},
            "id":_id,
            "createdAt":_createdAt
        }`
  ).then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(username: string) {
  return client.fetch(
    `*[_type == "post" && author->username == "${username}"] 
        |  {
            ${simplePostProjection}
        }`
  ).then(mapPosts);
}

export async function getLikedPostOf(username: string) {
  return client.fetch(
    `*[_type == "post" && "${username}" in likes[]->username] 
        | order(_createdAt desc) {
            ${simplePostProjection}
        }`
  ).then(mapPosts);
}

export async function getSavedPostOF(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref] 
        | order(_createdAt desc) {
            ${simplePostProjection}
        }`
    ).then(mapPosts);
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference'
      }
    ])
    .commit({ autoGenerateArrayKeys: true })
}

export async function unlikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}

export async function addComment(postId: string, userId: string, comment: string) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        comment,
        author: { _ref: userId, _type: 'reference' },
      },
    ])
    .commit({ autoGenerateArrayKeys: true })
}

export async function createNewPost(userId: string, text: string, file: Blob) {
  return client.assets //
    .upload('image', file)
    .then((result) => {
      return client.create(
        {
          _type: 'post',
          author: { _ref: userId },
          photo: { asset: { _ref: result._id } },
          comments: [
            {
              comment: text,
              author: { _ref: userId, _type: 'reference' },
            },
          ],
          likes: [],
        },
        { autoGenerateArrayKeys: true }
      );
    });
}

export async function softDeletePostById(postId: string) {
  try {
    await client
      .patch(postId)
      .set({ deleted: true })
      .commit();
    console.log('Post soft deleted successfully');
    return { success: true };
  } catch (error) {
    console.error('Failed to soft delete post', error);
    throw new Error('Failed to soft delete post');
  }
}
