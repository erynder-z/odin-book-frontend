import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type PostTextSectionProps = {
    text: string | undefined;
};

export default function PostTextSection({ text }: PostTextSectionProps) {
    return (
        <div className="text-justify">
            {text && (
                <ReactMarkdown className="prose break-words p-4">
                    {text}
                </ReactMarkdown>
            )}
        </div>
    );
}
