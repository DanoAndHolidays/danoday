import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
    title: 'danoday',
    description: '前端开发工程师个人网站',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh-CN">
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    );
}