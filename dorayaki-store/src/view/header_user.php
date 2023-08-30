<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/src/view/styles/ui.css" />
    <link rel="stylesheet" href="/src/view/styles/header_usr.css">
    <link rel="stylesheet" href="/src/view/styles/dashboard.css">
    <link rel="stylesheet" href="/src/view/styles/footer.css">
    <link rel="stylesheet" href="/src/view/styles/detail-dorayaki-u.css">
    <link rel="stylesheet" href="/src/view/styles/beli-dorayaki.css">
    <link rel="stylesheet" href="/src/view/styles/pagination.css">
    <link rel="stylesheet" href="/src/view/styles/riwayat-update-stock.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="shortcut icon" type="image/x-icon" href="/src/view/dorayaki.png" />
    <title>Dorayahayahayuk</title>
</head>
<body>
    <nav class="navbar">
        <div class="left-nav-container">
            <a href="/dashboard" class="active"><i class="fa fa-fw fa-home fa-2x"></i></a>
            <div class="search-container">
                <form method="POST" action="/dorayaki/search?page=1">
                    <input type="text" id="search" placeholder="Search.." name="search">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>
        </div>
        <div class="right-nav-container">
            <a href="/update-history" class="cart"><i class="fa fa-cart-plus fa-2x" aria-hidden="true"></i></a>
            <a href="/logout" class="logout">Logout</a>
        </div>
    </nav>