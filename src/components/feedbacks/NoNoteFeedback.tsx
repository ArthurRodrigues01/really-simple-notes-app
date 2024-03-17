import styled from 'styled-components/native'
import { Title, CenteredFlexCol } from '../general-components'
import MagnifySVG from '../../assets/Magnify'
import { TextProps } from 'react-native'


const NoNoteFeedbackWrapper = styled(CenteredFlexCol)`
  gap: 72px;
  flex-grow: 1;
`

function NoNoteFeedback({children}: TextProps) {
  return (
    <NoNoteFeedbackWrapper>
      <MagnifySVG width={100} height={100}/>
      <Title>{children}</Title>
    </NoNoteFeedbackWrapper>
  )
}

export default NoNoteFeedback