import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const router = useRouter();

  // const handleSingIn = async (event: any) => {
  //   event.preventDefault();
  //   const payload = {
  //     email,
  //     password,
  //   };
  //   const response = await fetch("http://localhost:5000/signin", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   });
  //   if (!response.ok) {
  //     // Handle error
  //     console.log("there is an error", response);
  //     return;
  //   }

  //   const result = await response.json();
  //   const token = await result.token;
  //   localStorage.setItem("token", token);
  //   await setData(result);
  //   toast.success("Successfully Loged In")
  //   router.push('/')
  // };
  const handleSignIn = async (event :any) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      const result = await response.json();
      const token = result.token;
      localStorage.setItem("token", token);
      toast.success("Successfully Logged In");
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error("Failed to Log In");
    }
  };
  return (
    <>
      <Navbar />
      <div className="mt-20 mx-20  max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Log in to your account</h1>
        <form className="space-y-4" onSubmit={handleSignIn}>
          <div className="space-y-2">
            <label htmlFor="email" className="font-medium text-gray-700 block">
              Email address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              required
              className="border border-gray-400 px-3 py-2 w-full rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="font-medium text-gray-700 block"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              required
              className="border border-gray-400 px-3 py-2 w-full rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            Log in
          </button>
          <button className="bg-blue-500 text-white mx-5 py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200">
            <a href="/signup"> Don't have account?</a>
          </button>
        </form>
      </div>
    </>
  );
};
export default signin;
