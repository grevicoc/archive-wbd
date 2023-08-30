<?php
    require __DIR__ . "/BaseController.php";
    require __DIR__ . "/../model/Dorayaki.php";
    require __DIR__ . '/HistoryUpdateController.php';
    require_once __DIR__ . "/../utility.php";

    class DorayakiController extends BaseController {
        private $db;
        private $historyUpdateController;
        private $client;
        private $wsdl = 'http://localhost:8080/dorayakisupplier?wsdl';

        function __construct($db) {
            $this->db = $db;
            $this->historyUpdateController = new HistoryUpdateController($db);
        }

        function get_all_dorayaki() {
            try {
                $retval = array();
                $STH = $this->db->query("SELECT * FROM dorayaki;");

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
            }
            catch (Exception $e) {
                echo $e->getMessage();
                return array();
            }

            return $retval;
        }

        /* GET: Pagination */
        function get_dorayaki_pagination($page) {
            $retval = new stdClass();
            $retval->page = $page;
            $retval->items_per_page = 10;
        
            $pagination_data = array();
            $offset = ($page-1) * 8;
        
            try {
                $STH = $this->db->query("SELECT count(id_dorayaki) as total_dorayaki FROM dorayaki");
                $row = $STH->fetch();
                $retval->total_page = intdiv($row['total_dorayaki'], 10)+1;
            
                $STH = $this->db->prepare("SELECT * FROM dorayaki ORDER BY id_dorayaki LIMIT 8 OFFSET :offset");
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

                echo responseHelper("200", null, "OK", null);

                return $retval;
            } catch (Exception $e) {
                return false;
            }
        }
        
        /* GET: By ID */
        function get_dorayaki_by_id($id) {
            $retval = array();
            try {
                $retval = array();
                $STH = $this->db->prepare("SELECT *  FROM dorayaki  WHERE id_dorayaki = :id");
                $STH->execute(['id' => $id]);
            
                $row = $STH->fetch();
                $retval['id_dorayaki']= $row[0];
                $retval['varian'] = $row[1];
                $retval['deskripsi'] = $row[2];
                $retval['harga'] = $row[3];
                $retval['stock'] = $row[4];
                $retval['gambar'] = $row[5];

                $STH = $this->db->prepare("SELECT SUM(change_stock) as terjual  FROM history_update  WHERE id_dorayaki = :id and is_admin = 0 GROUP BY id_dorayaki;");
                $STH->execute(['id' => $id]);
                $row = $STH->fetch();
            
                $retval['terjual'] = gettype($row)!="boolean"?$row[0]*-1:0;
                return $retval;
            } catch (Exception $e) {
                echo $e->getMessage();
                return array();
            }
        }

        /* GET: By search */
        function get_search_dorayaki($page) {
            $retval = new stdClass();
            $retval->page = $page;
            $retval->items_per_page = 10;
        
            $pagination_data = array();
            $offset = ($page-1) * 8;

            if (isset($_SESSION['search'])) {
                $search = $_SESSION['search'];
            } else {
                $search = "%". $_POST["search"] . "%";
                $_SESSION['search'] = $search;
            }
        
            try {
                $STH = $this->db->prepare("SELECT count(id_dorayaki) as total_dorayaki FROM dorayaki WHERE varian LIKE :search;");
                $STH->execute(["search" => $search]);
                $row = $STH->fetch();
                $retval->total_page = intdiv($row['total_dorayaki'], 10)+1;
            
                $STH = $this->db->prepare("SELECT * FROM dorayaki WHERE varian LIKE :search ORDER BY id_dorayaki LIMIT 8 OFFSET :offset");
                $STH->execute(['offset' => $offset, "search" => $search]);
            
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

                return $retval;
            } catch (Exception $e) {
                return false;
            }
        }

        /* GET: Stock By ID */
        function get_dorayaki_stock_by_id($id) {
            try {
                $STH = $this->db->prepare("SELECT stock FROM dorayaki WHERE id_dorayaki = :id");
                $STH->execute(['id' => $id]);
            
                $row = $STH->fetch();
                $rawData = new Dorayaki();
                $rawData->stock = $row[0];
            
                exit(responseHelper(200, $rawData, "OK", NULL));
            } catch (PDOException $e) {
                echo $e->getMessage();
                return array();
            }
        }
        
        /* GET: Varian By SOAP */
        function get_dorayaki_varian() {
            try {
                $this->client = new SoapClient($this->wsdl, array('trace'=>1));
                $response = $this->client->getAllRecipe();
                return($response);
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        }

        function add_dorayaki() {
            try {
                move_uploaded_file($_FILES["image"]["tmp_name"], __DIR__ . '/../view/images/' . $_FILES['image']['name']);
                $image_dir = '/src/view/images/' . $_FILES['image']['name'];
                $STH = $this->db->prepare("INSERT INTO dorayaki (varian, deskripsi, harga, stock, gambar) values (:varian, :deskripsi, :harga, :stock, :gambar);");
                // var_dump($_POST);
                $_POST['gambar'] = $image_dir;
                // var_dump($_POST);
                $STH->execute($_POST);
                header('Location: /add-dorayaki');
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        }
        
        /* POST: Update Stock */
        function update_stock_dorayaki() {
            try {
                // $STH = $this->db->prepare("UPDATE dorayaki set stock = stock + :jumlah_perubahan where id_dorayaki == :id_dorayaki");
                // $STH->execute($_POST);

                // $username = $_SESSION['username'];
                // $STH = $this->db->prepare("SELECT id_user, is_admin FROM user where username = :username");
                // $STH->execute([$username]);
                // $user = $STH->fetch();
                    
                // $historyUpdateData = ["id_dorayaki"=>$_POST['id_dorayaki'], "id_user"=>$user[0], "change_stock"=>$_POST['jumlah_perubahan'], "is_admin"=>$user[1]];
                // $this->historyUpdateController->add_history_update($historyUpdateData);
                    
                $this->client = new SoapClient($this->wsdl,array('trace'=>1));
                $requestParams = array(
                    'idRecipe' => 1,
                    'amount' => 10
                );
                try{
                    $response = $this->client->addStock($requestParams);
                    var_dump($response);
                } catch (Exception $e) {
                    echo $e->getMessage();
                }

                // header('Location: /dashboard');
        
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        }

        /* POST: Buy Dorayaki */
        function decrease_dorayaki() {
            try {
                // var_dump($_POST);
                $STH = $this->db->prepare("UPDATE dorayaki set stock = stock - :jumlah_dibeli where id_dorayaki == :id_dorayaki");
                $STH->execute($_POST);

                $username = $_SESSION['username'];
                $STH = $this->db->prepare("SELECT id_user, is_admin FROM user where username = :username");
                $STH->execute([$username]);

                $user = $STH->fetch();
                $historyUpdateData = ["id_dorayaki"=>$_POST['id_dorayaki'], "id_user"=>$user[0], "change_stock"=>$_POST['jumlah_dibeli']*-1, "is_admin"=>$user[1]];

                $this->historyUpdateController->add_history_update($historyUpdateData);
                
                header('Location: /dashboard');
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        }
        
        /* POST: Update Information */
        function update_info_dorayaki() {
            try {
            $STH = $this->db->prepare("UPDATE dorayaki set varian = :varian, deskripsi = :deskripsi, harga = :harga, stock = :stock, gambar = :gambar  where id_dorayaki == :id_dorayaki");
            $STH->execute($_POST);
            
            $rows_affected = $STH->rowCount();
            if ($rows_affected != 1) {
                return false;
            } else {
                return true;
            }
            } catch (Exception $e) {
            return false;
            }
        }
        
        /* DELETE : Delete By ID */
        function delete_dorayaki($id) {
            try {
            $STH = $this->db->prepare("DELETE FROM history_update WHERE id_dorayaki = :id");
            $STH->execute(["id" => $id]);

            $STH = $this->db->prepare("DELETE FROM dorayaki WHERE id_dorayaki = :id");
            $STH->execute(["id" => $id]);
        
            $rows_affected = $STH->rowCount();
            if ($rows_affected != 1) {
                return false;
            } else {
                header('Location: /dashboard');
                return true;
            }
            } catch (Exception $e) {
            return false;
            }
        }
    }
?>