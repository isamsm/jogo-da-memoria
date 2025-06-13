import { useRef, useEffect, useState, useMemo } from 'react';

import './index.css';

import card_default from './assets/card_default.svg';

import camera from './assets/cards/camera.svg';
import velvet from './assets/cards/velvet_cove.svg';
import playgroud from './assets/cards/playground.svg';
import in_hell from './assets/cards/in_hell.svg';
import peace from './assets/cards/peace.svg';
import guitar from './assets/cards/guitar.svg';
import friends from './assets/cards/friends.svg';
import bloom_rage from './assets/cards/bloom_rage.svg';
import bloody_mary from './assets/cards/bloody_mary.svg';
import autumn_card from './assets/cards/autmn_card.svg';

import kat from './assets/kat.svg';
import swann from './assets/swann.svg';
import autumn from './assets/autumn.svg';
import noora from './assets/noora.svg';

interface Card {
  defaultImg: any;
  turnedImg: any;
  id: string
}

const level_one: Card[] = [
  { defaultImg: card_default, turnedImg: camera, id: 'camera' },
  { defaultImg: card_default, turnedImg: velvet, id: 'velvet' },
  { defaultImg: card_default, turnedImg: playgroud, id: 'playground' },
  { defaultImg: card_default, turnedImg: in_hell, id: 'in_hell' },
];

const level_two: Card[] = [
  { defaultImg: card_default, turnedImg: peace, id: 'peace' },
  { defaultImg: card_default, turnedImg: guitar, id: 'guitar' },
  { defaultImg: card_default, turnedImg: friends, id: 'friends' },
  { defaultImg: card_default, turnedImg: bloom_rage, id: 'bloom_rage' },
  { defaultImg: card_default, turnedImg: bloody_mary, id: 'bloody_mary' },
  { defaultImg: card_default, turnedImg: autumn_card, id: 'autumn_card' },
];

function Game() {
  const [turnedCards, setTurnedCards] = useState<number[]>([]);
  const [cardName, setCardName] = useState<string[]>([]);
  const [timerActive, setTimerActive] = useState(true);
  const [timer, setTimer] = useState(0);

  const [levelTwo, setLevelTwo] = useState(false);

  const [popup, setPopup] = useState(false);
  const [popupOver, setPopupOver] = useState(false);

  const item = useRef<HTMLDivElement>(null);

  const [match, setMatch] = useState<string[]>([]);

  const shuffle = (array: Card[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const duplicate = useMemo(() => levelTwo ? shuffle([...level_two, ...level_two]) : shuffle([...level_one, ...level_one]), [levelTwo]);

  useEffect(() => {
    if (turnedCards.length === 2) {
      setTimeout(() => {
        setTurnedCards([]);
        setCardName([]);
      }, 500);
    }

    const firstItem = cardName[0];
    const secondItem = cardName[1];

    if (firstItem !== undefined && secondItem !== undefined && firstItem == secondItem) {
      setMatch([...match, firstItem]);
    }
  }, [turnedCards]);

  useEffect(() => {
    shuffle(duplicate);
  }, []);

  useEffect(() => {
    match.forEach((card) => {
      if(levelTwo) {
        level_two.forEach((item) => {
          if (item.id === card) {
            item.defaultImg = item.turnedImg;
          }
        })
      } else {
        level_one.forEach((item) => {
          if (item.id === card) {
            item.defaultImg = item.turnedImg;
          }
        })  
      }
    })
  }, [match]);

  useEffect(() => {
    if(timerActive) {
      const interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive]);

  useEffect(() => {
    if(levelTwo ? timer == 25 && match.length < level_two.length : timer == 15 && match.length < level_one.length) {
      setTimerActive(false);
      setPopupOver(true);
    } else if(levelTwo ? timer < 25 && match.length == level_two.length : timer < 15 && match.length == level_one.length) {
      setTimerActive(false);
      setPopup(true);
    }
  }, [timer]);

  useEffect(() => {
    if(levelTwo == true) {
      setPopup(false);
      setTimer(0);
      setTimerActive(true);
      setTurnedCards([]);
      setMatch([]);
    }
  }, [levelTwo]);

  return (
    <main className='main_game'>
      {!levelTwo &&
        <div className='flex flex-col items-center justify-center h-full p-4 lg:p-0'>
          <div className='w-full max-w-[700px]'>
            <div className='flex lg:flex-row flex-col items-center justify-between pb-4 lg:pb-10'>
              <p style={{
                textShadow: `
                  -1px -1px 0.5px #775CA5,
                  1px -1px 0.5px #775CA5,
                  -1px  1px 0.5px #775CA5,
                  1px  1px 0.5px #775CA5
                `,
              }}  
              className='text-4xl lg:text-5xl text-[#402B81] text-shadow-sm'> 
                Points: 
                <span className='text-[#BDA7FF]'></span> 
              </p>
              <p style={{
                textShadow: `
                  -1px -1px 0.5px #775CA5,
                  1px -1px 0.5px #775CA5,
                  -1px  1px 0.5px #775CA5,
                  1px  1px 0.5px #775CA5
                `,
              }}  
              className='text-4xl lg:text-5xl text-[#402B81] text-shadow-sm'> 
                Timer: 
                <span> {timer} </span> 
              </p>
              <p style={{
                textShadow: `
                  -1px -1px 0.5px #775CA5,
                  1px -1px 0.5px #775CA5,
                  -1px  1px 0.5px #775CA5,
                  1px  1px 0.5px #775CA5
                `,
              }}  
              className='text-4xl lg:text-5xl text-[#402B81] text-shadow-sm'>
                 Level 1
              </p>
            </div>
            <div id='canvas' className='rounded-3xl w-full lg:h-[444px] flex items-center justify-center relative p-4 lg:p-0'>
              <div className='grid grid-cols-4 gap-4 lg:gap-x-10 lg:gap-y-8'>
                {duplicate.map((card, index) => (
                  <div ref={item} className='w-fit' key={index} data-id={index}>
                    <img onClick={() => [setCardName([...cardName, card.id]), setTurnedCards([...turnedCards, index])]} src={turnedCards.includes(index) ? card.turnedImg : card.defaultImg} alt={card.id} />
                  </div>
                ))}
              </div>
              <img src={autumn} className='absolute -bottom-20 -left-40 lg:block hidden' alt="Autumn" />
              <img src={noora} className='absolute bottom-5 -right-40 lg:block hidden' alt="Noora" />
            </div>
          </div>
        </div>
      } 

      {levelTwo && (
        <div className='flex flex-col items-center justify-center h-full p-4 lg:p-0'>
          <div className='w-full max-w-[900px]'>
              <div className='flex lg:flex-row flex-col items-center justify-between pb-4 lg:pb-10'>
                <p style={{
                  textShadow: `
                    -1px -1px 0.5px #775CA5,
                    1px -1px 0.5px #775CA5,
                    -1px  1px 0.5px #775CA5,
                    1px  1px 0.5px #775CA5
                  `,
                }}   
                className='text-5xl text-[#402B81] text-shadow-sm'> 
                  Points: 
                  <span className='text-[#BDA7FF]'></span> 
                </p>
                <p style={{
                  textShadow: `
                    -1px -1px 0.5px #775CA5,
                    1px -1px 0.5px #775CA5,
                    -1px  1px 0.5px #775CA5,
                    1px  1px 0.5px #775CA5
                  `,
                }}    
                className='text-5xl text-[#402B81] text-shadow-sm'> 
                  Timer: 
                  <span> {timer} </span> 
                </p>
                <p style={{
                  textShadow: `
                    -1px -1px 0.5px #775CA5,
                    1px -1px 0.5px #775CA5,
                    -1px  1px 0.5px #775CA5,
                    1px  1px 0.5px #775CA5
                  `,
                }}   
                className='text-5xl text-[#402B81] text-shadow-sm'> 
                  Level 2 
                </p>
              </div>
              <div id='canvas' className='rounded-3xl w-full lg:h-[444px] flex items-center justify-center relative p-4 lg:p-0'>
              <div className='grid grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-x-6 lg:gap-y-8'>
                  {duplicate.map((card, index) => (
                  <div ref={item} className='w-fit' key={index} data-id={index}>
                      <img onClick={() => [setCardName([...cardName, card.id]), setTurnedCards([...turnedCards, index])]} src={turnedCards.includes(index) ? card.turnedImg : card.defaultImg} alt={card.id} />
                  </div>
                  ))}
              </div>
              <img src={swann} className='absolute -bottom-20 -left-40 lg:block hidden' alt="Swann" />
              <img src={kat} className='absolute bottom-5 -right-40 lg:block hidden' alt="Kat" />
              </div>
          </div>
        </div>
      )}	

      {popup && (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5' }} className='fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center'>
          <div id='popup_won' className='max-w-[340px] lg:max-w-[650px] lg:h-[234px] flex flex-col items-center justify-center gap-2 lg:gap-8 relative rounded-3xl py-5 lg:p-0'>
            <h3 style={{
                textShadow: `
                  -1px -1px 0.5px #775CA5,
                  1px -1px 0.5px #775CA5,
                  -1px  1px 0.5px #775CA5,
                  1px  1px 0.5px #775CA5
                `,
              }}   
              className='text-4xl lg:text-5xl text-[#402B81] lg:max-w-[70%] text-center'> 
                Parabéns, você venceu com o tempo de: 
                <span className='text-[#BDA7FF]'> {timer}s </span> 
              </h3>
            {levelTwo ? (
              <a style={{
                textShadow: `
                  -1px -1px 0.5px #775CA5,
                  1px -1px 0.5px #775CA5,
                  -1px  1px 0.5px #775CA5,
                  1px  1px 0.5px #775CA5
                `,
              }}   
              href='/'
              className='bg-transparent border-none text-3xl lg:text-4xl text-[#BDA7FF] cursor-pointer'> Jogar novamente?
            </a>
            ): 
            <button style={{
                textShadow: `
                  -1px -1px 0.5px #775CA5,
                  1px -1px 0.5px #775CA5,
                  -1px  1px 0.5px #775CA5,
                  1px  1px 0.5px #775CA5
                `,
              }}   
              onClick={() => setLevelTwo(true)} 
              className='bg-transparent border-none text-3xl lg:text-4xl text-[#BDA7FF] cursor-pointer'> Próxima fase?
            </button>
            }
            <button style={{
                textShadow: `
                  -1px -1px 0.5px #402B81,
                  1px -1px 0.5px #402B81,
                  -1px  1px 0.5px #402B81,
                  1px  1px 0.5px #402B81
                `,
              }}   
              onClick={() => setPopup(false)} className='text-3xl lg:text-4xl text-[#BDA7FF] cursor-pointer absolute -top-1 right-3'> 
              x 
            </button>
          </div>
        </div>
      )}

      {popupOver && (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5' }} className='fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center'>
          <div id='popup_won' className='max-w-[340px] lg:max-w-[600px] w-full lg:h-[234px] flex flex-col items-center justify-center gap-2 lg:gap-8 relative rounded-3xl py-5 lg:p-0'>
            <h3 style={{
                textShadow: `
                  -1px -1px 0.5px #775CA5,
                  1px -1px 0.5px #775CA5,
                  -1px  1px 0.5px #775CA5,
                  1px  1px 0.5px #775CA5
                `,
              }}   
              className='text-4xl lg:text-5xl text-[#402B81] text-center'> 
              Oh oh, seu tempo acabou! 
            </h3>
            <button style={{
                textShadow: `
                  -1px -1px 0.5px #775CA5,
                  1px -1px 0.5px #775CA5,
                  -1px  1px 0.5px #775CA5,
                  1px  1px 0.5px #775CA5
                `,
              }}   
              onClick={() => window.location.reload()} 
              className='bg-transparent border-none text-3xl lg:text-4xl text-[#BDA7FF] cursor-pointer'> 
              Jogar novamente? 
            </button>
            <button style={{
                textShadow: `
                  -1px -1px 0.5px #402B81,
                  1px -1px 0.5px #402B81,
                  -1px  1px 0.5px #402B81,
                  1px  1px 0.5px #402B81
                `,
              }}   
              onClick={() => setPopupOver(false)} 
              className='text-3xl lg:text-4xl text-[#BDA7FF] cursor-pointer absolute -top-1 right-3'> 
              x 
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Game;
