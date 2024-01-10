import axios from "axios";
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";

const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const matchedUserIds = matches?.map(({ user_id }) => user_id);
  const userId = cookies.UserId;

  const getMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches();
  }, [matches]);


  const filteredMatchedProfiles = matchedProfiles?.filter(
    (matchedProfile) =>
      matchedProfile?.matches?.filter((profile) => profile.user_id === userId)
        .length > 0
  );
  // https://img.freepik.com/free-photo/glamour-stylish-woman-model-summer-bright-cloth-street_158538-2482.jpg?w=740&t=st=1704918835~exp=1704919435~hmac=c8bb78901bfe5219842da1533a198380363c5fb414ef2281877362cf06ff11fa
  return (
  <div className="matches-display">
      {filteredMatchedProfiles?.map((match, index) => (
        <div key={index} className="match-card" onClick={() => setClickedUser(match)}>
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