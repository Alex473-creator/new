'use client'

import { useState, useEffect } from 'react'

export default function DocumentGenerator() {
  const [activeTab, setActiveTab] = useState('templates')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [documentTitle, setDocumentTitle] = useState('')
  const [documentContent, setDocumentContent] = useState('')
  const [documentType, setDocumentType] = useState('приказ')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const [selectedCity, setSelectedCity] = useState('г. Москва')
  const [selectedUnit, setSelectedUnit] = useState('Главное командование')
  const [recipientType, setRecipientType] = useState('general')
  const [recipientName, setRecipientName] = useState('')
  const [employeePosition, setEmployeePosition] = useState('')
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const cities = ['г. Москва', 'г. Санкт-Петербург', 'г. Новосибирск', 'г. Екатеринбург', 'г. Казань']
  const units = [
    'Главное командование',
    'Штаб главного командования',
    'Центральный аппарат',
    'Оперативное управление',
    'Управление безопасности',
    'Управление кадров',
    'Управление логистики',
    'Финансовое управление'
  ]

  const recipientTypes = [
    { id: 'general', name: 'Общий адрес (всем сотрудникам)' },
    { id: 'department', name: 'Сотрудникам подразделения' },
    { id: 'specific', name: 'Конкретному сотруднику' }
  ]

  const autoCompleteData = {
    'отпуск': {
      title: 'Распоряжение о предоставлении отпуска',
      content: `На основании трудового законодательства Российской Федерации,\n\nРАСПОРЯЖАЮСЬ:\n\n1. Предоставить [ФИО сотрудника] ежегодный оплачиваемый отпуск с [дата начала] по [дата окончания] продолжительностью [количество] календарных дней.\n2. Оплату отпуска произвести в установленном порядке.\n3. Ответственность за исполнение возложить на начальника отдела кадров.`
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
    },
    'совещание': {
      title: 'Распоряжение о проведении совещания',
      content: `В целях решения оперативных вопросов,\n\nРАСПОРЯЖАЮСЬ:\n\n1. Провести совещание [дата] в [время] в [место проведения].\n2. Повестка дня:\n   - [первый вопрос]\n   - [второй вопрос]\n   - [третий вопрос]\n3. Ответственным за организацию назначить [ФИО ответственного].`
    }
  }

  const securityElements = {
    secret: { symbol: 'СЕКРЕТНО', text: 'ДОКУМЕНТ С ОГРАНИЧЕННЫМ ДОСТУПОМ' },
    confidential: { symbol: 'КОНФИДЕНЦИАЛЬНО', text: 'КОНФИДЕНЦИАЛЬНЫЙ ДОКУМЕНТ' },
    official: { symbol: 'СЛУЖЕБНЫЙ', text: 'СЛУЖЕБНЫЙ ДОКУМЕНТ' },
    urgent: { symbol: 'СРОЧНО', text: 'СРОЧНЫЙ ДОКУМЕНТ' },
    original: { symbol: 'ПОДЛИННИК', text: 'ОРИГИНАЛ ДОКУМЕНТА' }
  }

  const generateSecurityCode = () => {
    const timestamp = Date.now().toString(36).toUpperCase()
    const unitCode = selectedUnit === 'Главное командование' ? 'ГК' : 
                    selectedUnit === 'Штаб главного командования' ? 'ШГК' :
                    selectedUnit === 'Центральный аппарат' ? 'ЦА' :
                    selectedUnit === 'Оперативное управление' ? 'ОУ' :
                    selectedUnit === 'Управление безопасности' ? 'УБ' :
                    selectedUnit === 'Управление кадров' ? 'УК' :
                    selectedUnit === 'Управление логистики' ? 'УЛ' :
                    selectedUnit === 'Финансовое управление' ? 'ФУ' : 'КМ'
    const year = new Date().getFullYear()
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0')
    const checkSum = ((parseInt(random) + unitCode.length) % 100).toString().padStart(2, '0')
    
    return `${unitCode}-${year}/${random}-${checkSum}`
  }

  const getRecipientText = () => {
    switch (recipientType) {
      case 'general':
        return 'Всем сотрудникам Главного командования'
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
      name: "Распоряжение о проведении конкурса",
      type: "конкурс",
      title: `Распоряжение ${selectedUnit} о проведении конкурса профессионального мастерства`,
      content: `ГЛАВНОЕ КОМАНДОВАНИЕ
${selectedUnit.toUpperCase()}

№ ${generateSecurityCode()}
${selectedCity}
«___» ___________ ${new Date().getFullYear()} г.

РАСПОРЯЖЕНИЕ

О проведении конкурса профессионального мастерства 
среди сотрудников Главного командования

В целях повышения профессионального уровня личного состава, выявления и поощрения лучших специалистов, а также в соответствии с годовым планом работы Главного командования,

РАСПОРЯЖАЮСЬ:

1. Провести конкурс профессионального мастерства среди ${getRecipientText()} в период с 15 января по 31 января ${new Date().getFullYear() + 1} года.

2. Утвердить состав конкурсной комиссии:
   - Председатель: [ФИО председателя]
   - Члены комиссии: [ФИО члена], [ФИО члена], [ФИО члена]
   - Секретарь: [ФИО секретаря]

3. Основные критерии оценки участников:
   3.1. Профессиональные знания и навыки.
   3.2. Качество выполнения служебных обязанностей.
   3.3. Инициативность и творческий подход.
   3.4. Результативность работы.

4. Победителям конкурса установить следующие награды:
   - 1 место: денежная премия в размере 500 000 рублей.
   - 2 место: денежная премия в размере 300 000 рублей.
   - 3 место: денежная премия в размере 200 000 рублей.

5. Финансирование конкурса осуществить за счет средств, предусмотренных в смете Главного командования на ${new Date().getFullYear()} год.

6. Контроль за исполнением настоящего распоряжения возложить на заместителя начальника ${selectedUnit}.

ЗАМЕСТИТЕЛЬ НАЧАЛЬНИКА ${selectedUnit.toUpperCase()}

_________________ /________________/
                  (подпись)

СЛУЖЕБНАЯ ПЕЧАТЬ`,
      year: new Date().getFullYear()
    },
    {
      id: 2,
      name: "Приказ об организации служебной подготовки",
      type: "приказ",
      title: `Приказ ${selectedUnit} об организации служебной подготовки`,
      content: `ГЛАВНОЕ КОМАНДОВАНИЕ
${selectedUnit.toUpperCase()}

№ ${generateSecurityCode()}
${selectedCity}
«___» ___________ ${new Date().getFullYear()} г.

П Р И К А З

Об организации служебной подготовки 
в Главном командовании на ${new Date().getFullYear()} год

В целях повышения профессионального уровня личного состава, совершенствования служебной подготовки и в соответствии с планом основных мероприятий Главного командования,

ПРИКАЗЫВАЮ:

1. Утвердить План служебной подготовки ${selectedUnit} на ${new Date().getFullYear()} год (приложение 1).

2. Провести следующие мероприятия:
   2.1. Еженедельные занятия по специальной подготовке.
   2.2. Ежемесячные инструктажи по технике безопасности.
   2.3. Квартальные учения и тренировки.
   2.4. Годовая аттестация сотрудников.

3. Начальникам структурных подразделений:
   3.1. Обеспечить 100% явку личного состава на занятия.
   3.2. Организовать проведение занятий в соответствии с утвержденным планом.
   3.3. Представлять отчеты о проведенных занятиях до 5 числа каждого месяца.

4. Учебно-методическому отделу:
   4.1. Разработать учебные материалы и методические пособия.
   4.2. Обеспечить контроль качества проведения занятий.
   4.3. Организовать проверку знаний личного состава.

5. Финансовому управлению:
   5.1. Обеспечить финансирование мероприятий по служебной подготовке.
   5.2. Представить смета расходов до 1 декабря текущего года.

6. Контроль за исполнением настоящего приказа возложить на заместителя начальника ${selectedUnit}.

НАЧАЛЬНИК ${selectedUnit.toUpperCase()}

_________________ /________________/
                  (подпись)

ГЕРБОВАЯ ПЕЧАТЬ ГЛАВНОГО КОМАНДОВАНИЯ`,
      year: new Date().getFullYear()
    },
    {
      id: 3,
      name: "Благодарственное письмо сотруднику",
      type: "благодарность",
      title: `Благодарственное письмо ${selectedUnit}`,
      content: `ГЛАВНОЕ КОМАНДОВАНИЕ
${selectedUnit.toUpperCase()}

№ ${generateSecurityCode()}
${selectedCity}
«___» ___________ ${new Date().getFullYear()} г.

БЛАГОДАРСТВЕННОЕ ПИСЬМО

Уважаемый [ФИО сотрудника]!

Руководство ${selectedUnit} выражает Вам искреннюю благодарность за добросовестное выполнение служебных обязанностей, высокий профессионализм и значительный вклад в развитие Главного командования.

Ваша работа отмечена по следующим критериям:

1. Отличные результаты в служебной деятельности за ${new Date().getFullYear()} год.
2. Ответственное отношение к выполнению поставленных задач.
3. Проявление инициативы и творческого подхода в работе.
4. Активное участие в реализации важных проектов.
5. Наставничество и помощь молодым сотрудникам.

Ваш труд служит примером для всего коллектива и вносит неоценимый вклад в укрепление авторитета Главного командования.

За проявленное усердие и достигнутые успехи Вас рекомендовано представить к денежной премии в размере 150 000 рублей.

Желаем Вам дальнейших успехов в служебной деятельности, крепкого здоровья, благополучия и новых профессиональных достижений!

С уважением,
руководство ${selectedUnit}

ЗАМЕСТИТЕЛЬ НАЧАЛЬНИКА ${selectedUnit.toUpperCase()}

_________________ /________________/
                  (подпись)

СЛУЖЕБНАЯ ПЕЧАТЬ`,
      year: new Date().getFullYear()
    },
    {
      id: 4,
      name: "Приказ о премировании",
      type: "премия",
      title: `Приказ ${selectedUnit} о премировании сотрудников`,
      content: `ГЛАВНОЕ КОМАНДОВАНИЕ
${selectedUnit.toUpperCase()}

№ ${generateSecurityCode()}
${selectedCity}
«___» ___________ ${new Date().getFullYear()} г.

П Р И К А З

О премировании сотрудников Главного командования

В целях мотивации личного состава к повышению эффективности служебной деятельности, поощрения добросовестного отношения к служебным обязанностям и в соответствии с Положением о премировании,

ПРИКАЗЫВАЮ:

1. Выплатить премию в размере, указанном в приложении 1, следующим сотрудникам:

${recipientType === 'specific' && recipientName ? `   1.1. ${recipientName} ${employeePosition ? `- ${employeePosition}` : ''} - 150 000 рублей.` : '   1.1. [ФИО сотрудника] - [сумма] рублей.'}
${recipientType !== 'specific' ? '   1.2. [ФИО сотрудника] - [сумма] рублей.\n   1.3. [ФИО сотрудника] - [сумма] рублей.' : ''}

2. Основанием для выплаты премии являются:
   2.1. Достижение высоких показателей в служебной деятельности.
   2.2. Качественное выполнение поставленных задач в установленные сроки.
   2.3. Проявление инициативы и творческого подхода в работе.

3. Финансовому управлению:
   3.1. Произвести выплату премий до 10 числа следующего месяца.
   3.2. Обеспечить правильность начисления и выплаты.

4. Начальнику отдела кадров:
   4.1. Внести соответствующие записи в трудовые книжки сотрудников.
   4.2. Оформить необходимую документацию.

5. Контроль за исполнением настоящего приказа возложить на заместителя начальника ${selectedUnit}.

НАЧАЛЬНИК ${selectedUnit.toUpperCase()}

_________________ /________________/
                  (подпись)

ГЕРБОВАЯ ПЕЧАТЬ`,
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
    // Обновляем контент при изменении адресата
    if (selectedTemplate) {
      let updatedContent = selectedTemplate.content
      
      // Обновляем номер документа
      updatedContent = updatedContent.replace(/№ [A-Z0-9/-]+/, `№ ${generateSecurityCode()}`)
      
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
        .replace('Главное командование', selectedUnit)
        .replace('г. Москва', selectedCity)
    }
    
    setSelectedTemplate(updatedTemplate)
    setDocumentTitle(updatedTemplate.title)
    
    let updatedContent = template.content
      .replace(/Главное командование/g, selectedUnit)
      .replace(/г\. Москва/g, selectedCity)
    
    // Обновляем номер документа
    updatedContent = updatedContent.replace(/№ [A-Z0-9/-]+/, `№ ${generateSecurityCode()}`)
    
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
    setDocumentType('приказ')
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

  const drawEmblem = (ctx, x, y, size) => {
    ctx.save()
    ctx.translate(x, y)
    
    const gold = '#D4AF37'
    const blue = '#0039A6'
    const silver = '#C0C0C0'
    const red = '#B22234'
    
    // Внешний круг
    ctx.fillStyle = blue
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2)
    ctx.fill()
    
    // Внутренний круг
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2)
    ctx.fill()
    
    // Меч
    ctx.fillStyle = silver
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(-size * 0.1, -size * 0.3)
    ctx.lineTo(size * 0.1, -size * 0.3)
    ctx.lineTo(size * 0.05, size * 0.3)
    ctx.lineTo(-size * 0.05, size * 0.3)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    
    // Лавровый венок
    ctx.fillStyle = gold
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.35, size * 0.25, 0, 0, Math.PI * 2)
    ctx.stroke()
    
    // Звезда
    ctx.fillStyle = red
    ctx.beginPath()
    const spikes = 5
    const outerRadius = size * 0.12
    const innerRadius = size * 0.05
    
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (Math.PI * i) / spikes
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
    
    ctx.restore()
  }

  const addWatermark = (ctx, text, width, height) => {
    ctx.save()
    ctx.globalAlpha = 0.05
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

  const addSecurityPattern = (ctx, width, height, securityCode) => {
    ctx.save()
    ctx.globalAlpha = 0.03
    
    // Мелкий повторяющийся текст
    ctx.font = '16px "Courier New"'
    ctx.fillStyle = '#000000'
    
    const codeParts = securityCode.split('/')
    const baseText = `ГК-${codeParts[0]}/${codeParts[1] || ''}`
    
    for (let x = 60; x < width; x += 200) {
      for (let y = 60; y < height; y += 150) {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(Math.PI / 6)
        ctx.fillText(baseText, 0, 0)
        ctx.fillText('ГЛАВНОЕ КОМАНДОВАНИЕ', 0, 30)
        ctx.restore()
      }
    }
    
    ctx.restore()
  }

  const addMicroprint = (ctx, width, height) => {
    ctx.save()
    ctx.globalAlpha = 0.08
    
    // Микротекст по краям
    const microText = 'ГЛАВНОЕ КОМАНДОВАНИЕ ОФИЦИАЛЬНЫЙ ДОКУМЕНТ'
    ctx.font = '8px Arial'
    ctx.fillStyle = '#000000'
    
    // Верхний край
    for (let x = 100; x < width - 100; x += 80) {
      ctx.fillText(microText, x, 30)
    }
    
    // Нижний край
    for (let x = 100; x < width - 100; x += 80) {
      ctx.fillText(microText, x, height - 20)
    }
    
    // Левый край
    for (let y = 100; y < height - 100; y += 80) {
      ctx.save()
      ctx.translate(30, y)
      ctx.rotate(-Math.PI / 2)
      ctx.fillText(microText, 0, 0)
      ctx.restore()
    }
    
    // Правый край
    for (let y = 100; y < height - 100; y += 80) {
      ctx.save()
      ctx.translate(width - 30, y)
      ctx.rotate(Math.PI / 2)
      ctx.fillText(microText, 0, 0)
      ctx.restore()
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
      const securityCode = generateSecurityCode()
      
      const docTypeText = {
        'конкурс': 'РАСПОРЯЖЕНИЕ',
        'приказ': 'П Р И К А З',
        'благодарность': 'БЛАГОДАРСТВЕННОЕ ПИСЬМО',
        'премия': 'П Р И К А З'
      }[documentType] || 'ДОКУМЕНТ'

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      const width = 2480
      const height = 3508
      
      canvas.width = width
      canvas.height = height
      
      // Белый фон
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, width, height)
      
      // Водяные знаки и защита
      addWatermark(ctx, 'ГЛАВНОЕ КОМАНДОВАНИЕ', width, height)
      addSecurityPattern(ctx, width, height, securityCode)
      addMicroprint(ctx, width, height)
      
      // Добавляем скрытый защитный слой
      ctx.save()
      ctx.globalAlpha = 0.02
      ctx.font = 'bold 140px "Times New Roman"'
      ctx.fillStyle = '#000000'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.translate(width / 2, height / 2)
      ctx.rotate(Math.PI / 3)
      ctx.fillText('СЛУЖЕБНЫЙ ДОКУМЕНТ', 0, 0)
      ctx.restore()
      
      // Основные поля документа
      const margin = 180
      const contentWidth = width - (margin * 2)
      
      // Эмблема Главного командования
      drawEmblem(ctx, width / 2, 200, 110)
      
      // Заголовок организации
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 36px "Times New Roman"'
      ctx.textAlign = 'center'
      ctx.fillText('ГЛАВНОЕ КОМАНДОВАНИЕ', width / 2, 320)
      ctx.font = 'bold 30px "Times New Roman"'
      ctx.fillText(selectedUnit.toUpperCase(), width / 2, 370)
      
      // Линия разделения
      ctx.beginPath()
      ctx.moveTo(margin, 420)
      ctx.lineTo(width - margin, 420)
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.stroke()
      
      // Номер документа и город
      ctx.font = '20px "Times New Roman"'
      ctx.textAlign = 'left'
      ctx.fillText(`№ ${securityCode}`, margin, 460)
      ctx.textAlign = 'right'
      ctx.fillText(selectedCity, width - margin, 460)
      
      ctx.font = '18px "Times New Roman"'
      ctx.textAlign = 'center'
      ctx.fillText(`«___» ___________ ${new Date().getFullYear()} г.`, width / 2, 500)
      
      // Тип документа
      ctx.font = 'bold 68px "Times New Roman"'
      ctx.fillText(docTypeText, width / 2, 580)
      
      // Город в заголовке
      ctx.font = 'bold 26px "Times New Roman"'
      ctx.fillText(selectedCity.toUpperCase(), width / 2, 640)
      
      // Название документа
      ctx.font = 'bold 30px "Times New Roman"'
      ctx.textAlign = 'center'
      const titleLines = wrapText(ctx, documentTitle, contentWidth, 30, 'Times New Roman')
      titleLines.forEach((line, index) => {
        ctx.fillText(line, width / 2, 700 + (index * 50))
      })
      
      const titleHeight = 700 + (titleLines.length * 50)
      
      // Содержание документа с заменой адресата
      let finalContent = documentContent
      if (recipientType === 'specific' && recipientName) {
        finalContent = finalContent.replace(/\[ФИО сотрудника\]/g, recipientName)
        finalContent = finalContent.replace(/\[ФИО\]/g, recipientName)
      }
      
      ctx.font = '24px "Times New Roman"'
      ctx.textAlign = 'left'
      const cleanContent = finalContent
        .replace(/\*\*/g, '')
        .replace(/СЛУЖЕБНАЯ ПЕЧАТЬ.*/g, '')
        .replace(/ГЕРБОВАЯ ПЕЧАТЬ.*/g, '')
        .replace(/ЗАМЕСТИТЕЛЬ НАЧАЛЬНИКА.*/g, '')
        .replace(/НАЧАЛЬНИК.*/g, '')
        .replace(/_________________ \/________________\/\s+\(подпись\)/g, '')
      
      const contentLines = wrapText(ctx, cleanContent, contentWidth, 24, 'Times New Roman')
      contentLines.forEach((line, index) => {
        ctx.fillText(line, margin, titleHeight + 60 + (index * 36))
      })
      
      const contentHeight = titleHeight + 60 + (contentLines.length * 36)
      
      // Подпись
      ctx.font = 'bold 22px "Times New Roman"'
      ctx.textAlign = 'right'
      
      if (documentType === 'директива') {
        ctx.fillText('НАЧАЛЬНИК ГЛАВНОГО КОМАНДОВАНИЯ', width - margin, contentHeight + 120)
      } else if (documentType === 'приказ' || documentType === 'премия') {
        ctx.fillText(`НАЧАЛЬНИК ${selectedUnit.toUpperCase()}`, width - margin, contentHeight + 120)
      } else {
        ctx.fillText(`ЗАМЕСТИТЕЛЬ НАЧАЛЬНИКА ${selectedUnit.toUpperCase()}`, width - margin, contentHeight + 120)
      }
      
      ctx.font = '18px "Times New Roman"'
      ctx.fillText('_________________ /________________/', width - margin, contentHeight + 160)
      ctx.fillText('(подпись)', width - margin, contentHeight + 190)
      
      // Печать
      ctx.font = 'italic 16px "Times New Roman"'
      ctx.textAlign = 'center'
      const sealText = documentType === 'директива' || documentType === 'приказ' || documentType === 'премия' ? 
                      'ГЕРБОВАЯ ПЕЧАТЬ ГЛАВНОГО КОМАНДОВАНИЯ' : 
                      'СЛУЖЕБНАЯ ПЕЧАТЬ'
      ctx.fillText(sealText, width - margin - 100, contentHeight + 240)
      
      // Адресат в нижней части
      ctx.font = '14px "Times New Roman"'
      ctx.textAlign = 'left'
      ctx.fillStyle = '#333333'
      ctx.fillText(`Адресат: ${getRecipientText()}`, margin, contentHeight + 280)
      
      // Защитная информация внизу
      ctx.font = '12px "Courier New"'
      ctx.textAlign = 'center'
      ctx.fillStyle = '#666666'
      ctx.fillText(`Защитный код документа: ${securityCode} | Сгенерировано: ${today} | Документ имеет юридическую силу`, width / 2, height - 60)
      
      // Рамка документа
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.strokeRect(50, 50, width - 100, height - 100)
      
      // Угловые элементы
      ctx.beginPath()
      ctx.moveTo(margin, 140)
      ctx.lineTo(margin - 15, 140)
      ctx.lineTo(margin - 15, 140 - 15)
      ctx.moveTo(width - margin, 140)
      ctx.lineTo(width - margin + 15, 140)
      ctx.lineTo(width - margin + 15, 140 - 15)
      ctx.moveTo(margin, height - 140)
      ctx.lineTo(margin - 15, height - 140)
      ctx.lineTo(margin - 15, height - 140 + 15)
      ctx.moveTo(width - margin, height - 140)
      ctx.lineTo(width - margin + 15, height - 140)
      ctx.lineTo(width - margin + 15, height - 140 + 15)
      ctx.stroke()

      // Экспорт
      const link = document.createElement('a')
      const safeUnitName = selectedUnit.replace(/[^a-zA-ZА-Яа-я0-9]/g, '_')
      const safeCode = securityCode.replace(/\//g, '-')
      link.download = `Документ_ГК_${safeUnitName}_${safeCode}.png`
      link.href = canvas.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setIsGenerating(false)
      alert(`Документ успешно сохранен с защитным кодом!\nАдресат: ${getRecipientText()}`)

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

  const addSecurityElement = (element) => {
    const textarea = document.getElementById('documentContent')
    if (!textarea) return
    
    const start = textarea.selectionStart
    const newText = documentContent.substring(0, start) + element + documentContent.substring(start)
    setDocumentContent(newText)
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + element.length, start + element.length)
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
              Генератор служебных документов Главного командования
            </h1>
            <p className="text-gray-700">
              Официальное оформление документов с защитой от подделки
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-3">
                Город расположения
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
              <select
                value={selectedUnit}
                onChange={(e) => handleUnitChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800"
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
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
                      placeholder="Например: Иванов Иван Иванович"
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
                      placeholder="Например: старший специалист"
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
              
              <p className="mt-2 text-sm text-gray-600">
                Адресат: <span className="font-semibold">{getRecipientText()}</span>
              </p>
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
              'Сохранить с защитой'
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
                  .replace('Главное командование', selectedUnit)
                  .replace('г. Москва', selectedCity)
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
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${template.type === 'приказ' ? 'bg-red-50 text-red-800 border border-red-200' : template.type === 'конкурс' ? 'bg-blue-50 text-blue-800 border border-blue-200' : template.type === 'благодарность' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-purple-50 text-purple-800 border border-purple-200'}`}>
                          {template.type.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {template.year} год
                        </span>
                      </div>
                    </div>
                    <div className="text-4xl opacity-80">{template.type === 'благодарность' ? '👤' : '📄'}</div>
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
                            placeholder="старший специалист"
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
                    
                    <p className="mt-3 text-gray-600">
                      <span className="font-medium">Текущий адресат:</span> {getRecipientText()}
                    </p>
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
                      <option value="приказ">Приказ</option>
                      <option value="конкурс">Распоряжение о конкурсе</option>
                      <option value="благодарность">Благодарственное письмо</option>
                      <option value="премия">Приказ о премировании</option>
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
                      <div className="flex gap-2">
                        <button
                          onClick={handleBoldText}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-800 shadow-sm border border-gray-300"
                        >
                          Жирный текст
                        </button>
                        <div className="relative group">
                          <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 shadow-sm border border-blue-300">
                            Защита
                          </button>
                          <div className="absolute hidden group-hover:block bg-white shadow-xl rounded-lg p-2 z-10 mt-1">
                            <div className="flex gap-2 flex-wrap">
                              {Object.entries(securityElements).map(([key, value]) => (
                                <button
                                  key={key}
                                  onClick={() => addSecurityElement(value.symbol)}
                                  className="p-2 hover:bg-gray-100 rounded border border-gray-200"
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
                          <span className="animate-spin inline-block mr-3">⏳</span>
                          Генерация защищенного документа...
                        </>
                      ) : (
                        'Сохранить документ с защитой'
                      )}
                    </button>
                    <p className="mt-4 text-center text-gray-600 text-sm">
                      Документ будет содержать защитный код, водяные знаки и электронную подпись
                    </p>
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
                    <div className="flex gap-1">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded border border-blue-200">ОРИГИНАЛ</span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded border border-green-200">ПОДПИСАНО</span>
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded border border-red-200">ЗАЩИЩЕНО</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">
                    <span className="font-medium">Адресат:</span> {getRecipientText()}
                  </p>
                </div>
                
                <div className="bg-gray-100 border-2 border-gray-300 rounded-2xl p-8 min-h-[700px]">
                  <div className="bg-white rounded-xl p-12 shadow-inner h-full overflow-auto relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                      <div className="text-9xl font-bold text-gray-400 rotate-45">ГК</div>
                    </div>
                    
                    <div className="text-center mb-12 relative z-10">
                      <div className="flex justify-center mb-8">
                        <div className="relative">
                          <div className="w-32 h-32 bg-gradient-to-b from-blue-50 to-blue-100 border-4 border-blue-300 rounded-full flex items-center justify-center shadow-lg">
                            <div className="text-4xl font-bold text-blue-800">ГК</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 tracking-wide">ГЛАВНОЕ КОМАНДОВАНИЕ</h2>
                        <h3 className="text-xl font-bold text-gray-800">{selectedUnit.toUpperCase()}</h3>
                        <h4 className="text-lg font-medium text-gray-700">{selectedCity.toUpperCase()}</h4>
                      </div>
                      
                      <div className="relative py-6">
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                        <div className="relative bg-white px-8 inline-block">
                          <h1 className="text-3xl font-bold text-gray-900 tracking-wider">
                            {documentType === 'конкурс' ? 'РАСПОРЯЖЕНИЕ' : 
                             documentType === 'приказ' ? 'П Р И К А З' :
                             documentType === 'благодарность' ? 'БЛАГОДАРСТВЕННОЕ ПИСЬМО' : 
                             'П Р И К А З'}
                          </h1>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mb-12 space-y-4 relative z-10">
                      <div className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-lg text-blue-700 font-mono">
                          № {generateSecurityCode()}
                        </p>
                      </div>
                      <p className="text-lg text-gray-600">
                        «{new Date().toLocaleDateString('ru-RU')}» {selectedCity}
                      </p>
                    </div>

                    {documentTitle && (
                      <div className="mb-10 relative z-10">
                        <h2 className="text-2xl font-bold text-gray-800 text-center border-b-2 border-blue-200 pb-4">
                          {documentTitle}
                        </h2>
                        <p className="text-center text-gray-600 mt-2">
                          Адресат: {getRecipientText()}
                        </p>
                      </div>
                    )}

                    {documentContent && (
                      <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line mb-16 relative z-10 font-serif">
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
                          <div className="w-32 h-32 border-2 border-gray-400 rounded-full flex items-center justify-center bg-white">
                            <div className="text-center">
                              <p className="text-sm font-bold text-gray-700">ПЕЧАТЬ</p>
                              <p className="text-xs text-gray-600 mt-1">ГЛАВНОГО КОМАНДОВАНИЯ</p>
                              <p className="text-xs text-gray-600 mt-1">{new Date().getFullYear()}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900 mb-12">
                            {documentType === 'благодарность' ? 'ЗАМЕСТИТЕЛЬ НАЧАЛЬНИКА' : 'НАЧАЛЬНИК'} {selectedUnit.toUpperCase()}
                          </p>
                          <div className="mb-4">
                            <div className="w-64 h-0.5 bg-gray-900 mb-2"></div>
                            <p className="text-gray-600 text-sm">(подпись)</p>
                          </div>
                          <p className="text-lg font-semibold text-gray-800">________________</p>
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
              <p className="text-gray-700 font-medium">Генератор служебных документов Главного командования</p>
              <p className="text-gray-600 text-sm mt-1">Версия 2.0 • Защищенные документы {new Date().getFullYear()}</p>
              <p className="text-gray-500 text-xs mt-1">Разработано для служебного пользования</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">ГК</span>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Главное командование</p>
                <p className="text-gray-600 text-sm">Документы {new Date().getFullYear()} г.</p>
              </div>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            <p>Все документы защищены от подделки уникальными кодами и водяными знаками</p>
            <p className="mt-2">Текущая конфигурация: {selectedUnit}, {selectedCity} • Адресат: {getRecipientText()}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
