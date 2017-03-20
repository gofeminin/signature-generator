<?php
header('Content-Type:text/html; charset=utf-8');
header_remove('X-UA-Compatible');
?><!DOCTYPE html>
<html>
	<head>
		<title>Signatur-Generator</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width">
		<link rel="stylesheet" href="style.css" />
	</head>
	<body>
		<div class="container">
			<h1>Signatur-Generator</h1>
			<p>Name und Jobtitel und der ganze Kram.. und ab geht die Post <img alt="Embedded Image" width="20" height="24" src="data:image/gif;base64,R0lGODlhFAAYANUDAP/mIEA0EFVACP////bKAP/aFI1dAPraEP/iHPK2APrWDPK+AO6qAP/eGG1MBFlACPrSCO6yAHFVBN6VAPLGAOadAKVpBMKNAPbCAOqhAKVxBM6NAGVQHEAUEPLCALKNAPbOBM6FAN62ANalAJVhBK6BBOaZAKp1BOKVAO6uAG1QBOalAO66AKVtAJlxBK6JBLp1AMqFAN6uAJlpBK6FAK59AOqqAMqlAPbGAJ19BNauAGFMGAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/iREZXNpZ24gYnkgQWl3YW4gKHd3dy5rb2xvYm9rLndyZy5ydSkAIfkEBWQAPAAsAAAAABQAGAAABtxAnnBILBqPQwPSqBQ2l0Wl9Al1GqhVnmDLzQokLx2OMiqpBEtBDqQ4HBQQAsuFNj5uikYjEEDwCQsXD0UCH3l+AwMBiQEECSd1QhIgDYh8l4oYNg5DhQoIAIuXfIoEERp1AiIHoIuMiaUJG6kUrAChfLgBBY4TtJ+3wcEFB6a+QgIyEA3CwgUKGAwhqTQEts0FvAkZLZESC9aVtwgNvAsMKJydNeAQu8QKAQspFRaRQg8XCR4EowkMFWAMMiJgxooICfgwyDCBxD1CDjRsqGAihgUHD49w6ZKlI48gACH5BAUPADwALAYACAAJAAYAAAYeQB4PgeA1DkIeYLksQJTMppMXEAKE1SizUIBem7wgACH5BAkyADwALAAAAAAUABgAAAY1QJ5wSCwaj8ikcslsOp/Q6DMQ4FGdgcEgu2VmqeDuciCs8shL7lYrVoKtV6l8Tq/b7/j8MQgAIfkECQoAPAAsAQABABIAFgAABs9AnnBIFBqKSN7RmEwen8vm0ECVDgXYrFUgeelwlFFJJUgKciBFIKCAEFiuMvFxWwcGg0DjQFhcHlcfd3l4eQVuCSdyEnd2eWsFHBAYNg48Ah8cdo1rHAV8ERpYIgcIAKd2p54ECRtYFKWnsrIFBawTrwqms7SguAIyEA28tAoYDCFYNASxszu1rBktZRILzA27erYLDCiWlzXWmwcKfSkVFnI8DxcJHmsEBB4JDBUwgEQCMysRCQkRDDJMIKEunwMNGyqYiGHBQUEkWbQUCQIAIfkEBQ8APAAsAQACABIAFQAABslAnnBIFBqKSN7RmEwen8umYEptCgWSVyBAGZVUgqRgGxgMAhACyxUmPspn8/lAWFwew/F5uw8UOAQJJ20SHGRlZBwFEBg2DjwCHwoIAJVklRx0ERpTIgeUlaGVBQWBG1MUn6KipIETqJOrlR0Fmq8CMhANsgC0ChgMIVM0BKqifqUJGS1hEgvFDYcNpQsMKI+QNc8QB1sHCnUpFRZtPA8XCR4E6wQeCQwVMHhEAjMrEQkJEQwZEyTl9Bxo2FDBRAwLDgAioVKlSBAAIfkEBTIAPAAsBwAHAAYADAAABh9AHgDAKwoBBOOQoSQwjdCotCOFdoidLBExRBgLBWMQACH5BAkKADwALAEAAgASABUAAAYuQJ5wSCwaj8ikcslsGgcDpxAadQ4CAek1K+16jQBvWDpmAs7cJRYrZX/f8LgwCAAh+QQFCgA8ACwBAAEAEgAWAAAGzUCecEjkGYpI4/CYRB6fzObSEJXyBNisVSB56XCUUUklSApyoEDgoCawXGXi46YIDAZ2PGFxeQwFH3V4amp6CSdxEiANdoSFARAYNg5XgQh5eHd4BwQRGlgiBwgAhKRqBQUECRtYFKIAsLGwqKoTrQqjsrEFnBG2AjIQDbq7ChgMIVg0BK+6tAkZLWUSC8wBuZepCwwolFc11RCOCnspFRZxPA8XCR4EbR4JDBUwfkQCMysRCQkRDBkTSKS750DDhgomYlhwMBBJFi1FggAAOw%3D%3D" /></p>
			<form name="sigform" method="post" action="sig.php" charset="UTF-8">
				<label>
					<input autofocus="true" class="input_text" type="text" name="firstname" value="" />
					Vorname
				</label>
				<label>
					<input class="input_text" type="text" name="lastname" value="" />
					Nachname
				</label>
				<label>
					<input type="email" class="input_text" name="email" value="NAME@gofeminin.de" />
					E-Mail
				</label>
				<label>
					<input type="text" class="input_text" name="jobtitle" value="" />
					Jobtitel
				</label>
				<label>
					<input type="tel" class="input_text" name="telephone" value="+49 (0) 22 03 / 20 25-" />
					Telefon
				</label>
				<label>
					<input type="tel" class="input_text" name="corp_phone" placeholder="+49 175 1337 187" />
					Telefon
				</label>
				<label>
					<input type="tel" class="input_text" name="fax" value="+49 (0) 22 03 / 20 25-555" />
					Fax
				</label>
				<label>
					<input type="checkbox" class="radio" name="dmexco2015" value="true" />
					Dmexco Zusatzinfo
				</label>
				<label>
					<input type="checkbox" class="radio" name="newsgif" value="true" />
					News GIF
				</label>
				<fieldset>
					Portal
					<label>
						<input type="radio" class="radio" name="portal" value="gofeminin" checked="checked" />
						gofeminin.de
					</label>
					<label>
						<input type="radio" class="radio" name="portal" value="onmeda" />
						Onmeda
					</label>
				</fieldset>
				<fieldset>
					Signatur Datei Erstellen?
					<label>
						<input type="radio" class="radio" name="genfile" value="true" checked="checked"/>
						Ja, klar
					</label>
					<label>
						<input type="radio" class="radio" name="genfile" value="false" />
						Nein, gib mir nur den Code
					</label>
				</fieldset>
				<button type="submit">Ich bin soweit!</button>
			</form>
			<div contenteditable="true" id="code"></div>
			<div id="preview"></div>
			<iframe name="hidden_iframe" src="about:blank"></iframe>
		</div>
		<script src="magic.js"></script>
	</body>
</html>
