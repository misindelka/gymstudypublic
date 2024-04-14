export interface Filter {
  [x: string]: any
  code: string
  display_mode: string
  global_name: string
  name: string
  options: FilterOptions[]
  type: string
}

export interface FilterOptions {
  count: number
  name: string
  slug: string
  value: string
}

export interface SelectedFilters {
  [key: string]: string[]
}
