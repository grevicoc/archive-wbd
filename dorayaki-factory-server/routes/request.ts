import { Router } from 'express';
import connection from '../db/database';
import sendEmail from '../utils/emailer';

const requestRouter = Router();

requestRouter.use((req, res, next) => {
  console.log('Request made to /request route');
  next();
});

//Get All
requestRouter.get('/', (req, res) => {
  connection.execute('SELECT * FROM request', (err, result) => {
    if (!err) {
      const response: any = {
        code: 200,
        message: 'Succeed getting data request.',
        data: result,
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
  });
});

//Get by id
requestRouter.get('/:id', (req, res) => {
  const id: any = req.params.id;
  connection.execute('SELECT * FROM request WHERE id_request = ?', [id], (err, result) => {
    if (!err) {
      const convertedResult: any = result;
      const response: any = {
        code: 200,
        message: 'Succeed getting data request with ID Request: ' + id,
        data: {
          id_request: convertedResult[0].id_request,
          id_recipe: convertedResult[0].id_resep,
          amount: convertedResult[0].jumlah,
          status: convertedResult[0].status
        },
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
  });
});

//Add request
requestRouter.post('/add', (req, res) => {
  console.log(req.body);
  const { id_recipe, amount } = req.body;
  connection.execute(
    'INSERT INTO request (id_resep, jumlah, status, timestamp) VALUES (?, ?, "WAIT", CURTIME())',
    [id_recipe, amount],
    (err, result) => {
      if (!err) {
        const convertedResult: any = result;
        const returnedData: any = {
          id_request: convertedResult.insertId,
          id_recipe: id_recipe,
          amount: amount,
          status: 'WAIT',
        };
        const response: any = {
          code: 200,
          message: 'Request Succeed!',
          data: returnedData,
        };

        sendEmail

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
});

//Decide request
requestRouter.put('/decide', (req, res) => {
  console.log(req.body);
  const { id_request, status } = req.body;

  if (status == 'ACCEPT') {
    let valid_request = true;
    connection.execute(
      'SELECT id_resep FROM request WHERE id_request = ?',
      [id_request],
      (err, result) => {
        if (!err) {
          const convertedResult: any = result;
          const id_resep: any = convertedResult[0].id_resep;

          connection.execute(
            'SELECT * FROM bahan_baku_resep NATURAL INNER JOIN bahan_baku WHERE id_resep = ?',
            [id_resep],
            (err, result) => {
              const convertedResult: any = result;
              for (const bahan_baku of convertedResult) {
                if (bahan_baku.jumlah > bahan_baku.stok) {
                  valid_request = false;
                  break;
                }
              }
              //Update the stock if the stock still available
              if (valid_request) {
                for (const bahan_baku of convertedResult) {
                  connection.execute('UPDATE bahan_baku SET stok = ? WHERE id_bahan_baku = ?', [
                    bahan_baku.stok - bahan_baku.jumlah,
                    bahan_baku.id_bahan_baku,
                  ]);
                }
              } else {
                const response: any = {
                  code: 400,
                  message: 'Stok bahan baku tidak mencukupi!',
                  data: null,
                };
                return res.status(500).send(response);
              }
            }
          );
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
  }

  connection.execute(
    'UPDATE request SET status = ? WHERE id_request = ?',
    [status, id_request],
    (err) => {
      if (!err) {
        const response: any = {
          code: 200,
          message:
            'Request dengan ID ' +
            id_request +
            ' berhasil diubah statusnya menjadi ' +
            status +
            '!',
          data: null,
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
});

export default requestRouter;
