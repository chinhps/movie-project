import { ISildeBar } from "@/types/layout.type";

export const navbarList: Array<ISildeBar> = [
    {
        name: "Trang chủ",
        children: [
            {
                name: "Trang chủ",
                link: "/admin"
            },
            // {
            //     name: "Thống kê",
            //     link: "/admin/statisticals"
            // },
        ]
    },
    {
        name: "Thể loại",
        children: [
            {
                name: "Thêm thể loại",
                link: "/admin/category-upsert"
            },
            {
                name: "Danh sách",
                link: "/admin/category-list"
            },
        ]
    },
    {
        name: "Quản lý phim",
        children: [
            {
                name: "Cập nhật tập",
                link: "/admin/movie-upsert"
            },
            {
                name: "Thêm phim",
                link: "/admin/movie-upsert"
            },
            {
                name: "Danh sách",
                link: "/admin/movie-list"
            },
        ]
    },
    {
        name: "Người dùng",
        children: [
            {
                name: "Danh sách",
                link: "/admin/users"
            },
        ]
    },
    {
        name: "Báo cáo",
        children: [
            {
                name: "Bình luận",
                link: "/admin/reports/comments"
            },
            {
                name: "Phim",
                link: "/admin/reports/movies"
            },
        ]
    },
    {
        name: "Trở về client",
        link: "/"
    },
];



export const navbarListUser: Array<ISildeBar> = [
    {
        name: "Hồ sơ",
        children: [
            {
                name: "Thông tin",
                link: "/user",
            },
            {
                name: "Cập nhật thông tin",
                link: "/user/change-info",
            },
        ],
    },
    {
        name: "Mật khẩu",
        children: [
            {
                name: "Đổi mật khẩu",
                link: "/user/change-password",
            },
        ],
    },
    {
        name: "Nạp xu",
        children: [
            {
                name: "Paypal/Visa",
                link: "/user/recharge",
            },
            {
                name: "Thẻ cào",
                link: "/user/recharge",
            },
        ],
    },
];