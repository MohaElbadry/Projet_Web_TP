
    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Header                                           -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <?php $title = "Clients" ;include "../templates/header.php" ?>

    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Container                                        -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <div id="main">
        <br>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Clients</h3>
                        <!-- <p class="text-subtitle text-muted">Ajout d'un client </p> -->
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="../dashboard.php">Dashboard</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Clients</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">



                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Affichage des clients</h4>
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
                                                <th>Nom</th>
                                                <th>Adresse</th>
                                                <th>Telephone</th>
                                                <th>Email</th>
                                                <th>Actions</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            <?php
                                        
                                        $tab = Client::afficher();
                                            echo "<tr>"; 
                                                foreach($tab as $t) { ?>
                                            <tr>
                                                <td><?=$t->get("n")?></td>
                                                <td><?=$t->get("a")?></td>
                                                <td><?=$t->get("t")?></td>
                                                <td><?=$t->get("e")?></td>
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
                                                            <svg class=" bi" width="1em" height="1em"
                                                                fill="currentColor">
                                                                <use
                                                                    xlink:href="../../assets/images/bootstrap-icons.svg#trash">
                                                                </use>
                                                            </svg>
                                                        </a>

                                                    </span>

                                                    <div class="modal fade bd-example-modal-xl"
                                                        id="modifier<?=$t->get("i")?>" tabindex="0" role="dialog"
                                                        aria-labelledby="mySmallModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered modal-md">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h4 class="modal-title">Modifier le client</h4>
                                                                    <button type="button" class="close"
                                                                        data-bs-dismiss="modal">&times;</button>
                                                                </div>
                                                                <div class="modal-body">

                                                                    <form class="form form-vertical" method="post"
                                                                        action="modifierClient.php">
                                                                        <div class="form-body">
                                                                            <div class="row">
                                                                                <div class="col-12">
                                                                                    <input type="hidden" name="id"
                                                                                        value=<?=$t->get("i") ?>>
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="first-name-vertical">Nom</label>
                                                                                        <input type="text"
                                                                                            id="first-name-vertical"
                                                                                            class="form-control"
                                                                                            name="nom" placeholder="Nom"
                                                                                            value=<?=$t->get("n") ?>>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-12">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="first-name-vertical">Adresse</label>
                                                                                        <input type="text"
                                                                                            id="first-name-vertical"
                                                                                            class="form-control"
                                                                                            name="adresse"
                                                                                            placeholder="Adresse"
                                                                                            value=<?=$t->get("a") ?>>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-12">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="contact-info-vertical">Telephone</label>
                                                                                        <input type="number"
                                                                                            id="contact-info-vertical"
                                                                                            class="form-control"
                                                                                            name="telephone"
                                                                                            placeholder="Telephone"
                                                                                            value=<?=$t->get("t") ?>>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-12">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="email-id-vertical">Email</label>
                                                                                        <input type="email"
                                                                                            id="email-id-vertical"
                                                                                            class="form-control"
                                                                                            name="email"
                                                                                            placeholder="Email"
                                                                                            value=<?=$t->get("e") ?>>
                                                                                    </div>
                                                                                    <br>
                                                                                </div>
                                                                                <div class="modal-footer">
                                                                                    <button type="button"
                                                                                        class="btn btn-secondary"
                                                                                        data-bs-dismiss="modal">Close</button>

                                                                                    <input type="submit"
                                                                                        value="Modifier"
                                                                                        class="btn btn-primary "></input>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </form>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- --------------------Supprimer------------------- -->
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
                                                                    <p>Vous etes sure de supprimer ce client?!
                                                                    </p>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary"
                                                                        data-bs-dismiss="modal">Close</button>
                                                                    <a id="popupHref"
                                                                        href='supprimerClient.php?id=<?=$t->get("i")?>'>
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








                </div>
            </section>
        </div>

        <!-- ----------------------------------------------------------------------------------------- -->
        <!--                                          Footer                                          -->
        <!-- ----------------------------------------------------------------------------------------- -->

        <?php include "../templates/footer.php" ?>