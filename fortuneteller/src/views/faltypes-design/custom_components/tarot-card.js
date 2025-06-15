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
              image={card.image}
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