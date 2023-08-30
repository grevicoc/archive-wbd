<?php include __DIR__ . '/../header_user.php'; ?>
    <div class="body-beli-container">

        <div class="beli-container">
            <h1 class="dorayaki-name"><?= $dorayakis['varian'] ?></h1>
            <img src=<?= $dorayakis['gambar'] ?> alt="" width="100" height="150" class="dorayaki-photo">
            <p class="dorayaki-desc"><?= $dorayakis['deskripsi'] ?></p>
            <p id="dorayaki-price" class="dorayaki-price">Harga 1 pcs : Rp. <?= $dorayakis['harga'] ?></p>
            <p id="stock-dorayaki" class="dorayaki-desc">Stock: 0</p>
            <form action="/dorayaki/buy" method="post">
                <div class="shopping-btn">
                    <span id="minus" class="minus">-</span>
                    <input type="hidden" id="id_dorayaki" name="id_dorayaki" value=<?=$dorayakis['id_dorayaki']?>>
                    <input type="number" id="buy-stock" name="jumlah_dibeli" min="0" value="0"/>
                    <span id="plus" class="plus">+</span>
                </div>
                <p id="tot-price" class="tot-price">Total harga = Rp. 0</p> 
                <button id="button" type="submit" class="button belibtn">Beli</button>
                <?php
            echo"<script>alert('Sukses membeli');</script>";
            ?>
            </form>
            
        </div>        
    </div>
    <?php
        echo"<script language='javascript' type='module' src='/src/view/scripts/stokDorayaki.js'></script>";
    ?>
    
<?php include __DIR__  .'/../footer.php'; ?>