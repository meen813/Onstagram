import { AuthUser } from "@/model/user";
import Avatar from "./Avatar";

type Props = {
    user: AuthUser;
}



export default function SideBar({ user: {name, lastname, firstname, username, image, email } }: Props) {
    return (
        <>
            <div className="flex items-center flex-col gap-2">
                {image && <Avatar image={image} />}
                <div className="ml-4">
                    <p className="font-bold">{username}</p>
                    <p className="text-lg text-neutral-500 leading-4">{name}</p>
                    {/* <p className="text-lg text-neutral-500 leading-4">{email}</p> */}
                </div>
            </div>

            {/* <p className="text-sm text-neutral-500 mt-8">
                About · Help · Press · API · Jobs · Privacy · Terms · Location · Langauge
            </p>

            <p className="text-sm font-bold text-neutral-500 mt-8">
                @Copyright Onstagram from IH
            </p> */}
        </>
    )
}   