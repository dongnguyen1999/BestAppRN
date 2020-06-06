<?php
  require "connect.php";
  $id = $_GET['tour_id'];
  // echo $comId;

  $sql = "SELECT T_Id FROM TOUR WHERE T_Id=$id";
  $result = $connect->query($sql);
  if ($result->num_rows > 0) {
    $sql = "DELETE FROM TOUR_PLACE WHERE T_Id=$id";
    $result = $connect->query($sql);
    // if ($result === TRUE) {
    //   echo ";Delete places success;";
    // } else {
    //   echo ";Delete places error: " . $connect->error;
    // }
    $sql = "DELETE FROM TOUR WHERE T_Id=$id";
    $result = $connect->query($sql);
    // if ($result === TRUE) {
    //   echo ";Delete tour sucess;";
    // } else {
    //   echo ";Delete tour error: " . $connect->error;
    // }
  }
  $connect->close();
?>
