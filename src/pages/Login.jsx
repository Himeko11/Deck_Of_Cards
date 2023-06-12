import { useState } from "react";
import Player from "../../images/player.png";
import { Link } from "react-router-dom";


const Login = ({setPlayerOne, setPlayerTwo}) => {
   
  const [inputValue, setInputValue] = useState('');
  const [isLinkEnabled, setIsLinkEnabled] = useState(false);

  const stateHandle = (e) => {
    setInputValue({...inputValue, [e.target.name]:e.target.value});
    setIsLinkEnabled(e.target.value.trim() !== "");
  }

  

  const stateSubmit = (e) =>{
    setPlayerOne(inputValue.playerOne);
    setPlayerTwo(inputValue.playerTwo);
    if (!isLinkEnabled) {
      e.preventDefault();
    }
  }

  return (
    <form action="">
      <div className="container">
          <br /> 
            <div className="input">
              <label htmlFor=""> Player 1 </label>
              <div className="player">
                <img src={Player} alt=""/>
                <input name="playerOne" onChange={stateHandle} type="text" placeholder="Player name"/>
              </div>
            </div>
            <div className="input">
              <label htmlFor=""> Player 2 </label>
              <div className="player">
                <img src={Player} alt=""/>
                <input name="playerTwo" onChange={stateHandle}   type="text" placeholder="Player name"/>
              </div> 
            </div>
      </div>

      {isLinkEnabled ? (
        <Link onClick={stateSubmit} className="button2" id= "button" to="/CardList">Login</Link>
      ) : (
        <button className="button2_disable" id= "button">Login</button>  
      )}

      
    </form>
    
  )
}

export default Login