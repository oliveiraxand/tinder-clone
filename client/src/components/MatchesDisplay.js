import axios from "axios";
import { useEffect, useState } from 'react';

const MatchesDisplay = ({ matches }) => {
  const matchedUserIds = matches?.map(({ user_id }) => user_id)
  const [matchedProfile, setMatchedProfile] = useState([])
  const getMatches = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users', {
        params: { userIds: JSON.stringify(matchedUserIds) }
      })
      setMatchedProfile(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMatches()
  });

  console.log(matchedProfile)
  
  return (
    <div className="matches-display">
      {matchedProfile?.map((match, index) => (
        <div key={index} className="match-card">
          <div className="img-container">
            <img src={match.url} alt={`${match.first_name} profile`} />
          </div>
          <h3>{match.first_name}</h3>
        </div>
      ))}
    </div>
  );
  
}

export default MatchesDisplay;