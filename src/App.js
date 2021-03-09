import { Client } from 'boardgame.io/react';
import { WordWarriors } from './Game';

const App = Client({ game: WordWarriors });

export default App;