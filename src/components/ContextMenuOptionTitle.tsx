import { ContextText } from "./styles";


function ContextMenuOptionTitle({ selected, children }: { selected?: boolean , children: string } ) {
  return (
    <ContextText style={selected ? { color: 'red', fontWeight: 'bold' } : {}}>
      { children }
    </ContextText>
  )
}

export default ContextMenuOptionTitle