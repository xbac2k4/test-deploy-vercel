const Category = require("../models/Category");

class CategoryService {
    getCategoryByPage = async (page, limit) => {
        try {
            const skip = (parseInt(page) - 1) * parseInt(limit);
            const categories = await Category.find().skip(skip).limit(parseInt(limit));
            const totalCategories = await Category.countDocuments();
            const totalPages = Math.ceil(totalCategories / parseInt(limit));
            // console.log('data: ', data);
            return {
                status: 200,
                message: "Danh sách thể loại",
                data: {categories, totalPages}
            }
        } catch (error) {
            console.log(error);
        }
    }
    addCategory = async (name) => {
        try {
            const existing = await Category.findOne({
                name: name
            });
            // console.log(existingShowtime);
            if (existing) {
                return {
                    status: -2,
                    message: "Thể loại đã tồn tại",
                    data: null
                };
            }
            const newCategory = new Category({
                // image: urlsImage,
                name: name
            });
            const result = await newCategory.save();
            if (result) {
                return {
                    status: 200,
                    message: "Thêm thành công",
                    data: result
                };
            } else {
                return {
                    status: 400,
                    message: "Lỗi, thêm không thành công",
                    data: []
                };
            }
        } catch (error) {
            console.error('Error:', error);
            return {
                status: -1,
                message: 'Internal server error',
                data: null
            };
        }
    }
    updateCategory = async (id, name) => {
        try {
            const update = await Category.findById(id)
            const existing = await Category.findOne({
                name: name
            });
            // console.log(existingShowtime);
            if (existing) {
                return {
                    status: -2,
                    message: "Thể loại đã tồn tại",
                    data: null
                };
            }
            let result = null;
                if (update) {
                    update.name = name ?? update.name,
                    result = await update.save();
                }
                if (result) { // Nếu thêm thành công
                    return {
                        status: 200,
                        message: "Cập nhật thành công",
                        data: result
                    };
                } else { // Nếu thêm không thành công
                    return {
                        status: 400,
                        message: "Lỗi, cập nhật không thành công",
                        data: []
                    };
                }
        } catch (error) {
            console.error('Error:', error);
            return {
                status: -1,
                message: 'Internal server error',
                data: null
            };
        }
    }
}

module.exports = CategoryService;