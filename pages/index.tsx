import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import TeamQueue from '../components/TeamQueue';
import CallNext from '../components/CallNext';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import GetNameModal from '../components/GetNameModal';
import Courts from '../components/Courts';
import Cookie from "js-cookie";
import cookie from "cookie";
import EditIcon from '@mui/icons-material/Edit';
import { BASE_API, Team, Player, Item, getWaitTime } from '../components/constants';

const parseCookies = (req: any) => {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

const Home: NextPage = ({ initialPlayerId, initialCourtView }) => {

  
  const [nameModalOpen, setNameModalOpen] = useState<boolean>(false);
  const [player, setPlayer] = useState<Player | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [courtView, setCourtView] = useState((initialCourtView !== undefined) ? initialCourtView : 0);

  // const addTeamToCourt = (court: number, teamId: string) => {
  //   let courtTeams: Array<string> = [];
  //   if (court === 1) {
  //     courtTeams = [...courtOneTeams];
  //     courtTeams.push(teamId);
  //     setCourtOneTeams(courtTeams);
  //   } else if (court === 2) {
  //     courtTeams = [...courtTwoTeams];
  //     courtTeams.push(teamId);
  //     setCourtTwoTeams(courtTeams);
  //   } else if (court === 3) {
  //     courtTeams = [...courtThreeTeams];
  //     courtTeams.push(teamId);
  //     setCourtThreeTeams(courtTeams);
  //   }
  // }
  const createPlayer = async (name: string) => {
    const res = await fetch(BASE_API + "/player/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"playerName": name, "created": Date.now()/1000})
    });

    const data = await res.json();
    setPlayer({
      "playerId": data.playerId,
      "name": name,
      "created": data.created,
    })
  };

  const addTeam = (newTeamId: string, teamCourt: number) => {
    // const currTeamIds = [...teamIds];
    // const currTeamCourts = [...teamCourts];
    // if (!currTeamIds.includes(newTeamId)) {
    //   currTeamIds.push(newTeamId);
    //   setTeamIds(currTeamIds);
    //   currTeamCourts.push({id: newTeamId, court: teamCourt});
    //   setTeamCourts(currTeamCourts);
    // }
  };
  const init = async () => {
    const res = await fetch(BASE_API + "/team/all/get", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    const teams: Team[] = [];
    data.teamArray.map((team: Team) => {
      teams.push(team);
    });
    setTeams(teams);

    if (player === null) {
      const playerRes = await fetch(BASE_API + "/player/get", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"playerId": initialPlayerId})
      });
      const playerData = await playerRes.json();
      if (playerData.teamId === "None") {
        playerData.teamId = undefined;
      }
      setPlayer(playerData);
    }
  }

  useEffect(() => {
    init();
    if (player !== null) {
      Cookie.set("playerId", player.playerId);
      Cookie.set("courtView", courtView)
    }
  }, [player?.playerId, courtView]);



  return (
    <div className={styles.container}>
      <Item>
         <div className={styles.waitlist}>
           {(player !== null) ? "Hi, " + player.name : ""} <EditIcon fontSize="small" onClick={() => setNameModalOpen(true)}/>
           {` Wait Time ~ ${getWaitTime(teams)} minutes`}
          </div>
      </Item>
      
      {(player === null || nameModalOpen) && <GetNameModal
          open={nameModalOpen}
          handleOpenChange={setNameModalOpen}
          handleChangeName={createPlayer}
        />}
    
      <div className={styles.mb1}>
        {(player !== null) &&
         <Courts
            courtView={courtView}
            setCourtView={setCourtView}
            teams={teams}
            setTeams={setTeams}
            player={player}
            setPlayer={setPlayer}
            addTeam={addTeam}
          />
        }
      </div>
      
    </div>
  )
};

Home.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);
  return {
    initialPlayerId: cookies.playerId,
    initialCourtView: Number(cookies.courtView)
  };
};

export default Home
