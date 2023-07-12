<?php

    // ===================== //
    // CONFIG DATABASE       //
    // ===================== //
    include "../Config/Config.php";

    header("Access-Control-Allow-Origin: *");
    date_default_timezone_set('Asia/Bangkok');

    $KITCHEN = $_GET['Kitchen'];
    $Date_Today = date("Ymd");
    
    $dbdata = array();

    $count_1 = 0;
    $count_2 = 0;

    $All_order = $con -> query("SELECT
                                    COUNT(DISTINCT PirBillCod1, PirBillCod2) QTY1
                                FROM
                                    pirinf
                                    INNER JOIN `fodmst` ON `fodmst`.`FodMnuCod` = `pirinf`.`PirMnuCod`
                                WHERE
                                    PirPatSrv = 'F'
                                    AND PirOdrStt = 'P'
                                    AND FodKitCod = '$KITCHEN'
                                    AND PirOdrDte = '$Date_Today';");

    while ( $row = $All_order -> fetch_assoc())  {
        $dbdata[]=$row;
    }

    echo json_encode($dbdata);
