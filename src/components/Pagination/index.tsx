import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

export const Pagination: React.FC = () => {
  const dispatch = useDispatch();



  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={(event: any) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={8}
      pageCount={3}
    />
  );
};
