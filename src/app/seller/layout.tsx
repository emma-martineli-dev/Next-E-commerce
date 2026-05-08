import Navbar from "@components/seller/Navbar"
import Sidebar from "@components/seller/Sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#050F1C] min-h-screen">
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default Layout