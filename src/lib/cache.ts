import ShortUniqueId from 'short-unique-id'

interface FindProps {
  option: 'date' | 'category',
  query: string
}

export default function (repo: string) {
  function create (data: any) {
    const uid = new ShortUniqueId()
    data.id = uid()
    const res = JSON.parse(localStorage.getItem(repo) || '[]')
    localStorage.setItem(repo, JSON.stringify([...res, data]))
  }
  function get (page?: number) {
    const data = JSON.parse(localStorage.getItem(repo) || '[]')
    const take = 10
    if (page && page > 0) {
      return data.filter((d: any, i: number) => {
        if (i >= ((page - 1) * take) && i < (page * take)) {
          return d
        }
      })
    }
    return data
  }
  function countPages () {
    const data = JSON.parse(localStorage.getItem(repo) || '[]') as any[]
    return Math.ceil(data.reduce((acc, _, index) => acc += 1, 0) / 10)
  }
  function find ({ option, query }: FindProps) {
    const data = JSON.parse(localStorage.getItem(repo) || '[]') as any[]
    return data.filter(d => d[option].toLowerCase().indexOf(query) >= 0)
  }
  function del (id: string) {
    const data = JSON.parse(localStorage.getItem(repo) || '[]') as any[]
    const isDeleted = data.filter(d => d.id !== id)
    localStorage.setItem(repo, JSON.stringify(isDeleted))
  }
  return {
    create,
    get,
    countPages,
    find,
    del
  }
}