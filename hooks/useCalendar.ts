import { useState } from 'react'

const daysShortArr = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const monthNamesArr = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const useCalendar = (daysShort = daysShortArr, monthNames = monthNamesArr) => {
  const today = new Date()
  const todayFormatted = `${today.getDate()}-${ // сегодняшний день месяц год (15-3-2021)
    today.getMonth() + 1
  }-${today.getFullYear()}`
  const daysInWeek = [1, 2, 3, 4, 5, 6, 0] // дней в неделе
  const [selectedDate, setSelectedDate] = useState(today) // выбранная дата
  const selectedMonthLastDate = new Date( //выбранный месяц последний день
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  )
  const prevMonthLastDate = new Date(//предыдущий месяц Последняя дата
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    0
  )
  const daysInMonth = selectedMonthLastDate.getDate()//дней в месяце
  const firstDayInMonth = new Date( //первый день в месяце 
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay() // getDay()Метод возвращает день недели для указанной даты по местному времени, где 0 означает воскресенье.
  const startingPoint = daysInWeek.indexOf(firstDayInMonth) + 1 // cтартавая позиция в календаре от начала месяца
  let prevMonthStartingPoint = // начальная точка прошлого месяца 29 // 20< 30 31 1 2 3 4
    prevMonthLastDate.getDate() - daysInWeek.indexOf(firstDayInMonth) + 1
  	
		let currentMonthCounter = 1
		
  let nextMonthCounter = 1
  const rows = 6
  const cols = 7
  const calendarRows = {}// весь календарь 

  for (let i = 1; i < rows + 1; i++) {
    for (let j = 1; j < cols + 1; j++) {
      if (!calendarRows[i]) {
        calendarRows[i] = []
      }

      if (i === 1) {
        if (j < startingPoint) {
          calendarRows[i] = [
            ...calendarRows[i],
            {
              classes: 'border text-black-50 border-gray-400',
              date: {
                dataS: prevMonthStartingPoint,
                month:
                  selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth(),
                year:
                  selectedDate.getMonth() === 0
                    ? selectedDate.getFullYear() - 1
                    : selectedDate.getFullYear(),
              },
							dataS: prevMonthStartingPoint,
                month:
                  selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth(),
                year:
                  selectedDate.getMonth() === 0
                    ? selectedDate.getFullYear() - 1
                    : selectedDate.getFullYear(),
              stringDate: `${prevMonthStartingPoint}-${
                selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth()
              }-${
                selectedDate.getMonth() === 0
                  ? selectedDate.getFullYear() - 1
                  : selectedDate.getFullYear()
              }`,
              value: prevMonthStartingPoint,
            },
          ]
          prevMonthStartingPoint++
        } else {
          calendarRows[i] = [
            ...calendarRows[i],
            {
              classes: '',
              date: {
                dataS: currentMonthCounter,
                month: selectedDate.getMonth() + 1,
                year: selectedDate.getFullYear(),
              },
							dataS: currentMonthCounter,
                month: selectedDate.getMonth() + 1,
                year: selectedDate.getFullYear(),
              stringDate: `${currentMonthCounter}-${
                selectedDate.getMonth() + 1
              }-${selectedDate.getFullYear()}`,
              value: currentMonthCounter,
            },
          ]
          currentMonthCounter++
        }
      } else if (i > 1 && currentMonthCounter < daysInMonth + 1) {
        calendarRows[i] = [
          ...calendarRows[i],
          {
            classes: '',
            date: {
              dataS: currentMonthCounter,
              month: selectedDate.getMonth() + 1,
              year: selectedDate.getFullYear(),
            },
						dataS: currentMonthCounter,
              month: selectedDate.getMonth() + 1,
              year: selectedDate.getFullYear(),
            stringDate: `${currentMonthCounter}-${
              selectedDate.getMonth() + 1
            }-${selectedDate.getFullYear()}`,
            value: currentMonthCounter,
          },
        ]
        currentMonthCounter++
      } else {
        calendarRows[i] = [
          ...calendarRows[i],
          {
            classes: 'border text-black-50 border-gray-400',
            date: {
              dataS: nextMonthCounter,
              month:
                selectedDate.getMonth() + 2 === 13
                  ? 1
                  : selectedDate.getMonth() + 2,
              year:
                selectedDate.getMonth() + 2 === 13
                  ? selectedDate.getFullYear() + 1
                  : selectedDate.getFullYear(),
            },
						dataS: nextMonthCounter,
              month:
                selectedDate.getMonth() + 2 === 13
                  ? 1
                  : selectedDate.getMonth() + 2,
              year:
                selectedDate.getMonth() + 2 === 13
                  ? selectedDate.getFullYear() + 1
                  : selectedDate.getFullYear(),
            stringDate: `${nextMonthCounter}-${
              selectedDate.getMonth() + 2 === 13
                ? 1
                : selectedDate.getMonth() + 2
            }-${
              selectedDate.getMonth() + 2 === 13
                ? selectedDate.getFullYear() + 1
                : selectedDate.getFullYear()
            }`,
            value: nextMonthCounter,
          },
        ]
        nextMonthCounter++
      }
    }
  }

  const getPrevMonth = () => {
    setSelectedDate(
      (prevValue) =>
        new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1)
    )
  }

  const getNextMonth = () => {
    setSelectedDate(
      (prevValue) =>
        new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1)
    )
  }

  return {
    daysShort,
    monthNames,
    todayFormatted,
    calendarRows,
    selectedDate,
    getPrevMonth,
    getNextMonth,
  }
}

export default useCalendar
