import React from 'react';
import useFetch from '../hooks/useFetch';
import MaterialTable from 'material-table';
import axios from 'axios';
import Swal from 'sweetalert2';

const rows = () => {
  const fetchedData: any = useFetch('http://localhost:3000/bahanbaku/allBahanbaku');
  const bahanbaku = fetchedData.data != null ? fetchedData.data.data : [];
  const retval: any[] = [];
  let i = 1;
  for (const value of bahanbaku) {
    retval.push({
      id: i,
      number: i,
      id_bahan_baku: value.id_bahan_baku,
      nama_bahan_baku: value.nama_bahan_baku,
      stok: value.stok,
    });
    i++;
  }

  return retval;
};

const BahanBaku: any = () => {
  const dataRows = rows();

  const updateData = (newData: any, oldData: any) => {
    const body = {
      id_bahan_baku: oldData.id_bahan_baku,
      stok: newData.stok,
    };
    axios
      .post('http://localhost:3000/bahanbaku/updateStok', body)
      .then((res) => {
        if (res.data.code == 200) {
          Swal.fire('Berhasil', 'Update stok diterima', 'success');
          window.location.reload();
        } else {
          Swal.fire('Gagal !', 'Update stok tidak memenuhi syarat', 'warning');
        }
      })
      .catch((err) => {
        Swal.fire('Gagal !!', err, 'error');
      });
  };

  return (
    <div>
      <div className="judul">
        <p className="text-judul">Daftar Stok Bahan Baku</p>
      </div>
      <MaterialTable
        title="Daftar Stok Bahan Baku"
        columns={[
          { field: 'number', title: 'No', editable: 'never' },
          { field: 'id_bahan_baku', title: 'ID Request', editable: 'never' },
          { field: 'nama_bahan_baku', title: 'Nama Resep', editable: 'never' },
          { field: 'stok', title: 'Jumlah', type: 'numeric' },
        ]}
        data={dataRows}
        editable={{
          onRowUpdate: (newData: any, oldData: any) =>
            new Promise((resolve, reject) => {
              if (newData.stok > 0) {
                updateData(newData, oldData);
                resolve('Berhasil');
              } else {
                reject(new Error('eRROr'));
              }
            }),
        }}
        localization={{
          header: {
            actions: 'Edit Stock',
          },
        }}
      />
    </div>
  );
};
export default BahanBaku;
