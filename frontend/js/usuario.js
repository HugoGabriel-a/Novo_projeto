const API_URL = 'http://localhost:3000';




async function CreateUser() {
  try {
    const nome = document.getElementById('nome').value
    const senha = document.getElementById('senha').value

    const res = await fetch(`${API_URL}/CreateUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha })
    })

    const data = await res.json()

    if (!res.ok) {
        alert('Erro ao criar usuário')
        return
    }

    console.log('Usuário criado com sucesso:')
    alert('Usuário criado com sucesso')

  } catch (error) {
        console.error('Erro de conexão:', error)    
  }
}

async function GetUsers() {
    try {
    const res = await fetch(`${API_URL}/User`)

    if (!res.ok) {
        console.error('Erro ao buscar usuários')
        return
    }

    const users = await res.json()

    const lista = document.getElementById('lista-users')
    lista.innerHTML = ''

    users.forEach(user => {
        const li = document.createElement('li')
        li.textContent = `ID: ${user.id} | Nome: ${user.nome}`
        lista.appendChild(li)
    })

    } catch (error) {
    console.error('Erro de conexão:', error)
    }
}

async function GetUserById() {
    const id = document.getElementById('user-id').value

    if (!id) {
    console.error('ID não informado')
    return
    }

    try {
        const res = await fetch(`${API_URL}/User/${id}`)

        if (!res.ok) {
            console.error('Usuário não encontrado')
            return
        }

        const user = await res.json()

        const div = document.getElementById('user-resultado')
        div.innerHTML = `
            <p>ID: ${user.id}</p>
            <p>Nome: ${user.nome}</p>
        `

    } catch (error) {
        console.error('Erro de conexão:', error)
  }
}

async function UpidateUser() {
  const id = document.getElementById('update-id').value
  const nome = document.getElementById('update-nome').value
  const senha = document.getElementById('update-senha').value

  if (!id) {
    console.error('ID não informado')
    return
  }

  try {
    const res = await fetch(`${API_URL}/UpidateUser/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, senha })
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Erro ao atualizar usuário:', data)
      return
    }

    console.log('Usuário atualizado com sucesso:', data)

  } catch (error) {
    console.error('Erro de conexão:', error)
  }
}

async function DeleteUser() {
  const id = document.getElementById('delete-id').value

  if (!id) {
    console.error('ID não informado')
    return
  }

  try {
    const res = await fetch(`${API_URL}/DeleteUser/${id}`, {
      method: 'DELETE'
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Erro ao deletar usuário:', data)
      return
    }

    console.log('Usuário deletado com sucesso:', data)

  } catch (error) {
    console.error('Erro de conexão:', error)
  }
}

