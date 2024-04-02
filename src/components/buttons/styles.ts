import styled from "styled-components/native"

import { NativeButton, SmallText } from "../general-components"


export const CreateNoteButtonWrapper = styled(NativeButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 60px;
  position: absolute;
  background-color: royalblue;
  bottom: 20px;
  right: 20px;
`
export const NoteWrapper = styled(NativeButton)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: gray;
`
export const NoteFooter = styled(SmallText)`
  font-size: 14px;
  align-self: flex-end;
`