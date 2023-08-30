## Trio Nyambat Tugas Besar IF3110 1
Anggota :
- Muhammad Tito Prakasa (13519007)
- Fakhri Nail Wibowo (13519035)
- Dwianditya Hanif (13519046)
## Deskripsi Aplikasi
Aplikasi yang kami buat merupakan aplikasi yang memfasilitasi pengguna untuk memilih daftar menu dari Doremonangis. Berikut merupakan fitur-fitur yang ada pada aplikasi website kami :
1. Autentifikasi pengguna (ada dua role yaitu role user dan admin)
2. Untuk admin dapat menambahkan maupun menghapus varian dorayaki yang ada
3. Untuk admin dapat mengelola stok dari dorayaki yang ada.
4. Melihat daftar varian dan detail dari dorayaki. (khusus admin dapat mengubah detail dari dorayaki)
5. Pembelian dorayaki oleh user
6. Riwayat pembelian dorayaki oleh user dan riwayat pengubahan dorayaki oleh admin
## Daftar requirement
PHP versi 7+, (optional) docker.
## Cara instalasi
1. Install XAMPP di sini https://www.apachefriends.org/download.html
2. Masukkan folder bin php menjadi system environment variable
3. Masuk ke folder utama 
4. Ketik "php -S localhost:8000" dan enter
## Cara menjalankan server
php -S localhost:8000 (ketikkan pada terminal)

## Screenshot
Lihat pada folder screenshoot

## PERUBAHAN !!
1. Penambahan table baru yaitu request untuk menyimpan request yang dikirimkan dari toko ke factory
2. Perubahan update history yang sebelumnya perubahan dari admin dimasukkan juga, sekarang hanya perubahan dari user yang akan dimasukkan.
3. Pembuatan dorayaki baru hanya bisa dilakukan jika terdapat varian baru dari hasil pengambilan data dorayaki di factory.
4. Perubahan stok dilakukan oleh factory, toko hanya bisa melakukan request ke factory untuk menambah stok.

## Pembagian tugas
Client-side
Modul            | NIM
-----            | ---
Register         | 13519046 13519007
Login            | 13519007 13519007
Dashboard        | 13519035 13519035
Pencarian        | 13519035 13519035
Item Baru        | 13519046 
Detail           | 13519046
Pengubahan Stok  | 13519046 


Server-side
Modul            | NIM
-----            | ---
Signup           | 13519007 13519035
Login            | 13519046 13519007 13519035
Dashboard        | 13519035 13519007
Pencarian        | 13519035 13519007
Item Baru        | 13519007 13519035
Detail           | 13519007 13519035
Pengubahan Stok  | 13519007 13519035


Bonus
Modul                   | NIM
-----                   | ---
Data Expire Time        | 13519007 13519035
Responsive Design       | 13519035 13519007
Docker                  | 
Riwayat Pengubahan Stok | 13519007 13519035


