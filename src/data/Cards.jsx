const IdPlayer = async () =>{
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    const answ = await fetch(url);
    const data = await answ.json(); 

    return data;
};

export default IdPlayer;