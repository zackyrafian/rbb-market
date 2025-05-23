'use client';
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import Chat from "./components/Chat";
import RecentActivity from "./components/RecentActivity";

export default function DashboardPage () { 
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') { 
        return <div>Loading...</div>
    }

    if (!session) { 
        router.push('/login');
        return <div>You must be logged in to view this page.</div>;
    }
    
    return ( 
        <div>
            {/* <Chat/> */}
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome, {session.user?.name}</p>

            <RecentActivity/>
        </div>
    )
}