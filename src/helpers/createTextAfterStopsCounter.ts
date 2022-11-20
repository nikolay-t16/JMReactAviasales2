export const createTextAfterStopsCounter = (routes: Array<string>) => {
  if(routes.length === 0) return "ПЕРЕСАДОК"
  if(routes.length % 10 === 1) return "ПЕРЕСАДКА"
  if(routes.length % 10 < 5) return "ПЕРЕСАДКИ"
  return "ПЕРЕСАДОК"
}