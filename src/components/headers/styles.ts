import styled from "styled-components/native"
import { CenteredFlexRow, FlexRow } from "../general-components"
import { HEADER_BACKGROUND_COLOR } from "../../constants/constants"

export const HeaderLeftWrapper = styled(CenteredFlexRow)`
  gap: 16px;
`
export const HeaderWrapper = styled(FlexRow)`
  justify-content: space-between;
  background-color: ${HEADER_BACKGROUND_COLOR};
  padding: 3px 16px;

`