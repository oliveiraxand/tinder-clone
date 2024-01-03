import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import { useCookies } from 'react-cookie';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState([]);
  const [lastDirection, setLastDirection] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['user']);


  const userId = cookies.UserId;
  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId }
      })
      // console.log(response.data);
      setUser(response.data);
    } catch(e) {
      console.error(e);
    }
  }

  const getGenderedUsers = async () => {
    const gender = user?.user.gender_interest;
    try {
      const response = await axios.get('http://localhost:8000/gendered-users', {
        params: { gender }
      })
      // console.log('gendered-', response.data);
      setGenderedUsers(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getUser();
  });

  useEffect(() => {
    if (user) {
      getGenderedUsers()
    }
    }, [user])

  // console.log('gender-users', genderedUsers)
  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put('http://localhost:8000/addmatch', {
        userId,
        matchedUserId
      })
      getUser();
    } catch (e) {
      console.error(e);
    }
  }
  
  const swiped = (direction, swipedUserId) => {
    console.log(swipedUserId)
    if(direction === 'right') {
      updateMatches(swipedUserId)
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  const matchedUserIds = user?.user?.matches.map(({ user_id }) => user_id).concat(userId);

  const filteredGenderedUsers = genderedUsers.filter(
    genderedUser => !matchedUserIds?.includes(genderedUser.user_id));

  // console.log('filteredGenderedUsers', filteredGenderedUsers, genderedUsers, user)
  return (
    <>
      { user && <div className="dashboard">
      <ChatContainer user={user}/>
      <div className="swipe-container">
        <div className="card-container">
          {filteredGenderedUsers?.map((genderedUsers) =>
            <TinderCard 
              className='swipe'
              key={genderedUsers.first_name}
              onSwipe={(dir) => swiped(dir, genderedUsers.user_id)}
              onCardLeftScreen={() => outOfFrame(genderedUsers.first_name)}
            >
              <div style={{ backgroundImage: 'url(' + genderedUsers.url + ')' }} 
                className='card'
              ><h3>{genderedUsers.first_name}</h3>
              </div>
            </TinderCard>
          )}
            <div className="swipe-info">
              {lastDirection ? <p>You swiped { lastDirection }</p> : <p />}
            </div>
        </div>
      </div>
    </div>}
    </>
  )
}

export default Dashboard;