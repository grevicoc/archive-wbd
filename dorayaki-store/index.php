<?php
require_once __DIR__ . '/src/controller/DorayakiController.php';
require_once __DIR__ . '/src/controller/UserController.php';


$ver = SQLite3::version();

try {
    $db_used = getenv("DB_FILE")!=NULL?getenv("DB_FILE"):'dbwbd1-implemented.db';
    $db = new PDO('sqlite:src/' . $db_used);
    $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
} catch (PDOException $e) {
    die ("Database is not connected");
}

$uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER["REQUEST_METHOD"];
$components_uri = parse_url($uri);
$path_uri = explode('/',$components_uri['path']);

$userController = new UserController($db);
$dorayakiController = new DorayakiController($db);
$historyUpdateController = new HistoryUpdateController($db);

switch ($path_uri[1]){
    case "login":
        if ($method=="POST"){
            $userController->login($_POST['username'],$_POST['password']);
        }else{
            require __DIR__ .'/src/view/pages/login.php';
        }
        break;
    case "register":
        if ($method=="POST"){
            $userController->register($_POST['email'], $_POST['username'], $_POST['password']);
        }else{
            require __DIR__ .'/src/view/pages/register.php';
        }
        break;
    case "logout":
        $userController->logout();
        break;
    case "validation":
        $userController->validation();
        break;
    case "add-dorayaki":
        if (authentication($db)){
            if (is_admin()){
                $response = $dorayakiController->get_dorayaki_varian();
                if ($response->code == 200) {
                    $dorayakiController->data['dorayakis'] = $response->data->recipes;
                    $dorayakiController->view = "add_dorayaki";
                    $dorayakiController->renderView();
                } else {
                    echo $response->message;
                }
            }else{
                header('Location: /dashboard');
            }
        }else{
            header('Location: /login');
        }
        break;
    case "update-stock":
        if (authentication($db)){
            if (is_admin()){
                require __DIR__ . '/src/view/pages/ubah-dorayaki.php';
            }else{
                header('Location: /dashboard');
            }
        }else{
            header('Location: /login');
        }
        break;
    case "dorayaki":
        if (authentication($db)){
            if ($method == "GET") {
                if (isset($path_uri[2]) && $path_uri[2] == "get") {
                    if (isset($path_uri[3]) && $path_uri[3] == "stock") {
                        if (isset($_GET["id"])) {
                            $id = $_GET["id"];
                            $dorayakiController->get_dorayaki_stock_by_id($id);
                        }
                    }
                    elseif (isset($_GET["page"])) {
                        $page = $_GET["page"];
                        $dorayakiController->get_dorayaki_pagination($page);
                    }
                    elseif (isset($_GET["id"])) {
                        $id = $_GET["id"];
                        $dorayakiController->view = $_SESSION['role']==1?"detail-dorayaki-a":"detail-dorayaki-u";
                        $dorayakiController->data['dorayakis'] = $dorayakiController->get_dorayaki_by_id($id);
                        $dorayakiController->renderView();
                    }
                    else {
                        $dorayakiController->get_all_dorayaki();
                    }
                } 
                elseif (isset($path_uri[2]) && $path_uri[2] == "search") {
                    if (is_admin()){
                        require __DIR__ . '/src/view/header_admin.php';
                    }else{
                        require __DIR__ . '/src/view/header_user.php';
                    }

                    if (isset($_GET["page"])) {
                        $page = $_GET["page"];
                        $dorayakiController->view = "dashboard";
                        $search_data = $dorayakiController->get_search_dorayaki($page);
                        $dorayakiController->data['dorayakis'] = $search_data->items;
                        $dorayakiController->data['total_page'] = $search_data->total_page;
                        $dorayakiController->renderView();
                    }

                    require __DIR__ . '/src/view/footer.php';
                }
                elseif (isset($path_uri[2]) && $path_uri[2] == "buy") {
                    if (isset($_GET["id"])) {
                        $id = $_GET["id"];
                        $dorayakiController->view = $_SESSION['role']==1?"ubah-dorayaki":"beli-dorayaki";
                        $dorayakiController->data['dorayakis'] = $dorayakiController->get_dorayaki_by_id($id);
                        $dorayakiController->renderView();
                    }
                }
                else{
                    header('Location: /dashboard');
                }
            }
            elseif ($method == "POST") {
                if (isset($path_uri[2]) && $path_uri[2] == "search") {
                    if (is_admin()){
                        require __DIR__ . '/src/view/header_admin.php';
                    }else{
                        require __DIR__ . '/src/view/header_user.php';
                    }

                    if (isset($_GET["page"])) {
                        $page = $_GET["page"];
                        $dorayakiController->view = "dashboard";
                        $search_data = $dorayakiController->get_search_dorayaki($page);
                        $dorayakiController->data['dorayakis'] = $search_data->items;
                        $dorayakiController->data['total_page'] = $search_data->total_page;
                        $dorayakiController->renderView();
                    }

                    require __DIR__ . '/src/view/footer.php';
                }
                elseif (is_admin()){
                    if (isset($path_uri[2])) {
                        if ($path_uri[2] == "add") {
                            $dorayakiController->add_dorayaki();
                        }elseif ($path_uri[2] == "update") {
                            if (isset($path_uri[3]) && $path_uri[3] == "stock") {
                                $dorayakiController->update_stock_dorayaki();
                            } elseif (isset($path_uri[3]) && $path_uri[3] == "info") {
                                $dorayakiController->update_info_dorayaki();
                            }
                        }elseif ($path_uri[2] == "delete") {
                            if (isset($_GET["id"])) {
                                $id = $_GET["id"];
                                $dorayakiController->delete_dorayaki($id);
                            }
                        }
                    }
                }else{
                    if ($path_uri[2] == "buy"){
                        $dorayakiController->decrease_dorayaki();
                    }else{
                        header('Location: /dashboard');
                    }
                }
            }
        }else{
            header('Location: /login');
        }
        break;
    case "update-history":
        if (authentication($db)){
            if (is_admin()){
                $historyUpdateController->view = 'riwayat-update-stock';
                $historyUpdateController->data['updates'] = $historyUpdateController->get_all_history_update();
                $historyUpdateController->renderView();
            }else{
                $historyUpdateController->view = 'riwayat-pembelian-user';
                $historyUpdateController->data['updates'] = $historyUpdateController->get_all_history_by_username();
                $historyUpdateController->renderView();
            }
        }else{
            header('Location: /login');
        }
        break;
    case "dashboard":
        if (authentication($db)){
            if (is_admin()){
                require __DIR__ . '/src/view/header_admin.php';
            }else{
                require __DIR__ . '/src/view/header_user.php';
            }

            if (isset($_GET["page"])) {
                $page = $_GET["page"];
                $dorayakiController->view = "dashboard";
                $dorayakiController->data['dorayakis'] = $dorayakiController->get_dorayaki_pagination($page);
            } else {
                $dorayakiController->view = "dashboard";
                $dorayakiController->data['dorayakis'] = $dorayakiController->get_all_dorayaki();
                $dorayakiController->renderView();
            }
            
            require __DIR__ . '/src/view/footer.php';
        }else{
            header('Location: /login');
        }
        break;
    case "":
        require __DIR__ . '/src/view/pages/login.php';
        break;
    default:
        echo "URL INVALID";
        break;
}
?>