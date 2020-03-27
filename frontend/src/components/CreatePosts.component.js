import React, { Component } from "react";
import axios from "axios";

class CreatePosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            body: "",
            author: "",
            date: new Date()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const date = new Date();
        this.setState({ date: date });

        const Blog = {
            title: this.state.title,
            author: this.state.author,
            body: this.state.body,
            date: this.state.date
        };

        console.log(Blog);
        axios
            .post("http://localhost:5000/posts/create/", Blog)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        window.location = "/posts";
    }

    render() {
        return (
            <div>
                <h1>Create New Blog Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            required
                            placeholder="The Best Title"
                        />
                    </div>
                    <div className="form-group">
                        <label>Author: </label>
                        <input
                            className="form-control"
                            type="text"
                            name="author"
                            value={this.state.author}
                            onChange={this.handleChange}
                            required
                            placeholder="John Oliver"
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            value={this.state.body}
                            name="body"
                            onChange={this.handleChange}
                            rows="30"
                            placeholder="Start Blog Post..."
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create Post"
                            className="btn btn-success btn-lg"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default CreatePosts;
