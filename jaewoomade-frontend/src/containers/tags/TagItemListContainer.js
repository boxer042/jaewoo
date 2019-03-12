import React, { Component } from 'react';
import { CommonActions } from 'store/actionCreators';
import { connect } from 'react-redux';
import TagItemList from './../../components/tags/TagItemList/TagItemList';

class TagItemListContainer extends Component {
  initialize = () => {
    const { sort } = this.props;
    CommonActions.getTags(sort);
  };

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sort !== this.props.sort) {
      this.initialize();
    }
  }

  render() {
    const { tags } = this.props;
    return <TagItemList tags={tags} />;
  }
}

export default connect(
  ({ common }: State) => ({
    tags: common.tags.data,
  }),
  () => ({}),
)(TagItemListContainer);