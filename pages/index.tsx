import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "./card";
import Navbar from "./Navbar";

export default function Home() {

  const [books, setBooks] = useState({
    plan: [],
    complete: [],
    read: [],
  });
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/getbook');
        const res = await response.json();
  
        const newBooks = res.data.reduce(
          (acc :any, book :any) => {
            if (book?.status === 'plan') {
              acc.plan.push(book);
            } else if (book?.status === 'reading') {
              acc.read.push(book);
            } else if (book?.status === 'completed') {
              acc.complete.push(book);
            }
            return acc;
          },
          { plan: [], complete: [], read: [] }
        );
  
        setBooks(newBooks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks()
    console.log(books,'=====')

  }, [books]);

  return (
    <>
      <Navbar />
      {/* These are cards for Plan to read Books */}

      <div className="text-center mt-5 ">Plan to read Books</div>
      {books?.plan?.map((item,index)=>{
      return <Card data={item} />
      })}
      {books?.plan.length === 0 &&
        <div className="text-center mt-5 ">No Data Found...</div>
      }
      {/* // These are cards for Reading Books  */}
      <div className="text-center mt-5 ">Reading Books</div>
      {books?.read?.map((item,index)=>{
      return <Card data={item} />
      })}
       {books?.read.length === 0 &&
        <div className="text-center mt-5 ">No Data Found...</div>
      }

      {/* These are cards for Completed Books  */}
      <div className="text-center mt-5 ">completed Books</div>
      {books?.complete?.map((item,index)=>{
      return <Card data={item} />
      })}
       {books?.complete.length === 0 &&
        <div className="text-center mt-5 ">No Data Found...</div>
      }
      <div >
      <button className="my-10 ml-8 uppercase tracking-wide text-sm text-indigo-500 font-semibold">
        <a href="/newbook">Add Book +</a>
      </button>
    </div>
    </>
  );
}
