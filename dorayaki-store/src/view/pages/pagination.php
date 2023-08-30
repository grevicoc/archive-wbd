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
    </div>

    <div class="pagination-container">
        <div class="pagination">
            <a href="<a href=/dorayaki/search?page=1">&laquo;</a>
            <?php for ($i=1; $i < $total_page+1; $i++) {
                echo "<a href=\"/dorayaki/search?page=" . $i . "\" > $i </a>";
            } ?>
            <a href=<?= "\"/dorayaki/search?page=" . $total_page . "\"" ?>>&raquo;</a>
        </div>
    </div>

    <?php echo"<script language='javascript' src='/src/view/scripts/detailDorayaki.js'></script>"; ?>
</main>