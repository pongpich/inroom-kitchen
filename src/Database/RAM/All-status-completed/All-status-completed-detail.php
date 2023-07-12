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
                                            PirSeq,
                                            PirBillCod1,
                                            PirBillCod2,
                                            FodKitCod,
                                            FodBitCod,
                                            FodMnuNamThai,
                                            PirOdrQty,
                                            PirOdrCmt,
                                            FodPrcNum,
                                            PirPrcTyp,
                                            PirOdrStt,
                                            PirScanCheck,
                                            PirOdrDte
                                        FROM
                                            pirinf
                                        INNER JOIN `fodmst` ON `fodmst`.`FodMnuCod` = `pirinf`.`PirMnuCod` AND `fodmst`.`FodKitCod` = '$KITCHEN'
                                        WHERE PirBillCod1 = '$ID1'
                                            AND PirBillCod2 = '$ID2'
                                            AND PirOdrDte = '$Date_Today'
                                            AND PirPatSrv = 'F'
                                            AND PirOdrStt = 'F'
                                            
                                        ORDER BY
                                            PirSeq ASC;");

        while ( $row = $All_order->fetch_assoc())  {
            $row['SetTime'] =  "-";
            $row['PirFodInf'] =  "";

            if($row['PirPrcTyp'] === "C"){
                $dbdata[]=$row;
            }
            
            if($row['PirPrcTyp'] === "T"){
                $dbdata[]=$row;
            }
            
        }

    }else{

        if(isset($_GET['Date'])){

            $DATE_DATA = $_GET['Date'];

            $All_order = $con -> query("SELECT
                                            PirSeq,
                                            PirBillCod1,
                                            PirBillCod2,
                                            FodKitCod,
                                            FodBitCod,
                                            FodMnuNamThai,
                                            PirOdrQty,
                                            PirOdrCmt,
                                            FodPrcNum,
                                            PirPrcTyp,
                                            PirOdrStt,
                                            PirScanCheck,
                                            PirOdrDte
                                        FROM
                                            pirinf
                                        INNER JOIN `fodmst` ON `fodmst`.`FodMnuCod` = `pirinf`.`PirMnuCod` AND `fodmst`.`FodKitCod` = '$KITCHEN'
                                        WHERE PirOdrDte = '$DATE_DATA'
                                            AND PirPatSrv = 'F'
                                            AND PirOdrStt = 'F' OR PirOdrStt = 'P'
                                        ORDER BY
                                            PirSeq ASC;");

            while ( $row = $All_order->fetch_assoc())  {
                $row['SetTime'] =  "-";
                $row['PirFodInf'] =  "";

                $dbdata[]=$row;
            }

        }else{

            $All_order = $con -> query("SELECT
                                            PirSeq,
                                            PirBillCod1,
                                            PirBillCod2,
                                            FodKitCod,
                                            FodBitCod,
                                            FodMnuNamThai,
                                            PirOdrQty,
                                            PirOdrCmt,
                                            FodPrcNum,
                                            PirPrcTyp,
                                            PirOdrStt,
                                            PirScanCheck,
                                            PirOdrDte
                                        FROM
                                            pirinf
                                        INNER JOIN `fodmst` ON `fodmst`.`FodMnuCod` = `pirinf`.`PirMnuCod` AND `fodmst`.`FodKitCod` = '$KITCHEN'
                                        WHERE PirOdrDte = '$Date_Today'
                                            AND PirPatSrv = 'F'
                                            AND PirOdrStt = 'F' OR PirOdrStt = 'P'
                                            
                                            
                                        ORDER BY
                                            PirSeq ASC;");

            while ( $row = $All_order->fetch_assoc())  {
                $row['SetTime'] =  "-";
                $row['PirFodInf'] =  "";

                $dbdata[]=$row;
            }

        }

    }


    echo json_encode($dbdata);