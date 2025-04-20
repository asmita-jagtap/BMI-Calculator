<?php
$host = "localhost";
$user = "root";
$password = "";
$db = "bmidb";

$conn = new mysqli($host, $user, $password, $db);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$height = $_POST['height'];
$weight = $_POST['weight'];
$bmi = $_POST['bmi'];
$status = $_POST['status'];

// Get health tip
$tip = '';
$sql = "SELECT tip FROM bmi_tips WHERE $bmi BETWEEN min_bmi AND max_bmi LIMIT 1";
$res = $conn->query($sql);
if ($res->num_rows > 0) {
  $row = $res->fetch_assoc();
  $tip = $row['tip'];
}

// Save to record
$sql = "INSERT INTO bmi_records (name, height, weight, bmi, status, tips)
        VALUES ('$name', '$height', '$weight', '$bmi', '$status', '$tip')";
$conn->query($sql);

echo $tip;
$conn->close();
?>
