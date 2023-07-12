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

    if(isset($_GET['Report_start'])){

        $REPORT_START = $_GET['Report_start'];
        $REPORT_END = $_GET['Report_end'];

        $query = $con->query("  SELECT SUM(`fodmst`.`FodPrcNum`*`pirinf`.`PirOdrQty`) Amount, SUM(`pirinf`.`PirOdrQty`) SumQTY
                                FROM `pirinf` 
                                INNER JOIN `fodmst` 
                                ON `pirinf`.`PirMnuCod` = `fodmst`.`FodMnuCod` 
                                WHERE `fodmst`.`FodKitCod` = '$KitCod'
                                AND PirOdrStt = 'F'
                                AND PirOdrDte BETWEEN '$REPORT_START' AND '$REPORT_END';");


        while ( $row1 = $query->fetch_assoc())  {

            $dbdata[]=$row1;

        }

    }else{

        $query = $con->query("  SELECT SUM(`fodmst`.`FodPrcNum`*`pirinf`.`PirOdrQty`) Amount, SUM(`pirinf`.`PirOdrQty`) SumQTY
                                FROM `pirinf` 
                                INNER JOIN `fodmst` 
                                ON `pirinf`.`PirMnuCod` = `fodmst`.`FodMnuCod` 
                                WHERE `fodmst`.`FodKitCod` = '$KitCod'
                                AND `pirinf`.`PirOdrDte` = '$Date_Today'
                                AND PirOdrStt = 'F';");


        while ( $row1 = $query->fetch_assoc())  {

            $dbdata[]=$row1;

        }

    }
    
    echo json_encode($dbdata);

?>