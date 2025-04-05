import './Dashboard.css'
import * as icon from '@coreui/icons'
import { useState, useEffect } from 'react'

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
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import AddNewPlayerDialogue from './dialogues/AddNewPlayerDialogue'
import DeletePlayerDialogue from './dialogues/DeletePlayerDialogue'
// import ReadPlayerDialogue from './dialogues/ReadPlayerDialogue'
import EditPlayerDialogue from './dialogues/EditPlayerDialogue'

const Dashboard = () => {
  const [visible, setVisible] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [players, setPlayers] = useState(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch players (moved outside useEffect)
  const fetchPlayers = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:4000/api/data')
      const data = await response.json()
      setPlayers(data)
      console.log('Fetched players:', data);

    } catch (error) {
      console.error('Error fetching player data:', error)
    } finally {
      setLoading(false)
    }
  }

  const closeNewPlayerDialogue = () => {
    setVisible(false)
    fetchPlayers()
  }

  // const openDeletePlayerDialogue = () => {
  //   setVisibleDelete(true)
  //   fetchPlayers()
  // }

  const closeDeletePlayerDialogue = () => {
    setVisibleDelete(false)
    fetchPlayers()
  }

  const toggleEditPlayerDialogue = () => {
    setVisibleEdit(!visibleEdit)
    fetchPlayers()
  }

  useEffect(() => {
    fetchPlayers()
  }, [])

  // Function to determine the avatar status based on the player's status
  const getAvatarStatus = (status) => {
    switch (status) {
      case 'Aktiv': // Active
        return 'success'
      case 'Nicht verfügbar': // Unavailable
        return 'danger'
      case 'Inaktiv': // Inactive
        return 'warning' // You can use 'warning' or any other status you prefer
      default:
        return 'secondary' // Default fallback if status is not recognized
    }
  }

  return (
    <>
      {/* <CAlert color="success" className="d-flex align-items-center">
        <CIcon icon={cilCheckCircle} className="flex-shrink-0 me-2" width={24} height={24} />
        <div>An example success alert with an icon</div>
      </CAlert> */}
      <CCard className="mb-4"></CCard>
      <CRow>
        <CCol xs>
          <CCard className="mb-4 ">
            <CButton onClick={() => setVisible(!visible)} className="players" color="primary">
              <CIcon icon={icon.cilUserPlus} />
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
                    <CTableHeaderCell className="bg-body-tertiary text-center"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {players? (
                    players.map((player, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell className="text-center">
                          <CAvatar
                            size="md"
                            src={`data:image/png;base64,${player.image?.data}`}
                            status={getAvatarStatus(player.status)} // Dynamically set the status
                          />
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{player.name}</div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {player.country ? (
                            <CIcon size="xl" icon={icon[player.country]} title={player.country} />
                          ) : (
                            <span>No country</span> // You can display a fallback message or icon here
                          )}
                        </CTableDataCell>
                        <CTableDataCell>{player.status}</CTableDataCell>
                        <CTableDataCell className="text-center">{player.position}</CTableDataCell>
                        <CTableDataCell
                          className="text-center"
                          style={{
                            cursor: 'pointer',
                            padding: 10,
                          }}
                        >
                          <CIcon
                            style={{ marginRight: 10 }}
                            size="xl"
                            icon={icon.cilUser}
                            title="Spieler Lesen"
                          />
                          <CIcon
                            style={{ marginRight: 10 }}
                            size="xl"
                            icon={icon.cilPen}
                            onClick={toggleEditPlayerDialogue}
                            title="Spieler Bearbeiten"
                          />
                          <CIcon
                            size="xl"
                            icon={icon.cilTrash}
                            onClick={() => {
                              setSelectedPlayer(player)
                              setVisibleDelete(true)
                            }}
                            title="Spieler Löschen"
                          />
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="5" className="text-center">
                        <CSpinner />
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Add New Player Dialogue */}
      <AddNewPlayerDialogue closeNewPlayerDialogue={closeNewPlayerDialogue} visible={visible} />
      <DeletePlayerDialogue
        toggleDeletePlayerDialogue={closeDeletePlayerDialogue}
        visibleDelete={visibleDelete}
        selectedPlayer={selectedPlayer}
      />
      <EditPlayerDialogue
        toggleEditPlayerDialogue={toggleEditPlayerDialogue}
        visibleEdit={visibleEdit}
      />
    </>
  )
}

export default Dashboard
