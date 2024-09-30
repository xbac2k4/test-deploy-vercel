const User = require("../models/User");
const UserService = require("../services/UserService");

class UserController {
    postLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            const data = await new UserService().login(email, password);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data,
                token: data.token,
                refreshToken: data.refreshToken
            })
        } catch (error) {
            console.log(error);
        }
    }
    postRegister = async (req, res) => {
        try {
            const file = req.file;
            // console.log(`file: ${file}`);
            const username = req.body.username;
            const sex = req.body.sex;
            const email = req.body.email;
            const password = req.body.password;
            const phone = req.body.phoneNumber;
            const roles = req.body.roles;
            var urlsImage = ""
            if(file != null){
                urlsImage = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
            }
            const data = await new UserService().register(file, username,sex, email, password, phone, roles, urlsImage);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
            console.log({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }
    getAllUser =  async (req, res) => {
        try {
            const data = await User.find().populate();
            // console.log('data: ', data);
            res.json({
                status: 200,
                message: "Danh sách thể loại",
                data: data
            })
        } catch (error) {
            console.log(error);
        }
    }
    getUserByPage = async (req, res) => {
        const { page, limit } = req.query;
        try {
            const data = await new UserService().getUserByPage(page, limit);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
        }
    }
    getUserByID = async (req, res, next) => {
        const { id } = req.params;
        try {
            const data = await new UserService().getUserByID(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.error('Error fetching movie', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await new UserService().deleteUser(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }
    changePassword = async (req, res) => {
        const { id } = req.params;
        const { newPassword } = req.body;
    
        console.log('Received data:', id, newPassword); // Kiểm tra dữ liệu nhận được từ frontend
    
        if (!id || !newPassword) {
            return res.status(400).json({ message: 'Invalid request, missing id or newPassword' });
        }
    
        try {
            const result = await new UserService().changePassword(id, newPassword);
            res.status(result.status).json(result);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    updateUserInfo = async (req, res) => {
        const userId = req.params.id;
        const { username, phoneNumber } = req.body;

        const result = await new UserService().updateUserInfo(userId, username, phoneNumber);
        res.status(result.status).json(result);
    }
    updateAvatar = async (req, res) => {
        try {
            const file = req.file;
            const userId = req.params.id;
            let urlsImage = null; // Đặt mặc định là null để chỉ cập nhật khi có file mới

            if (file != null) {
                if (req.get("host") == "10.0.2.2:3000") {
                    urlsImage = `${req.protocol}://localhost:3000/uploads/${file.filename}`;
     
                } else urlsImage = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
            }

            // Gọi service để cập nhật avatar
            const result = await new UserService().updateAvatar(userId, urlsImage);

            res.status(result.status).json(result);
        } catch (error) {
            console.error("Lỗi khi cập nhật avatar của người dùng:", error);
            res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật avatar của người dùng" });
        }
    }
}

module.exports = UserController;
