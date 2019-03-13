import React, { Component } from 'react';
import { CommonActions } from 'store/actionCreators';
import { connect } from 'react-redux';
import TagItemList from 'components/tags/TagItemList/TagItemList';

class TagItemListContainer extends Component {
  initialize = () => {
    const { sort } = this.props;
    CommonActions.getTags(sort);
  };

  componentDidMount() {
    this.initialize();
    console.log('처음');
  }

  onSelectTag = (info) => {
    CommonActions.setTagInfo(info);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.sort !== this.props.sort) {
      this.initialize();
      console.log('다시');
    }
  }

  render() {
    const { tags } = this.props;
    return <TagItemList tags={tags} onSelectTag={this.onSelectTag} />;
  }
}

export default connect(
  ({ common }) => ({
    tags: common.tags.data,
  }),
  () => ({}),
)(TagItemListContainer);