BEGIN
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
  AND STR_TO_DATE(pAppointmentDate, '%d.%m.%Y') BETWEEN STR_TO_DATE(DATE_FORMAT(a.app_start_date, '%d.%m.%Y'), '%d.%m.%Y')   AND STR_TO_DATE(DATE_FORMAT(a.app_end_date, '%d.%m.%Y'),'%d.%m.%Y');
  
  -- Tarih ve saatleri birleştirme
  SET start_date_with_hour = start_date + INTERVAL HOUR(start_hour) HOUR + INTERVAL MINUTE(start_hour) MINUTE;
  SET end_date_with_hour = end_date + INTERVAL HOUR(end_hour) HOUR + INTERVAL MINUTE(end_hour) MINUTE;
  
  SELECT DATE_ADD(NOW(), INTERVAL 3 HOUR) INTO TODAY;
  SELECT TIME(DATE_ADD(NOW(), INTERVAL 3 HOUR)) INTO NOWTIME;

  -- Başlangıç saati ve interval_time'ı kullanarak döngü işlemi
  SET my_start_date = start_date_with_hour;
  SET myFirstHours = start_hour;
  
  IF STR_TO_DATE(pAppointmentDate, '%d.%m.%Y') < TODAY THEN
    SET myFirstHours = NOWTIME;
  END IF;

  -- Saatleri listeye ekleme
  WHILE myFirstHours <= end_hour DO
  
  	SELECT COUNT(ID)
    INTO hourIsTaken
    FROM appointment_details APD
    WHERE APD.appointment_id = appointmentsID
    AND STR_TO_DATE(pAppointmentDate, '%d.%m.%Y') BETWEEN APD.app_date and APD.app_date
    AND TIME(APD.app_time) = myFirstHours;
    
    IF hourIsTaken = 0 THEN
      SET HOURS_LIST = CONCAT(HOURS_LIST, TIME_FORMAT(myFirstHours, '%H:%i'), ',');
    END IF;
    
    SET myFirstHours = ADDTIME(myFirstHours, SEC_TO_TIME(interval_time * 60));
  END WHILE;
  
  -- Son virgülü kaldırmak için
  SET HOURS_LIST = TRIM(TRAILING ',' FROM HOURS_LIST);

  -- Sonuç döndürülüyor
  RETURN HOURS_LIST;
END