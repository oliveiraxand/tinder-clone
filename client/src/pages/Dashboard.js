import { useState } from "react";
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";

const Dashboard = () => {
  const url1 = 'https://img.freepik.com/fotos-gratis/retrato-de-mulher-feliz-e-elegante-senior_329181-2250.jpg?w=360&t=st=1704049282~exp=1704049882~hmac=255066f0b1fa7346aaa8c689ef84fd475c67448170b8f0e32f4a0756964d26e5';
  const db = [
    {
      name: 'Richard Hendricks',
      url: url1
    },
    {
      name: 'Erlich Bachman',
      url: url1
    },
    {
      name: 'Monica Hall',
      url: url1
    },
    {
      name: 'Jared Dunn',
      url: url1
    },
    {
      name: 'Dinesh Chugtai',
      url: url1
    }
  ]

  const characters = db;
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div className="dashboard">
      <ChatContainer />
      <div className="swipe-container">
        <div className="card-container">
          {characters.map((character) =>
            <TinderCard 
              className='swipe'
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div style={{ backgroundImage: 'url(' + character.url + ')' }} 
                className='card'
              ><h3>{character.name}</h3>
              </div>
            </TinderCard>
          )}
            <div className="swipe-info">
              {lastDirection ? <p>You swiped { lastDirection }</p> : <p />}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;