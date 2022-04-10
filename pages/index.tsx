import { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import TeamQueue from '../components/TeamQueue'
import AddTeamButton from '../components/AddTeamButton'

const Home: NextPage = () => {

  const initArray: Array<string> = ["Sebastien's first Team"];
  const [teamIds, setTeamIds] = useState<Array<string>>(initArray);
  const addTeam = (newTeam: string) => {
    const currTeam = [...teamIds];
    currTeam.push(newTeam);
    setTeamIds(currTeam);
  };

  return (
    <div className={styles.container}>
      <AddTeamButton addTeam={addTeam}/>
      <TeamQueue teamIds={teamIds}/>
    </div>
  )
}

export default Home
