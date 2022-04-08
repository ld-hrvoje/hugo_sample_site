import Fuse from 'fuse.js'

let fuseIndex = null;
const MAX_SEARCH_RESULTS = 5;

export default {
    async init() {
        try {
            const response = await window.fetch("/index.json");
            
            if (!response.ok) {
                this.removeSearch();
                return;
            }
            let data = await response.json();

            const options = { keys: [{
                    name: 'title',
                    weight: 20
                }, {
                    name: 'tag',
                    weight: 5
                }, {
                    name: 'content'
                }]
            };
            const myIndex = Fuse.createIndex(options.keys, data);
            fuseIndex = new Fuse(data, options, myIndex);
            
            document.addEventListener("input", this.showResults);
        } catch (e) {
            this.removeSearch();
        }
    },
    
    showResults(event) {
        let searchBox = document.querySelector("#search input");
        if(event.target !== searchBox) {
            return;
        }
        const result = document.querySelector("#search div");

        if(searchBox.value.length > 0){
            const results = fuseIndex.search(searchBox.value);
            
            result.innerHTML = results.slice(0, MAX_SEARCH_RESULTS).map(x =>
                `<a href="${x.item.url}">
                <img src="${x.item.cover || ""}" width="40" height="40">
                <h3>${x.item.title}</h3>
                <span>${x.item.content.substr(0,40)}</span>
                </a>`).join("");
        } else {
            result.innerHTML = '';
        }
    },
    
    removeSearch() {
        document.querySelector("#search")?.remove();
    },
};