    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Header                                           -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <?php $title = "Categories" ;include "../templates/header.php" ?>

    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Container                                        -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <div id="main">
        <br>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Categories</h3>
                        <!-- <p class="text-subtitle text-muted">Ajout d'un client </p> -->
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="../dashboard.php">Dashboard</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Categories</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">



                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Affichage des Categories</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="email-fixed-search flex-grow-1">
                                    <div class="form-group position-relative mb-0 has-icon-left">
                                        <input type="text" class="form-control" placeholder="Rechercher le nom..."
                                            id="search" onkeyup="FilterkeyWord()">
                                        <div class="form-control-icon">
                                            <svg class="bi" width="1.5em" height="1.5em" fill="currentColor">
                                                <use xlink:href="../../assets/images/bootstrap-icons.svg#search"></use>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-md table-striped" id="table">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Nom</th>
                                                <th>Actions</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            <?php
                                        
                                            $tab = Categorie::afficher();
                                            echo "<tr>";
                                            foreach($tab as $t) { ?>
                                            <tr>
                                                <td><?=$t->get("i")?></td>
                                                <td><?=$t->get("n")?></td>
                                                <td>
                                                    <span>
                                                        <a data-bs-toggle="modal"
                                                            data-bs-target="#modifier<?=$t->get("i")?>">
                                                            <svg class="bi" width="1em" height="1em"
                                                                fill="currentColor">
                                                                <use
                                                                    xlink:href="../../assets/images/bootstrap-icons.svg#pencil">
                                                                </use>
                                                            </svg>
                                                        </a>&#124;
                                                        <a data-bs-toggle="modal"
                                                            data-bs-target="#supprimer<?=$t->get("i")?>">
                                                            <svg class="bi" width="1em" height="1em"
                                                                fill="currentColor">
                                                                <use
                                                                    xlink:href="../../assets/images/bootstrap-icons.svg#trash">
                                                                </use>
                                                            </svg>
                                                        </a>

                                                    </span>
                                                    <!-- -------------MODIFIER------------- -->
                                                    <div class="modal fade bd-example-modal-sm"
                                                        id="modifier<?=$t->get("i")?>" tabindex="0" role="dialog"
                                                        aria-labelledby="mySmallModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered modal-sm">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h4 class="modal-title">Modifier categorie</h4>
                                                                    <button type="button" class="close"
                                                                        data-bs-dismiss="modal">&times;</button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    <form class="form form-vertical" method="post"
                                                                        action="modifierCategorie.php?id=<?=$t->get("i")?>">
                                                                        <div class="form-body">
                                                                            <div class="row">
                                                                                <div class="col-12">
                                                                                    <label
                                                                                        for="first-name-vertical">Id</label>
                                                                                    <input type="text" name="id"
                                                                                        class="form-control" disabled
                                                                                        value=<?=$t->get("i") ?>>
                                                                                    <div class=" form-group">
                                                                                        <label
                                                                                            for="first-name-vertical">Nom</label>
                                                                                        <input type="text"
                                                                                            id="first-name-vertical"
                                                                                            class="form-control"
                                                                                            name="nom" placeholder="Nom"
                                                                                            value=<?=$t->get("n") ?>>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary"
                                                                        data-bs-dismiss="modal">Close</button>
                                                                    <input type="submit" value="Modifer"
                                                                        class="btn btn-primary me-1 mb-1" name="submit">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- -------------SUPPRIMER------------- -->
                                                    <div class="modal fade bd-example-modal-sm"
                                                        id="supprimer<?=$t->get("i")?>" tabindex="0" role="dialog"
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
                                                                    <p>Vous etes sure de supprimer cette
                                                                        categorie?!</p>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary"
                                                                        data-bs-dismiss="modal">Close</button>
                                                                    <a
                                                                        href='supprimerCategorie.php?id=<?=$t->get("i")?>'>
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
                                            <?php } 
                                            echo"</tr>";
                                            ?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <button type=" button" class="btn btn-primary" data-bs-toggle="modal"
                                                            data-bs-target="#mymodal">Small modal</button> -->





                </div>
            </section>
        </div>

        <!-- ----------------------------------------------------------------------------------------- -->
        <!--                                          Footer                                          -->
        <!-- ----------------------------------------------------------------------------------------- -->

        <?php include "../templates/footer.php" ?>