import styled from 'styled-components'

export const Banner = styled.img`
  height: 100%;
  width: 100%;
`

export const Card = styled.div`
  opacity: 1;
  transition: all 0.4s;
`

export const Info = styled.div`
  font-size: 14px;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
`

export const ProfileImg = styled.img`
  border-radius: 4px;
  display: flex;
  vertical-align: top;
  margin-right: 1em;
`

export const UserBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > p {
    margin-bottom: 4px;
  }
`
