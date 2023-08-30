import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { url } from '../../api/api';
import Swal from 'sweetalert2';

interface Bahan {
  nama_bahan: string;
  jumlah: number;
}

// interface NewResep {
//   nama_resep: string;
//   list_bahan: Bahan[];
// }

const AddResepForm = () => {
  const [listInputBahan, setListInputBahan] = useState([{ id: 1 }]);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (e: any) => {
    console.log(e);
    // TODO: Sambungin sama backend

    const listNamaBahan: string[] = [];
    const listJumlahBahan: number[] = [];

    for (const key in e) {
      if (Object.prototype.hasOwnProperty.call(e, key)) {
        if (key.includes('namaBahan')) {
          listNamaBahan.push(e[key]);
        } else if (key.includes('jumlahBahan')) {
          listJumlahBahan.push(parseInt(e[key]));
        }
        const temp = e[key];
        console.log(temp);
      }
    }

    const listBahan: Bahan[] = [];

    listNamaBahan.forEach((namaBahan, i) => {
      listBahan.push({ nama_bahan: namaBahan, jumlah: listJumlahBahan[i] });
    });

    const newResep = {
      nama_resep: e['namaResep'],
      bahan_baku: listBahan,
    };

    axios
      .post(`${url}/resep/createResep`, newResep)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          console.log('POST successful');
          Swal.fire('Submit successful', 'Recipe has been added!', 'success');
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: 'Error has occured',
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      });
  };

  // TODO : add remove input bahan

  const addInputBahanHandler = (e: any) => {
    setListInputBahan((prevState) => {
      const currentLength = prevState.length;

      return [...listInputBahan, { id: currentLength + 1 }];
    });
  };

  return (
    <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="" className="block mb-1 font-bold text-black">
            Nama Resep
          </label>
          <input
            type="text"
            {...register('namaResep')}
            className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-green-200"
            placeholder="Nama resep yang ingin ditambahkan"
          />
        </div>
        {listInputBahan.map(({ id }) => {
          return (
            <div className="flex" key={id}>
              <div className="py-2 mr-2">
                <label htmlFor="" className="block mb-1 font-bold text-black">
                  Nama Bahan
                </label>
                <input
                  type="text"
                  {...register(`namaBahan${id}`)}
                  className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-green-200"
                  placeholder="Isi nama bahan"
                />
              </div>
              <div className="py-2">
                <label htmlFor="" className="block mb-1 font-bold text-black">
                  Jumlah Bahan
                </label>
                <input
                  type="number"
                  min={0}
                  {...register(`jumlahBahan${id}`)}
                  className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-green-200"
                  placeholder="Isi jumlah bahan"
                />
              </div>
            </div>
          );
        })}
        <div className="flex justify-center items-center m-3">
          <button type="button" onClick={addInputBahanHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div>
          <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
            Buat Resep
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddResepForm;
