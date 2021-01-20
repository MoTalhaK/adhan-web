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
    <link rel="stylesheet" href="./register.css">
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="./footer.css">
    <script src="https://code.jquery.com/jquery-3.5.1.js"
            integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
</head>
<body>
<header>
    <div class="header-container">
        <div class="header-item"><a href="index.php"><img class="logo" src="images/logo.png" style="width: 70px;height: 70px;object-fit: cover"></a></div>
        <div class="timer">
            <h2 id="next-prayer-text"></h2>
            <h2 id="next-prayer"></h2>
        </div>
        <div class="reg">
            <a href="login.html" class="btn"><span>Login</span></a>
            <div class="border"></div>
            <a href="register.php" class="btn"><span>Register</span></a>
        </div>
    </div>
</header>
<div class="main">
    <div class="register-container">
        <div class="register-title">Register for My Salat</div>
        <form method="post" autocomplete="off" id="reg-form">
            <label for="username">
                <i class="fas fa-user"></i>
            </label>
            <input type="text" name="username" placeholder="Username" id="username" required>
            <label for="password">
                <i class="fas fa-lock"></i>
            </label>
            <input type="password" name="password" placeholder="Password" id="password" required>
            <label for="email">
                <i class="fas fa-envelope"></i>
            </label>
            <input type="email" name="email" placeholder="Email" id="email" required>
            <input type="submit" value="Register" >
        </form>
        <script>
            $(function () {

                $('form').on('submit', function (e) {

                    e.preventDefault();

                    $.ajax({
                        type: 'post',
                        url: 'register-submit.php',
                        data: $('form').serialize(),
                        success: function () {
                            $("#reg-form").html("<div id='message'></div>");
                            $("#message")
                                .html("<h2>Registration Successful! You may now login.</h2>");
                        }
                    });

                });

            });
        </script>
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
</body>
</html>