export default {
    async init() {
        try {
            const response = await window.fetch(BASE_URL + "/index.json");
            if (!response.ok) {
                this.removeSearch();
                return;
            }
            let data = await response.json();
            console.log(data);
        } catch (e) {
            this.removeSearch();
        }
    },

    removeSearch() {
        document.querySelector("#search")?.remove();
    },
};
