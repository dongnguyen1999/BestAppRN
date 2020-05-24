<?php
  require "connect.php";

  $tourId = $_GET['tour_id'];

  $sql = "SELECT P_Id FROM TOUR_PLACE WHERE T_Id = '".$tourId."'";

  $result = $connect->query($sql);

  $places = array();

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $temp['id'] = $row['P_Id'];
      array_push($places, $temp);
    }
  }
  echo json_encode($places);
  $connect->close();
?>