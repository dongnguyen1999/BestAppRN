<?php
  require "connect.php";

  $comId = $_GET['com_id'];

  $sql = "SELECT * FROM COMPANY WHERE C_Id = '".$comId."'";

  $result = $connect->query($sql);

  $temp = array();

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $temp['id'] = $row['C_Id'];
    $temp['name'] = $row['C_Name'];
    $temp['address'] = $row['C_Address'];
    $temp['mail'] = $row['C_Mail'];
    $temp['phone'] = $row['C_Phone'];
    echo json_encode($temp);
  }
  $connect->close();
?>