// import Image from 'next/image'
// import ButtonAction from '../ButtonAction/ButtonAction'
// import Masonry from 'react-masonry-css'
// import * as S from './styles'

// const ImagesModal = ({ images }) => {
//   const [opened, { open, close }] = useDisclosure(false)

//   return (
//     <>
//       <ButtonAction
//         text="Show All Images"
//         onClick={open}
//       />
//       <Modal
//         opened={opened}
//         onClose={close}
//         title="All Photos"
//         size="1250px"
//       >
//         <S.ImagesModal>
//           <Masonry
//             breakpointCols={3}
//             className="my-masonry-grid"
//             columnClassName="my-masonry-grid_column"
//           >
//             {images.map((image, i) => {
//               const height = Math.round(
//                 (400 / image.directus_files_id.width) *
//                   image.directus_files_id.height,
//               )
//               return (
//                 <Image
//                   src={`https://saints-cms.onrender.com/assets/${image.directus_files_id.id}?fit=cover&width=400&height=${height}`}
//                   width={400}
//                   height={height}
//                   alt=""
//                   key={i}
//                 />
//               )
//             })}
//           </Masonry>
//         </S.ImagesModal>
//       </Modal>
//     </>
//   )
// }

// export default ImagesModal
