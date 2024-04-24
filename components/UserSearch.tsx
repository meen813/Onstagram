'use client'

import useDebounce from "@/hooks/useDebounce";
import { SearchUser } from "@/model/user";
import { FormEvent, useState } from "react"
import { GridLoader } from "react-spinners";
import useSWR from "swr"
import UserCard from "./UserCard";

export default function UserSearch() {
    // features to implement
    // /api/search/${keyword}
    // if you have a keyword ex) /api/search/bob -> return username or name
    // if you do not have a keyword /api/search -> return the entire list of users

    const [keyword, setKeyword] = useState("");
    const debouncedKeyword = useDebounce(keyword);
    const {
        data: users,
        isLoading,
        error
    } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <section className="w-full max-w-2xl my-4 flex flex-col items-center">
            <form 
                className="w-full mb-4"
                onSubmit={onSubmit}>
                <input
                    className="w-full text-xl p-3 outline-none border border-grey-400"
                    type="text"
                    autoFocus
                    placeholder="Search for a username of name"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </form>
            {error && <p>Something went wrong</p>}
            {isLoading && <p>loading now</p>}
            {!isLoading && !error && users?.length === 0 && (<p>no users match</p>)}
            <ul className="w-full p-4">
                {users && users.map((user, index) => (
                    <li key={user.username + index}>
                        <UserCard user={user} />
                    </li>))}
            </ul>
        </section>)
}