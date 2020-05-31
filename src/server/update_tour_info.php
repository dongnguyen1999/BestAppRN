<?php
  require "connect.php";
  $id = $_POST['id'];
  $name = $_POST['name'];
  $price = $_POST['price'];
  $comName = $_POST['comName'];
  $comAddress = $_POST['comAddress'];
  $comPhone = $_POST['comPhone'];
  $comEMail = $_POST['comEmail'];
  $nbDay = $_POST['nbDay'];
  $nbNight = $_POST['nbNight'];
  $placeIds = $_POST['placeIds'];
  $comId = $_POST['comId'];
  // echo $comId;

  $sql = "SELECT T_Id FROM TOUR WHERE T_Id=$id";
  $result = $connect->query($sql);
  if ($result->num_rows > 0) {
    $sql = "UPDATE TOUR SET T_Name = '".$name."', T_Price = ".$price.", T_Nb_day = ".$nbDay.", T_Nb_night = ".$nbNight." WHERE T_Id = ".$id.";";
    $result = $connect->query($sql);
    // if ($result === TRUE) {
    //   echo ";Update tour success;";
    // } else {
    //   echo ";Update tour error: " . $connect->error;
    // }
    $sql = "UPDATE COMPANY SET C_Name = '".$comName."', C_Address = '".$comAddress."', C_Mail = '".$comEMail."', C_Phone = '".$comPhone."' WHERE C_Id = '".$comId."';";
    $result = $connect->query($sql);
    // if ($result === TRUE) {
    //   echo ";Update company sucess;";
    // } else {
    //   echo ";Updata company error: " . $connect->error;
    // }
    $sql = "DELETE FROM TOUR_PLACE WHERE T_Id=".$id.";";
    $result = $connect->query($sql);
    // if ($result === TRUE) {
    //   echo ";Delete tour place at tour success;";
    // } else {
    //   echo ";Delete tour place at tour success error: " . $connect->error;
    // }
    foreach ($placeIds as $placeId) {
      $sql = "INSERT INTO PLACE(p_id) VALUES ('".$placeId."');";
      $result = $connect->query($sql);
      // if ($result === TRUE) {
      //   echo ";Add new place success;";
      // } else {
      //   echo ";Add new place error: " . $connect->error;
      // }
      $sql = "INSERT INTO TOUR_PLACE(T_Id, P_Id) VALUES(".$id.", '".$placeId."');";
      $result = $connect->query($sql);
      // if ($result === TRUE) {
      //   echo ";Add new place tour success;";
      // } else {
      //   echo ";Add new place tour error: " . $connect->error;
      // }
    }
  }

  $connect->close();
?>
