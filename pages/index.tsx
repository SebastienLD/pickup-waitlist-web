import { useState, useEffect } from 'react';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import TeamQueue from '../components/TeamQueue'
import CallNext from '../components/CallNext'

const BASE_API = "http://localhost:5000";

const Home: NextPage = () => {

  const initArray: Array<string> = [];
  const [teamIds, setTeamIds] = useState(initArray);
  const [inTeam, setInTeam] = useState<boolean>(false);
  const addTeamId = (newTeamId: string) => {
    const currTeamIds = [...teamIds];
    if (!currTeamIds.includes(newTeamId))
    currTeamIds.push(newTeamId);
    setTeamIds(currTeamIds);
  };

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
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.waitlist}>WAITLIST</div>
      <CallNext addTeamId={addTeamId} BASE_API={BASE_API}/>
      <TeamQueue teamIds={teamIds} BASE_API={BASE_API}/>
    </div>
  )
}

export default Home
