<?php
    // === สำคัญ == //
    header("Access-Control-Allow-Origin: *");

    $User = $_POST['User'];
    $Pass = $_POST['Pass'];

    // ORDER
    $FileContents = file_get_contents("http://10.88.3.14:8080/InRoom/DBService?dbServiceName=IRKitchen_Login&user=".$User."&pass=".$Pass);

    echo $FileContents;

?>