import React from 'react'
import { db } from './db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'

function App() {
  const [maxAge, setMaxAge] = useState(21)

  // Query friends withing a certain range decided by state:
  const friends = useLiveQuery(() =>  db.friends.where("age").belowOrEqual(maxAge).sortBy("id"), [maxAge])
  //because maxAge affects query!


  //Another Query 
  //const friendsCount = useLiveQuery(()=> db.friends.count());


  //If default values are returned, queries are still loading
  if(friends === undefined || friends === "") return <h1>Loading</h1>;
  console.log(friends)

  return (
    <>  
    <div>
      <h1 className='text-3xl bg-black text-white text-center'>Hello IndexDB Queries</h1>
    </div>
    <label>Please Enter Max age to query:</label>
    <input 
    className='border-2 border-black m-5'
    type="text" 
    value={maxAge}
     onChange={(ev) => {
      const value = parseInt(ev.target.value)
      if(!isNaN(value)){
        setMaxAge(value)
      }
     }}
    />

    <ul>
      {
        friends.map((friend) => (
          <li key={friend.id}>
           {friend.age}
           <button
            onClick={()=> db.friends.where({id: friend.id}).modify((f) => ++f.age)}
            className='text-4xl bg-black text-white'>
                Birthday
            </button>
          </li>
        ))
      }
    </ul>

    </>
  )
}

export default App
