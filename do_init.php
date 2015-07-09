<?php
	// Kiosk-display module, v1.0
	// Author: Victor Kirov
	// This file is needed from the developer, who will integrate the display module.
	// He should fill the language labels from the database.

	if (isset($_POST['lang'])) {
		if (strtolower($_POST['lang'])=='en') {
			echo 
			'{	"attractions":['
					.'{"0":"0"},'
					.'{"id":"1", "name" : "Level 1", "price":"5.20"},'
					.'{"id":"2", "name" : "Level 2", "price":"5.00"},'
					.'{"id":"3", "name" : "Level 3", "price":"5.00"},'
					.'{"id":"4", "name" : "Level 4", "price":"5.00"},'
					.'{"id":"5", "name" : "Level 5", "price":"5.00"},'
					.'{"id":"6", "name" : "Climbing wall", "price":"5.00"},'
					.'{"id":"7", "name" : "Trampoline", "price":"5.00"},'
					.'{"id":"8", "name" : "Bunjee", "price":"5.00"},'
					.'{"id":"9", "name" : "Carousel", "price":"5.00"},'
					.'{"id":"10", "name" : "Tarzan", "price":"5.00"},'
					.'{"id":"11", "name" : "Mini–golf", "price":"5.00"},'
					.'{"id":"12", "name" : "Air castle", "price":"5.00"}'
				.'], '
				.'"labels":{"levs":"lv.", "pay":"Pay", "cancel":"Cancel", "total":"Total", "close":"Close",'
					.'"nothingToPay":"There is nothing for payment", '
					.'"paymentConnectionError":"Connection error", '				
					.'"paymentSuccessful":"Payment successful", '
					.'"paymentInsufficientAmount":"Payment failed: Insufficient amount", '
					.'"paymentInternalError":"Payment failed: Internal Error"  '
				.'} '
			.'}';
		}
		elseif (strtolower($_POST['lang'])=='de') {
			echo 
			'{"attractions":['
				.'{"0":"0"},'
				.'{"id":"1", "name" : "Höhe 1", "price":"5.20"},'
				.'{"id":"2", "name" : "Höhe 2", "price":"5.00"},'
				.'{"id":"3", "name" : "Höhe 3", "price":"5.00"},'
				.'{"id":"4", "name" : "Höhe 4", "price":"5.00"},'
				.'{"id":"5", "name" : "Höhe 5", "price":"5.00"},'
				.'{"id":"6", "name" : "Kletterwand", "price":"5.00"},'
				.'{"id":"7", "name" : "Trampolin", "price":"5.00"},'
				.'{"id":"8", "name" : "Bunjee", "price":"5.00"},'
				.'{"id":"9", "name" : "Karussell", "price":"5.00"},'
				.'{"id":"10", "name" : "Tarzan", "price":"5.00"},'
				.'{"id":"11", "name" : "Mini–golf", "price":"5.00"},'
				.'{"id":"12", "name" : "Luftschloss", "price":"5.00"}'
				.'], '
				.'"labels":{"levs":"lv.", "pay":"Zahlen", "cancel":"Stornieren", "total":"Total", "close":"Schließen", '
					.'"nothingToPay":"Nichts für die Zahlung", '				
					.'"paymentConnectionError":"Verbindungsfehler", '				
					.'"paymentSuccessful":"Zahlung erfolgreich", '
					.'"paymentInsufficientAmount":"Zahlung fehlgeschlagen: unzureichende Menge", '
					.'"paymentInternalError":"Zahlung fehlgeschlagen: interner Fehler"  '
				.'} '
			.'}';				
		}
		elseif (strtolower($_POST['lang'])=='es') {
			echo 
			'{"attractions":['
				.'{"0":"0"},'
				.'{"id":"1", "name" : "Nivel 1", "price":"5.20"},'
				.'{"id":"2", "name" : "Nivel 2", "price":"5.00"},'
				.'{"id":"3", "name" : "Nivel 3", "price":"5.00"},'
				.'{"id":"4", "name" : "Nivel 4", "price":"5.00"},'
				.'{"id":"5", "name" : "Nivel 5", "price":"5.00"},'
				.'{"id":"6", "name" : "Muro de escalada", "price":"5.00"},'
				.'{"id":"7", "name" : "Trampolín", "price":"5.00"},'
				.'{"id":"8", "name" : "Bunjee", "price":"5.00"},'
				.'{"id":"9", "name" : "Carrusel", "price":"5.00"},'
				.'{"id":"10", "name" : "Tarzan", "price":"5.00"},'
				.'{"id":"11", "name" : "Mini–golf", "price":"5.00"},'
				.'{"id":"12", "name" : "Castillo Aire", "price":"5.00"}'
				.'], '
				.'"labels":{"levs":"lv.", "pay":"Pagar", "cancel":"Cancelar", "total":"Total", "close":"Cerca", '
					.'"nothingToPay":"Nada para el pago", '
					.'"paymentConnectionError":"Error de conexión", '
					.'"paymentSuccessful":"Pago éxito", '
					.'"paymentInsufficientAmount":"Pago fallido: Cantidad insuficiente", '
					.'"paymentInternalError":"Pago fallido: Error interno"  '
				.'} '
			.'}';
		}
		elseif (strtolower($_POST['lang'])=='ru') {
			echo 
			'{"attractions":['
				.'{"0":"0"},'
				.'{"id":"1", "name" : "Уровень 1", "price":"5.20"},'
				.'{"id":"2", "name" : "Уровень 2", "price":"5.00"},'
				.'{"id":"3", "name" : "Уровень 3", "price":"5.00"},'
				.'{"id":"4", "name" : "Уровень 4", "price":"5.00"},'
				.'{"id":"5", "name" : "Уровень 5", "price":"5.00"},'
				.'{"id":"6", "name" : "Стена для скалолазания", "price":"5.00"},'
				.'{"id":"7", "name" : "Трамплин", "price":"5.00"},'
				.'{"id":"8", "name" : "Банджи", "price":"5.00"},'
				.'{"id":"9", "name" : "Карусель", "price":"5.00"},'
				.'{"id":"10", "name" : "Тарзан", "price":"5.00"},'
				.'{"id":"11", "name" : "Мини-гольф", "price":"5.00"},'
				.'{"id":"12", "name" : "Надувной замок", "price":"5.00"}'
				.'], '
				.'"labels":{"levs":"лв.", "pay":"Платить", "cancel":"Отменить", "total":"Общее", "close":"Закрыть", '
					.'"nothingToPay":"Ничего для оплаты", '
					.'"paymentConnectionError":"Ошибка подключения", '
					.'"paymentSuccessful":"Оплата успешным", '
					.'"paymentInsufficientAmount":"Оплата не удалось: недостаточное количество", '
					.'"paymentInternalError":"Оплата не удалось: Внутренняя ошибка"  '
				.'} '
			.'}';
		}
		else {
			echo 
			'{"attractions":['
				.'{"0":"0"},'
				.'{"id":"1", "name" : "Ниво 1", "price":"5.20"},'
				.'{"id":"2", "name" : "Ниво 2", "price":"5.00"},'
				.'{"id":"3", "name" : "Ниво 3", "price":"5.00"},'
				.'{"id":"4", "name" : "Ниво 4", "price":"5.00"},'
				.'{"id":"5", "name" : "Ниво 5", "price":"5.00"},'
				.'{"id":"6", "name" : "Стена за катерене", "price":"5.00"},'
				.'{"id":"7", "name" : "Батут", "price":"5.00"},'
				.'{"id":"8", "name" : "Бънджи", "price":"5.00"},'
				.'{"id":"9", "name" : "Въртележка", "price":"5.00"},'
				.'{"id":"10", "name" : "Тарзан", "price":"5.00"},'
				.'{"id":"11", "name" : "Мини–голф", "price":"5.00"},'
				.'{"id":"12", "name" : "Надуваем замък", "price":"5.00"}'
				.'], '
				.'"labels":{"levs":"lv.", "pay":"Плати", "cancel":"Откажи", "total":"Общо", "close":"Затвори",'
					.'"nothingToPay":"Няма нищо за плащане", '
					.'"paymentConnectionError":"Грешка при свързване", '
					.'"paymentSuccessful":"Платихте успешно", '
					.'"paymentInsufficientAmount":"Грешка при плащане: Недостатъчна наличност", '
					.'"paymentInternalError":"Грешка при плащане: Вътрешна грешка"  '
				.'} '
			.'}';				
		}
		
	}
	else {
		echo "error!";
	}
?>	
