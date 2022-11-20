import React, { useEffect, useRef } from "react";

import Ticket from "../../blocks/Ticket/Ticket";
import TypeTicket from "../../../types-data/type-ticket";
import LoadingIndicator from "../../blocks/LoadingIndicator/LoadingIndicator";
import {
  sortTicketsFast,
  sortTicketsPrice,
} from "../../../helpers/sortTickets";
import styles from "./ticketList.module.scss";
import { sortByPrise } from "../../../helpers/vars/sort-vars";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  ticketsSelector,
  userSearchIdSelector,
} from "../../../store/selectors";
import {
  getTicketFromApi,
  addVisibleTickets,
} from "../../../store/ticketsSlice";
import classNames from "classnames";

const TicketList = () => {
  const ticketListRef = useRef<HTMLUListElement>(null);
  const dispatch = useAppDispatch();
  const { searchId, errorMassage } = useAppSelector(userSearchIdSelector);
  const {
    StopLoadingTickets,
    serverErrorCounter,
    tickets,
    amountTickets,
    filterTransplants,
    sortParameter,
  } = useAppSelector(ticketsSelector);

  useEffect(() => {
    (
      ticketListRef.current?.children[
        ticketListRef.current?.children.length - 5
      ] as HTMLLIElement
    )?.focus();
  }, [amountTickets]);

  useEffect(() => {
    if (searchId && !StopLoadingTickets && serverErrorCounter < 10) {
      dispatch(getTicketFromApi(searchId));
    }
  }, [
    searchId,
    tickets.length,
    serverErrorCounter,
    StopLoadingTickets,
    dispatch,
  ]);

  const filterStops = (ticket: TypeTicket) => {
    if (ticket.segments[0].stops.length > 3)
      return filterTransplants.allFilterTransplants;
    return Object.values(filterTransplants)[ticket.segments[0].stops.length];
  };
  const makeTicketKey = ({ price, carrier, segments }: TypeTicket) =>
    price +
    segments[0].duration +
    segments[0].date +
    carrier +
    segments[1].duration +
    segments[1].date;

  const sortedTickets =
    sortParameter === sortByPrise
      ? sortTicketsPrice([...tickets])
      : sortTicketsFast([...tickets]);
  const visibleTickets = sortedTickets
    .filter(filterStops)
    .slice(0, amountTickets);

  if (errorMassage) return <div className={styles.massage}>{errorMassage}</div>;

  if (!visibleTickets.length) {
    return (
      <div className={styles.massage}>
        Рейсов, подходящих под заданные фильтры, не найдено
      </div>
    );
  }

  return (
    <section className={styles.root}>
      <div
        className={classNames({ [styles.indicatorHidden]: StopLoadingTickets })}
      >
        <LoadingIndicator />
      </div>
      <ul ref={ticketListRef} className={styles.list}>
        {visibleTickets.map((ticket) => (
          <li className={styles.item} key={makeTicketKey(ticket)} tabIndex={0}>
            <Ticket ticket={ticket} />
          </li>
        ))}
      </ul>
      <button
        className={styles.showMore}
        onClick={() => {
          dispatch(addVisibleTickets(5));
        }}
      >
        Показать еще 5 билетов
      </button>
    </section>
  );
};

export default TicketList;
