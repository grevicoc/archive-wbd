<?php include __DIR__ . '/../header_user.php'; ?>
    <div class="body-detail-container">
        <div class="detail-container">
            <div class="detail-left-container">
                <img src=<?= $dorayakis['gambar']?> alt="" width="300" height="350" class="dorayaki-photo">
            </div>
            <div class="detail-right-container">
                <h1 class="dorayaki-name"><?= $dorayakis['varian'] ?></h1>
                <div class="detail-content">
                    <div class="detail-right-content">
                        <p class="dorayaki-desc"><?= $dorayakis['deskripsi'] ?></p>
                        <button id="button" type="submit" class="button belibtn">Beli</button>
                        <p class="dorayaki-price">Harga 1 pcs : Rp. <?= $dorayakis['harga'] ?></p>
                    </div>
                    <div class="detail-left-content">
                        <p class="stock-terjual">Stock : <?= $dorayakis['stock'] ?><br>Terjual : <?=$dorayakis['terjual']!=NULL?$dorayakis['terjual']:0?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php
        echo"<script language='javascript' src='/src/view/scripts/beliDorayaki.js'></script>";
    ?>
    
<?php include __DIR__  .'/../footer.php'; ?>
