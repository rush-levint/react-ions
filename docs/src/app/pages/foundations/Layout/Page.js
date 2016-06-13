import React from 'react'
import classNames from 'classnames/bind'
import style from 'private/css/content'
import grid from 'react-conventions/styles/common/grid'

const LayoutPage = (props) => {
  const cx = classNames.bind(style);
  var boxColumnClass = cx(style['box'], style['col']);

  return (
    <div className={style.content}>
      <div className={style.block}>
        <h3>Layout</h3>
        <p>We use a modified version of <a href='http://flexboxgrid.com' target='_blank'>Flexbox Grid</a>.</p>
        <div className='row'>
          <code className='col-xs-12'>col-xs-12 col-sm-6 col-lg-3</code>
          <div className='col-xs-12 col-sm-6 col-lg-3'>
            <div className={style.box}></div>
          </div>
          <div className='col-xs-12 col-sm-6 col-lg-3'>
            <div className={style.box}></div>
          </div>
          <div className='col-xs-12 col-sm-6 col-lg-3'>
            <div className={style.box}></div>
          </div>
          <div className='col-xs-12 col-sm-6 col-lg-3'>
            <div className={style.box}></div>
          </div>
        </div>
        <div className='row'>
          <code className='col-xs-12'>col-xs-12 col-lg-8</code>
          <div className='col-xs-12 col-lg-8'>
            <div className={style.box}></div>
          </div>
          <div className='col-xs-12 col-lg-4'>
            <div className={boxColumnClass}>
              <div className='row'>
                <div className='col-xs-12 col-lg-6'>
                  <div className={style.box}></div>
                </div>
                <div className='col-xs-12 col-lg-6'>
                  <div className={style.box}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutPage;
