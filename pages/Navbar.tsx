import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Navbar = ()=>{
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      toast.success("Loged Out")
      router.push("/signin");
    };
    useEffect(() => {
      const logedIn = window.localStorage.getItem('token');;
      setToken(logedIn);
    }, []);
    return(
        <>
          <nav className="bg-gray-800">
        <div className="mx-auto px-2 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="/" className="text-white font-bold">
              Book Shelf
            </a>
            <div className="relative text-gray-600">
              <input
                type="search"
                name="search"
                placeholder="Search"
                // value={query}
                // onChange={handleInputChange}
                className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
              />
            </div>
            <ul className="flex space-x-4 text-gray-300 text-sm">
              {
                !token && (
                  <li>
                <a href="/signin" className="hover:text-white">
                  Sign In
                </a>
              </li>
                )
              }
             {
                !token && (
                  <li>
                <a href="/signup" className="hover:text-white">
                  Sign Up
                </a>
              </li>
                )
              }
             {
              token && (
                <li>
                <button onClick={handleLogout}>Log Out</button>
              </li>
              )
             }
            </ul>
          </div>
        </div>
      </nav>
        </>
    )
}
export default Navbar