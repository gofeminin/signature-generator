<?php

/* define('STREAM', file_get_contents('php://input')); */
define('TMP_DIR','/tmp');
define('FILENAME','signature.html');

$template_contents = file_get_contents('html.html');
$template_contents = str_replace(
  array(
    '{{firstname}}',
    '{{lastname}}',
    '{{jobtitle}}',
    '{{email}}',
    '{{telephone}}',
    '{{fax}}'
  ),
  array(
    $_POST['firstname'],
    $_POST['lastname'],
    $_POST['jobtitle'],
    $_POST['email'],
    $_POST['telephone'],
    $_POST['fax']
  ),
  $template_contents
);

  if( $_POST['genfile'] === "true" ) {
    header('Expires: 0');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Content-Type: application/force-download, charset=utf-8');
    header('Content-Description: File Transfer');
    header('Content-Disposition: attachment; filename='.FILENAME);
    header('Content-Transfer-Encoding: binary');
  } else {
    header('Content-Type: text/html, charset=utf-8');
  }
  echo $template_contents;
?>
