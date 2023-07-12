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
    $Kit = $_GET['Kitchen'];

    $ORDER = $con -> query("SELECT
                                *
                            FROM
                                pirinf
                            WHERE
                                PirSeq = '$idOrder';");

    while ( $row = $ORDER->fetch_assoc())  {

        $DATA = $row["PirScanCheck"] += 1;

        $UpdateData = " UPDATE
                            `pirinf`
                        SET
                            `PirOdrStt` = 'F',
                            `PirScanCheck` = '$DATA'
                        WHERE
                            `pirinf`.`PirSeq` = '$idOrder';";
        $con -> query($UpdateData);
    
        echo("Success!");

    }
    
?>