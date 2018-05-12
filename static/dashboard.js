var apiUrl = "/pullrequests";

var uri = window.location.protocol + '//' + window.location.host + apiUrl + window.location.search;

Vue.component("repository", {
    props: ["repo"],
    template: `
    <div class="repo">
        <a v-bind:href="repo.url">
            <span class="repo-owner">{{ repo.Owner.Login }}/</span>
            <span class="repo-name">{{ repo.Name }}</span>
        </a>
        <div class="repo-prs">
            <pullrequest v-for="pr in repo.PullRequests.Nodes" :key="pr.url" v-bind:pr="pr"></pullrequest>
        </div>
    </div>
    `
});

Vue.component("pullrequest", {
    props: ["pr"],
    template: `
    <div class="pr">
        <span class="pr-id"><a v-bind:href="pr.URL">#{{ pr.Number }}</a></span>
        <span class="pr-title">{{ pr.Title }}/</span>
        <img class="pr-avatar" v-bind:src="pr.Author.AvatarURL">
    </div>
    `
});

var app = new Vue({
    el: "#app",
    data() {
        return {
            repos: []
        }
    },
    methods: {
        getData() {
            return fetch(uri, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                .then(response => response.json())
                .then(result => this.repos = result);
        }
    },
    mounted() {
        return this.getData()
    }
});
