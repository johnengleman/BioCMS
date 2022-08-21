import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faChurch,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons';

import { Saint } from './interfaces';
import Slider from '../Slider/Slider';

export default function SaintSummary(props: Saint) {
  const { name, biography, birth_date, death_date, photos } = props;

  const getYear = (date: string): number => {
    const newDate = new Date(date);
    return newDate.getFullYear();
  };

  const age = getYear(death_date) - getYear(birth_date);

  return (
    <div className='w-[300px] bg-white rounded-xl border border-4 border-x-gray-300'>
      <div className='h-[300px] border border border-x-gray-300 rounded-xl overflow-hidden'>
        <Slider photos={photos} />
      </div>
      <div className='w-11/12 mx-auto -mt-4 relative z-10'>
        <div className='rounded bg-gradient-to-r p-[2px] from-[#4A62BF] to-[#FFB800] mb-4'>
          <div className='bg-[#342d2d] text-[#ffd8d8] text-center text-lg rounded py-1'>
            {name}
          </div>
        </div>
        <div className='shadow-lg border border-slate-200 rounded-xl p-4'>
          <div
            className='text-base text-[#1a4760] line-clamp-10 mb-4'
            dangerouslySetInnerHTML={{ __html: biography }}
          />
          <p className='text-sm text-[#676666c2] text-right'>
            {getYear(birth_date)}-{getYear(death_date)} AD, {age} years
          </p>
        </div>

        <div className='flex justify-between mx-2.5 my-4'>
          <button>
            <FontAwesomeIcon icon={faBook} />
            <span className='text-[#656565] text-base font-semibold ml-1'>
              0
            </span>
          </button>
          <button>
            <FontAwesomeIcon icon={faChurch} />
            <span className='text-[#656565] text-base font-semibold ml-1'>
              0
            </span>
          </button>
          <button>
            <FontAwesomeIcon icon={faQuoteRight} />
            <span className='text-[#656565] text-base font-semibold ml-1'>
              0
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
