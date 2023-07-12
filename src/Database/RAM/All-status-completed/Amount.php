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


    $ID1 = $_GET['Billid1'];
    $ID2 = $_GET['Billid2'];

    if(isset($_GET['Type_t'])){

        $query = $con->query("  SELECT SUM(`fodmst`.`FodPrcNum`*`pirinf`.`PirOdrQty`) Amount_T, SUM(`pirinf`.`PirOdrQty`) SumQTY_T
                            FROM `pirinf` 
                            INNER JOIN `fodmst` 
                            ON `pirinf`.`PirMnuCod` = `fodmst`.`FodMnuCod` 
                            WHERE `pirinf`.`PirBillCod1` = '$ID1'
                            AND `fodmst`.`FodKitCod` = '$KitCod'
                            AND `pirinf`.`PirBillCod2` = '$ID2'
                            AND `pirinf`.`PirOdrStt` = 'F'
                            AND `pirinf`.`PirPrcTyp` = 'T';");


        while ( $row1 = $query->fetch_assoc())  {

            $dbdata[]=$row1;

        }

    }

    if(isset($_GET['Type_c'])){

        $query = $con->query("  SELECT SUM(`fodmst`.`FodPrcNum`*`pirinf`.`PirOdrQty`) Amount_C, SUM(`pirinf`.`PirOdrQty`) SumQTY_C
        FROM `pirinf` 
        INNER JOIN `fodmst` 
        ON `pirinf`.`PirMnuCod` = `fodmst`.`FodMnuCod` 
        WHERE `pirinf`.`PirBillCod1` = '$ID1'
        AND `fodmst`.`FodKitCod` = '$KitCod'
        AND `pirinf`.`PirBillCod2` = '$ID2'
        AND `pirinf`.`PirOdrStt` = 'F'
        AND `pirinf`.`PirPrcTyp` = 'C';");


        while ( $row1 = $query->fetch_assoc())  {

            $dbdata[]=$row1;

        }

    }

    
    echo json_encode($dbdata);

?>