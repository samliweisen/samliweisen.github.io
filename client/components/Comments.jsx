import React from 'react';
import axios from 'axios';
import {Box, BoxTitle, BoxBody} from './style.jsx';
import styled from 'styled-components';

export const NavLink = styled.a`
    color: #06A763;
    text-decoration: none;
    transition: 1s ease-in;
    &:hover {
        text-decoration: underline;
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
            <Box className="comments">
                <BoxTitle>
                    <i className="fa fa-comments" aria-hidden="true"></i>
                    <span>Comments</span>
                </BoxTitle>
                <BoxBody>
                    {comments.map((c) => 
                        <div key={c._id}>
                            <span>{c.name}: {c.content} - {c.created_at}</span>
                        </div>
                    )}
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                            <input type="text" name="name" placeholder="Name" value={comment.name} onChange={this.handleChange.bind(this)} />
                        </div>
                        <textarea placeholder="Leave a Comment" name="content" value={comment.content} onChange={this.handleChange.bind(this)}></textarea>
                        <button>Submit</button>
                    </form>
                </BoxBody>
            </Box>
        );
    }
}