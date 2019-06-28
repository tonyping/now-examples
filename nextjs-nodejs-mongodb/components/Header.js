// Header Component
// ----
// This file holds the functional component for the header
// The component takes authentication information (the user), as seen in the functions parameters (as a prop), and uses that information to display a login or logout button

import Link from 'next/link'

export default function Header({ authInfo }) {
  return (
    <header>
      <h1>GitHub Guestbook</h1>
      <Link
        href={
          !authInfo.token ? `/api/auth` : `/logout`
        }
      >
        <a>
          <button>
            {authInfo.token !== undefined ? 'Logout' : 'Login With GitHub'}
          </button>
        </a>
      </Link>

      <style jsx>{`
        header {
          align-items: center;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </header>
  )
}
