<?php
	// Kiosk-display module, v1.0
	// Author: Victor Kirov
	// This file is needed from the developer, who will integrate the display module.
	// He will need to catch the data he needs here (to log, store in db, etc.)

	define('PAYMENT_CODE_SUCCESSFUL', '0');
	define('PAYMENT_CODE_INSUFFICIENT_AMOUNT', '1');
	define('PAYMENT_CODE_INTERNAL_ERROR', '2');

	//  Send the AJAX response
	function sendPaymentResult($paymentCode) {
		$response_array['status'] = $paymentCode==PAYMENT_CODE_SUCCESSFUL?'success':'error';
		$response_array['payment_code'] = $paymentCode;
		header('Content-type: application/json');
		// convert response in JSON format
		echo json_encode($response_array);		
	}

	//Example 'payment' value:
	//$_POST['payment'] = "id, count, price, c*p, name\r\n 1, 2, 5, 10, one\r\n 2, 1, 7, 7, dve\r\n";
	
	$paymentData = explode("\r\n", $_POST['payment']);
	
	//  Drop header row (it is descriptor line)
	array_shift($paymentData);
	
	//  Parse every string row as an array (payment) and add to 'payments'
	$payments = array();
	foreach ($paymentData as $p) {
		$current = explode(',', $p);
		if (count($current)>1)
			array_push($payments, $current);
	}

	//  ACCESS PAYMENTS (IF NEEDED):
	$totalSum = 0;
	foreach ($payments as $payment) {
		//  ACCESS CURRENT PAYMENT DETAILS HERE:
		//payment[0] -> id
		//payment[1] -> count
		//payment[2] -> price
		//payment[3] -> count*price
		//payment[4] -> name
		
		$totalSum += $payment[3];
		//echo "id=".$payment[0].", count=".$payment[1].", price_single=".$payment[2].", price_all=".$payment[3].", name".$payment[4]."\r\n";
	}
	
	//  ACCESS TOTAL SUM HERE:
	//$totalSum;
	//  ACCESS PAYMENTS HERE:
	//$payments
	//  ACCESS PAYMENTS AS JSON HERE:
	$payments_json = json_encode($payments);
	
	//  CALL PYTHON HERE - Raspberry Pi2 will interact with the hardware and return the value
	//$output = system('python do_payments.py $payments_json', $retval);
	//  Simulate possible responses from the system (Pi2)
	$retval = rand(0, 2);

	switch ($retval) {
		//  SET PROPER RESPONSE, ACCORDING PYTHON EXIT CODE:
		case 0 : sendPaymentResult(PAYMENT_CODE_SUCCESSFUL); 
				break;
		case 1 : sendPaymentResult(PAYMENT_CODE_INSUFFICIENT_AMOUNT);
				break;
		case 2 : sendPaymentResult(PAYMENT_CODE_INTERNAL_ERROR);
				break;				
	}
	

?>