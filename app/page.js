'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('templates')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [documentTitle, setDocumentTitle] = useState('')
  const [documentContent, setDocumentContent] = useState('')
  const [documentType, setDocumentType] = useState('конкурс')

  // Шаблоны документов
  const templates = [
    {
      id: 1,
      name: "🏆 Конкурс «Лучший сотрудник»",
      type: "конкурс",
      title: "Конкурс «Лучший сотрудник ДПС Учебного Взвода г. Горки»",
      content: `В целях повышения эффективности служебной деятельности, мотивации личного состава и поощрения лучших сотрудников руководством учебного взвода принято решение о проведении ежегодного конкурса профессионального мастерства.

**КРИТЕРИИ ОЦЕНКИ УЧАСТНИКОВ:**
1. Профессиональное мастерство и знание служебных инструкций
2. Исполнительность и служебная дисциплина
3. Результаты оперативно-служебной деятельности
4. Инициативность и лидерские качества

**СРОКИ ПРОВЕДЕНИЯ:**
• Начало: 30 декабря 2024 года в 08:00 (МСК)
• Окончание: 31 декабря 2024 года в 19:00 (МСК)

**НАГРАДА ПОБЕДИТЕЛЮ:**
Денежное вознаграждение в размере 1 000 000 (один миллион) рублей.

Конкурс проводится в соответствии с планом служебно-боевой подготовки на 2024 год.`
    },
    {
      id: 2,
      name: "⚡ Приказ о назначении",
      type: "приказ",
      title: "Приказ об организации служебной подготовки",
      content: `Во исполнение плана служебно-боевой подготовки на 2024 год, **ПРИКАЗЫВАЮ:**

1. Утвердить план служебной подготовки личного состава на I квартал 2024 года.
2. Назначить ответственным за организацию служебной подготовки.
3. Провести внеплановую проверку знаний служебных инструкций до 25 декабря 2024 года.
4. Обеспечить 100% явку личного состава на занятия по служебной подготовке.
5. Контроль за исполнением настоящего приказа возложить на ответственного.

**Настоящий приказ довести до всего личного состава учебного взвода.**`
    },
    {
      id: 3,
      name: "📢 Объявление о собрании",
      type: "объявление",
      title: "Объявление о проведении общего собрания",
      content: `Доводим до сведения личного состава учебного взвода следующую информацию:

**29 декабря 2024 года в 15:00** в актовом зале состоится общее собрание личного состава.

**ПОВЕСТКА ДНЯ:**
1. Подведение итогов работы за 2024 год.
2. Обсуждение планов на 2025 год.
3. Организационные вопросы.
4. Разное.

**ЯВКА ВСЕХ СОТРУДНИКОВ ОБЯЗАТЕЛЬНА.**

С собой иметь служебное удостоверение.`
    },
    {
      id: 4,
      name: "🎖️ Благодарственное письмо",
      type: "благодарность",
      title: "Благодарственное письмо за образцовую службу",
      content: `Выражаем искреннюю благодарность за добросовестное исполнение служебных обязанностей, высокий профессионализм и личный вклад в обеспечение правопорядка.

**Работа отмечена по следующим критериям:**
• Отличные результаты в служебной деятельности
• Ответственное отношение к выполнению задач
• Проявление инициативы и творческого подхода
• Наставничество и помощь коллегам

Желаем дальнейших успехов в службе, крепкого здоровья и благополучия!

**С уважением, руководство.**`
    }
  ]

  // Загрузка шаблона
  const loadTemplate = (template) => {
    setSelectedTemplate(template)
    setDocumentTitle(template.title)
    setDocumentContent(template.content)
    setDocumentType(template.type)
    setActiveTab('editor')
  }

  // Создание нового документа
  const createNewDocument = () => {
    setSelectedTemplate(null)
    setDocumentTitle('')
    setDocumentContent('')
    setDocumentType('конкурс')
    setActiveTab('editor')
  }

  // Экспорт документа
  const exportDocument = () => {
    const today = new Date().toLocaleDateString('ru-RU')
    const docNumber = `${today.replace(/\D/g, '')}-УВ/Г`
    
    const docTypeText = {
      'конкурс': 'ОБЪЯВЛЕНИЕ О КОНКУРСЕ',
      'приказ': 'П Р И К А З',
      'объявление': 'ОФИЦИАЛЬНОЕ ОБЪЯВЛЕНИЕ',
      'благодарность': 'БЛАГОДАРСТВЕННОЕ ПИСЬМО'
    }[documentType] || 'ДОКУМЕНТ'

    // Создаем HTML для документа
    const docHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${documentTitle}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400;700&display=swap');
          body {
            font-family: 'Times New Roman', serif;
            margin: 0;
            padding: 20mm;
            line-height: 1.6;
            background: white;
            color: black;
          }
          .document {
            max-width: 210mm;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header h1 {
            font-size: 16pt;
            font-weight: bold;
            color: #1e3a5f;
            margin-bottom: 10px;
          }
          .header h2 {
            font-size: 14pt;
            color: #333;
            margin-bottom: 5px;
          }
          .separator {
            border-top: 2px solid #b22222;
            margin: 20px 0;
          }
          .doc-type {
            text-align: center;
            font-size: 18pt;
            font-weight: bold;
            color: #b22222;
            margin: 30px 0;
          }
          .doc-info {
            text-align: right;
            margin: 20px 0;
            font-size: 12pt;
          }
          .doc-title {
            text-align: center;
            font-size: 16pt;
            font-weight: bold;
            font-style: italic;
            margin: 40px 0;
            color: #1a1a2e;
          }
          .doc-content {
            font-size: 14pt;
            margin: 30px 0;
            white-space: pre-line;
          }
          .stamp {
            margin-top: 100px;
            text-align: center;
            color: #666;
            font-size: 10pt;
            border-top: 1px solid #ccc;
            padding-top: 20px;
          }
          strong { font-weight: bold; }
          em { font-style: italic; }
          u { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="document">
          <div class="header">
            <h1>МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ РОССИЙСКОЙ ФЕДЕРАЦИИ</h1>
            <h2>УЧЕБНЫЙ ВЗВОД ДОРОЖНО-ПАТРУЛЬНОЙ СЛУЖБЫ</h2>
            <div>г. Горки</div>
          </div>
          
          <div class="separator"></div>
          
          <div class="doc-type">${docTypeText}</div>
          
          <div class="doc-info">
            <div>№ ${docNumber}</div>
            <div>от ${today} г.</div>
            <br>
            <div>г. Горки</div>
            <div>${today} г.</div>
          </div>
          
          <div class="doc-title">«${documentTitle}»</div>
          
          <div class="doc-content">${documentContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/__(.*?)__/g, '<u>$1</u>')}</div>
          
          <div class="stamp">
            <div>Документ составлен: ${today}</div>
            <div><strong>ДЛЯ СЛУЖЕБНОГО ПОЛЬЗОВАНИЯ</strong></div>
          </div>
        </div>
      </body>
      </html>
    `

    // Открываем документ в новом окне для печати
    const printWindow = window.open('', '_blank')
    printWindow.document.write(docHTML)
    printWindow.document.close()
    
    alert('Документ готов! Нажмите Ctrl+P для печати или сохраните как PDF.')
  }

  // Сохранить документ
  const saveDocument = () => {
    if (!documentTitle.trim()) {
      alert('Введите название документа')
      return
    }
    if (!documentContent.trim()) {
      alert('Введите содержание документа')
      return
    }
    
    const documentData = {
      title: documentTitle,
      content: documentContent,
      type: documentType,
      date: new Date().toISOString()
    }
    
    localStorage.setItem('last_document', JSON.stringify(documentData))
    alert('Документ сохранен в локальное хранилище!')
  }

  // Загрузить последний документ
  useEffect(() => {
    const saved = localStorage.getItem('last_document')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setDocumentTitle(data.title)
        setDocumentContent(data.content)
        setDocumentType(data.type)
      } catch (e) {
        console.error('Ошибка загрузки документа:', e)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white">
      {/* Навигация */}
      <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <span className="text-2xl">🎖️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Генератор документов</h1>
                <p className="text-sm text-blue-200">Учебный взвод ДПС г. Горки</p>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-2 md:mt-0">
              <button
                onClick={() => setActiveTab('templates')}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'templates' ? 'bg-yellow-500 text-black' : 'bg-white/20 hover:bg-white/30'}`}
              >
                📁 Шаблоны
              </button>
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'editor' ? 'bg-yellow-500 text-black' : 'bg-white/20 hover:bg-white/30'}`}
              >
                ✏️ Редактор
              </button>
              <button
                onClick={exportDocument}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                💾 Экспорт
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Вкладка шаблонов */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">📁 Выберите шаблон документа</h2>
              <p className="text-blue-200">Или создайте новый документ с нуля</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map(template => (
                <div key={template.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors border border-white/20">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <span className="text-2xl">{template.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                      <p className="text-blue-200 mb-4">{template.type.charAt(0).toUpperCase() + template.type.slice(1)}</p>
                      <button
                        onClick={() => loadTemplate(template)}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-colors"
                      >
                        Использовать этот шаблон
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-blue-200 mt-4 p-3 bg-black/20 rounded">
                    {template.content.substring(0, 150)}...
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={createNewDocument}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105"
              >
                🆕 Создать новый документ с нуля
              </button>
            </div>
          </div>
        )}

        {/* Вкладка редактора */}
        {activeTab === 'editor' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">✏️ Редактор документа</h2>
              <p className="text-blue-200">Заполните все поля и экспортируйте документ</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              {/* Тип документа */}
              <div className="mb-6">
                <label className="block text-lg font-bold mb-3">Тип документа:</label>
                <div className="flex flex-wrap gap-2">
                  {['конкурс', 'приказ', 'объявление', 'благодарность'].map(type => (
                    <button
                      key={type}
                      onClick={() => setDocumentType(type)}
                      className={`px-4 py-2 rounded-lg transition-colors ${documentType === type ? 'bg-yellow-500 text-black' : 'bg-white/20 hover:bg-white/30'}`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Название документа */}
              <div className="mb-6">
                <label className="block text-lg font-bold mb-3">Название документа:</label>
                <input
                  type="text"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  className="w-full p-4 bg-black/30 border border-white/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50"
                  placeholder="Введите название документа..."
                />
              </div>

              {/* Содержание документа */}
              <div className="mb-6">
                <label className="block text-lg font-bold mb-3">Содержание документа:</label>
                <textarea
                  value={documentContent}
                  onChange={(e) => setDocumentContent(e.target.value)}
                  className="w-full h-96 p-4 bg-black/30 border border-white/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 resize-none"
                  placeholder="Введите содержание документа..."
                />
                <div className="mt-2 text-sm text-blue-300">
                  Подсказка: используйте **жирный текст**, *курсив*, __подчеркивание__
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <button
                  onClick={saveDocument}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl transition-colors flex items-center justify-center space-x-2"
                >
                  <span>💾</span>
                  <span>Сохранить черновик</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('templates')}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl transition-colors flex items-center justify-center space-x-2"
                >
                  <span>📁</span>
                  <span>Выбрать другой шаблон</span>
                </button>
                
                <button
                  onClick={exportDocument}
                  className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl transition-colors flex items-center justify-center space-x-2"
                >
                  <span>🖨️</span>
                  <span>Экспортировать документ</span>
                </button>
              </div>
            </div>

            {/* Предпросмотр документа */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">👁️ Предпросмотр документа</h3>
              <div className="bg-white text-black p-6 rounded-lg min-h-[400px]">
                {documentTitle ? (
                  <div className="space-y-4">
                    <div className="text-center border-b pb-4">
                      <h4 className="text-xl font-bold text-blue-900">МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ РОССИЙСКОЙ ФЕДЕРАЦИИ</h4>
                      <p className="text-gray-700">УЧЕБНЫЙ ВЗВОД ДПС г. Горки</p>
                    </div>
                    
                    <div className="text-center">
                      <h5 className="text-lg font-bold text-red-700">
                        {documentType === 'конкурс' ? 'ОБЪЯВЛЕНИЕ О КОНКУРСЕ' : 
                         documentType === 'приказ' ? 'П Р И К А З' : 
                         documentType === 'объявление' ? 'ОФИЦИАЛЬНОЕ ОБЪЯВЛЕНИЕ' : 
                         'БЛАГОДАРСТВЕННОЕ ПИСЬМО'}
                      </h5>
                    </div>
                    
                    <div className="text-right text-sm">
                      <p>№ {new Date().getTime().toString().slice(-6)}-УВ/Г</p>
                      <p>от {new Date().toLocaleDateString('ru-RU')} г.</p>
                    </div>
                    
                    <div className="text-center italic font-bold">
                      «{documentTitle}»
                    </div>
                    
                    <div className="whitespace-pre-line">
                      {documentContent.split('\n').map((line, i) => (
                        <p key={i} className="mb-2">
                          {line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                               .replace(/\*(.*?)\*/g, '<em>$1</em>')
                               .replace(/__(.*?)__/g, '<u>$1</u>')
                               .split(/(<[^>]+>)/)
                               .map((part, j) => {
                                 if (part.startsWith('<strong>')) return <strong key={j}>{part.replace(/<\/?strong>/g, '')}</strong>
                                 if (part.startsWith('<em>')) return <em key={j}>{part.replace(/<\/?em>/g, '')}</em>
                                 if (part.startsWith('<u>')) return <u key={j}>{part.replace(/<\/?u>/g, '')}</u>
                                 return part
                               })}
                        </p>
                      ))}
                    </div>
                    
                    <div className="text-center text-gray-500 text-sm mt-12 pt-4 border-t">
                      <div>Документ составлен: {new Date().toLocaleDateString('ru-RU')}</div>
                      <div className="font-bold">ДЛЯ СЛУЖЕБНОГО ПОЛЬЗОВАНИЯ</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-20">
                    Заполните поля выше, чтобы увидеть предпросмотр
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Футер */}
        <footer className="mt-12 pt-8 border-t border-white/20 text-center">
          <div className="mb-4">
            <p className="text-lg">© 2024 Учебный взвод ДПС г. Горки | МВД России</p>
            <p className="text-blue-300">Для служебного пользования</p>
          </div>
          <div className="text-sm text-blue-200">
            <p>Все документы оформляются в соответствии с официальными требованиями</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
