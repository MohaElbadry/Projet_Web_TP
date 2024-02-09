<?php
    require("../DAO/DAO.php");
    extract($_POST);
    session_start();
    
    $dao = new DAO();
    if($dao->authentification($login,$password)==1) {
        $_SESSION=$_GET;
        unset($_GET);
        header("location:dashboard.php");
    }
    else header("location: ../index.php?error=1");
    
?>