<?php include __DIR__ . '/../header_user.php'; ?>
    <div class="main-wrapper">
        <h1 class="riwayat">Riwayat Pembelian User</h1>
        <table class="styled-table">
            <thead>
                <tr>
                    <th>Nama Dorayaki</th>
                    <th>Jumlah Pembelian</th>
                    <th>Total Harga</th>
                    <th>Tanggal dan Waktu</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach($updates as $update): ?>
                <tr>
                    <td><?=$update['varian']?></td>
                    <td><?= $update['jumlah_pembelian']?></td>
                    <td><?= $update['total_harga']?></td>
                    <td><?= $update['tanggal']?></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
<?php include __DIR__  .'/../footer.php'; ?>