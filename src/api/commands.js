import * as axios from 'axios'

const Commands = {
    "VOLUME_UP": 907,
    "VOLUME_DOWN": 908,
    "NEXT_AUDIO": 952,
    "PREV_AUDIO": 953,
    "NEXT_SUBTITLE": 954,
    "PREV_SUBTITLE": 955,
    "ON_OFF_SUBTITLE": 956,
    "PLAY_PAUSE": 889,
    "DVD_MENU_ACTIVATE": 933,
    "DVD_MENU_LEFT": 929,
    "DVD_MENU_RIGHT": 930,
    "DVD_MENU_UP": 931,
    "DVD_MENU_DOWN": 932,
    "NEXT": 922,
    "PREVIOUS": 921,
    "FULLSCREEN": 830,
    "JUMP_FORWARD_SMALL": 900,
    "JUMP_BACKWARD_SMALL": 899,
    "JUMP_FORWARD_MEDIUM": 902,
    "JUMP_BACKWARD_MEDIUM": 901,
    "JUMP_FORWARD_LARGE": 904,
    "JUMP_BACKWARD_LARGE": 903,
    "SEEK": -1
}
let Functions = {
    FileOpen: function (item) {
        console.log(item)
        if (item.type == 'Directory')
            return Promise.reject(item.href)
        else return axios.get(item.href)
    },
    FilesFrom: function _filesFrom(path,isUrl = false) {
        return axios.get(isUrl?path:("/browser.html?path=" + path)).then(r => {
            let rgx0 = /<td.+?href="(.+?)">(.+?)<(?:.|\n|\r)+?class(?:.|\n|\r)+?>(.+?)<(?:.|\n|\r)+?class(?:.|\n|\r)+?>(.+?)<(?:.|\n|\r)+?class(?:.|\n|\r)+?>([^>]+?)</igm,
                rgx1 = /Location.+?>((?:.|\n|\r)+?)</igm,
                itms = [],
                it = null,
                path = (rgx1.exec(r.data))[1]
            while ((it = rgx0.exec(r.data)) != null) {
                itms.push({ "href": it[1], "title": it[2], "type": it[3], "size": it[4], "date": it[5] })
            }

            return { "folder": path, "items": itms }
        })
    },
    GetVariables: function _getVariables() {
        return axios.get("/variables.html").then(doc => {
            let rgx = /p.+?id="(.+?)">(.+?)</igm,
                itms = {},
                it = null
            while ((it = rgx.exec(doc.data)) != null)
                itms[it[1]] = it[2]

            return itms
        })
    },
    SendCommand: function _sendCommand(command, arg, callback = (i) => i) {
        let params = new URLSearchParams()
        params.append("wm_command", command)
        if (command == -1) {
            params.append("position", (new Date(+arg)).toGMTString().slice(17, 25))
        }

        //console.log(command, params, arg)
        return axios.post("/command.html", params).then(Functions.GetVariables).then(callback)
    }
}


export { Commands, Functions }