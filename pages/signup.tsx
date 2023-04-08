import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
const signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const router = useRouter();

  // const handleSingUp = async (event: any) => {
  //   event.preventDefault();
  //   const payload = {
  //     name,
  //     email,
  //     password,
  //     country,
  //   };
  //   console.log("🚀 ~ file: signup.tsx:12 ~ handleSingUp ~ payload:", payload);
  //   const response = await fetch("http://localhost:5000/signup", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   });
  //   if (!response.ok) {
  //     // Handle error
  //     console.log("there is an error");
  //     return;
  //   }

  //   const result = await response.json();
  //   console.log("🚀 ~ file: signup.tsx:34 ~ handleSingUp ~ result:", result);
  //   await setData(result);
  //   console.log("this is data", data);
  //   await router.push("/signin");
  // };
  const handleSingUp = async (event: any) => {
    event.preventDefault();
    const payload = {
      name,
      email,
      password,
      country,
    };
    console.log("🚀 ~ file: signup.tsx:12 ~ handleSingUp ~ payload:", payload);
    
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorMessage = await response.text();
        toast.error(errorMessage)
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      await setData(result);
      await router.push("/signin");
      
    } catch (error:any) {
      console.error("Error occurred while signing up: ", error.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="max-w-md mt-20 mx-20 w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Sign up for an account</h1>
        <form className="space-y-4" onSubmit={handleSingUp}>
          <div className="space-y-2">
            <label htmlFor="name" className="font-medium text-gray-700 block">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              required
              className="border border-gray-400 px-3 py-2 w-full rounded-lg"
            />
          </div>
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
              required
              id="password"
              className="border border-gray-400 px-3 py-2 w-full rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="confirm-password"
              className="font-medium text-gray-700 block"
            >
              Country
            </label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              name="country"
              id="country"
              required
              className="border border-gray-400 px-3 py-2 w-full rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            Sign up
          </button>
          <button className="bg-blue-500 text-white mx-5 py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200">
            <a href="/signin">Already have an account?</a>
          </button>
        </form>
      </div>
    </>
  );
};
export default signup;
