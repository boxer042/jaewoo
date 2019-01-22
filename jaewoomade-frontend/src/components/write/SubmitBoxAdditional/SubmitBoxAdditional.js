// @flow
import React from 'react';
import Button from 'components/common/Button';
import './SubmitBoxAdditional.scss';

type Props = { }


const SubmitBoxAdditional = ({
  onCancel,
  onConfirm,
}) => (
  <div className="SubmitBoxAdditional">
    <div className="section">
      <section>
        <div className="section-title">포스트 설명</div>
        <textarea />
      </section>
      <section>
        <div className="section-title">코드블록 테마</div>
      </section>
      <section>
        <div className="section-title">URL</div>
        <div className="url">
          <div className="base">/@jaewoo</div>
          <input />
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