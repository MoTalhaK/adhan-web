<?php
// logout script
// destroy sessions
session_start();
session_destroy();
header('Location: login.html');
?>