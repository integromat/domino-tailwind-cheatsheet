import React, { useContext, useState } from 'react';
import classNames from "classnames";
import { copyTextToClipboard } from '../utils/copyTextToClipboard';
import { Toast } from "./toast";
import { LayersContext } from '../utils/layers.context';

const InfoTable = ({ table } : { table : string[][] }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("");
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

    function semanticLayerName(td: string) {
        const possibleLayerName = td.replace(/dmo-.+?-/, '');
        const layer = Object.keys(layers).find(layerName => layers[layerName].includes(possibleLayerName));
        if (!layer) {
            return null;
        }
        const parts = layer.split('/')
        const highlightedName = parts
            .map((name, index) => index === parts.length - 1
                ? <span className={'font-bold text-gray-400 dark:text-gray-500'}>{name}</span>
                : (<>
                    <span className={'font-bold text-gray-500 dark:text-gray-400'}>{name.substr(0, 2)}</span>
                    <span>{name.substr(2)}</span>/
                </>));

        return (<span className={"font-mono text-[8px] text-gray-400 dark:text-gray-500"}>{highlightedName}</span>);
    }

    return (
        <>
            {showToast && <Toast text={toastText} /> }
            <table className="w-full mb-4 bg-gray-100 rounded dark:bg-neutral-800"
            >
                <tbody>
                {
                    table.map((tr: string[], rowIndex: number) => {
                        // Only rows with 4 table columns allow hover state, because only those represent a color and
                        // have a semantic layer.
                        const showSemanticLayer = tr.length === 4;
                        return (
                            <>
                                <tr
                                    key={'tr-' + rowIndex}
                                    className={classNames('border-gray-300 dark:border-gray-700', {
                                        'border-b': !showSemanticLayer,
                                    })}
                                >
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
                                                    })}>
                                                    {parseText(td)}
                                                    {(index === 1) && semanticLayerName(td)}
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
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
