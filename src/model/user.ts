import user from "../../sanity-studio/schemas/user";

export type AuthUser = {
    id: string;
    name: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    image?: string;
};

export type SimpleUser = Pick<AuthUser,'id'| 'username' | 'image'>;

export type HomeUser = AuthUser & {
    following: SimpleUser[];
    followers: SimpleUser[];
    bookmarks: string[];
};

export type SearchUser = AuthUser & {
    following: number;
    followers: number;
}

export type ProfileUser = SearchUser & {
    posts: number;
}