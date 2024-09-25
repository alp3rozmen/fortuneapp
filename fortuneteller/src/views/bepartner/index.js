import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
function BePartner() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    expertise: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form gönderildiğinde yapılacak işlemler burada olacak.
    console.log('Form Data:', formData);
  };

  return (
   <MainCard>
    <div className="container mt-5">
      <h2 className="text-center mb-4">Fortuneteller in Yorumcu Ailesine Katıl!</h2>
      <p className="text-center">
        Fortuneteller in büyülü dünyasına adım atmak ve yeteneklerinizi kazanca dönüştürmek ister misiniz? 
        Uzman fal yorumcularını ekibimize katılmaya davet ediyoruz!
      </p>
      <p className="text-center mb-5">
        Başvuru formunu doldururken, uzmanlaştığınız fal türlerini belirtmeyi unutmayın. 
        Fortuneteller ailesinin bir parçası olarak, yeteneklerinizi sergileyebilir ve profesyonel bir ortamda çalışarak kazanç sağlayabilirsiniz.
      </p>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Ad Soyad</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">Telefon</label>
          <input 
            type="tel" 
            className="form-control" 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="expertise" className="form-label">Uzmanlık Alanı</label>
          <input 
            type="text" 
            className="form-control" 
            id="expertise" 
            name="expertise" 
            value={formData.expertise} 
            onChange={handleChange} 
            placeholder="Örnek: Tarot, Su Falı, Astroloji" 
            required 
          />
        </div>
        <div className="col-12">
          <label htmlFor="message" className="form-label">Mesajınız</label>
          <textarea 
            className="form-control" 
            id="message" 
            name="message" 
            rows="4" 
            value={formData.message} 
            onChange={handleChange} 
            placeholder="Bize kendinizden bahsedin..."
          ></textarea>
        </div>
        <div className="col-12 text-center">
          <button  type="submit" className="mt-2 btn btn-primary">Başvur</button>
        </div>
      </form>
    </div>
  </MainCard>
  );
}

export default BePartner;
