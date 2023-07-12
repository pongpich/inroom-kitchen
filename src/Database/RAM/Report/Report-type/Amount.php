<?php

    // ===================== //
    // CONFIG DATABASE       //
    // ===================== //
    include "../../Config/Config.php";

    // ====================== //
    // สำคัญ                  //
    // ====================== //
    header("Access-Control-Allow-Origin: *");
    date_default_timezone_set('Asia/Bangkok');

    $KitCod = $_GET['Kitchen'];
    $Date_Today = date("Ymd");
    $dbdata = array();

    if(isset($_GET['Report_start'])){
        if (isset($_GET['Report_Timestart'])) {
        
                $REPORT_START = $_GET['Report_start'];
                $REPORT_END = $_GET['Report_end'];
                $REPORT_TIMESTART = $_GET['Report_Timestart'];
                $REPORT_TIMEEND = $_GET['Report_Timeend'];

                if(isset( $_GET['Type'])){
            
                        $TYPE = $_GET['Type'];

                        $query = $con->query("  SELECT SUM(`fodmst`.`FodPrcNum`*`pirinf`.`PirOdrQty`) Amount, SUM(`pirinf`.`PirOdrQty`) SumQTY
                                                FROM `pirinf` 
                                                INNER JOIN `fodmst` 
                                                ON `pirinf`.`PirMnuCod` = `fodmst`.`FodMnuCod` 
                                                WHERE `fodmst`.`FodKitCod` = '$KitCod'
                                                AND PirPrcTyp = '$TYPE'
                                                AND PirOdrStt = 'F'
                                                AND PirOdrDte BETWEEN '$REPORT_START' AND '$REPORT_END'
                                                AND PirOdrTme BETWEEN '$REPORT_TIMESTART' AND '$REPORT_TIMEEND'
                                                ")
                                                ;
                while ( $row1 = $query->fetch_assoc())  {
                        $dbdata[]=$row1;
                } 
            }else {
                $query = $con->query("  SELECT SUM(`fodmst`.`FodPrcNum`*`pirinf`.`PirOdrQty`) Amount, SUM(`pirinf`.`PirOdrQty`) SumQTY
                FROM `pirinf` 
                INNER JOIN `fodmst` 
                ON `pirinf`.`PirMnuCod` = `fodmst`.`FodMnuCod` 
                WHERE `fodmst`.`FodKitCod` = '$KitCod'
                AND PirOdrStt = 'F'
                AND PirOdrDte BETWEEN '$REPORT_START' AND '$REPORT_END'
                AND PirOdrTme BETWEEN '$REPORT_TIMESTART' AND '$REPORT_TIMEEND' 
                ")
                ;
                while ( $row1 = $query->fetch_assoc())  {
                $dbdata[]=$row1;
            }
        }
    }


    }else{

        $query = $con->query("  SELECT SUM(`fodmst`.`FodPrcNum`*`pirinf`.`PirOdrQty`) Amount, SUM(`pirinf`.`PirOdrQty`) SumQTY
                                FROM `pirinf` 
                                INNER JOIN `fodmst` 
                                ON `pirinf`.`PirMnuCod` = `fodmst`.`FodMnuCod` 
                                WHERE `fodmst`.`FodKitCod` = '$KitCod'
                                AND `pirinf`.`PirOdrDte` = '$Date_Today'
                                AND PirPrcTyp = '$TYPE'
                                AND PirOdrStt = 'F';");


        while ( $row1 = $query->fetch_assoc())  {

            $dbdata[]=$row1;

        }

    }
    
    echo json_encode($dbdata);

?>