function authCheck(data) {
    console.log(data);

    if (data.status == 404) {
        swal.fire({
            title: 'User Not Found!',
            text: 'Please calls admin',
            icon: 'warning',
            confirmButtonText: 'Back'
        });

        $("#username").val('');
        $("#password").val('');
    } else {
        siswa = data.siswa;
        guru = data.guru;

        if (siswa.length > 0) {
            setLocalStorage(data.siswa[0], 'siswa');
            manageSession('siswa');
        } else if (guru.length > 0) {
            setLocalStorage(data.guru[0], 'guru');
            manageSession('guru');
        } else {
            swal.fire({
                title: 'Not confirmed User',
                text: 'Please Go out',
                icon: 'Warning',
                confirmButtonText: 'Close'
            });
        }
    }
}

function setLocalStorage(data, role) {
    switch (role) {
        case 'siswa':
            localStorage.clear();
            localStorage.setItem('nip', data.nisn);
            localStorage.setItem('nama', data.nama);
            localStorage.setItem('id_kelas', data.kelas_id);
            localStorage.setItem('role', 'siswa');
            break;

        default:
            localStorage.clear();
            localStorage.setItem('nip', data.nip);
            localStorage.setItem('nama', data.nama);
            localStorage.setItem('role', 'guru');
            break;
    }
}

function manageSession(role) {
    switch (role) {
        case 'guru':
            location.href = './pages/guru/home.html'
            break;

        default:
            location.href = './pages/siswa/home.html'
            break;
    }

}