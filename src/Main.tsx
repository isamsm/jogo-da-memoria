import './index.css';

import logo_menu from "./assets/logo_menu.svg"

function Main() {
  return (
    <main className='main_menu flex justify-center items-center flex-col'>
      <div className='flex flex-col gap-2 items-center'>
        <a href='https://youtu.be/F-QJ86-u2U8?si=zAjVS45Cz5ctZjkw' target='_blank'>
          <img src={logo_menu} alt="Logo menu" className='max-w-[250px] lg:max-w-full' />
        </a>
        <h1 style={{
          textShadow: `
            -1px -1px 0.5px #5B54C8,
            1px -1px 0.5px #5B54C8,
            -1px  1px 0.5px #5B54C8,
            1px  1px 0.5px #5B54C8
          `,
        }} 
        className='text-2xl lg:text-[40px] text-[#000]'> 
          JOGO DA MEMÓRIA 
        </h1>
      </div>
      <a id='play_btn' href="/game" className='w-[200px] lg:w-[260px] h-9 lg:h-12 rounded-3xl relative text-xl lg:text-[32px] text-[#402B81] mt-6'>
        <span style={{
          textShadow: `
           -1px -1px 0.5px #5B54C8,
            1px -1px 0.5px #5B54C8,
            -1px  1px 0.5px #5B54C8,
            1px  1px 0.5px #5B54C8
          `,
        }} 
        className='absolute right-0 left-0 -top-[5px] lg:-top-[8px] bottom-0 flex justify-center items-center'> 
          Jogar 
        </span>
      </a>
    </main>
  );
}

export default Main;
