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

    const winFlag = false;

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
        setDeckPlayerOne([...deckPlayerOne, data.cards]);
        setActivePlayer(2);
      }else{
        setDeckPlayerTwo([...deckPlayerTwo, data.cards]);
        setActivePlayer(1);
      }

      if(winFlag === false){

        const hasFourOfAKind = (deckPlayer) => {
          const values = {};
          const suits = {};

          for (let i = 0; i < deckPlayer.length; i++){
            const card = deckPlayer[i];
            const value = card.value;
            const suit = card.suit;

            values[value] = values[value] ? values[value] + 1 : 1;
            suits[suit] = true;
          }

          const isFourOfAKind = Object.values(values).includes(4) && Object.keys(suits).length === 4;

          if (isFourOfAKind) {
            return values;
          }else{
            return null;
          }
        }

        const hasThreeOfAKind = (deckPlayer) => {
          const values = {};
          const suits = {};

          for (let i = 0; i < deckPlayer.length; i++){
            const card = deckPlayer[i];
            const value = card.value;
            const suit = card.suit;

            values[value] = values[value] ? values[value] + 1 : 1;
            suits[suit] = true;
          }

          const isThreeOfAKind = Object.values(values).includes(3) && Object.keys(suits).length === 3;

          if (isThreeOfAKind) {
            return values;
          }else{
            return null;
          }
        }

        /* Cartas a salvar */
        const hasTwoOfAKind = (deckPlayer) => {
          const values = {};
          const suits = {};

          for (let i = 0; i < deckPlayer.length; i++){
            const card = deckPlayer[i];
            const value = card.value;
            const suit = card.suit;

            values[value] = values[value] ? values[value] + 1 : 1;
            suits[suit] = true;
          }

          const isThreeOfAKind = Object.values(values).includes(2) && Object.keys(suits).length === 2;

          if (isThreeOfAKind) {
            return values;
          }else{
            return null;
          }
        }

        const hasFourOfALadder = (deckPlayer) => {
          const suits = {}
          let sortedValues = {}
          let isFourLadder = false;

          for (let i = 0; i < deckPlayer.length; i++){
            const card = deckPlayer[i]
            const suit = card.slice(card.suit)

            suits[suit] = suits[suit] ? suits[suit] + 1 : 1;
          }

          const suitKeys = Object.keys(suits);

          if(suitKeys.length === 1){
            sortedValues = deckPlayer
              .map((card) => card.slice(card.value ,card.suit))
              .sort((a, b) => {
                const valueOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K'];
                return valueOrder.indexOf(a) - valueOrder.indexOf(b);
            });

            for(let i = 0; i < sortedValues.length - 3; i++){
              const startValue = sortedValues[i];
              const endValue = sortedValues[i + 3];
              const isConsecutive = startValue === endValue;

              if (isConsecutive) {
                isFourLadder = true;
                break;
              }
            }
          }
          if (isFourLadder) {
            return sortedValues;
          }else{
            return null;
          }
        }

        const hasThreeOfALadder = (deckPlayer) => {
          const suits = {}
          let sortedValues = {}
          let isThreeLadder = false;

          for (let i = 0; i < deckPlayer.length; i++){
            const card = deckPlayer[i]
            const suit = card.slice(card.suit)

            suits[suit] = suits[suit] ? suits[suit] + 1 : 1;
          }

          const suitKeys = Object.keys(suits);

          if(suitKeys.length === 1){
            sortedValues = deckPlayer
              .map((card) => card.slice(card.value ,card.suit))
              .sort((a, b) => {
                const valueOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K'];
                return valueOrder.indexOf(a) - valueOrder.indexOf(b);
            });

            for(let i = 0; i < sortedValues.length - 2; i++){
              const startValue = sortedValues[i];
              const endValue = sortedValues[i + 2];
              const isConsecutive = startValue === endValue;

              if (isConsecutive) {
                isThreeLadder = true;
                break;
              }
            }
          }
          if (isThreeLadder) {
            return sortedValues;
          }else{
            return null;
          }
        }

        /* Cartas a salvar */
        const hasTwoOfALadder = (deckPlayer) => {
          const suits = {}
          let sortedValues = {}
          let isThreeLadder = false;

          for (let i = 0; i < deckPlayer.length; i++){
            const card = deckPlayer[i]
            const suit = card.slice(card.suit)

            suits[suit] = suits[suit] ? suits[suit] + 1 : 1;
          }

          const suitKeys = Object.keys(suits);

          if(suitKeys.length === 1){
            sortedValues = deckPlayer
              .map((card) => card.slice(card.value ,card.suit))
              .sort((a, b) => {
                const valueOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K'];
                return valueOrder.indexOf(a) - valueOrder.indexOf(b);
            });

            for(let i = 0; i < sortedValues.length - 1; i++){
              const startValue = sortedValues[i];
              const endValue = sortedValues[i + 1];
              const isConsecutive = startValue === endValue;

              if (isConsecutive) {
                isThreeLadder = true;
                break;
              }
            }
          }
          if (isThreeLadder) {
            return sortedValues;
          }else{
            return null;
          }
        }

        const isWinner = () => {
            const [quarter, setQuarter] = useState([]);
            const [triadOne, setTriadOne] = useState([]);
            const [triadTwo, setTriadTwo] = useState([]);

            useEffect(() => {
              while (quarter.length === 0 || triadOne.length === 0 || triadTwo.length === 0 ){
                const detWinner = () => {
                  if (quarter.length === 0){
                    
                  }

                  if(triadOne.length === 0) {

                  }

                  if(triadTwo.length === 0){

                  }
                }
              }
            })

        }

      }else{
        return(
          <>
        <Button onClick={handleWin}>¡Win!</Button>
        <Modal show={modalOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>¡Congratulations!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src= {Winner} alt="Winner" />
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

    }
      
    const data = {getCardsOne, getCardsTwo, getCard, deckPlayerOne, deckPlayerTwo}
    
    
    return (
        <CardsContext.Provider value={data}>
            {children}
        </CardsContext.Provider>

    )
}

export {CardsProvider}
export default CardsContext;