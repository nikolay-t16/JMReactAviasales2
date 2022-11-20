import React, { useMemo } from 'react';
import { chooseFilterTransplants, chooseAllFilterTransplants } from '../../../store/ticketsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { ticketsSelector } from '../../../store/selectors';
import styles from './filter.module.scss';
import Checkbox from '../../blocks/inputs/Checkbox/Checkbox';

const Filter = () => {
  const dispatch = useAppDispatch();
  const { noTransplants, oneTransplant, twoTransplants, threeTransplants, allFilterTransplants } =
    useAppSelector(ticketsSelector).filterTransplants;
  const filterItems = useMemo(
    () => [
      {
        label: 'Все',
        onChange: () => dispatch(chooseAllFilterTransplants()),
        isChecked: allFilterTransplants,
      },
      {
        label: 'Без пересадок',
        onChange: () => dispatch(chooseFilterTransplants('noTransplants')),
        isChecked: noTransplants,
      },
      {
        label: '1 пересадка',
        onChange: () => dispatch(chooseFilterTransplants('oneTransplant')),
        isChecked: oneTransplant,
      },
      {
        label: '2 пересадка',
        onChange: () => dispatch(chooseFilterTransplants('twoTransplants')),
        isChecked: twoTransplants,
      },
      {
        label: '3 пересадка',
        onChange: () => dispatch(chooseFilterTransplants('threeTransplants')),
        isChecked: threeTransplants,
      },
    ],
    [allFilterTransplants, dispatch, noTransplants, oneTransplant, threeTransplants, twoTransplants],
  );

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Количество пересадок</h2>
      <ul className={styles.list}>
        {filterItems.map(({ label, isChecked, onChange }) => (
          <li key={label} className={styles.listItem}>
            <Checkbox label={label} onChange={onChange} checked={isChecked} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
