import React from 'react';
import Masonry from 'react-masonry-css';
import Category from '../modules/models/category';
import CategoryComponent from './category';

const Categories = ({ cheatsheet } : { cheatsheet: Category[] }) => {
    const el = document.querySelector('tw-cheatsheet');
    const sortAttr = el?.getAttribute('data-sort');
    if (sortAttr) {
        const order = sortAttr.toLowerCase().split(',').reverse().map(text => text.trim());
        if (order.length > 1) {
            cheatsheet = [...cheatsheet].sort((a, b) => {
                const A = order.findIndex(val => a.title.toLowerCase().trim().startsWith(val.toString().toLowerCase()));
                const B = order.findIndex(val => b.title.toLowerCase().trim().startsWith(val.toString().toLowerCase()));
                if (A > B) {
                    return 1
                }
                return -1
            }).reverse()
        }
    }
    return (
        <Masonry
            breakpointCols={{
                default: 3,
                1600: 2,
                1024: 1,
            }}
            className="flex flex-wrap w-full p-4 mx-auto mt-4 "
            columnClassName="w-auto">
            {
                cheatsheet.map((category: Category) => <CategoryComponent key={category.title} category={category} />)
            }
        </Masonry>
    );
}

export default Categories;
