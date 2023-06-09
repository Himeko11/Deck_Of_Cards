import { createContext, useState } from "react";
import idPlayer from "../data/Cards"

const UserContext = createContext();


const UserProvider = ({children}) => {

    const getIdPlayer = () => {
        idPlayer().then((newIdPlayer) => {
            setIdPlayer(newIdPlayer.deck_id);
        })
    }

    const [IdPlayer, setIdPlayer] = useState(getIdPlayer);

    const data = {
        IdPlayer
    };

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    ) 
    
}

export {UserProvider}
export default UserContext;