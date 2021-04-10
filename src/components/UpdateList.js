import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Loading } from './Loading'
import { MONTH } from '../constants'
import { GET_LISTS_MONTH } from '../graphql/queries'
import { UPDATE_LIST } from '../graphql/mutations'
import { NoteIcon, YouTubeIcon } from '../icons'

export const UpdateList = ({ teamsMonth, year, month }) => {
  const [sundaySelected, setSunday] = useState(teamsMonth[0]?.sunday)
  const [inputList, setInputList] = useState([])

  const { loading, data, error, refetch } = useQuery(GET_LISTS_MONTH, {
    variables: {
      year: String(year),
      month: String(month),
    },
    awaitRefetchQueries: true,
  })
  const [updateList, { error: errorUpdateList }] = useMutation(UPDATE_LIST, {
    refetchQueries: [
      {
        query: GET_LISTS_MONTH,
        variables: {
          year: String(year),
          month: String(month),
        },
      },
    ],
    awaitRefetchQueries: true,
  })

  useEffect(() => {
    if (!loading) {
      const list = []
      data.list
        .filter(({ sunday }) => sunday === sundaySelected)
        .map(({ title, link, id }) => {
          list.push({ title, link, id })
          setInputList(list)
        })
    }
  }, [data, sundaySelected])

  if (loading) {
    return <Loading />
  }

  const handleChange = (e, index) => {
    const { name, value } = e.target

    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
  }

  const update = ({ id, idx }) => {
    const { title, link } = inputList[idx]
    updateList({
      variables: {
        id,
        title,
        link,
      },
    })
    refetch()
  }

  return (
    <div className="d-flex justify-content-center">
      <div className=" p-2">
        <div className="card" style={{ width: '32rem' }}>
          <div className="card-header bg-secondary text-white">
            Modify a song
          </div>
          <div className="card-body">
            <select
              className="form-select  py-0 my-2"
              aria-label="Default select example"
              onChange={(e) => setSunday(e.target.value)}
            >
              {teamsMonth.map(({ sunday, month ,id}) => {
                return (
                  <option key={id} value={sunday}>{`${sunday} ${MONTH[month]}`}</option>
                )
              })}
            </select>
            {data.list
              .filter(({ sunday }) => sunday === sundaySelected)
              .map(({ title, link, id }, idx) => {
                return (
                  <div key={id} className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <NoteIcon />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={title}
                      aria-label="Title"
                      name="title"
                      aria-describedby="basic-addon1"
                      onChange={(e) => handleChange(e, idx)}
                    />
                    <span className="input-group-text" id="basic-addon1">
                      <YouTubeIcon />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={link}
                      aria-label="Link"
                      name="link"
                      aria-describedby="basic-addon1"
                      onChange={(e) => handleChange(e, idx)}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon1"
                      onClick={() => update({ id, idx })}
                    >
                      save
                    </button>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default UpdateList
