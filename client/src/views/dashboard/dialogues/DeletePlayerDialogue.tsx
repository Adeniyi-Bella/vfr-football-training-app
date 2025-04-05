import  { useState } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const DeletePlayerDialogue = ({ visibleDelete, toggleDeletePlayerDialogue, selectedPlayer }) => {
  const [loading, setLoading] = useState(false)

  console.log('DeletePlayerDialogue - selectedPlayer:', selectedPlayer);
  

  const handlePlayerDelete = async () => {
    if (!selectedPlayer || !selectedPlayer._id) {
      alert('Kein Spieler ausgewählt!')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`http://localhost:4000/api/data/${selectedPlayer._id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toggleDeletePlayerDialogue()
      } else {
        const data = await response.json()
        alert('Fehler beim Löschen des Spielers: ' + data.message)
      }
    } catch (error) {
      console.error('Fehler:', error)
      alert('Fehler beim Löschen des Spielers')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CModal
      alignment="center"
      visible={visibleDelete}
      onClose={toggleDeletePlayerDialogue}
      size="sm"
    >
      <CModalHeader>
        <CModalTitle>Spieler Löschen</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>
          Möchten Sie den Spieler{' '}
          <strong>{selectedPlayer?.name || 'Unbekannt'}</strong> wirklich löschen?
        </p>
      </CModalBody>
      <CModalFooter className="d-flex justify-content-center">
        <CButton onClick={handlePlayerDelete} color="danger" disabled={loading}>
          {loading ? (
            <>
              <CIcon icon={icon.cilSync} className="me-2 spin" />
              <CSpinner size="sm" className="me-2" />
              Löschen...
            </>
          ) : (
            <>
              <CIcon icon={icon.cilTrash} />
              Löschen
            </>
          )}
        </CButton>
        <CButton color="secondary" onClick={toggleDeletePlayerDialogue}>
          <CIcon icon={icon.cilX} />
          Abbrechen
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeletePlayerDialogue
