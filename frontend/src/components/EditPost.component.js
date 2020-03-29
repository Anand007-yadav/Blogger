import React, { Component } from "react";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import sanitizeHtml from "sanitize-html";

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            body: "",
            author: "",
            date: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/posts/" + this.props.match.params.id)
            .then(post => {
                this.setState({
                    title: post.data.title,
                    body: post.data.body,
                    author: post.data.author,
                    date: post.data.date
                });
            })
            .catch(err => console.error(err));
        console.log(this.state.body);
    }

    handleEditorChange(event, editor) {
        const data = editor.getData();
        const sanitizedData = sanitizeHtml(data);

        this.setState({ body: sanitizedData });
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const Blog = {
            title: this.state.title,
            author: this.state.author,
            body: this.state.body,
            date: this.state.date
        };

        axios
            .post(
                "http://localhost:5000/posts/edit/" +
                    this.props.match.params.id,
                Blog
            )
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        window.location = "/posts/show/" + this.props.match.params.id;
    }

    render() {
        return (
            <div>
                <h1>Edit Blog Post</h1>
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
                        />
                    </div>
                    <div>
                        <CKEditor
                            editor={ClassicEditor}
                            data={this.state.body}
                            onChange={this.handleEditorChange}
                            config={{
                                toolbar: [
                                    "heading",
                                    "|",
                                    "bold",
                                    "italic",
                                    "link",
                                    "bulletedList",
                                    "numberedList",
                                    "blockquote",
                                    "undo",
                                    "redo"
                                ]
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Submit Post"
                            className="btn btn-primary btn-lg"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default EditPost;
