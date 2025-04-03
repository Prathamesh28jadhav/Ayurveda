import React from "react";

export function Card({ children, className }) {
    return <div className={`border rounded-lg shadow-md p-4 ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
    return <div className="border-b pb-2 mb-2 font-semibold">{children}</div>;
}

export function CardTitle({ children }) {
    return <h2 className="text-xl font-bold">{children}</h2>;
}

export function CardContent({ children }) {
    return <div className="mt-2">{children}</div>;
}
