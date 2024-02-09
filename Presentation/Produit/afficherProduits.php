    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Header                                           -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <?php $title = "Produits" ;include "../templates/header.php" ?>

    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Container                                        -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <div id="main">
        <br>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Produits</h3>
                        <!-- <p class="text-subtitle text-muted">Ajout d'un client </p> -->
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="../dashboard.php">Dashboard</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Produits</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">



                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Affichage des produits</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="email-fixed-search flex-grow-1">
                                    <div class="form-group position-relative mb-0 has-icon-left">
                                        <input type="text" class="form-control" placeholder="Rechercher la reference..."
                                            id="search" onkeyup="FilterkeyWord()">
                                        <div class="form-control-icon">
                                            <svg class="bi" width="1.5em" height="1.5em" fill="currentColor">
                                                <use xlink:href="../../assets/images/bootstrap-icons.svg#search"></use>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-md " id="table">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Reference</th>
                                                <th>Libelle</th>
                                                <th>Prix</th>
                                                <th>Quantite</th>
                                                <th>Prix Achat</th>
                                                <th>Categorie</th>
                                                <th>Actions</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            <?php
                                        
                                            $tab = Produit::afficher();
                                            echo "<tr>"; 
                                                foreach($tab as $t) {?>
                                            <tr>
                                                <td><img width='50' height='50'
                                                        src='../../assets/photos/<?=$t->get("i")?>'
                                                        title='<?=$t->get("l")?>'></td>
                                                <td><?=$t->get("r")?></td>
                                                <td><?=$t->get("l")?></td>
                                                <td><?=$t->get("p")?></td>
                                                <td><?=$t->get("q")?></td>
                                                <td><?=$t->get("a")?></td>
                                                <td><?=$t->get("c")?></td>

                                                <td>
                                                    <a data-bs-toggle="modal" data-bs-target="#update<?=$t->get("r")?>">
                                                        <svg class="bi" width="1em" height="1em" fill="currentColor">
                                                            <use
                                                                xlink:href="../../assets/images/bootstrap-icons.svg#pencil">
                                                            </use>
                                                        </svg>
                                                    </a>&#124;

                                                    <a data-bs-toggle="modal"
                                                        data-bs-target="#supprimer<?=$t->get("r")?>">
                                                        <svg class="bi" width="1em" height="1em" fill="currentColor">
                                                            <use
                                                                xlink:href="../../assets/images/bootstrap-icons.svg#trash">
                                                            </use>
                                                        </svg>
                                                    </a>

                                                    </span>
                                                    <!-- --------------------Modifier-------------------- -->
                                                    <div class=" modal fade bd-example-modal-md"
                                                        id="update<?=$t->get("r")?>" tabindex="0" role="dialog"
                                                        aria-labelledby="mySmallModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered modal-md">
                                                            <div class="modal-content">
                                                                <div class="modal-header ">
                                                                    <h4 class="modal-title">Modifier Produit</h4>
                                                                    <button type="button" class="close"
                                                                        data-bs-dismiss="modal">&times;</button>
                                                                </div>
                                                                <div class="modal-body">

                                                                    <form class="form form-vertical" method="post"
                                                                        action="modifierProduit.php">
                                                                        <div class=" form-body">
                                                                            <div class="row">
                                                                                <div class="col-12">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="first-name-vertical">Reference</label>
                                                                                        <input type="text"
                                                                                            id="first-name-vertical"
                                                                                            class="form-control"
                                                                                            name="reference"
                                                                                            placeholder="Reference"
                                                                                            value=<?=$t->get("r") ?>>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-12">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="password-vertical">Libelle</label>
                                                                                        <input type="text"
                                                                                            id="password-vertical"
                                                                                            class="form-control"
                                                                                            name="libelle"
                                                                                            placeholder="Libelle"
                                                                                            value=<?=$t->get("l") ?>>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-12">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="contact-info-vertical">Prix
                                                                                            unitaire</label>
                                                                                        <input type="number"
                                                                                            id="contact-info-vertical"
                                                                                            class="form-control"
                                                                                            name="prix"
                                                                                            placeholder="Prix unitaire"
                                                                                            value=<?=$t->get("p") ?>>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-12">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="email-id-vertical">Quantite
                                                                                            en stock</label>
                                                                                        <input type="number"
                                                                                            id="email-id-vertical"
                                                                                            class="form-control"
                                                                                            name="quantite"
                                                                                            placeholder="Quantite en stock"
                                                                                            value=<?=$t->get("q") ?>>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-12">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="email-id-vertical">Prix
                                                                                            d'achat</label>
                                                                                        <input type="number"
                                                                                            id="email-id-vertical"
                                                                                            class="form-control"
                                                                                            name="achat"
                                                                                            placeholder="Prix d'achat"
                                                                                            value=<?=$t->get("a") ?>>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-12">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="email-id-vertical">Categorie</label>
                                                                                        <div class="input-group mb-3">
                                                                                            <label
                                                                                                class="input-group-text"
                                                                                                for="inputGroupSelect01">Options</label>
                                                                                            <select
                                                                                                id="inputGroupSelect01"
                                                                                                class="form-control"
                                                                                                name="cat"
                                                                                                value=<?=$t->get("c") ?>>
                                                                                                <?php
                                                                                                    $tab = Categorie::afficher();
                                                                                                     foreach($tab as $p) {
                                                                                                        echo "<option value='".$p->get("i")."'>".$t->get("n")."</option>";
                                                                                                    }
                                                                                                ?>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary"
                                                                        data-bs-dismiss="modal">Close</button>
                                                                    <input type="submit" value="Modifier"
                                                                        class="btn btn-primary me-1 mb-1" name="submit">
                                                                    </a>
                                                                </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- --------------------Supprimer-------------------- -->
                                                    <div class=" modal fade bd-example-modal-sm"
                                                        id="supprimer<?=$t->get("r")?>" tabindex="0" role="dialog"
                                                        aria-labelledby="mySmallModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered modal-sm">
                                                            <div class="modal-content">
                                                                <div class="modal-header bg-danger">
                                                                    <h4 class="modal-title">Alert</h4>
                                                                    <button type="button" class="close"
                                                                        data-bs-dismiss="modal">&times;</button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    <!-- <h4 class="modal-title">Alert</h4> -->
                                                                    <p>Vous etes sure de supprimer ce produit?!</p>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary"
                                                                        data-bs-dismiss="modal">Close</button>
                                                                    <a href='supprimerProduit.php?id=<?=$t->get("r")?>'>
                                                                        <button type="button"
                                                                            class="btn btn-primary btn-danger">Oui!
                                                                            Supprimer</button>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <?php
                                                }
                                            echo"</tr>";
                                            ?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </section>
        </div>

        <!-- ----------------------------------------------------------------------------------------- -->
        <!--                                          Footer                                          -->
        <!-- ----------------------------------------------------------------------------------------- -->
        <?php include("../templates/footer.php");?>