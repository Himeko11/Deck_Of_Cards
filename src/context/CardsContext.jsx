import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios";
import UserContext from "./UserContext";

import Winner from "../../images/winner.png";
import { Button, Modal } from "react-bootstrap";

const CardsContext = createContext();

const CardsProvider = ({children}) =>{

    const {IdPlayerCards} = useContext(UserContext);

    const [deckPlayerOne, setDeckPlayerOne] = useState([]);
    const [deckPlayerTwo, setDeckPlayerTwo] = useState([]);
    const [winPlayer, setWinPlayer] = useState([]);
    const [activePlayer, setActivePlayer] = useState(1);

    const [quarter, setQuarter] = useState([]);
    const [triadOne, setTriadOne] = useState([]);
    const [triadTwo, setTriadTwo] = useState([]);

    const [save, setSave] = useState([]);

    let winFlag = false;

    /* Winner Player */
    const [modalOpen, setModalOpen] = useState(false);

    const handleWin = () => {
      setModalOpen(true);
    };

    const handleClose = () => {
      setModalOpen(false);
    };


    const getCardsOne = async ()=>{
      const url = `https://deckofcardsapi.com/api/deck/${IdPlayerCards}/draw/?count=10`;
      const {data} = await axios.get(url);
      setDeckPlayerOne(data.cards);
    };

    const getCardsTwo = async ()=>{
      const url = `https://deckofcardsapi.com/api/deck/${IdPlayerCards}/draw/?count=10`;
      const {data} = await axios.get(url);
      setDeckPlayerTwo(data.cards);
    };

    const getCard = async () => {
      const url = `https://deckofcardsapi.com/api/deck/${IdPlayerCards}/draw/?count=1`;
      const {data} = await axios.get(url);

      if(activePlayer === 1 ){
        setActivePlayer(2);
      }else{
        setActivePlayer(1);
      }
      return data;
    }

      if(winFlag === false){

        const hasFourOfAKind = (deckPlayer) => {
          const counts = {};

          for (let i = 0; i < deckPlayer.length; i++) {
            const card = deckPlayer[i];
            const number = card.value;
            const suit = card.suit;

            if (!counts[number]) {
              counts[number] = { count: 1, suits: new Set([suit]), cards: [card] };
            } else {
              counts[number].count++;
              counts[number].suits.add(suit);
              counts[number].cards.push(card);
            }
          }

          for (const key in counts) {
            if (counts[key].count === 4 && counts[key].suits.size === 4) {
              return counts[key].cards;
            }
          }

          return [];
        }

        const hasThreeOfAKind = (deckPlayer) => {
          const counts = {};

          for (let i = 0; i < deckPlayer.length; i++) {
            const card = deckPlayer[i];
            const number = card.value;
            const suit = card.suit;

            if (!counts[number]) {
              counts[number] = { count: 1, suits: new Set([suit]), cards: [card] };
            } else {
              counts[number].count++;
              counts[number].suits.add(suit);
              counts[number].cards.push(card);
            }
          }

          for (const key in counts) {
            if (counts[key].count === 3 && counts[key].suits.size === 3) {
              return counts[key].cards;
            }
          }

          return [];
        }

        /* Cartas a salvar */
        const hasTwoOfAKind = (deckPlayer) => {
          const counts = {};

          for (let i = 0; i < deckPlayer.length; i++) {
            const card = deckPlayer[i];
            const number = card.value;
            const suit = card.suit;

            if (!counts[number]) {
              counts[number] = { count: 1, suits: new Set([suit]), cards: [card] };
            } else {
              counts[number].count++;
              counts[number].suits.add(suit);
              counts[number].cards.push(card);
            }
          }

          for (const key in counts) {
            if (counts[key].count === 2 && counts[key].suits.size === 2) {
              return counts[key].cards;
            }
          }

          return [];
        }

        const hasFourOfALadder = (deckPlayer) => {
          const valueOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K'];

          const sortedArr = deckPlayer.sort((a, b) => {
            const valueA = a.substring(0, a.length - 1);
            const valueB = b.substring(0, b.length - 1);
            return valueOrder.indexOf(valueA) - valueOrder.indexOf(valueB);
          });
        
          for (let i = 0; i < sortedArr.length - 3; i++) {
            const currentCard = sortedArr[i];
            const currentSuit = currentCard.charAt(currentCard.length - 1);
        
            let count = 1;
            const ladder = [currentCard];
        
            for (let j = i + 1; j < sortedArr.length; j++) {
              const nextCard = sortedArr[j];
              const nextValue = nextCard.substring(0, nextCard.length - 1);
              const nextSuit = nextCard.charAt(nextCard.length - 1);
        
              if (
                valueOrder.indexOf(nextValue) === valueOrder.indexOf(currentCard.substring(0, currentCard.length - 1)) + count &&
                nextSuit === currentSuit
              ) {
                count++;
                ladder.push(nextCard);
              }
            }
        
            if (count === 4) {
              return ladder;
            }
          }
        
          return [];
        }

        const hasThreeOfALadder = (deckPlayer) => {
          const valueOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K'];
          const sortedArr = deckPlayer.sort((a, b) => {
            const valueA = a.substring(0, a.length - 1);
            const valueB = b.substring(0, b.length - 1);
            return valueOrder.indexOf(valueA) - valueOrder.indexOf(valueB);
          });

          for (let i = 0; i < sortedArr.length - 2; i++) {
            const currentCard = sortedArr[i];
            const currentSuit = currentCard.charAt(currentCard.length - 1);

            let count = 1;
            const ladder = [currentCard];

            for (let j = i + 1; j < sortedArr.length; j++) {
              const nextCard = sortedArr[j];
              const nextValue = nextCard.substring(0, nextCard.length - 1);
              const nextSuit = nextCard.charAt(nextCard.length - 1);

              if (
                valueOrder.indexOf(nextValue) === valueOrder.indexOf(currentCard.substring(0, currentCard.length - 1)) + count &&
                nextSuit === currentSuit
              ) {
                count++;
                ladder.push(nextCard);
              }
            }

            if (count === 3) {
              return ladder;
            }
          }

          return [];
        }

        /* Cartas a salvar */
        const hasTwoOfALadder = (deckPlayer) => {
          const valueOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K'];
          const sortedArr = deckPlayer.sort((a, b) => {
            const valueA = a.substring(0, a.length - 1);
            const valueB = b.substring(0, b.length - 1);
            return valueOrder.indexOf(valueA) - valueOrder.indexOf(valueB);
          });

          for (let i = 0; i < sortedArr.length - 2; i++) {
            const currentCard = sortedArr[i];
            const currentSuit = currentCard.charAt(currentCard.length - 1);

            let count = 1;
            const ladder = [currentCard];

            for (let j = i + 1; j < sortedArr.length; j++) {
              const nextCard = sortedArr[j];
              const nextValue = nextCard.substring(0, nextCard.length - 1);
              const nextSuit = nextCard.charAt(nextCard.length - 1);

              if (
                valueOrder.indexOf(nextValue) === valueOrder.indexOf(currentCard.substring(0, currentCard.length - 1)) + count &&
                nextSuit === currentSuit
              ) {
                count++;
                ladder.push(nextCard);
              }
            }

            if (count === 2) {
              return ladder;
            }
          }

          return [];
        }

        const isWinner = (deckPlayerOne, deckPlayerTwo) => {

            useEffect(() => {
              const detWinner = (deckPlayerOne, deckPlayerTwo) => {
                if (quarter.length === 0){
                  if (activePlayer === 1) {
                    setQuarter(hasFourOfAKind(deckPlayerOne))
                  }else{
                    setQuarter(hasFourOfAKind(deckPlayerTwo))
                  }
                  if (quarter.length === 0){
                    if (activePlayer === 1) {
                      setQuarter(hasFourOfALadder(deckPlayerOne))
                    }else{
                      setQuarter(hasFourOfALadder(deckPlayerTwo))
                    }
                  }
                }

                if(triadOne.length === 0) {
                  if (activePlayer === 1) {
                    setTriadOne(hasThreeOfAKind(deckPlayerOne))
                  }else{
                    setTriadOne(hasThreeOfAKind(deckPlayerTwo))
                  }
                  if(triadOne.length === 0){
                    if (activePlayer === 1) {
                      setTriadOne(hasThreeOfALadder(deckPlayerOne))
                    }else{
                    setTriadOne(hasThreeOfALadder(deckPlayerTwo))
                    }
                  }
                }

                if(triadTwo.length === 0){
                  if (activePlayer === 1) {
                    setTriadTwo(hasThreeOfAKind(deckPlayerOne))
                  }else{
                    setTriadTwo(hasThreeOfAKind(deckPlayerOne))
                  }
                  if(triadTwo.length === 0){
                    if (activePlayer === 1) {
                      setTriadTwo(hasThreeOfALadder(deckPlayerOne))
                    }else{
                      setTriadTwo(hasThreeOfALadder(deckPlayerTwo))
                    }
                  }
                }
              }  
              detWinner();
            }, [deckPlayerOne, deckPlayerTwo, quarter, triadOne, triadTwo])

            if (quarter.length !== 0 && triadOne.length !== 0 && triadTwo.length !== 0){
              winFlag = true;
              if (activePlayer === 1) {
                setWinPlayer(1);
              }else{
                setWinPlayer(2);
              }
            }
        }

        const isSave = (deckPlayerOne, deckPlayerTwo)=>{
           if (winFlag === false){
            isWinner(deckPlayerOne, deckPlayerTwo);
            if (!winFlag) {
              if (quarter !== 0 && save.length < 9) {
                setSave((prevSave) => [...prevSave, quarter]);
              }
              if (triadOne !== 0 && save.length < 9) {
                setSave((prevSave) => [...prevSave, triadOne]);
              }
              if (triadTwo !== 0 && save.length < 9) {
                setSave((prevSave) => [...prevSave, triadTwo]);
              }
            
              if (activePlayer === 1) {
                setSave((prevSave) => [
                  ...prevSave,
                  hasTwoOfAKind(deckPlayerOne),
                  hasFourOfALadder(deckPlayerOne),
                ]);
              } else {
                setSave((prevSave) => [
                  ...prevSave,
                  hasTwoOfAKind(deckPlayerTwo),
                  hasTwoOfALadder(deckPlayerTwo),
                ]);
              }
            } else {
              setSave([]);
            }
            
            useEffect(() => {
              setSave([]);
            }, [activePlayer]);
           }
        }

        const isDelete = (deckPlayer) =>{
          for (let i = 0; i < deckPlayer.length; i++){
            if (i >= 0 && i < deckPlayer.length) {
              const cardToReplace = deckPlayer[i];
              const isCardInSave = save.some((savedCard) => savedCard.value === cardToReplace.value && savedCard.suit === cardToReplace.suit);
          
              if (!isCardInSave) {
                const newCard = getCard(); // Función para obtener una nueva carta
          
                if (activePlayer === 1) {
                  setDeckPlayerOne((prevDeck) => {
                    const newDeck = [...prevDeck];
                    newDeck[i] = newCard;
                    return newDeck;
                  });
                }else{
                  setDeckPlayerTwo((prevDeck) => {
                    const newDeck = [...prevDeck];
                    newDeck[i] = newCard;
                    return newDeck;
                  });
                }
              }
            }
          }
        }

        isSave(deckPlayerOne, deckPlayerTwo);
        isDelete(deckPlayerOne, deckPlayerTwo);

      }else{
        return (
          <>
        <Button onClick={handleWin}>¡Win!</Button>
        <Modal show={modalOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>¡Congratulations!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src= {Winner} alt="Winner" />
            <button className="button2_disable">The winner player is {winPlayer}</button>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button2" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </>
        )
      }
      
    const data = {getCardsOne, getCardsTwo, deckPlayerOne, deckPlayerTwo}
    
    
    return (
        <CardsContext.Provider value={data}>
            {children}
        </CardsContext.Provider>

    )
}

export {CardsProvider}
export default CardsContext;