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

    $ORDER = $con -> query("SELECT
                                *
                            FROM
                                PirSeq
                            WHERE
                                PirSeq = '$idOrder';");

    while ( $row = $ORDER->fetch_assoc())  {

        if($row["PirScanCheck"] != 0){

        }else{

        }

        $DATA = intval($row["PirScanCheck"] += 1);

        $UpdateData = "UPDATE `pirinf` SET `PirOdrStt` = 'F', `PirScanCheck` = '$DATA' WHERE `pirinf`.`PirSeq` = '$idOrder';";
        $con -> query($UpdateData);
    
        echo("Success!");

    }
    
?>