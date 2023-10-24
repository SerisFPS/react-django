import React, { useEffect } from 'react'
import { Loader } from 'semantic-ui-react'
import { HeaderPage, TableUsers } from '../../components/main'
import { useUser } from '../../hooks/main'
export function UsersAdmin() {
  const { loading, users, error, getUsers } = useUser()
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <HeaderPage title="Users" btnTitle="New User" />
      {/* if loading is true ... render loading from semantic */}

      {loading ? (
        <Loader active inline="centered">
          Loading ...
        </Loader>
      ) : (
        <TableUsers users={users} />
      )}
    </>
  )
}
