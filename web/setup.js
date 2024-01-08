const { generateJson } = require('../main')

/**
 * @name 对歌曲进行排序
 * @param {import('../typings').Entity[]} data 数据
 */
const mutantData = (data) => {
  const forefront = ['以父之名', '七里香', '夜曲', '玫瑰花的葬礼', '巴赫旧约']
  forefront.reverse().forEach((i) => {
    const index = data.findIndex((d) => d.name.includes(i))
    if (index) data.unshift(data.splice(index, 1)[0])
  })

  return data.map((i) => {
    return {
      name: i.name,
      artist: i.singer,
      url: i.source,
      cover: i.poster,
    }
  })
}

generateJson('web', 'web/music.json', mutantData)
