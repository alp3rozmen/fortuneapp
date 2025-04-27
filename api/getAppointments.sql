BEGIN
  -- Değişken tanımlamaları
  DECLARE sayi INT DEFAULT 1;
  DECLARE mesaj VARCHAR(100);
  DECLARE start_date DATE;
  DECLARE end_date DATE;
  DECLARE start_hour TIME;
  DECLARE end_hour TIME;
  DECLARE start_date_with_hour DATETIME;
  DECLARE end_date_with_hour DATETIME;
  DECLARE my_start_date DATETIME;
  DECLARE myFirstHours TIME;
  DECLARE HOURS_LIST VARCHAR(500) DEFAULT '';
  DECLARE interval_time INT;
  DECLARE hourIsTaken INT;
  DECLARE appointmentsID INT;
  DECLARE TODAY DATETIME;
  DECLARE NOWTIME TIME;
  DECLARE nowHourPart INT;
  DECLARE nowMinutePart INT;
  DECLARE totalMinutes INT;
  DECLARE roundedMinutes INT;

  -- Veritabanından değer al
  SELECT a.app_start_date,
         a.app_end_date,
         a.start_hour,
         a.end_hour,
         a.interval_time,
         a.id
  INTO start_date,
       end_date,
       start_hour,
       end_hour,
       interval_time,
       appointmentsID
  FROM appointments a
  WHERE a.user_details_id = pUserDetailsId
    AND STR_TO_DATE(pAppointmentDate, '%d.%m.%Y') BETWEEN DATE(a.app_start_date) AND DATE(a.app_end_date);

  -- Tarih ve saatleri birleştirme
  SET start_date_with_hour = start_date + INTERVAL HOUR(start_hour) HOUR + INTERVAL MINUTE(start_hour) MINUTE;
  SET end_date_with_hour = end_date + INTERVAL HOUR(end_hour) HOUR + INTERVAL MINUTE(end_hour) MINUTE;

  -- Şu anki zaman
  SELECT DATE_ADD(NOW(), INTERVAL 3 HOUR) INTO TODAY;
  SELECT DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 HOUR), '%H:%i') INTO NOWTIME;

  -- Başlangıç saati
  SET my_start_date = start_date_with_hour;
  SET myFirstHours = start_hour;

  -- Eğer bugünün randevusuysa ve saat geçmişse -> Şu anki saate göre başlasın
  IF STR_TO_DATE(pAppointmentDate, '%d.%m.%Y') = DATE(TODAY) THEN
    SET nowHourPart = HOUR(NOWTIME);
    SET nowMinutePart = MINUTE(NOWTIME);

    SET totalMinutes = nowHourPart * 60 + nowMinutePart;
    SET roundedMinutes = CEIL(totalMinutes / interval_time) * interval_time;

    SET myFirstHours = SEC_TO_TIME(roundedMinutes * 60);
  END IF;

  -- Saatleri listeye ekleme
  WHILE myFirstHours <= end_hour DO

    -- Aynı saate başka kayıt var mı kontrolü
    SELECT COUNT(ID)
    INTO hourIsTaken
    FROM appointment_details APD
    WHERE APD.appointment_id = appointmentsID
      AND STR_TO_DATE(pAppointmentDate, '%d.%m.%Y') BETWEEN APD.app_date AND APD.app_date
      AND DATE_FORMAT(APD.app_time, '%H:%i') = TIME_FORMAT(myFirstHours, '%H:%i');

    -- Saat alınmadıysa ekle
    IF hourIsTaken = 0 AND FIND_IN_SET(TIME_FORMAT(myFirstHours, '%H:%i'), HOURS_LIST) = 0 THEN
      SET HOURS_LIST = CONCAT(HOURS_LIST, TIME_FORMAT(myFirstHours, '%H:%i'), ',');
    END IF;

    -- Sonraki saate geç
    SET myFirstHours = ADDTIME(myFirstHours, SEC_TO_TIME(interval_time * 60));
  END WHILE;

  -- Son virgülü temizle
  SET HOURS_LIST = TRIM(TRAILING ',' FROM HOURS_LIST);

  -- Listeyi döndür
  RETURN HOURS_LIST;
END