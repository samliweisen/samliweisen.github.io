<template>
    <div id="player">
        <mu-list>
            <mu-list-item v-for="s in songs" v-bind:title="s.title" key="s.id" v-on:click="selectSong(s)">
                <mu-avatar v-bind:src="s.image" slot="rightAvatar"/>
            </mu-list-item>
        </mu-list>
        <audio ref="player" controls v-if="song.url">
            <source :src="song.url" type="audio/mpeg" />
        </audio>
    </div>
</template>
<script>
export default {
    name: 'MusicPlayer',
    data() {
        return {
            song: {
                url: '',
                image: '',
                title: '',
                artist: ''
            },
            songs: []
        };
    },
    mounted() {
        this.getSongs();
    },
    methods: {
        getSongs() {
            this.$http.get(this.$store.state.api.songList).then((res) => {
                this.songs = res.body.results;
                this.song = this.songs[0];
            });
        },
        selectSong(s) {
            this.song = s;
            this.$refs.player.load();
            
        }
    }
};
</script>
<style>
#player {
    position: fixed;
    right: 0;
    bottom: 0;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #cccccc;
}
</style>