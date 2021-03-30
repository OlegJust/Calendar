import useCalendar from '../hooks/useCalendar'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import classes from '../styles/calendar.module.css'
import Table from 'react-bootstrap/Table'
import { useState } from 'react'

export function Calendar(props) {
  const [myDate, setMyDate] = useState({})
  const [savedate, useSavedate] = useState(props.savedate)
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    daysShort,
    monthNames,
    getNextMonth,
    getPrevMonth,
  } = useCalendar()
  const postDate = async (event) => {
    event.preventDefault()

    const res = await fetch('/api/savedDate', {
      body: JSON.stringify(myDate),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const result = await res.json()
  }
  const dateClickHandlerq = async (date) => {
    try {
      setMyDate(date)
    } catch (e) {
      console.error(e)
    }
  }
  let SelectedMonth = `${
    monthNames[selectedDate.getMonth()]
  } ${selectedDate.getFullYear()}`
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Button
        variant="outline-primary"
        onClick={props.onHide}
        className={classes.buttonB}
      >
        <div className={classes.icon} data-icon="9" />
      </Button>
      <div className={classes.main}>
        <ButtonToolbar
          className={ classes.textData + " justify-content-between text-primary "}
          aria-label="Toolbar with Button groups"
        >
          <button className={classes.arrows} onClick={getPrevMonth}>
            <div data-icon="l" className={classes.icon} />
          </button>

          {SelectedMonth}
          <button className={classes.arrows} onClick={getNextMonth}>
            <div data-icon="m" className={classes.icon} />
          </button>
        </ButtonToolbar>
        <form onSubmit={postDate}>
          <div className={classes.widthTable}>
            <Table borderless size="sm">
              <thead>
                <tr>
                  <th></th>
                  {daysShort.map((day) => (
                    <th key={day} className={classes.textCenter}>
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={classes.textData}>
                {Object.values(calendarRows).map((cols) => {
                  return (
                    <tr key={cols[0].stringDate}>
                      <td className={classes.listTableTd}>
                        <div className={classes.listTable}>.</div>
                      </td>
                      {cols.map((col) => {
                        if (col.stringDate === savedate) {
                          return (
                            <td key={col.stringDate}>
                              <button
                                onClick={(event) =>
                                  setMyDate({
                                    dataS: col.dataS,
                                    month: col.month,
                                    year: col.year,
                                  })
                                }
                                className={classes.buttonDataActiv}
                                type="submit"
                              >
                                {col.value}
                              </button>
                            </td>
                          )
                        } else if (col.stringDate === todayFormatted) {
                          return (
                            <td key={col.stringDate}>
                              <Button
                                onClick={(event) => {
                                  useSavedate(col.stringDate)
                                  setMyDate({
                                    dataS: col.dataS,
                                    month: col.month,
                                    year: col.year,
                                  })
                                }}
                                variant="outline-warning"
                                className={classes.todaysDate}
                                type="submit"
                              >
                                {col.value}
                              </Button>
                            </td>
                          )
                        } else if (col.stringDate !== todayFormatted) {
                          if (col.classes) {
                            return (
                              <td key={col.stringDate}>
                                <div className={classes.notThisMonth}>
                                  {col.value}
                                </div>
                              </td>
                            )
                          } else {
                            return (
                              <td
                                className={classes.notThisMonth}
                                key={col.stringDate}
                              >
                                <Button
                                  onClick={(event) => {
                                    useSavedate(col.stringDate)
                                    setMyDate({
                                      dataS: col.dataS,
                                      month: col.month,
                                      year: col.year,
                                    })
                                    console.log(myDate)
                                  }}
                                  className={classes.buttonData}
                                  variant="outline-primary"
                                  type="submit"
                                >
                                  {col.value}
                                </Button>
                              </td>
                            )
                          }
                        }
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </form>
      </div>
    </Modal>
  )
}
