import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId } from '../redux/slices/filterSlice';

type CategoriesProps = {
    value: number
}

const Categories: React.FC<CategoriesProps> = React.memo(( { value } ) => {
    const categories: string[] = ['Всі', "М'ясні", 'Вегітеріанська', 'Гриль', 'Гострі', 'Закриті'];

    const dispatch = useDispatch();

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => (
                    <li
                        key={i}
                        onClick={() => dispatch(setCategoryId(i))}
                        className={value === i ? 'active' : ''}>
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default Categories;
