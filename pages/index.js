import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import db from '../db.json';
import Widget from '../src/components/WIdget';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  function enviar(e) {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>
          Quiz - Modelo Base
        </title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header><h1>The legend of gabs</h1></Widget.Header>
          <Widget.Content>
            <h1>O jogo</h1>
            <p>Perdeu doido.</p>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <form onSubmit={(e) => enviar(e)}>
              <Input placeholder="Nome" onChange={(e) => setName(e.target.value)} />
              <Button type="submit" className="main" disabled={name.length === 0}>
                Jogar
                {' '}
                {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GithubCorner />
    </QuizBackground>
  );
}
