import React from 'react'
import * as icon from '@coreui/icons'
import { useState } from 'react'
import Select from 'react-select'

import {
  CButton,
  CCol,
  CForm,
  CFormFeedback,
  CFormLabel,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormSelect,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icons from '@coreui/icons'

const AddNewPlayerDialogue = ({ visible, closeNewPlayerDialogue }) => {
  const [country, setCountry] = useState('')
  const [image, setImage] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [validated, setValidated] = useState(false)

  const handleImageChange = (e) => {
    setImage(e.target.files[0]) // Store the selected file
  }

  // Dynamically get country flag icons
  const countryOptions = Object.entries(icons)
    .filter(([key]) => key.startsWith('cif'))
    .map(([key, value]) => ({
      value: key,
      label: key.replace('cif', ''),
      icon: value,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  const handleUserCreation = async () => {
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
        setFirstName('')
        setLastName('')
        setPosition('')
        setStatus('')
        setCountry('')
        setLoading(false)
        setValidated(false)
        closeNewPlayerDialogue()
      } else {
        alert('Error saving player data: ' + data.message)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error saving player data')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      setValidated(true)
      return
    }

    handleUserCreation()
  }

  return (
    <>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => {
          {
            setValidated(false)
            closeNewPlayerDialogue
          }
        }}
        aria-labelledby="VerticallyCenteredExample"
        size="sm"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Neu Spieler Anlegen</CModalTitle>
        </CModalHeader>
        <CForm
          className="needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CModalBody>
            <div
              style={{
                marginBottom: 20,
              }}
            >
              <CCol md={12}>
                <CFormLabel htmlFor="vorname">Vorname</CFormLabel>
                <CFormInput
                  type="text"
                  id="vorname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  feedbackInvalid="Vorname ist erforderlich."
                  required
                />
              </CCol>

              <CCol md={12}>
                <CFormLabel htmlFor="nachname">Nachname</CFormLabel>
                <CFormInput
                  type="text"
                  id="nachname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  feedbackInvalid="Nachname ist erforderlich."
                  required
                />
              </CCol>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label>Land</label>
              <Select
                styles={{ marginBottom: 5 }}
                options={countryOptions}
                getOptionLabel={(e) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CIcon icon={e.icon} size="lg" style={{ marginRight: 10 }} /> {e.label}
                  </div>
                )}
                onChange={(selectedOption) => setCountry(selectedOption)}
                value={country}
              />
              {validated && !country && (
                <CFormFeedback style={{ color: 'red' }}>Bitte wählen Sie ein Land</CFormFeedback>
              )}
            </div>

            <CFormSelect
              label="Spieler Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              feedbackInvalid="Bitte wählen Sie eine Position aus."
              style={{ marginBottom: 20 }}
            >
              <option value="">Bitte wählen</option>
              <option value="Verteidiger">Verteidiger</option>
              <option value="Mittelfeldspieler">Mittelfeldspieler</option>
              <option value="Angreifer">Angreifer</option>
              <option value="Torwart">Torwart</option>
            </CFormSelect>

            <CFormSelect
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              feedbackInvalid="Bitte wählen Sie eine Status aus."
              style={{ marginBottom: 20 }}
            >
              <option value="">Bitte wählen</option>
              <option value="Aktiv">Aktiv</option>
              <option value="Inaktiv">Inaktiv</option>
              <option value="Nicht verfügbar">Nicht verfügbar</option>
              <option value="Verletzt">Verletzt</option>
              <option value="Verletzt">Urlaub</option>
            </CFormSelect>

            <CFormInput type="file" label="Spieler Bild" onChange={handleImageChange} />
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center">
            <CButton color="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <CIcon icon={icon.cilSync} className="me-2 spin" />
                  <CSpinner size="sm" className="me-2" />
                  Bitte warten...
                </>
              ) : (
                <>
                  <CIcon icon={icon.cilPlus} />
                  Anlegen
                </>
              )}
            </CButton>
            <CButton color="secondary" onClick={closeNewPlayerDialogue}>
              <CIcon icon={icon.cilX} />
              Abbrechen
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default AddNewPlayerDialogue
