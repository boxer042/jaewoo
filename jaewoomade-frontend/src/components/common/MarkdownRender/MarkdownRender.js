// @flow
import marked from 'marked';
import React, { Component } from 'react';
import Prism from 'prismjs';
import { escapeForUrl, getScrollTop } from 'lib/common';
import 'prismjs/components/prism-bash.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-css.min';
import './MarkdownRender.scss';

type Props = {
  body: string,
  onSetToc?: (toc: any) => void,
};

type State = {
  html: string
};

function stripHtml(text: string): string {
  const regex = /<\/?[^>]+(>|$)/g;
  return text.replace(regex, '');
}

const createRenderer = (arr: any[]) => {
  const renderer = new marked.Renderer();
  const linkRenderer = renderer.link;
  renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);
    return html.replace(/^<a /, '<a target="_blank" ');
  };
  renderer.heading = function heading(text, level, raw) {
    if (!raw) return '';
    const anchor = this.options.headerPrefix + escapeForUrl(raw.toLowerCase());
    const hasDuplicate = arr.find(item => item.anchor === anchor);
    const filtered = arr.filter(item => item.anchor.indexOf(anchor) > -1);
    const suffix = !hasDuplicate && filtered.length === 0 ? '' : `-${filtered.length + 1}`;

    const suffixed = `${anchor}${suffix}`;
    if (level <= 3 && arr) {
      try {
        arr.push({
          anchor: suffixed,
          level,
          text: stripHtml(text),
        });
      } catch (e) {
        console.log(e);
      }
    }
    return `<h${level} id="${suffixed}">${text}</h${level}>`;
  };

  return renderer;
};

class MarkdownRender extends Component<Props, State> {
  state = {
    html: '',
  }

  renderMarkdown() {
    const start = new Date();
    const toc = [];
    marked.setOptions({
      renderer: createRenderer(toc),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
    const rendered = marked(this.props.body);
    if (this.props.onSetToc) {
      this.props.onSetToc(toc);
    }
    this.setState({
      html: rendered,
    });
  }

  componentDidMount() {
    this.renderMarkdown();
  }

  renderPrism() {
    if (!Prism) return;
    Prism.highlightAll();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.body !== this.props.body) {
      this.renderMarkdown();
    }
    if (prevProps.html !== this.state.html) {
      this.renderPrism();
    }
  }

  render() {
    const { html } = this.state;
    const markup = { __html: html };

    return (
      <div className="MarkdownRender atom-one" dangerouslySetInnerHTML={markup} id="markdown-render" />
    );
  }
}

export default MarkdownRender;