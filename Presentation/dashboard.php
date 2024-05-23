<?php 
require("../DAO/DAO.php");
  session_start();
  if(!isset($_SESSION['login'])){
    header("Location: http://localhost/Mini/");
  }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Statistiques - Mini-Projet</title>

    <link rel="stylesheet" href="../assets/css/main/app.css">
    <link rel="stylesheet" href="../assets/css/main/app-dark.css">
    <link rel="shortcut icon" href="../assets/images/logo/favicon.svg" type="image/x-icon">
    <link rel="shortcut icon" href="../assets/images/logo/favicon.png" type="image/png">
    <link rel="stylesheet" href="../assets/css/shared/iconly.css">

</head>

<body>

    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Sidebar                                          -->
    <!-- ----------------------------------------------------------------------------------------- -->


<div id="app">
    <div id="sidebar" class="active">
        <div class="sidebar-wrapper active" style="left:0;">
            <div class="sidebar-header position-relative">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="logo">
                        <a href="../dashboard.php"><img src="../assets/images/logo/logo-jell.png" alt="Logo"
                                srcset="" style="margin-top: 4px;"></a>
                    </div>
                    <div class="theme-toggle d-flex gap-2  align-items-center mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true" role="img" class="iconify iconify--system-uicons" width="20" height="20"
                            preserveAspectRatio="xMidYMid meet" viewBox="0 0 21 21">
                            <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    d="M10.5 14.5c2.219 0 4-1.763 4-3.982a4.003 4.003 0 0 0-4-4.018c-2.219 0-4 1.781-4 4c0 2.219 1.781 4 4 4zM4.136 4.136L5.55 5.55m9.9 9.9l1.414 1.414M1.5 10.5h2m14 0h2M4.135 16.863L5.55 15.45m9.899-9.9l1.414-1.415M10.5 19.5v-2m0-14v-2"
                                    opacity=".3"></path>
                                <g transform="translate(-210 -1)">
                                    <path d="M220.5 2.5v2m6.5.5l-1.5 1.5"></path>
                                    <circle cx="220.5" cy="11.5" r="4"></circle>
                                    <path d="m214 5l1.5 1.5m5 14v-2m6.5-.5l-1.5-1.5M214 18l1.5-1.5m-4-5h2m14 0h2">
                                    </path>
                                </g>
                            </g>
                        </svg>
                        <div class="form-check form-switch fs-6">
                            <input class="form-check-input  me-0" type="checkbox" id="toggle-dark" style="cursor: pointer;">
                            <label class="form-check-label"></label>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true" role="img" class="iconify iconify--mdi" width="20" height="20"
                            preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="m17.75 4.09l-2.53 1.94l.91 3.06l-2.63-1.81l-2.63 1.81l.91-3.06l-2.53-1.94L12.44 4l1.06-3l1.06 3l3.19.09m3.5 6.91l-1.64 1.25l.59 1.98l-1.7-1.17l-1.7 1.17l.59-1.98L15.75 11l2.06-.05L18.5 9l.69 1.95l2.06.05m-2.28 4.95c.83-.08 1.72 1.1 1.19 1.85c-.32.45-.66.87-1.08 1.27C15.17 23 8.84 23 4.94 19.07c-3.91-3.9-3.91-10.24 0-14.14c.4-.4.82-.76 1.27-1.08c.75-.53 1.93.36 1.85 1.19c-.27 2.86.69 5.83 2.89 8.02a9.96 9.96 0 0 0 8.02 2.89m-1.64 2.02a12.08 12.08 0 0 1-7.8-3.47c-2.17-2.19-3.33-5-3.49-7.82c-2.81 3.14-2.7 7.96.31 10.98c3.02 3.01 7.84 3.12 10.98.31Z">
                            </path>
                        </svg>
                    </div>
                    <div class="sidebar-toggler  x">
                        <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
                    </div>
                </div>

            </div>

            <div class="sidebar-menu">
                <div class="card ms-5" style="width: 15rem; box-shadow:none;">
                    <div class="card-body py-4 px-4">
                        <div class="d-flex align-items-center">
                            <div class="avatar bg-primary me-3">
                                <span
                                    class="avatar-content"><?php echo strtoupper(substr($_SESSION['login'],0,2)); ?></span>
                            </div>
                            <div class="ms-1 name">
                                <h6 class="font-bold"><?php echo $_SESSION['login']; ?></h6>
                                <h6 class="text-muted mb-0">Est Safi</h6>
                            </div>
                            <div style="margin-left:2rem;">
                                <a href="destroy.php">
                                    <i class="bi bi-power"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="menu">
                    <li class="sidebar-title">Menu</li>

                    <li class="sidebar-item  ">
                        <a href="http://localhost/Mini/Presentation/dashboard.php" class='sidebar-link'>
                            <i class="bi bi-grid-fill"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <li class="sidebar-item  has-sub">
                        <a href="#" class='sidebar-link'>
                            <i class="bi bi-person-fill"></i>
                            <span>Clients</span>
                        </a>
                        <ul class="submenu ">
                            <li class="submenu-item ">
                                <a href="http://localhost/Mini/Presentation/Client/ajouterClient.php">Ajout</a>
                            </li>
                            <li class="submenu-item ">
                                <a href="http://localhost/Mini/Presentation/Client/afficherClients.php">Liste</a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-item  has-sub">
                        <a href="#" class='sidebar-link'>
                            <i class="bi bi-truck"></i>
                            <span>Fournisseurs</span>
                        </a>
                        <ul class="submenu ">
                            <li class="submenu-item ">
                                <a
                                    href="http://localhost/Mini/Presentation/Fournisseur/ajouterFournisseur.php">Ajout</a>
                            </li>
                            <li class="submenu-item ">
                                <a
                                    href="http://localhost/Mini/Presentation/Fournisseur/afficherFournisseurs.php">Liste</a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-item  has-sub">
                        <a href="#" class='sidebar-link'>
                            <i class="bi bi-pentagon-fill"></i>
                            <span>Produits</span>
                        </a>
                        <ul class="submenu ">
                            <li class="submenu-item ">
                                <a href="http://localhost/Mini/Presentation/Produit/ajouterProduit.php">Ajout</a>
                            </li>
                            <li class="submenu-item ">
                                <a href="http://localhost/Mini/Presentation/Produit/afficherProduits.php">Liste</a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-item  has-sub">
                        <a href="#" class='sidebar-link'>
                            <i class="bi bi-list-ul"></i>
                            <span>Categories</span>
                        </a>
                        <ul class="submenu ">
                            <li class="submenu-item ">
                                <a href="http://localhost/Mini/Presentation/Categorie/ajouterCategorie.php">Ajout</a>
                            </li>
                            <li class="submenu-item ">
                                <a href="http://localhost/Mini/Presentation/Categorie/afficherCategories.php">Liste</a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-item  has-sub">
                        <a href="#" class='sidebar-link'>
                            <i class="bi bi-cart-fill"></i>
                            <span>Commandes</span>
                        </a>
                        <ul class="submenu ">
                            <li class="submenu-item ">
                                <a href="http://localhost/Mini/Presentation/Caisse/caisse.php">Ajout</a>
                            </li>
                            <li class="submenu-item ">
                                <a href="http://localhost/Mini/Presentation/Commande/afficherCommandes.php">Liste</a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-item  has-sub">
                        <a href="#" class='sidebar-link'>
                        <i class="bi bi-box-seam"></i>
                            <span>Approvisionnements</span>
                        </a>
                        <ul class="submenu ">
                            <li class="submenu-item ">
                                <a href="http://localhost/Mini/Presentation/Approvisionnement/caisse.php">Ajout</a>
                            </li>
                            <li class="submenu-item ">
                                <a href="http://localhost/Mini/Presentation/Approvisionnement/afficherApprovisionnements.php">Liste</a>
                            </li>
                        </ul>
                    </li>


                </ul>
            </div>
        </div>
    </div>

    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Container                                        -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <div id="main">
        <br>
        <div class="page-heading">
            <div class="page-title" style="margin-top: -20px;">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Statistiques</h3>
                        <!-- <p class="text-subtitle text-muted">Ajout d'un client </p> -->
                    </div>
                </div>
            </div>
            <br>
            <section class="section" style="margin-top: -20px;">
                <div class="row">
                    <div class="col-6 col-lg-3 col-md-6">
                        <div class="card">
                            <div class="card-body px-4 py-4-5">
                                <div class="row">
                                    <div class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                        <div class="stats-icon purple mb-2">
                                            <i class="iconly-boldBuy"></i>
                                        </div>
                                    </div>
                                    <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                        <h6 class="text-muted font-semibold">
                                            Commandes
                                        </h6>
                                        <h6 class="font-extrabold mb-0">
                                            <?php require "../Metier/commande.php";
                                            echo Commande::total();?>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-lg-3 col-md-6">
                        <div class="card">
                            <div class="card-body px-4 py-4-5">
                                <div class="row">
                                    <div class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                        <div class="stats-icon blue mb-2">
                                            <i class="iconly-boldProfile"></i>
                                        </div>
                                    </div>
                                    <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                        <h6 class="text-muted font-semibold">Clients</h6>
                                        <h6 class="font-extrabold mb-0">
                                            <?php require "../Metier/client.php";
                                            echo Client::total();?>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-lg-3 col-md-6">
                        <div class="card">
                            <div class="card-body px-4 py-4-5">
                                <div class="row">
                                    <div class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                        <div class="stats-icon green mb-2">
                                            <i class="iconly-boldWallet"></i>
                                        </div>
                                    </div>
                                    <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                        <h6 class="text-muted font-semibold">Revenu total</h6>
                                        <h6 class="font-extrabold mb-0"><?=DAO::Income()?> Dhs</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-lg-3 col-md-6">
                        <div class="card">
                            <div class="card-body px-4 py-4-5">
                                <div class="row">
                                    <div class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                        <div class="stats-icon red mb-2">
                                            <i class="iconly-boldBookmark"></i>
                                        </div>
                                    </div>
                                    <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                        <h6 class="text-muted font-semibold">Saved Post</h6>
                                        <h6 class="font-extrabold mb-0">112</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-8">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Revenu par mois</h4>
                            </div>
                            <div class="card-body" height="21rem" width="48rem">
                                <canvas id="chart1"></canvas>

                                

                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
        </div>

        <!-- ----------------------------------------------------------------------------------------- -->
        <!--                                          Footer                                          -->
        <!-- ----------------------------------------------------------------------------------------- -->
        <footer>
            <div class="footer clearfix mb-0 text-muted">
                <div class="float-start">
                    <p>2022 &copy; JELLOULI Youness - ESTS</p>
                </div>
            </div>
        </footer>
        </div>
        </div>
        <!-- <script src="../assets/extensions/chart.js/Chart.min.js"></script> -->
        <script src="../assets/js/chartjs.js"></script>
        <script src="../assets/js/bootstrap.js"></script>
        <!-- <script src="../assets/js/extensions/ui-chartjs.js"></script> -->
        <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js" integrity="sha512-a+mx2C3JS6qqBZMZhSI5LpWv8/4UK21XihyLKaFoSbiKQs/3yRdtqCwGuWZGwHKc5amlNN8Y7JlqnWQ6N/MYgA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->
        <script src="../assets/js/app.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

        </body>

        <script src="../../assets/js/functions.js"></script>
        <?php 
            // $stmt = DAO::Stats();
            // $dh="Dh";
            // while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            //     $month[] = $row['month'];
            //     $prix[] = $row['prix'];
            // }
        ?>
        <script>
            var ctx = document.getElementById("chart1").getContext("2d");

            var data={
                
                labels:<?php echo json_encode($month);?>,
                datasets:[{
                    label:'Revenu',
                    data:<?php echo json_encode($prix);?>,
                    backgroundColor: "rgba(67, 94, 190,0.5)",
                    borderWidth: 3,
                    borderColor: 'rgba(67, 94, 190,0.5)',
                    pointBorderWidth: 1,
                    pointBorderColor: 'rgba(67, 94, 190,0.5)',
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(67, 94, 190,0.5)    ',
                    pointHoverBackgroundColor: 'rgba(63,82,227,1)',
                }],
                

            }
                 

            var config= {
            type:'line',
            data: data,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                    }
            }
            };

            var chart1 = new Chart(ctx,config);
        </script>

</html>
        
        