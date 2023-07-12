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

    if(isset($_GET['Date'])){

        $DATE_DATA = $_GET['Date'];

        $All_order = $con -> query("SELECT
                                        COUNT(DISTINCT PirBillCod1, PirBillCod2) QTY1
                                    FROM
                                        pirinf
                                        INNER JOIN `fodmst` ON `fodmst`.`FodMnuCod` = `pirinf`.`PirMnuCod`
                                    WHERE
                                        PirPatSrv = 'F'
                                        AND FodKitCod = '$KITCHEN'
                                        AND PirOdrStt = 'F'
                                        AND PirOdrDte = '$DATE_DATA';");

        while ( $row = $All_order -> fetch_assoc())  {
            $dbdata[]=$row;
        }

    }else{

        $All_order = $con -> query("SELECT
                                        COUNT(DISTINCT PirBillCod1, PirBillCod2) QTY1
                                    FROM
                                        pirinf
                                        INNER JOIN `fodmst` ON `fodmst`.`FodMnuCod` = `pirinf`.`PirMnuCod`
                                    WHERE
                                        PirPatSrv = 'F'
                                        AND FodKitCod = '$KITCHEN'
                                        AND PirOdrStt = 'F'
                                        AND PirOdrDte = '$Date_Today';");

        while ( $row = $All_order -> fetch_assoc())  {
            $dbdata[]=$row;
        }
        
    }

    echo json_encode($dbdata);
