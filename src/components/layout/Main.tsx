import { Outlet } from "react-router-dom"
// import Navbar from "../common/Navbar"

export default function MainLayout() {
    return (
        <main className="min-h-screen bg-gradient-to-tr from-[#1381ee] to-[#3CA0F5]">
            <Outlet />
        </main>
    )
}
