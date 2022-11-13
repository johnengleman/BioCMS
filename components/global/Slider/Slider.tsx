import Image from 'next/image';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Slider({ photos }) {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {photos.map((photo, i) => (
        <SwiperSlide key={i}>
          <Image
            alt='profile'
            src={`https://4hi7oa87.directus.app/assets/${photo.directus_files_id?.id}`}
            layout='fixed'
            width={300}
            height={300}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
