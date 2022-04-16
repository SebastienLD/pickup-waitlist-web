import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import TeamQueue from '../components/TeamQueue';
import CallNext from '../components/CallNext';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import GetNameModal from '../components/GetNameModal';
import Court from '../components/Courts';
import Cookie from "js-cookie";
import cookie from "cookie";

const BASE_API = "http://localhost:5000";

const parseCookies = (req: any) => {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

const Home: NextPage = ({ initialPlayerName, initialPlayerId }) => {

  const initArray: Array<string> = [];
  const [teamIds, setTeamIds] = useState(initArray);
  const [inTeam, setInTeam] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>(initialPlayerName);
  const [playerId, setPlayerId] = useState<string>(initialPlayerId);
  const [nameModalOpen, setNameModalOpen] = useState<boolean>(true);
  const [courtOneTeams, setCourtOneTeams] = useState<Array<string>>(new Array<string>());
  const [courtTwoTeams, setCourtTwoTeams] = useState<Array<string>>(new Array<string>());
  const [courtThreeTeams, setCourtThreeTeams] = useState<Array<string>>(new Array<string>());

  const addTeamToCourt = (court: number, teamId: string) => {
    let courtTeams: Array<string> = [];
    if (court === 1) {
      courtTeams = [...courtOneTeams];
      courtTeams.push(teamId);
      setCourtOneTeams(courtTeams);
    } else if (court === 2) {
      courtTeams = [...courtTwoTeams];
      courtTeams.push(teamId);
      setCourtTwoTeams(courtTeams);
    } else if (court === 3) {
      courtTeams = [...courtThreeTeams];
      courtTeams.push(teamId);
      setCourtThreeTeams(courtTeams);
    }
  }

  const addPlayer = async (name: string) => {
    const res = await fetch(BASE_API + "/player/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"playerName": name, "created": Date.now()/1000})
    });

    const data = await res.json();
    setPlayerName(name);
    setPlayerId(data.playerId);
  };

  const addTeamId = (newTeamId: string) => {
    const currTeamIds = [...teamIds];
    if (!currTeamIds.includes(newTeamId))
    currTeamIds.push(newTeamId);
    setTeamIds(currTeamIds);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  interface TeamId {
    id: string;
  }

  const init = async () => {
    const res = await fetch(BASE_API + "/team/list", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    const teamIds: Array<string> = [];
    data.teamIds.map((teamId: TeamId) => {
      console.log(teamId.id);
      teamIds.push(teamId.id);
    });
    setTeamIds(teamIds);
  }

  useEffect(() => {
    init();
    Cookie.set("playerName", playerName);
    Cookie.set("playerId", playerId);
  }, [playerName, playerId]);



  return (
    <div className={styles.container}>
      <div className={styles.waitlist}>Hi, {playerName}!</div>
      <div className={styles.mb1}>
         {<GetNameModal
            open={nameModalOpen}
            handleOpenChange={setNameModalOpen}
            handleChangeName={addPlayer}
          />}
      </div>
      <div className={styles.mb1}>
        <CallNext addTeamId={addTeamId} BASE_API={BASE_API}/>
      </div>
      <div className={styles.mb1}>
         <Court 
            teamIds={teamIds}
            BASE_API={BASE_API}
            courtOneTeams={courtOneTeams}
            courtTwoTeams={courtTwoTeams}
            courtThreeTeams={courtThreeTeams}
            addTeamToCourt={addTeamToCourt}
          />
      </div>
      <div className={styles.mb1}>
        <TeamQueue 
          teamIds={teamIds}
          BASE_API={BASE_API}
          playerId={playerId}
        />
      </div>
      
    </div>
  )
};

Home.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);
  return {
    initialPlayerName: cookies.playerName,
    initialPlayerId: cookies.playerId
  };
};

export default Home
