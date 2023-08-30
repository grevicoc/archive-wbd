import { Router } from 'express';
import connection from '../db/database';

const bahanbakuRouter = Router();


bahanbakuRouter.use((req, res, next) => {
  console.log('Request made to /bahanbaku route');
  next();
});

bahanbakuRouter.post('/createBahanbaku', (req, res) => {
  try {
    const { nama_bahan_baku, stok } = req.body;
    if (!(nama_bahan_baku && stok)) {
      return res.status(400).send('All input is required');
    }

    // check existing name of bahan baku
    connection.execute('SELECT nama_bahan_baku FROM bahan_baku WHERE nama_bahan_baku = ?', [nama_bahan_baku], function (err, result) {
      if (err) {
        return res.status(500).send({ error: err });
      } else if (Array.isArray(result) && result.length !== 0) {
        return res.status(400).send({ error: 'Name is already taken!' });
      } else {
        // insert bahan baku
        connection.execute('INSERT INTO bahan_baku (nama_bahan_baku, stok) VALUES (?,?)', [ nama_bahan_baku, stok ], function (err) {
          if (err) {
            return res.status(500).send({ error: err });
          } else {
            return res.status(200).send({ nama_bahan_baku: nama_bahan_baku, stok: stok });           
          }
        });
      }
    });
    
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error });
  }
});

bahanbakuRouter.post('/updateStok', (req,res) => {
    try {
        const { id_bahan_baku, stok } = req.body;
        if(!stok) {
            return res.status(400).send('All input is required');
        }
        connection.execute('UPDATE bahan_baku set stok = ? WHERE id_bahan_baku = ?', [stok, id_bahan_baku], (err, results) => {
            if (!err) {
                const response: any = {
                  code: 200,
                  message: 'Succeed getting data request.',
                  data: results,
                };
                return res.status(200).send(response);
            }
            else {
              const response: any = {
                code: 200,
                message: 'Succeed getting data request.',
                data: results,
              };
              return res.status(200).send(response);
            }
        })
    } catch (error) {
      console.log(error);
    }
});

bahanbakuRouter.get('/allBahanbaku', (req, res) => {
  try {
    connection.execute(
      'SELECT * FROM bahan_baku',
      (err, results) => {
        console.log(results);
        if (!err) {
          const response: any = {
            code: 200,
            message: 'Succeed getting data request.',
            data: results,
          };
          return res.status(200).send(response);
        } else {
          const response: any = {
            code: 500,
            message: err,
            data: null,
          };
          return res.status(500).send(response);
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error });
  }
});

export default bahanbakuRouter;
