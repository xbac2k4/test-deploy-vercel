const url = 'http://localhost:3000/api/v1/showtimes'

let tbody = document.querySelector('tbody')
let page = document.getElementById('page')
let preloader = document.getElementById('preloader')
let dialog = document.getElementById('bgr-dialog')
let dialogbody = document.getElementById('dialog-content')
let pageNumber = document.getElementById('page-number')
let tang = document.getElementById('ic-tang')
let giam = document.getElementById('ic-giam')
let htmlRoom;

let numberPage = 1;
let totalPages;

const fetchAPI_Page = async (currentPage) => {
    await fetch(`${url}/get-showtimes-by-page?page=${currentPage}&limit=5`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Đọc nội dung của phản hồi
        })
        .then(data => {
            // console.log("data ok: " + data.data.movies);
            let html = data.data.showtimes.map(items => {
                // console.log(items);
                return /*html*/` 
                <tr>
                    <td><p style="
                    width: 50px;
                    color: red;   
                    white-space: nowrap; 
                    overflow: hidden;
                    text-overflow: ellipsis;">${items._id}</p></td>
                    <td>${items.id_room.roomName}</td>
                    <td>${items.id_time.timeName}</td>
                    <td>${items.date}</td>
                    <td><p style="
                            width: 70px;
                            color: red;   
                            white-space: nowrap; 
                            overflow: hidden;
                            text-overflow: ellipsis;">${items.id_movie.name}</p>
                    </td>
                    <td style="gap: 20px; font-size: 20px" class="d-flex justify-content-end">
                        <i onclick="BtnChiTiet('${items._id}', '${items.date}', '${items.id_room.roomName}', '${items.id_time.timeName}', '${items.id_movie._id}', '${items.id_movie.name}')" class="bi bi-eye"></i> 
                        <i onclick="BtnSua('${items._id}')" class="bi bi-pen"></i> 
                        <i onclick="BtnXoa('${items._id}')" class="bi bi-trash3"></i>
                    </td>
                </tr>
            `;
            }).join('');
            // let htmlPage = data.data.totalPages;
            // let htmlPage = [...Array(data.data.totalPages).keys()].map(page => {
            //     return /*html*/` 
            //     <button type="button" class="btn btn-outline-secondary ${page + 1 === currentPage ? 'active' : ''}" onclick="BtnPage(${page + 1})">${page + 1}</button>
            // `;
            // })
            preloader.style.display = 'none';
            tbody.innerHTML = html;
            pageNumber.value = numberPage;
            totalPages = data.data.totalPages;
            // page.innerHTML = htmlPage;
        })
        .catch(error => {
            console.error('There was a itemsblem with the fetch operation:', error);
        });
}
{/* <button onclick="BtnXoa('${items._id}')" class="btn btn-outline-danger">Chi tiết</button> <button class="btn btn-outline-info" onclick="BtnSua('${items._id}','${items.image}','${items.name}')">Sửa</button> <button onclick="BtnXoa('${items._id}')" class="btn btn-outline-danger">Xóa</button> */ }
fetchAPI_Page(numberPage);

const BtnChiTiet = (id_showtimes, date, room, time, id_movie, movie_name) => {
    // alert(`Chức năng đang được phát triển ${name}`);
    dialog.style.display = 'flex';
    let html = /*html*/` 
        <div class="bgr-dialog-chitiet-content" style="
            width:100%;
            height:100%;
        ">
            <div class="bgr-dialog-chitiet-content-title text-center">
                <h2>THÔNG TIN LỊCH CHIẾU</h2>
            </div>
            <div class="bgr-dialog-chitiet-content-body-movie d-flex justify-content-end">
                <p  style="
                    background-color: white;
                    color: red;
                    margin: 0;
                    padding: 0 20px;
                    font-weight: bold;
                    font-size: 20px;
                    " >${date}
                </p>
            </div>
            <div class="bgr-dialog-chitiet-content-body">
                <div class="bgr-dialog-chitiet-content-body-category">
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0 20px;
                        font-weight: bold;
                        " >ID lịch chiếu: ${id_showtimes}
                    </p>
                    <div style="padding: 0 40px" class="d-flex justify-content-between">
                        <p style="
                            background-color: white;
                            margin: 0;
                            " >Phòng chiếu: ${room}
                        </p>
                        <p  style="
                            background-color: white;
                            margin: 0;
                            " >Giờ chiếu: ${time}
                        </p>
                    </div>
                </div>
                <div class="bgr-dialog-chitiet-content-body-movie">
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0 20px;
                        font-weight: bold;
                        " >ID phim: ${id_movie}
                    </p>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Tên phim: ${movie_name}
                    </p>
                </div>
            </div>
            <div class="bgr-dialog-chitiet-content-button text-center">
                <button style="
                    width: 30%;
                    height: 55px;
                    background-color: #404E67;
                    color: white;
                    outline: none;
                    border: none;
                    border-radius: 5px;
                    margin-top: 20px;
                " type="button" onclick="closeDialog()">OK</button>
            </div>
        </div>
    `
    dialogbody.innerHTML = html;
}

const closeDialog = () => {
    dialog.style.display = 'none';
}

tang.addEventListener('click', event => {
    event.preventDefault();
    if (numberPage < totalPages) {
        numberPage++;
        fetchAPI_Page(numberPage);
    }
});
giam.addEventListener('click', event => {
    event.preventDefault();
    if (numberPage > 0) {
        numberPage--;
        fetchAPI_Page(numberPage);
    }
});

const BtnThem = async () => {
    dialog.style.display = 'flex';

    Promise.all([
        await fetch(`http://localhost:3000/api/v1/room/get-room`).then(response => response.json()),
        await fetch(`http://localhost:3000/api/v1/time/get-time`).then(response => response.json()),
        await fetch(`http://localhost:3000/api/v1/movie/get-movie`).then(response => response.json())
    ]).then(([roomData, timeData, movieData]) => {
        const valueRoom = roomData.data.map(item => `<option value="${item._id}">${item.roomName}</option>`).join('');
        const valueTime = timeData.data.map(item => `<option value="${item._id}">${item.timeName}</option>`).join('');
        const valueMovie = movieData.data.map(item => `<option value="${item._id}">${item.name}</option>`).join('');

        const Dialoghtml = `
            <div class="dialog-add w-100 h-100">
                <h2 class="title-dialog text-center">THÊM LỊCH CHIẾU</h2>
                <form id="form-showtime" method="post">         
                    <div class="form-group">
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="inputGroupSelectRoom">Phòng chiếu</label>
                            <select class="form-select" id="inputGroupSelectRoom" name="id_room">
                                <option selected>Choose room...</option>
                                ${valueRoom}
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="inputGroupSelectDate">Ngày chiếu</label>
                            <input id="date" type="date" class="form-control" name="date">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="inputGroupSelectTime">Giờ chiếu</label>
                            <select class="form-select" id="inputGroupSelectTime" name="id_time">
                                <option selected>Choose time...</option>
                                ${valueTime}
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="inputGroupSelectMovie">Phim</label>
                            <select class="form-select" id="inputGroupSelectMovie" name="id_movie">
                                <option selected>Choose movie...</option>
                                ${valueMovie}
                            </select>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary mx-5 w-25" type="submit">Lưu</button>
                        <button class="btn btn-outline-primary mx-5 w-25" type="button" onclick="closeDialog()">Hủy</button>
                    </div>
                </form>
            </div>`;

        dialogbody.innerHTML = Dialoghtml;
        const form = document.getElementById('form-showtime');
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(form);
            // console.log(formData.get('date')+ '\n' + formData.get('id_movie') + '\n' + formData.get('id_room') + '\n' + formData.get('id_time'));
            formatAndSubmitForm(formData);
        });
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
};

const formatAndSubmitForm = (formData) => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const date = formData.get('date');

    if (date) {
        formData.set('date', formatDate(date));
    }

    BtnLuu(formData);
};

const BtnLuu = async (formData) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/showtimes/add-showtimes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded" // Set content type to x-www-form-urlencoded
            },
            body: new URLSearchParams(formData).toString()
        });
        const result = await response.json();
        console.log(result);
        if (result.status === 200) {
            alert(result.message);
            document.getElementById('form-showtime').reset();
            dialog.style.display = 'none';
            fetchAPI_Page(numberPage);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi');
    }
};

const BtnSua = (itemId) => {
    dialog.style.display = 'flex';
    // console.log(itemId);

    // Fetch item data to populate the form
    // console.log(`${url}/get-movie-by-id/${itemId}`);
    fetch(`${url}/get-showtimes-by-id/${itemId}`)
        .then(response => response.json())
        .then(itemData => {
            console.log(itemData);
            Promise.all([
                fetch(`http://localhost:3000/api/v1/room/get-room`).then(response => response.json()),
                fetch(`http://localhost:3000/api/v1/time/get-time`).then(response => response.json()),
                fetch(`http://localhost:3000/api/v1/movie/get-movie`).then(response => response.json())
            ]).then(([roomData, timeData, movieData]) => {
                const valueRoom = roomData.data.map(item => `<option value="${item._id}" ${item._id === itemData.data.id_room ? 'selected' : ''}>${item.roomName}</option>`).join('');
                const valueTime = timeData.data.map(item => `<option value="${item._id}" ${item._id === itemData.data.id_time ? 'selected' : ''}>${item.timeName}</option>`).join('');
                const valueMovie = movieData.data.map(item => `<option value="${item._id}" ${item._id === itemData.data.id_movie ? 'selected' : ''}>${item.name}</option>`).join('');

                const Dialoghtml = `
                    <div class="dialog-add w-100 h-100">
                        <h2 class="title-dialog text-center">THÊM LỊCH CHIẾU</h2>
                        <form id="form-showtime" method="post">         
                            <div class="form-group">
                                <div class="input-group mb-3">
                                    <label class="input-group-text" for="inputGroupSelectRoom">Phòng chiếu</label>
                                    <select class="form-select" id="inputGroupSelectRoom" name="id_room">
                                        <option selected>Choose room...</option>
                                        ${valueRoom}
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-3">
                                    <label class="input-group-text" for="inputGroupSelectDate">Ngày chiếu</label>
                                    <input id="date" value="${formatDateForInput(itemData.data.date)}" type="date" class="form-control" name="date">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-3">
                                    <label class="input-group-text" for="inputGroupSelectTime">Giờ chiếu</label>
                                    <select class="form-select" id="inputGroupSelectTime" name="id_time">
                                        <option selected>Choose time...</option>
                                        ${valueTime}
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-3">
                                    <label class="input-group-text" for="inputGroupSelectMovie">Phim</label>
                                    <select class="form-select" id="inputGroupSelectMovie" name="id_movie">
                                        <option selected>Choose movie...</option>
                                        ${valueMovie}
                                    </select>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-primary mx-5 w-25" type="submit">Lưu</button>
                                <button class="btn btn-outline-primary mx-5 w-25" type="button" onclick="closeDialog()">Hủy</button>
                            </div>
                        </form>
                    </div>`;

                dialogbody.innerHTML = Dialoghtml;
                const form = document.getElementById('form-showtime');
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    const formData = new FormData(form);
                    // console.log(formData.get('date')+ '\n' + formData.get('id_movie') + '\n' + formData.get('id_room') + '\n' + formData.get('id_time'));
                    formatAndSubmitUpdateForm(itemId, formData);
                });
            }).catch(error => {
                console.error('Error fetching data:', error);
            });
        })
        .catch(error => console.error('Error fetching item data:', error));
}

const formatDateForInput = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
}

const formatAndSubmitUpdateForm = (itemId, formData) => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const date = formData.get('date');

    if (date) {
        formData.set('date', formatDate(date));
    }

    BtnUpdate(itemId, formData);
}

const BtnUpdate = async (itemId, formData) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/showtimes/update-showtimes/${itemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded" // Set content type to x-www-form-urlencoded
            },
            body: new URLSearchParams(formData).toString()
        });
        const result = await response.json();
        console.log(result);
        if (result.status === 200) {
            alert(result.message);
            document.getElementById('form-showtime').reset();
            dialog.style.display = 'none';
            fetchAPI_Page(numberPage);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi');
    }
}

const BtnXoa = async (itemId) => {
    if (confirm('Bạn có muốn xóa')) {
        const response = await fetch(`${url}/delete-showtimes/${itemId}`, { method: 'DELETE' })
        const result = await response.json();
        if (result.status === 200) {
            alert(result.message);
            fetchAPI_Page(numberPage)
            // form.reset()
        } else {
            alert(`Error: ${result.message}`);
        }
    }
}