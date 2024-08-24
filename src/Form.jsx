import { useState } from "react";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

export function AddFriendForm({defaultAge} = {defaultAge: 21}){
    const friends = useLiveQuery(()=> db.friends.toArray())
    const [name,setName] = useState("")
    const [age,setAge] = useState(defaultAge)
    const [status, setStatus] = useState("")

//Rember that Dexie is asynchronous
    async function AddToDb() {
        //Add new friend item
        try{
            if(name && age){
                const newFriend = await db.friends.add({
                    name,
                    age,
                });
                setStatus(`Friends ${name} successfully added`)
            }else {
                setStatus(`Please Add Name and Age `)
            }
          
        } catch(error){
        setStatus(`Failed to add ${name} : ${error}`)
        }
        
    }
    

    //Onchange 
    function toggleOnChangeName(ev){
        setName(ev.target.value)
        
    }

    function toggleOnChangeAge(ev){
        setAge(Number(ev.target.value))
        
    }

    //Reset
     function toggleReset(){
       setName("")
       setAge("")
       setStatus("")
     }
  

     //Delete
    
     async function toggleDelete(){  
          if(friends && friends.length > 0) {
             const lastItem = friends[friends.length - 1]
             await db.friends.delete(lastItem.id)
             return lastItem
          }else{
              return null
          }
   }
       

    return (
        <>
        <p className="bg-red-700 text-3xl text-center text-white">{status} </p>
       <label htmlFor="name">Name:</label> 
        <input
         type="text"
         value={name || ""}
         id="name"
         onChange={toggleOnChangeName} 
         autoFocus
         className="outline-red-600 w-60 border-2 m-3 border-black"
         />

       <label htmlFor="age">Value:</label> 
        <input
         type="number"
         value={age || ""}
         id="age"
         onChange={toggleOnChangeAge} 
        className="outline-red-600 w-60 border-2 m-3 border-black"
         />
        
        <button onClick={AddToDb} className="px-5 py-2 bg-gray-900 text-white rounded-md mt-2 mx-3">Add</button>
         <button onClick={toggleReset} className="px-5 py-2 bg-purple-900 text-white rounded-md mt-2 mx-5">Reset</button> 
         <button onClick={toggleDelete} className="px-5 py-2 bg-red-900 text-white rounded-md mt-2 mx-5">Delete</button>  
      
        
        </>
    )
}