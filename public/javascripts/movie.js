const url = 'http://localhost:3000/api/v1/movie'

let tbody = document.querySelector('tbody')
let page = document.getElementById('page')
let preloader = document.getElementById('preloader')
let dialog = document.getElementById('bgr-dialog')
let dialogbody = document.getElementById('dialog-content')
let pageNumber = document.getElementById('page-number')
let tang = document.getElementById('ic-tang')
let giam = document.getElementById('ic-giam')

let numberPage = 1;
let totalPages;

const fetchAPI_Page = (currentPage) => {
    fetch(`${url}/get-movie-by-page?page=${currentPage}&limit=5`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Đọc nội dung của phản hồi
        })
        .then(data => {
            // console.log("data ok: " + data.data.movies);
            let html = data.data.movies.map(items => {
                return /*html*/` 
                <tr>
                    <td><p style="
                    width: 50px;
                    color: red;   
                    white-space: nowrap; 
                    overflow: hidden;
                    text-overflow: ellipsis;">${items._id}</p></td>
                    <td>${items.start_date}</td>
                    <td>${items.end_date}</td>
                    <td><p style="
                            width: 70px;
                            color: red;   
                            white-space: nowrap; 
                            overflow: hidden;
                            text-overflow: ellipsis;">${items.name}</p>
                    </td>
                    <td>${items.id_category.name}</td>
                    <td>${items.duration}</td>
                    <td><p style="
                            width: 70px;
                            color: red;   
                            white-space: nowrap; 
                            overflow: hidden;
                            text-overflow: ellipsis;">${items.directors}</p>
                    </td>
                    <td style="gap: 20px; font-size: 20px" class="d-flex justify-content-end">
                        <i onclick="BtnChiTiet('${items.id_category._id}', '${items._id}', '${items.image}', '${items.id_category.name}', '${items.name}', '${items.start_date}', '${items.end_date}', '${items.duration}', '${items.directors}', '${items.description}')" class="bi bi-eye"></i> 
                        <i onclick="BtnSua('${items._id}')" class="bi bi-pen"></i> 
                        <i onclick="BtnXoa('${items._id}')"class="bi bi-trash3"></i>
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

const BtnChiTiet = (id_category, id_movie, image, name_category, name_movie, start_date, end_date, duration, directors, description) => {
    // alert(`Chức năng đang được phát triển ${name}`);
    dialog.style.display = 'flex';
    let html = /*html*/` 
        <div class="bgr-dialog-chitiet-content" style="
            width:100%;
            height:100%;
        ">
            <div class="bgr-dialog-chitiet-content-title text-center">
                <h2>THÔNG TIN PHIM</h2>
            </div>
            <div class="bgr-dialog-chitiet-content-body">
                <div class="bgr-dialog-chitiet-content-body-image d-flex flex-row justify-content-center" style="
                    width:100%;
                    margin: 20px;
                ">
                    <img width="150px" height="200px" 
                        style="
                            object-fit: cover;
                            align-self: center;
                            border-radius: 10px;
                        " src="${image}" alt="">
                </div>
                <div class="bgr-dialog-chitiet-content-body-category">
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0 20px;
                        font-weight: bold;
                        " >ID thể loại: ${id_category}
                    </p>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Tên thể loại: ${name_category}
                    </p>
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
                        " >Tên phim: ${name_movie}
                    </p>
                    <div style="padding: 0 40px" class="d-flex justify-content-between">
                        <p style="
                            background-color: white;
                            margin: 0;
                            " >Ngày khởi chiếu: ${start_date}
                        </p>
                        <p  style="
                            background-color: white;
                            margin: 0;
                            " >Ngày kết thúc: ${end_date}
                        </p>
                    </div>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Thời lượng: ${duration}
                    </p>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Đạo diễn: ${directors}
                    </p>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Mô tả: ${description}
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
                " type="button" onclick="closeDialog()">Đóng</button>
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

const BtnAdd = () => {
    dialog.style.display = 'flex';

    fetch(`http://localhost:3000/api/v1/category/get-category`)
        .then(response => response.json()) // Đọc nội dung của phản hồi
        .then(data => {
            const value = data.data.map(item => {
                return `<option value="${item._id}">${item.name}</option>`;
            }).join('');

            let html = /*html*/`
                <div class="dialog-add w-100 h-100">
                    <h2 class="title-dialog text-center">THÊM PHIM</h2>
                    <form id="form-movie" method="post" enctype="multipart/form-data">
                        <div class="form-group">
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupSelect01">Thể loại</label>
                                <select class="form-select" id="inputGroupSelect01" name="id_category">
                                    <option selected>Choose...</option>
                                    ${value}
                                </select>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="form-group">
                                <span class="title" id="inputGroup-sizing-default">Ngày khởi chiếu:</span>
                                <input id="start-date" type="date" class="form-control" name="start_date"
                                    aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                            </div>
                            <div class="form-group">
                                <span class="title" id="inputGroup-sizing-default">Ngày kết thúc:</span>
                                <input id="end-date" type="date" class="form-control" name="end_date"
                                    aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                            </div>
                        </div>
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Tên phim:</span>
                            <input id="name-movie" type="text" class="form-control" name="name"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                        </div>
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Hình ảnh: </span>
                            <input type="file" class="form-control" id="image" name="image"
                                aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept="image/*">
                        </div>
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Đạo diễn:</span>
                            <input id="directors" type="text" class="form-control" name="directors"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                        </div>
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Thời lượng phim:</span>
                            <input id="duration" type="number" class="form-control" name="duration"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                        </div>
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Mô tả:</span>
                            <input id="description" type="text" class="form-control" name="description"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                        </div>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-primary mx-5 w-25" type="submit">Lưu</button>
                            <button class="btn btn-outline-primary mx-5 w-25" type="button" onclick="closeDialog()">Hủy</button>
                        </div>
                    </form>
                </div>
            `;
            dialogbody.innerHTML = html;
            const form = document.getElementById('form-movie');
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                const formData = new FormData(form);
                formatAndSubmitForm(formData);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}

const formatAndSubmitForm = (formData) => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const startDate = formData.get('start_date');
    const endDate = formData.get('end_date');

    if (startDate) {
        formData.set('start_date', formatDate(startDate));
    }
    if (endDate) {
        formData.set('end_date', formatDate(endDate));
    }

    BtnLuu(formData);
}

const BtnLuu = async (formData) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/movie/add-movie-with-image`, {
            method: "POST",
            body: formData
        });
        const result = await response.json();
        console.log(result);
        if (response.status === 200) {
            alert('Thêm thành công');
            document.getElementById('form-movie').reset();
            dialog.style.display = 'none';
        } else {
            alert('Thêm thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi');
    }
}
const BtnSua = (itemId) => {
    dialog.style.display = 'flex';
    // console.log(itemId);

    // Fetch item data to populate the form
    // console.log(`${url}/get-movie-by-id/${itemId}`);
    fetch(`${url}/get-movie-by-id/${itemId}`)
        .then(response => response.json())
        .then(itemData => {
            fetch(`http://localhost:3000/api/v1/category/get-category`)
                .then(response => response.json())
                .then(categoryData => {
                    const value = categoryData.data.map(item => {
                        return `<option value="${item._id}" ${item._id === itemData.data.id_category ? 'selected' : ''}>${item.name}</option>`;
                    }).join('');
                    let html = /*html*/`
                        <div class="dialog-add w-100 h-100">
                            <h2 class="title-dialog text-center">SỬA PHIM</h2>
                            <form id="form-movie" method="post" enctype="multipart/form-data">
                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <label class="input-group-text" for="inputGroupSelect01">Thể loại</label>
                                        <select class="form-select" id="inputGroupSelect01" name="id_category">
                                            <option selected>Choose...</option>
                                            ${value}
                                        </select>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div class="form-group">
                                        <span class="title" id="inputGroup-sizing-default">Ngày khởi chiếu:</span>
                                        <input id="start-date" type="date" class="form-control" name="start_date"
                                            value="${formatDateForInput(itemData.data.start_date)}"
                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                                    </div>
                                    <div class="form-group">
                                        <span class="title" id="inputGroup-sizing-default">Ngày kết thúc:</span>
                                        <input id="end-date" type="date" class="form-control" name="end_date"
                                            value="${formatDateForInput(itemData.data.end_date)}"
                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <span class="title" id="inputGroup-sizing-default">Tên phim:</span>
                                    <input id="name-movie" type="text" class="form-control" name="name"
                                        value="${itemData.data.name}"
                                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                                </div>
                                <div class="form-group">
                                    <span class="title" id="inputGroup-sizing-default">Hình ảnh: </span>
                                    <input type="file" class="form-control" id="image" name="image"
                                        aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept="image/*">
                                </div>
                                <div class="form-group">
                                    <span class="title" id="inputGroup-sizing-default">Đạo diễn:</span>
                                    <input id="directors" type="text" class="form-control" name="directors"
                                        value="${itemData.data.directors}"
                                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                                </div>
                                <div class="form-group">
                                    <span class="title" id="inputGroup-sizing-default">Thời lượng phim:</span>
                                    <input id="duration" type="number" class="form-control" name="duration"
                                        value="${itemData.data.duration}"
                                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                                </div>
                                <div class="form-group">
                                    <span class="title" id="inputGroup-sizing-default">Mô tả:</span>
                                    <input id="description" type="text" class="form-control" name="description"
                                        value="${itemData.data.description}"
                                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                                </div>
                                <div class="d-flex justify-content-center">
                                    <button class="btn btn-primary mx-5 w-25" type="submit">Lưu</button>
                                    <button class="btn btn-outline-primary mx-5 w-25" type="button" onclick="closeDialog()">Hủy</button>
                                </div>
                            </form>
                        </div>
                    `;
                    dialogbody.innerHTML = html;
                    const form = document.getElementById('form-movie');
                    form.addEventListener('submit', function (event) {
                        event.preventDefault();
                        const formData = new FormData(form);
                        formatAndSubmitUpdateForm(itemId, formData);
                    });
                })
                .catch(error => console.error('Error fetching categories:', error));
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
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const startDate = formData.get('start_date');
    const endDate = formData.get('end_date');

    if (startDate) {
        formData.set('start_date', formatDate(startDate));
    }
    if (endDate) {
        formData.set('end_date', formatDate(endDate));
    }

    BtnUpdate(itemId, formData);
}

const BtnUpdate = async (itemId, formData) => {
    try {
        const response = await fetch(`${url}/update-movie-with-image/${itemId}`, {
            method: "PUT",
            body: formData
        });
        const result = await response.json();
        console.log(result);
        if (response.status === 200) {
            alert('Cập nhật thành công');
            document.getElementById('form-movie').reset();
            dialog.style.display = 'none';
            fetchAPI_Page(numberPage)
        } else {
            alert('Cập nhật thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi');
    }
}

const BtnXoa = async (itemId) => {
    if (confirm('Bạn có muốn xóa')) {
        const response = await fetch(`${url}/delete-movie/${itemId}`, { method: 'DELETE' })
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


