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

    if(isset($_GET['ID1'])){

        $ID1 = $_GET['ID1'];
        $ID2 = $_GET['ID2'];

        $All_order = $con -> query("SELECT
                                    DISTINCT PirBillCod1,
                                    PirBillCod2,
                                    PirWrdCod,
                                    PirRoomCod,
                                    PirBedCod,
                                    PirUserName,
                                    PirUserAge,
                                    PirHn,
                                    DATE_FORMAT(PirOdrDte,'%d/%m/%Y') As PirOdrDte, 
                                    TIME_FORMAT(PirOdrTme, '%i:%S') As PirOdrTme
                                FROM
                                    pirinf
                                    INNER JOIN `fodmst` ON `fodmst`.`FodMnuCod` = `pirinf`.`PirMnuCod`
                                WHERE
                                    PirPatSrv = 'F'
                                    AND PirOdrStt = 'C'
                                    AND FodKitCod = '$KITCHEN'
                                    AND PirBillCod1 = '$ID1'
                                    AND PirBillCod2 = '$ID2'
                                    AND PirOdrDte = '$Date_Today'
                                ORDER BY
                                    PirSeq ASC;
                                ");

        while ( $row = $All_order->fetch_assoc())  {
            $row['SetTime'] =  "-";
            $row['PirFodInf'] =  "";

            $dbdata[]=$row;
        }

    }else{

        $All_order = $con -> query("SELECT
                                        DISTINCT PirBillCod1,
                                        PirBillCod2,
                                        PirWrdCod,
                                        PirRoomCod,
                                        PirBedCod,
                                        PirUserName,
                                        PirUserAge,
                                        PirHn,
                                        DATE_FORMAT(PirOdrDte,'%d/%m/%Y') As PirOdrDte, 
                                        TIME_FORMAT(PirOdrTme, '%i:%S') As PirOdrTme
                                    FROM
                                        pirinf
                                        INNER JOIN `fodmst` ON `fodmst`.`FodMnuCod` = `pirinf`.`PirMnuCod`
                                    WHERE
                                        PirPatSrv = 'F'
                                        AND PirOdrStt = 'C'
                                        AND FodKitCod = '$KITCHEN'
                                        AND PirOdrDte = '$Date_Today'
                                    ORDER BY
                                        PirSeq ASC;
                                    ");

        while ( $row = $All_order->fetch_assoc())  {
            $row['SetTime'] =  "-";
            $row['PirFodInf'] =  "";

            $dbdata[]=$row;
        }

    }



    echo json_encode($dbdata);
