import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

function AboutUs() {
  return (
    <MainCard>
    <div className="container mt-5">
      <h2 className="text-center mb-4">Hakkımızda</h2>
      
      <p className="text-center mb-5">
        Fortuneteller, insanların merak ettikleri konular hakkında profesyonel falcılar tarafından yorum alabileceği bir platformdur. 
        Misyonumuz, her kullanıcımıza en doğru ve güvenilir fal hizmetini sunmaktır.
      </p>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h4>Misyonumuz</h4>
          <p>
            Fortuneteller olarak, fal kültürünü modern teknoloji ile buluşturarak insanların hayatlarına dokunmayı amaçlıyoruz. 
            Uzman falcılarımız ile kullanıcılarımızı bir araya getiriyor ve güvenilir, kişisel yorumlar sunuyoruz. Amacımız, her kullanıcının en iyi fal deneyimini yaşaması.
          </p>
        </div>

        <div className="col-md-6 mb-4">
          <h4>Değerlerimiz</h4>
          <p>
            Fortuneteller, kullanıcı odaklı bir platformdur. Gizlilik, güvenilirlik ve memnuniyet en önemli önceliklerimizdir. 
            Kullanıcılarımızın gizliliğine saygı gösteriyor ve güvenilir fal hizmeti sunmak için titizlikle çalışıyoruz.
          </p>
        </div>

        <div className="col-md-6 mb-4">
          <h4>Hizmetlerimiz</h4>
          <p>
            Tarot, kahve falı, su falı, astroloji gibi birçok farklı fal türünde uzman yorumcularımız ile hizmet vermekteyiz. 
            Kullanıcılar diledikleri fal türünü seçerek kişisel ve detaylı yorumlar alabilirler.
          </p>
        </div>

        <div className="col-md-6 mb-4">
          <h4>Bizimle İletişime Geçin</h4>
          <p>
            Sorularınız ve önerileriniz için bizimle <a href="mailto:alp3rozmen@gmail.com">alp3rozmen@gmail.com</a> adresinden iletişime geçebilirsiniz. 
            Size en kısa sürede geri dönüş yapmaktan memnuniyet duyarız.
          </p>
        </div>
      </div>
    </div>
    </MainCard>
  );
}

export default AboutUs;
