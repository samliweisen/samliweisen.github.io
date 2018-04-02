<template>
    <div class="form">
        <h2>Form</h2>
        <mu-auto-complete label="Search From Douban" labelFloat @input="handleInput" :dataSource="searchs" />
        <mu-row gutter>
            <mu-col width="100" tablet="50" desktop="25">
                <mu-text-field fullWidth label="Title" labelFloat v-model="visual.title" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="25">
                <mu-text-field fullWidth label="Original Title" labelFloat v-model="visual.original_title" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="25">
                <mu-text-field fullWidth label="Douban Id" labelFloat v-model="visual.douban_id" v-on:change="renderDouban" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="25">
                <mu-text-field fullWidth label="Douban Rating" labelFloat v-model="visual.douban_rating" />
            </mu-col>
        </mu-row>
        <mu-raised-button label="Get Douban Data" class="demo-raised-button" v-on:click="renderDouban" secondary/>
        <mu-row gutter>
            <mu-col width="100" tablet="50" desktop="25">
                <mu-text-field fullWidth label="IMDB ID" labelFloat v-model="visual.imdb_id" v-on:change="renderIMDB" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="25">
                <mu-text-field fullWidth label="IMDB Rating" labelFloat v-model="visual.imdb_rating" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="25">
                <mu-text-field fullWidth label="Episodes" labelFloat v-model="visual.episodes" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="25">
                <mu-text-field fullWidth label="Current Episode" labelFloat v-model="visual.current_episode" />
            </mu-col>
        </mu-row>
        <mu-raised-button label="Get IMDB Data" class="demo-raised-button" v-on:click="renderIMDB" secondary/>
        <mu-row>
            <mu-col width="100" tablet="50" desktop="25">
                <mu-text-field fullWidth label="Release Date" labelFloat v-model="visual.release_date" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="25">
                <mu-text-field fullWidth label="Poster" labelFloat v-model="visual.poster" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="25">
                <mu-select-field fullWidth v-model="visual.visual_type" label="Visual Type">
                    <mu-menu-item value="movie" title="Movie"/>
                    <mu-menu-item value="tv" title="Tv" />
                </mu-select-field>
            </mu-col>
        </mu-row>
        <div class="form-group">
            <mu-text-field fullWidth label="Summary" multiLine :rows="3" :rowsMax="6" labelFloat v-model="visual.summary" />
        </div>
        <mu-raised-button label="Submit" class="demo-raised-button" primary v-on:click="handleSubmit" />
        
        <div class="songs">
            <mu-raised-button label="Add Song" class="demo-raised-button" primary v-on:click="gotoAddSong()" />
            <mu-list>
                <mu-list-item v-for="s in songs" v-bind:title="s.title" key="s.id" v-on:click="editSong(s)">
                    <mu-avatar v-bind:src="s.image" slot="rightAvatar"/>
                </mu-list-item>
            </mu-list>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchs: [1,2,3],
                visual: {
                    id: 0,
                    title: '',
                    original_title: '',
                    douban_id: '',
                    douban_rating: '0.0',
                    imdb_id: '',
                    imdb_rating: '0.0',
                    rotten_id: '',
                    rotten_rating: 0,
                    rotten_audience_rating: 0,
                    release_date: '',
                    poster: '',
                    summary: '',
                    online_source: '',
                    episodes: 1,
                    current_episode: 0,
                    visual_type: 'movie'
                },
                songs: []
            };
        },
        mounted() {
            const id = this.$route.params.id;
            if (typeof id != 'undefined') {
                this.getVisual(id);
                this.getSongs(id);
            }
        },
        methods: {
            gotoAddSong() {
                this.$router.push({path: '/visuals/' + this.$route.params.id + '/song/add'});
            },
            handleSubmit() {
                const options = this.visual;
                this.$http.post(this.$store.state.api.visualSubmit, options).then(res => {
                    if (res.status == 200) {
                        this.$router.push({ path: '/visuals' });
                    }
                });
            },
            getVisual(id) {
                this.$http.get(this.$store.state.api.visualDetail + id).then(res => {
                    this.visual = res.body.result;
                    console.log(res);
                });
            },
            handleInput(val) {
                this.$http.jsonp('https://api.douban.com/v2/movie/search?q=' + val).then(res => {
                    this.searchs = [];
                    if (res.status == 200) {
                        res.body.subjects.map((subject) => {
                            const visual = {
                                value: subject.id,
                                text: subject.title + ' ' + subject.original_title
                            };
                            this.searchs.push(visual);
                        });
                    }
                });
            },
            renderDouban() {
                if (this.visual.douban_id == '') {
                    alert('Empty douban id');
                    return;
                }
                this.$http.jsonp('https://api.douban.com/v2/movie/subject/' + this.visual.douban_id).then(res => {
                    console.log(res);
                    const douban = res.body;
                    this.visual.title = douban.title;
                    this.visual.summary = douban.summary;
                    this.visual.poster = douban.images.large;
                    this.visual.douban_rating = douban.rating.average;
                }, res => {
                    //error
                });
            },
            getImdbId() {
                const options = {
                    params: {
                        douban_id: this.visual.douban_id
                    }
                };
                this.$http.get(this.$store.state.api.visualImdb, options).then(res => {
                    this.visual.imdb_id = res.body.imdb_id;
                    this.renderIMDB();
                }, res => {
                    
                });
            },
            renderIMDB() {
                if (this.visual.imdb_id == '') return;
                const options = {
                    params: {
                        i: this.visual.imdb_id,
                        apikey: '6ad10fa5'
                    }
                };
                this.$http.jsonp('https://www.omdbapi.com/', options).then(res => {
                    this.visual.original_title = res.body.Title;
                    this.visual.imdb_rating = res.body.imdbRating;
                    if (res.body.Ratings[1] && res.body.Ratings[1].Source == 'Rotten Tomatoes') {
                        this.visual.rotten_rating = res.body.Ratings[1].Value.replace('%', '');   
                    }
                    this.visual.poster = res.body.Poster;
                });
            },
            getSongs(visual_id) {
                this.$http.get(this.$store.state.api.songList + '?visual_id=' + visual_id).then((res) => {
                    if (res.status == 200) {
                        this.songs = res.body.results;
                    }
                });
            },
            editSong(s) {
                let visual_id = this.$route.params.id;
                this.$router.push({ path: '/song/' + s.id + '/edit' });
            }
        }
    };
</script>