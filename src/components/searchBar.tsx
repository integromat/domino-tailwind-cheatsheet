import React, { useRef, useEffect } from 'react';
import { dispatch } from 'use-bus';

let searchTimeout: number | null = null
function clearSearch() {
    if (searchTimeout !== null) {
        clearTimeout(searchTimeout)
    }
}

const SearchBar = ({ searchFilter }: { searchFilter : ( text:string ) => void }) => {
    const tailwindVersion = "3.0.24";
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleFocus = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
            //preventDefault if ctrl + k is already binded to any browser function
            e.preventDefault();
            searchInputRef?.current?.focus();
        }

        if (e.key === "Escape") {
            searchInputRef?.current?.blur();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleFocus);
        return () => {
            document.removeEventListener("keydown", handleFocus);
        };
    }, []);

    // The search is currently very expensive, as it redraws many elements on
    // the screen. This little wrapper adds an artificial delay so that the
    // app doesn't block user input.
    const search = (event: any) => {
        const text: string = event.target.value.toLowerCase();
        if (text.length < 5) {
            clearSearch()
            searchTimeout = window.setTimeout(() => searchFilter(text), 300)
        } else {
            clearSearch()
            searchFilter(text)
        }
    }

    const clearInput = () => {
        const inputElement = searchInputRef?.current
        if (inputElement) {
            inputElement.value = ''
            clearSearch()
            searchFilter('')
        }
    }

    let shouldRenderClearBtn = false
    const length = searchInputRef?.current?.value?.length
    if (length !== undefined && length > 0) {
        shouldRenderClearBtn = true
    }

    return (
        <div className="border-b bg-neutral-50 dark:bg-neutral-900 dark:border-gray-700 lg:fixed lg:w-full lg:top-0 lg:z-50 lg:left-0">
            <div className="container p-4 mx-auto">
                <div className="flex flex-col lg:items-center lg:justify-center lg:flex-row lg:space-x-4">


                    <div className="relative h-10 mt-4 sm:w-96 xl:w-80 2xl:w-96 sm:mx-auto lg:m-0">
                        <input
                            ref={searchInputRef}
                            className="w-full h-full text-gray-700 border border-gray-200 rounded-lg peer dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:placeholder-gray-400 focus:ring-opacity-20"
                            type="text"
                            placeholder="Search"
                            onChange={search}
                            autoFocus
                        />
                        {shouldRenderClearBtn ? (
                            <button onClick={clearInput} className="absolute text-gray-500 -translate-y-1/2 right-2 focus:outline-none top-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        ) : (
                            <span className="absolute px-2 py-1 text-xs text-gray-400 transition-opacity duration-75 -translate-y-1/2 border rounded-lg pointer-events-none py- dark:border-gray-700 right-2 top-1/2 peer-focus:opacity-0 dark:text-gray-400 ">
                                Ctrl k
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col mt-4 space-y-3 lg:mt-0 sm:flex-row sm:space-y-0 sm:space-x-3 sm:items-center sm:justify-center">
                        <button onClick={() => dispatch('ui/expand')} className="px-4 py-2 space-x-3 text-sm text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">Expand <span className="lg:hidden xl:inline">All</span></button>
                        <button onClick={() => dispatch('ui/collapse')} className="px-4 py-2 space-x-3 text-sm text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">Collapse <span className="lg:hidden xl:inline">All</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
