import styled from "styled-components/native"

import MoreActionsButtonHome from "../buttons/MoreActionsButtonHome"
import NoteSortButton from "../buttons/NoteSortButton"
import { HeaderWrapper } from "./styles"
import { CenteredFlexRow, Title } from "../general-components"


function HomeHeader({pageTitle}: {pageTitle: string}) {
  return (
    <HeaderWrapper>
      <CenteredFlexRow>
        <Title color="#fff">{pageTitle}</Title>
      </CenteredFlexRow>
      <CenteredFlexRow>
        <NoteSortButton/>
        <MoreActionsButtonHome/> 
      </CenteredFlexRow>
    </HeaderWrapper>
  )
}

export default HomeHeader