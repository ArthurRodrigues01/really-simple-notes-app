import { CenteredFlexRow } from "./general-components"
import MoreActionsButtonHome from "./buttons/MoreActionsButtonHome"
import NoteSortButton from "./NoteSortButton"

function HeaderRightHome() {
  
  return (
    <CenteredFlexRow>
      <NoteSortButton/>
      <MoreActionsButtonHome/> 
    </CenteredFlexRow>
  )
}

export default HeaderRightHome