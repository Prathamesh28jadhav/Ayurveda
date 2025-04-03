import React from "react";

export function Select({ children, className, ...props }) {
    return (
        <select className={`border p-2 rounded ${className}`} {...props}>
            {children}
        </select>
    );
}

export function SelectTrigger({ children }) {
    return <div className="p-2 border rounded">{children}</div>;
}

export function SelectContent({ children }) {
    return <div className="border mt-1 rounded bg-white shadow">{children}</div>;
}

export function SelectItem({ value, children }) {
    return <option value={value}>{children}</option>;
}

export function SelectValue({ children }) {
    return <span>{children}</span>;
}
