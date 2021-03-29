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
        'Content-Type': 'application/json'
      },
      method: 'POST'
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
  } - ${selectedDate.getFullYear()}`
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={'rounded-3'}
    >
      <Button
        variant="outline-primary"
        onClick={props.onHide}
        className={classes.buttonB}
      >
        <div className={classes.icon} data-icon="9" />
      </Button>
      <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
        <button className="button" onClick={getPrevMonth}>
          <div data-icon="l" className={classes.icon} />
        </button>

        <p>{SelectedMonth}</p>
        <button className="button" onClick={getNextMonth}>
          <div data-icon="m" className={classes.icon} />
        </button>
      </ButtonToolbar>
      <form onSubmit={postDate}>
        <Table >
          <thead>
            <tr>
              {daysShort.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(calendarRows).map((cols) => {
              return (
                <tr key={cols[0].stringDate}>
                  {cols.map((col) => {
                    if (col.stringDate === savedate) {
                      return (
                        <td
                          key={col.stringDate}
                          className={`${
                            classes[col.classes]
                          }  text-white`}
                          onClick={(event) =>
                            setMyDate({
                              dataS: col.dataS,
                              month: col.month,
                              year: col.year,
                            })
                          }
                        >
                          <Button className={`${col.classes} shadow-none`}  type="submit">{col.value}</Button>
                        </td>
                      )
                    } else if (col.stringDate === todayFormatted) {
                      return (
                        <td
                          key={col.stringDate}
                          className={`${
                            classes[col.classes]
                          } `}
                          onClick={(event) => {
                            useSavedate(col.stringDate)
                            setMyDate({
                              dataS: col.dataS,
                              month: col.month,
                              year: col.year,
                            })
                          }}
                        >
                          <Button variant="outline-primary" className="shadow-none border border-5 border-primary" type="submit">{col.value}</Button>
                        </td>
                      )
                    } else if (col.stringDate !== todayFormatted) {
                      return (
                        <td
                          key={col.stringDate}
                          className={classes[col.classes]}
                          onClick={(event) => {
                            useSavedate(col.stringDate)
                            setMyDate({
                              dataS: col.dataS,
                              month: col.month,
                              year: col.year,
                            })
                            console.log(myDate)
                          }}
                        >
                          <Button  className={`${col.classes} shadow-none`} variant="outline-primary" type="submit">{col.value}</Button>
                        </td>
                      )
                    }
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>
      </form>
    </Modal>
  )
}
