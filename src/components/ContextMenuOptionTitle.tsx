import styled from "styled-components/native";
import { SmallText } from "./general-components";

const ContextText = styled(SmallText)`
  padding: 10px;
  min-width: 150px;
`


function ContextMenuOptionTitle({ selected, children }: { selected?: boolean , children: string } ) {
  return (
    <ContextText style={selected ? { color: 'red', fontWeight: 'bold' } : {}}>
      { children }
    </ContextText>
  )
}

export default ContextMenuOptionTitle