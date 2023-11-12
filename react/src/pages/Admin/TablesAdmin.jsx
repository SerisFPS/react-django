import React, { useEffect } from 'react'
import { HeaderPage } from '../../components/Admin/main'
import { useTable } from '../../hooks/main'
import { Loader } from 'semantic-ui-react'

export function TablesAdmin() {
  const { loading, tables, getTables } = useTable()

  useEffect(() => {
    getTables()
  }, [])

  console.log(tables)

  return (
    <>
      <HeaderPage title="Tables" btnTitle="new table" />
      {loading ? (
        <Loader active inline="centered">
          Loading ...
        </Loader>
      ) : (
        <h2>List of tables</h2>
      )}
    </>
  )
}
