<?php

    // ===================== //
    // CONFIG DATABASE       //
    // ===================== //
    include "../../Config/Config.php";

    header("Access-Control-Allow-Origin: *");

    $thai_day_arr = array("อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์");

    function thai_date($time){
        global $thai_day_arr, $thai_month_arr;
        $thai_date_return = $thai_day_arr[date("w",$time)-1];
        return $thai_date_return ;
    }
    $eng_date = time();
    $Yesterday = thai_date($eng_date);
    
    $dbdata = array();

    $fastfood2 = $con->query("  SELECT
                                    pirinf.PirBillCod1,
                                    pirinf.PirBillCod2,
                                    TIME_FORMAT(pirinf.PirOdrTme, '%i:%S') As PirOdrTme,
                                    pirinf.PirOrderTy,
                                    pirinf.PirMnuCod,
                                    pirinf.PirWrdCod,
                                    pirinf.PirRoomCod,
                                    pirinf.PirBedCod,
                                    pirinf.PirOdrUser,
                                    pirinf.PirOdrStt,
                                    pirinf.PirSeq,
                                    pirinf.PirFodPrcSze,
                                    pirinf.PirOdrQty,
                                    pirinf.PirFodInf,
                                    pirinf.PirOdrCmt,
                                    setmst.IdSetSeq,
                                    setmst.SetName,
                                    setmst.SetPhoNam,
                                    setmst.SetPrc,
                                    setmst.SetDay,
                                    setmst.SetTime,
                                    setmst.SetRom
                                FROM
                                    `pirinf`
                                    INNER JOIN `setmst` ON pirinf.PirMnuCod = setmst.IdSetSeq
                                WHERE
                                    pirinf.PirOdrStt = 'C'
                                    AND pirinf.PirOrderTy = 'S'
                                    AND setmst.SetDay = '$Yesterday'
                                    AND setmst.SetTime = 'เช้า';");  

        while ( $row = $fastfood2->fetch_assoc())  {
            
            $row['PirFodInf'] = nl2br($row['PirFodInf']);
            $row['FodMnuNamThai'] = $row['SetName'];
            $row['SetTime'] =  $row['SetTime'];

            $dbdata[]=$row;
        }

    echo json_encode($dbdata);

?>