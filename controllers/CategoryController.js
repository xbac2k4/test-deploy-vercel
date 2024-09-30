const Category = require("../models/Category");
const CategoryService = require("../services/CategoryService");
// get category by page
class CategoryController {
    getCategoryByPage = async (req, res) => {
        const { page, limit } = req.query;
        try {
            const data = await new CategoryService().getCategoryByPage(page, limit);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
        }
    }
    getAllCategory =  async (req, res) => {
        try {
            const data = await Category.find().populate();
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
    addCategory = async (req, res) => {
        try {
            const name = req.body.name;
            // console.log(req.body);
            // console.log(`name: ${name}`);
            const data = await new CategoryService().addCategory(name);
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
    updateCategory = async (req, res) => {
        try {
            const { id } = req.params
            const name = req.body.name;
            if (!name) {
                return {
                    status: -1,
                    message: "Vui lòng nhập tên thể loại",
                    data: null
                }
            }
            
            const data = await new CategoryService().updateCategory( id, name);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" }); // Trả về mã lỗi 500 nếu có lỗi
        }
    }
    deleteCategory = async (req, res) => {
        try {
            const { id } = req.params;
            // const newSinhVien = new SinhVienModel();
            const result = await Category.findByIdAndDelete(id);

            if (result) {
                res.json({
                    status: 200,
                    message: "Xóa thành công",
                    data: result
                })
            } else {
                res.json({
                    status: 400,
                    message: "Lỗi xóa không thành công",
                    data: []
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CategoryController;
