function getProfile(uniqueID, role) {
    API = `${endpoint}api-profile/get_profile`;
    formData = new FormData();
    if (role == 'siswa') {
        formData.append('nisn', uniqueID);
    } else {
        formData.append('nip', uniqueID);
    }


    formData.append('role', role);
    fetch(API, {
            method: 'post',
            mode: 'no-cors',
            credentials: 'omit',
            body: formData
        }).then(res => res.json())
        .then((data) => {
            localStorage.setItem('profile-detail', JSON.stringify(data[0]));
        }).catch((err) => {
            swal.fire({
                title: 'Error Fecthing Data',
                text: 'Please contant admin',
                icon: 'error',
                confirmButtonText: 'Close'
            });
        });


}