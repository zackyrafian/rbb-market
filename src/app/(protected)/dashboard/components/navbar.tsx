import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FiMail } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav className="w-full h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm">
            <div className="flex item-center gap-2 text-xl font-black text-gray-800">
            <RiDashboardLine className="text-2xl" /> 
                Dashboard     
            </div>
            <div className="flex items-center gap-6">
                <Link href="/messages" className="relative group">
                    <FiMail className="text-2xl text-gray-600 group-hover:text-blue-600 transition" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        3
                    </span>
                </Link>

                {session?.user?.name && (
                    <span className="text-gray-700 text-sm hidden sm:block">
                        Hi, {session.user.name}
                    </span>
                )}

                <button
                    onClick={() => signOut()}
                    className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
