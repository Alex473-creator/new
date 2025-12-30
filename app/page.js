'use client'

import { useState, useEffect } from 'react'

export default function DocumentGenerator() {
  const [activeTab, setActiveTab] = useState('templates')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [documentTitle, setDocumentTitle] = useState('')
  const [documentContent, setDocumentContent] = useState('')
  const [documentType, setDocumentType] = useState('конкурс')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const [selectedCity, setSelectedCity] = useState('г. Горки')
  const [selectedUnit, setSelectedUnit] = useState('Учебный взвод')
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const cities = ['г. Москва', 'г. Новороссийск', 'г. Горки']
  const units = ['Рота ДПС', 'Учебный взвод', 'Главк']

  const autoCompleteData = {
    'отпуск': {
      title: 'Заявление на отпуск',
      content: `Прошу предоставить мне ежегодный оплачиваемый отпуск с [дата начала] по [дата окончания] продолжительностью [количество] календарных дней.\n\nОснование: Трудовой кодекс РФ, статья 115.`
    },
    'больничный': {
      title: 'Уведомление о болезни',
      content: `Довожу до Вашего сведения, что с [дата] по [дата] находился(ась) на лечении по причине болезни.\n\nК данному уведомлению прилагаю листок нетрудоспособности.`
    },
    'благодарность': {
      title: 'Благодарность сотруднику',
      content: `Выражаю благодарность [ФИО сотрудника] за добросовестное выполнение служебных обязанностей, высокий профессионализм и личный вклад в развитие подразделения.\n\nЖелаю дальнейших успехов в службе!`
    },
    'выговор': {
      title: 'Приказ о дисциплинарном взыскании',
      content: `В связи с нарушением служебной дисциплины [ФИО сотрудника], выразившемся в [описание нарушения],\n\nПРИКАЗЫВАЮ:\n1. Объявить [ФИО сотрудника] выговор.\n2. [Дополнительные меры, если есть].`
    },
    'премия': {
      title: 'Приказ о премировании',
      content: `За добросовестное выполнение служебных обязанностей и достижение высоких показателей в работе,\n\nПРИКАЗЫВАЮ:\n1. Выплатить [ФИО сотрудника] премию в размере [сумма] рублей.\n2. Основание: [основание для премии].`
    },
    'совещание': {
      title: 'Уведомление о совещании',
      content: `Доводим до Вашего сведения, что [дата] в [время] в [место] состоится совещание по вопросу [тема совещания].\n\nПовестка дня:\n1. [первый вопрос]\n2. [второй вопрос]\n3. [третий вопрос]\n\nЯвка обязательна.`
    }
  }

  const securityElements = {
    original: { symbol: '⚜️', text: 'ОРИГИНАЛ' },
    registered: { symbol: '®', text: 'ЗАРЕГИСТРИРОВАНО' },
    verified: { symbol: '✅', text: 'ПРОВЕРЕНО' },
    protected: { symbol: '🛡️', text: 'ЗАЩИЩЕНО' },
    confidential: { symbol: '🔒', text: 'КОНФИДЕНЦИАЛЬНО' },
    copy: { symbol: '©', text: 'АВТОРСКОЕ ПРАВО' },
    urgent: { symbol: '🚨', text: 'СРОЧНО' }
  }

  const generateSecurityCode = () => {
    const timestamp = Date.now().toString(36).toUpperCase()
    const unitCode = selectedUnit.substring(0, 2).toUpperCase()
    const cityCode = selectedCity.substring(3, 5).toUpperCase()
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0')
    const checkSum = ((parseInt(random) + timestamp.length) % 100).toString().padStart(2, '0')
    
    return `${unitCode}${cityCode}-${timestamp}-${random}-${checkSum}`
  }

  const templates = [
    {
      id: 1,
      name: "🏆 Конкурс «Лучший сотрудник»",
      type: "конкурс",
      title: `Конкурс «Лучший сотрудник ${selectedUnit}а ${selectedCity}»`,
      content: `⚜️ ОФИЦИАЛЬНЫЙ ДОКУМЕНТ ⚜️

В целях повышения эффективности служебной деятельности, мотивации личного состава и поощрения лучших сотрудников руководством ${selectedUnit.toLowerCase()}а принято решение о проведении ежегодного конкурса профессионального мастерства.

**КРИТЕРИИ ОЦЕНКИ УЧАСТНИКОВ:**
1. Профессиональное мастерство и знание служебных инструкций
2. Исполнительность и служебная дисциплина
3. Результаты оперативно-служебной деятельности
4. Инициативность и лидерские качества

**СРОКИ ПРОВЕДЕНИЯ:**
• Начало: 15 января 2026 года в 08:00 (МСК)
• Окончание: 31 января 2026 года в 19:00 (МСК)

**НАГРАДА ПОБЕДИТЕЛЮ:**
Денежное вознаграждение в размере 1 500 000 (один миллион пятьсот тысяч) рублей.

✅ Конкурс проводится в соответствии с планом служебно-боевой подготовки на 2026 год.

🔒 Защитный код документа: ${generateSecurityCode()}`,
      year: 2026
    },
    {
      id: 2,
      name: "⚡ Приказ о назначении",
      type: "приказ",
      title: `Приказ об организации служебной подготовки ${selectedUnit}а ${selectedCity}`,
      content: `🛡️ СЛУЖЕБНЫЙ ДОКУМЕНТ 🛡️

Во исполнение плана служебно-боевой подготовки на 2026 год, **ПРИКАЗЫВАЮ:**

1. Утвердить план служебной подготовки личного состава на I квартал 2026 года.
2. Назначить ответственным за организацию служебной подготовки ${selectedUnit.toLowerCase()}.
3. Провести внеплановую проверку знаний служебных инструкций до 15 января 2026 года.
4. Обеспечить 100% явку личного состава на занятия по служебной подготовке.
5. Контроль за исполнением настоящего приказа возложить на ответственного.

**Настоящий приказ довести до всего личного состава ${selectedUnit.toLowerCase()}.**

⚜️ Защитный код документа: ${generateSecurityCode()}

© Все права защищены. Воспроизведение запрещено.`,
      year: 2026
    },
    {
      id: 3,
      name: "📢 Объявление о собрании",
      type: "объявление",
      title: `Объявление о проведении общего собрания ${selectedUnit}а ${selectedCity}`,
      content: `🚨 СРОЧНОЕ ОБЪЯВЛЕНИЕ 🚨

Доводим до сведения личного состава ${selectedUnit.toLowerCase()}а следующую информацию:

**15 января 2026 года в 15:00** в актовом зале состоится общее собрание личного состава.

**ПОВЕСТКА ДНЯ:**
1. Подведение итогов работы за 2025 год.
2. Обсуждение планов на 2026 год.
3. Организационные вопросы.
4. Разное.

**ЯВКА ВСЕХ СОТРУДНИКОВ ОБЯЗАТЕЛЬНА.**

С собой иметь служебное удостоверение.

✅ Защитный код документа: ${generateSecurityCode()}

🔒 Для служебного пользования`,
      year: 2026
    },
    {
      id: 4,
      name: "🎖️ Благодарственное письмо",
      type: "благодарность",
      title: `Благодарственное письмо ${selectedUnit}у ${selectedCity} за образцовую службу`,
      content: `⭐ ОФИЦИАЛЬНАЯ БЛАГОДАРНОСТЬ ⭐

Выражаем искреннюю благодарность за добросовестное исполнение служебных обязанностей, высокий профессионализм и личный вклад в обеспечение правопорядка на территории ${selectedCity}.

**Работа отмечена по следующим критериям:**
• Отличные результаты в служебной деятельности в 2025 году
• Ответственное отношение к выполнению задач
• Проявление инициативы и творческого подхода
• Наставничество и помощь коллегам

Желаем дальнейших успехов в службе в 2026 году, крепкого здоровья и благополучия!

**С уважением, руководство ${selectedUnit.toLowerCase()}.**

⚜️ Защитный код: ${generateSecurityCode()}
✅ Подлинность документа подтверждена`,
      year: 2025
    }
  ]

  useEffect(() => {
    if (documentContent.length > 2) {
      const words = documentContent.toLowerCase().split(/\s+/)
      const lastWord = words[words.length - 1]
      
      const suggestions = Object.entries(autoCompleteData)
        .filter(([key]) => key.includes(lastWord) || lastWord.includes(key))
        .slice(0, 3)
      
      setAutoCompleteSuggestions(suggestions)
      setShowSuggestions(suggestions.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }, [documentContent])

  const applyAutoComplete = (key) => {
    const data = autoCompleteData[key]
    if (data) {
      setDocumentTitle(data.title)
      setDocumentContent(prev => {
        const lines = prev.split('\n')
        lines.pop()
        return [...lines, data.content].join('\n')
      })
      setShowSuggestions(false)
    }
  }

  const loadTemplate = (template) => {
    const updatedTemplate = {
      ...template,
      title: template.title
        .replace('Учебный взвод', selectedUnit)
        .replace('г. Горки', selectedCity)
    }
    
    setSelectedTemplate(updatedTemplate)
    setDocumentTitle(updatedTemplate.title)
    
    let updatedContent = template.content
      .replace(/Учебный взвод/g, selectedUnit)
      .replace(/учебного взвода/g, selectedUnit.toLowerCase())
      .replace(/учебного взвод/g, selectedUnit.toLowerCase())
      .replace('г. Горки', selectedCity)
    
    setDocumentContent(updatedContent)
    setDocumentType(template.type)
    setActiveTab('editor')
  }

  const createNewDocument = () => {
    setSelectedTemplate(null)
    setDocumentTitle('')
    setDocumentContent('')
    setDocumentType('конкурс')
    setActiveTab('editor')
  }

  const handleCityChange = (city) => {
    setSelectedCity(city)
    if (selectedTemplate) {
      const newTitle = documentTitle.replace(selectedCity, city)
      setDocumentTitle(newTitle)
    }
  }

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit)
    if (selectedTemplate) {
      const oldUnit = selectedUnit
      const newTitle = documentTitle.replace(oldUnit, unit)
      setDocumentTitle(newTitle)
    }
  }

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

  const drawRussianCoatOfArms = (ctx, x, y, size) => {
    ctx.save()
    ctx.translate(x, y)
    
    const gold = '#FFD700'
    const red = '#FF0000'
    const black = '#000000'
    const white = '#FFFFFF'
    const silver = '#C0C0C0'
    
    ctx.fillStyle = gold
    ctx.strokeStyle = black
    ctx.lineWidth = 2
    
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.3, size * 0.2, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    
    ctx.beginPath()
    ctx.arc(-size * 0.2, -size * 0.1, size * 0.07, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    
    ctx.beginPath()
    ctx.arc(size * 0.2, -size * 0.1, size * 0.07, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    
    const drawCrown = (cx, cy) => {
      ctx.fillStyle = gold
      ctx.fillRect(cx - size * 0.05, cy, size * 0.1, size * 0.04)
      ctx.strokeRect(cx - size * 0.05, cy, size * 0.1, size * 0.04)
      
      ctx.beginPath()
      for (let i = 0; i < 3; i++) {
        const px = cx - size * 0.04 + i * size * 0.04
        ctx.moveTo(px, cy)
        ctx.lineTo(px + size * 0.02, cy - size * 0.03)
        ctx.lineTo(px + size * 0.04, cy)
      }
      ctx.fill()
      ctx.stroke()
    }
    
    drawCrown(-size * 0.2, -size * 0.17)
    drawCrown(0, -size * 0.17)
    drawCrown(size * 0.2, -size * 0.17)
    
    ctx.fillStyle = silver
    ctx.fillRect(size * 0.12, -size * 0.05, size * 0.03, size * 0.25)
    ctx.strokeRect(size * 0.12, -size * 0.05, size * 0.03, size * 0.25)
    
    ctx.fillRect(-size * 0.15, -size * 0.05, size * 0.03, size * 0.25)
    ctx.strokeRect(-size * 0.15, -size * 0.05, size * 0.03, size * 0.25)
    
    ctx.fillStyle = gold
    ctx.beginPath()
    ctx.moveTo(size * 0.135, -size * 0.30)
    ctx.lineTo(size * 0.12, -size * 0.22)
    ctx.lineTo(size * 0.15, -size * 0.22)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    
    ctx.beginPath()
    ctx.arc(-size * 0.135, -size * 0.30, size * 0.015, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    
    ctx.fillStyle = red
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.02)
    ctx.lineTo(-size * 0.06, size * 0.05)
    ctx.lineTo(0, size * 0.12)
    ctx.lineTo(size * 0.06, size * 0.05)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    
    ctx.fillStyle = white
    ctx.strokeStyle = black
    ctx.beginPath()
    ctx.ellipse(0, size * 0.05, size * 0.03, size * 0.02, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    
    ctx.beginPath()
    ctx.arc(0, size * 0.01, size * 0.015, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(0, size * 0.0)
    ctx.lineTo(0, -size * 0.08)
    ctx.stroke()
    
    ctx.fillStyle = gold
    const drawClaw = (cx, cy) => {
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx - size * 0.03, cy + size * 0.08)
      ctx.lineTo(cx + size * 0.03, cy + size * 0.08)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    }
    
    drawClaw(-size * 0.12, size * 0.15)
    drawClaw(0, size * 0.15)
    drawClaw(size * 0.12, size * 0.15)
    
    ctx.restore()
  }

  const exportDocument = async () => {
    try {
      if (!document.createElement('canvas').getContext) {
        alert('Ваш браузер не поддерживает создание изображений')
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
      const docNumber = generateSecurityCode()
      
      const docTypeText = {
        'конкурс': 'ОБЪЯВЛЕНИЕ О КОНКУРСЕ',
        'приказ': 'П Р И К А З',
        'объявление': 'ОФИЦИАЛЬНОЕ ОБЪЯВЛЕНИЕ',
        'благодарность': 'БЛАГОДАРСТВЕННОЕ ПИСЬМО'
      }[documentType] || 'ДОКУМЕНТ'

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      const width = 2480
      const height = 3508
      
      canvas.width = width
      canvas.height = height
      
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, width, height)
      
      ctx.save()
      ctx.globalAlpha = 0.03
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 600px Times New Roman'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.rotate(-Math.PI / 4)
      for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
          ctx.fillText('2026', i * 800 + 500, j * 800 + 500)
        }
      }
      ctx.restore()
      
      const margin = 200
      const contentWidth = width - (margin * 2)
      
      drawRussianCoatOfArms(ctx, width / 2, 220, 150)
      
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 48px Times New Roman'
      ctx.textAlign = 'center'
      ctx.fillText('РОССИЙСКАЯ ФЕДЕРАЦИЯ', width / 2, 380)
      ctx.font = 'bold 42px Times New Roman'
      ctx.fillText('ГОСУДАРСТВЕННАЯ СЛУЖБА', width / 2, 440)
      ctx.fillText(`${selectedUnit.toUpperCase()} ${selectedCity.toUpperCase()}`, width / 2, 500)
      
      ctx.beginPath()
      ctx.moveTo(margin, 560)
      ctx.lineTo(width - margin, 560)
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 3
      ctx.stroke()
      
      ctx.font = '36px Arial'
      ctx.fillText('⚜️', margin - 50, 555)
      ctx.fillText('🛡️', width - margin + 50, 555)
      
      ctx.font = 'bold 80px Times New Roman'
      ctx.fillText(docTypeText, width / 2, 660)
      
      ctx.font = 'italic 36px Arial'
      ctx.fillText(`⚡ № ${docNumber}`, width / 2, 740)
      ctx.font = '36px Arial'
      ctx.fillText(`✅ «${today}» ${selectedCity}`, width / 2, 800)
      
      ctx.font = 'bold 56px Times New Roman'
      ctx.textAlign = 'left'
      const titleLines = wrapText(ctx, documentTitle, contentWidth, 56, 'Times New Roman')
      titleLines.forEach((line, index) => {
        ctx.fillText(line, margin, 900 + (index * 80))
      })
      
      const titleHeight = 900 + (titleLines.length * 80)
      ctx.font = '42px Times New Roman'
      const cleanContent = documentContent.replace(/\*\*/g, '').replace(/[⚜️🛡️🚨⭐✅🔒©®]/g, '')
      const contentLines = wrapText(ctx, cleanContent, contentWidth, 42, 'Times New Roman')
      contentLines.forEach((line, index) => {
        ctx.fillText(line, margin, titleHeight + 120 + (index * 60))
      })
      
      const contentHeight = titleHeight + 120 + (contentLines.length * 60)
      ctx.font = 'italic 28px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('🔒 Документ защищен от подделки электронной подписью и защитным кодом', width / 2, contentHeight + 80)
      
      ctx.font = 'bold 42px Times New Roman'
      ctx.textAlign = 'right'
      ctx.fillText(`Руководитель ${selectedUnit.toLowerCase()}`, width - margin, contentHeight + 180)
      
      ctx.beginPath()
      ctx.moveTo(width - margin - 400, contentHeight + 210)
      ctx.lineTo(width - margin, contentHeight + 210)
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.stroke()
      
      ctx.font = 'italic 36px Arial'
      ctx.fillText('(подпись)', width - margin - 200, contentHeight + 260)
      ctx.fillText('И.И. Иванов', width - margin - 200, contentHeight + 310)
      
      ctx.beginPath()
      ctx.arc(width - margin - 100, contentHeight + 300, 70, 0, Math.PI * 2)
      ctx.strokeStyle = '#FF0000'
      ctx.lineWidth = 4
      ctx.stroke()
      
      ctx.beginPath()
      ctx.arc(width - margin - 100, contentHeight + 300, 50, 0, Math.PI * 2)
      ctx.strokeStyle = '#FF0000'
      ctx.lineWidth = 2
      ctx.stroke()
      
      ctx.font = 'bold 20px Arial'
      ctx.fillStyle = '#FF0000'
      ctx.textAlign = 'center'
      ctx.fillText('⚜️ ПЕЧАТЬ ⚜️', width - margin - 100, contentHeight + 290)
      ctx.fillText(selectedUnit.toUpperCase().substring(0, 12), width - margin - 100, contentHeight + 320)
      ctx.fillText('2025-2026', width - margin - 100, contentHeight + 350)
      
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 5
      ctx.strokeRect(50, 50, width - 100, height - 100)
      
      ctx.font = '48px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('⚜️', 100, 100)
      ctx.fillText('⚜️', width - 100, 100)
      ctx.fillText('⚜️', 100, height - 100)
      ctx.fillText('⚜️', width - 100, height - 100)

      const link = document.createElement('a')
      link.download = `Документ_${selectedUnit}_${docNumber}.png`
      link.href = canvas.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setIsGenerating(false)
      alert(`✅ Документ успешно сохранен с защитным кодом!\n${selectedUnit}, ${selectedCity}`)

    } catch (error) {
      console.error('Ошибка:', error)
      alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.')
      setIsGenerating(false)
    }
  }

  const handleBoldText = () => {
    const textarea = document.getElementById('documentContent')
    if (!textarea) return
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = documentContent.substring(start, end)
    const newText = documentContent.substring(0, start) + '**' + selectedText + '**' + documentContent.substring(end)
    setDocumentContent(newText)
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + 2, end + 2)
    }, 0)
  }

  const addSecuritySymbol = (symbol) => {
    const textarea = document.getElementById('documentContent')
    if (!textarea) return
    
    const start = textarea.selectionStart
    const newText = documentContent.substring(0, start) + symbol + documentContent.substring(start)
    setDocumentContent(newText)
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + symbol.length, start + symbol.length)
    }, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-4 md:p-8">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mr-4 border-4 border-blue-100">
            <span className="text-3xl text-blue-600">📄</span>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Генератор служебных документов
            </h1>
            <p className="text-gray-600">
              🛡️ Создание защищенных документов 2025-2026
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <span className="mr-2">🏙️</span>
                Город расположения
              </label>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCityChange(city)}
                    className={`px-4 py-2 rounded-lg transition-all ${selectedCity === city ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {city}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Выбран: <span className="font-semibold">{selectedCity}</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <span className="mr-2">🏢</span>
                Подразделение
              </label>
              <div className="flex flex-wrap gap-2">
                {units.map((unit) => (
                  <button
                    key={unit}
                    onClick={() => handleUnitChange(unit)}
                    className={`px-4 py-2 rounded-lg transition-all ${selectedUnit === unit ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Выбрано: <span className="font-semibold">{selectedUnit}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'templates' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50 shadow'}`}
          >
            📁 Шаблоны 2025-2026
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'editor' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50 shadow'}`}
          >
            ✏️ Редактор с защитой
          </button>
          <button
            onClick={exportDocument}
            disabled={isGenerating}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${isGenerating ? 'bg-gray-400' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'}`}
          >
            {isGenerating ? (
              <>
                <span className="animate-spin inline-block mr-2">🔄</span>
                Генерация...
              </>
            ) : (
              <>
                <span className="mr-2">🛡️</span>
                Сохранить с защитой
              </>
            )}
          </button>
        </div>

        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={createNewDocument}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-3 border-dashed border-gray-300 hover:border-blue-500 flex flex-col items-center justify-center h-72 group"
            >
              <div className="text-6xl mb-6 group-hover:text-blue-500 transition-colors">➕</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Новый документ</h3>
              <p className="text-gray-600 text-center">Защищенный документ 2025-2026</p>
              <p className="text-sm text-gray-400 mt-2">{selectedUnit}, {selectedCity}</p>
            </button>

            {templates.map((template) => {
              const templateWithLocation = {
                ...template,
                title: template.title
                  .replace('Учебный взвод', selectedUnit)
                  .replace('г. Горки', selectedCity)
              }
              
              return (
                <div
                  key={template.id}
                  className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-gray-200 hover:border-blue-500"
                  onClick={() => loadTemplate(templateWithLocation)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">{template.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${template.type === 'конкурс' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : template.type === 'приказ' ? 'bg-red-50 text-red-700 border border-red-200' : template.type === 'объявление' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                          {template.type}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {template.year} год
                        </span>
                      </div>
                    </div>
                    <div className="text-4xl opacity-80">{template.name.charAt(0)}</div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Подразделение:</p>
                    <p className="font-medium text-gray-700">{selectedUnit}</p>
                  </div>
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-1">Город:</p>
                    <p className="font-medium text-gray-700">{selectedCity}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Защита:</p>
                    <div className="flex gap-1">
                      <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">⚜️</span>
                      <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded">✅</span>
                      <span className="text-sm px-2 py-1 bg-red-100 text-red-700 rounded">🛡️</span>
                    </div>
                  </div>
                  <p className="text-gray-600 line-clamp-3 mb-6">{template.content.substring(0, 150)}...</p>
                  <button className="text-blue-600 font-semibold hover:text-blue-800 flex items-center">
                    Использовать шаблон 
                    <span className="ml-2">→</span>
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'editor' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-1 p-8 border-r border-gray-200 bg-gray-50">
                <div className="space-y-8">
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      <span className="mr-2">🏙️</span>
                      Город
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl text-lg bg-white shadow-sm"
                    >
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      <span className="mr-2">🏢</span>
                      Подразделение
                    </label>
                    <select
                      value={selectedUnit}
                      onChange={(e) => handleUnitChange(e.target.value)}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl text-lg bg-white shadow-sm"
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      <span className="mr-2">📝</span>
                      Тип документа
                    </label>
                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl text-lg bg-white shadow-sm"
                    >
                      <option value="конкурс">🏆 Конкурс 2026</option>
                      <option value="приказ">⚡ Приказ 2026</option>
                      <option value="объявление">📢 Объявление 2026</option>
                      <option value="благодарность">🎖️ Благодарность 2025</option>
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
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl text-lg bg-white shadow-sm"
                      placeholder="Введите заголовок..."
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap justify-between items-center mb-3">
                      <label className="block text-lg font-semibold text-gray-800 mb-2">
                        <span className="mr-2">📄</span>
                        Содержание документа
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={handleBoldText}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-800 shadow-sm"
                        >
                          B (жирный)
                        </button>
                        <div className="relative group">
                          <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 shadow-sm">
                            🛡️ Защита
                          </button>
                          <div className="absolute hidden group-hover:block bg-white shadow-xl rounded-lg p-2 z-10 mt-1">
                            <div className="flex gap-2 flex-wrap">
                              {Object.entries(securityElements).map(([key, value]) => (
                                <button
                                  key={key}
                                  onClick={() => addSecuritySymbol(value.symbol)}
                                  className="p-2 hover:bg-gray-100 rounded"
                                  title={value.text}
                                >
                                  {value.symbol}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <textarea
                      id="documentContent"
                      value={documentContent}
                      onChange={(e) => setDocumentContent(e.target.value)}
                      className="w-full h-80 px-5 py-4 border-2 border-gray-300 rounded-xl text-lg bg-white shadow-sm resize-none"
                      placeholder="Введите текст документа..."
                    />
                    
                    {showSuggestions && autoCompleteSuggestions.length > 0 && (
                      <div className="mt-4 border border-blue-200 rounded-lg bg-blue-50 p-4">
                        <p className="text-blue-800 font-medium mb-2">🔍 Автозаполнение:</p>
                        <div className="space-y-2">
                          {autoCompleteSuggestions.map(([key, data]) => (
                            <button
                              key={key}
                              onClick={() => applyAutoComplete(key)}
                              className="w-full text-left p-3 bg-white hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                            >
                              <div className="font-medium text-blue-700">{data.title}</div>
                              <div className="text-sm text-gray-600 truncate">{data.content.substring(0, 80)}...</div>
                            </button>
                          ))}
                        </div>
                        <p className="text-sm text-blue-600 mt-2">
                          Начните вводить "отпуск", "благодарность" и т.д.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-8 border-t border-gray-300">
                    <button
                      onClick={exportDocument}
                      disabled={isGenerating}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${isGenerating ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'} text-white flex items-center justify-center`}
                    >
                      {isGenerating ? (
                        <>
                          <span className="animate-spin inline-block mr-3">🔄</span>
                          Генерация защищенного документа...
                        </>
                      ) : (
                        <>
                          <span className="mr-3">⚜️</span>
                          Сохранить документ с защитой
                        </>
                      )}
                    </button>
                    <p className="mt-4 text-center text-gray-600 text-sm">
                      ⚡ Документ будет содержать защитный код, водяные знаки и электронную подпись
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    <span className="mr-3">👁️</span>
                    Предпросмотр защищенного документа
                  </h3>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-600">
                      {selectedUnit}, {selectedCity}
                    </p>
                    <div className="flex gap-1">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">⚜️ Оригинал</span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">✅ Проверено</span>
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">🛡️ Защищено</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 border-2 border-gray-300 rounded-2xl p-8 min-h-[700px]">
                  <div className="bg-white rounded-xl p-12 shadow-inner h-full overflow-auto relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                      <div className="text-9xl font-bold text-gray-400 rotate-45">2025-2026</div>
                    </div>
                    
                    <div className="text-center mb-12 relative z-10">
                      <div className="flex justify-center mb-8">
                        <div className="relative">
                          <div className="w-32 h-32 bg-gradient-to-b from-yellow-200 to-yellow-100 border-4 border-yellow-300 rounded-full flex items-center justify-center shadow-lg">
                            <div className="text-6xl">🇷🇺</div>
                          </div>
                          <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            ГЕРБ РФ 2025
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 tracking-wide">РОССИЙСКАЯ ФЕДЕРАЦИЯ</h2>
                        <h3 className="text-xl font-bold text-gray-800">ГОСУДАРСТВЕННАЯ СЛУЖБА</h3>
                        <h4 className="text-lg font-semibold text-gray-700">{selectedUnit.toUpperCase()}</h4>
                        <h5 className="text-md font-medium text-gray-600">{selectedCity.toUpperCase()}</h5>
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

                    <div className="text-center mb-12 space-y-4 relative z-10">
                      <div className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-lg text-blue-700 font-mono">
                          ⚡ {generateSecurityCode()}
                        </p>
                      </div>
                      <p className="text-lg text-gray-600">
                        ✅ «{new Date().toLocaleDateString('ru-RU')}» {selectedCity}
                      </p>
                    </div>

                    {documentTitle && (
                      <div className="mb-10 relative z-10">
                        <h2 className="text-2xl font-bold text-gray-800 text-center border-b-2 border-blue-200 pb-4">
                          {documentTitle}
                        </h2>
                      </div>
                    )}

                    {documentContent && (
                      <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line mb-16 relative z-10">
                        {documentContent.split('**').map((text, index) => (
                          index % 2 === 1 ? (
                            <strong key={index} className="font-bold text-gray-900">{text}</strong>
                          ) : (
                            text
                          )
                        ))}
                      </div>
                    )}

                    <div className="mt-20 pt-12 border-t-2 border-gray-300 relative z-10">
                      <div className="flex justify-between items-end">
                        <div className="relative">
                          <div className="w-32 h-32 border-4 border-red-500 rounded-full flex items-center justify-center bg-white">
                            <div className="text-center">
                              <p className="text-sm font-bold text-red-500">⚜️ М.П. ⚜️</p>
                              <p className="text-xs text-red-500 mt-1">ПЕЧАТЬ</p>
                              <p className="text-xs text-red-500">{selectedUnit.toUpperCase()}</p>
                              <p className="text-xs text-red-500 mt-1">2025-2026</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900 mb-12">Руководитель {selectedUnit.toLowerCase()}</p>
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
              <p className="text-gray-600 text-sm mt-1">Версия 3.0 • Защищенные документы 2025-2026</p>
              <p className="text-gray-500 text-xs mt-1">© 2025 Разработано для государственной службы</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">РФ</span>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Российская Федерация</p>
                <p className="text-gray-600 text-sm">Документы 2025-2026 гг.</p>
              </div>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            <p>🛡️ Все документы защищены от подделки уникальными кодами и символами</p>
            <p className="mt-2">Текущая конфигурация: {selectedUnit}, {selectedCity} • Период: 2025-2026</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
