import { Outlet } from "react-router-dom"
import Navbar from "../common/Navbar"

export default function MainLayout() {
    return (
        <main className="min-h-screen bg-gradient-to-r from-indigo-500 from-5% via-sky-500 via-30% to-blue-600 to-90%">
            <Navbar />
            <Outlet />
        </main>
    )
}
