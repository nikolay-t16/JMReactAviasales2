import React from 'react';
import styles from './indexPage.module.scss';
import Filter from '../../layouts/Filter/Filter';
import { sortByPrise, sortByFast } from '../../../helpers/vars/sort-vars';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { ticketsSorted } from '../../../store/ticketsSlice';
import { ticketsSelector } from '../../../store/selectors';
import TicketList from '../../layouts/TicketList/TicketList';
import RadioButton from '../../blocks/inputs/RadioButton/RadioButton';

const IndexPage = () => {
  const dispatch = useAppDispatch();
  const { sortParameter } = useAppSelector(ticketsSelector);
  const sortItems = [
    { value: sortByPrise, label: 'Самый дешевый' },
    { value: sortByFast, label: 'Самый быстрый' },
  ];
  return (
    <div className={styles.root}>
      <div className={styles.filter}>
        <Filter />
      </div>
      <div className={styles.main}>
        <div className={styles.sort}>
          {sortItems.map(({ value, label }) => (
            <RadioButton
              key={value}
              name="sortedBy"
              isChecked={value === sortParameter}
              onChange={(e) => dispatch(ticketsSorted(e.target.value))}
              value={value}
              label={label}
            />
          ))}
        </div>
        <div className={styles.tickets}>
          <TicketList />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
