<?php

function render(){
    if($_SERVER['REQUEST_URI'] == '/index'){
        header("Location: /");
        exit;
    }
    $path = $_SERVER['REQUEST_URI'] && $_SERVER['REQUEST_URI'] !='/'  ? 'pages'.$_SERVER['REQUEST_URI'].'.php': 'pages/index.php';
    if(file_exists($path)) { renderPage($path); return; }
    echo "<div><h3>No such file or directory in '".$path."'</h3></div>";
}

function import($partial){
    $file = 'partials/'.$partial.'.html';
    echo file_exists($file)? file_get_contents('partials/'.$partial.'.html') :
        "<div><h3>No such file or directory in \"".$file."\"</h3></div>";
};

function renderPage($data){
    echo '<!doctype html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Document</title>
                    <link rel="stylesheet" href="dist/css/app.css">
                </head>
            <body>';
    require $data;
    echo '</body> </html>';
}