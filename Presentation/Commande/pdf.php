<?php
    require_once("../../Metier/client.php");
    require_once("../../Metier/produit.php");
    require_once("../../Metier/commande.php");
    require_once("../../Metier/ligneCmd.php");
    $commande=Commande::getCommande($_GET["ref"]);
    $lignes = LigneCmd::afficher($commande->get('n'));
    $client = DAO::getClient($commande->get('i'))

    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="pdf.css">
        <link rel="stylesheet" href="pdfboot.css">
        <title>Document</title>
    </head>
    <body >


    <div class="card-body" style="width:360px; border:1px black solid">
        <div class="form-group row text-left mb-0">
            <div style="display: flex; justify-content: center; margin:0 auto 15px auto; opacity:0.94;">
                <img width="110" src="../../assets/images/logo/logo-jell.png" alt="" class="logo logo-lg align-self-center">
            </div>
            
            <div class="col-sm-9 py-1">
                <h6>Date: <?=$commande->get('d')?> </h6>
            </div>
        </div>
        <h5>---------------------------------------</h5>
        <div class="form-group row text-left mb-0 py-2">
            <div class="col-sm-7 py-1">
                <h6 class="font-weight-bold"><?=$client->get('n')?></h6>
                <div class="mb-1">Tél: 0<?=$client->get('t')?></div>
                <div class="mb-1"> Email: <?=$client->get('e')?></div>
                <div class="mb-1"> Adresse: <?=$client->get('a')?></div>
            </div>
        <div style="text-align: center;" class="col-sm-4 py-1">
             <h6>Commande #<?=$commande->get('n')?> </h6>
        </div>
        </div>
        <table class="table table-bordered" width="100%" cellspacing="0">
            <thead>
                <tr>
                <th>Produits</th>
                <th width="8%">Qty</th>
                <th width="20%">Prix</th>
                <th width="20%">Subtotal</th>
                </tr>
            </thead>
            <tbody>
            <?php                                                       
             
                    foreach($lignes as $l) {
                    ?>
                    <tr>
                        <td><?=$l['libelle']?></td>
                        <td><?=$l['quantite']?></td>
                        <td><?=$l['prixVente']?></td>
                        <td><?=$l['total']?></td>
                    </tr>
                    <?php } 
                
                ?>         
            </tbody>
        </table>
        <div class="form-group row text-left mb-0 py-2">
            <div class="col-sm-4 py-1"></div>
            <div class="col-sm-8 py-1">
                <h6>-------------------------------</h6>
                <div class="d-flex justify-content-between">
                    <h5 class="font-weight-bold">TOTAL :</h5>
                    <h5 class="text-right font-weight-bold"><?=LigneCmd::total($commande->get("n"))?> Dh</h5>
                </div>
                <table width="100%">
                    <tbody>
                            <tr>
                                <td class="">Prix HT</td>
                                <td class="text-right"><?=LigneCmd::total($commande->get("n"))?>-20 Dh</td>
                            </tr>
                            <tr>
                                <td class="">Taxe</td>
                                <td class="text-right">20 Dh</td>
                            </tr>
                        </tbody>
                    </table>
                    <h6>-------------------------------</h6>
            </div>    
        </div>
        <h5>---------------------------------------</h5> 
        <div class="row justify-content-center">
            <h5>JELLOULI ste.</h5>
            <p>Rue 18, imm 52, Salmia 2, Casablanca</p>
            <h5>**MERCI POUR VOTRE VISITE**</h5>  
        </div>  
    </div>
    <script>
        window.addEventListener('afterprint', (event) => {
            window.close();
            
        });
    </script>
        
    

    </body>
    </html>