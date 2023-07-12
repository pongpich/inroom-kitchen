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

    if(isset($_GET['Report_start'])){

        $REPORT_START = $_GET['Report_start'];
        $REPORT_END = $_GET['Report_end'];

        $All_order = $con -> query("SELECT
                                        PirSeq,
                                        PirHn,
                                        PirWrdCod,
                                        PirRoomCod,
                                        PirBedCod,
                                        PirBillCod1,
                                        PirBillCod2,
                                        FodKitCod,
                                        FodBitCod,
                                        FodMnuNamThai,
                                        PirOdrQty,
                                        PirOdrCmt,
                                        FodPrcNum,
                                        PirPrcTyp,
                                        PirOdrDte,
                                        PirOdrTme,
                                        PirOdrStt
                                    FROM
                                        pirinf
                                        INNER JOIN `fodmst` ON `fodmst`.`FodMnuCod` = `pirinf`.`PirMnuCod`
                                    WHERE
                                        PirPatSrv = 'F'
                                        AND PirOdrStt = 'F'
                                        AND FodKitCod = '$KITCHEN'
                                        AND PirOdrDte BETWEEN '$REPORT_START' AND '$REPORT_END'
                                    ORDER BY
                                        PirSeq ASC;
                                    ");

        while ( $row = $All_order->fetch_assoc())  {
            $row['SetTime'] =  "-";
            $row['PirFodInf'] =  "";

            $AM = $con->query("  SELECT SUM(`fodmst`.`FodPrcNum`*`pirinf`.`PirOdrQty`) Amount, SUM(`pirinf`.`PirOdrQty`) SumQTY
                                    FROM `pirinf` 
                                    INNER JOIN `fodmst` 
                                    ON `pirinf`.`PirMnuCod` = `fodmst`.`FodMnuCod` 
                                    WHERE PirBillCod1 = '$row[PirBillCod1]'
                                    AND FodKitCod = '$KITCHEN'
                                    AND PirBillCod2 = '$row[PirBillCod2]';");

            while ( $row2 = $AM->fetch_assoc()) {

                $dbdata[]=$row+$row2;

            }

           
        }

    }else{

        $All_order = $con -> query("SELECT
                                        PirSeq,
                                        PirHn,
                                        PirWrdCod,
                                        PirRoomCod,
                                        PirBedCod,
                                        PirBillCod1,
                                        PirBillCod2,
                                        FodKitCod,
                                        FodBitCod,
                                        FodMnuNamThai,
                                        PirOdrQty,
                                        PirOdrCmt,
                                        FodPrcNum,
                                        PirPrcTyp,
                                        PirOdrDte,
                                        PirOdrTme,
                                        PirOdrStt
                                    FROM
                                        pirinf
                                        INNER JOIN `fodmst` ON `fodmst`.`FodMnuCod` = `pirinf`.`PirMnuCod`
                                    WHERE
                                        PirPatSrv = 'F'
                                        AND PirOdrStt = 'F'
                                        AND FodKitCod = '$KITCHEN'
                                        AND PirOdrDte = '$Date_Today'
                                    ORDER BY
                                        PirSeq ASC;
                                    ");

        while ( $row = $All_order->fetch_assoc())  {
            $row['SetTime'] =  "-";
            $row['PirFodInf'] =  "";

            $AM = $con->query("  SELECT SUM(`fodmst`.`FodPrcNum`*`pirinf`.`PirOdrQty`) Amount, SUM(`pirinf`.`PirOdrQty`) SumQTY
                                    FROM `pirinf` 
                                    INNER JOIN `fodmst` 
                                    ON `pirinf`.`PirMnuCod` = `fodmst`.`FodMnuCod` 
                                    WHERE FodKitCod = '$KITCHEN' 
                                    AND PirBillCod1 = '$row[PirBillCod1]'
                                    AND PirBillCod2 = '$row[PirBillCod2]';");

            while ( $row2 = $AM->fetch_assoc()) {

            $dbdata[]=$row+$row2;

            }

            // $dbdata[]=$row;
        }

    }

    echo json_encode($dbdata);

?>