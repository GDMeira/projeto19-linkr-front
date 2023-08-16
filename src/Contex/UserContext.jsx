import { createContext } from 'react';
import { useState } from 'react';

export const UserContext = createContext(null);

export default function UserProvider({children}){
    const local = JSON.parse(localStorage.getItem('user'))
    const [user, setUser] = useState(local);
    //console.log(lsUser)
    return(

    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
    
    )
}