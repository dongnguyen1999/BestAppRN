<?php
  require "connect.php";
  
  $ids = $_GET['place_ids'];

  $sql = "SELECT * FROM TOUR WHERE T_Id in (SELECT DISTINCT TOUR_PLACE.T_Id FROM TOUR_PLACE WHERE TOUR_PLACE.P_Id in (".$ids.")) ORDER BY T_Id;";
  

  $result = $connect->query($sql);

  $tours = array();

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $temp['id'] = $row['T_Id'];
      $temp['com_id'] = $row['C_Id'];
      $temp['name'] = $row['T_Name'];
      $temp['nb_day'] = $row['T_Nb_day'];
      $temp['nb_night'] = $row['T_Nb_night'];
      $temp['price'] = $row['T_Price'];
      array_push($tours, $temp);
    }
  }
  echo json_encode($tours);
  $connect->close();

?>