import React, {useState,useEffect} from 'react'
import { useLocation, Link } from 'react-router-dom'
import fireDb from "../firebase";
import "./Search.css"

const Search = () => {
  const [data,saveData] =useState ({});
  const useQuery =()=>{
    return new URLSearchParams (useLocation().search);
  }
  let query =useQuery();
  let search =query.get("name");
  console.log("search", search);
  useEffect (()=> {
    saveData();

  }, [search])
  const searchData =()=>{
    fireDb.child("contacts").orderByChild("name").equalTo(search).on("value" , (snapshot)=>{
      if(snapshot.val()){
        const data =snapshot.val();
        searchData(data);
      }
    })
  }



  return (
    <div>
        <h2> Search</h2>
    </div>
  )
}

export default Search