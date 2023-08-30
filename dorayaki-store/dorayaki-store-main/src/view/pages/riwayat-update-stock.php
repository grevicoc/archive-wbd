<?php include __DIR__ . '/../header_admin.php'; ?>
    <div class="main-wrapper">
        <h1 class="riwayat">Riwayat Update Stock</h1>
        <table class="styled-table">
            <thead>
                <tr>
                    <th>Nama Dorayaki</th>
                    <th>Jumlah Pengubahan</th>
                    <th>Tanggal dan Waktu</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach($updates as $update): ?>
                <tr>
                    <td><?=$update['varian']?></td>
                    <td><?= $update['change_stock']?></td>
                    <td><?= $update['date']?></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
<?php include __DIR__  .'/../footer.php'; ?>