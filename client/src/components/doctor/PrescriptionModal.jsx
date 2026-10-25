import { useState } from 'react'

export default function PrescriptionModal({ isOpen, onClose, onSave, appointment }) {
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', duration: '' },
  ])
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen || !appointment) return null

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', duration: '' }])
  }

  const handleRemoveMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index))
  }

  const handleChangeMedicine = (index, field, value) => {
    const updated = [...medicines]
    updated[index][field] = value
    setMedicines(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const validMedicines = medicines.filter((m) => m.name.trim() !== '')
    await onSave({
      medicines: validMedicines,
      notes,
    })
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Write Prescription</h3>
            <p className="text-xs text-gray-500">
              Patient: <span className="font-medium text-gray-700">{appointment.patient?.name || 'Patient'}</span> | Slot: {appointment.date} ({appointment.slot})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Prescribed Medicines
              </label>
              <button
                type="button"
                onClick={handleAddMedicine}
                className="text-xs text-primary font-medium hover:underline"
              >
                + Add Medicine
              </button>
            </div>

            <div className="space-y-3">
              {medicines.map((med, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Medicine name (e.g. Paracetamol 500mg)"
                    value={med.name}
                    onChange={(e) => handleChangeMedicine(index, 'name', e.target.value)}
                    className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Dosage (e.g. 1-0-1)"
                    value={med.dosage}
                    onChange={(e) => handleChangeMedicine(index, 'dosage', e.target.value)}
                    className="w-28 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g. 5 days)"
                    value={med.duration}
                    onChange={(e) => handleChangeMedicine(index, 'duration', e.target.value)}
                    className="w-28 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary"
                  />
                  {medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(index)}
                      className="text-red-400 hover:text-red-600 text-sm px-1"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Clinical Notes & Advice
            </label>
            <textarea
              rows="3"
              placeholder="e.g. Drink plenty of fluids, rest for 3 days, follow up if fever persists."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg p-3 outline-none focus:border-primary resize-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-sm font-medium"
            >
              {loading ? 'Saving...' : 'Save & Complete Consultation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
