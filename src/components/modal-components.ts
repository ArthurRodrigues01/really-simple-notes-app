import styled from "styled-components/native";

import { ANDROID_BACKDROP_COLOR, ANDROID_BACKDROP_OPACITY } from "../constants/constants";
import { CenteredFlexCol, FlexCol, NativeButton } from "./general-components";

export const ModalBackdrop = styled.Pressable`
  height: 100%;
  width: 100%;
  background-color: ${ANDROID_BACKDROP_COLOR};
  opacity: ${ANDROID_BACKDROP_OPACITY};
  position: absolute;
`
export const ModalButton = styled(NativeButton)`
  padding: 8px;
  border-radius: 16px;
  background-color: royalblue;
  display: flex;
  align-items: center;
`
export const ModalAlertBoxContainer = styled(CenteredFlexCol)`
  height: 100%;
`
export const ModalAlertBox = styled(FlexCol)<{width?: number, height?: number}>`
  width: ${ props => props.width && isFinite(props.width) ? `${props.width}px` : 'auto' };
  height: ${ props => props.height && isFinite(props.height) ? `${props.height}px` : 'auto' };
  gap: 24px;
  background-color: #ffffff;
  padding: 24px;
`