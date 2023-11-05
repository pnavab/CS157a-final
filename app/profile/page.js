
export default function Profile(props) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap" rel="stylesheet" />
      <main className="flex min-h-screen flex-col items-center">
        <div className="relative flex place-items-center" style={{height : '35vh'}}>
          <p2 style={{fontSize : '4rem'}}> Profile </p2>
        </div>
        <div className="w-full max-w-xs">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <div className="block text-gray-700 text-md font-bold mb-2" for="username">
                <p> Full Name: *insert fullname here* </p>
              </div>
            </div>
            <div className="mb-4">
              <div className="block text-gray-700 text-md font-bold mb-2" for="username">
                <p> Username: *insert username here* </p>
              </div>
            </div>
            <div className="mb-4">
              <div className="block text-gray-700 text-md font-bold mb-2" for="username">
                <p> Password: *insert password here* </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button class="bg-Moonstone hover:bg-Moonstone-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Log In
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}