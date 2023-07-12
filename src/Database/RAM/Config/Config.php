<?php

$con = new mysqli(

    //! HOST
    "localhost",

    //! USERNAME 
    "root",

    //! PASSWORD
    "12345678",

    //! DATABASE NAME
    "b_med_iden"

);

$con->query("SET CHARACTER SET utf8");
