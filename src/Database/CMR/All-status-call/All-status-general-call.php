<?php

    // ===================== //
    // CONFIG DATABASE       //
    // ===================== //
    include "../Config/Config.php";

    header("Access-Control-Allow-Origin: *");
    
    $dbdata = array();

    $All_order = $con -> query("SELECT
                                    *
                                FROM
                                    pirinf
                                    INNER JOIN `fodmst` ON `fodmst`.`FodSeq` = `pirinf`.`PirMnuCod`
                                WHERE
                                    PirPatSrv = 'F'
                                    AND PirOrderTy != 'S'
                                    AND PirOdrStt = 'C';
                                ");

    while ( $row = $All_order->fetch_assoc())  {

        $row['SetTime'] =  "";
        $row['PirFodInf'] =  "";

        $dbdata[]=$row;
    }

    echo json_encode($dbdata);

?>