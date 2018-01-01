<template>
    <div>
        <h2>List Visual</h2>
        <mu-row gutter>
            <mu-col class="visual" v-for="v in list" :key="v.id" desktop="25">
                <mu-card>
                    <mu-card-media :title="v.title" subTitle="">
                        <img :src="v.poster" />
                    </mu-card-media>
                    <mu-card-actions>
                        <router-link :to="{ name: 'edit', params: { id: v.id }}">Edit</router-link>
                    </mu-card-actions>
                </mu-card>
            </mu-col>
        </mu-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: []
            };
        },
        mounted() {
            this.getVisuals();
        },
        methods: {
            getVisuals() {
                this.$http.get(this.$store.state.api.visualList).then(res => {
                    this.list = res.body.results;
                });
            }
        }
    };
</script>
<style>
    .visual {
        margin-bottom: 20px;
    }
</style>