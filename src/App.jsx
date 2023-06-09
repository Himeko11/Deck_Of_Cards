
import Header from "./components/Header"
import Login from "./pages/Login"
import CardList from "./pages/CardList"
import NotFound from "./pages/NotFound"


import { useState } from "react"
import { Container } from "@mui/material"
import { UserProvider } from "./context/UserContext"
import { CardsProvider } from "./context/CardsContext"
import { Route, Routes,  BrowserRouter as Router} from "react-router-dom"


const App = () => {

  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');


  return (
    <div className="back-image">
      <Router>
        <UserProvider>
          <CardsProvider>
            <Container>
              <Routes>
                <Route path="/" element={<Header/>}>
                  <Route path="/" element={<Login setPlayerOne={setPlayerOne} setPlayerTwo={setPlayerTwo} />} />
                  <Route path="CardList" element={<CardList playerOne={playerOne} playerTwo={playerTwo} />} />
                  <Route path="/*" element={<NotFound />} />
                </Route>
              </Routes>
            </Container>
          </CardsProvider>
        </UserProvider>
      </Router>
    </div>
  )
}

export default App;