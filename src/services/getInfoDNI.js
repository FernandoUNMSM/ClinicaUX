function getInfoDNI(dni) {
  return fetch(`http://servicio.dayangels.com/api/reniec/dni-lite`, {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjgyNzEzMzMsImlzcyI6ImxvY2FsaG9zdCIsInVzZXJfaWQiOjQyODl9.E0-cvVnBr6KuZAeT__0ANCRIP9iq1Oa0r1XQeFYeBrU'
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjgyNzc3MzAsImlzcyI6ImxvY2FsaG9zdCIsInVzZXJfaWQiOjQyOTB9.Sn_dYYRQ4u1WSm0aMAR3bfgEH3h0fKbB977gMfyRM7U'
    },
    body: JSON.stringify({dni: dni})
  })
    .then(res => res.json())
    .then(res => res.response)
}
export default getInfoDNI