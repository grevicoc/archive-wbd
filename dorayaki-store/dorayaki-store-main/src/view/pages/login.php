<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/src/view/styles/ui.css">
    <link rel="stylesheet" href="/src/view/styles/login.css">
    <title>Login - Trio Nyambat</title>
</head>
<body>
    <div class="login-box">
        <form action="/login" method="post">
            <label for="fname">Username</label><br>
            <input type="text" id="username" name="username"><br><br>
            <label for="lname">Password</label><br>
            <input type="password" id="password" name="password"><br><br>
            <button disabled type="submit" class="button submit-button"><span>Submit</span></button>
        </form>
        <p class="sign-up-text">
            Don't have an account? <a href="/register">Sign up here</a>  
        </p>
    </div>
    <script src="/src/view/scripts/loginValidation.js" async></script>
</body>
</html>