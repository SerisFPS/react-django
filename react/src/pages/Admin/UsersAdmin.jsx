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

  const { loading, users, error, getUsers, deleteUser } = useUser()
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

  const updateUser = (data) => {
    setTitleModal('update user')
    setContentModal(
      <AddEditUserForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        user={data}
      />
    )
    openCloseModal()
  }

  const onDeleteUser = async (data) => {
    const result = window.confirm(`Delete user ${data.email}`)
    if (result) {
      try {
        await deleteUser(data.id)
        onRefetch()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <HeaderPage title="Users" btnTitle="New User" btnClick={addUser} />

      {loading ? (
        <Loader active inline="centered">
          Loading ...
        </Loader>
      ) : (
        <TableUsers
          users={users}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
        />
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
