import { Filter } from '../models/filter'

export const sortFiltersByType = (filters: Filter[]) =>
  [...filters]?.sort((a, b) =>
    a.type !== b.type ? a.type.localeCompare(b.type) : a.order - b.order
  )
