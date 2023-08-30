import nodemailer from 'nodemailer';
import connection from '../db/database';

const transport = {
  service: 'gmail',
  auth: {
    user: 'bismillahtubesselesai@gmail.com',
    pass: 'Tubesgaselesai2',
  },
};

const getAdminEmail = () => {
  connection.execute('SELECT email FROM user',
  function (err, results) {
    if (err) {
      console.log(err);
      return 'bismillahtubesselesai@gmail.com';
    } else {
      const convertedResult: any = results;
      return convertedResult[0].email;
    }
  })
}

const getNamaDorayaki = (idResep: number) => {
  connection.execute('SELECT nama_resep FROM resep WHERE id_resep = ?',
  [idResep], function (err, results) {
    if (err) {
      console.log(err);
      return 'NoName';
    } else {
      const convertedResult: any = results;
      return convertedResult[0].nama_resep;
    }
  })
}

const sendEmail = (idDorayaki: number, jumlah: number) => {
  const transporter = nodemailer.createTransport(transport);

  const email: any = getAdminEmail();
  const dorayaki = getNamaDorayaki(idDorayaki);

  if (email !== null) {
    const options = {
      from: 'bismillahtubesselesai@gmail.com',
      to: email || 'test@gmail.com',
      subject: 'Incoming New Request From Store',
      text: `Request untuk dorayaki varian ${dorayaki} dengan jumlah ${jumlah}`,
    };

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Sent ' + info.response);
    });
  }
};

export default sendEmail;
