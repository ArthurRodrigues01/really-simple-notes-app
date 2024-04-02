import { TextProps } from 'react-native'

import MagnifySVG from '../../assets/Magnify'
import { NoNoteFeedbackWrapper } from './styles'
import { Title } from '../general-components'


function NoNoteFeedback({children}: TextProps) {
  return (
    <NoNoteFeedbackWrapper>
      <MagnifySVG width={100} height={100}/>
      <Title>{children}</Title>
    </NoNoteFeedbackWrapper>
  )
}

export default NoNoteFeedback