import wepng from "../assets/we.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import router from "next/router";

const card = ({ data }: any) => {
  const imageUrl = wepng.src;

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = async (type: any) => {
    const payload = {
      status: type,
      _id: data._id,
    };
    const response = await fetch("http://localhost:5000/move", {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    
    });
    if(response.ok){
      toast.success(`Book Moved Successfully`)
      router.push('/');
    }

  };

  const handleDelete = async () => {
    console.log("its here frontend");
    const payload = {
      _id: data?._id,
    };
    const response = await fetch("http://localhost:5000/delete", {
      method: "DELETE",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(response.ok){
      toast.success(' Book Deleted');
      router.push('/');
    }
    const deletedData = await response.json();
    return deletedData;
  };

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 ">
          <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden item-center">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full object-cover md:w-48"
                  src={data?.image || imageUrl}
                  alt="Image"
                ></img>
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {`Author: ${data?.author ||" N/A"}`}
                </div>
                <a
                  href="#"
                  className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                >
                  {`Title:${data?.title}`}
                </a>
              </div>
              <button
                className="px-4 py-2 font-semibold text-gray-700 bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100"
                onClick={toggleMenu}
              >
                Menu
              </button>

              {isOpen && (
                <div className="absolute right-94 mt-2 w-48 bg-white rounded-md shadow-lg ">
                  <button>
                    <a
                      // href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => handleClick("completed")}
                    >
                      Completed
                    </a>
                  </button>
                  <button onClick={(e) => handleClick("reading")}>
                    <a
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Reading
                    </a>
                  </button>
                  <button onClick={handleDelete}>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Delete Book
                    </a>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
};
export default card;
