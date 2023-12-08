export interface Theme {
  mainColor?: string // multiple poll only
  leftColor?: string // binary poll only
  rightColor?: string // binary poll only
  textColor?: string
  textAnswerColor?: string
  backgroundColor?: string
  // alignment?: 'start' | 'center' | 'end'
  alignment?: string
}