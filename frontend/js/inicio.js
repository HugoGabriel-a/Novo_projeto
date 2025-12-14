function goToAdm() {
  const isAdmin = localStorage.getItem('isAdmin')

  if (isAdmin === 'true') {
    window.location.href = 'adm.html'
  } else {
    alert('Você não é administrador')
  }
}