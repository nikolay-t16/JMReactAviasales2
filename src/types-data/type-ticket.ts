import TypeTicketSegment from "./type-ticket-segment";

type TypeTicket = {
  price: number;
  carrier: string;
  segments: Array<TypeTicketSegment>;
}

export default TypeTicket;


