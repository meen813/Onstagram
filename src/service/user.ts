import { SimpleUser, UserSearchResult } from "@/model/user";
import { client } from "./sanity";

type OAuthUser = {
    id: string;
    email?: string | null;
    firstname?: string | null;
    lastname?: string | null;
    username: string;
    image?: string | null;
}

export async function addUser({ id, username, email, firstname, lastname, image }: OAuthUser) {
    return client.createIfNotExists({
        _id: id,
        _type: 'user',
        username,
        email,
        firstname,
        lastname,
        image,
        following: [],
        followers: [],
        bookmarks: [],
    });
}

export async function getUserByUsername(username: string) { //route.ts
    return client.fetch(
        //GROQ
        `*[_type == "user" && username == "${username}"][0]{
            ...,
            "id":_id,
            following[]->{username,image},
            followers[]->{username,image},
            "bookmarks":bookmarks[]->_id
        }`
    );
}

export async function searchUsers(keyword?: string){
    const query = keyword 
    ? `&& (firstname match "${keyword}*^" || lastname match "${keyword}*^" || username match "${keyword}*^")`
    : '';

    return client.fetch(
        `*[_type =="user" ${query}] | {
            ...,
            "following": count(following),
            "followers": count(followers),
        }`
    ).then((users)=> users.map((user: UserSearchResult) => ({
        ...user, 
        following: user.following ?? 0,
        followers: user.followers ?? 0,
    })))
}
