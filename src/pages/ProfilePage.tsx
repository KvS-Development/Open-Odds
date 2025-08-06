function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-600">
          User authentication and profile management will be implemented here using Supabase Auth.
        </p>
        <div className="mt-6">
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
            Sign In with Email
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage