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

  const { loading, users, error, getUsers } = useUser()

  useEffect(() => {
    getUsers()
  }, [])

  const openCloseModal = () => setShowModal((prev) => !prev)

  const addUser = () => {
    setTitleModal('add User')
    setContentModal(<AddEditUserForm />)
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
