<?php include __DIR__ . '/../header_admin.php'; ?>
    <div class="body-beli-container">

        <div class="beli-container">
            <h1 class="dorayaki-name"><?= $dorayakis['varian'] ?></h1>
            <img src=<?= $dorayakis['gambar'] ?> alt="" width="100" height="150" class="dorayaki-photo">
            <p class="dorayaki-desc"<?= $dorayakis['deskripsi'] ?>> </p>
            <p id="dorayaki-price" class="dorayaki-price">Harga 1 pcs : Rp. <?= $dorayakis['harga'] ?></p>
            <p id="stock-dorayaki" class="dorayaki-desc">Stock: 0</p>
            <form action="/dorayaki/update/stock" method="post">
                <div class="update-btn">
                    <span id="minus" class="minus">-</span>
                    <input type="hidden" id="id_dorayaki" name="id_dorayaki" value=<?=$dorayakis['id_dorayaki']?>>
                    <input type="number" id="stock-change" name="jumlah_perubahan" value="0"/>
                    <span id="plus" class="plus">+</span>
                </div>
                <button id="button" type="submit" type="submit" class="button belibtn">Ubah</button>
                <?php
            echo"<script>alert('Sukses mengubah');</script>";
            ?>
            </form>
            
        </div>
    </div>
    <?php
        echo"<script language='javascript' type='module' src='/src/view/scripts/stokDorayaki.js'></script>";
    ?>
<?php include __DIR__  .'/../footer.php'; ?>