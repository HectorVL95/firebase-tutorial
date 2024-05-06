'use client'

import Auth from "@/components/auth";
import { db, auth, storage } from "./config/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export default function Home() {

  const [movieList, setMovieList] = useState([])

  //New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  
  // Update title State
  const [updatedTitle, setUpdatedTitle] = useState("");

  // File Upload State
  const [fileUpload, setFileUpload] = useState(null)

  const moviesCollectionRef = collection(db, "movies");

  const onSubmitMovie = async () => {
    try {
     await addDoc(moviesCollectionRef, {
       title: newMovieTitle, 
       releaseDate: newReleaseDate, 
       receivedAnOscar: isNewMovieOscar,
       userId: auth?.currentUser.uid,
     });
     getMovieList();
   } catch (error) {
     console.error(error)
   }
 } 

  const getMovieList = async () => {
    // READ THE DATA
    // SET THE MOVIE LIST
    try{
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map(doc => ({
        ...doc.data(), 
        id: doc.id,
      }));
      setMovieList(filteredData)
      console.log(filteredData);
    }catch (error) {
      console.error(error)
    }
  }  

  useEffect(() => {
    getMovieList();
  }, [])

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc)
  };
  
  const updateMovieTitle = async (id ) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, {title: updatedTitle})
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef, fileUpload)
    } catch (error) {
      console.error
    }
    
  }





  console.log(movieList);

  return (
    <main className="flex flex-col">
      <h1>Firebase tutorial</h1>
      <Auth />
      <div>
        <input placeholder="Movie title..." onChange={(e) => setNewMovieTitle(e.target.value)}/>
        <input placeholder="Release Date..." type="number" onChange={(e) => setNewReleaseDate(Number(e.target.value))}/>
        <input type="checkbox" checked={isNewMovieOscar}  onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map( movie => (
        <div>
          <h1 style={{color: movie.receivedAnOscar ? 'green' : 'red'}}>{ movie.title }</h1>
          <p>{ movie.releaseDate }</p>
          <button onClick={() => deleteMovie(movie.id) }>Delete movie</button>

          <input placeholder="new title..."  onChange={(e) => setUpdatedTitle(e.target.value)}/>
          <button onClick={() => updateMovieTitle(movie.id)}>Update title</button>
        </div>))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
      
    </main>
  );
}
