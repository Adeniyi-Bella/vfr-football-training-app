export const CreatePlayer = async (formData) => {
  try {
    const response = await fetch('http://localhost:4000/api/data', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (response.ok) {
      return response
    } else {
      alert('Error saving player data: ' + data.message)
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Error saving player data')
  }
}
