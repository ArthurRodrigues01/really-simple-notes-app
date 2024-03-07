import { TextProps } from "react-native";
import { CenteredFlexRow, Title } from "./general-components";

function HeaderLeftHome({children}: TextProps) {
  
  return (
    <CenteredFlexRow>
      <Title color={'#fff'}>
        {children}
      </Title>
    </CenteredFlexRow>
  )
}

export default HeaderLeftHome