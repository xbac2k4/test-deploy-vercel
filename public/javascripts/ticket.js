const url = 'http://localhost:3000/api/v1/detailticket'
let dialog = document.getElementById('bgr-dialog')
let dialogbody = document.getElementById('dialog-content')
let tbody = document.querySelector('tbody')
let page = document.getElementById('page')
let preloader = document.getElementById('preloader')
let pageNumber = document.getElementById('page-number')
let tang = document.getElementById('ic-tang')
let giam = document.getElementById('ic-giam')

let numberPage = 1;
let totalPages;

const fetchAPI_Page = (currentPage) => {
    fetch(`${url}/get-detailticket-by-page?page=${currentPage}&limit=5`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Đọc nội dung của phản hồi
        })
        .then(data => {
            // console.log(data.data);
            // console.log(data.data.categories);
            // console.log(data.data.totalPages);
            let html = data.data.detailticket.map(items => {
                return /*html*/` 
                <tr>
                    <td><p style="
                    width: 50px;
                    color: red;   
                    white-space: nowrap; 
                    overflow: hidden;
                    text-overflow: ellipsis;">${items._id}</p></td>
                    <td><p style="
                            width: 70px;
                            color: red;   
                            white-space: nowrap; 
                            overflow: hidden;
                            text-overflow: ellipsis;">${items.movieName}</p>
                    </td>
                    <td>${items.date}</td>
                    <td>${items.timeName} - ${items.roomName}</td>
                    <td>${items.seatName}</td>
                    <td>
                        ${items.status == false ?
                            `<div style="width: 20px; height: 20px; background-color: red; border-radius: 100%;"></div>` :
                            `<div style="width: 20px; height: 20px; background-color: green; border-radius: 100%;"></div>`}
                        </td>
                    <td style="gap: 20px; font-size: 20px" class="d-flex justify-content-end">
                        <i onclick="BtnXacNhan('${items._id}')"class="bi bi-trash3"></i>
                    </td>
                </tr>
            `;
            }).join('');
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

tang.addEventListener('click', event => {
    event.preventDefault();
    if (numberPage < totalPages) {
        numberPage++;
        fetchAPI_Page(numberPage);
    }
});
giam.addEventListener('click', event => {
    event.preventDefault();
    if (numberPage > 1) {
        numberPage--;
        fetchAPI_Page(numberPage);
    }
});

const BtnXacNhan = async (itemId) => {
    try {
        const response = await fetch(`${url}/update-detailticket/${itemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded" // Set content type to x-www-form-urlencoded
            },
            // body: new URLSearchParams(formData).toString()
        });
        const result = await response.json();
        console.log(result);
        if (result.status === 200) {
            alert(result.message);
            fetchAPI_Page(numberPage);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi');
    }
}

const search = document.getElementById('search');

search.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // Check if Enter key is pressed
        if (search.value) {
            fetch(`${url}/get-ticket-by-id/${search.value}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Read the response body as JSON
                })
                .then(data => {
                    let html =
                        ` 
                        <tr>
                            <td>
                                <p style="
                                width: 50px;
                                color: red;   
                                white-space: nowrap; 
                                overflow: hidden;
                                text-overflow: ellipsis;">
                                    ${data.data._id}
                                </p>
                            </td>
                            <td>
                                <p style="
                                width: 70px;
                                color: red;   
                                white-space: nowrap; 
                                overflow: hidden;
                                text-overflow: ellipsis;">
                                    ${data.data.movieName}
                                </p>
                            </td>
                            <td>${data.data.date}</td>
                            <td>${data.data.timeName} - ${data.data.roomName}</td>
                            <td>${data.data.seatName}</td>
                            <td>
                                ${data.data.status === false ?
                                    `<div style="width: 20px; height: 20px; background-color: red; border-radius: 100%;"></div>` :
                                    `<div style="width: 20px; height: 20px; background-color: green; border-radius: 100%;"></div>`}
                            </td>
                            <td style="gap: 20px; font-size: 20px" class="d-flex justify-content-end">
                                <i onclick="BtnXacNhan('${data.data._id}')" class="bi bi-trash3"></i>
                            </td>
                        </tr>`;
                    preloader.style.display = 'none';
                    tbody.innerHTML = html;
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        } else {
            // console.error('Search input is empty');
            fetchAPI_Page(numberPage)
        }
    }
});

const clear = document.getElementById('clear')
clear.addEventListener('click', () => {
    search.value = '';
    fetchAPI_Page(numberPage);
});



