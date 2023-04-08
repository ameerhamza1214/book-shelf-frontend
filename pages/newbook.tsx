import { useState } from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Newbook = ()=>{
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genere ,setgenere] = useState('')
    const [image, setCoverImage] = useState<File | null>(null);
    const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
    const router = useRouter();


    const handleSubmit = async(event :any) => {
      event.preventDefault();
      if (!image) {
        console.log('No image selected');
        return;
      }
      console.log('image',image);
      
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('author', author);
      formData.append('genere', genere);


      console.log("🚀 ~ file: newBook.tsx:14 ~ handleSubmit ~ payload:", formData)

      const response = await fetch('http://localhost:5000/newbook', {
        method: 'POST',
        body:formData,
      });
      console.log("🚀 ~ file: newBook.tsx:23 ~ handleSubmit ~ response:", response)
      if (response.ok) {
        console.log('here working')
        // Handle error
        toast.success('New Book Created');
                router.push('/');

        return;
      }
      if (!response.ok) {
        // Handle error
        console.log('there is an error',response)
        return;
      }

        // TODO: Add logic to create book in database
    };
    // const handleSubmit = async (event: any) => {
    //   event.preventDefault();
    //   if (!image) {
    //     console.log('No image selected');
    //     return;
    //   }
    
    //   const formData = new FormData();
    //   formData.append('image', image);
    //   formData.append('title', title);
    //   formData.append('author', author);
    //   formData.append('genre', genere);
    
    //   try {
    //     console.log(formData)
    //     const response = await fetch('http://localhost:5000/newbook', {
    //       method: 'POST',
    //       body: formData,
    //     });
    
    //     if (response.ok) {
    //       toast.success('New Book Created');
    //       router.push('/');
    //       return;
    //     } else {
    //       const errorMessage = await response.text();
    //       console.log('Error:', errorMessage);
    //       toast.error(errorMessage)
    //       // Handle the error message here
    //       return;
    //     }
    //   } catch (error:any) {
    //     console.log('Error:', error.message);
    //     // Handle the error here
    //     return;
    //   }
    // };
    const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            console.log("🚀 ~ file: newBook.tsx:18 ~ handleCoverImageChange ~ file:", file)
          setCoverImage(event.target.files[0]);
          const reader = new FileReader();
          console.log("🚀 ~ file: newBook.tsx:39 ~ handleCoverImageChange ~ reader:", reader)
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setCoverImagePreview(reader.result as string);
          };
        }
      };
    return(
        <>
              <Navbar />

        <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="coverImage" className="block text-gray-700 font-bold mb-2">
          Cover Image*
        </label>
        {coverImagePreview ? (
          <img src={coverImagePreview} alt="Cover Image" className="mb-4 h-50 w-40" />
        ) : null}
        <input type="file" id="coverImage" name="image" onChange={handleCoverImageChange} className="block" required />
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title*
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
      
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Genere*
        </label>
        <input
          type="text"
          id="Genere"
          value={genere}
          onChange={(event) => setgenere(event.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="author" className="block text-gray-700 font-bold mb-2">
          Author*
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Book
        </button>
     
      </div>
    </form>
        </>
    )
}
export default Newbook ;