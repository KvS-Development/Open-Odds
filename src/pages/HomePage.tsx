function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Visual Probability Distribution Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Build complex scenarios, input probability distributions, and visualize the results.
          Perfect for understanding uncertainty in multi-step calculations like the Drake equation.
        </p>
        <div className="mt-8 space-x-4">
          <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition">
            Create Scenario
          </button>
          <button className="bg-white text-primary-600 border border-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition">
            Browse Examples
          </button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Build Scenarios</h3>
          <p className="text-gray-600">
            Create multi-step scenarios with branching logic and define probability distributions for each component.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Visualize Results</h3>
          <p className="text-gray-600">
            See real-time visual feedback as you adjust parameters and understand how uncertainties propagate.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Collaborate</h3>
          <p className="text-gray-600">
            Share your scenarios, compare approaches, and learn from the community's collective insights.
          </p>
        </div>
      </section>
    </div>
  )
}

export default HomePage