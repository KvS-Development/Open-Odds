import { useParams } from 'react-router-dom'

function ScenarioPage() {
  const { id } = useParams()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        {id ? `Scenario ${id}` : 'New Scenario'}
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-600">
          Scenario builder will be implemented here. This will include:
        </p>
        <ul className="mt-4 space-y-2 text-gray-600 list-disc list-inside">
          <li>Step-by-step scenario construction</li>
          <li>Distribution parameter inputs</li>
          <li>Live visualization with Chart.js</li>
          <li>Notes and documentation for each step</li>
          <li>Save and publish functionality</li>
        </ul>
      </div>
    </div>
  )
}

export default ScenarioPage