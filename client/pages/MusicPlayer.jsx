import React from 'react';
import axios from 'axios';

import '../css/musicplayer.css';

export default class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topLists: []
        };
    }
    componentDidMount() {
        this.getTopList();
    }
    getTopList() {
        const topListApi = 'https://where-we-work.herokuapp.com/api_proxy/toplist';
        axios.get(topListApi).then((res) => {
            if (res.status == 200) {
                this.setState({
                    topLists: res.data.data.topList
                });
            }
        });
    }
    convertHttps(url) {
        return url.replace('http', 'https');
    }
    render() {
        const {topLists} = this.state;
        return (
            <div className="musicplayer">
                <h2>MusicPlayer</h2>
                <div className="toplist">
                    {topLists.map((list, i) => 
                        <div className="topic" key={list.id}>
                            <img src={this.convertHttps(list.picUrl)} alt={list.topTitle} />
                            <div className="topic__info">
                                <h3>{list.topTitle}</h3>
                                {list.songList.map((song, i) =>
                                    <div key={i} className="topic__song">{song.songname} - {song.singername}</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}