<?php
session_start();
// redirect to login page if not logged in
if (!isset($_SESSION['loggedin'])) {
    header('Location: login.html');
    exit;
}
$DATABASE_HOST = 'localhost';
$DATABASE_USER = 'root';
$DATABASE_PASS = '';
$DATABASE_NAME = 'mysalatregister';

$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if (mysqli_connect_errno()) {
    // stop the script if there is an error connecting
    exit('Failed to connect: ' . mysqli_connect_error());
}

$stmt = $con->prepare('SELECT email FROM accounts WHERE id = ?');
$stmt->bind_param('i',$_SESSION['id']);
$stmt->execute();
$stmt->bind_result($email);
$stmt->fetch();
$stmt->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Adhan App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"-->
    <!--          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">-->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
    <link rel="stylesheet" href="./header.css">
    <link rel="stylesheet" href="./profile.css">
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="./footer.css">
    <script src="https://code.jquery.com/jquery-3.5.1.js"
            integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
</head>
<body>
<header>
    <div class="header-container">
        <div class="header-item"><a href="index.php"><img class="logo" src="images/logo.png" style="width: 70px;height: 70px;object-fit: cover"></a></div>
<!--        <div class="timer">-->
<!--            <h2 id="next-prayer-text"></h2>-->
<!--            <h2 id="next-prayer"></h2>-->
<!--        </div>-->
        <div class="reg header-item">
            <a href="login.html" class="btn"><span>Login</span></a>
            <div class="border"></div>
            <a href="register.php" class="btn"><span>Register</span></a>
            <?php
            if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
                echo '<style type="text/css"> .header-menu {display: block;} </style>';
            }
            ?>
            <div class="header-menu">
                <a class="dropdown-btn" onclick="showMenu()">
                    <?php
                    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
                        echo '<style type="text/css"> .btn {display: none;} </style>';
                        echo $_SESSION['name'];
                        echo '<i class="fas fa-caret-down c1"></i>';
                    }
                    ?>
                </a>
                <div id="dropdown" class="dropdown-content">
                    <a href="profile.php">Profile</a>
                    <a href="logout.php">Logout</a>
                </div>
            </div>
        </div>
    </div>
</header>
<div class="main">
    <div class="profile-background">
<!--        <img src="./images/katerina-kerdi-xp_w_LvY0pg-unsplash.jpg" style="width: 1000px;height: 200px">-->
        <div class="profile-background-image">
            <img src="./images/katerina-kerdi-xp_w_LvY0pg-unsplash.jpg" />
            <div class="profile-image">
                <img src="./images/Alibaba-anime2.png">
            </div>
        </div>
        <div class="profile-details">
            <div class="profile-item">
                <div class="icon1"><i class="fas fa-user"></i></div>
                <a class="profile-btn"><span>Account details</span></a>
            </div>
            <div class="profile-item">
                <div class="icon1"><i class="fas fa-user"></i></div>
                <a class="profile-btn"><span>Prayer log</span></a>
            </div>
        </div>
    </div>
</div>
<div class="footer-container">
    <footer>
        <div class="footnote">
            My Salat <span class="copyright">© 2021</span> All rights reserved.
            <p>Read our <a href="index.php">Terms and Conditions</a> and <a href="index.php">Privacy Policies</a></p>
        </div>
    </footer>
</div>
<script>
    // toggle drop down menu
    function showMenu() {
        document.getElementById('dropdown').classList.toggle('show');
    }
    // close drop down if user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropdown-btn')) {
            let dropdowns = document.getElementsByClassName('dropdown-content');
            for (let i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
</script>
</body>
</html>
