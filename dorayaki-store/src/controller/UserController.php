<?php
include __DIR__ . '/../model/User.php';
include_once __DIR__ . '/../utility.php';
class UserController{
    private $db;

    function __construct($db){
        $this->db = $db;
    }

    function login($username,$password){
        try{
            $_POST;
            $STH = $this->db->prepare("SELECT * from user where username=?");
            $STH->execute([$username]);
            $user = $STH->fetch();
            
            if($user && password_verify($password, $user['password'])){
                session_start();
                $_SESSION['username'] = $user['username'];
                $_SESSION['role'] = $user['is_admin'];
    
                $STH = $this->db->prepare("UPDATE user SET session_id=? WHERE username = ?");
                $STH->execute([session_id(), $user['username']]);       //session_id dah otomatis cuok

                header('Location: /dashboard');
            }
            else {
                echo "ERROR";
                header('Location: /login');
            }
        } catch (Exception $e) {
            echo $e->getMessage();
            header('Location: /login');
        }
    }

    function register($email, $username, $password){
        try{
            session_start();
            $_SESSION['username'] = $username;
            $_SESSION['role'] = 0;
            
            $pw_hash = password_hash($password, PASSWORD_DEFAULT);
            $STH = $this->db->prepare("INSERT INTO user (email, password, username, is_admin, session_id) VALUES(:email,:password,:username,'0', :session_id)");
            $STH->execute(['email'=>$email, 'password'=>$pw_hash, 'username'=>$username, 'session_id'=>session_id()]);

            header('Location: /dashboard');
        } catch (Exception $e) {
            echo $e->getMessage();
            header('Location: /login');
        }
    }

    function logout(){
        try{
            session_start();
            $username = $_SESSION['username'];

            $STH = $this->db->prepare("UPDATE user SET session_id=? WHERE username = ?");
            $STH->execute([NULL, $username]);       //session_id dah otomatis cuok
            
            session_destroy();
            setcookie("PHPSESSID", "", time()-3600);
            header('Location: /login');
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    function validation(){
        try{
            $retval = array();
            $STH = $this->db->prepare("SELECT email, username from user");
            $STH->execute();

            while ($row = $STH->fetch()){
                $rawData = new User();
                $rawData->email = $row[0];
                $rawData->username = $row[1];
                array_push($retval,$rawData);
            }

            exit(responseHelper(200, $retval, "OK", NULL));
            header('Location: /login');
        } catch (Exception $e) {
            echo $e->getMessage();
            header('Location: /login');
        }
    }
}
?>