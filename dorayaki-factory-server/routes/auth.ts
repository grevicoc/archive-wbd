import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import connection from '../db/database';
import bcrypt from 'bcryptjs';
import { SECRET_KEY } from '../config/token';

const authRouter = Router();

authRouter.use((req, res, next) => {
  console.log('Request made to /auth route');
  next();
});

authRouter.post('/register', (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!(email && password && username)) {
      return res.status(400).send('All input is required');
    }

    // check existing user
    connection.execute('SELECT * FROM user WHERE email = ?', [email], function (err, result) {
      console.log(result);
      if (err) {
        return res.status(500).send({ error: err });
      } else if (Array.isArray(result) && result.length !== 0) {
        return res.status(400).send({ error: 'User is already registered!' });
      } else {
        // encrypt password
        bcrypt.hash(password, 5, (err, hash) => {
          if (err) {
            return res.status(500).send({ error: err });
          } else {
            // insert user
            connection.execute(
              'INSERT INTO USER (email, username, password) values (?, ?, ?)',
              [email, username, hash],
              function (err) {
                if (err) {
                  return res.status(500).send({ error: err });
                } else {
                  return res.status(200).send({ username: username, email: email });
                }
              }
            );
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error });
  }
});

authRouter.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    // check valid user
    connection.execute(
      'SELECT * FROM user WHERE username = ?',
      [username],
      function (err, results) {
        if (err) {
          return res.status(500).send({ error: err });
        } else if (Array.isArray(results) && results.length !== 0 && 'password' in results[0]) {
          const passwordIsValid = bcrypt.compareSync(password, results[0].password);
          if (!passwordIsValid) {
            return res.status(400).send({ error: 'Username or password is invalid' });
          } else {
            const token = sign({ username: username }, SECRET_KEY, {
              expiresIn: '24h',
            });

            return res.status(200).send({ username: username, token: token });
          }
        } else {
          return res.status(400).send({ error: 'Username or password is invalid' });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error });
  }
});

export default authRouter;
