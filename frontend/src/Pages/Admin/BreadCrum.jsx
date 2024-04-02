import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrum = ({ items }) => {
    return (
        <nav className="flex mt-3 pl-3" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <Link
                        to={"/admin"}
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                        Dashboard
                    </Link>
                </li>
                {
                    items.map(
                        (d, i) => {
                            return (
                                <li key={i}>
                                    <div className="flex items-center">
                                        <svg
                                            className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                        <Link
                                            to={d.url}
                                            className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                        >
                                            {d.name}
                                        </Link>
                                    </div>
                                </li>
                            )
                        }
                    )
                }
            </ol>
        </nav>
    );
}

export default BreadCrum;
