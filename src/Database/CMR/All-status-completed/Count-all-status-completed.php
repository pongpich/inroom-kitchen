<?php

    // ===================== //
    // CONFIG DATABASE       //
    // ===================== //
    include "../Config/Config.php";

    header("Access-Control-Allow-Origin: *");
    
    $dbdata = array();

    $count_1 = 0;
    $count_2 = 0;

    $All_order = $con -> query("SELECT
                                    COUNT(*) QTY1
                                FROM
                                    pirinf
                                    INNER JOIN `fodmst` ON `fodmst`.`FodSeq` = `pirinf`.`PirMnuCod`
                                WHERE
                                    PirPatSrv = 'F'
                                    AND PirOrderTy != 'S'
                                    AND PirOdrStt = 'F';
                                ");

    while ( $row = $All_order -> fetch_assoc())  {
        $dbdata[]=$row;
    }

    $fastfood2 = $con->query("  SELECT
                                    COUNT(*) QTY2
                                FROM
                                    `pirinf`
                                    INNER JOIN `setmst` ON pirinf.PirMnuCod = setmst.IdSetSeq
                                WHERE
                                    pirinf.PirOdrStt = 'F'
                                    AND pirinf.PirOrderTy = 'S';");  

    while ( $row = $fastfood2 -> fetch_assoc())  {
        $dbdata[]=$row;
    }

    echo json_encode($dbdata);

?>