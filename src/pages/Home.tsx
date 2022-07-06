import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFilter, setFilters} from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import SortPopup, { sortTypes } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Placeholder from '../components/PizzaBlock/Placeholder';
import { Pagination } from '../components/Pagination';
import {fetchPizzas, SearchPizzaParams, selectPizzaData} from '../redux/slices/pizzasSlice';
import {useAppDispatch} from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const categoriesName: string[] = ['Всі', "М'ясні", 'Вегітеріанська', 'Гриль', 'Гострі', 'Закриті'];

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = `&sortBy=${sort.sortProperty.replace('-', '')}`;
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
        fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage: String(currentPage),
      }),
    );
  };

  // Add query params on second render (if we change them)

  React.useEffect(() => {
    if (isMounted.current) {

      const params = {
        sortProperty: sort.sortProperty,
        categoryId: categoryId > 0 ? categoryId : null,
        currentPage,
      };

      const queryString = qs.stringify(params, { skipNulls: true });

      navigate(`?${queryString}`);
    }

    if(!window.location.search) {
      dispatch(fetchPizzas({} as SearchPizzaParams))
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Push to store query params if we have

  React.useEffect(() => {
    if (window.location.search) {
      const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
      const sort = sortTypes.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(setFilters({
        searchValue: params.search,
        categoryId: Number(params.category),
        currentPage: Number(params.currentPage),
        sort: sort || sortTypes[0]
      }));
      isMounted.current = true;

    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

  }, [ categoryId, sort.sortProperty, searchValue, currentPage]);

  const template = [...new Array(4)].map((_, idx) => <Placeholder key={idx} />);
  const pizzas = items.map((pizza: any, idx: number) => (
        <PizzaBlock key={idx} {...pizza} />
      )
  );
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} />
          <SortPopup value={sort} />
        </div>
        <h2 className="content__title">{categoriesName[categoryId]}</h2>
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>Помилка</h2>
            <p>На жаль, не вдалось отримати піци. Спробуйте пізніше</p>
          </div>
        ) : (
          <>
            {status === 'loading' ? (
              <div className='content__items'>
                { template }
              </div>
            ) : pizzas.length === 0 ? (
              <div className="content__error-info">
                <h2>Помилка</h2>
                <p>На жаль, не вдалось знайти піцу. Спробуйте ввести іншу назву</p>
              </div>
            ) : (
              <div className="content__items">
                {
                  pizzas
                }
              </div>
            )}
          </>
        )}
        <Pagination />
      </div>
    </>
  );
};

export default Home;
