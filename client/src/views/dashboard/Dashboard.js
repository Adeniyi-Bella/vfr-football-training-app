import React from 'react'
import './Dashboard.css'
import * as icon from '@coreui/icons'
import { useState } from 'react'

import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CForm,
  CFormInput,
  CTableHead,
  CTableHeaderCell,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cifEs, cifUs, cilPeople } from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'

const Dashboard = () => {
  const [visible, setVisible] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState('')

  const handleUserCreation = async () => {
    // Prepare the player data to be sent to the server
    const playerData = {
      name: `${firstName} ${lastName}`,
      country,
      position,
      status,
    }

    console.log('Player Data:', playerData) // Log the data to verify

    try {
      const response = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Player data saved successfully!')
        setVisible(false) // Close the modal on successful save
      } else {
        alert('Error saving player data: ' + data.message)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error saving player data')
    }
  }

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
      },
      country: { name: 'USA', flag: cifUs },
      status: 'Aktiv',
      position: 'Goalkeeper',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Yiorgos Avraamu',
      },
      country: { name: 'USA', flag: icon.cifNg },
      status: 'Unavailable',
      position: 'Stürmer',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: {
        name: 'Yiorgos Avraamu',
      },
      country: { name: 'USA', flag: icon.cifTr },
      status: 'Inaktiv',
      position: 'Goalkeeper',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: {
        name: 'Yiorgos Avraamu',
      },
      country: { name: 'USA', flag: cifEs },
      status: 'Aktiv',
      position: 'Verteidilger',
    },
  ]

  return (
    <>
      <CCard className="mb-4"></CCard>
      <CRow>
        <CCol xs>
          <CCard className="mb-4 ">
            <CButton onClick={() => setVisible(!visible)} className="players" color="primary">
              <CIcon icon={icon.cilPlus} />
              Neu Spieler Anlegen
            </CButton>
            <CCardBody className="playerTable">
              <br />
              <CTable align="middle" className="mb-0 border " hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Spieler Name</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Land
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Position
                    </CTableHeaderCell>
                    {/* <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        {/* <div className="small text-body-secondary text-nowrap">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div> */}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.status}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.position}</div>
                      </CTableDataCell>
                      {/* <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">Last login</div>
                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                      </CTableDataCell> */}
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
        size="sm"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Neu Spieler Anlegen</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              label="Vorname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />{' '}
          </CForm>
          <CForm>
            <CFormInput
              type="text"
              label="Nachname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </CForm>
          <CForm>
            <CFormInput
              type="text"
              label="Land"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </CForm>
          <CForm>
            <CFormInput
              type="text"
              label="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </CForm>
          <CForm>
            <CFormInput
              type="text"
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </CForm>
        </CModalBody>
        <CModalFooter className="d-flex justify-content-center">
          <CButton color="primary" onClick={handleUserCreation}>
            Anlegen
          </CButton>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Abbrechnen
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Dashboard
