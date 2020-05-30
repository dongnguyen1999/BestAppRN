<?php
  require "connect.php";

  $tourId = $_GET['tour_id'];

  $sql = "SELECT * FROM TOUR WHERE T_Id = '".$tourId."'";

  $result = $connect->query($sql);

  $temp = array();

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $temp['id'] = $row['T_Id'];
    $temp['name'] = $row['T_Name'];
    $temp['nbDay'] = $row['T_Nb_day'];
    $temp['nbNight'] = $row['T_Nb_night'];
    $temp['price'] = $row['T_Price'];
    $temp['comId'] = $row['C_Id']; 
    echo json_encode($temp);
  }
  $connect->close();
?>



