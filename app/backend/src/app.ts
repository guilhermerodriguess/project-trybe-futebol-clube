import * as express from 'express';
import 'express-async-errors';
import Error from './middlewares/error.middleware';
import MatchRoute from './routes/Match.route';
import TeamRoute from './routes/Team.route';
import UserRoute from './routes/User.route';
import LeaderboardRoute from './routes/Leaderboard.route';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/teams', TeamRoute);
    this.app.use('/login', UserRoute);
    this.app.use('/matches', MatchRoute);
    this.app.use('/leaderboard', LeaderboardRoute);
    this.app.use(Error);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
