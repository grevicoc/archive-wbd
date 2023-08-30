# Dorayaki Factory Server
> Backend untuk pabrik dorayaki yang akan berhubungan dengan interface pabrik dorayaki serta dengan toko dorayaki melalui SOAP 


## Skema Basis Data
Basis data yang kami gunakan adalah "pabrikdorayaki" yang berisikan :
```
resep(id_resep, nama_resep)
bahan_baku_resep(id_bahan_baku, id_resep, jumlah)
bahan_baku(id_bahan_baku, nama_bahan_baku, stok)
request(id_request, id_resep, jumlah, status, timestamp)
log_request(id_log_request, ip_address, endpoint, timestamp)
user(id_user, email, username, password)
```


## Endpoint
1. Login
```
http://localhost:3000/auth/login
```
2. Register
```
http://localhost:3000/auth/register
```
3. createResep
```
http://localhost:3000/resep/createResep
```
4.  getAllResep
```
http://localhost:3000/resep/AllResep
```
5. getDetailResep
```
http://localhost:3000/resep/getDetailResep
```
6. getAllBahanBaku
``` 
http://localhost:3000/bahanbaku/allBahanbaku
```
7. updateStock
```
http://localhost:3000/bahanbaku/updateStok
```
8. createBahanbaku
```
http://localhost:3000/bahanbaku/createBahanbaku
```
9. getAllRequest
```
http://localhost:3000/request
```
10. decideRequest
```
http://localhost:3000/request/decide
```
11. addRequest and Email
```
http://localhost:3000/request/add
```


## Setup
1. Clone the repo
2. Install the dependencies

```
npm install
```

3. Import database from db folder to your local machine
4. Change database settings to your settings in db/database.ts
5. Run the project
```
npm start
```


## Pembagian Kerja
1. Authentikasi (JWT/OAuth, Login, Register) : Fakhri Nail Wibowo - 13519035
2. Protect Route : Fakhri Nail Wibowo - 13519046
3. Daftar Request (getAllRequest) : Muhammad Tito Prakasa - 13519007
4. decideRequest : Muhammad Tito Prakasa - 13519007
5. Manajemen Resep (createResep, getAllResep, getDetailResep) : Dwianditya Hanif - 13519046 & Fakhri Nail Wibowow - 13519035
6. Manajemen Bahan baku (createBahanbaku, getAllBahanBaku, updateStock) : Dwianditya Hanif - 13519046
7. Notifikasi Email : Fakhri Nail Wibowo - 13519046
