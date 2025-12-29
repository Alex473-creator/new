import './globals.css'

export const metadata = {
  title: '🎖️ Генератор документов',
  description: 'Учебный взвод ДПС г. Горки | МВД России',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
