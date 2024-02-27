import user from "../../sanity-studio/schemas/user";

export type User = {
    name: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    image?: string;
};

export type SimpleUser = Pick<User, 'username' | 'image'>;

export type DetailUser = User & {
    following: SimpleUser[];
    followers: SimpleUser[];
    bookmarks: string[];
};

