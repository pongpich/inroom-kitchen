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

    $All_order = $con -> query("SELECT
                                    PirSeq,
                                    PirBillCod1,
                                    PirBillCod2,
                                    FodKitCod,
                                    FodBitCod,
                                    FodMnuNamThai,
                                    PirOdrQty,
                                    FodPrcNum,
                                    PirOdrCmt
                                FROM
                                    pirinf
                                    INNER JOIN `fodmst` ON `fodmst`.`FodMnuCod` = `pirinf`.`PirMnuCod`
                                WHERE
                                    PirPatSrv = 'F'
                                    AND PirOdrStt = 'R'
                                    AND FodKitCod = '$KITCHEN'
                                    AND PirOdrDte = '$Date_Today'
                                ORDER BY
                                    PirSeq ASC;");

    while ( $row = $All_order->fetch_assoc())  {
        $row['SetTime'] =  "-";
        $row['PirFodInf'] =  "";

        $dbdata[]=$row;
    }

    echo json_encode($dbdata);
