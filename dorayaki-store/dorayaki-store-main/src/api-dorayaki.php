<?php
require_once __DIR__. '/utility.php';

class Dorayaki {
  public $id_dorayaki;
  public $varian;
  public $deskripsi;
  public $harga;
  public $stock;
  public $gambar;
}

/* GET: All */
function get_all_dorayaki($db) {
  $retval = array();
  $STH = $db->query("SELECT id_dorayaki, varian, deskripsi, harga, stock, gambar, sum(change_stock) as total_penjualan FROM dorayaki NATURAL JOIN history_update WHERE is_admin == 0 GROUP BY id_dorayaki;");
  while ($row = $STH->fetch()){
      $rawData = new Dorayaki();
      $rawData->id_dorayaki = $row[0];
      $rawData->varian = $row[1];
      $rawData->deskripsi = $row[2];
      $rawData->harga = $row[3];
      $rawData->stock = $row[4];
      $rawData->gambar = $row[5];
      array_push($retval,$rawData);
  }
  echo responseHelper(200, $retval, "OK", null);
}

/* GET: Pagination */
function get_dorayaki_pagination($db, $page) {
  $retval = new stdClass();
  $retval->page = $page;
  $retval->items_per_page = 10;

  $pagination_data = array();
  $offset = ($page-1) * 10;

  try {
    $STH = $db->query("SELECT count(id_dorayaki) as total_dorayaki FROM dorayaki");
    $row = $STH->fetch();
    $retval->total_page = intdiv($row['total_dorayaki'], 10)+1;

    $STH = $db->prepare("SELECT * FROM dorayaki ORDER BY id_dorayaki LIMIT 10 OFFSET :offset");
    $STH->execute(['offset' => $offset]);

    while ($row = $STH->fetch()){
        $rawData = new Dorayaki();
        $rawData->id_dorayaki = $row[0];
        $rawData->varian = $row[1];
        $rawData->deskripsi = $row[2];
        $rawData->harga = $row[3];
        $rawData->stock = $row[4];
        $rawData->gambar = $row[5];
        array_push($pagination_data,$rawData);
    }

    $retval->items = $pagination_data;

    echo responseHelper(200, $retval, "OK", null);
  } catch (Exception $e) {
    echo responseHelper(400, null, "ERROR", $e->getMessage());
  }
}

/* GET: By ID */
function get_dorayaki_by_id($db, $id) {
  $retval = array();
  try {
    $STH = $db->prepare("SELECT * FROM dorayaki WHERE id_dorayaki == :id");
    $STH->execute(['id' => $id]);

    $row = $STH->fetch();
    $rawData = new Dorayaki();
    $rawData->id_dorayaki = $row[0];
    $rawData->varian = $row[1];
    $rawData->deskripsi = $row[2];
    $rawData->harga = $row[3];
    $rawData->stock = $row[4];
    $rawData->gambar = $row[5];

    echo responseHelper(200, $rawData, "OK", null);
  } catch (Exception $e) {
    echo responseHelper(400, null, "ERROR", $e->getMessage());
  }
}

/* POST: Add */
function add_dorayaki($db) {
  try {
    $STH = $db->prepare("INSERT INTO dorayaki (varian, deskripsi, harga, stock, gambar) values (:varian, :deskripsi, :harga, :stock, :gambar)");
    $STH->execute($_POST);
    
    echo responseHelper(200, null, "OK", null);
  } catch (Exception $e) {
    echo responseHelper(400, null, "ERROR", $e->getMessage());
  }
}

/* POST: Update Stock */
function update_stock_dorayaki($db) {
  try {
    $STH = $db->prepare("UPDATE dorayaki set stock = stock + :jumlah_perubahan where id_dorayaki == :id_dorayaki");
    $STH->execute($_POST);

    $rows_affected = $STH->rowCount();
    if ($rows_affected != 1) {
      echo responseHelper(400, null, "ERROR", "Incorrect ID"); 
    } else {
      echo responseHelper(200, null, "OK", null);
    }
  } catch (Exception $e) {
    echo responseHelper(400, null, "ERROR", $e->getMessage());
  }
}

/* POST: Update Information */
function update_info_dorayaki($db) {
  try {
    $STH = $db->prepare("UPDATE dorayaki set varian = :varian, deskripsi = :deskripsi, harga = :harga, stock = :stock, gambar = :gambar  where id_dorayaki == :id_dorayaki");
    $STH->execute($_POST);
    
    $rows_affected = $STH->rowCount();
    if ($rows_affected != 1) {
      echo responseHelper(400, null, "ERROR", "Incorrect ID"); 
    } else {
      echo responseHelper(200, null, "OK", null);
    }
  } catch (Exception $e) {
    echo responseHelper(400, null, "ERROR", $e->getMessage());
  }
}

/* DELETE : Delete By ID */
function delete_dorayaki($db, $id) {
  try {
    $STH = $db->prepare("DELETE FROM dorayaki WHERE id_dorayaki = :id");
    $STH->execute(["id" => $id]);

    $rows_affected = $STH->rowCount();
    if ($rows_affected != 1) {
      echo responseHelper(400, null, "ERROR", "Incorrect ID"); 
    } else {
      echo responseHelper(200, null, "OK", null);
    }
  } catch (Exception $e) {
    echo responseHelper(400, null, "ERROR", $e->getMessage());
  }
}

?>