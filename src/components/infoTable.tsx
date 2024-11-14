import React, { useContext, useState } from 'react';
import classNames from "classnames";
import { copyTextToClipboard } from '../utils/copyTextToClipboard';
import { Toast } from "./toast";
import { LayersContext } from '../utils/layers.context';

const InfoTable = ({ table } : { table : string[][] }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("");
    const [hoveredRow, setHoveredRow] = useState<number>(-1);
    const layers = useContext(LayersContext);

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

    function trWithLayerName(tr: string[], rowIndex: number) {
        const possibleLayerName = tr[1].replace(/dmo-.+?-/, '');
        const layer = Object.keys(layers).find(layerName => layers[layerName].includes(possibleLayerName));
        if (layer) {
            return (
                <tr key={'hovered-' + rowIndex}
                    onMouseOver={() => setHoveredRow(rowIndex)}
                    className={"border-b border-gray-300 dark:border-gray-700"}>
                    <td colSpan={100} className={"pb-1 pl-2 font-mono text-xs"}>{layer}</td>
                </tr>);
        }
        return null;
    }

    return (
        <>
            {showToast && <Toast text={toastText} /> }
            <table className="w-full mb-4 bg-gray-100 rounded dark:bg-neutral-800"
                   onMouseOut={() => setHoveredRow(-1)}
            >
                <tbody>
                {
                    table.map((tr: string[], rowIndex: number) => {
                        const isHovered = hoveredRow === rowIndex;
                        return (
                            <>
                                <tr
                                    key={'tr-' + rowIndex}
                                    onMouseOver={() => setHoveredRow(rowIndex)}
                                    className={classNames('border-gray-300 dark:border-gray-700', {
                                        'border-b': !isHovered,
                                    })}>
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
                                                    rowSpan={rowIndex === hoveredRow && index === 0 ? 2 : 1}
                                                    className={classNames('cursor-copy font-mono text-xs hover:underline px-2 pt-2', {
                                                        'text-purple-700 dark:text-purple-300 whitespace-nowrap': index === tdIndex(0),
                                                        'text-blue-700 dark:text-blue-300': index ===  tdIndex(1),
                                                        'text-gray-500 dark:text-gray-300 text-xs': index ===  tdIndex(2),
                                                        'pb-2': !isHovered,
                                                    })}>{parseText(td)}</td>
                                            );
                                        })
                                    }
                                </tr>
                                {isHovered ? trWithLayerName(tr, rowIndex) : null}
                            </>
                        );
                    })
                }
                </tbody>
            </table>
        </>
    );
}

export default InfoTable;
