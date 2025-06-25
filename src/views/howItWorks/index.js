import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

function HowItWorks() {
  return (
  <MainCard>
    <div className="container mt-5">
      <h2 className="text-center mb-4">Fortuneteller Nasıl Çalışır?</h2>
      <p className="text-center mb-5">
        Fortuneteller üzerinde fal baktırmak oldukça kolay! Aşağıdaki adımları izleyerek falınızı hızlıca yorumlatabilirsiniz.
      </p>

      <div className="row">
        <div className="col-md-4 text-center mb-4">
          <h4>1. Yorumcu Seçimi</h4>
          <p>
            İlk adım olarak uzman fal yorumcuları arasından size en uygun olanı seçin. Her yorumcu farklı fal türlerinde uzmanlaşmıştır.
          </p>
        </div>

        <div className="col-md-4 text-center mb-4">
          <h4>2. Fal Tipini Seçin</h4>
          <p>
            Seçtiğiniz yorumcunun baktığı fal tiplerinden (örneğin, Tarot, Su Falı, Astroloji) dilediğinizi seçerek devam edin.
          </p>
        </div>

        <div className="col-md-4 text-center mb-4">
          <h4>3. Randevu Tarihini Belirleyin</h4>
          <p>
            Takvim üzerinden uygun bir randevu tarihi ve saati seçin. Seçtiğiniz tarih ve saatte falınız yorumlanmaya başlanacaktır.
          </p>
        </div>

        <div className="col-md-4 text-center mb-4">
          <h4>4. 30 Dakikada Yorum</h4>
          <p>
            Seçtiğiniz tarih ve saatten itibaren en geç 30 dakika içerisinde falınız yorumlanır ve hazır olur.
          </p>
        </div>

        <div className="col-md-4 text-center mb-4">
          <h4>5. Sonuçları Görün</h4>
          <p>
            Fal yorumunuz tamamlandığında, kullanıcı panelinizdeki Bakımlarım sekmesinden falınızı görüntüleyebilirsiniz.
          </p>
        </div>

        <div className="col-md-4 text-center mb-4">
          <h4>6. Kredi Yükleyin</h4>
          <p>
            Fal hizmeti alabilmek için kredi yüklemeniz gerekmektedir. Lütfen kredi yüklemek için <a href="mailto:alp3rozmen@gmail.com">alp3rozmen@gmail.com</a> adresine e-posta gönderin.
          </p>
        </div>
      </div>
    </div>
</MainCard>
  );
}

export default HowItWorks;
