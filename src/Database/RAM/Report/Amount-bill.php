<?php

    // ===================== //
    // CONFIG DATABASE       //
    // ===================== //
    include "../Config/Config.php";

    // ====================== //
    // สำคัญ                  //
    // ====================== //
    header("Access-Control-Allow-Origin: *");
    date_default_timezone_set('Asia/Bangkok');

    $KitCod = $_GET['Kitchen'];
    $Date_Today = date("Ymd");
    $dbdata = array();


        $ID1 = $_GET['ID1'];
        $ID2 = $_GET['ID2'];

        $query = $con->query("  SELECT SUM(`fodmst`.`FodPrcNum`*`pirinf`.`PirOdrQty`) Amount, SUM(`pirinf`.`PirOdrQty`) SumQTY, PirBillCod1, PirBillCod2
                                FROM `pirinf` 
                                INNER JOIN `fodmst` 
                                ON `pirinf`.`PirMnuCod` = `fodmst`.`FodMnuCod` 
                                WHERE PirBillCod1 = '$ID1'
                                AND PirBillCod2 = '$ID2';");


    while ( $row1 = $query->fetch_assoc())  {

        $dbdata[]=$row1;

    }

    echo json_encode($dbdata);

?>