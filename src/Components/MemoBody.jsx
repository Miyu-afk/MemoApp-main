import React from 'react';

const MemoBody = () => {
  return(
    <>
      <div>
        <div role="tablist" className="tabs tabs-lift flex justify-center mt-8">
          <a role="tab" className="tab">仕事</a>
          <a role="tab" className="tab tab-active">趣味</a>
          <a role="tab" className="tab">その他</a>
        </div>
      </div>

    </>
  )
}

export default MemoBody;