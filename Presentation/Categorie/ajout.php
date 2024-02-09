<?php 
        if(isset($_POST)){
            include_once('../../Metier/categorie.php');
            if(extract($_POST)){
                $c = new Categorie($idCategorie, $nomCategorie);
                $c->save();
                session_start();
            $_SESSION['succes']=true;
            unset($_POST);
            }
        }

        header('location: ajouterCategorie.php');
    ?>