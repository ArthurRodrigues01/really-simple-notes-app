import { ColorValue, Pressable, PressableProps } from "react-native";

import styled from "styled-components/native";

export const FlexRow = styled.View<{gap?: number}>`
  display: flex;
  flex-direction: row;
  ${props => props.gap ? `gap: ${props.gap}px` : ''};
`
export const FlexCol = styled.View<{gap?: number}>`
  display: flex;
  flex-direction: column;
  ${props => props.gap ? `gap: ${props.gap}px` : ''};
`
export const CenteredFlexRow = styled.View<{gap?: number}>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  ${props => props.gap ? `gap: ${props.gap}px` : ''};
`
export const CenteredFlexCol = styled.View<{gap?: number}>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${props => props.gap ? `gap: ${props.gap}px` : ''};
`
export const FlexScrollRow = styled.ScrollView`
  display: flex;
  flex-direction: row;
`
export const FlexScrollCol = styled.ScrollView`
  display: flex;
  flex-direction: column;
`
export const Title = styled.Text<{color?: string }>`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.color || '#000'};
`
export const ScalableText = styled.Text<{color?: string, fontsize?: number, bold?: boolean}>`
  font-size: ${props => props.fontsize ? `${props.fontsize}px` : '16px'};
  color: ${props => props.color || '#000'};
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
`

export const MediumText = styled.Text<{color?: string }>`
  font-size: 18px;
  color: ${(props) => props.color || '#000'};
`

export const SmallText = styled.Text<{color?: string }>`
  font-size: 16px;
  color: ${(props) => props.color || '#000'};
`

export function NativeButton(props: PressableProps & { rippleColor?: ColorValue, rippleRadius?: number }): React.JSX.Element {
  return (
    <Pressable android_ripple={{ color: props.rippleColor || 'gray', radius: props.rippleRadius && isFinite(props.rippleRadius) ? props.rippleRadius : undefined}} {...props}>
        { props.children as React.ReactNode }
    </Pressable>
  )
}