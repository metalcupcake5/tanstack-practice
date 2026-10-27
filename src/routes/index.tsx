import {
  addUser,
  deleteUser,
  getUserList,
} from '#/serverActions/databaseActions'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { getRouter } from '#/router'
import { useState, type ChangeEvent, type ChangeEventHandler } from 'react'

export const Route = createFileRoute('/')({
  component: Home,
  loader: () => getUserList(),
})

function Home() {
  let users = Route.useLoaderData()
  const router = useRouter()
  async function handleClick() {
    const success = await addUser({ data: { name: name, data: data } })
    await router.invalidate()
    if (success) return alert('user added')

    alert('error')
  }

  const [name, setName] = useState('')
  const [data, setData] = useState(0)

  async function handleNameChange(event: ChangeEvent) {
    let target = event?.target as HTMLInputElement
    setName(target.value)
  }

  async function handleDataChange(event: ChangeEvent) {
    let target = event?.target as HTMLInputElement
    let value = parseInt(target.value)
    if (!value) return
    setData(value)
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start meow</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <input
        type="text"
        placeholder="username"
        onChange={handleNameChange}
      ></input>
      <input type="text" placeholder="data" onChange={handleDataChange}></input>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        add thing
      </button>
      <br />
      Current input username: {name} <br />
      Current input data: {data}
      <br /> <br />
      user list: <br />
      <table className="w-50">
        <thead>
          <tr className="border-b">
            <td>username</td>
            <td>data</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {users.map((c) => (
            <tr className="border-b">
              <td>{c.name}</td>
              <td>{c.data}</td>
              <td>
                <button
                  onClick={async () => {
                    alert(`delete ${c.id}`)
                    await deleteUser({ data: { id: c.id } })
                    await router.invalidate()
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
