<?php 
        if(isset($_POST)){
            include_once('../../Metier/client.php');
            if(extract($_POST)){
            $c = new Client($nom, $adresse, $telephone, $email);
            $c->save();
            session_start();
            $_SESSION['succes']=true;
            }
        }

        header('location: ajouterClient.php');

    ?>