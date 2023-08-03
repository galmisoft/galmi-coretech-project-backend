export const userQuery = {
  findUserByEmail: `
    SELECT * FROM users WHERE email = $1
  `,
}