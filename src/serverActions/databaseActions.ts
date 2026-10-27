import { createServerFn } from '@tanstack/react-start'
import { env } from 'cloudflare:workers'

export const getServerTime = createServerFn().handler(async () => {
  // This runs only on the server
  return new Date().toISOString()
})

export const getUserList = createServerFn().handler(async () => {
  const { results } = await env.d1_test.prepare('SELECT * FROM Users').run()
  let result: { id: number; name: string; data: number }[] = results.map(
    (c) => ({
      id: c.UserId as number,
      name: c.Username as string,
      data: c.UserData as number,
    }),
  )
  return result
})

export const addUser = createServerFn({ method: 'POST' })
  .validator((data: { name: string; data: number }) => data)
  .handler(async ({ data }) => {
    console.log('adding user')
    try {
      console.log(data)
      await env.d1_test
        .prepare('INSERT INTO Users (Username, UserData) VALUES (?, ?)')
        .bind(data.name, data.data)
        .run()
    } catch (e) {
      console.log('user add failed')
      console.error(e)
      return { success: false }
    }
    console.log('added user')
    return { success: true }
  })

export const deleteUser = createServerFn({ method: 'POST' })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    console.log('deleting user')
    try {
      await env.d1_test
        .prepare('DELETE FROM Users WHERE UserId = ?')
        .bind(data.id)
        .run()
    } catch (e) {
      console.log('user delete failed')
      console.error(e)
      return { success: false }
    }
    console.log('deleted user')
    return { success: true }
  })
