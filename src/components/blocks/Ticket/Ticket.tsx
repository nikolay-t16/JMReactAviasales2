import React from 'react';

import TypeTicket from '../../../types-data/type-ticket';

import styles from './ticket.module.scss';
import TicketSegment from './TicketSegment/TicketSegment';

interface Props {
  ticket: TypeTicket;
}

const Ticket: React.FC<Props> = ({ ticket: { price, carrier, segments } }) => {
  const ticketBody =
    segments.length === 1 ? (
      <div className={styles.body}>
        <TicketSegment segmentInfo={segments[0]} />{' '}
      </div>
    ) : (
      <div className={styles.body}>
        <TicketSegment segmentInfo={segments[0]} />
        <TicketSegment segmentInfo={segments[1]} />
      </div>
    );
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.price}>{` ${Math.floor(price / 1000)} ${('000' + (price % 1000)).slice(-3)}`}</span>
        <img src={`//pics.avs.io/99/36/${carrier}.png`} alt={carrier} />
      </div>
      {ticketBody}
    </div>
  );
};

export default Ticket;
