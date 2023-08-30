<main class="main-wrapper">
<div class="username-container">
    <h3><?=$_SESSION['username'];?></h3>
</div>
<div class="dashboard-container container">
    <?php foreach($dorayakis as $dorayaki): ?>
        <div class="card dashboard-card" id=<?=$dorayaki->id_dorayaki?>>
            <img src=<?= $dorayaki->gambar?> width="125" height="auto" />
            <div class="dashboard-card-title">
                <h4><?= $dorayaki->varian?></h4>
            </div>
        </div>
    <?php endforeach; ?>
    <?php
        echo"<script language='javascript' src='/src/view/scripts/detailDorayaki.js'></script>";
    ?>
</div>
</main>