<?php
require 'autoload.php';

$ip = filter_input(INPUT_GET, 'ip', FILTER_VALIDATE_IP);
$mac = filter_input(INPUT_GET, 'mac', FILTER_VALIDATE_MAC);
$host = filter_input(INPUT_GET, 'host');
$date = date('Y-m-d H:i:s');

if( $ip && $mac ) {
  $db = new Database();

  $db->mac_addr = strtoupper($mac);
  $db->ip_addr  = $ip;
  $db->hostname = $host;

  $db->updated_at = $date;

  file_put_contents('device.log',json_encode([$mac,$ip,$host,$date]) . PHP_EOL, FILE_APPEND);
  if( !$db->get_device_id() ) {
    $db->add_device();
  }

  $db->update_device();
}
