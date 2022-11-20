import TypeTicket from "../types-data/type-ticket";

export const sortTicketsFast = (Tickets: Array<TypeTicket>) => {
  return Tickets.sort(function (a, b) {
    return a.segments[0].duration - b.segments[0].duration;
  });
};

export const sortTicketsPrice = (Tickets: Array<TypeTicket>) => {
  return Tickets.sort(function (a, b) {
    return a.price - b.price;
  });
};