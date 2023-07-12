<?php

    // ===================== //
    // CONFIG DATABASE       //
    // ===================== //
    include "../../Config/Config.php";

    // ====================== //
    // สำคัญ                  //
    // ====================== //
    header("Access-Control-Allow-Origin: *");

    $Bill1 = $_GET['Bill1'];
    $Bill2 = $_GET['Bill2'];
    $Kitchen = $_GET['Kitchen'];

    $UpdateData = " UPDATE
                        `pirinf` J1
                    INNER JOIN `fodmst` J2 ON J1.PirMnuCod = J2.FodMnuCod
                    SET
                        J1.PirOdrStt = 'C',
                        J1.PirScanCheck = '0'
                    WHERE
                        J1.PirBillCod1 = '$Bill1'
                        AND J1.PirBillCod2 = '$Bill2'
                        AND J2.FodKitCod = '$Kitchen';";
    $con -> query($UpdateData);

    echo($Kitchen);
    
?>