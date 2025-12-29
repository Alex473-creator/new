export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Заголовок */}
        <header className="text-center py-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            🎖️ Генератор документов
          </h1>
          <p className="text-lg md:text-xl text-blue-200">
            Учебный взвод ДПС г. Горки | МВД России
          </p>
        </header>

        {/* Основной контент */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">📄 Добро пожаловать!</h2>
          
          <p className="mb-6 text-lg">
            Профессиональный инструмент для создания официальных документов. 
            Работает на любых устройствах.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-800/30 p-4 rounded-xl">
              <h3 className="font-bold mb-2">✨ Возможности:</h3>
              <ul className="space-y-1">
                <li>• Создание документов</li>
                <li>• Экспорт в PNG/JPG</li>
                <li>• Официальные шаблоны</li>
                <li>• Адаптивный дизайн</li>
              </ul>
            </div>
            
            <div className="bg-blue-800/30 p-4 rounded-xl">
              <h3 className="font-bold mb-2">⚡ Как начать:</h3>
              <ol className="space-y-1">
                <li>1. Выберите тип документа</li>
                <li>2. Заполните текст</li>
                <li>3. Скачайте результат</li>
              </ol>
            </div>
          </div>
          
          {/* Кнопки действий */}
          <div className="space-y-4">
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-colors">
              Создать новый документ
            </button>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors">
              Использовать шаблон
            </button>
          </div>
        </div>

        {/* Футер */}
        <footer className="text-center py-8 border-t border-white/20">
          <p className="mb-2">© 2024 Учебный взвод ДПС г. Горки</p>
          <p className="text-sm text-blue-300">Для служебного пользования</p>
        </footer>
      </div>
    </div>
  )
}
