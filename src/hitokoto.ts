import fetch from 'node-fetch'

// id	5109
// uuid	"0b9533fc-3850-43f6-bb03-423a5dbf2fa5"
// hitokoto	"荷尔蒙决定一见钟情，多巴胺决定天长地久。"
// type	"j"
// from	"网易云"
// from_who	"不自爱里迷失"
// creator	"小忧忧"
// creator_uid	4701
// reviewer	4756
// commit_from	"web"
// created_at	"1582646766"
// length	20
interface hkdata {
  hitokoto: string
}

export default class hk {

  static async get(): Promise<string> {
    try {
      const data: hkdata = await (await fetch(`https://v1.hitokoto.cn/`)).json()
      const { hitokoto } = data
      return hitokoto
    } catch (error) {
      console.error(error)
      return ""
    }
  } 

}