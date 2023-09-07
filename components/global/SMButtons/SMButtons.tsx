import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSquareXTwitter,
  faSquareFacebook,
} from '@fortawesome/free-brands-svg-icons'
import { faQuestion } from '@fortawesome/pro-duotone-svg-icons'

import * as S from './styles'

const SMButtons = () => (
  <S.SocialMediaButtons>
    <div className="button">
      <FontAwesomeIcon
        icon={faSquareXTwitter}
        style={{ color: '#ccad00', fontSize: '30px' }}
      />
    </div>
    <div className="button">
      <FontAwesomeIcon
        icon={faSquareFacebook}
        style={{ color: '#ccad00', fontSize: '30px' }}
      />
    </div>
  </S.SocialMediaButtons>
)

export default SMButtons
