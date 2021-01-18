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
$DATABASE_NAME = 'mysalatlogin';

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
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="./footer.css">
    <script src="https://code.jquery.com/jquery-3.5.1.js"
            integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
</head>
<body>
<header>
    <div>
        <h1 id="main-title">My Salat</h1>
<!--        <div class="timer">-->
<!--            <h2 id="next-prayer-text"></h2>-->
<!--            <h2 id="next-prayer"></h2>-->
<!--        </div>-->
    </div>
<!--    <div class="reg">-->
<!--        <a href="login.html" class="btn"><span>Login</span></a>-->
<!--        <a href="register.php" class="btn"><span>Register</span></a>-->
<!--    </div>-->
</header>
<div class="main">

</div>
<div class="footer-container">
    <footer>
        <div class="footnote">
            My Salat <span class="copyright">© 2021</span> All rights reserved.
            <p>Read our <a href="index.php">Terms and Conditions</a> and <a href="index.php">Privacy Policies</a></p>
        </div>
    </footer>
</div>
</body>
</html>
