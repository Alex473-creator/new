'use client'

import { useState } from 'react'

export default function DocumentGenerator() {
  const [activeTab, setActiveTab] = useState('templates')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [documentTitle, setDocumentTitle] = useState('')
  const [documentContent, setDocumentContent] = useState('')
  const [documentType, setDocumentType] = useState('конкурс')
  const [isGenerating, setIsGenerating] = useState(false)

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

  // Функция для переноса текста
  const wrapText = (context, text, maxWidth, fontSize, fontFamily = 'Arial') => {
    context.font = `${fontSize}px ${fontFamily}`
    const words = text.split(' ')
    const lines = []
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const width = context.measureText(currentLine + ' ' + word).width
      if (width < maxWidth) {
        currentLine += ' ' + word
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    }
    lines.push(currentLine)
    return lines
  }

  // Функция для рисования российского герба
  const drawRussianCoatOfArms = (ctx, x, y, size) => {
    ctx.save()
    ctx.translate(x, y)
    
    // Основной цвет - золотой
    ctx.fillStyle = '#FFD700'
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 2

    // Тело орла
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.35, size * 0.25, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Левая голова
    ctx.beginPath()
    ctx.arc(-size * 0.22, -size * 0.12, size * 0.09, 0.2, Math.PI - 0.2)
    ctx.fill()
    ctx.stroke()

    // Правая голова
    ctx.beginPath()
    ctx.arc(size * 0.22, -size * 0.12, size * 0.09, Math.PI + 0.2, -0.2, true)
    ctx.fill()
    ctx.stroke()

    // Короны - левая
    ctx.beginPath()
    ctx.moveTo(-size * 0.22, -size * 0.21)
    ctx.lineTo(-size * 0.18, -size * 0.28)
    ctx.lineTo(-size * 0.14, -size * 0.21)
    ctx.lineTo(-size * 0.10, -size * 0.28)
    ctx.lineTo(-size * 0.06, -size * 0.21)
    ctx.lineTo(-size * 0.26, -size * 0.21)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Короны - центральная
    ctx.beginPath()
    ctx.moveTo(-size * 0.03, -size * 0.21)
    ctx.lineTo(0, -size * 0.28)
    ctx.lineTo(size * 0.03, -size * 0.21)
    ctx.lineTo(size * 0.07, -size * 0.28)
    ctx.lineTo(size * 0.10, -size * 0.21)
    ctx.lineTo(-size * 0.10, -size * 0.21)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Короны - правая
    ctx.beginPath()
    ctx.moveTo(size * 0.16, -size * 0.21)
    ctx.lineTo(size * 0.20, -size * 0.28)
    ctx.lineTo(size * 0.24, -size * 0.21)
    ctx.lineTo(size * 0.28, -size * 0.28)
    ctx.lineTo(size * 0.32, -size * 0.21)
    ctx.lineTo(size * 0.12, -size * 0.21)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Скипетр
    ctx.fillStyle = '#C0C0C0'
    ctx.fillRect(size * 0.12, -size * 0.05, size * 0.03, size * 0.35)
    ctx.strokeRect(size * 0.12, -size * 0.05, size * 0.03, size * 0.35)
    
    // Держава
    ctx.fillRect(-size * 0.15, -size * 0.05, size * 0.03, size * 0.35)
    ctx.strokeRect(-size * 0.15, -size * 0.05, size * 0.03, size * 0.35)

    // Верх скипетра
    ctx.fillStyle = '#FFD700'
    ctx.beginPath()
    ctx.moveTo(size * 0.135, -size * 0.40)
    ctx.lineTo(size * 0.120, -size * 0.32)
    ctx.lineTo(size * 0.150, -size * 0.32)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Верх державы
    ctx.beginPath()
    ctx.arc(-size * 0.135, -size * 0.40, size * 0.02, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Щит на груди
    ctx.fillStyle = '#FF0000'
    ctx.beginPath()
    // Верх щита
    ctx.moveTo(0, -size * 0.05)
    ctx.lineTo(-size * 0.08, size * 0.02)
    // Правая сторона
    ctx.lineTo(0, size * 0.15)
    // Левая сторона
    ctx.lineTo(size * 0.08, size * 0.02)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Всадник на щите
    ctx.fillStyle = '#FFFFFF'
    ctx.strokeStyle = '#000000'
    // Конь
    ctx.beginPath()
    ctx.arc(0, size * 0.05, size * 0.04, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    
    // Всадник
    ctx.beginPath()
    ctx.arc(0, -size * 0.01, size * 0.02, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Копье
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.03)
    ctx.lineTo(0, -size * 0.12)
    ctx.stroke()

    // Лапы
    const drawClaw = (cx, cy) => {
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx - size * 0.04, cy + size * 0.12)
      ctx.lineTo(cx + size * 0.04, cy + size * 0.12)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    }

    drawClaw(-size * 0.15, size * 0.18)
    drawClaw(0, size * 0.18)
    drawClaw(size * 0.15, size * 0.18)

    ctx.restore()
  }

  // Экспорт документа как изображение
  const exportDocument = async () => {
    try {
      if (!document.createElement('canvas').getContext) {
        alert('Ваш браузер не поддерживает создание изображений. Попробуйте другой браузер.')
        return
      }
      
      if (!documentTitle.trim()) {
        alert('Введите название документа')
        return
      }
      if (!documentContent.trim()) {
        alert('Введите содержание документа')
        return
      }

      setIsGenerating(true)
      
      const today = new Date().toLocaleDateString('ru-RU')
      const docNumber = `${today.replace(/\D/g, '')}-УВ/Г`
      
      const docTypeText = {
        'конкурс': 'ОБЪЯВЛЕНИЕ О КОНКУРСЕ',
        'приказ': 'П Р И К А З',
        'объявление': 'ОФИЦИАЛЬНОЕ ОБЪЯВЛЕНИЕ',
        'благодарность': 'БЛАГОДАРСТВЕННОЕ ПИСЬМО'
      }[documentType] || 'ДОКУМЕНТ'

      // Создаем canvas для генерации изображения
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Размеры изображения (A4 в пикселях для 300 DPI)
      const width = 2480
      const height = 3508
      
      canvas.width = width
      canvas.height = height
      
      // Заливаем белым фоном
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)
      
      // Отступы
      const margin = 200
      const contentWidth = width - (margin * 2)
      
      // Рисуем российский герб в центре шапки
      drawRussianCoatOfArms(ctx, width / 2, 220, 140)
      
      // Название организации под гербом
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 48px Times New Roman'
      ctx.textAlign = 'center'
      ctx.fillText('РОССИЙСКАЯ ФЕДЕРАЦИЯ', width / 2, 380)
      ctx.font = 'bold 42px Times New Roman'
      ctx.fillText('ГОСУДАРСТВЕННАЯ СЛУЖБА', width / 2, 440)
      ctx.fillText('УЧЕБНЫЙ ВЗВОД г. ГОРКИ', width / 2, 500)
      
      // Разделительная линия
      ctx.beginPath()
      ctx.moveTo(margin, 560)
      ctx.lineTo(width - margin, 560)
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 3
      ctx.stroke()
      
      // Тип документа
      ctx.font = 'bold 80px Times New Roman'
      ctx.fillText(docTypeText, width / 2, 660)
      
      // Номер документа
      ctx.font = 'italic 42px Arial'
      ctx.fillText(`№ ${docNumber}`, width / 2, 740)
      
      // Дата
      ctx.font = '42px Arial'
      ctx.fillText(`«${today}» г. Горки`, width / 2, 800)
      
      // Заголовок документа
      ctx.font = 'bold 56px Times New Roman'
      ctx.textAlign = 'left'
      const titleLines = wrapText(ctx, documentTitle, contentWidth, 56, 'Times New Roman')
      titleLines.forEach((line, index) => {
        ctx.fillText(line, margin, 900 + (index * 80))
      })
      
      // Содержимое документа
      const titleHeight = 900 + (titleLines.length * 80)
      ctx.font = '42px Times New Roman'
      const contentLines = wrapText(ctx, documentContent.replace(/\*\*/g, ''), contentWidth, 42, 'Times New Roman')
      contentLines.forEach((line, index) => {
        ctx.fillText(line, margin, titleHeight + 120 + (index * 60))
      })
      
      // Подпись
      const contentHeight = titleHeight + 120 + (contentLines.length * 60)
      ctx.font = 'bold 42px Times New Roman'
      ctx.textAlign = 'right'
      ctx.fillText('Руководитель учебного взвода', width - margin, contentHeight + 180)
      
      // Линия для подписи
      ctx.beginPath()
      ctx.moveTo(width - margin - 400, contentHeight + 210)
      ctx.lineTo(width - margin, contentHeight + 210)
      ctx.stroke()
      
      // Текст под линией
      ctx.font = 'italic 36px Arial'
      ctx.fillText('(подпись)', width - margin - 200, contentHeight + 260)
      ctx.fillText('И.И. Иванов', width - margin - 200, contentHeight + 310)
      
      // Печать
      ctx.beginPath()
      ctx.arc(width - margin - 100, contentHeight + 300, 70, 0, Math.PI * 2)
      ctx.strokeStyle = '#FF0000'
      ctx.lineWidth = 4
      ctx.stroke()
      
      ctx.font = 'bold 24px Arial'
      ctx.fillStyle = '#FF0000'
      ctx.textAlign = 'center'
      ctx.fillText('ПЕЧАТЬ', width - margin - 100, contentHeight + 295)
      ctx.fillText('УЧЕБНОГО', width - margin - 100, contentHeight + 325)
      ctx.fillText('ВЗВОДА', width - margin - 100, contentHeight + 355)

      // Создаем ссылку для скачивания
      const link = document.createElement('a')
      link.download = `Документ_${docNumber}.png`
      link.href = canvas.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setIsGenerating(false)
      alert('Документ успешно сохранен!')

    } catch (error) {
      console.error('Ошибка при генерации документа:', error)
      alert('Произошла ошибка при создании документа. Пожалуйста, попробуйте еще раз.')
      setIsGenerating(false)
    }
  }

  // Вспомогательная функция для обработки жирного текста в редакторе
  const handleBoldText = () => {
    const textarea = document.getElementById('documentContent')
    if (!textarea) return
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = documentContent.substring(start, end)
    const newText = documentContent.substring(0, start) + '**' + selectedText + '**' + documentContent.substring(end)
    setDocumentContent(newText)
    
    // Возвращаем фокус на текстовое поле
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + 2, end + 2)
    }, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <header className="mb-8 text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mr-4">
            <span className="text-3xl">📄</span>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Генератор служебных документов
            </h1>
            <p className="text-gray-600 flex items-center justify-center">
              <span className="inline-block mr-2">🇷🇺</span>
              Создание официальных документов с государственной символикой
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Навигация */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'templates' ? 'bg-blue-600 text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-gray-50 shadow'}`}
          >
            <span className="mr-2">📁</span>
            Шаблоны документов
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'editor' ? 'bg-blue-600 text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-gray-50 shadow'}`}
          >
            <span className="mr-2">✏️</span>
            Редактор документа
          </button>
          <button
            onClick={exportDocument}
            disabled={isGenerating}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${isGenerating ? 'bg-gray-400' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'}`}
          >
            {isGenerating ? (
              <>
                <span className="animate-spin inline-block mr-2">🔄</span>
                Генерация...
              </>
            ) : (
              <>
                <span className="mr-2">💾</span>
                Сохранить как PNG
              </>
            )}
          </button>
        </div>

        {/* Шаблоны документов */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <button
              onClick={createNewDocument}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-dashed border-gray-300 hover:border-blue-500 flex flex-col items-center justify-center h-72 group hover:scale-[1.02]"
            >
              <div className="text-6xl mb-6 group-hover:text-blue-500 transition-colors">➕</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Создать новый документ</h3>
              <p className="text-gray-600 text-center">Начните с чистого листа</p>
            </button>

            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-500 hover:scale-[1.02] group"
                onClick={() => loadTemplate(template)}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">{template.name}</h3>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${template.type === 'конкурс' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : template.type === 'приказ' ? 'bg-red-50 text-red-700 border border-red-200' : template.type === 'объявление' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                      {template.type}
                    </span>
                  </div>
                  <div className="text-4xl opacity-80">{template.name.charAt(0)}</div>
                </div>
                <p className="text-gray-600 line-clamp-3 mb-6">{template.content.substring(0, 150)}...</p>
                <button className="text-blue-600 font-semibold hover:text-blue-800 flex items-center">
                  Использовать шаблон 
                  <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Редактор документа */}
        {activeTab === 'editor' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Левая колонка - форма */}
              <div className="lg:col-span-1 p-8 border-r border-gray-200 bg-gray-50">
                <div className="space-y-8">
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      <span className="mr-2">📝</span>
                      Тип документа
                    </label>
                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-white shadow-sm"
                    >
                      <option value="конкурс">🏆 Конкурс</option>
                      <option value="приказ">⚡ Приказ</option>
                      <option value="объявление">📢 Объявление</option>
                      <option value="благодарность">🎖️ Благодарность</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      <span className="mr-2">📌</span>
                      Заголовок документа
                    </label>
                    <input
                      type="text"
                      value={documentTitle}
                      onChange={(e) => setDocumentTitle(e.target.value)}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-white shadow-sm"
                      placeholder="Введите заголовок..."
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-lg font-semibold text-gray-800">
                        <span className="mr-2">📄</span>
                        Содержание документа
                      </label>
                      <button
                        onClick={handleBoldText}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-800 shadow-sm hover:shadow transition-all"
                        title="Сделать выделенный текст жирным"
                      >
                        <span className="mr-1">B</span>
                        Жирный текст
                      </button>
                    </div>
                    <textarea
                      id="documentContent"
                      value={documentContent}
                      onChange={(e) => setDocumentContent(e.target.value)}
                      className="w-full h-80 px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-white shadow-sm resize-none"
                      placeholder="Введите текст документа..."
                    />
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-blue-800 font-medium mb-2">📋 Подсказки по форматированию:</p>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Используйте <code className="bg-blue-100 px-2 py-1 rounded">**текст**</code> для жирного начертания</li>
                        <li>• Используйте пустые строки для разделения абзацев</li>
                        <li>• Для списков используйте цифры или символы •</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-300">
                    <button
                      onClick={exportDocument}
                      disabled={isGenerating}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${isGenerating ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'} text-white flex items-center justify-center`}
                    >
                      {isGenerating ? (
                        <>
                          <span className="animate-spin inline-block mr-3 text-2xl">🔄</span>
                          Генерация документа с гербом...
                        </>
                      ) : (
                        <>
                          <span className="mr-3 text-2xl">🇷🇺</span>
                          Сохранить как PNG с российским гербом
                        </>
                      )}
                    </button>
                    <p className="mt-4 text-center text-gray-600 text-sm">
                      Документ будет сохранен в формате A4 с государственным гербом России
                    </p>
                  </div>
                </div>
              </div>

              {/* Правая колонка - предпросмотр */}
              <div className="lg:col-span-2 p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-800">
                    <span className="mr-3">👁️</span>
                    Предпросмотр документа
                  </h3>
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                <div className="bg-gray-100 border-2 border-gray-300 rounded-2xl p-8 min-h-[700px] shadow-inner">
                  <div className="bg-white rounded-xl p-12 shadow-lg h-full overflow-auto">
                    {/* Шапка с гербом */}
                    <div className="text-center mb-12">
                      <div className="flex justify-center mb-8">
                        <div className="relative">
                          <div className="w-32 h-32 bg-gradient-to-b from-yellow-200 to-yellow-100 border-4 border-yellow-300 rounded-full flex items-center justify-center shadow-lg">
                            <div className="text-6xl">🇷🇺</div>
                          </div>
                          <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            ГЕРБ
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 tracking-wide">РОССИЙСКАЯ ФЕДЕРАЦИЯ</h2>
                        <h3 className="text-xl font-bold text-gray-800">ГОСУДАРСТВЕННАЯ СЛУЖБА</h3>
                        <h4 className="text-lg font-semibold text-gray-700">УЧЕБНЫЙ ВЗВОД г. ГОРКИ</h4>
                      </div>
                      
                      <div className="relative py-6">
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                        <div className="relative bg-white px-8 inline-block">
                          <h1 className="text-3xl font-bold text-gray-900 tracking-wider">
                            {documentType === 'конкурс' ? 'ОБЪЯВЛЕНИЕ О КОНКУРСЕ' : 
                             documentType === 'приказ' ? 'П Р И К А З' :
                             documentType === 'объявление' ? 'ОФИЦИАЛЬНОЕ ОБЪЯВЛЕНИЕ' : 
                             'БЛАГОДАРСТВЕННОЕ ПИСЬМО'}
                          </h1>
                        </div>
                      </div>
                    </div>

                    {/* Информация о документе */}
                    <div className="text-center mb-12 space-y-4">
                      <p className="text-lg text-gray-600 italic">
                        № {new Date().toLocaleDateString('ru-RU').replace(/\D/g, '')}-УВ/Г
                      </p>
                      <p className="text-lg text-gray-600">
                        «{new Date().toLocaleDateString('ru-RU')}» г. Горки
                      </p>
                    </div>

                    {/* Заголовок */}
                    {documentTitle && (
                      <div className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 text-center border-b-2 border-blue-200 pb-4">
                          {documentTitle}
                        </h2>
                      </div>
                    )}

                    {/* Содержание */}
                    {documentContent && (
                      <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line mb-16">
                        {documentContent.split('**').map((text, index) => (
                          index % 2 === 1 ? (
                            <strong key={index} className="font-bold text-gray-900">{text}</strong>
                          ) : (
                            text
                          )
                        ))}
                      </div>
                    )}

                    {/* Подпись и печать */}
                    <div className="mt-20 pt-12 border-t-2 border-gray-300">
                      <div className="flex justify-between items-end">
                        <div className="relative">
                          <div className="w-32 h-32 border-4 border-red-500 rounded-full flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-sm font-bold text-red-500">М.П.</p>
                              <p className="text-xs text-red-500 mt-1">ПЕЧАТЬ</p>
                              <p className="text-xs text-red-500">УЧЕБНОГО ВЗВОДА</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900 mb-12">Руководитель учебного взвода</p>
                          <div className="mb-4">
                            <div className="w-64 h-0.5 bg-gray-900 mb-2"></div>
                            <p className="text-gray-600 text-sm">(подпись)</p>
                          </div>
                          <p className="text-lg font-semibold text-gray-800">И.И. Иванов</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-16 pt-8 border-t border-gray-300 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-700 font-medium">📄 Генератор служебных документов</p>
              <p className="text-gray-600 text-sm mt-1">Версия 1.0 • Для внутреннего служебного пользования</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">РФ</span>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Российская Федерация</p>
                <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Все права защищены</p>
              </div>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            <p>Документы создаются в соответствии с требованиями официального документооборота</p>
            <p className="mt-2">Герб России используется в соответствии с государственными стандартами</p>
          </div>
        </div>
      </footer>
    </div>
  )
}    {
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

  // Функция для переноса текста
  const wrapText = (context, text, maxWidth, fontSize, fontFamily = 'Arial') => {
    context.font = `${fontSize}px ${fontFamily}`
    const words = text.split(' ')
    const lines = []
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const width = context.measureText(currentLine + ' ' + word).width
      if (width < maxWidth) {
        currentLine += ' ' + word
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    }
    lines.push(currentLine)
    return lines
  }

  // Функция для рисования российского герба
  const drawRussianCoatOfArms = (ctx, x, y, size) => {
    // Сохраняем состояние контекста
    ctx.save()
    
    // Устанавливаем начальную позицию
    ctx.translate(x, y)
    
    // Основной цвет - золотой
    ctx.fillStyle = '#FFD700'
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 3

    // Рисуем двуглавого орла
    // Тело орла
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.4, size * 0.3, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Левая голова
    ctx.beginPath()
    ctx.ellipse(-size * 0.25, -size * 0.1, size * 0.1, size * 0.15, 0.3, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Правая голова
    ctx.beginPath()
    ctx.ellipse(size * 0.25, -size * 0.1, size * 0.1, size * 0.15, -0.3, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Короны
    [ -size * 0.25, 0, size * 0.25 ].forEach((cx, index) => {
      ctx.fillStyle = '#FFD700'
      ctx.beginPath()
      // Основа короны
      ctx.rect(cx - size * 0.08, -size * 0.25, size * 0.16, size * 0.08)
      ctx.fill()
      ctx.stroke()
      
      // Зубцы короны
      for (let i = 0; i < 5; i++) {
        const px = cx - size * 0.06 + (i * size * 0.03)
        ctx.beginPath()
        ctx.moveTo(px, -size * 0.25)
        ctx.lineTo(px + size * 0.015, -size * 0.3)
        ctx.lineTo(px + size * 0.03, -size * 0.25)
        ctx.fill()
        ctx.stroke()
      }
    })

    // Скипетр
    ctx.fillStyle = '#FFD700'
    ctx.beginPath()
    ctx.roundRect(size * 0.15, size * 0.05, size * 0.05, size * 0.4, 5)
    ctx.fill()
    ctx.stroke()
    
    // Держава
    ctx.beginPath()
    ctx.roundRect(-size * 0.2, size * 0.05, size * 0.05, size * 0.4, 5)
    ctx.fill()
    ctx.stroke()
    
    // Крест на скипетре
    ctx.beginPath()
    ctx.moveTo(size * 0.175, -size * 0.35)
    ctx.lineTo(size * 0.175, -size * 0.45)
    ctx.moveTo(size * 0.15, -size * 0.4)
    ctx.lineTo(size * 0.2, -size * 0.4)
    ctx.stroke()

    // Крест на державе
    ctx.beginPath()
    ctx.arc(-size * 0.175, -size * 0.4, size * 0.03, 0, Math.PI * 2)
    ctx.moveTo(-size * 0.175, -size * 0.43)
    ctx.lineTo(-size * 0.175, -size * 0.37)
    ctx.moveTo(-size * 0.2, -size * 0.4)
    ctx.lineTo(-size * 0.15, -size * 0.4)
    ctx.stroke()

    // Щит на груди
    ctx.fillStyle = '#FF0000'
    ctx.beginPath()
    ctx.roundRect(-size * 0.08, -size * 0.02, size * 0.16, size * 0.2, 5)
    ctx.fill()
    ctx.stroke()

    // Всадник на щите (упрощенный)
    ctx.fillStyle = '#FFFFFF'
    // Конь
    ctx.beginPath()
    ctx.ellipse(0, size * 0.04, size * 0.06, size * 0.04, 0, 0, Math.PI * 2)
    ctx.fill()
    // Всадник
    ctx.beginPath()
    ctx.arc(0, -size * 0.02, size * 0.03, 0, Math.PI * 2)
    ctx.fill()
    // Копье
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.05)
    ctx.lineTo(0, -size * 0.15)
    ctx.stroke()

    // Лапы
    const drawClaw = (cx, cy) => {
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx - size * 0.05, cy + size * 0.15)
      ctx.lineTo(cx + size * 0.05, cy + size * 0.15)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    }

    drawClaw(-size * 0.2, size * 0.15)
    drawClaw(0, size * 0.15)
    drawClaw(size * 0.2, size * 0.15)

    // Восстанавливаем состояние контекста
    ctx.restore()
  }

  // Экспорт документа как изображение
  const exportDocument = async () => {
    try {
      // Проверяем поддержку Canvas
      if (!document.createElement('canvas').getContext) {
        alert('Ваш браузер не поддерживает создание изображений. Попробуйте другой браузер.')
        return
      }
      
      if (!documentTitle.trim()) {
        alert('Введите название документа')
        return
      }
      if (!documentContent.trim()) {
        alert('Введите содержание документа')
        return
      }

      setIsGenerating(true)
      
      const today = new Date().toLocaleDateString('ru-RU')
      const docNumber = `${today.replace(/\D/g, '')}-УВ/Г`
      
      const docTypeText = {
        'конкурс': 'ОБЪЯВЛЕНИЕ О КОНКУРСЕ',
        'приказ': 'П Р И К А З',
        'объявление': 'ОФИЦИАЛЬНОЕ ОБЪЯВЛЕНИЕ',
        'благодарность': 'БЛАГОДАРСТВЕННОЕ ПИСЬМО'
      }[documentType] || 'ДОКУМЕНТ'

      // Создаем canvas для генерации изображения
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Размеры изображения (A4 в пикселях для 300 DPI)
      const width = 2480 // A4 width at 300 DPI
      const height = 3508 // A4 height at 300 DPI
      
      canvas.width = width
      canvas.height = height
      
      // Заливаем белым фоном
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)
      
      // Отступы
      const margin = 200
      const contentWidth = width - (margin * 2)
      
      // Рисуем российский герб в центре шапки
      drawRussianCoatOfArms(ctx, width / 2, 180, 120)
      
      // Название организации под гербом
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 42px Times New Roman'
      ctx.textAlign = 'center'
      ctx.fillText('ГОСУДАРСТВЕННАЯ СЛУЖБА', width / 2, 320)
      ctx.fillText('УЧЕБНЫЙ ВЗВОД г. ГОРКИ', width / 2, 370)
      
      // Разделительная линия
      ctx.beginPath()
      ctx.moveTo(margin, 420)
      ctx.lineTo(width - margin, 420)
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.stroke()
      
      // Тип документа
      ctx.font = 'bold 72px Times New Roman'
      ctx.fillText(docTypeText, width / 2, 520)
      
      // Номер документа
      ctx.font = 'italic 36px Arial'
      ctx.fillText(`№ ${docNumber}`, width / 2, 590)
      
      // Дата
      ctx.font = '36px Arial'
      ctx.fillText(`«${today}» г. Горки`, width / 2, 640)
      
      // Заголовок документа
      ctx.font = 'bold 52px Times New Roman'
      ctx.textAlign = 'left'
      const titleLines = wrapText(ctx, documentTitle, contentWidth, 52, 'Times New Roman')
      titleLines.forEach((line, index) => {
        ctx.fillText(line, margin, 740 + (index * 70))
      })
      
      // Содержимое документа
      const titleHeight = 740 + (titleLines.length * 70)
      ctx.font = '36px Times New Roman'
      const contentLines = wrapText(ctx, documentContent.replace(/\*\*/g, ''), contentWidth, 36, 'Times New Roman')
      contentLines.forEach((line, index) => {
        ctx.fillText(line, margin, titleHeight + 100 + (index * 50))
      })
      
      // Подпись
      const contentHeight = titleHeight + 100 + (contentLines.length * 50)
      ctx.font = 'bold 36px Times New Roman'
      ctx.fillText('Руководитель учебного взвода', width - margin - 400, contentHeight + 150)
      
      ctx.beginPath()
      ctx.moveTo(width - margin - 400, contentHeight + 180)
      ctx.lineTo(width - margin, contentHeight + 180)
      ctx.stroke()
      
      ctx.font = 'italic 32px Arial'
      ctx.fillText('(подпись)', width - margin - 300, contentHeight + 220)
      ctx.fillText('И.И. Иванов', width - margin - 300, contentHeight + 260)
      
      // Печать
      ctx.beginPath()
      ctx.arc(width - margin - 100, contentHeight + 250, 60, 0, Math.PI * 2)
      ctx.strokeStyle = '#FF0000'
      ctx.lineWidth = 3
      ctx.stroke()
      
      ctx.font = 'bold 20px Arial'
      ctx.fillStyle = '#FF0000'
      ctx.textAlign = 'center'
      ctx.fillText('ПЕЧАТЬ', width - margin - 100, contentHeight + 250)
      ctx.fillText('УЧЕБНОГО ВЗВОДА', width - margin - 100, contentHeight + 275)

      // Создаем ссылку для скачивания
      const link = document.createElement('a')
      link.download = `Документ_${docNumber}.png`
      link.href = canvas.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setIsGenerating(false)
      alert('Документ успешно сохранен!')

    } catch (error) {
      console.error('Ошибка при генерации документа:', error)
      alert('Произошла ошибка при создании документа. Пожалуйста, попробуйте еще раз.')
      setIsGenerating(false)
    }
  }

  // Вспомогательная функция для обработки жирного текста в редакторе
  const handleBoldText = () => {
    const textarea = document.getElementById('documentContent')
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = documentContent.substring(start, end)
    const newText = documentContent.substring(0, start) + '**' + selectedText + '**' + documentContent.substring(end)
    setDocumentContent(newText)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
          📄 Генератор служебных документов
        </h1>
        <p className="text-center text-gray-600">
          Создавайте официальные документы с российским гербом
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Навигация */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'templates' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            📁 Шаблоны документов
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'editor' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            ✏️ Редактор документа
          </button>
          <button
            onClick={exportDocument}
            disabled={isGenerating}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${isGenerating ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          >
            {isGenerating ? '🔄 Генерация...' : '💾 Сохранить как PNG'}
          </button>
        </div>

        {/* Шаблоны документов */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <button
              onClick={createNewDocument}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-dashed border-gray-300 hover:border-blue-500 flex flex-col items-center justify-center h-64"
            >
              <div className="text-5xl mb-4">➕</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Создать новый документ</h3>
              <p className="text-gray-600 text-center">Начните с чистого листа</p>
            </button>

            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-200 hover:border-blue-500"
                onClick={() => loadTemplate(template)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{template.name}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${template.type === 'конкурс' ? 'bg-yellow-100 text-yellow-800' : template.type === 'приказ' ? 'bg-red-100 text-red-800' : template.type === 'объявление' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {template.type}
                    </span>
                  </div>
                  <div className="text-3xl">{template.name.charAt(0)}</div>
                </div>
                <p className="text-gray-600 line-clamp-3">{template.content.substring(0, 150)}...</p>
                <button className="mt-4 text-blue-600 font-medium hover:text-blue-800">
                  Использовать шаблон →
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Редактор документа */}
        {activeTab === 'editor' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Левая колонка - форма */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип документа
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="конкурс">Конкурс</option>
                    <option value="приказ">Приказ</option>
                    <option value="объявление">Объявление</option>
                    <option value="благодарность">Благодарность</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Заголовок документа
                  </label>
                  <input
                    type="text"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Введите заголовок..."
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Содержание документа
                    </label>
                    <button
                      onClick={handleBoldText}
                      className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold"
                      title="Сделать выделенный текст жирным"
                    >
                      B
                    </button>
                  </div>
                  <textarea
                    id="documentContent"
                    value={documentContent}
                    onChange={(e) => setDocumentContent(e.target.value)}
                    className="w-full h-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Введите текст документа..."
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Используйте **текст** для жирного начертания
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={exportDocument}
                    disabled={isGenerating}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${isGenerating ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white flex items-center justify-center`}
                  >
                    {isGenerating ? (
                      <>
                        <span className="animate-spin mr-2">🔄</span>
                        Генерация документа...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">💾</span>
                        Сохранить как PNG с гербом
                      </>
                    )}
                  </button>
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    Документ будет сохранен в формате A4 с российским гербом
                  </p>
                </div>
              </div>

              {/* Правая колонка - предпросмотр */}
              <div className="lg:col-span-2">
                <div className="bg-gray-900 text-white p-4 rounded-t-lg flex items-center justify-between">
                  <h3 className="font-medium">Предпросмотр документа</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-white border border-gray-300 rounded-b-lg p-8 min-h-[600px]">
                  <div className="max-w-4xl mx-auto">
                    {/* Шапка с гербом */}
                    <div className="text-center mb-8">
                      <div className="flex justify-center mb-4">
                        <div className="w-24 h-24 flex items-center justify-center border-2 border-gray-300 rounded-lg">
                          <div className="text-4xl">🇷🇺</div>
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-gray-800 mb-2">ГОСУДАРСТВЕННАЯ СЛУЖБА</h2>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">УЧЕБНЫЙ ВЗВОД г. ГОРКИ</h3>
                      <div className="border-t-2 border-gray-400 pt-4">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                          {documentType === 'конкурс' ? 'ОБЪЯВЛЕНИЕ О КОНКУРСЕ' : 
                           documentType === 'приказ' ? 'П Р И К А З' :
                           documentType === 'объявление' ? 'ОФИЦИАЛЬНОЕ ОБЪЯВЛЕНИЕ' : 
                           'БЛАГОДАРСТВЕННОЕ ПИСЬМО'}
                        </h1>
                      </div>
                    </div>

                    {/* Заголовок */}
                    {documentTitle && (
                      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                        {documentTitle}
                      </h2>
                    )}

                    {/* Содержание */}
                    {documentContent && (
                      <div className="text-gray-700 whitespace-pre-line mb-8">
                        {documentContent.split('**').map((text, index) => (
                          index % 2 === 1 ? (
                            <strong key={index} className="font-bold">{text}</strong>
                          ) : (
                            text
                          )
                        ))}
                      </div>
                    )}

                    {/* Подпись */}
                    <div className="mt-16 pt-8 border-t border-gray-300">
                      <div className="flex justify-end">
                        <div className="text-right">
                          <p className="font-bold text-gray-800">Руководитель учебного взвода</p>
                          <div className="mt-8 mb-2 w-48 border-b border-gray-400"></div>
                          <p className="text-gray-600">(подпись)</p>
                          <p className="text-gray-800 mt-2">И.И. Иванов</p>
                        </div>
                      </div>
                      <div className="mt-8 flex justify-end">
                        <div className="border-2 border-red-500 rounded-full w-24 h-24 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-xs font-bold text-red-500">ПЕЧАТЬ</p>
                            <p className="text-xs text-red-500">УЧЕБНОГО ВЗВОДА</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
        <p>© {new Date().getFullYear()} Генератор служебных документов. Все права защищены.</p>
        <p className="text-sm mt-2">Для внутреннего служебного пользования</p>
      </footer>

      {/* Стили для roundRect если не поддерживается */}
      <style jsx global>{`
        CanvasRenderingContext2D.prototype.roundRect || (CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
          if (w < 2 * r) r = w / 2;
          if (h < 2 * r) r = h / 2;
          this.beginPath();
          this.moveTo(x + r, y);
          this.arcTo(x + w, y, x + w, y + h, r);
          this.arcTo(x + w, y + h, x, y + h, r);
          this.arcTo(x, y + h, x, y, r);
          this.arcTo(x, y, x + w, y, r);
          this.closePath();
          return this;
        });
      `}</style>
    </div>
  )
}      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, width, height)
      
      // Настраиваем шрифт
      ctx.font = 'bold 80px "Times New Roman"'
      ctx.fillStyle = '#1e3a5f'
      ctx.textAlign = 'center'
      
      // Заголовок МВД
      ctx.fillText('МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ', width / 2, 200)
      ctx.font = '60px "Times New Roman"'
      ctx.fillText('РОССИЙСКОЙ ФЕДЕРАЦИИ', width / 2, 280)
      
      // Подзаголовок
      ctx.font = '50px "Times New Roman"'
      ctx.fillStyle = '#333'
      ctx.fillText('УЧЕБНЫЙ ВЗВОД ДОРОЖНО-ПАТРУЛЬНОЙ СЛУЖБЫ', width / 2, 380)
      ctx.font = '40px "Times New Roman"'
      ctx.fillText('г. Горки', width / 2, 450)
      
      // Разделительная линия
      ctx.strokeStyle = '#b22222'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(200, 520)
      ctx.lineTo(width - 200, 520)
      ctx.stroke()
      
      // Тип документа
      ctx.font = 'bold 90px "Times New Roman"'
      ctx.fillStyle = '#b22222'
      ctx.fillText(docTypeText, width / 2, 650)
      
      // Номер и дата
      ctx.font = '40px "Times New Roman"'
      ctx.fillStyle = '#333'
      ctx.textAlign = 'right'
      ctx.fillText(`№ ${docNumber}`, width - 200, 750)
      ctx.fillText(`от ${today} г.`, width - 200, 800)
      ctx.fillText('г. Горки', width - 200, 880)
      ctx.fillText(`${today} г.`, width - 200, 920)
      
      // Название документа
      ctx.font = 'bold italic 70px "Times New Roman"'
      ctx.fillStyle = '#1a1a2e'
      ctx.textAlign = 'center'
      
      // Разбиваем длинное название на строки
      const titleLines = wrapText(ctx, `«${documentTitle}»`, width - 400, 70)
      let currentY = 1100
      titleLines.forEach(line => {
        ctx.fillText(line, width / 2, currentY)
        currentY += 80
      })
      
      // Содержание документа
      ctx.font = '45px "Times New Roman"'
      ctx.fillStyle = '#000'
      ctx.textAlign = 'left'
      
      // Обрабатываем форматирование и переносы
      const contentLines = documentContent.split('\n')
      currentY += 80
      
      for (let line of contentLines) {
        if (line.trim() === '') {
          currentY += 50 // Отступ между абзацами
          continue
        }
        
        // Обработка форматирования
        let isBold = false
        let isItalic = false
        let isUnderline = false
        
        // Проверяем форматирование
        if (line.includes('**')) {
          isBold = true
          line = line.replace(/\*\*/g, '')
        }
        if (line.includes('*')) {
          isItalic = true
          line = line.replace(/\*/g, '')
        }
        if (line.includes('__')) {
          isUnderline = true
          line = line.replace(/__/g, '')
        }
        
        // Устанавливаем стиль шрифта
        let fontStyle = '45px "Times New Roman"'
        if (isBold && isItalic) {
          fontStyle = 'bold italic 45px "Times New Roman"'
        } else if (isBold) {
          fontStyle = 'bold 45px "Times New Roman"'
        } else if (isItalic) {
          fontStyle = 'italic 45px "Times New Roman"'
        }
        ctx.font = fontStyle
        
        // Разбиваем длинные строки
        const wrappedLines = wrapText(ctx, line, width - 400, 45)
        
        wrappedLines.forEach(wrappedLine => {
          if (currentY > height - 400) {
            return // Не выходим за пределы страницы
          }
          
          ctx.fillText(wrappedLine, 200, currentY)
          
          // Подчеркивание если нужно
          if (isUnderline) {
            const textWidth = ctx.measureText(wrappedLine).width
            ctx.beginPath()
            ctx.moveTo(200, currentY + 5)
            ctx.lineTo(200 + textWidth, currentY + 5)
            ctx.strokeStyle = '#000'
            ctx.lineWidth = 2
            ctx.stroke()
          }
          
          currentY += 60
        })
        
        // Сбрасываем стили
        ctx.font = '45px "Times New Roman"'
      }
      
      // Штамп внизу
      ctx.font = '35px "Times New Roman"'
      ctx.fillStyle = '#666'
      ctx.textAlign = 'center'
      ctx.fillText(`Документ составлен: ${today}`, width / 2, height - 150)
      ctx.font = 'bold 35px "Times New Roman"'
      ctx.fillText('ДЛЯ СЛУЖЕБНОГО ПОЛЬЗОВАНИЯ', width / 2, height - 80)
      
      // Преобразуем canvas в изображение
      const image = canvas.toDataURL('image/png', 1.0)
      
      // Создаем ссылку для скачивания
      const link = document.createElement('a')
      link.href = image
      link.download = `Документ_${documentTitle.replace(/[^a-zа-яё0-9]/gi, '_')}_${Date.now()}.png`
      
      // Скачиваем
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      alert('✅ Изображение успешно скачано! Проверьте папку "Загрузки".')
      
    } catch (error) {
      console.error('Ошибка генерации изображения:', error)
      alert('❌ Произошла ошибка при создании изображения. Попробуйте снова.')
    }
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
                  <span className="hidden md:inline">🖨️</span>
                  <span className="md:hidden">📥</span>
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
