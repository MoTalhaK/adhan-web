<?php
session_start();
// if user is not logged in, redirect them to the login page
if (!isset($_SESSION['loggedin'])) {
    header('Location: login.html');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Adhan App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"-->
          <!--integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">-->
    <!--<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">-->
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="./calendar.css">
    <link rel="stylesheet" href="./footer.css">
</head>
<body>
<header>
    <div>
        <h1 id="main-title">My Salat</h1>
        <!--<h2 id="next-prayer"></h2>-->
        <div class="timer">
            <h2 id="next-prayer-text"></h2>
            <h2 id="next-prayer"></h2>
        </div>
    </div>
    <div class="reg">
        <a href="login.html" class="btn"><span>Login</span></a>
        <a href="register.php" class="btn"><span>Register</span></a>
        <?php
        if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
            echo '<style type="text/css"> .btn {display: none;} </style>';
        }
        ?>
        <p>Welcome back, <?=$_SESSION['name']?>!</p>
    </div>
</header>

<div class="main">
    <div class="main-display">
        <div class="text-display">
            <p id="prayer-text">Showing prayer timings for</p>
        </div>
        <div class="date-container">
            <h2 class="date"></h2>
            <h2 class="city"></h2>
        </div>
        <div class="prayer-field">
            <form class="search-form">
                <input id="search-bar" type="text" placeholder="Location.." name="search">
            </form>
            <div class="prayers">
                <div class="prayer">
                    <p class="prayer-name">Fajr</p>
                    <h2 class="prayer-time" id="fajr"></h2>
                </div>
                <div class="prayer">
                    <p class="prayer-name">Sunrise</p>
                    <h2 class="prayer-time" id="sunrise"></h2>
                </div>
                <div class="prayer">
                    <p class="prayer-name">Dhuhr</p>
                    <h2 class="prayer-time" id="dhuhr"></h2>
                </div>
                <div class="prayer">
                    <p class="prayer-name">Asr</p>
                    <h2 class="prayer-time" id="asr"></h2>
                </div>
                <div class="prayer">
                    <p class="prayer-name">Maghrib</p>
                    <h2 class="prayer-time" id="maghrib"></h2>
                </div>
                <div class="prayer">
                    <p class="prayer-name">Isha'a</p>
                    <h2 class="prayer-time" id="ishaa"></h2>
                </div>
            </div>
        </div>
    </div>
    <div class="details">
        <div>
            <p class="details-text">Calculation Method</p>
            <p id="prayer-method"></p>
        </div>
        <div>
            <p class="details-text">Latitude/Longitude</p>
            <p id="lat"></p>
        </div>
        <div>
            <p class="details-text">Juristic Method</p>
            <p>Shafi, Maliki, Hanbali</p>
        </div>
    </div>
</div>
<div></div>
<div class="main" id="prayer-calendar">
    <div class="calendar-bg">
        <h2>Prayer Calendar</h2>
        <h2 id="calendar-month"></h2>
        <h2 id="hidden">Prayer Calendar</h2>
        <div class="calendar">
            <table>
                <thead>
                    <tr>
                        <th id="month"></th>
                        <th>Fajr</th>
                        <th>Sunrise</th>
                        <th>Dhuhr</th>
                        <th>Asr</th>
                        <th>Maghrib</th>
                        <th>Isha'a</th>
                    </tr>
                </thead>
                <tbody id="calendar-body">
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr>
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                    <tr class="last-date">
                        <th class="calendar-date"></th>
                        <td class="fajr-prayer"></td>
                        <td class="sunrise"></td>
                        <td class="dhuhr-prayer"></td>
                        <td class="asr-prayer"></td>
                        <td class="maghrib-prayer"></td>
                        <td class="isha-prayer"></td>
                    </tr>
                </tbody>
            </table>
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
<script src="luxon.js"></script>
<script src="timer.js"></script>
<script src="calendar.js"></script>
<script src="calculation-method.js"></script>
<script src="app.js"></script>
</body>
</html>