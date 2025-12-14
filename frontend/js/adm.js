const API_URL="http://localhost:3000"

async function GetUsers() {
    try {
    const res = await fetch(`${API_URL}/User`)
    const usuarios = await res.json()

    const div = document.getElementById('GetUsers')
    div.innerHTML = ''  

    usuarios.forEach(u => {
      div.innerHTML += `
         <tr>
            <td>${u.id}</td> 
            <td>${u.nome}</td>
            <td>${u.email}</td>
            <td>${u.isAdmin ? 'Sim' : 'Não'}</td>
            <td><button class="deletebutton" onclick="DeleteUser('${u.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg></button>
              </td>
  </button>
</td>
          <tr>

      `
    })
  } catch (error) {
    alert('Erro ao carregar usuários')
    console.error(error)
  }
}
window.onload = GetUsers

async function FindUserById() {
  const id = document.getElementById('busca').value

  if (!id) {
    alert('Informe o ID')
    return
  }

  try {
    const res = await fetch(`${API_URL}/User/${id}`)

    if (!res.ok) {
      alert('Usuário não encontrado')
      return
    }

    const user = await res.json()

    const resultDiv = document.getElementById('userResult')

    resultDiv.innerHTML = `
    <div class="lista">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <input type="text" id="edit_nome" placeholder="${user.nome}" value="${user.nome}" />
            </td>
            <td>
            <input type="email" id="edit_email" placeholder="${user.email}" value="${user.email}" />
            </td>
            <td>
            <select id="edit_isAdm">
            <option value="true">Sim</option>
            <option value="false">Não</option>
            </select>
            </td>
            <td>
            <button onclick="UpidateUser('${user.id}')">
              Atualizar
            </button>
                </td>
            <td>
              <button class="deletebutton" onclick="DeleteUser('${user.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
              </svg></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    `
  } catch (error) {
    console.error(error)
    alert('Erro ao buscar usuário')
  }
}

async function UpidateUser(id) {
  const nome = document.getElementById('edit_nome').value
  const email = document.getElementById('edit_email').value
  const isAdm = document.getElementById('edit_isAdm').value === 'true'

  const myId = localStorage.getItem('userId')

  if (id === myId && !isAdm) {
    alert('Você não pode remover seu próprio admin')
    return
  }

  if (!nome || !email) {
    alert('Preencha todos os campos')
    return
  }

  const res = await fetch(`${API_URL}/UpidateUser/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, email })
  })

  if (isAdm) {
      await fetch(`${API_URL}/AdmUser/${id}`, { method: 'PUT' })
    } else {
      await fetch(`${API_URL}/NormalUser/${id}`, { method: 'PUT' })
    }

  if (!res.ok) {
    alert('Erro ao atualizar usuário')
    return
  }

  alert('Usuário atualizado com sucesso')
  LoadUsers()
}



async function DeleteUser(id) {
  if (!confirm('Tem certeza que deseja excluir este usuário?')) return

  try {
    const res = await fetch(`${API_URL}/DeleteUser/${id}`, {
      method: 'DELETE'
    })

    if (!res.ok) {
      alert('Erro ao excluir usuário')
      return
    }

    alert('Usuário excluído com sucesso!')
    GetUsers() 
  }catch (error) {
    alert('Erro de conexão com o servidor')
    console.error(error)
  }
}


