import React, { useEffect, useState } from 'react';
import { Card, CardMedia, Grid } from '@mui/material';

const TarotCard = React.forwardRef((props, ref) => {
  const { defaultValue, disabled } = props;
  const [selectedCards, setSelectedCards] = useState(defaultValue || []);
  
  useEffect(() => {
    if (props.SelectedCardsFromApi) {
      setSelectedCards(props.SelectedCardsFromApi);
      if (ref?.current) {
        ref.current.value = props.SelectedCardsFromApi;
      }
    }
  }, []);

  const tarotCards = [
    { id: 0, name: 'The Fool', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar00.jpg' },
    { id: 1, name: 'The Magician', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar01.jpg' },
    { id: 2, name: 'The High Priestess', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar02.jpg' },
    { id: 3, name: 'The Empress', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar03.jpg' },
    { id: 4, name: 'The Emperor', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar04.jpg' },
    { id: 5, name: 'The Hierophant', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar05.jpg' },
    { id: 6, name: 'The Lovers', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar06.jpg' },
    { id: 7, name: 'The Chariot', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar07.jpg' },
    { id: 8, name: 'Strength', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar08.jpg' },
    { id: 9, name: 'The Hermit', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar09.jpg' },
    { id: 10, name: 'Wheel of Fortune', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar10.jpg' },
    { id: 11, name: 'Justice', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar11.jpg' },
    { id: 12, name: 'The Hanged Man', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar12.jpg' },
    { id: 13, name: 'Death', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar13.jpg' },
    { id: 14, name: 'Temperance', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar14.jpg' },
    { id: 15, name: 'The Devil', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar15.jpg' },
    { id: 16, name: 'The Tower', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar16.jpg' },
    { id: 17, name: 'The Star', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar17.jpg' },
    { id: 18, name: 'The Moon', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar18.jpg' },
    { id: 19, name: 'The Sun', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar19.jpg' },
    { id: 20, name: 'Judgement', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar20.jpg' },
    { id: 21, name: 'The World', image: 'https://www.sacred-texts.com/tarot/pkt/img/ar21.jpg' },
    // Kupa Asları
    { id: 22, name: 'Ace of Cups', image: 'https://www.sacred-texts.com/tarot/pkt/img/cuac.jpg' },
    { id: 23, name: 'Two of Cups', image: 'https://www.sacred-texts.com/tarot/pkt/img/cu02.jpg' },
    { id: 24, name: 'Three of Cups', image: 'https://www.sacred-texts.com/tarot/pkt/img/cu03.jpg' },
    { id: 25, name: 'Four of Cups', image: 'https://www.sacred-texts.com/tarot/pkt/img/cu04.jpg' },
    { id: 26, name: 'Five of Cups', image: 'https://www.sacred-texts.com/tarot/pkt/img/cu05.jpg' },
    { id: 27, name: 'Six of Cups', image: 'https://www.sacred-texts.com/tarot/pkt/img/cu06.jpg' },
    { id: 28, name: 'Seven of Cups', image: 'https://www.sacred-texts.com/tarot/pkt/img/cu07.jpg' },
    { id: 29, name: 'Eight of Cups', image: 'https://www.sacred-texts.com/tarot/pkt/img/cu08.jpg' },
    { id: 30, name: 'Nine of Cups', image: 'https://www.sacred-texts.com/tarot/pkt/img/cu09.jpg' },
    { id: 31, name: 'Ten of Cups', image: 'https://www.sacred-texts.com/tarot/pkt/img/cu10.jpg' },
    { id: 32, name: 'Page of Cups', image: 'https://www.sacred-texts.com/tarot/pkt/img/cupa.jpg' },
    { id: 33, name: 'Knight of Cups', image: 'https://www.sacred-texts.com/tarot/pkt/img/cukn.jpg' },
    { id: 34, name: 'Queen of Cups', image: 'https://www.sacred-texts.com/tarot/pkt/img/cuqu.jpg' },
    { id: 35, name: 'King of Cups', image: 'https://www.sacred-texts.com/tarot/pkt/img/cuki.jpg' },
    // Kılıç Asları
    { id: 36, name: 'Ace of Swords', image: 'https://www.sacred-texts.com/tarot/pkt/img/swac.jpg' },
    { id: 37, name: 'Two of Swords', image: 'https://www.sacred-texts.com/tarot/pkt/img/sw02.jpg' },
    { id: 38, name: 'Three of Swords', image: 'https://www.sacred-texts.com/tarot/pkt/img/sw03.jpg' },
    { id: 39, name: 'Four of Swords', image: 'https://www.sacred-texts.com/tarot/pkt/img/sw04.jpg' },
    { id: 40, name: 'Five of Swords', image: 'https://www.sacred-texts.com/tarot/pkt/img/sw05.jpg' },
    { id: 41, name: 'Six of Swords', image: 'https://www.sacred-texts.com/tarot/pkt/img/sw06.jpg' },
    { id: 42, name: 'Seven of Swords', image: 'https://www.sacred-texts.com/tarot/pkt/img/sw07.jpg' },
    { id: 43, name: 'Eight of Swords', image: 'https://www.sacred-texts.com/tarot/pkt/img/sw08.jpg' },
    { id: 44, name: 'Nine of Swords', image: 'https://www.sacred-texts.com/tarot/pkt/img/sw09.jpg' },
    { id: 45, name: 'Ten of Swords', image: 'https://www.sacred-texts.com/tarot/pkt/img/sw10.jpg' },
    { id: 46, name: 'Page of Swords', image: 'https://www.sacred-texts.com/tarot/pkt/img/swpa.jpg' },
    { id: 47, name: 'Knight of Swords', image: 'https://www.sacred-texts.com/tarot/pkt/img/swkn.jpg' },
    { id: 48, name: 'Queen of Swords', image: 'https://www.sacred-texts.com/tarot/pkt/img/swqu.jpg' },
    { id: 49, name: 'King of Swords', image: 'https://www.sacred-texts.com/tarot/pkt/img/swki.jpg' },
    // Değnek Asları
    { id: 50, name: 'Ace of Wands', image: 'https://www.sacred-texts.com/tarot/pkt/img/waac.jpg' },
    { id: 51, name: 'Two of Wands', image: 'https://www.sacred-texts.com/tarot/pkt/img/wa02.jpg' },
    { id: 52, name: 'Three of Wands', image: 'https://www.sacred-texts.com/tarot/pkt/img/wa03.jpg' },
    { id: 53, name: 'Four of Wands', image: 'https://www.sacred-texts.com/tarot/pkt/img/wa04.jpg' },
    { id: 54, name: 'Five of Wands', image: 'https://www.sacred-texts.com/tarot/pkt/img/wa05.jpg' },
    { id: 55, name: 'Six of Wands', image: 'https://www.sacred-texts.com/tarot/pkt/img/wa06.jpg' },
    { id: 56, name: 'Seven of Wands', image: 'https://www.sacred-texts.com/tarot/pkt/img/wa07.jpg' },
    { id: 57, name: 'Eight of Wands', image: 'https://www.sacred-texts.com/tarot/pkt/img/wa08.jpg' },
    { id: 58, name: 'Nine of Wands', image: 'https://www.sacred-texts.com/tarot/pkt/img/wa09.jpg' },
    { id: 59, name: 'Ten of Wands', image: 'https://www.sacred-texts.com/tarot/pkt/img/wa10.jpg' },
    { id: 60, name: 'Page of Wands', image: 'https://www.sacred-texts.com/tarot/pkt/img/wapa.jpg' },
    { id: 61, name: 'Knight of Wands', image: 'https://www.sacred-texts.com/tarot/pkt/img/wakn.jpg' },
    { id: 62, name: 'Queen of Wands', image: 'https://www.sacred-texts.com/tarot/pkt/img/waqu.jpg' },
    { id: 63, name: 'King of Wands', image: 'https://www.sacred-texts.com/tarot/pkt/img/waki.jpg' },
    // Para Asları
    { id: 64, name: 'Ace of Pentacles', image: 'https://www.sacred-texts.com/tarot/pkt/img/peac.jpg' },
    { id: 65, name: 'Two of Pentacles', image: 'https://www.sacred-texts.com/tarot/pkt/img/pe02.jpg' },
    { id: 66, name: 'Three of Pentacles', image: 'https://www.sacred-texts.com/tarot/pkt/img/pe03.jpg' },
    { id: 67, name: 'Four of Pentacles', image: 'https://www.sacred-texts.com/tarot/pkt/img/pe04.jpg' },
    { id: 68, name: 'Five of Pentacles', image: 'https://www.sacred-texts.com/tarot/pkt/img/pe05.jpg' },
    { id: 69, name: 'Six of Pentacles', image: 'https://www.sacred-texts.com/tarot/pkt/img/pe06.jpg' },
    { id: 70, name: 'Seven of Pentacles', image: 'https://www.sacred-texts.com/tarot/pkt/img/pe07.jpg' },
    { id: 71, name: 'Eight of Pentacles', image: 'https://www.sacred-texts.com/tarot/pkt/img/pe08.jpg' },
    { id: 72, name: 'Nine of Pentacles', image: 'https://www.sacred-texts.com/tarot/pkt/img/pe09.jpg' },
    { id: 73, name: 'Ten of Pentacles', image: 'https://www.sacred-texts.com/tarot/pkt/img/pe10.jpg' },
    { id: 74, name: 'Page of Pentacles', image: 'https://www.sacred-texts.com/tarot/pkt/img/pepa.jpg' },
    { id: 75, name: 'Knight of Pentacles', image: 'https://www.sacred-texts.com/tarot/pkt/img/pekn.jpg' },
    { id: 76, name: 'Queen of Pentacles', image: 'https://www.sacred-texts.com/tarot/pkt/img/pequ.jpg' },
    { id: 77, name: 'King of Pentacles', image: 'https://www.sacred-texts.com/tarot/pkt/img/peki.jpg' }
  ];

  const handleCardSelect = (cardId) => {
    if (disabled) return;
    var allCardsSelected = false;

    let newSelected = [...selectedCards];
    const index = newSelected.indexOf(cardId);
    
    if (index === -1 && newSelected.length < 3) {
      newSelected.push(cardId);
    } else if (index !== -1) {
      newSelected.splice(index, 1);
    }
    else{
      allCardsSelected = true;
    }

    props.onChange({ selectedCards: newSelected, IsallCardsSelected : allCardsSelected });

    setSelectedCards(newSelected);

    if (ref?.current) {
      ref.current.value = newSelected;
    }
  };

  return (
    <>
    <div>
        <h4>{props.title}</h4>
        <p>{props.description}</p>
      </div>

      <Grid title={props.title} container spacing={2}>
        {selectedCards.length > 0 && props.SelectedCardsFromApi ? (
          <Grid item xs={12}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {selectedCards.map((cardId) => {
                const card = tarotCards.find(c => c.id === cardId);
                return (
                  <Card key={card.id} sx={{ width: 150, height: 250 }}>
                    <CardMedia
                      component="img"
                      image={card.image}
                      alt={card.name}
                      sx={{ height: 250 }}
                    />
                  </Card>
                );
              })}
            </div>
          </Grid>
        ) 
        :
        tarotCards.map((card) => (
          <Grid item xs={4} sm={3} md={2} key={card.id}>
            <Card
              sx={{
              cursor: disabled ? 'default' : 'pointer',
              border: selectedCards.includes(card.id) ? '5px solid #1976d2' : 'none',
              opacity: disabled ? 0.7 : 1
            }}
            onClick={() => handleCardSelect(card.id)}
          >
            <CardMedia
              component="img"
              image="data:image/jpeg;base64,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"
              alt={card.name}
              sx={{ height: 140 }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
});

export default TarotCard;