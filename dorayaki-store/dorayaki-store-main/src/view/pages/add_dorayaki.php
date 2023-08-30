<?php include __DIR__ . '/../header_admin.php'; ?>
    <div class="body-container">

        <div class="add-container">
            <h1 class="tambah-varian">Tambah Varian Dorayaki</h1>

            <form onsubmit="return confirm('Are you sure you want to submit this form?');" method="POST" action="/dorayaki/add" enctype="multipart/form-data">
                <div class="form-input">
                    <select required name="varian" id="varian">
                        <option value="" disabled selected>Pilih dorayaki</option>
                        <?php foreach($dorayakis as $dorayaki): ?> 
                            <option value=<?= $dorayaki->recipeName?>><?= $dorayaki->recipeName?></option>
                        <?php endforeach; ?>
                    </select>
                    <input type="text" placeholder="Deskripsi.." name="deskripsi" id="deskripsi" required>
                    <input type="text" placeholder="Harga.." name="harga" id="harga" required>
                    <input type="text" placeholder="Stok awal.." name="stock" id="stock" required>
                </div>
                
                <div class="upload-submit">
                    <div class="image-upload">
                        <label for="file-input">
                            <i class="fa fa-cloud-upload fa-5x" aria-hidden="true"></i>
                        </label>
                        <input type="file" id="file-input" name="image"/>
                    </div>
                    <button id="delete" type="submit"  class="button registerbtn">Submit</button>
                    
                    
                </div>
            </form>
        </div>
    </div>

    
<?php include __DIR__  .'/../footer.php'; ?>
