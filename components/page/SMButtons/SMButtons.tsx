import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSquareXTwitter,
  faSquareFacebook,
} from '@fortawesome/free-brands-svg-icons'
import { faQuestion } from '@fortawesome/pro-duotone-svg-icons'

import * as S from './styles'

const SMButtons = ({ transparent }) => (
  <S.SocialMediaButtons>
    <div className="button">
      <FontAwesomeIcon
        icon={faSquareXTwitter}
        style={{
          color: transparent ? '#ffffff' : '#ccad00',
          fontSize: '35px',
        }}
      />
    </div>
    <div className="button">
      <FontAwesomeIcon
        icon={faSquareFacebook}
        style={{
          color: transparent ? '#ffffff' : '#ccad00',
          fontSize: '35px',
        }}
      />
    </div>
  </S.SocialMediaButtons>
)

export default SMButtons
