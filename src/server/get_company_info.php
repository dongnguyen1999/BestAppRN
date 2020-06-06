<?php
  require "connect.php";

  if (isset($_GET['com_id'])) {
    $comId = $_GET['com_id'];
    $sql = "SELECT * FROM COMPANY WHERE C_Id = '".$comId."';";
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
  } else {
    $sql = "SELECT * FROM COMPANY;";
    $result = $connect->query($sql);
    $array = array();
    $temp = array();
    while ($row = $result->fetch_assoc()) {
      $temp['id'] = $row['C_Id'];
      $temp['name'] = $row['C_Name'];
      $temp['address'] = $row['C_Address'];
      $temp['mail'] = $row['C_Mail'];
      $temp['phone'] = $row['C_Phone'];
      array_push($array, $temp);
    }
    echo json_encode($array);
  }
  $connect->close();
?>