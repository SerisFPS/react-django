import React, { useEffect, useState } from 'react'
import {
  HeaderPage,
  TableTablesAdmin,
  AddEditTableForm,
} from '../../components/Admin/main'
import { useTable } from '../../hooks/main'
import { Loader } from 'semantic-ui-react'
import { BasicModal } from '../../components/Common/main'

export function TablesAdmin() {
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const [refetch, setRefetch] = useState(false)

  const { loading, tables, getTables } = useTable()

  useEffect(() => {
    getTables()
  }, [refetch])

  const openCloseModal = () => setShowModal((prev) => !prev)
  const onRefetch = () => setRefetch((prev) => !prev)

  const addTable = () => {
    setTitleModal('new table')
    setContentModal(
      <AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />
    )
    openCloseModal()
  }

  return (
    <>
      <HeaderPage title="Tables" btnTitle="new table" btnClick={addTable} />
      {loading ? (
        <Loader active inline="centered">
          Loading ...
        </Loader>
      ) : (
        <TableTablesAdmin tables={tables} />
      )}

      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  )
}
