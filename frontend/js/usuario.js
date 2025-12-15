const API_URL = 'http://localhost:3000'
const UserId = localStorage.getItem('UserId')

const ADMIN_PASSWORD = '1234'

async function CreateUser() {
  try {
    const adminPassword = document.getElementById('adminPassword').value
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const res = await fetch(`${API_URL}/CreateUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha, email })
    })

    const user = await res.json()

    if (!res.ok) {
        alert('Erro ao criar usuário')
        return
    }

    console.log('Usuário criado com sucesso:')
    alert('Usuário criado com sucesso')
    location.href="index.html"

    if (adminPassword && adminPassword === ADMIN_PASSWORD) {
        await fetch(`${API_URL}/AdmUser/${user.id}`, {
        method: 'PUT'
      })
    }


  } catch (error) {
        console.error('Erro de conexão:', error)    
  }
}
async function DevolverBook(id) {
  try {
    const res = await fetch(`${API_URL}/DevolverBook/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json()
    if (res.ok) {
      alert(data.message)
      const UserId = sessionStorage.getItem('UserId') 
      getMyBooks(UserId)
    } else {
      // alert(data.message)
    }
  } catch (error) {
    console.error('Erro ao devolver livro:', error)
  }
}


async function GetMe() {
  if (!UserId) {
    alert('Usuário não logado')
    return
  }

  try {
    const res = await fetch(`${API_URL}/User/${UserId}`)
    if (!res.ok) throw new Error('Erro ao buscar usuário')

    const user = await res.json()

    const tbody = document.getElementById('GetMe')
    tbody.innerHTML = `
      <tr>
        <td>${user.id}</td>
        <td>${user.nome}</td>
        <td>${user.email}</td>
        <td>${user.isAdmin ? 'Sim' : 'Não'}</td>
      </tr>
    `
  } catch (error) {
    console.error(error)
    // alert('Erro ao carregar dados do usuário')
  }
}

async function GetMyBooks() {
  if (!UserId) {
    alert('Usuário não logado')
    return
  }
  try {
    const res = await fetch(`${API_URL}/book`) 
    if (!res.ok) throw new Error('Erro ao buscar livros')
    const books = await res.json()

  
    const myBooks = books.filter(book => book.UserId === UserId)
    const tbody = document.getElementById('MyBooks')
    tbody.innerHTML = ''

    myBooks.forEach(book => {
      const tr = document.createElement('tr')
      tr.innerHTML = `
        <td>${book.titulo}</td>
        <td>${book.autor}</td>
        <td>${book.genero}</td>
        <td>${book.UserId ? 'Alugado' : 'Disponível'}</td>
        <td><button onclick="DevolverBook('${book.id}')">Devolver</button></td>
      `
      tbody.appendChild(tr)
    })
  } catch (error) {
    console.error(error)
    // alert('Erro ao carregar livros do usuário')
  }
}

window.onload = ()=>{
  GetMe()       
  GetMyBooks()  
  DevolverBook()
}



