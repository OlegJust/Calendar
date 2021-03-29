import { useState } from 'react'
import { Calendar } from '../components/Calendar'
import Button from 'react-bootstrap/Button'
import { PrismaClient, SavedDate } from '@prisma/client' 

const prisma = new PrismaClient() 

export async function getServerSideProps() {
  const savedDate: SavedDate[] = await prisma.savedDate.findMany()
  return {
    props: {
      initialContacts: savedDate, 
    },
  }
}

export default function Index({ initialContacts }) {
  const [savedDate, setSavedDate] = useState<SavedDate[]>(initialContacts)
  const [modalShow, setModalShow] = useState(false)
  return (
    <>
      <Button className='shadow-none' variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>
      <Calendar
        show={modalShow}
        savedate={`${savedDate[0].dataS}-${savedDate[0].month}-${savedDate[0].year}`}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}
