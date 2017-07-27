import React from 'react'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { firebaseLogout, checkHaveTopic } from '../utils/firebase'

import { Banner, Info, ProfileImg, UserBlock } from '../utils/styles'

import BagBanner from '../static/BagBanner.png'

/* global firebase */

const Topic = props => {
  console.log('topic', props.topic)
  if (props.user === null || props.topic === null) {
    return <div />
  }

  console.log(props.user)
  return (
    <div>
      <form>
        <div className='card'>
          <Banner className='card-img-top' src={BagBanner} alt='banner' />
          <div className='card-block'>
            <Info className='bg-faded'>
              <p><b>Brown Bag 3.0</b> เป็นงานสัมมนาเล็กๆของเด็กไอทีบางมด ซึ่งในครั้งนี้เปิดโอกาสให้กับทุกๆคนได้ เข้ามาแชร์ประสบการณ์ให้กับน้องๆ ว่าที่นักศึกษา SIT กันนะครับ..</p>
              <p>โดยที่งาน Brown Bag ของเอกลักษณ์เล็กน้อยว่า <b><u>ผู้เข้าร่วมงานรวมถึง Speaker ทุกท่านจะต้องเตรียมขนมมาเพื่อแลกเปลี่ยนกันภายในงานคนละ 1 ชิ้น</u></b> :)</p>
              <div><b>ข้อกำหนดของงาน :</b></div>
              <ul className='list-unstyled'>
                <li><b>1.</b> ไม่จำกัดหัวข้อ และ/หรือ เรื่องที่จะนำเสนอ</li>
                <li><b>2.</b> จะต้องให้ข้อมูลที่ไม่ผิดต่อกฎหมาย ส่งเสริมจริยธรรม และจรรยาบรรณที่ดี</li>
                <li><b>3.</b> ห้ามนำเสนอเนื้อหาที่พาดพิง เสียดสี สถาบันชาติ ศาสนา และพระมหากษัตริย์</li>
              </ul>
              <p>ห้องเรียน CB23XX สามารถต่อ Projector ได้ด้วยปลัก VGA</p>
              <hr />
              <p><b>วันที่ 3 สิงหาคม 2560 เวลา 13.00</b> เป็นต้นไป ณ อาคารเรียนรวม 2 ชั้น 3 มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี.</p>
            </Info>
            <div className='form-group'>
              <label htmlFor=''><b>ชื่อหัวข้อที่ต้องการพูดภายในงาน:</b></label>
              <input
                type='text'
                className='form-control'
                placeholder={'...'}
                value={props.topic.title}
                readOnly
              />
              <small className='form-text text-muted'>
                * มีเวลาในการพูดทั้งหมด 30 นาที
              </small>
            </div>
            <div className='form-group'>
              <label htmlFor=''>กรุณาอธิบายสั้นๆเกี่ยวกับหัวข้อที่คุณต้องการจะแชร์:</label>
              <textarea
                className='form-control'
                placeholder={'...'}
                rows={3}
                value={props.topic.detail}
                readOnly
              />
            </div>
            <p>
              <small className='form-text text-muted text-center'>
                ขอบคุณที่ร่วมส่งต่อหัวข้อดีๆ ด้วยกัน :) หากมีข้อสงสัยสอบถามใน
                <a href='https://www.facebook.com/BrownBagSITKMUTT/'>แฟนเพจ</a>
                ได้เลย แล้วเจอกันวันที่ 3 สิงหาครับ
              </small>
            </p>
            <div className='form-group'>
              <div className='card'>
                <div className='card-block' style={{ display: 'flex', justifyContent: 'center' }}>
                  <ProfileImg src={props.user.photoURL} className='rounded' style={{ height: '4.4em' }} />
                  <UserBlock>
                    <p><b>ผู้ใช้:</b> {props.user.displayName}</p>
                    <button
                      type="button"
                      role='button'
                      className='btn btn-sm btn-danger'
                      onClick={e => props.logout()}
                    >
                      <i className='fa fa-sign-out' aria-hidden='true' />
                      {' ออกจากระบบ'}
                    </button>
                  </UserBlock>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const TopicCompose = compose(
  withState('topic', 'setTopic', null),
  withState('user', 'setUser', null),
  withHandlers({
    logout: props => e => {
      firebaseLogout().then((result) => {
        props.setUser(null)
      })
    }
  }),
  lifecycle({
    componentWillMount () {
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          let topic = await checkHaveTopic(user)
          if (topic === null) {
            this.props.history.push('/join')
          } else {
            await this.props.setUser(user)
            await this.props.setTopic(topic)
          }
        } else {
          this.props.history.push('/')
        }
      })
    }
  })
)(Topic)

export default TopicCompose
