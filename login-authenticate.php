<?php
session_start();
$DATABASE_HOST = 'localhost';
$DATABASE_USER = 'root';
$DATABASE_PASS = '';
$DATABASE_NAME = 'mysalatlogin';

$success = "";
$submitted = false;
$email_err = $password_err = "";

// connect to db using above info
$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if (mysqli_connect_errno()) {
    // stop the script if there is an error connecting
    exit('Failed to connect: ' . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
// check if the data was submitted, isset() checks if the data exists
    if (!isset($_POST['email'], $_POST['password'])) {
        // user did not enter required data
        exit('Please fill in both the email and password fields!');
    }

    /***************form validation***************/
// email validation
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        exit('Email is not valid!');
    }
// check for invalid characters
//    if (preg_match('/^[a-zA-Z0-9]+$/', $_POST['username']) == 0) {
//        exit('Username not valid!');
//    }
//check character length
//    if (strlen($_POST['password']) > 20 || strlen($_POST['password']) < 5) {
//        $password_err = 'Password must be between 5 and 20 characters long!';
////    exit('Password must be between 5 and 20 characters long!');
////        exit();
//    }

// check if account already exists
    if ($stmt = $con->prepare('SELECT id, password FROM accounts WHERE email = ?')) {
        $stmt->bind_param('s', $_POST['email']);
        $stmt->execute();
        $stmt->store_result();
        // storing the result to see if the account exists in the database
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($id, $password);
            $stmt->fetch();
            // account exists, verify password
            if (password_verify($_POST['password'], $password)) {
                // successful, user is logged in
                // create session so we now that the user has logged in
                session_regenerate_id();
                $_SESSION['loggedin'] = TRUE;
                $_SESSION['name'] = $_POST['email'];
                $_SESSION['password'] = $_POST['password'];
                $_SESSION['id'] = $id;
                header('Location: index.php');
            } else {
                // incorrect password
                echo 'Incorrect username and/or password!';
            }
        } else {
            // incorrect username
            echo 'Incorrect username and/or password!';
        }
        $stmt->close();
    } else {
        // problem in sql statement, check and make sure the accounts table exists
        echo 'Could not prepare the statement!';
    }
    $con->close();
}
?>