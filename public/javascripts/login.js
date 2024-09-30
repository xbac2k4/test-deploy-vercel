const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
// require('dotenv').config();
const url = `http://localhost:3000/api/v1/user`


const loginUser = async () => {
    try {
        const formData = new FormData(loginForm);
        // formData.append("email", email.value);
        // formData.append("password", password.value);
        console.log("email: " + formData.get("email") + "\n" + "pass: " + formData.get("password"));
        const response = await fetch(`${url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded" // Set content type to x-www-form-urlencoded
            },
            body: new URLSearchParams(formData).toString()
        })
        const result = await response.json();
        console.log(result);
        if (result.status === 200) {
            alert(result.message)
            window.location.href = '/category';
            form.reset()
        } else {
            alert(result.message)
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

//sjdfgksdjdfsdjfgsjgfs

loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    loginUser();
});
