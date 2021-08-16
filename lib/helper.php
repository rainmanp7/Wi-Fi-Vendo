<?php
class Helper {
  public function format_mb($size) {

    if( $size < 1 ) return '0MB';

    $base = floor(log($size, 1024));
    $unit = array('MB','GB','TB','PB','EB','ZB','YB');

    return round($size / pow(1024, $base), 2) . $unit[$base];
  }

  public function amt_to_mb($amt) {
    $data = 0;
    $rates = [1 => 30, 5 => 350, 10 => 1024, 30 => 4096];

    krsort($rates);

    foreach($rates as $r_amt=>$r_data) {
      if( $amt >= $r_amt ) {
        $base = floor($amt / $r_amt);
        $data = $base * $r_data + $data;
        $amt = $amt - ($base * $r_amt);
      }
    }

    return $data;
  }
}
