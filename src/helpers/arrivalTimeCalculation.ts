import TypeTicketSegment from "../types-data/type-ticket-segment";

export const arrivalTimeCalculation = (segmentInfo: TypeTicketSegment) => {
  const { origin, date, duration } = segmentInfo;
  const departureDate = new Date(date);
  const timeZoneDifference = origin === 'MOW' ? 240 : -240;
  const arrivalTimeMinutes = departureDate.getHours() * 60 + departureDate.getMinutes() + timeZoneDifference + duration;
  const arrivalTime = arrivalTimeMinutes > 1439 ? arrivalTimeMinutes - 1440 : arrivalTimeMinutes;
  return `${Math.floor(arrivalTime / 60)}:${arrivalTime % 60}`;
}