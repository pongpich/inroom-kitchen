<?php

    // ===================== //
    // CONFIG DATABASE       //
    // ===================== //
    include "../Config/Config.php";

    header("Access-Control-Allow-Origin: *");
    
    $dbdata = array();

    $fastfood2 = $con->query("  SELECT
                                    COUNT(*) QTY1
                                FROM
                                    `pirinf`
                                    INNER JOIN `setmst` ON pirinf.PirMnuCod = setmst.IdSetSeq
                                WHERE
                                    pirinf.PirOdrStt = 'C'
                                    AND pirinf.PirOrderTy = 'S';");  

    while ( $row = $fastfood2 -> fetch_assoc())  {
        $dbdata[]=$row;
    }

    echo json_encode($dbdata);

?>