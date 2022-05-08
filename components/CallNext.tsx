import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { BASE_API, Team, Player } from './constants';

type Props = {
  player: Player | null;
  addTeam: (team: Team) => void;
  court: number;
  setPlayer: (player: Player) => void;
};

const CallNext: React.FC<Props> = ({ addTeam, court, player, setPlayer }) => {
  
  const handleButtonPress = async () => {
    if (player === null)
      return;
    const res = await fetch(BASE_API + "/team/create", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"created": (Date.now()/1000), "playerId": player.playerId, "court": court})
    });
    const data: Team = await res.json();
    addTeam({
      "teamId": data.teamId,
      "court": court,
      "created": data.created,
      "teamName": data.teamName,
      "players": [player],
    });
    let copyPlayer = player;
    copyPlayer.teamId = data.teamId; 
    setPlayer(copyPlayer)
  }

  return (
    <Box sx={{ width: '100' }}> 
        <Button 
          variant="contained"
          onClick={handleButtonPress}
          disabled={(player === null) || (player.teamId !== undefined)} 
        >Call Next!</Button>
    </Box>
  );
};

export default CallNext;