<?php 
        if(isset($_POST)){
            include_once('../../Metier/fournisseur.php');
            if(extract($_POST)){
            $c = new Fournisseur($nom, $adresse, $telephone, $email);
            $c->save();
            session_start();
            $_SESSION['succes']=true;
            }
        }

        header('location: ajouterFournisseur.php');

    ?>