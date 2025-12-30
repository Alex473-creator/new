import './globals.css'

export const metadata = {
  title: 'Генератор документов',
  description: 'Генератор служебных документов с защитой',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  )
}
