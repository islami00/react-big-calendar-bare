import type { DateLocalizer } from './localizer.types'

export interface HeaderProps {
  date: Date
  label?: React.ReactNode
  localizer: DateLocalizer
}
