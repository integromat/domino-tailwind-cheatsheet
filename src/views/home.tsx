import React, { useState, useEffect } from 'react';

import Category from '../modules/models/category';
import Subcategory from '../modules/models/subcategory';

import SearchBar from '../components/searchBar';
import Categories from '../components/categories';
import Footer from '../components/footer';
import Tagline from '../components/tagline';

interface CheatSheetData { layers: any, data: Category[] }

let json: CheatSheetData = { layers: null, data: [] };

const Home =  () => {
    const [cheatsheet, setCheatsheet] = useState<CheatSheetData['data']>(
        json.data
    );

    useEffect(() => {
        const el = document.querySelector('tw-cheatsheet');
        const source = el?.getAttribute('data-source');
        if (!source) {
            throw new Error('[data-source] is missing on "tw-cheatsheet" element');
        }
        fetch(source)
            .then((res) => res.json())
            .then((data) => {
                json = JSON.parse(JSON.stringify(data));
                setCheatsheet(json.data);
            });
    }, []);

    const search = (text: string) => {
        let newCheatsheet: Category[] = json.data.map((category: Category) => {
            if (category.title.toLowerCase().includes(text)) {
                return category;
            } else {
                const layer = json.layers[text.trim().toLowerCase()];
                if (layer) {
                    text = layer;
                }
                return {
                    title: category.title,
                    content: category.content.map((subcategory: Subcategory) => {
                        // Si el texto de búsqueda existe en el título o la descripción se muestra toda la tabla, si no pues se filtra en ella
                        // If the search text exists in the title or description, the entire table is displayed, if not, then it is filtered on it
                        if (
                            subcategory.title.toLowerCase().includes(text) ||
                            subcategory.description.toLowerCase().includes(text)
                        ) {
                            return subcategory;
                        } else {
                            return {
                                title: subcategory.title,
                                docs: subcategory.docs,
                                description: subcategory.description,
                                table: subcategory.table.filter((tr) => {
                                    //no forEach needed as we need only one match to show entire row
                                    for (let td = 0; td < tr.length; td++) {
                                        if (tr[td].includes(text)) {
                                            return true;
                                        }
                                    }
                                    return false;
                                }),
                            };
                        }
                    })
                }
            };
        });
        setCheatsheet(newCheatsheet);
    };

    return (
        <main className={"tracking-wide font-roboto min-h-screen grid content-start"}>
            <SearchBar searchFilter={search} />
            <Tagline />
            <Categories cheatsheet={cheatsheet} />
            <Footer />
        </main>
    );
}

export default Home;
