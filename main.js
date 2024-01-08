const fs = require('fs/promises')
const path = require('path')

const GITHUB_REPOSITORY_URL = '//raw.githubusercontent.com/Matrix-The-One/music/main'

/**
 * @name 生成Json文件
 * @param {string} readDirName 读取目录
 * @param {string} writeFilePath 写入Json文件路径
 * @param {(data: import('./typings').Entity[]) => Record<string, any>} mutantData 写入Json文件路径
 */
const generateJson = async (readDirName, writeFilePath, mutantData) => {
  const musicList = await fs.readdir(path.resolve(__dirname, readDirName, 'source'))
  const posterList = await fs.readdir(path.resolve(__dirname, readDirName, 'poster'))
  const data = musicList?.map((music) => {
    const [name, singer] = music.split('-')
    const poster = posterList.find((p) => music.split('.')[0] === p.split('.')[0])
    return {
      name,
      singer,
      source: `${GITHUB_REPOSITORY_URL}/${readDirName}/source/${music}`,
      poster: `${GITHUB_REPOSITORY_URL}/${readDirName}/poster/${poster}`,
    }
  })

  fs.writeFile(writeFilePath, JSON.stringify(mutantData ? mutantData(data) : data))
}

module.exports = {
  generateJson,
}
