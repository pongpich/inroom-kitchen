<?php

    // ===================== //
    // CONFIG DATABASE       //
    // ===================== //
    include "../../Config/Config.php";

    header("Access-Control-Allow-Origin: *");
    date_default_timezone_set('Asia/Bangkok');

    $KITCHEN = $_GET['Kitchen'];
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
                        AND PirOdrStt = 'F'
                        AND FodKitCod = '$KITCHEN'
                        AND PirOdrDte BETWEEN '$REPORT_START' AND '$REPORT_END'
                        AND PirPrcTyp = '$TYPE'
                        AND PirOdrTme BETWEEN '$REPORT_TIMESTART' AND '$REPORT_TIMEEND'
                        
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
                            AND PirOdrStt = 'F'
                            AND FodKitCod = '$KITCHEN'
                            AND PirOdrDte BETWEEN '$REPORT_START' AND '$REPORT_END'
                            AND PirOdrTme BETWEEN '$REPORT_TIMESTART' AND '$REPORT_TIMEEND'
                        ORDER BY
                            PirSeq ASC;
                        ");

                        while ( $row = $All_order->fetch_assoc())  {
                            $row['SetTime'] =  "-";
                            $row['PirFodInf'] =  "";
                            $dbdata[]=$row;
                        }
        } 
    }
    }else{
        $TYPE = $_GET['Type'];

        if($TYPE != ''){

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
                                        AND PirOdrStt = 'F'
                                        AND FodKitCod = '$KITCHEN'
                                        AND PirOdrDte = '$Date_Today'
                                        AND PirPrcTyp = '$TYPE'
                                    ORDER BY
                                        PirSeq ASC;
                                    ");

                                    while ( $row = $All_order->fetch_assoc())  {
                                        $row['SetTime'] =  "-";
                                        $row['PirFodInf'] =  "";

                                        $dbdata[]=$row;
                                    }

        }


    }

    echo json_encode($dbdata);

?>