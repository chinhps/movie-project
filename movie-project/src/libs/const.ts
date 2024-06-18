import { ISildeBar } from "@/types/layout.type";

export const navbarList: Array<ISildeBar> = [
    {
        name: "Trang chủ",
        children: [
            {
                name: "Trang chủ",
                link: "/admin"
            },
            {
                name: "Thống kê",
                link: "/admin/statisticals"
            },
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
                link: "/admin/rates"
            },
            {
                name: "Phim",
                link: "/admin/rates"
            },
        ]
    },
    {
        name: "Trở về client",
        link: "/"
    },
];
