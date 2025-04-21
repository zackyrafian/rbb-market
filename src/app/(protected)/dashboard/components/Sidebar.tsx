import { useSession } from "next-auth/react";
import Link from "next/link";

const SideBar = () => {
    const { data: session } = useSession();

    return (
        <div className="h-screen w-64 bg-white text-gray-900 p-6 border-r border-gray-200 flex flex-col">
            <div className="mb-10">
                <p className="text-lg font-semibold">
                    {session?.user?.name ? `Welcome, ${session.user.name}` : "Welcome, Guest"}
                </p>
            </div>
            <ul className="space-y-4 text-base font-medium">
                <li>
                    <Link href="/" className="hover:text-blue-600 transition-colors">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/penjualan" className="hover:text-blue-600 transition-colors">
                        Penjualan
                    </Link>
                </li>
                <li>
                    <Link href="/product" className="hover:text-blue-600 transition-colors">
                        Product
                    </Link>
                </li>
                <li>
                    <Link href="/statistik" className="hover:text-blue-600 transition-colors">
                        Statistik
                    </Link>
                </li>
                <li>
                    <Link href="/pengaturan" className="hover:text-blue-600 transition-colors">
                        Pengaturan Toko
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;
