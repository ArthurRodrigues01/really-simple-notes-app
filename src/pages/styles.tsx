import styled from "styled-components/native"

import { ScalableText } from "../components/general-components"


export const NoteTitleInput = styled.TextInput<{fontsize?: number, color?: string }>`
  font-size: ${props => `${props.fontsize}px` || '24px'};
  padding: 16px;
  font-weight: bold;
  color: ${props => props.color || '#000000'}
`
export const NoteTextInput = styled.TextInput<{ fontsize?: number, color?: string, borderColor?: string }>`
  flexGrow: 1;
  text-align-vertical: top;
  font-size: ${props =>  props.fontsize ? `${props.fontsize}px` : '18px'};  
  padding: 16px;
  margin: 16px;
  border: 2px solid ${props => props.borderColor || '#000000'};
  color: ${props => props.color || '#000000'}
`
export const NoteTitlePreview = (props: { fontsize: number, children: string }) => {
  return <ScalableText bold { ...props }/>
}
export const NoteTextPreview = (props: { fontsize: number, children: string }) => {
  return <ScalableText {...props}/>
}