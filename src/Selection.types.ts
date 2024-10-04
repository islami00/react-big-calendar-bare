export type SelectActions = 'click' | 'doubleclick' | 'select'
export interface SelectBoundsRectObject {
  top: number
  left: number
  x: number
  y: number
  right: number
  bottom: number
}

export interface SelectClickPoint {
  x: number
  y: number
  clientX: number
  clientY: number
}

// Can this ever be null?
export type SelectRect = SelectBoundsRectObject | null | undefined
