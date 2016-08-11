<?php

function get_post_data_by_key ( $key ) {
  if ( isset ($_POST[ $key ] ) )
    return $_POST[ $key ];
  else
    return '';
};

define('FILENAME','signature.html');
define('PORTAL', get_post_data_by_key('portal'));

switch ( PORTAL ) {
  case 'onmeda':
    $template_contents = file_get_contents('templates/onmeda.de.html');
    break;
  default:
    if ( get_post_data_by_key('dmexco2015') === 'true' )
      $template_contents = file_get_contents('templates/gofeminin_dmexco_2016.html');
    else if ( get_post_data_by_key('newsgif') === '' )
      $template_contents = file_get_contents('templates/gofeminin_without_newsgif.html');
    else
      $template_contents = file_get_contents('templates/gofeminin.html');
    break;
}

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
    get_post_data_by_key('firstname'),
    get_post_data_by_key('lastname'),
    get_post_data_by_key('jobtitle'),
    get_post_data_by_key('email'),
    get_post_data_by_key('telephone'),
    get_post_data_by_key('fax')
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
    echo "\xEF\xBB\xBF"; // UTF-8 BOM
  } else {
    header('Content-Disposition: inline; filename='.FILENAME);
    header('Content-Type: text/html, charset=utf-8');
  }
  echo $template_contents;
?>
