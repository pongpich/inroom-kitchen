<?php

    // ===================== //
    // CONFIG DATABASE       //
    // ===================== //
    include "../../Config/Config.php";

    // ====================== //
    // สำคัญ                  //
    // ====================== //
    header("Access-Control-Allow-Origin: *");

    $idOrder = $_GET['IdOrder'];

    $UpdateData = "UPDATE `pirinf` SET `PirOdrStt` = 'F' WHERE `pirinf`.`PirSeq` = '$idOrder';";
    $con -> query($UpdateData);

    echo("Success!");
    
?>