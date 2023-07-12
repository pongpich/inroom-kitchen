<?php

    // ===================== //
    // CONFIG DATABASE       //
    // ===================== //
    include "../Config/Config.php";

    header("Access-Control-Allow-Origin: *");
    date_default_timezone_set('Asia/Bangkok');

    $ID1 = $_GET['ID1'];
    $ID2 = $_GET['ID2'];
    $KITCHEN = $_GET['Kitchen'];
    $Date_Today = date("Ymd");
    
    $dbdata = array();

    $query = $con->query("  SELECT SUM(`fodmst`.`FodPrcNum`*`pirinf`.`PirOdrQty`) Amount_C, SUM(`pirinf`.`PirOdrQty`) SumQTY_C
                            FROM `pirinf` 
                            INNER JOIN `fodmst` 
                            ON `pirinf`.`PirMnuCod` = `fodmst`.`FodMnuCod` AND `fodmst`.`FodKitCod` = '$KITCHEN'
                            WHERE `pirinf`.`PirBillCod1` = '$ID1'
                            AND `pirinf`.`PirBillCod2` = '$ID2'
                            AND `pirinf`.`PirOdrStt` = 'C';");

    while ( $row = $query -> fetch_assoc())  {
        $dbdata[]=$row;
    }

    echo json_encode($dbdata);
