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

    $SEQ = $_GET['SEQ'];
    $Date_Today = date("Ymd");

    $dbdata = array();

    $Scan_detail = $con -> query("  SELECT
                                        *,
                                        DATE_FORMAT(PirOdrDte,'%d/%m/%Y') As PirOdrDte, 
                                        TIME_FORMAT(PirOdrTme, '%i:%S') As PirOdrTme
                                    FROM
                                        pirinf J1
                                        INNER JOIN fodmst J2 ON J1.PirMnuCod = J2.FodMnuCod
                                    WHERE
                                        PirOdrStt = 'F'
                                        AND PirSeq = '$SEQ'
                                        AND PirOdrDte = '$Date_Today';");
                        
    while ( $row = $Scan_detail -> fetch_assoc()) {

        if($row["PirOdrQty"] != $row["PirScanCheck"]){
            $dbdata[]=$row;
        }

    }

    $Scan_detail2 = $con -> query("  SELECT
                                        *,
                                        DATE_FORMAT(PirOdrDte,'%d/%m/%Y') As PirOdrDte, 
                                        TIME_FORMAT(PirOdrTme, '%i:%S') As PirOdrTme
                                    FROM
                                        pirinf J1
                                        INNER JOIN fodmst J2 ON J1.PirMnuCod = J2.FodMnuCod
                                    WHERE
                                        PirOdrStt = 'P' 
                                        AND PirSeq = '$SEQ'
                                        AND PirOdrDte = '$Date_Today';");
                                        

    while ( $row = $Scan_detail2 -> fetch_assoc()) {

        if($row["PirOdrQty"] != $row["PirScanCheck"]){
            $dbdata[]=$row;
        }

    }


    $Scan_Not_date = $con -> query("  SELECT
                                    *,
                                    DATE_FORMAT(PirOdrDte,'%d/%m/%Y') As PirOdrDte, 
                                    TIME_FORMAT(PirOdrTme, '%i:%S') As PirOdrTme
                                FROM
                                    pirinf J1
                                    INNER JOIN fodmst J2 ON J1.PirMnuCod = J2.FodMnuCod
                                WHERE
                                    PirOdrStt = 'P' 
                                    AND PirSeq = '$SEQ'
                                    AND PirOdrDte != '$Date_Today';");
                                        

    while ( $row = $Scan_Not_date -> fetch_assoc()) {

        if($row["PirOdrQty"] != $row["PirScanCheck"]){

            $a = array("PirSeq"=>"old");
            $dbdata[] = $a;
        }

    }

    echo json_encode($dbdata);
    
?>