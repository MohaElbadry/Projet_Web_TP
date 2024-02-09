<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?=$title?> - JELLOULI</title>
    
    <link rel="stylesheet" href="../assets/css/main/app.css">
    <link rel="shortcut icon" href="../assets/images/logo/favicon.svg" type="image/x-icon">
    <link rel="shortcut icon" href="../assets/images/logo/favicon.png" type="image/png">
    <link href="style.css" rel="stylesheet">
    
    <link rel="stylesheet" href="../assets/css/shared/iconly.css">

</head>

<body>
    <div id="app" style="background-color: #F5F5F9;">
        <div id="main" class="layout-horizontal">
            <header class="mb-5">
                <div class="header-top">
                    <div class="container">
                        
                        
                </div>
                <nav class="main-navbar d-flex justify-content-between align-items-center">
                    <div class="logo">
                        <a href="index.html"><img src="../assets/images/logo/logo-jell.png" height="30px" alt="Logo"></a>
                    </div>
                    <div class="">
                        <ul>
                            
                            <li
                                class="menu-item">
                                <a href="home.php" class='menu-link d-flex align-items-start'>
                                    <i class="bi bi-grid-fill"></i>
                                    <span>Home</span>
                                </a>
                            </li>
                    
                            <li
                                class="menu-item  has-sub">
                                <a href="shop.php" class='menu-link d-flex align-items-start'>
                                    <i class="bi bi-stack"></i>
                                    <span>Shop</span>
                                </a>
                                <div class="submenu ">
                                    <div class="submenu-group-wrapper">
                                        
                                        
                                        <ul class="submenu-group">
                                            
                                            <li
                                                class="submenu-item  ">
                                                <a href="component-alert.html"
                                                    class='submenu-link'>Alert</a>

                                                
                                            </li>
                                            
                                        
                                        
                                            <li
                                                class="submenu-item  ">
                                                <a href="component-badge.html"
                                                    class='submenu-link'>Badge</a>

                                                
                                            </li>
                                            
                                        
                                        
                                            
                                        </ul>
                                        
                                        
                                        
                                        <ul class="submenu-group">
                                            
                                            <li
                                                class="submenu-item  ">
                                                <a href="component-list-group.html"
                                                    class='submenu-link'>List Group</a>

                                                
                                            </li>
                                            
                                        
                                        
                                            <li
                                                class="submenu-item  ">
                                                <a href="component-modal.html"
                                                    class='submenu-link'>Modal</a>

                                                
                                            </li>
                                            
                                            <li
                                                class="submenu-item  has-sub">
                                                <a href="#"
                                                    class='submenu-link'>Extra Components</a>

                                                
                                                <!-- 3 Level Submenu -->
                                                <ul class="subsubmenu">
                                                    
                                                    <li class="subsubmenu-item ">
                                                        <a href="extra-component-avatar.html" class="subsubmenu-link">Avatar</a>
                                                    </li>
                                                    
                                                </ul>
                                                
                                            </li>
                                            
                                        </ul>
                                        
                                        
                                    </div>
                                </div>
                            </li>
                            
                            
                            
                            <li class="menu-item active has-sub">
                                <a href="#" class='menu-link d-flex align-items-start'>
                                    <i class="bi bi-grid-1x2-fill"></i>
                                    <span>Categories</span>
                                </a>
                                <div
                                    class="submenu ">
                                    <!-- Wrap to submenu-group-wrapper if you want 3-level submenu. Otherwise remove it. -->
                                    <div class="submenu-group-wrapper">
                                        
                                        
                                        <ul class="submenu-group">
                                        <?php
                                        require_once("C:\wamp\www\Mini\DAO\DAO.php");
                                        require_once("C:\wamp\www\Mini\Metier\categorie.php");
                                        
                                        $tab = Categorie::afficher();
                                        foreach($tab as $t) {?>
                                            <li class="submenu-item">
                                                <a href="shop.php?id=<?=$t->get("n")?>" class='submenu-link'><?=$t->get("n")?></a>
                                            </li>
                                        <?php } ?>
                                            
                                        </ul>
                                        
                                        
                                    </div>
                                </div>
                            </li>
                            
                            
                            
                            <li  class="menu-item  has-sub">
                                <a href="#" class='menu-link d-flex align-items-start'>
                                    <i class="bi bi-table"></i>
                                    <span>Table</span>
                                </a>
                                <div
                                    class="submenu ">
                                    <!-- Wrap to submenu-group-wrapper if you want 3-level submenu. Otherwise remove it. -->
                                    <div class="submenu-group-wrapper">
                                        <ul class="submenu-group">
                                            <li  class="submenu-item ">
                                                <a href="table.html" class='submenu-link'>Table</a>
                                            </li>
                                        </ul>
                                        
                                    </div>
                                </div>
                            </li>  
                        </ul>
                    </div>
                    <div class="header-top-right">
                            <div class="dropdown">
                                <a href="#" id="topbarUserDropdown" class="user-dropdown d-flex align-items-center dropend dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
                                    <div class="avatar avatar-md2" >
                                        <img src="../assets/images/faces/1.jpg" alt="Avatar">
                                    </div>
                                    <div class="text">
                                        <h6 class="user-dropdown-name">John Ducky</h6>
                                        <p class="user-dropdown-status text-sm text-muted">Member</p>
                                    </div>
                                </a>
                                <!-- <ul class="dropdown-menu dropdown-menu-end shadow-lg" aria-labelledby="topbarUserDropdown">
                                  <li><a class="dropdown-item" href="#">My Account</a></li>
                                  <li><a class="dropdown-item" href="#">Settings</a></li>
                                  <li><hr class="dropdown-divider"></li>
                                  <li><a class="dropdown-item" href="auth-login.html">Logout</a></li>
                                </ul> -->
                            </div>

                            <a href="#" class="burger-btn d-block d-xl-none">
                                <i class="bi bi-justify fs-3"></i>
                            </a>
                    </div>
                         
                </nav>

            </header>

            