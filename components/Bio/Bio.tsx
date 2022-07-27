import { useState } from 'react';
import Image from 'next/image';
import { Saint } from './interfaces';
import { SaintStyled } from './styles';

export default function Bio(props: Saint) {
  const {
    name,
    image_main,
    biography,
    birth_date,
    birth_location,
    death_date,
    death_location,
    photos,
  } = props;

  const miniPhotoLeft = photos[0]?.directus_files_id.id;
  const miniPhotoRight = photos[1]?.directus_files_id.id;

  const [images, setImages] = useState({
    main: image_main.id,
    miniLeft: miniPhotoLeft,
    miniRight: miniPhotoRight,
  });

  const getYear = (date: string): number => {
    const newDate = new Date(date);
    return newDate.getFullYear();
  };

  const age = getYear(death_date) - getYear(birth_date);

  console.log(biography);

  return (
    <SaintStyled>
      <div className='c-photo'>
        <div className='photo-main'>
          <Image
            alt='profile'
            src={`https://4hi7oa87.directus.app/assets/${images.main}?key=profile2`}
            layout='fill'
          />
        </div>
        {miniPhotoLeft && (
          <div className='photo-mini mini-left'>
            <Image
              alt='profile'
              src={`https://4hi7oa87.directus.app/assets/${images.miniLeft}?key=profile2`}
              layout='fill'
              onClick={() =>
                setImages((prevState) => ({
                  ...prevState,
                  main: prevState.miniLeft,
                  miniLeft: prevState.main,
                }))
              }
            />
          </div>
        )}

        {miniPhotoRight && (
          <div className='photo-mini mini-right'>
            <Image
              alt='profile'
              src={`https://4hi7oa87.directus.app/assets/${images.miniRight}?key=profile2 `}
              layout='fill'
              onClick={() =>
                setImages((prevState) => ({
                  ...prevState,
                  main: prevState.miniRight,
                  miniRight: prevState.main,
                }))
              }
            />
          </div>
        )}
      </div>
      <div className='c-bio'>
        <div className='name'>{name}</div>
        <div className='bio' dangerouslySetInnerHTML={{ __html: biography }} />
        <div className='c-dates'>
          <div className='birth'>
            <span className='year'>{getYear(birth_date)}</span>
            <span className='place'>{birth_location}</span>
          </div>
          <div className='death'>
            <span className='year'>{`age ${age}, ${getYear(death_date)}`}</span>
            <span className='place'>{death_location}</span>
          </div>
        </div>
        <div className='c-relics'>
          <div className='title'>History of My Relics</div>
          <div className='icon'></div>
          <div className='c-events'>
            <div className='event'>
              <div className='date'></div>
              <div className='title'></div>
            </div>
          </div>
        </div>
        <div className='footer'>
          <button className='btn btn-icon'>
            Icons<span className='count'>0</span>
          </button>
          <button className='btn btn-churches'>
            Churches<span className='count'>0</span>
          </button>
          <button className='btn btn-books'>
            Books<span className='count'>0</span>
          </button>
        </div>
      </div>
    </SaintStyled>
  );
}
