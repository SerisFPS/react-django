import React, { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react'
import {
  HeaderPage,
  TableUsers,
  BasicModal,
  AddEditUserForm,
} from '../../components/main'
import { useUser } from '../../hooks/main'

export function UsersAdmin() {
  const [contentModal, setContentModal] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [refetch, setRefetch] = useState(false)

  const { loading, users, error, getUsers } = useUser()
  const onRefetch = () => setRefetch((prev) => !prev)

  useEffect(() => {
    getUsers()
  }, [refetch])

  const openCloseModal = () => setShowModal((prev) => !prev)

  const addUser = () => {
    setTitleModal('add User')
    setContentModal(
      <AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} />
    )
    openCloseModal()
  }

  return (
    <>
      <HeaderPage title="Users" btnTitle="New User" btnClick={addUser} />
      {/* if loading is true ... render loading from semantic */}

      {loading ? (
        <Loader active inline="centered">
          Loading ...
        </Loader>
      ) : (
        <TableUsers users={users} />
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
