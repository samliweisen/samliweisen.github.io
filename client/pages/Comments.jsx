import React from 'react';
import axios from 'axios';
import {Box, BoxTitle, BoxBody} from '../components/style.jsx';
import styled from 'styled-components';

const Comment = styled.div`
    margin-bottom: 10px;
    border: 1px solid #06A763;
    padding: 10px;
    border-radius: 10px;
`;

const Button = styled.button`
    border: none;
    background-color: #06A763;
    padding: 10px;
    color: #ffffff;
    cursor: pointer;
    transition: 0.5 ease;
    &:hover {
        background-color: #06B763;
    }
`;

export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //domain: 'https://where-we-work-a09liweis.c9users.io',
            domain: 'https://where-we-work.herokuapp.com',
            comments: [],
            comment: {
                name: '',
                content: ''
            }
        };
    }
    componentDidMount() {
        this.getComments();
    }
    getComments() {
        axios.get(this.state.domain + '/comments').then((res) => {
            if (res.status == 200) {
                this.setState({
                    comments: res.data
                });
            }
        });
    }
    handleChange(e) {
        const v = e.target.value;
        const p = e.target.name;
        let comment = this.state.comment;
        comment[p] = v;
        this.setState({
            comment: comment
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const comment = this.state.comment;
        axios.post(this.state.domain + '/comments', comment).then((res) => {
            if (res.status == 200) {
                this.getComments();
                this.setState({
                    comment: {
                        name: '',
                        content: ''
                    }
                });
            }
        });
    }
    render() {
        const {comment, comments} = this.state;
        return(
            <Box className="comments container">
                <BoxTitle>
                    <i className="fa fa-comments" aria-hidden="true"></i>
                    <span>Comments</span>
                </BoxTitle>
                <BoxBody>
                    {comments.map((c) => 
                        <Comment key={c._id}>
                            <span>{c.name} - {c.created_at}</span>
                            <p>{c.content}</p>
                        </Comment>
                    )}
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                            <input style={{'width': '100%', 'padding': '10px', 'marginBottom': '10px', 'fontSize': '16px'}} type="text" name="name" placeholder="Name" value={comment.name} onChange={this.handleChange.bind(this)} />
                        </div>
                        <textarea style={{'width': '100%', 'height': '200px', 'padding': '10px'}} placeholder="Leave a Comment" name="content" value={comment.content} onChange={this.handleChange.bind(this)}></textarea>
                        <Button>Submit</Button>
                    </form>
                </BoxBody>
            </Box>
        );
    }
}