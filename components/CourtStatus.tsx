import { useState, useEffect, SyntheticEvent } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TeamQueue from './TeamQueue';
import CallNext from './CallNext';
import { BASE_API, Team, Player, Item, modalStyle } from './constants';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

type Props = {
  teams: Team[];
  setTeam: (team: Team) => void;
  player: Player;
  setPlayer: (player: Player) => void;
  addTeam?: (newTeamId: string, teamCourt: number) => void;
};

const CourtStatus: React.FC<Props> = ({  teams, setTeam, player, setPlayer, addTeam }) => {

  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [notSelectedTeam, setNotSelectedTeam] = useState(teams[1]);

  const teamButtonPressed = (selectedTeam: Team, notSelectedTeam: Team) => {
    setSelectedTeam(selectedTeam);
    setNotSelectedTeam(notSelectedTeam);
    setOpen(true);
  }

  const postLeaveTeam = async (player: Player, team: Team) => {
    const res = await fetch(BASE_API + "/team/leave", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"playerId": player.playerId})
    });
    let playerCopy = player;
    playerCopy.teamId = undefined;
    let teamCopy: Team = team;
    let teamPlayers: Player[] = [];
    team.players.map((teamPlayer) => {
      if (teamPlayer.playerId !== player.playerId) {
        teamPlayers.push(teamPlayer);
      }
    })
    teamCopy.players = teamPlayers;
    setTeam(teamCopy);
  }

  const handleLoose = (team: Team) => {
    team.players.map((teamPlayer: Player) => {
      if (teamPlayer.playerId === player.playerId) {
        let copyPlayer = player;
        copyPlayer.teamId = undefined;
        setPlayer(copyPlayer);
      }
      postLeaveTeam(teamPlayer, team);
    })
  }

  return (
    <Box>
        <div style={{marginBottom: "1em"}}>
            <Item>
                <div style={{
                    textAlign: "center",
                    padding: ".5em"
                }}>
                    <div>
                        {(teams[0] && teams[1]) ? "Current Game: " : "Next Game: "} 
                        {(teams[0]) ? 
                          <Button 
                            variant="outlined"
                            size="small"
                            onClick={() => teamButtonPressed(teams[0], teams[1])}
                          >{teams[0].teamName}</Button> 
                          : <Button variant="outlined" size="small" disabled>Waiting</Button>} 

                          {" vs "} 

                          {(teams[1]) ? 
                          <Button 
                            variant="outlined"
                            size="small"
                            onClick={() => teamButtonPressed(teams[1], teams[0])}
                          >{teams[1].teamName}</Button> 
                          : <Button variant="outlined" size="small" disabled>Waiting</Button>}
                    </div>
                </div>
            </Item>
        </div>

        
        {(selectedTeam !== undefined) && <Modal
          open={open}
          onClose={()=>setOpen(false)}  
        >
          <Box sx={modalStyle}>
            <Grid container spacing={1} columns={12}>
              <Grid item xs={6}>
                <Item style={{height: "135px"}}>
                  {selectedTeam.teamName} Players: 
                  {selectedTeam.players.map((player: Player) => {
                    return <div key={player.playerId}>- {player.name}</div>
                  })}
                  {(selectedTeam.players.length < 5) ? `*Note: Needs ${5 - selectedTeam.players.length} more!` : ""}
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item style={{height: "135px"}}>
                  <div style={{textAlign: "center"}}>Did {selectedTeam.teamName}: 
                    <Button onClick={() => handleLoose(notSelectedTeam)}>Win</Button>
                    <Button onClick={() => handleLoose(selectedTeam)}>Loose</Button>
                  </div>
                  <div style={{textAlign: "center"}}>
                    Leave Game?
                    <Button onClick={() => handleLoose(selectedTeam)}>Yes</Button>
                  </div>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Modal>}
    </Box>
  )
};

export default CourtStatus;