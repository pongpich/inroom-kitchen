<?php

    // ===================== //
    // CONFIG DATABASE       //
    // ===================== //
    include "../Config/Config.php";

    header("Access-Control-Allow-Origin: *");
    date_default_timezone_set('Asia/Bangkok');

    $ID_BILL2 = $_GET['id_bill2'];
    $KITCHEN = $_GET['Kitchen'];
    $Date_Today = date("Ymd");
    
    $dbdata = array();

    $All_order = $con -> query("SELECT
                                    *
                                FROM
                                    pirinf
                                    INNER JOIN `fodmst` ON `fodmst`.`FodMnuCod` = `pirinf`.`PirMnuCod`
                                WHERE
                                    PirPatSrv = 'F'
                                    AND PirBillCod2 = '$ID_BILL2'
                                    AND FodKitCod = '$KITCHEN'
                                    AND PirOdrDte = '$Date_Today';");

    while ( $row = $All_order -> fetch_assoc())  {
        $dbdata[]=$row;
    }

    echo json_encode($dbdata);
