import Remarkable from 'remarkable';
import React, { Component } from 'react';

export default class Comment extends Component {

  constructor(props) {
    super(props);

    this.rawMarkup = this.rawMarkup.bind(this);
  }

  rawMarkup() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return {__html: rawMarkup};
  };

  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}/>
      </div>
    );
  };
}
