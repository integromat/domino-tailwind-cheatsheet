import React from "react";

export const Toast = ({ text }: { text: string }) => {

    return (
        <div
            className="fixed z-10 p-4 m-4 font-medium text-white bg-purple-700 rounded-lg shadow-lg top-20 right-6"
            role="alert"
        >
            <p className="text-sm">"{text}" copied into your clipboard </p>
        </div>
    );
};
