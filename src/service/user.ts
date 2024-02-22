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

export async function getUserByUsername(username: string) {
    return client.fetch(
        `*[_type == "user" && username == "${username}"][0]{
            ...,
            "id":_id,
            following[]->{username,image},
            followers[]->{username,image},
            "bookmarks":bookmarks[]->_id
        }`
    );
}

