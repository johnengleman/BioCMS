import { Saint } from './interfaces';
import { SaintStyled } from './styles';

export default function Bio(props: Saint) {
  const {
    name,
    biography,
    birth_date,
    birth_location,
    death_date,
    death_location,
  } = props;

  return (
    <SaintStyled>
      <div className='c-photo'>
        <div className='photo-main'></div>
        <div className='photo-mini'></div>
        <div className='photo-mini'></div>
      </div>
      <div className='c-bio'>
        <div className='name'>{name}</div>
        <div className='bio'>{biography}</div>
        <div className='c-dates'>
          <div className='birth'>
            <span className='year'>{birth_date}</span>
            <span className='place'>{birth_location}</span>
          </div>
          <div className='death'>
            <span className='year'>{death_date}</span>
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
      </div>
    </SaintStyled>
  );
}
