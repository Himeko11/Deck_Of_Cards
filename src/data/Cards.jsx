const Cards = async () =>{
    const url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
    const answ = await fetch(url);
    const info = await answ.json(); 

    return info;
};

export default Cards;