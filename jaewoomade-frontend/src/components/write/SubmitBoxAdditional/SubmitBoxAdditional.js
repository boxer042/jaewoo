// @flow
import React from 'react';
import Button from 'components/common/Button';
import { convertToPlainText } from 'lib/common';
import './SubmitBoxAdditional.scss';
import SelectBox from './../../common/SelectBox/SelectBox';

type Props = { }

const codeThemes = [
  {
    id: 'github',
    text: 'Github',
  },
  {
    id: 'atom-one',
    text: 'Atom One',
  },
  {
    id: 'dracula',
    text: 'Dracula',
  },
  {
    id: 'duotone-light',
    text: 'Duotone Light',
  },
  {
    id: 'monokai',
    text: 'Monokai',
  },
];

const SubmitBoxAdditional = ({
  onCancel,
  onConfirm,
  urlSlug,
  meta,
  onChangeShortDescription,
  onChangeCodeTheme,
}) => (
  <div className="SubmitBoxAdditional">
    <div className="section">
      <section>
        <div className="section-title">포스트 설명</div>
        <textarea
          row="4"
          onChange={onChangeShortDescription}
          value={meta.short_description}
        />
      </section>
      <section>
        <div className="section-title">코드블록 테마</div>
        <SelectBox
          options={codeThemes}
          className="select-theme"
          value={meta.code_theme || 'github'}
          onChange={onChangeCodeTheme}
        />
      </section>
      <section>
        <div className="section-title">URL</div>
        <div className="url">
          <div className="base">/@JAEWOO/</div>
          <input value={urlSlug} />
        </div>
      </section>
    </div>
    <div className="buttons">
      <Button theme="paper" onClick={onCancel}>
        취소
      </Button>
      <Button theme="paper" violetFont onClick={onConfirm}>
        확인
      </Button>
    </div>
  </div>
);


export default SubmitBoxAdditional;