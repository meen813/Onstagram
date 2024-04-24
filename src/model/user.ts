import user from "../../sanity-studio/schemas/user";

export type User = {
    id: string;
    name: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    image?: string;
};

export type SimpleUser = Pick<User,'id'| 'username' | 'image'>;

export type DetailUser = User & {
    following: SimpleUser[];
    followers: SimpleUser[];
    bookmarks: string[];
};

export type UserSearchResult = User & {
    following: number;
    followers: number;
}