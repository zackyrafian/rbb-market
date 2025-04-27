"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { FiHome, FiShoppingCart, FiPackage, FiBarChart2, FiSettings, FiMenu, FiX, FiUser, FiSearch } from "react-icons/fi"
import { RiDashboardLine } from "react-icons/ri";

const SideBar = () => {
  const { data: session } = useSession()
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: RiDashboardLine },
    { name: "Penjualan", href: "/penjualan", icon: FiShoppingCart },
    { name: "Product", href: "/dashboard/product", icon: FiPackage },
    { name: "Statistik", href: "/statistik", icon: FiBarChart2 },
    { name: "Pengaturan Toko", href: "/pengaturan", icon: FiSettings },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 md:hidden bg-gray-400 p-2 rounded-md shadow-md">
        {collapsed ? <FiMenu size={24} /> : <FiX size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out
          ${collapsed ? "-translate-x-full" : "translate-x-0"}
          md:translate-x-0 md:static md:block
          w-64 bg-white shadow-lg flex flex-col h-screen`}
      >
        {/* Logo and user info */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
              <FiUser size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session?.user?.username ? session.user.username : "Guest"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session?.user?.email || "Sign in to access all features"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-1 overflow-y-auto space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiSearch size={18} />
            </div>
          </div>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                >
                  <item.icon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-900 transition-colors" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">© 2025 Your Company</p>
        </div>
      </div>
    </>
  )
}

export default SideBar
