export interface heatmapCount { 
  startDate: string, 
  finalDate: string, 
  values: (dateValues | undefined)[] 
}

export interface dateValues {
  date: string, 
  count: number
}