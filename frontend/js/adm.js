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
            <td>${u.isAdmin}</td>
            <td><button class="deletebutton" onclick="DeleteUser('${u.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg></button>
              </td>
              <td><button onclick="location.href='UpidateUser.html?id=${u.id}'">Atualizar
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


