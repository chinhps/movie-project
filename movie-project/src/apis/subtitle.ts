const subtitleApi = {
    vttDetail: async (url: string) => {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'text/vtt;charset=UTF-8'
            },
            // next: {
            //     revalidate: 3600
            // }
        });
        const data: string = await response.text();
        return data;
    }
}

export default subtitleApi;