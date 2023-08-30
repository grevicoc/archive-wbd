import { Router } from 'express';
import connection from '../db/database';

const resepRouter = Router();

resepRouter.use((req, res, next) => {
  console.log('Request made to /resep route');
  next();
});

resepRouter.post('/createResep', (req, res) => {
  try {
    const { nama_resep, bahan_baku } = req.body;
    console.log(nama_resep);
    console.log(bahan_baku);

    if (!nama_resep || bahan_baku.length == 0) {
      return res.status(400).send('All input is required');
    }

    // check existing name of recipe
    connection.execute(
      'SELECT nama_resep FROM resep WHERE nama_resep = ?',
      [nama_resep],
      function (err, result) {
        if (err) {
          return res.status(500).send({ error: err });
        } else if (Array.isArray(result) && result.length !== 0) {
          return res.status(400).send({ error: 'Name is already taken!' });
        } else {
          // insert recipe
          connection.execute(
            'INSERT INTO resep (nama_resep) VALUES (?)',
            [nama_resep],
            function (err) {
              if (err) {
                return res.status(500).send({ error: err });
              } else {
                connection.execute(
                  'SELECT id_resep FROM resep where nama_resep = ?',
                  [nama_resep],
                  function (err, hasil) {
                    if (err) {
                      return res.status(500).send({ error: err });
                    } else {
                      for (let i = 0; i < bahan_baku.length; i++) {
                        if (Array.isArray(hasil) && 'id_resep' in hasil[0]) {
                          const idresep = hasil[0].id_resep;
                          connection.execute(
                            'SELECT id_bahan_baku FROM bahan_baku where nama_bahan_baku = ?',
                            [bahan_baku[i].nama_bahan],
                            function (err, resu) {
                              console.log(resu);
                              if (
                                Array.isArray(resu) &&
                                typeof resu[0] !== 'undefined' &&
                                'id_bahan_baku' in resu[0]
                              ) {
                                const idbahanbaku = resu[0].id_bahan_baku;
                                connection.execute(
                                  'INSERT INTO bahan_baku_resep (id_bahan_baku, id_resep, jumlah) VALUES (?,?,?)',
                                  [idbahanbaku, idresep, bahan_baku[i].jumlah],
                                  function (err) {
                                    if (err) {
                                      return res.status(500).send({ error: err });
                                    }
                                  }
                                );
                              } else {
                                connection.execute(
                                  'INSERT INTO bahan_baku (nama_bahan_baku, stok) VALUES (?, ?)',
                                  [bahan_baku[i].nama_bahan, 0],
                                  function (err) {
                                    if (err) {
                                      return res.status(500).send({ error: err });
                                    }
                                  }
                                );

                                connection.execute(
                                  'INSERT INTO bahan_baku_resep (id_bahan_baku, id_resep, jumlah) VALUES (LAST_INSERT_ID(),?,?)',
                                  [idresep, bahan_baku[i].jumlah],
                                  function (err) {
                                    if (err) {
                                      return res.status(500).send({ error: err });
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                      return res
                        .status(200)
                        .send({ nama_resep: nama_resep, bahan_baku: bahan_baku });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error });
  }
});

resepRouter.get('/allResep', (req, res) => {
  try {
    connection.execute('SELECT * FROM resep', function (err, results) {
      console.log(results);
      if (err) {
        return res.status(500).send({ error: err });
      } else {
        return res.status(200).send({ results });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error });
  }
});

resepRouter.get('/detailResep/:id_resep', (req, res) => {
  try {
    const id_resep = req.params.id_resep;
    connection.execute(
      'SELECT resep.nama_resep, resep.id_resep, bahan_baku.nama_bahan_baku, bahan_baku.id_bahan_baku, jumlah FROM resep INNER JOIN bahan_baku_resep on resep.id_resep = bahan_baku_resep.id_resep and resep.id_resep = ? INNER JOIN bahan_baku on bahan_baku.id_bahan_baku = bahan_baku_resep.id_bahan_baku',
      [id_resep],
      function (err, results) {
        console.log(results);
        if (err) {
          return res.status(500).send({ error: err });
        } else {
          return res.status(200).send({ results });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error });
  }
});

export default resepRouter;
