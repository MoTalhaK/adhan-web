<?php
$DATABASE_HOST = 'localhost';
$DATABASE_USER = 'root';
$DATABASE_PASS = '';
$DATABASE_NAME = 'mysalatregister';

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
    if (!isset($_POST['username'], $_POST['password'], $_POST['email'])) {
        // user did not enter required data
        exit();
//    exit('Please complete the registration form!');
    }
// check if registration values are not empty
    if (empty($_POST['username']) || empty($_POST['password']) || empty($_POST['email'])) {
        // one or more of the values are empty
        exit();
//    exit('Please complete the registration form!');
    }

    /***************form validation***************/
// email validation
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        exit('Email is not valid!');
    }
// check for invalid characters
    if (preg_match('/^[a-zA-Z0-9]+$/', $_POST['username']) == 0) {
        exit('Username not valid!');
    }
//check character length
    if (strlen($_POST['password']) > 20 || strlen($_POST['password']) < 5) {
        $password_err = 'Password must be between 5 and 20 characters long!';
//    exit('Password must be between 5 and 20 characters long!');
//        exit();
    }

// check if account already exists
    if ($stmt = $con->prepare('SELECT id, password FROM accounts WHERE username = ?')) {
        $stmt->bind_param('s', $_POST['username']);
        $stmt->execute();
        $stmt->store_result();
        // storing the result to see if the account exists in the database
        if ($stmt->num_rows > 0) {
            // username already exists
            echo 'Username already exists!';
        } else {
            // insert a new account
            if (empty($password_err)) {
                if ($stmt = $con->prepare('INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)')) {
                    // to avoid exposing any passwords in our database, we hash them and use password_hash when a user logs in
                    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
                    $stmt->bind_param('sss', $_POST['username'], $password, $_POST['email']);
                    $stmt->execute();
                    $success = 'Registration Successful! You may now login.';
                    $submitted = true;
//                echo 'Registration successful!';
                } else {
                    echo 'Could not prepare statement!';
                }
            }
            $stmt->close();
        }
    } else {
        // problem in sql statement, check and make sure the accounts table exists
        echo 'Could not prepare the statement!';
    }
    $con->close();
}
?>