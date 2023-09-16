import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSquareXTwitter,
  faSquareFacebook,
} from '@fortawesome/free-brands-svg-icons'

import * as S from './styles'

const SMButtons = ({ transparent }) => (
  <S.SocialMediaButtons>
    <Link href="https://twitter.com/findasaint">
      <div className="button">
        <FontAwesomeIcon
          icon={faSquareXTwitter}
          style={{
            color: transparent ? '#ffffff' : '#ccad00',
            fontSize: '35px',
          }}
        />
      </div>
    </Link>
    <Link href="https://www.facebook.com/groups/findasaint">
      <div className="button">
        <FontAwesomeIcon
          icon={faSquareFacebook}
          style={{
            color: transparent ? '#ffffff' : '#ccad00',
            fontSize: '35px',
          }}
        />
      </div>
    </Link>
  </S.SocialMediaButtons>
)

export default SMButtons
