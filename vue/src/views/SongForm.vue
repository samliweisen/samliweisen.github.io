<template>
    <div>
        <h2>Song Form</h2>
        <div class="search">
            <mu-row gutter>
                <mu-col width="100" tablet="50" desktop="50">
                    <mu-text-field fullWidth label="Search Song" labelFloat v-model="search" @change="handleSearch" />
                    <mu-list>
                        <mu-list-item v-for="s in dataSource" v-bind:title="s.title" key="s.id" v-on:click="selectSong(s)">
                            <mu-avatar v-bind:src="s.image" slot="rightAvatar"/>
                        </mu-list-item>
                    </mu-list>
                </mu-col>
                <mu-col width="100" tablet="50" desktop="50">
                    <!--<audio ref="audio" controls v-if="song.url">-->
                    <!--    <source :src="song.url" type="audio/mpeg">-->
                    <!--</audio>-->
                </mu-col>
            </mu-row>
        </div>
        <mu-text-field fullWidth label="Title" labelFloat v-model="song.title" />
        <mu-text-field fullWidth label="Artist" labelFloat v-model="song.artist" />
        <mu-text-field fullWidth label="source" labelFloat v-model="song.url" />
        <mu-text-field fullWidth label="Image" labelFloat v-model="song.image" />
        <mu-raised-button label="Submit" class="demo-raised-button" primary v-on:click="handleSubmit" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            song: {
                id: 0,
                title: '',
                artist: '',
                url: '',
                image: '',
                visual_id: this.$route.params.id
            },
            dataSource: [],
            search: ''
        };
    },
    mounted() {
        const id = this.$route.params.id;
        if (typeof id != 'undefined') {
            this.getSong(id);
        }
    },
    methods: {
        getSong(id) {
            this.$http.get(this.$store.state.api.songDetail + id).then((res) => {
                if (res.status == 200) {
                    this.song = res.body.result;
                }
            });
        },
        selectSong(s) {
            
            this.$http.get('https://api.imjad.cn/cloudmusic/?type=song&br=128000&id=' + s.id).then((res) => {
                if (res.status == 200) {
                    const url = res.body.data[0].url;
                    if (url != '') {
                        this.song.url = res.body.data[0].url.replace('https', 'http');   
                    }
                }
            });
            //this.$refs.audio.load();
            this.song.title = s.title;
            this.song.artist = s.artist;
            this.song.image = s.image;
        },
    
        handleSearch() {
            this.dataSource = [];
            this.$http.get('https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w='+this.search+'&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1520833663464', {
      params: {
        callback: 'callback'
      }
    }).then((res) => {
                console.log(res);
                if (res.status == 200) {
                    const songs = res.body.result.songs;
                    let results = [];
                    songs.map((s) => {
                        let artist = s.ar.map((a) => {
                            return a.name;
                        }).join(' ');
                        results.push({
                            artist: artist,
                            title: s.name,
                            id: s.id,
                            image: s.al.picUrl
                        }); 
                    });
                    this.dataSource = results;
                }
            });
        },
        handleSubmit() {
            const options = this.song;
            this.$http.post(this.$store.state.api.songSubmit, options).then(res => {
                if (res.status == 200) {
                    this.$router.push({ path: '/visuals/edit/' + this.song.visual_id });
                }
            });
        }
    }
};
</script>