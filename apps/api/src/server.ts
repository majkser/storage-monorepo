import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './controllers/auth';
import passport from 'passport';
import session from 'express-session';
import fileRoutes from './routes/file.routes';
import authRoutes from './routes/authRoutes';
import linkRoutes from './routes/linkRoutes';
import fileAccessRoutes from './routes/fileAccessRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:8081'],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);

app.use('/api/files', fileRoutes);

app.use('/api/link', linkRoutes);

app.use('/api/file-access', fileAccessRoutes);

app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
