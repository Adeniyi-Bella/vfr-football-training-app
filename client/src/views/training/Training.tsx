import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import Select from 'react-select'
import './Training.css'
import { CButton } from '@coreui/react'
import * as icon from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const options = [
  { value: '1', label: 'Antti' },
  { value: '2', label: 'Barius' },
  { value: '3', label: 'Darius' },
  { value: '4', label: 'Max' },
  { value: '5', label: 'Bella' },
  { value: '6', label: 'Michel' },
  { value: '7', label: 'Niklas' },
  { value: '8', label: 'Raphael' },
  { value: '9', label: 'Sara' },
  { value: '10', label: 'Tobias' },
  { value: '11', label: 'Ursula' },
  { value: '12', label: 'Viktor' },
  { value: '13', label: 'Walter' },
  { value: '14', label: 'Xena' },
  { value: '15', label: 'Yannick' },
  { value: '16', label: 'Zara' },
]

const Dashboard = () => {
  const [value, onChange] = useState(new Date())
  const [zusagen, setZusagen] = useState([])
  const [absagen, setAbsagen] = useState([])
  const [keineAntwort, setKeineAntwort] = useState([])

  const getFilteredOptions = (exclude) => {
    return options.filter((option) => !exclude.some((selected) => selected.value === option.value))
  }

  const handleSave = () => {
    const formattedData = {
      [value.toISOString()]: {
        Zusagen: zusagen.map((player) => player.label),
        Absagen: absagen.map((player) => player.label),
        KeineAntwort: keineAntwort.map((player) => player.label),
      },
    }
    console.log('Saved Data:', formattedData)
  }

  useEffect(() => {
    console.log('Selected Date:', value)
  }, [value])

  return (
    <div className="dashboard-container">
      <div className="main-row">
        <div className="select-group">
          <div className="select-wrapper">
            <p style={{ margin: 0 }}>Zusagen</p>
            <Select
              className="select"
              placeholder={'Bitte Spieler auswählen'}
              isSearchable
              isClearable
              isMulti
              options={getFilteredOptions([...absagen, ...keineAntwort])}
              value={zusagen}
              onChange={(selected) => setZusagen(selected || [])}
            />
          </div>

          <div className="select-wrapper">
            <p style={{ margin: 0 }}>Absagen</p>
            <Select
              className="select"
              isSearchable
              isClearable
              isMulti
              options={getFilteredOptions([...zusagen, ...keineAntwort])}
              value={absagen}
              onChange={(selected) => setAbsagen(selected || [])}
            />
          </div>

          {/* <div className="select-wrapper">
            <p style={{ margin: 0 }}>Urlaub</p>
            <Select
              className="select"
              isSearchable
              isClearable
              isMulti
              options={getFilteredOptions([...zusagen, ...absagen])}
              value={keineAntwort}
              onChange={(selected) => setKeineAntwort(selected || [])}
            />
          </div> */}

          <div className="select-wrapper">
            <p style={{ margin: 0 }}>KeineAntwort</p>
            <Select
              className="select"
              isSearchable
              isClearable
              isMulti
              options={getFilteredOptions([...zusagen, ...absagen])}
              value={keineAntwort}
              onChange={(selected) => setKeineAntwort(selected || [])}
            />
          </div>
        </div>
        <Calendar onChange={onChange} showWeekNumbers value={value} className="calendar" />
      </div>

      <CButton className="save-button" onClick={handleSave} color="primary">
        <CIcon icon={icon.cilSave} /> Speichern
      </CButton>
    </div>
  )
}

export default Dashboard
