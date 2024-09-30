const url = 'http://localhost:3000/api/v1/user'

let tbody = document.querySelector('tbody')
let page = document.getElementById('page')
let dialog = document.getElementById('bgr-dialog')
let dialogbody = document.getElementById('dialog-content')
let preloader = document.getElementById('preloader')
let pageNumber = document.getElementById('page-number')
let tang = document.getElementById('ic-tang')
let giam = document.getElementById('ic-giam')

let numberPage = 1;
let totalPages;

console.log(dialog);      // Should not be null
console.log(dialogbody);  // Should not be null

const fetchAPI_Page = (currentPage) => {
    fetch(`${url}/get-user-by-page?page=${currentPage}&limit=5`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Đọc nội dung của phản hồi
        })
        .then(data => {
            // console.log("data ok: " + data.data.users);
            let html = data.data.users.map(items => {
                return /*html*/` 
                <tr>
                    <td>
                        <p style="
                            width: 70px;
                            color: red;   
                            white-space: nowrap; 
                            overflow: hidden;
                            text-overflow: ellipsis;">${items._id}</p>
                    </td>
                    <td>
                        <img style="width:30px;height:30px,object-fit:cover" src="${items.avatar}"/>
                    </td>               
                    <td>${items.username}</td>
                    <td>${items.sex == 0 ? 'Nam' : 'Nữ'}</td>
                    <td>${items.email}</td>
                    <td>${items.phoneNumber}</td>
                    <td style="gap: 20px; font-size: 20px" class="d-flex justify-content-end">
                        <i onclick="BtnChiTiet('${items._id}','${items.avatar}','${items.username}','${items.sex == 0 ? 'Nam' : 'Nữ'}','${items.email}','${items.phoneNumber}')" class="bi bi-eye"></i>
                        <i onclick="BtnXoa('${items._id}')" class="bi bi-trash3"></i>
                    </td>
                </tr>
            `;
            // <i onclick="BtnSua('${items._id}')" class="bi bi-pen"></i> 
            }).join('');
            // let htmlPage = data.data.totalPages;
            preloader.style.display = 'none';
            tbody.innerHTML = html;
            pageNumber.value = numberPage;
            totalPages = data.data.totalPages;
        })
        .catch(error => {
            console.error('There was a itemsblem with the fetch operation:', error);
        });
}

fetchAPI_Page(numberPage);

const BtnChiTiet = (_id,avatar,username,sex,email,phoneNumber) => {
    // alert(`Chức năng đang được phát triển ${name}`);
    dialog.style.display = 'flex';
    let html = /*html*/` 
        <div class="bgr-dialog-chitiet-content" style="
            width:100%;
            height:100%;
        ">
            <div class="bgr-dialog-chitiet-content-title text-center">
                <h2>THÔNG TIN NGƯỜI DÙNG</h2>
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
                        " src="${avatar}" alt="">
                </div>
                <div class="bgr-dialog-chitiet-content-body-category">
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0 20px;
                        font-weight: bold;
                        " >ID người dùng: ${_id}
                    </p>
                    <div class="d-flex justify-content-between">
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Tên người dùng: ${username}
                    </p>
                        <p  style="
                            background-color: white;
                            margin: 0;
                            padding-right:100px;
                            " >Giới tính: ${sex }
                        </p>
                        
                    </div>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Email: ${email}
                    </p>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Số điện thoại: ${phoneNumber}
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
const BtnAdd = () => {
    dialog.style.display = 'flex';

        let html = /*html*/`
                <div class="dialog-add w-100 h-100">
                    <h2 class="title-dialog text-center">Thêm User</h2>
                    <form id="form-movie" method="post" enctype="multipart/form-data">
                        <div class="form-group">
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupSelect01"> Giới tính</label>
                                <select class="form-select" id="inputGroupSelect01" name="sex" id="sex">
                                    <option name="sex" id="sex" selected value="0">Nam</option>
                                    <option name="sex" id="sex" value="1">Nữ</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Tên:</span>
                            <input id="name-movie" type="text" class="form-control" name="username"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                        </div>
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Hình ảnh: </span>
                            <input type="file" class="form-control" id="image" name="image"
                                aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept="image/*">
                        </div>
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Email:</span>
                            <input id="directors" type="text" class="form-control" name="email"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                        </div>
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Password:</span>
                            <input id="directors" type="text" class="form-control" name="password"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                        </div>
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Số điện thoại:</span>
                            <input id="duration" type="text" class="form-control" name="phoneNumber"
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
                console.log(formData.get('sex'));
                // formatAndSubmitForm(formData);
                BtnLuu(formData)
            });
            
        
}
const BtnLuu = async (formData) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/user/register`, {
            method: "POST",
            body: formData
        });
        const result = await response.json();
        console.log(result);
        if (result.status === 200) {
            alert('Thêm thành công');
            document.getElementById('form-movie').reset();
            fetchAPI_Page(numberPage);
            dialog.style.display = 'none';
        } else {
            alert('Thêm thất bại');
            console.log();
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
    fetch(`${url}/get-user-by-id/${itemId}`)
        .then(response => response.json())
        .then(itemData => {
            
            let html = /*html*/`
            <div class="dialog-add w-100 h-100">
                <h2 class="title-dialog text-center">THÊM User</h2>
                <form id="form-movie" method="post" enctype="multipart/form-data">
                    <div class="form-group">
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="inputGroupSelect01"> Giới tính</label>
                            <select class="form-select" id="inputGroupSelect01" name="sex">
                                <option selected value="0">Nam</option>
                                <option value="1">Nữ</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <span class="title" id="inputGroup-sizing-default">Tên:</span>
                        <input value="${itemData.data.username}" id="name-movie" type="text" class="form-control" name="username"
                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                    </div>
                    <div class="form-group">
                        <span class="title" id="inputGroup-sizing-default">Hình ảnh: </span>
                        <input type="file" class="form-control" id="image" name="image"
                            aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept="image/*">
                    </div>
                    <div class="form-group">
                        <span class="title" id="inputGroup-sizing-default">Email:</span>
                        <input value="${itemData.data.email}" id="directors" type="text" class="form-control" name="email"
                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                    </div>
                    <div class="form-group">
                        <span class="title" id="inputGroup-sizing-default">Số điện thoại:</span>
                        <input value="${itemData.data.phoneNumber}" id="duration" type="text" class="form-control" name="phoneNumber"
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
            // formatAndSubmitForm(formData);
        });
        })
        .catch(error => console.error('Error fetching item data:', error));
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
        const response = await fetch(`${url}/delete-user/${itemId}`, { method: 'DELETE' })
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
