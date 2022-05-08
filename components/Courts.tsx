import { SyntheticEvent } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TeamQueue from './TeamQueue';
import CallNext from './CallNext';
import { Team, Player } from './constants';
import CourtStatus from './CourtStatus';


type Props = {
  courtView: number;
  setCourtView: (courtView: number) => void;
  teams: Team[];
  setTeams: (team: Team[]) => void;
  player: Player | null;
  setPlayer: (player: Player) => void;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Courts: React.FC<Props> = ({ courtView, setCourtView, teams, setTeams, player, setPlayer }) => {

  const getTeamsOnCourt = (court: number, teams: Team[]) => {
    let teamsOnCourt: Team[] = [];
    let sortedTeams = teams.sort((a: Team, b: Team) => {
      return (Number(a.created) - Number(b.created))
    })
    sortedTeams.map((team: Team) => {
      if (team.court === court) {
        teamsOnCourt.push(team);
      }
    })
    return teamsOnCourt;
  }
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setCourtView(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box style={{paddingTop: ".8em"}}>
           {children}
          </Box>
        )}
      </div>
    );
  }

  const setTeam = (changedTeam: Team) => {
    let teamsCopy: Team[] = [];
    let newTeam = true;
    teams.map((team: Team) => {
      if (team.teamId === changedTeam.teamId) {
        if (changedTeam.players.length > 0) {
          teamsCopy.push(changedTeam);
        }
        newTeam = false;
      } else {
        teamsCopy.push(team);
      }
    })
    if (newTeam) {
      teamsCopy.push(changedTeam);
    }
    setTeams(teamsCopy);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={courtView} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Court 1"/>
          <Tab label="Court 2"/>
          <Tab label="Court 3"/>
        </Tabs>
      </Box>
      <TabPanel value={courtView} index={0}>
        <CourtStatus
          setTeam={setTeam}
          player={player}
          setPlayer={setPlayer}
          teams={getTeamsOnCourt(1, teams)}
        />
        <TeamQueue
          teams={getTeamsOnCourt(1, teams)}
          setTeam={setTeam}
          player={player}
          setPlayer={setPlayer}
        />
        <div style={{marginTop: "1em"}}>
          <CallNext addTeam={setTeam} player={player} setPlayer={setPlayer} court={1}/>
        </div>      </TabPanel>
      <TabPanel value={courtView} index={1}>
        <CourtStatus
          setTeam={setTeam}
          teams={getTeamsOnCourt(2, teams)}
          player={player}
          setPlayer={setPlayer}
        />
        <TeamQueue
          teams={getTeamsOnCourt(2, teams)}
          setTeam={setTeam}
          player={player}
          setPlayer={setPlayer}
        />
        <div style={{marginTop: "1em"}}>
          <CallNext addTeam={setTeam} player={player} setPlayer={setPlayer} court={2}/>
        </div>      </TabPanel>
      <TabPanel value={courtView} index={2}>
        <CourtStatus
          setTeam={setTeam}
          teams={getTeamsOnCourt(3, teams)}
          player={player}
          setPlayer={setPlayer}
        />
        <TeamQueue
          teams={getTeamsOnCourt(3, teams)}
          setTeam={setTeam}
          player={player}
          setPlayer={setPlayer}
        />
        <div style={{marginTop: "1em"}}>
          <CallNext addTeam={setTeam} player={player} setPlayer={setPlayer} court={3}/>
        </div>
      </TabPanel>
  </Box>
  )
};

export default Courts;

