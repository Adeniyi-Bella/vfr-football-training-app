import React from 'react'
import * as icon from '@coreui/icons'
import { useState } from 'react'
import Select from 'react-select'

import {
  CButton,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icons from '@coreui/icons'

const EditPlayerDialogue = ({ visibleEdit, toggleEditPlayerDialogue }) => {
  const [firstName, setFirstName] = useState('')
  const [loading, setLoading] = useState(false)
  const [validated, setValidated] = useState(false)

  const handlePlayerDelete = async () => {
    setValidated(true)
    if (!firstName || !lastName || !position || !status || !country) {
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('name', firstName + ' ' + lastName)
    formData.append('country', country?.value || '') // Ensure only the country code is sent
    formData.append('position', position)
    formData.append('status', status)
    if (image) {
      formData.append('image', image) // Attach the image
    }
    try {
      const response = await fetch('http://localhost:4000/api/data', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setLoading(false)
        setValidated(false)
        toggleDeletePlayerDialogue()
      } else {
        alert('Error saving player data: ' + data.message)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error saving player data')
    }
  }

  return (
    <>
      <CModal
        alignment="center"
        visible={visibleEdit}
        onClose={() => {
          {
            setValidated(false)
            toggleEditPlayerDialogue
          }
        }}
        aria-labelledby="VerticallyCenteredExample"
        size="sm"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample"> Spieler Bearbeiten</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <div
            style={{
              marginBottom: 20,
            }}
          >
            <p>Mann kann mit diese dialogue eine Spieler Bearbeiten.</p>
          </div>
        </CModalBody>
        <CModalFooter className="d-flex justify-content-center">
          <CButton onClick={handlePlayerDelete} color="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <CIcon icon={icon.cilSync} className="me-2 spin" />
                <CSpinner size="sm" className="me-2" />
                Bitte warten...
              </>
            ) : (
              <>
                <CIcon icon={icon.cilPen} />
                Bearbeiten
              </>
            )}
          </CButton>
          <CButton color="secondary" onClick={toggleEditPlayerDialogue}>
            <CIcon icon={icon.cilX} />
            Abbrechen
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default EditPlayerDialogue
