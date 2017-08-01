import React from 'react'
import { compose, withState, lifecycle } from 'recompose'
import { ref } from '../utils/firebase'

import styled from 'styled-components'

const Topic = styled.div`
  margin-bottom: 15px;
`

const Title = styled.h1`
  font-size: 20px;
`

const Detail = styled.p`
  font-size: 14px;
  text-indent: 15px;
`

const Speaker = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  img {
    height: 30px;
    border-radius: 8px;
    margin-right: 8px;
  }

  h2 {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
  }
`

const Topics = props => {
  const topics = Object.keys(props.topics)
    .reverse()
    .map(key => props.topics[key])
  return (
    <div>
      <div className="row">
        {
          topics.map(t => (
            <div className="col-12" key={t.user.displayName}>
              <Topic className="card">
                <div className="card-block">
                  <Title>{`"${t.title}"`}</Title>
                  <Detail>{ t.detail }</Detail>
                  <Speaker>
                    <img src={t.user.photo} />
                    <h2>{`${t.user.displayName}`}</h2>
                  </Speaker>
                </div>
              </Topic>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const TopicsCompose = compose(
  withState('topics', 'setTopics', []),
  lifecycle({
    async componentWillMount () {
      await ref.child(`topics/`)
        .orderByKey().limitToLast(500)
        .on('value', snapshot => {
          this.props.setTopics(snapshot.val())
        })
    }
  })
)(Topics)

export default TopicsCompose
