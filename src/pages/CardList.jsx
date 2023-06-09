import { useState } from "react"

const CardList = ({cardsOne, cardsTwo}) => {

  const [deckCardsOne] = useState([]);
  const [deckCardsTwo] = useState([]);


  return (
    <>
      <h2>{cardsOne.IdPlayer ? `Player One is ${cardsOne.IdPlayer}` : ''}</h2>
      <h3>Cards Obtained</h3>
      {deckCardsOne.map(
        deckOne => (
          <img key={deckOne.code} src={deckOne.image} />
        )
      )}

      <h2>{cardsTwo.IdPlayer ? `Player Two is ${cardsTwo.IdPlayer}` : 'Machine Player'}</h2>
      <h3>Cards Obtained</h3>
      {deckCardsTwo.map(
        deckTwo => (
          <img key={deckTwo.code} src={deckTwo.image} />
        )
      )}

      <button className="button1">Cards</button>
    </>
  )
}

export default CardList