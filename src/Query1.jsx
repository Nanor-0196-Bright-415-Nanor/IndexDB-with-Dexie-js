import { useLiveQuery } from "dexie-react-hooks";

import { db } from "./db";

export function Query1(){
    const friends = useLiveQuery(()=> db.friends.toArray())
  

    return (
        <ul className="grid grid-cols-3">
       {
        friends?.map((friends)=> (
             <li key={friends.id} className="text-xl text-center text-white bg-black inline w-52 px-20 py-5  rounded-xl place-content-center m-10 ">{`${friends.name}, ${friends.age}`}</li>
            
        ))
       }
        </ul>
    )
}




  

