import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import GetNameModal from '../components/GetNameModal';
import Courts from '../components/Courts';
import Banner from '../components/Banner';

import EditIcon from '@mui/icons-material/Edit';
import { BASE_API, Team, Player, Item, getWaitTime } from '../components/constants';
import { Email } from '@mui/icons-material';

const Cookie = require("js-cookie");
const cookie = require("cookie");

const parseCookies = (req: any) => {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

type Props = {
  initialPlayerId?: string;
  initialCourtView?: number; 
};

const Home: NextPage<Props> = ({ initialPlayerId, initialCourtView }) => {

  
  const [nameModalOpen, setNameModalOpen] = useState<boolean>(false);
  const [player, setPlayer] = useState<Player | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [courtView, setCourtView] = useState(initialCourtView ? initialCourtView : 0);

  const createOrModifyPlayer = async (name: string, email: string) => {
    const res = await fetch(BASE_API + "/player/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "playerName": name,
        "playerEmail": email,
        "created": Date.now()/1000
      })
    });

    const data = await res.json();
    setPlayer({
      "playerId": data.playerId,
      "name": name,
      "email": email,
      "created": data.created,
    })
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
  }, [player, courtView]);



  return (
    <div className={styles.container}>

      <Banner
        player={player}
        teams={teams}
        setNameModalOpen={setNameModalOpen}
      />
      
      <GetNameModal
        open={nameModalOpen || !initialPlayerId || !player}
        handleOpenChange={setNameModalOpen}
        handleUserSubmission={createOrModifyPlayer}
      />
    
      <div className={styles.mb1}>
         <Courts
            courtView={courtView}
            setCourtView={setCourtView}
            teams={teams}
            setTeams={setTeams}
            player={player}
            setPlayer={setPlayer}
          />
      </div>
    </div>
  )
};

Home.getInitialProps = async ({ req }) => {
  const cookies = await parseCookies(req);
  return {
    initialPlayerId: String(cookies.playerId),
    initialCourtView: Number(cookies.courtView)
  };
};

export default Home
