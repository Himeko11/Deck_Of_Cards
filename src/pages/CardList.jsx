import { useContext, useEffect} from "react"
import CardsContext from "../context/CardsContext";

const CardList = ({playerOne, playerTwo}) => {

  const {getCardsOne, getCardsTwo, getCard, deckPlayerOne, deckPlayerTwo} = useContext(CardsContext);

  useEffect(() => {
    getCardsOne();
    getCardsTwo();
  }, []);


  return (
    <>

      <button className="button1" onClick={getCard}>Cards</button>

      <h2>{`Player One is ${playerOne}`}</h2>
      <h3>Cards Obtained</h3>
      {deckPlayerOne.map(
        (deckOne) => (
          <img key={deckOne.code} src={deckOne.image} />
        )
      )}

      <h2>{ playerTwo ? `Player Two is ${playerTwo}` : 'Machine Player'}</h2>
      <h3>Cards Obtained</h3>
      {deckPlayerTwo.map(
        (deckTwo) => (
          <img key={deckTwo.code} src={deckTwo.image} />
        )
      )}
    </>
  )
}

export default CardList