////////////////////////////////////////////////////////////////////////////////
//                                                                            //
// Kiosk-display-module by Victor Kirov, ver 1.0, June 2015                   //
// victor.kirov.eu@gmail.com                                                  //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////
var app = angular.module('kiosk', []);
app.controller('KioskController', function($scope) {
	
	$scope.uiBlocked = false;
	$scope.total = '0';
	$scope.totalVerbose = '';
	$scope.counters = new Array();

	//  Default values for this local variable (later initialized from AJAX)
	$scope.labels = {
		"levs":"лв.", 
		"pay":"Плати", 
		"cancel":"Откажи",
		"total":"Общо",
		"close":"Затвори",		
		"paymentConnectionError":"Грешка при свързване",
		"paymentSuccessful":"Платихте успешно", 
		"paymentInsufficientAmount":"Грешка при плащане: Недостатъчна наличност",
		"paymentInternalError":"Грешка при плащане: Вътрешна грешка"
	};
	
	//  Default values for this local variable (later initialized from AJAX)
	$scope.attractions = new Array(
		{},
		{"id":"1", "name" : "Ниво 1", "price":"5.20"},
		{"id":"2", "name" : "Ниво 2", "price":"5.00"},
		{"id":"3", "name" : "Ниво 3", "price":"5.00"},
		{"id":"4", "name" : "Ниво 4", "price":"5.00"},
		{"id":"5", "name" : "Ниво 5", "price":"5.00"},
		{"id":"6", "name" : "Стена за катерене", "price":"5.00"},
		{"id":"7", "name" : "Батут", "price":"5.00"},
		{"id":"8", "name" : "Бънджи", "price":"5.00"},
		{"id":"9", "name" : "Въртележка", "price":"5.00"},
		{"id":"10", "name" : "Тарзан", "price":"5.00"},		
		{"id":"11", "name" : "Мини–голф", "price":"5.00"},		
		{"id":"12", "name" : "Надуваем замък", "price":"5.00"}
	);

	//  Increase tickets count to buy for this attraction (class="badge")
	$scope.bumpUp = function(counterNumber) {
		if (isNaN($scope.counters[counterNumber]))
			$scope.counters[counterNumber] = 0;
		$scope.counters[counterNumber]++;
		
		$scope.updateTotal();
	}
	
	//  Decrease tickets count to buy for this attraction (class="badge")
	$scope.bumpDown = function(counterNumber) {
		if ($scope.counters[counterNumber]>0)
			$scope.counters[counterNumber]--;
		if ($scope.counters[counterNumber]==0)
			$scope.counters[counterNumber]='';
		
		$scope.updateTotal();
	}
	
	//  Update total sum in the interface and also sum pop-up verbose description
	$scope.updateTotal = function () {
		$scope.total = 0;
		$scope.totalVerbose = '';
		for (var i=1; i<$scope.attractions.length; i++) {
			var $count = isNaN($scope.counters[i])?0:$scope.counters[i];
			$scope.total += $scope.attractions[i].price * $count;
			if ($count>0) {
				$scope.totalVerbose += $scope.attractions[i].name 
							+ ' (x' + $count + ') = ' 
							+  ($scope.attractions[i].price*$count).toFixed(2) 
							+ " " + $scope.labels['levs'] + " \r\n";
			}	
			$("#totalVerbose").attr('title', $scope.totalVerbose)
				.tooltip('fixTitle');
		}
	}
	
	//  Cancels the current order; clears vars
	$scope.cancelOrder = function () {
		$scope.total = 0;
		$scope.totalVerbose = '';
		$("#totalVerbose").attr('title', '0 '+$scope.labels['levs'])
			.tooltip('fixTitle');
		$scope.counters = new Array();
	}
	
	//  We can see two pages. Currently the first one is visible
	$scope.page = 1;
	$scope.togglePage = function () {
		if (  $($(".page1")[0]).is(':visible')  ) {
			$(".page1").hide();
			$(".page2").show();
		}
		else {
			$(".page1").show();
			$(".page2").hide();			
		}
	}

	$scope.changeLang = function(lang) {
		//  Block UI during AJAX request
		$scope.uiBlocked = true;
		
		$.ajax({
				url: "do_init.php",			
				type: "POST",
				data : { "lang" : lang },
				dataType : "text" //response accept type
		})
		.done(function( response ) {
			var json = $.parseJSON(response);
			$scope.labels = json["labels"];
			$scope.attractions = json["attractions"];
			$scope.updateTotal();			
			$scope.$apply();
		})
		.fail(function( response ) {
			var message = $scope.labels["paymentConnectionError"];
			$("#paymentMessageText").html(message);
			$("#paymentMessageModalContent").removeClass("payment-message-success");			
			$("#paymentMessageModalContent").addClass("payment-message-failure");
			$('#paymentResultMessage').modal('show');			
		})
		.always(function( response ) {
			//  Unblock UI after the AJAX request
			$scope.uiBlocked = false;
			$scope.$apply();
		});		
	}
	
	//  Payment request towards main system
	$scope.doPayment = function() {
		
		//  nothing to pay
		if ($scope.total==0) {
			$("#paymentMessageText").html($scope.labels.nothingToPay);
			$("#paymentMessageModalContent").removeClass("payment-message-failure");
			$("#paymentMessageModalContent").removeClass("payment-message-success");
			$('#paymentResultMessage').modal('show');
			return;
		}
		
		var payment = 'id, count, price, count*price, name \r\n';
		for (var i=1; i<$scope.attractions.length; i++) {
			var $count = isNaN($scope.counters[i])?0:$scope.counters[i];
			if ($count>0) {
				payment += $scope.attractions[i].id 
					+ ", " + $count
					+ ", " + parseFloat($scope.attractions[i].price).toFixed(2)
					+ ", " + ($scope.attractions[i].price*$count).toFixed(2) 
					+ ", " + $scope.attractions[i].name 
					+ "\r\n";
			}
		}		

		
		//  Block interface before the AJAX call - show preloader
		$('#pleaseWaitDialog').modal('show');
		
		//  Simulate response after 5 seconds from the main system (Raspberry Pi 2)
		setInterval("$('#pleaseWaitDialog').modal('hide')", 5000);
		
		$.ajax({
				url: "do_payment.php",			
				type: "POST",
				data : { "payment" : payment },
				dataType : "text json" //response accept type
		})
		.done(function( response ) {
			var message = '';

			if (response['payment_code']==0) {
				message = $scope.labels["paymentSuccessful"];
				$("#paymentMessageText").html(message);
				$("#paymentMessageModalContent").addClass("payment-message-success");
				$("#paymentMessageModalContent").removeClass("payment-message-failure");
				
				//  Clears current order if payment is successful
				$scope.cancelOrder();
			}
			if (response['payment_code']==1) {
				message = $scope.labels["paymentInsufficientAmount"];
				$("#paymentMessageText").html(message);
				$("#paymentMessageModalContent").removeClass("payment-message-success");
				$("#paymentMessageModalContent").addClass("payment-message-failure");
			}
			if (response['payment_code']==2) {
				message = $scope.labels["paymentInternalError"];
				$("#paymentMessageText").html(message);
				$("#paymentMessageModalContent").removeClass("payment-message-success");
				$("#paymentMessageModalContent").addClass("payment-message-failure");
			}
			
		})
		.fail(function( response ) {
			var message = $scope.labels["paymentConnectionError"];
			$("#paymentMessageText").html(message);
			$("#paymentMessageModalContent").removeClass("payment-message-success");			
			$("#paymentMessageModalContent").addClass("payment-message-failure");
		})
		.always(function( response ) {
			//  Unblock interface - hide preloader
			//$('#pleaseWaitDialog').modal('hide');  //currently commented, because now we
													 //simulate the response (after 5 secs)
			$scope.$apply();
			$('#paymentResultMessage').modal('show');
		});
	}	
	
	$scope.fontSize = 2;
	//  The asterisk (*) button, which adjust fonts for the different devices
	//  Optimal look is achieved with different font-size on different tablet devices.
	$scope.adjust = function() {
		$scope.fontSize++
		if ($scope.fontSize==6) $scope.fontSize = 1;

		//  Tooltip dynamic font-size update. 
		//  TODO: Hard fix. Could be optimized later.
		if ($scope.fontSize==1)	{
			var x = $('#totalVerbose').attr("title");
			$('#totalVerbose').attr("title",
									"<p class='mfont-smaller' style='font-size:24px;'>"
										+ $('#totalVerbose').attr("title")+"</p>"
								);
			$("#totalVerbose").tooltip('fixTitle');
			$('#totalVerbose').attr("title", x);
		}
		if ($scope.fontSize==2)	{
			var x = $('#totalVerbose').attr("title");
			$('#totalVerbose').attr("title", 
									"<p class='mfont-smaller' style='font-size:26px;'>"
									+ $('#totalVerbose').attr("title")+"</p>"
								);
			$("#totalVerbose").tooltip('fixTitle');
			$('#totalVerbose').attr("title", x);				
		}
		if ($scope.fontSize==3) {
			var x = $('#totalVerbose').attr("title");
			$('#totalVerbose').attr("title", 
									"<p class='mfont-smaller' style='font-size:28px;'>"
									+ $('#totalVerbose').attr("title")+"</p>"
								);
			$("#totalVerbose").tooltip('fixTitle');
			$('#totalVerbose').attr("title", x);				
		}
		if ($scope.fontSize==4) {
			var x = $('#totalVerbose').attr("title");
			$('#totalVerbose').attr("title", 
									"<p class='mfont-smaller' style='font-size:32px;'>"
									+ $('#totalVerbose').attr("title")+"</p>"
								);
			$("#totalVerbose").tooltip('fixTitle');
			$('#totalVerbose').attr("title", x);				
		}
		if ($scope.fontSize==5) {
			var x = $('#totalVerbose').attr("title");
			$('#totalVerbose').attr("title", 
									"<p class='mfont-smaller' style='font-size:40px;'>"
									+ $('#totalVerbose').attr("title")+"</p>"
								);
			$("#totalVerbose").tooltip('fixTitle');
			$('#totalVerbose').attr("title", x);				
		}


		$(".mfont-smaller").each(function( index ) {
			if ($scope.fontSize==1)	$( this ).css("font-size","24px");
			if ($scope.fontSize==2)	$( this ).css("font-size","26px");
			if ($scope.fontSize==3) $( this ).css("font-size","28px");
			if ($scope.fontSize==4) $( this ).css("font-size","32px");
			if ($scope.fontSize==5) $( this ).css("font-size","40px");
		});
		
		
		$(".mfont-main").each(function( index ) {
			if ($scope.fontSize==1)	$( this ).css("font-size","26px");
			if ($scope.fontSize==2)	$( this ).css("font-size","28px");
			if ($scope.fontSize==3) $( this ).css("font-size","32px");
			if ($scope.fontSize==4) $( this ).css("font-size","40px");
			if ($scope.fontSize==5) $( this ).css("font-size","44px");
		});

		$(".mfont-bigger").each(function( index ) {
			if ($scope.fontSize==1)	$( this ).css("font-size","28px");
			if ($scope.fontSize==2)	$( this ).css("font-size","32px");
			if ($scope.fontSize==3) $( this ).css("font-size","40px");
			if ($scope.fontSize==4) $( this ).css("font-size","44px");
			if ($scope.fontSize==5) $( this ).css("font-size","48px");
		});
	}

	//  After page is loaded - initialize it with default language
    angular.element(document).ready(function () {
        $scope.changeLang('bg');
    });	
	
	//  Test function, which simulates a delay interval in milliseconds
	$scope.sleep = function(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
			  break;
			}
		}
	}
	
});