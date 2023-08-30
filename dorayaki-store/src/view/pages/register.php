<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/src/view/styles/ui.css">
    <link rel="stylesheet" href="/src/view/styles/register.css">
    <title>Login - Trio Nyambat</title>
</head>
<body>
    <div class="register-container">
        <form action="/register" method="post">
            <div class="register-input">
                <label for="email">Email</label>
                <input required type="email" id="email" name="email">
                <label for="fname">Username</label>
                <input required type="text" id="username" name="username">
                <label for="lname">Password</label>
                <input required type="password" id="password" name="password">
            </div>
            
            <button disabled type="submit" class="button register-button">Register</button>
        </form>
    </div>
    <script type="module" src="/src/view/scripts/registerValidation.js" async></script>
</body>
</html>
