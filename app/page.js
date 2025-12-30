'use client'

import { useState, useEffect } from 'react'

export default function DocumentGenerator() {
  const [activeTab, setActiveTab] = useState('templates')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [documentTitle, setDocumentTitle] = useState('')
  const [documentContent, setDocumentContent] = useState('')
  const [documentType, setDocumentType] = useState('объявление')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const [selectedCity, setSelectedCity] = useState('г. Горки')
  const [selectedUnit, setSelectedUnit] = useState('Учебный взвод ДПС')
  const [recipientType, setRecipientType] = useState('general')
  const [recipientName, setRecipientName] = useState('')
  const [employeePosition, setEmployeePosition] = useState('')
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const cities = ['г. Горки', 'г. Новороссийск', 'г. Москва']
  const units = [
    'Рота ДПС',
    'Учебный взвод ДПС',
    'Главное командование ДПС'
  ]

  const recipientTypes = [
    { id: 'general', name: 'Всем сотрудникам' },
    { id: 'department', name: 'Сотрудникам подразделения' },
    { id: 'specific', name: 'Конкретному сотруднику' }
  ]

  const autoCompleteData = {
    'отпуск': {
      title: 'Заявление на отпуск',
      content: `Прошу предоставить мне ежегодный оплачиваемый отпуск с [дата начала] по [дата окончания] продолжительностью [количество] календарных дней.\n\nОснование: Трудовой кодекс РФ, статья 115.`
    },
    'командировка': {
      title: 'Приказ о командировании',
      content: `В целях выполнения служебного задания,\n\nПРИКАЗЫВАЮ:\n\n1. Командировать [ФИО сотрудника] в [город назначения] с [дата выезда] по [дата возвращения].\n2. Служебное задание: [цель командировки].\n3. Финансовое обеспечение произвести за счет средств, предусмотренных сметой.`
    },
    'благодарность': {
      title: 'Приказ о поощрении',
      content: `За добросовестное выполнение служебных обязанностей, проявленную инициативу и высокие результаты в работе,\n\nПРИКАЗЫВАЮ:\n\n1. Объявить благодарность [ФИО сотрудника].\n2. Выплатить денежную премию в размере [сумма] рублей.\n3. Внести запись в трудовую книжку о поощрении.`
    },
    'выговор': {
      title: 'Приказ о дисциплинарном взыскании',
      content: `В связи с нарушением служебной дисциплины, выразившемся в [описание нарушения],\n\nПРИКАЗЫВАЮ:\n\n1. Объявить выговор [ФИО сотрудника].\n2. Удержать из заработной платы сумму причиненного ущерба в размере [сумма] рублей.\n3. Направить на внеочередную аттестацию.`
    },
    'назначение': {
      title: 'Приказ о назначении на должность',
      content: `В соответствии со штатным расписанием и на основании решения аттестационной комиссии,\n\nПРИКАЗЫВАЮ:\n\n1. Назначить [ФИО] на должность [название должности] в [название подразделения] с [дата назначения].\n2. Установить оклад в соответствии с должностной инструкцией.\n3. Назначить испытательный срок [продолжительность] месяцев.`
    }
  }

  const generateDocumentNumber = () => {
    const year = new Date().getFullYear()
    const unitCode = selectedUnit.includes('Рота') ? 'РД' : 
                    selectedUnit.includes('Учебный') ? 'УВ' : 'ГК'
    const cityCode = selectedCity.includes('Горки') ? 'ГК' : 
                     selectedCity.includes('Новороссийск') ? 'НО' : 'МС'
    const random = Math.floor(Math.random() * 999).toString().padStart(3, '0')
    return `${random}${year % 100}-${unitCode}/${cityCode}`
  }

  const getRecipientText = () => {
    switch (recipientType) {
      case 'general':
        return 'Всем сотрудникам'
      case 'department':
        return `Сотрудникам ${selectedUnit}`
      case 'specific':
        return recipientName ? `Сотруднику ${recipientName} ${employeePosition ? `(${employeePosition})` : ''}` : 'Конкретному сотруднику'
      default:
        return 'Всем сотрудникам'
    }
  }

  const insertRecipientInfo = (content) => {
    let updatedContent = content
    
    switch (recipientType) {
      case 'general':
        updatedContent = updatedContent.replace(/\[ФИО сотрудника\]/g, 'сотруднику')
        updatedContent = updatedContent.replace(/\[ФИО\]/g, 'сотруднику')
        break
      case 'department':
        updatedContent = updatedContent.replace(/\[ФИО сотрудника\]/g, `сотрудникам ${selectedUnit}`)
        updatedContent = updatedContent.replace(/\[ФИО\]/g, `сотрудникам ${selectedUnit}`)
        break
      case 'specific':
        if (recipientName) {
          updatedContent = updatedContent.replace(/\[ФИО сотрудника\]/g, recipientName)
          updatedContent = updatedContent.replace(/\[ФИО\]/g, recipientName)
        }
        break
    }
    
    return updatedContent
  }

  const templates = [
    {
      id: 1,
      name: "Конкурс «Лучший сотрудник»",
      type: "объявление",
      title: `Объявление о конкурсе «Лучший сотрудник ДПС»`,
      content: `МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ РОССИЙСКОЙ ФЕДЕРАЦИИ
${selectedUnit.toUpperCase()} ${selectedCity}

ОБЪЯВЛЕНИЕ О КОНКУРСЕ
№ ${generateDocumentNumber()}

от ${new Date().toLocaleDateString('ru-RU')}

«Конкурс «Лучший сотрудник ДПС ${selectedUnit} ${selectedCity}»»

В целях повышения эффективности служебной деятельности, мотивации личного состава и поощрения лучших сотрудников руководством ${selectedUnit.toLowerCase()} принято решение о проведении ежегодного конкурса профессионального мастерства.

КРИТЕРИИ ОЦЕНКИ УЧАСТНИКОВ:

1. Профессиональное мастерство и знание служебных инструкций
2. Исполнительность и служебная дисциплина
3. Результаты оперативно-служебной деятельности
4. Инициативность и лидерские качества

СРОКИ ПРОВЕДЕНИЯ:

• Начало: 30 декабря ${new Date().getFullYear()} года в 08:00 (МСК)
• Окончание: 31 декабря ${new Date().getFullYear()} года в 19:00 (МСК)

НАГРАДА ПОБЕДИТЕЛЮ:

Денежное вознаграждение в размере 1 000 000 (один миллион) рублей.

Конкурс проводится в соответствии с планом служебно-боевой подготовки на ${new Date().getFullYear()} год.

Документ составлен: ${new Date().toLocaleDateString('ru-RU')}
ДЛЯ СЛУЖЕБНОГО ПОЛЬЗОВАНИЯ`,
      year: new Date().getFullYear()
    },
    {
      id: 2,
      name: "Приказ о служебной подготовке",
      type: "приказ",
      title: `Приказ об организации служебной подготовки`,
      content: `МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ РОССИЙСКОЙ ФЕДЕРАЦИИ
${selectedUnit.toUpperCase()} ${selectedCity}

ПРИКАЗ
№ ${generateDocumentNumber()}

от ${new Date().toLocaleDateString('ru-RU')}

«Организация служебной подготовки в ${selectedUnit} ${selectedCity}»

Во исполнение плана служебно-боевой подготовки на ${new Date().getFullYear()} год, ПРИКАЗЫВАЮ:

1. Утвердить план служебной подготовки личного состава на I квартал ${new Date().getFullYear()} года.
2. Назначить ответственным за организацию служебной подготовки ${selectedUnit.toLowerCase()}.
3. Провести внеплановую проверку знаний служебных инструкций до 15 января ${new Date().getFullYear()} года.
4. Обеспечить 100% явку личного состава на занятия по служебной подготовке.
5. Контроль за исполнением настоящего приказа возложить на ответственного.

Настоящий приказ довести до всего личного состава ${selectedUnit.toLowerCase()}.

Документ составлен: ${new Date().toLocaleDateString('ru-RU')}
СЛУЖЕБНЫЙ ДОКУМЕНТ`,
      year: new Date().getFullYear()
    },
    {
      id: 3,
      name: "Благодарственное письмо",
      type: "благодарность",
      title: `Благодарственное письмо сотруднику`,
      content: `МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ РОССИЙСКОЙ ФЕДЕРАЦИИ
${selectedUnit.toUpperCase()} ${selectedCity}

БЛАГОДАРСТВЕННОЕ ПИСЬМО
№ ${generateDocumentNumber()}

от ${new Date().toLocaleDateString('ru-RU')}

Уважаемый [ФИО сотрудника]!

Выражаем Вам искреннюю благодарность за добросовестное исполнение служебных обязанностей, высокий профессионализм и личный вклад в обеспечение правопорядка на территории ${selectedCity}.

Ваша работа отмечена по следующим критериям:

• Отличные результаты в служебной деятельности в ${new Date().getFullYear()} году
• Ответственное отношение к выполнению поставленных задач
• Проявление инициативы и творческого подхода
• Наставничество и помощь коллегам

За проявленное усердие и достигнутые успехи Вас рекомендовано представить к денежной премии в размере 150 000 рублей.

Желаем Вам дальнейших успехов в службе, крепкого здоровья и благополучия!

С уважением,
руководство ${selectedUnit}

Документ составлен: ${new Date().toLocaleDateString('ru-RU')}
ДЛЯ СЛУЖЕБНОГО ПОЛЬЗОВАНИЯ`,
      year: new Date().getFullYear()
    },
    {
      id: 4,
      name: "Распоряжение о собрании",
      type: "распоряжение",
      title: `Распоряжение о проведении собрания`,
      content: `МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ РОССИЙСКОЙ ФЕДЕРАЦИИ
${selectedUnit.toUpperCase()} ${selectedCity}

РАСПОРЯЖЕНИЕ
№ ${generateDocumentNumber()}

от ${new Date().toLocaleDateString('ru-RU')}

«О проведении общего собрания ${selectedUnit} ${selectedCity}»

Доводим до сведения личного состава ${selectedUnit.toLowerCase()} следующую информацию:

15 января ${new Date().getFullYear() + 1} года в 15:00 в актовом зале состоится общее собрание личного состава.

ПОВЕСТКА ДНЯ:

1. Подведение итогов работы за ${new Date().getFullYear()} год.
2. Обсуждение планов на ${new Date().getFullYear() + 1} год.
3. Организационные вопросы.
4. Разное.

ЯВКА ВСЕХ СОТРУДНИКОВ ОБЯЗАТЕЛЬНА.

С собой иметь служебное удостоверение.

Документ составлен: ${new Date().toLocaleDateString('ru-RU')}
СЛУЖЕБНЫЙ ДОКУМЕНТ`,
      year: new Date().getFullYear()
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

  useEffect(() => {
    if (selectedTemplate) {
      let updatedContent = selectedTemplate.content
      
      // Обновляем номер документа
      updatedContent = updatedContent.replace(/№ [A-Z0-9/-]+/, `№ ${generateDocumentNumber()}`)
      
      // Вставляем информацию об адресате
      updatedContent = insertRecipientInfo(updatedContent)
      
      setDocumentContent(updatedContent)
    }
  }, [recipientType, recipientName, employeePosition, selectedUnit, selectedCity])

  const applyAutoComplete = (key) => {
    const data = autoCompleteData[key]
    if (data) {
      setDocumentTitle(data.title)
      const contentWithRecipient = insertRecipientInfo(data.content)
      setDocumentContent(prev => {
        const lines = prev.split('\n')
        lines.pop()
        return [...lines, contentWithRecipient].join('\n')
      })
      setShowSuggestions(false)
    }
  }

  const loadTemplate = (template) => {
    const updatedTemplate = {
      ...template,
      title: template.title
    }
    
    setSelectedTemplate(updatedTemplate)
    setDocumentTitle(updatedTemplate.title)
    
    let updatedContent = template.content
      .replace(/Учебный взвод ДПС/g, selectedUnit)
      .replace(/г\. Горки/g, selectedCity)
    
    // Обновляем номер документа
    updatedContent = updatedContent.replace(/№ [A-Z0-9/-]+/, `№ ${generateDocumentNumber()}`)
    
    // Вставляем информацию об адресате
    updatedContent = insertRecipientInfo(updatedContent)
    
    setDocumentContent(updatedContent)
    setDocumentType(template.type)
    setActiveTab('editor')
  }

  const createNewDocument = () => {
    setSelectedTemplate(null)
    setDocumentTitle('')
    setDocumentContent('')
    setDocumentType('объявление')
    setRecipientType('general')
    setRecipientName('')
    setEmployeePosition('')
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

  const handleRecipientTypeChange = (type) => {
    setRecipientType(type)
    if (type !== 'specific') {
      setRecipientName('')
      setEmployeePosition('')
    }
  }

  const insertEmployeeName = () => {
    if (recipientName) {
      const textarea = document.getElementById('documentContent')
      if (!textarea) return
      
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = documentContent.substring(start, end)
      const newText = documentContent.substring(0, start) + recipientName + (employeePosition ? ` (${employeePosition})` : '') + documentContent.substring(end)
      setDocumentContent(newText)
      
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + recipientName.length + (employeePosition ? employeePosition.length + 3 : 0), start + recipientName.length + (employeePosition ? employeePosition.length + 3 : 0))
      }, 0)
    }
  }

  const wrapText = (context, text, maxWidth, fontSize, fontFamily = 'Times New Roman') => {
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

  const addWatermark = (ctx, text, width, height) => {
    ctx.save()
    ctx.globalAlpha = 0.03
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 280px "Times New Roman"'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    ctx.translate(width / 2, height / 2)
    ctx.rotate(-Math.PI / 4)
    
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        ctx.fillText(text, i * 650, j * 650)
      }
    }
    
    ctx.restore()
  }

  const addSecurityPattern = (ctx, width, height, docNumber) => {
    ctx.save()
    ctx.globalAlpha = 0.02
    
    // Мелкий повторяющийся текст
    ctx.font = '14px "Arial"'
    ctx.fillStyle = '#000000'
    
    for (let x = 60; x < width; x += 200) {
      for (let y = 60; y < height; y += 150) {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(Math.PI / 6)
        ctx.fillText(docNumber, 0, 0)
        ctx.fillText('МВД РОССИИ', 0, 20)
        ctx.fillText(selectedUnit, 0, 40)
        ctx.restore()
      }
    }
    
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
      const docNumber = generateDocumentNumber()
      
      const docTypeText = {
        'объявление': 'ОБЪЯВЛЕНИЕ О КОНКУРСЕ',
        'приказ': 'ПРИКАЗ',
        'благодарность': 'БЛАГОДАРСТВЕННОЕ ПИСЬМО',
        'распоряжение': 'РАСПОРЯЖЕНИЕ'
      }[documentType] || 'ДОКУМЕНТ'

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      const width = 2100
      const height = 2970
      
      canvas.width = width
      canvas.height = height
      
      // Белый фон
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, width, height)
      
      // Водяные знаки и защита
      addWatermark(ctx, 'МВД РОССИИ', width, height)
      addSecurityPattern(ctx, width, height, docNumber)
      
      // Основные поля документа
      const margin = 150
      const contentWidth = width - (margin * 2)
      
      // Заголовок министерства
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 32px "Times New Roman"'
      ctx.textAlign = 'center'
      ctx.fillText('МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ РОССИЙСКОЙ ФЕДЕРАЦИИ', width / 2, 180)
      ctx.font = 'bold 28px "Times New Roman"'
      ctx.fillText(`${selectedUnit.toUpperCase()} ${selectedCity.toUpperCase()}`, width / 2, 230)
      
      // Линия разделения
      ctx.beginPath()
      ctx.moveTo(margin, 280)
      ctx.lineTo(width - margin, 280)
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 1
      ctx.stroke()
      
      // Тип документа
      ctx.font = 'bold 36px "Times New Roman"'
      ctx.fillText(docTypeText, width / 2, 340)
      
      // Номер документа
      ctx.font = 'bold 24px "Times New Roman"'
      ctx.fillText(`№ ${docNumber}`, width / 2, 400)
      
      // Дата
      ctx.font = '20px "Times New Roman"'
      ctx.fillText(`от ${today}`, width / 2, 450)
      
      // Название документа
      ctx.font = 'bold 28px "Times New Roman"'
      ctx.textAlign = 'center'
      const titleLines = wrapText(ctx, documentTitle, contentWidth, 28, 'Times New Roman')
      titleLines.forEach((line, index) => {
        ctx.fillText(`«${line}»`, width / 2, 520 + (index * 40))
      })
      
      const titleHeight = 520 + (titleLines.length * 40)
      
      // Содержание документа с заменой адресата
      let finalContent = documentContent
      // Убираем лишние части из контента
      const lines = finalContent.split('\n')
      const startIndex = lines.findIndex(line => line.includes('В целях') || line.includes('Во исполнение') || line.includes('Уважаемый') || line.includes('Доводим'))
      const contentStart = startIndex !== -1 ? startIndex : 0
      const cleanContent = lines.slice(contentStart).join('\n')
        .replace(/Документ составлен:.*/g, '')
        .replace(/ДЛЯ СЛУЖЕБНОГО ПОЛЬЗОВАНИЯ/g, '')
        .replace(/СЛУЖЕБНЫЙ ДОКУМЕНТ/g, '')
        .replace(/МИНИСТЕРСТВО.*/g, '')
        .replace(/ОБЪЯВЛЕНИЕ О КОНКУРСЕ.*/g, '')
        .replace(/ПРИКАЗ.*/g, '')
        .replace(/БЛАГОДАРСТВЕННОЕ ПИСЬМО.*/g, '')
        .replace(/РАСПОРЯЖЕНИЕ.*/g, '')
        .replace(/№.*/g, '')
        .replace(/от.*/g, '')
        .replace(/«.*»/g, '')
        .replace(/\*\*/g, '')
      
      ctx.font = '24px "Times New Roman"'
      ctx.textAlign = 'left'
      const contentLines = wrapText(ctx, cleanContent, contentWidth, 24, 'Times New Roman')
      contentLines.forEach((line, index) => {
        ctx.fillText(line, margin, titleHeight + 40 + (index * 36))
      })
      
      const contentHeight = titleHeight + 40 + (contentLines.length * 36)
      
      // Подпись и печать
      ctx.font = 'bold 22px "Times New Roman"'
      ctx.textAlign = 'right'
      ctx.fillText(`Начальник ${selectedUnit.toLowerCase()}`, width - margin, contentHeight + 100)
      
      ctx.font = '20px "Times New Roman"'
      ctx.fillText('________________', width - margin, contentHeight + 140)
      ctx.fillText('(подпись)', width - margin, contentHeight + 170)
      
      // Информация внизу
      ctx.font = '18px "Times New Roman"'
      ctx.textAlign = 'left'
      ctx.fillText(`Документ составлен: ${today}`, margin, contentHeight + 220)
      ctx.fillText('ДЛЯ СЛУЖЕБНОГО ПОЛЬЗОВАНИЯ', margin, contentHeight + 250)
      
      // Защитный код внизу
      ctx.font = '14px "Courier New"'
      ctx.textAlign = 'center'
      ctx.fillStyle = '#666666'
      ctx.fillText(`Защитный код документа: ${docNumber} | Документ сформирован автоматически`, width / 2, height - 60)
      
      // Рамка документа
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 1
      ctx.strokeRect(40, 40, width - 80, height - 80)

      // Экспорт
      const link = document.createElement('a')
      const safeUnitName = selectedUnit.replace(/[^a-zA-ZА-Яа-я0-9]/g, '_')
      const safeCode = docNumber.replace(/\//g, '-')
      link.download = `Документ_${safeUnitName}_${safeCode}.png`
      link.href = canvas.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setIsGenerating(false)
      alert(`Документ успешно сохранен!\n${selectedUnit}, ${selectedCity}`)

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mr-4 border-4 border-blue-50">
            <span className="text-3xl text-blue-800">📋</span>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Генератор служебных документов ДПС
            </h1>
            <p className="text-gray-700">
              Официальное оформление документов МВД России
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-3">
                Город
              </label>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCityChange(city)}
                    className={`px-4 py-2 rounded-lg transition-all ${selectedCity === city ? 'bg-blue-700 text-white shadow-md' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300'}`}
                  >
                    {city}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Выбран: <span className="font-semibold">{selectedCity}</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-3">
                Подразделение
              </label>
              <div className="flex flex-wrap gap-2">
                {units.map((unit) => (
                  <button
                    key={unit}
                    onClick={() => handleUnitChange(unit)}
                    className={`px-4 py-2 rounded-lg transition-all ${selectedUnit === unit ? 'bg-green-700 text-white shadow-md' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300'}`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Выбрано: <span className="font-semibold">{selectedUnit}</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-3">
                Адресат документа
              </label>
              <select
                value={recipientType}
                onChange={(e) => handleRecipientTypeChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 mb-3"
              >
                {recipientTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
              
              {recipientType === 'specific' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ФИО сотрудника
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800"
                      placeholder="Иванов Иван Иванович"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Должность сотрудника
                    </label>
                    <input
                      type="text"
                      value={employeePosition}
                      onChange={(e) => setEmployeePosition(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800"
                      placeholder="старший инспектор"
                    />
                  </div>
                  <button
                    onClick={insertEmployeeName}
                    disabled={!recipientName}
                    className={`w-full px-4 py-2 rounded-lg ${!recipientName ? 'bg-gray-300 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    Вставить ФИО в документ
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'templates' ? 'bg-blue-800 text-white shadow-lg' : 'bg-white text-gray-800 hover:bg-gray-50 shadow border border-gray-300'}`}
          >
            Шаблоны документов
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'editor' ? 'bg-blue-800 text-white shadow-lg' : 'bg-white text-gray-800 hover:bg-gray-50 shadow border border-gray-300'}`}
          >
            Редактор документа
          </button>
          <button
            onClick={exportDocument}
            disabled={isGenerating}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${isGenerating ? 'bg-gray-400' : 'bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white shadow-lg hover:shadow-xl'}`}
          >
            {isGenerating ? (
              <>
                <span className="animate-spin inline-block mr-2">⏳</span>
                Генерация...
              </>
            ) : (
              'Сохранить документ'
            )}
          </button>
        </div>

        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={createNewDocument}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-3 border-dashed border-gray-400 hover:border-blue-600 flex flex-col items-center justify-center h-72 group"
            >
              <div className="text-5xl mb-6 group-hover:text-blue-600 transition-colors">+</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Новый документ</h3>
              <p className="text-gray-700 text-center">Создание официального документа</p>
              <p className="text-sm text-gray-500 mt-2">{selectedUnit}, {selectedCity}</p>
            </button>

            {templates.map((template) => {
              const templateWithLocation = {
                ...template,
                title: template.title
              }
              
              return (
                <div
                  key={template.id}
                  className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-gray-300 hover:border-blue-600"
                  onClick={() => loadTemplate(templateWithLocation)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{template.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${template.type === 'объявление' ? 'bg-blue-50 text-blue-800 border border-blue-200' : template.type === 'приказ' ? 'bg-red-50 text-red-800 border border-red-200' : template.type === 'благодарность' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-purple-50 text-purple-800 border border-purple-200'}`}>
                          {template.type.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {template.year} год
                        </span>
                      </div>
                    </div>
                    <div className="text-4xl opacity-80">📄</div>
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
                    <p className="text-sm text-gray-500 mb-1">Адресат:</p>
                    <p className="font-medium text-gray-700">{getRecipientText()}</p>
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
                      Адресат документа
                    </label>
                    <select
                      value={recipientType}
                      onChange={(e) => handleRecipientTypeChange(e.target.value)}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl text-lg bg-white shadow-sm mb-3"
                    >
                      {recipientTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                    
                    {recipientType === 'specific' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ФИО сотрудника
                          </label>
                          <input
                            type="text"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg bg-white shadow-sm"
                            placeholder="Иванов Иван Иванович"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Должность сотрудника
                          </label>
                          <input
                            type="text"
                            value={employeePosition}
                            onChange={(e) => setEmployeePosition(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg bg-white shadow-sm"
                            placeholder="старший инспектор"
                          />
                        </div>
                        <button
                          onClick={insertEmployeeName}
                          disabled={!recipientName}
                          className={`w-full px-4 py-3 rounded-xl text-lg font-medium ${!recipientName ? 'bg-gray-300 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        >
                          Вставить ФИО в документ
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Тип документа
                    </label>
                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl text-lg bg-white shadow-sm"
                    >
                      <option value="объявление">Объявление</option>
                      <option value="приказ">Приказ</option>
                      <option value="благодарность">Благодарность</option>
                      <option value="распоряжение">Распоряжение</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
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
                        Содержание документа
                      </label>
                      <button
                        onClick={handleBoldText}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-800 shadow-sm border border-gray-300"
                      >
                        Жирный текст
                      </button>
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
                        <p className="text-blue-800 font-medium mb-2">Автозаполнение:</p>
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
                          <span className="animate-spin inline-block mr-3">⏳</span>
                          Генерация документа...
                        </>
                      ) : (
                        'Сохранить документ'
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Предпросмотр документа
                  </h3>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-600">
                      {selectedUnit}, {selectedCity}
                    </p>
                  </div>
                  <p className="mt-2 text-gray-600">
                    <span className="font-medium">Адресат:</span> {getRecipientText()}
                  </p>
                </div>
                
                <div className="bg-gray-100 border-2 border-gray-300 rounded-2xl p-8 min-h-[700px]">
                  <div className="bg-white rounded-xl p-12 shadow-inner h-full overflow-auto relative">
                    <div className="text-center mb-12">
                      <div className="space-y-3 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 tracking-wide">МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ РОССИЙСКОЙ ФЕДЕРАЦИИ</h2>
                        <h3 className="text-xl font-bold text-gray-800">{selectedUnit.toUpperCase()} {selectedCity.toUpperCase()}</h3>
                      </div>
                      
                      <div className="relative py-6">
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                        <div className="relative bg-white px-8 inline-block">
                          <h1 className="text-3xl font-bold text-gray-900 tracking-wider">
                            {documentType === 'объявление' ? 'ОБЪЯВЛЕНИЕ О КОНКУРСЕ' : 
                             documentType === 'приказ' ? 'ПРИКАЗ' :
                             documentType === 'благодарность' ? 'БЛАГОДАРСТВЕННОЕ ПИСЬМО' : 
                             'РАСПОРЯЖЕНИЕ'}
                          </h1>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mb-12 space-y-4">
                      <div className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-lg text-blue-700 font-mono">
                          № {generateDocumentNumber()}
                        </p>
                      </div>
                      <p className="text-lg text-gray-600">
                        от {new Date().toLocaleDateString('ru-RU')}
                      </p>
                    </div>

                    {documentTitle && (
                      <div className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 text-center border-b-2 border-blue-200 pb-4">
                          «{documentTitle}»
                        </h2>
                      </div>
                    )}

                    {documentContent && (
                      <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line mb-16 font-serif">
                        {documentContent.split('\n').map((line, index) => {
                          // Убираем лишние части из отображения в превью
                          if (line.includes('МИНИСТЕРСТВО') || 
                              line.includes('ОБЪЯВЛЕНИЕ О КОНКУРСЕ') ||
                              line.includes('ПРИКАЗ') ||
                              line.includes('БЛАГОДАРСТВЕННОЕ ПИСЬМО') ||
                              line.includes('РАСПОРЯЖЕНИЕ') ||
                              line.includes('№ ') ||
                              line.includes('от ') ||
                              line.includes('Документ составлен:') ||
                              line.includes('ДЛЯ СЛУЖЕБНОГО ПОЛЬЗОВАНИЯ') ||
                              line.includes('СЛУЖЕБНЫЙ ДОКУМЕНТ')) {
                            return null
                          }
                          
                          // Пропускаем пустые строки после фильтрации
                          if (line.trim() === '') {
                            return <br key={index} />
                          }
                          
                          return (
                            <p key={index} className="mb-3">
                              {line.split('**').map((text, idx) => (
                                idx % 2 === 1 ? (
                                  <strong key={idx} className="font-bold text-gray-900">{text}</strong>
                                ) : (
                                  text
                                )
                              ))}
                            </p>
                          )
                        })}
                      </div>
                    )}

                    <div className="mt-20 pt-12 border-t-2 border-gray-300">
                      <div className="flex justify-end">
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900 mb-12">
                            Начальник {selectedUnit.toLowerCase()}
                          </p>
                          <div className="mb-4">
                            <div className="w-64 h-0.5 bg-gray-900 mb-2"></div>
                            <p className="text-gray-600 text-sm">(подпись)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-gray-300">
                      <p className="text-gray-600">
                        Документ составлен: {new Date().toLocaleDateString('ru-RU')}
                      </p>
                      <p className="text-gray-600 font-semibold">
                        ДЛЯ СЛУЖЕБНОГО ПОЛЬЗОВАНИЯ
                      </p>
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
              <p className="text-gray-700 font-medium">Генератор служебных документов МВД России</p>
              <p className="text-gray-600 text-sm mt-1">ДПС {new Date().getFullYear()}</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">МВД</span>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Дорожно-патрульная служба</p>
                <p className="text-gray-600 text-sm">{selectedUnit}, {selectedCity}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
