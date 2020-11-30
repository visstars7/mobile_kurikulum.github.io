function _storeAbsensiGuru(id_ruang) {
    var nip = localStorage.getItem('nip');
    var fd = new FormData();
    var jenis = $("#jenis").val();
    var API = `${endpoint}api-absensi-guru/store`;

    if (jenis.length > 0) {
        fd.append('nip', nip);
        fd.append('id_ruang', id_ruang);
        fd.append('jenis_absensi', jenis);
        fd.append('status', 1);

        fetch(API, {
                method: 'post',
                mode: 'cors',
                credentials: 'omit',
                body: fd
            }).then(res => res.json())
            .then((data) => {
                if (data.status == 200) {
                    swal.fire({
                        title: 'Absensi tercatat',
                        text: 'Absensi guru tercatat',
                        icon: 'success',
                        confirmButtonText: 'close'
                    }).then(() => {
                        if (jenis == 1) {
                            localStorage.setItem('id_ruang', id_ruang);
                            _getAbsenSiswa();
                        } else {
                            localStorage.removeItem('id_ruang');
                            localStorage.removeItem('data-siswa');
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            });

    } else {
        swal.fire({
            title: 'Pilih Status',
            text: 'Anda belum memilih status',
            icon: 'warning',
            confirmButtonText: 'close'
        });
    }

}

function _getAbsenSiswa() {
    var nip = localStorage.getItem('nip');
    var API = `${endpoint}api-absensi-siswa/get`
    var fd = new FormData();
    fd.append('nip', nip);
    fetch(API, {
            method: 'post',
            mode: 'cors',
            credentials: 'omit',
            body: fd
        }).then(res => res.json())
        .then((data) => {
            json = JSON.stringify(data);
            localStorage.setItem('data-siswa', json);
            $("#btn-data-siswa").html(`<div id="btn-data-siswa" style="margin-top: 120px;margin-left:20px;margin-right: 20px;"><a href="#" onclick="onSiswa()" class="button button-xs round-small shadow-large button-border button-full border-green2-dark bg-green2-dark color-theme bg-transparent bottom-0"><i class="fa fa-sign-out mr-10"></i>Absensi Siswa</a></div>`);
        }).catch(() => {
            swal.fire({
                title: 'Tidak ada siswa',
                text: 'Silahkan kontak admin',
                icon: 'error'
            });
        });
}

function onValue(val) {
    if (val == 1) {
        swal.fire({
            title: 'Status Masuk',
            text: 'Silahkan scan barcode ruangan',
            icon: 'success'
        });
    } else {
        swal.fire({
            title: 'Status Keluar',
            text: 'Silahkan scan barcode ruangan',
            icon: 'success'
        });
    }
    $("#jenis").val(val);
}

function storeAbsensiSiswa() {
    var nisn = [];
    var status = [];
    var id_ruang = localStorage.getItem('id_ruang');
    var nip = localStorage.getItem('nip');

    $("input[name='nisn[]']").each((idx, val) => {
        nisn.push(val.value);
    });

    $("input[name='status_kehadiran[]']").each((idx, val) => {
        status.push(val.value)
    });

    var API = `${endpoint}api-absensi-siswa/store`;

    var fd = new FormData();

    fd.append('nisn', nisn);
    fd.append('status_kehadiran', status);
    fd.append('id_ruang', id_ruang);
    fd.append('nip', nip);

    fetch(API, {
            method: 'post',
            mode: 'cors',
            credentials: 'omit',
            body: fd
        }).then(res => res.json())
        .then((data) => {
            if (data.status == 200) {
                swal.fire({
                    title: 'Absensi Siswa Tercatat',
                    text: 'Sukses Melakukan Absensi',
                    icon: 'success'
                }).then(() => {
                    localStorage.removeItem('data-siswa');
                    location.href = BASE_URL('pages/guru/home.html');
                });
            }
        }).catch((err) => {
            console.log(err)
        });

}

function onSiswa() {
    var children = [];
    data = JSON.parse(localStorage.getItem('data-siswa'));
    var no = 1;
    $.each(data, (idx, val) => {
        children += `
            <div>
                <input class="checkbox" style="margin-left: 100px;margin-right: 10px;" id="status${no++}" name="status_kehadiran[]" value="0" type="checkbox"><span> Hadir</span>

                <input name="nisn[]" id="nisn${no++}" type="hidden" value="${val.nisn}">
                <div class="form-group">
                    <input type="name" class="form-control" name="name" value="${val.nama}" readonly="" style="width: 100%;padding: 9px;text-align: center;border: 1px solid darkgrey;margin: 10px;font-size: 16px;border-radius: 10px;">
                </div>
            </div>
        `;
    });

    children += `<div id="btn-data-siswa" style="margin-top: 10px;margin-left:20px;margin-right: 20px;"><a href="#" onclick="storeAbsensiSiswa()" class="button button-xs round-small shadow-large button-border button-full border-green2-dark bg-green2-dark color-theme bg-transparent bottom-0"><i class="fa fa-sign-out mr-10"></i>Kirim</a></div>`

    $("#form").html(children);
    $("#modal").modal();
}