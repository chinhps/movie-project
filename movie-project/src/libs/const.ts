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
                link: "/admin/movie-create"
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
                name: "Thêm phim",
                link: "/admin/movie-create"
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
        name: "Bình luận",
        children: [
            {
                name: "Danh sách",
                link: "/admin/comments"
            },
        ]
    },
    {
        name: "Đánh giá",
        children: [
            {
                name: "Danh sách",
                link: "/admin/rates"
            },
        ]
    },
];
