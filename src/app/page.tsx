import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FollowingBar from "../components/FollowingBar";
import PostList from "../components/PostList";
import SideBar from "../components/SideBar";


export default async function Home() { 
  const session = await getServerSession(authOptions); // SSG rendering
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }


  return (
    <div className='w-full flex flex-col md:flex-row max-w-[850px] p-4'>
      <div className="w-full basis-3/4 min-w-0">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-1/4 ml-8"> 
        <SideBar user={user} />
      </div>
    </div>
  );
}
