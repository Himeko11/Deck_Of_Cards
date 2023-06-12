import { createContext, useState } from "react";
import IdPlayer from "../data/Cards"

const UserContext = createContext();


const UserProvider = ({children}) => {

    const getIdPlayerCards = () => {
        IdPlayer().then((newIdPlayer) => {
            setIdPlayerCards(newIdPlayer.deck_id);
        })
    }

    const [IdPlayerCards, setIdPlayerCards] = useState(getIdPlayerCards);

    const data = {
        IdPlayerCards
    };

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    ) 
    
}

export {UserProvider}
export default UserContext;