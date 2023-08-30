<?php
//INPUT: (int, array obj, string, array obj)
//OUTPUT: json obj
function responseHelper($code, $data, $status, $errors){
    $response = array();
    $response['code'] = $code;
    $response['data'] = $data;
    $response['status'] = $status;
    $response['errors'] = $errors;

    return json_encode($response);
}

function authentication($db){
    try{
        session_start();
        if (isset($_SESSION['username'])){
            $STH = $db->prepare("SELECT session_id from user WHERE username=?");
            $STH->execute([$_SESSION['username']]);

            $data = $STH->fetch();
            if ($_COOKIE['PHPSESSID']==$data[0]){
                return true;
            }else{
                return false;
            }
        }
        session_destroy();
        setcookie("PHPSESSID", "", time()-3600);
        return false;
    }catch (Exception $e){
        return false;
    }
}

function is_admin(){
    if ($_SESSION['role']==1){
        return true;
    }
    return false;
}

?>
