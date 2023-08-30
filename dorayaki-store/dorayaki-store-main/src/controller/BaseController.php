<?php 
  class BaseController {
    public $data = array();
    public $view = "";
    public $head = array('title' => '', 'description' => '');

    public function renderView()
    {
        if ($this->view)
        {
            extract($this->data);
            require  __DIR__ . "/../view/pages/" . $this->view . ".php";
        }
    }

    public function redirect($url)
    {
        header("Location: /$url");
        header("Connection: close");
            exit;
    }
  }
?>