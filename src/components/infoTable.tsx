import React, { useState } from 'react';
import classNames from "classnames";
import { copyTextToClipboard } from '../utils/copyTextToClipboard';
import { Toast } from "./toast";

const InfoTable = ({ table } : { table : string[][] }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("");

    const parseText = (text: string): any => {
        if(/^rgba?\(/.test(text) || text === "transparent")
        {
            return <div className="w-6 h-6 border rounded" style={{backgroundColor: text}}></div>
        }

        if(text === "current color")
        {
            return <div className="w-6 h-6 border rounded"></div>
        }

        return text.split('\n').map((subtext,index) => <p key={index}>{subtext}</p>);
    };

    function handleClick(td: string) {
        setToastText(td)
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
        }, 5000)
    }

    return (
        <>
            {showToast && <Toast text={toastText} /> }
            <table className="w-full mb-4 bg-gray-100 rounded dark:bg-neutral-800">
                <tbody>
                {
                    table.map((tr: string[], index: Number) => {
                        return (
                            <tr
                                key={'tr-' + index}
                                className={"border-b border-gray-300 dark:border-gray-700"}>
                                {
                                    tr.map((td: string, index: Number) => {
                                        const tdIndex =  (i: number) => tr.length === 4 ? i + 1 : i;
                                        return (
                                            <td
                                                onClick={async () => {
                                                    await copyTextToClipboard(td).then(() => {
                                                            handleClick(td)
                                                        }
                                                    );
                                                }}
                                                key={'td-' + index}
                                                className={classNames('cursor-copy font-mono text-xs hover:underline p-2', {
                                                    'text-purple-700 dark:text-purple-300 whitespace-nowrap': index === tdIndex(0),
                                                    'text-blue-700 dark:text-blue-300': index ===  tdIndex(1),
                                                    'text-gray-500 dark:text-gray-300 text-xs': index ===  tdIndex(2),
                                                })}>{parseText(td)}</td>
                                        );
                                    })
                                }
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </>
    );
}

export default InfoTable;
