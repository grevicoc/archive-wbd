<?php
require_once __DIR__ . "/BaseController.php";

class HistoryUpdateController extends BaseController{
    private $db;

    function __construct($db) {
        $this->db = $db;
    }

    /* GET: All */
    function get_all_history_update(){
        try{
            $retval = array();
            $data_history_update = $this->db->query("SELECT d.varian, hu.change_stock, hu.date FROM dorayaki d NATURAL INNER JOIN history_update hu;");
            while ($row = $data_history_update->fetch()){
                $rawData = array();
                $rawData['varian'] = $row[0];
                $rawData['change_stock'] = $row[1];
                $rawData['date'] = $row[2];
                
                array_push($retval,$rawData);
            }
            return $retval;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }
    // get_all_history_update($db);
    /* GET: By ID User*/
    function get_all_history_by_username(){
        try{
            $retval = array();
            $username = $_SESSION['username'];
            $data_history_update = $this->db->prepare("SELECT d.varian, hu.change_stock*-1, d.harga*hu.change_stock*-1 as total_harga, hu.date FROM dorayaki d NATURAL INNER JOIN history_update hu NATURAL INNER JOIN user u WHERE u.username=:username");
            $data_history_update->execute(['username' => $username]);

            while ($row = $data_history_update->fetch()){
                $rawData = array();
                $rawData['varian'] = $row[0];
                $rawData['jumlah_pembelian'] = $row[1];
                $rawData['total_harga'] = $row[2];
                $rawData['tanggal'] = $row[3];
                array_push($retval,$rawData);
            }
            return $retval;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    /* GET: By ID Dorayaki*/
    function get_history_update_byIDDorayaki($db, $id){
        try{
            $retval = array();
            $data_history_update = $db->prepare("SELECT * FROM history_update WHERE id_dorayaki==:id");
            $data_history_update->execute(['id' => $id]);

            while ($row = $data_history_update->fetch()){
                $rawData = new HistoryUpdate();
                $rawData->id_history = $row[0];
                $rawData->id_dorayaki = $row[1];
                $rawData->id_user = $row[2];
                $rawData->change_stock = $row[3];
                $rawData->date = $row[4];
                $rawData->is_admin = $row[5];
                array_push($retval,$rawData);
            }
            return $retval;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    /* POST: Add History Update */
    /*
    Body Request:
        "id_dorayaki"
        "id_user"
        "change_stock"
    */
    function add_history_update($data){
        try{
            $data_history_update = $this->db->prepare("INSERT INTO history_update (id_dorayaki,id_user,change_stock,date,is_admin) VALUES (:id_dorayaki,:id_user,:change_stock, datetime(), :is_admin)");
            $data_history_update->execute([$data['id_dorayaki'], $data['id_user'], $data['change_stock'], $data['is_admin']]);
        } catch (Exception $e) {
            echo  $e->getMessage();
        }
    }
}
?>