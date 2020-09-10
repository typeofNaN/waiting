import { Request, Response } from 'express'

import { createWebAPIRequest, request } from '../util/util'

const crypto = require('crypto')

var express = require('express')
var router = express.Router()

router.get('/album', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: ''
  }
  const albumId = req.query.id
  createWebAPIRequest(
    'music.163.com',
    `/weapi/v1/album/${albumId}`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})

router.get('/artist/album', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const albumId = req.query.id
  const data = {
    offset: req.query.offset || 0,
    total: true,
    limit: req.query.limit || 30,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/artist/albums/${albumId}`,
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})

router.get('/artist/desc', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const descId = req.query.id
  const data = {
    id: descId,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/artist/introduction`,
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})

router.get('/artist/list', (req: any, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''

  // categoryCode 取值

  // 入驻歌手 5001
  // 华语男歌手 1001
  // 华语女歌手 1002
  // 华语组合/乐队 1003
  // 欧美男歌手 2001
  // 欧美女歌手 2002
  // 欧美组合/乐队 2003
  // 日本男歌手 6001
  // 日本女歌手 6002
  // 日本组合/乐队 6003
  // 韩国男歌手 7001
  // 韩国女歌手 7002
  // 韩国组合/乐队 7003
  // 其他男歌手 4001
  // 其他女歌手 4002
  // 其他组合/乐队 4003

  // initial 取值a-z/A-Z

  const data = {
    categoryCode: req.query.cat || '1001',
    offset: req.query.offset || 0,
    total: req.query.total ? 'true' : 'false',
    limit: req.query.limit || 30,
    initial: (req.query.initial || '').toUpperCase().charCodeAt() || ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/artist/list',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/artist/mv', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const mvId = req.query.id
  const data = {
    artistId: mvId,
    total: true,
    offset: req.query.offset,
    limit: req.query.limit,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/artist/mvs`,
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/artist/sub', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    artistId: `${req.query.id}`
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/artist/sub',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/artist/sublist', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''

  const data = {
    offset: req.query.offset || 0,
    total: req.query.total ? 'true' : 'false',
    limit: req.query.limit || 25
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/artist/sublist',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/artists', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const ids = req.query.id

  const data = {
    csrf_token: ''
  }

  createWebAPIRequest(
    'music.163.com',
    `/weapi/v1/artist/${ids}`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})

router.get('/banner', (req: Request, res: Response, next: Function) => {
  const options = {
    url: 'http://music.163.com/discover',
    method: 'GET',
    headers: {
      Referer: 'http://music.163.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3380.0 Safari/537.36'
    }
  }
  request(options, (error: any, response: any, body: any) => {
    if (error) {
      res.status(502).send('fetch error')
    } else {
      try {
        // const pattern = /<script[^>]*>\s*window\.Gbanners\s*=\s*([^]+?)\s*<\/script>/g
        // const banners = pattern.exec(body)[1]
        // res.send(JSON.stringify(eval(`({code:200,banners:${banners}})`)))
      } catch (error) {
        res.status(502).send('fetch error')
      }
    }
  })
})
router.get('/check/music', (req: Request, res: Response, next: Function) => {
  const musicId = parseInt(req.query.id as string)
  const br = parseInt(req.query.br as string) || 999000
  const data = {
    ids: [musicId],
    br: br,
    csrf_token: ''
  }
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  createWebAPIRequest(
    'music.163.com',
    '/weapi/song/enhance/player/url',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      if (JSON.parse(musicReq).code === 200) {
        return res.send({
          success: true,
          message: 'ok'
        })
      }
      return res.send({
        success: false,
        message: '亲爱的,暂无版权'
      })
    },
    () => {
      res.status(502).send('fetch error')
    }
  )
})
router.get('/comment/album', (req: Request, res: Response, next: Function) => {
  const rid = req.query.id
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    offset: req.query.offset || 0,
    rid: rid,
    limit: req.query.limit || 20,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/v1/resource/comments/R_AL_3_${rid}/?csrf_token=`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/comment/dj', (req: Request, res: Response, next: Function) => {
  const djId = req.query.id
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    offset: req.query.offset || 0,
    rid: djId,
    limit: req.query.limit || 20,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/v1/resource/comments/A_DJ_1_${djId}/?csrf_token=`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/comment/like', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const likeId = req.query.cid // 评论 id
  const ids = req.query.id // 歌曲 id
  const typeMap = {
    0: 'R_SO_4_', // 歌曲
    1: 'R_MV_5_', // mv
    2: 'A_PL_0_', // 歌单
    3: 'R_AL_3_', // 专辑
    4: 'A_DJ_1_' // 电台
  }
  const type = typeMap[req.query.type as string]
  const data = {
    threadId: `${type}${ids}`,
    commentId: likeId,
    csrf_token: ''
  }
  const action = ~~(req.query.t as string) === 1 ? 'like' : 'unlike'

  const url = `/weapi/v1/comment/${action}`
  createWebAPIRequest(
    'music.163.com',
    url,
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/comment/music', (req: Request, res: Response, next: Function) => {
  const musicId = req.query.id
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    offset: req.query.offset || 0,
    rid: musicId,
    limit: req.query.limit || 20,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/v1/resource/comments/R_SO_4_${musicId}/?csrf_token=`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    (err: any) => res.status(502).send(err.message)
  )
})
router.get('/comment/mv', (req: Request, res: Response, next: Function) => {
  const mvId = req.query.id
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    offset: req.query.offset || 0,
    rid: mvId,
    limit: req.query.limit || 20,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/v1/resource/comments/R_MV_5_${mvId}/?csrf_token=`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/comment/playlist', (req: Request, res: Response, next: Function) => {
  const rid = req.query.id
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    offset: req.query.offset || 0,
    rid: rid,
    limit: req.query.limit || 20,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/v1/resource/comments/A_PL_0_${rid}/?csrf_token=`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/daily/signin', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  let type = req.query.type || 0 // 0为安卓端签到 3点经验,1为网页签到,2点经验
  const data = {
    csrf_token: '',
    type
  }
  // {'android': {'point': 3, 'code': 200}, 'web': {'point': 2, 'code': 200}}
  // {'android': {'code': -2, 'msg': '重复签到'}, 'web': {'code': -2, 'msg': '重复签到'}}
  // 'android': {'code': 301}, 'web': {'code': 301}}

  createWebAPIRequest(
    'music.163.com',
    '/weapi/point/dailyTask',
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/dj/catelist', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/djradio/category/get',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/dj/detail', (req: Request, res: Response, next: Function) => {
  const djId = req.query.rid
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    id: djId,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/djradio/get',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/dj/hot', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    cat: req.query.type,
    cateId: req.query.type,
    type: req.query.type,
    categoryId: req.query.type,
    category: req.query.type,
    limit: req.query.limit,
    offset: req.query.offset,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/djradio/hot/v1',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/dj/paygift', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: '',
    limit: req.query.limit || 10,
    offset: req.query.offset || 0
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/djradio/home/paygift/list?_nmclfl=1',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/dj/program', (req: Request, res: Response, next: Function) => {
  const djId = req.query.rid
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    asc: req.query.asc,
    radioId: djId,
    limit: req.query.limit || 30,
    offset: req.query.offset || 0,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/dj/program/byradio',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/dj/program/detail', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    id: req.query.id,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/dj/program/detail',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/dj/recommend', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/djradio/recommend/v1',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/dj/recommend/type', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    cateId: req.query.type,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/djradio/recommend',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/dj/sub', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    id: req.query.rid,
    csrf_token: ''
  }
  const action = ~~(req.query.t as string) === 1 ? 'sub' : 'unsub'
  createWebAPIRequest(
    'music.163.com',
    `/weapi/djradio/${action}`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/dj/sublist', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''

  const data = {
    offset: req.query.offset || 0,
    total: req.query.total ? 'true' : 'false',
    limit: req.query.limit || 30
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/djradio/get/subed',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/event', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/v1/event/get',
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/fm/trash', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const songId = req.query.id
  const alg = 'RT'
  const time = req.query.time || 25
  const data = {
    csrf_token: '',
    songId
  }

  createWebAPIRequest(
    'music.163.com',
    `/weapi/radio/trash/add?alg=${alg}&songId=${songId}&time=${time}`,
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/follow', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: ''
  }
  const url = req.query.type === 'add' ? 'follow' : 'delfollow'
  const ids = req.query.id
  createWebAPIRequest(
    'music.163.com',
    `/weapi/user/${url}/${ids}`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/like', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const trackId = req.query.id
  const like = req.query.like || true
  const alg = req.query.alg || 'itembased'
  const time = req.query.time || 25
  const data = {
    csrf_token: '',
    trackId,
    like
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/radio/like?alg=${alg}&trackId=${trackId}&like=${like}&time=${time}`,
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/likelist', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    uid: req.query.uid,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/song/like/get`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/logWeb', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: ''
  }

  createWebAPIRequest(
    'music.163.com',
    '/weapi/feedback/weblog',
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/login', (req: Request, res: Response, next: Function) => {
  const email = req.query.email
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const md5sum = crypto.createHash('md5')
  md5sum.update(req.query.password)
  const data = {
    username: email,
    password: md5sum.digest('hex'),
    rememberLogin: 'true'
  }
  console.log(email, req.query.password)

  createWebAPIRequest(
    'music.163.com',
    '/weapi/login',
    'POST',
    data,
    cookie,
    (musicReq: any, cookie: any) => {
      // console.log(musicReq)
      cookie = cookie && cookie.map((x: any) => x.replace('Domain=.music.163.com', ''))
      res.set({
        'Set-Cookie': cookie
      })
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/login/cellphone', (req: Request, res: Response, next: Function) => {
  const phone = req.query.phone
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const md5sum = crypto.createHash('md5')
  md5sum.update(req.query.password)
  const data = {
    phone: phone,
    password: md5sum.digest('hex'),
    rememberLogin: 'true'
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/login/cellphone',
    'POST',
    data,
    cookie,
    (musicReq: any, cookie: Array<any> = []) => {
      const cookieStr =
        'appver=1.5.9os=osx channel=neteaseosver=çæ¬ 10.13.2ï¼çå· 17C88ï¼'
      cookieStr.split('').forEach(item => {
        cookie.push(item + 'Path=/')
      })
      res.set({
        'Set-Cookie': cookie
      })
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/login/refresh', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/login/token/refresh`,
    'POST',
    data,
    cookie,
    (musicReq: any, cookie: any) => {
      res.set({
        'Set-Cookie': cookie
      })
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/lyric', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {}
  const ids = req.query.id
  createWebAPIRequest(
    'music.163.com',
    '/weapi/song/lyric?os=osx&id=' + ids + '&lv=-1&kv=-1&tv=-1',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/music/url', (req: Request, res: Response, next: Function) => {
  const ids = req.query.id
  const br = req.query.br || 999000
  const data = {
    ids: [ids],
    br: br,
    csrf_token: ''
  }
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''

  createWebAPIRequest(
    'music.163.com',
    '/weapi/song/enhance/player/url',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(musicReq)
    },
    () => {
      res.status(502).send('fetch error')
    }
  )
})
router.get('/mv', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const mvid = req.query.mvid
  const data = {
    id: mvid
  }

  createWebAPIRequest(
    'music.163.com',
    `/weapi/mv/detail`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/mv/first', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    // 'offset': req.query.offset || 0,
    total: true,
    limit: req.query.limit || 30,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/mv/first',
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/mv/url', (req: Request, res: Response, next: Function) => {
  const url = req.query.url
  const headers = {
    Referer: 'http://music.163.com/',
    Cookie: 'appver=1.5.0.75771',
    'Content-Type': 'video/mp4',
    Location: url
  }
  const options = {
    header: headers,
    url: url
  }
  request(options)
    .on('error', (err: any) => {
      res.send({
        err
      })
    })
    .pipe(res)
})
router.get('/personal/fm', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/v1/radio/get',
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})

router.get('/personalized', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    limit: req.query.limit || 30,
    offset: req.query.limit || 0,
    total: true,
    n: 1000,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/personalized/playlist',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/personalized/djprogram', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {}
  createWebAPIRequest(
    'music.163.com',
    '/weapi/personalized/djprogram',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/personalized/mv', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {}
  createWebAPIRequest(
    'music.163.com',
    '/weapi/personalized/mv',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/personalized/newsong', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    type: 'recommend'
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/personalized/newsong',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/personalized/privatecontent', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {}
  createWebAPIRequest(
    'music.163.com',
    '/weapi/personalized/privatecontent',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/playlist/catlist', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/playlist/catalogue',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/playlist/create', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    name: req.query.name,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/playlist/create',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/playlist/detail', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    id: req.query.id,
    n: 100000,
    s: req.query.s || 8,
    csrf_token: ''
  }

  createWebAPIRequest(
    'music.163.com',
    `/weapi/v3/playlist/detail`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      // console.log(JSON.parse(musicReq).playlist.tracks.length)
      // console.log(JSON.parse(musicReq).playlist.trackIds.length)
      res.send(musicReq)
    },
    () => {
      res.status(502).send('fetch error')
    }
  )
})
router.get('/playlist/hot', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {}
  createWebAPIRequest(
    'music.163.com',
    '/weapi/playlist/hottags',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/playlist/subscribe', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    id: req.query.id,
    csrf_token: ''
  }
  const action = ~~(req.query.t as string) === 1 ? 'subscribe' : 'unsubscribe'
  createWebAPIRequest(
    'music.163.com',
    `/weapi/playlist/${action}`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/playlist/tracks', (req: Request, res: Response, next: Function) => {
  const op = req.query.op
  const pid = req.query.pid
  // const tracks = req.query.tracks.split(',')
  const tracks = req.query.tracks
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  // console.log('COOKIESS', cookie)
  const data = {
    op: op,
    pid: pid,
    // tracks: (tracks.length === 1) ? tracks[0] : Array.apply(null,{length:tracks.length}).map(()=>({})).join(','),
    // trackIds: (tracks.length === 1) ? JSON.stringify(tracks) : `[${tracks.join(',')}]`
    trackIds: `[${tracks}]`,
    csrf_token: ''
  }

  createWebAPIRequest(
    'music.163.com',
    '/weapi/playlist/manipulate/tracks',
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/playlist/update', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const playlistId = req.query.id
  const descDetail = req.query.desc || ''
  const tagsDetail = req.query.tags || ''
  const nameDetail = req.query.name
  const data = {
    '/api/playlist/desc/update': '{"id":' + playlistId + ',"desc":"' + descDetail + '"}',
    '/api/playlist/tags/update': '{"id":' + playlistId + ',"tags":"' + tagsDetail + '"}',
    '/api/playlist/update/name': '{"id":' + playlistId + ',"name":"' + nameDetail + '"}',
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/batch',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/program/recommend', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    cateId: req.query.type,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/program/recommend/v1',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/recommend/dislike', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: ''
  }

  createWebAPIRequest(
    'music.163.com',
    '/weapi/v1/radio/get',
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/recommend/resource', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: ''
  }

  createWebAPIRequest(
    'music.163.com',
    '/weapi/v1/discovery/recommend/resource',
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/recommend/songs', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    offset: 0,
    total: true,
    limit: 20,
    csrf_token: ''
  }

  createWebAPIRequest(
    'music.163.com',
    '/weapi/v1/discovery/recommend/songs',
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/related/playlist', (req: Request, res: Response, next: Function) => {
  const options = {
    url: 'http://music.163.com/playlist?id=' + req.query.id,
    method: 'GET',
    headers: {
      Referer: 'http://music.163.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3380.0 Safari/537.36'
    }
  }
  request(options, (error: any, response: any, body: any) => {
    if (error) {
      res.status(502).send('fetch error')
    } else {
      try {
        const pattern = /<div class='cver u-cover u-cover-3'>[\s\S]*?<img src='([^']+)'>[\s\S]*?<a class='sname f-fs1 s-fc0' href='([^']+)'[^>]*>([^<]+?)<\/a>[\s\S]*?<a class='nm nm f-thide s-fc3' href='([^']+)'[^>]*>([^<]+?)<\/a>/g
        const data: any = {
          playlists: [],
          code: 200
        }
        let result
        while ((result = pattern.exec(body)) != null) {
          data.playlists.push({
            creator: {
              userId: result[4].slice('/user/home?id='.length),
              nickname: result[5]
            },
            coverImgUrl: result[1].slice(0, -('?param=50y50'.length)),
            name: result[3],
            id: result[2].slice('/playlist?id='.length)
          })
        }
        res.send(JSON.stringify(data))
      } catch (error) {
        res.status(502).send('fetch error')
      }
    }
  })
})
router.get('/resource/like', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    threadId: req.query.id,
    csrf_token: ''
  }
  const action = ~~(req.query.t as string) === 1 ? 'like' : 'unlike'
  createWebAPIRequest(
    'music.163.com',
    `/weapi/resource/${action}`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/search', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const keywords = req.query.keywords
  const type = req.query.type || 1
  const limit = req.query.limit || 30
  const offset = req.query.offset || 0
  // *(type)* 搜索单曲(1)，歌手(100)，专辑(10)，歌单(1000)，用户(1002)
  const data = {
    csrf_token: '',
    limit,
    type,
    s: keywords,
    offset
  }

  createWebAPIRequest(
    'music.163.com',
    '/weapi/search/get',
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/search/hot', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    type: 1111
  }
  // const ids = req.query.id
  createWebAPIRequest(
    'music.163.com',
    '/weapi/search/hot',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/search/multimatch', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: '',
    type: req.query.type || 1,
    s: req.query.keywords || ''
  }

  createWebAPIRequest(
    'music.163.com',
    '/weapi/search/suggest/multimatch',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/search/suggest', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: '',
    s: req.query.keywords || ''
  }

  createWebAPIRequest(
    'music.163.com',
    '/weapi/search/suggest/web',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/send/playlist', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const userIds = req.query.user_ids
  const data = {
    id: req.query.playlist,
    type: 'playlist',
    msg: req.query.msg,
    userIds: '[' + userIds + ']',
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/msg/private/send`,
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/send/text', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  // user_id must be [id]
  const userIds = req.query.user_ids
  const data = {
    type: 'text',
    msg: req.query.msg,
    userIds: '[' + userIds + ']',
    csrf_token: ''
  }
  console.log(data)
  createWebAPIRequest(
    'music.163.com',
    `/weapi/msg/private/send`,
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/simi/artist', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const artistid = req.query.id
  const data = {
    artistid: artistid,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/discovery/simiArtist`,
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/simi/mv', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    mvid: req.query.mvid
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/discovery/simiMV',
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/simi/playlist', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    songid: req.query.id
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/discovery/simiPlaylist',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/simi/song', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    songid: req.query.id
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/v1/discovery/simiSong',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/simi/user', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    songid: req.query.id
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/discovery/simiUser',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/song/detail', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const ids = parseInt(req.query.ids as string)
  const data = {
    // 'id': id,
    c: JSON.stringify([{
      id: ids
    }]),
    ids: '[' + ids + ']',
    csrf_token: ''
  }
  console.log(data)
  createWebAPIRequest(
    'music.163.com',
    '/weapi/v3/song/detail',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/top/album', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    offset: req.query.offset || 0,
    total: true,
    limit: req.query.limit || 50,
    area: req.query.type,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/album/new',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/top/artists', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    offset: req.query.offset || 0,
    total: true,
    limit: req.query.limit || 50,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/artist/top`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/top/list', (req: Request, res: Response, next: Function) => {
  const topListAll = {
    '0': ['云音乐新歌榜', '3779629'],
    '1': ['云音乐热歌榜', '3778678'],
    '2': ['网易原创歌曲榜', '2884035'],
    '3': ['云音乐飙升榜', '19723756'],
    '4': ['云音乐电音榜', '10520166'],
    '5': ['UK排行榜周榜', '180106'],
    '6': ['美国Billboard周榜', '60198'],
    '7': ['KTV嗨榜', '21845217'],
    '8': ['iTunes榜', '11641012'],
    '9': ['Hit FM Top榜', '120001'],
    '10': ['日本Oricon周榜', '60131'],
    '11': ['韩国Melon排行榜周榜', '3733003'],
    '12': ['韩国Mnet排行榜周榜', '60255'],
    '13': ['韩国Melon原声周榜', '46772709'],
    '14': ['中国TOP排行榜(港台榜)', '112504'],
    '15': ['中国TOP排行榜(内地榜)', '64016'],
    '16': ['香港电台中文歌曲龙虎榜', '10169002'],
    '17': ['华语金曲榜', '4395559'],
    '18': ['中国嘻哈榜', '1899724'],
    '19': ['法国 NRJ EuroHot 30周榜', '27135204'],
    '20': ['台湾Hito排行榜', '112463'],
    '21': ['Beatport全球电子舞曲榜', '3812895'],
    '22': ['云音乐ACG音乐榜', '71385702'],
    '23': ['云音乐嘻哈榜', '991319590']
  }
  const idx = req.query.idx as string
  const ids = topListAll[idx][1]
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const action = '/weapi/v3/playlist/detail'
  const data = {
    id: ids,
    n: 10000,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    action,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.setHeader('Content-Type', 'application/json')
      // console.log(JSON.parse(musicReq).playlist.tracks.length)
      // console.log(JSON.parse(musicReq).playlist.trackIds.length)
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/top/mv', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    offset: req.query.offset || 0,
    total: true,
    limit: req.query.limit || 30,
    csrf_token: ''
  }

  createWebAPIRequest(
    'music.163.com',
    '/weapi/mv/toplist',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/top/playlist', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  // order可为 'hot' 可为 'new'
  const data = {
    cat: req.query.cat || '全部',
    order: req.query.order || 'hot',
    offset: req.query.offset || 0,
    total: req.query.total ? 'true' : 'false',
    limit: req.query.limit || 50
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/playlist/list',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/top/playlist/highquality', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    cat: req.query.cat || '全部',
    offset: req.query.offset || 0,
    limit: req.query.limit || 20,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/playlist/highquality/list',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/top/song', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/v1/discovery/new/songs',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/toplist', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/toplist',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/toplist/artist', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    type: req.query.type,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/eapi/toplist/artist?params=B5CAE4715306477C2EFA74D383640F01BF227BF8E889F80E2E2A442958463A7E589CC99878CFCE88D165B64712332AF39EC61B7E68903B2F9F079E8D1AB99FC61049A6D5B97AF8E6FFE8DA16ED540D2CFA80205B889ACA39F8B05AE593FDF5A094F118FF4600C2025094ECF6EB58F6D424B7A97B21A8C1D7CF0609AF2FBE9FDD88826E1667C889757BA920684C5C425FF01B5514AF1EB08AB7D298DB4D65187829E315F9FFBBEB43C2AE3DC21222B31CEC6FF337957AC122FBCB3E793FC1960151B0BDEBB1565BFD835E7A7D6A2D034A5591070D42C32DA4B69E0061C46D61239221A1C64EF676D891B44D7B855E27C82A7EB376F0B0C27952F2006E302B47DA1DE86C3488D53FD98ED9FDC6AA341DF0ECF92BA2E8F77E41811BF9447973C5C34FFED13E28AC544347F9E6ADF4B0008C371FC41C4490D3C9E1A225791D2170326231C40662633AA93D5CEF9AABC777AF268A4B13C560157339478DFAD5D910C966B43E1F017410DBF06D189E2BD6D0CD2682F343A83994E66CA73B5E2A67A122842BF945F2B434CBDE4C5A589A3A90F70DF1A8B63E7BAFBEB624956C62CFB1114AB841379541E5BB4625F2C28CAEA6A67E77A7EEAA1149D9D0F7E190D3A3408DF88B62FBF27996ABC925A93E5A67B4B0D1D931214BB07064F2BA4DCBA2E548E5A110E9B992C21E3930EB488172929C02C06D76BB193EF923D1906E0A0C4D75F5EB909AE77B0A2E55539A182D0B2533C654F2C90A038406B8850BFC022639F2B3FB7EDF40FD74AEA0B9119E9987D2909C01C587794F53459DB8EE83AA8D15FBEAC71EB3A00D8E40E78FE9A9A4068495D9257B39D8F825086F391FD5E7A48AACA96BC261E334A1929C81633234A0B22C573AEAD05BC8B4216283ACFD9E022950AEC812F554B913B4457FDF68AA2CC5E476922C2670D49154BC1DEB6D464F60DBFAD2BB4144762CD3721F52D42FDAE56DB9C529EDB6FB946CD725B3E2EA2AFDCF3F759D384B4F7F75AAA6F01F8093C8A140B3B388FF57272A6A7E10274290A79CDCA69E37BC066CE8CCD5B4BB4E12DA841B',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/toplist/detail', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    id: req.query.id,
    limit: 20,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/toplist/detail',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/user/audio', (req: Request, res: Response, next: Function) => {
  const data = {
    userId: req.query.uid,
    csrf_token: ''
  }
  console.log(data)
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''

  createWebAPIRequest(
    'music.163.com',
    '/weapi/djradio/get/byuser',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(musicReq)
    },
    () => {
      res.status(502).send('fetch error')
    }
  )
})
router.get('/user/cloud', (req: Request, res: Response, next: Function) => {
  const data = {
    limit: req.query.limit || 10,
    offset: req.query.offset || 0,
    csrf_token: ''
  }
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  createWebAPIRequest(
    'music.163.com',
    '/weapi/v1/cloud/get',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(musicReq)
    },
    () => {
      res.status(502).send('fetch error')
    }
  )
})
router.get('/user/cloud/search', (req: Request, res: Response, next: Function) => {
  const data = {
    byids: req.query.id,
    id: req.query.id,
    csrf_token: ''
  }
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  createWebAPIRequest(
    'music.163.com',
    '/weapi/v1/cloud/get/byids',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(musicReq)
    },
    () => {
      res.status(502).send('fetch error')
    }
  )
})
router.get('/user/detail', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const uid = req.query.uid
  const data = {
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/v1/user/detail/${uid}`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/user/dj', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const uid = req.query.uid
  const data = {
    offset: req.query.offset || '0',
    limit: req.query.limit || 30,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/dj/program/${uid}`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/user/event', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const uid = req.query.uid
  const data = {
    time: -1,
    getcounts: true,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/event/get/${uid}`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/user/followeds', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    userId: req.query.uid,
    offset: req.query.offset || '0',
    limit: req.query.limit || 30,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/user/getfolloweds/`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/user/follows', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const uid = req.query.uid
  const data = {
    offset: req.query.offset || '0',
    limit: req.query.limit || 30,
    order: true
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/user/getfollows/${uid}`,
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/user/playlist', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    offset: req.query.offset || 0,
    uid: req.query.uid,
    limit: req.query.limit || 30, // 貌似无效
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/user/playlist',
    'POST',
    data,
    cookie,
    (musicReq: any) => {
      res.send(musicReq)
      // console.log(JSON.parse(musicReq))
    },
    () => res.status(502).send('fetch error')
  )
})
router.get('/user/record', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''

  // type=1时只返回weekData, type=0时返回allData
  const data = {
    type: req.query.type || 0,
    uid: req.query.uid, // 用户 id,
    csrf_token: ''
  }
  const action = `/weapi/v1/play/record`
  createWebAPIRequest(
    'music.163.com',
    action,
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/user/subcount', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/subcount',
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})
router.get('/user/update', (req: Request, res: Response, next: Function) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  // 暂时不提供更换头像接口
  // gender为0表示保密，1为男性，2为女性
  const genderType = req.query.gender
  // birthday 为unix13位时间戳
  // province_number and city_number
  const data = {
    avatarImgId: '0',
    birthday: req.query.birthday,
    city: req.query.city,
    gender: genderType,
    nickname: req.query.nickname,
    province: req.query.province,
    signature: req.query.signature,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    '/weapi/user/profile/update',
    'POST',
    data,
    cookie,
    (musicReq: any) => res.send(musicReq),
    () => res.status(502).send('fetch error')
  )
})

export default router
