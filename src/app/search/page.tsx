import { Metadata } from "next";
import UserSearch from "../../../components/UserSearch";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'User Search',
    description: 'Search users',
}

export default function SearchPage() {
    return <UserSearch/>
}
