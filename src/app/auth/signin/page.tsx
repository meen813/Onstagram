import Signin from "../../../../components/Signin";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth"
import { getProviders } from 'next-auth/react';
import { redirect } from "next/navigation";

//Return to the original page after signing in
type Props = {
    searchParams: {
        callbackUrl: string;
    };
};

export default async function SignInPage ({searchParams: {callbackUrl} }: Props ) {
    const session = await getServerSession(authOptions);
    
    if(session) {
        redirect('/');
    }
    
    const providers = (await getProviders()) ?? {} ;


    return (
        <div className="flex justify-center mt-24">
            <Signin providers={providers} callbackUrl = {callbackUrl ?? '/'}/>
        </div>
        )
}