import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios";
import UserContext from "./UserContext";

const CardsContext = createContext();

const CardsProvider = ({children}) =>{

    const {IdPlayer} = useContext(UserContext);
    const [cardsOne, setCardsOne] = useState([]);
    const [cardsTwo, setCardsTwo] = useState([]);    


    useEffect(() => {
      const getCardsOne = async ()=>{
        const url = `https://deckofcardsapi.com/api/deck/${IdPlayer}/draw/?count=10`;
        const {data} = await axios (url);
        setCardsOne(data.cards);
      };

      const getCardsTwo = async ()=>{
        const url = `https://deckofcardsapi.com/api/deck/${IdPlayer}/draw/?count=10`;
        const {data} = await axios (url);
        setCardsTwo(data.cards);
      };

      getCardsOne();
      getCardsTwo();


    }, [IdPlayer])
    
    
    return (
        <CardsContext.Provider value={{cardsOne, cardsTwo}}>
            {children}
        </CardsContext.Provider>

    )
}

export {CardsProvider}
export default CardsContext;