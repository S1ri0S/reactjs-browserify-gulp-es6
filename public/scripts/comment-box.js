import CommentList from './comment-list';
import CommentForm from './comment-form';
import $ from 'jquery';
import React, { Component } from 'react'

export default class CommentBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pollCount: 0,
      int: 0
    };

    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  handleCommentSubmit(comment) {

    let comments = this.state.data;
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();
    let newComments = comments.concat([comment]);
    this.setState({data: newComments});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  loadCommentsFromServer() {
    /*if (this.state.pollCount >= 10) {
      clearInterval(this.state.int);
    }
    this.state.pollCount++;
    console.log(this.state.pollCount);*/

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  };

  componentDidMount() {
    this.loadCommentsFromServer();
    //this.state.int = setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  };

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  };
}
/*CommentBox.propTypes = { url: React.PropTypes.string.isRequired };
CommentBox.defaultProps = { url: "" };*/
