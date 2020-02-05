<template>
  <div style="flex-flow:column nowrap;display:flex; width:100%;height:100%;overflow:hidden">
    <tabs :items="tabs" style="flex:0 0 auto;width:100%"  :selectedIndex.sync="tabIndex"></tabs>
    <div v-show="tabIndex == 0" style="flex:1 1 auto;overflow:auto; width:100%">
      <div style="display:block;">
        <h4 style="user-select:none;padding:10px 0 5px 0;margin:0 auto">{{info.file}}</h4>
        <input id="iType" type="checkbox" @change="navTypeChanged" v-model="isNav"/>
        <label for="iType" style="user-select:none;">¿Navegación?</label>
        <div style="padding:10px 0"></div>
        <svg id="SVGCanvas" style="display:block;margin:0 auto;max-width:400px" viewBox="-32 0 314 252"></svg>
        <div style="height:15px"></div>

        <button class="fxbutton" @click="send(0)"><vue-fa-icon size="lg" icon="comment-alt" :style="{color:'white'}"></vue-fa-icon></button>
        <button class="fxbutton" @click="send(1)"><vue-fa-icon size="lg" icon="file-audio" :style="{color:'white'}"></vue-fa-icon></button>
        <button class="fxbutton" @click="send(2)"><vue-fa-icon size="lg" icon="compress-alt" :style="{color:'white'}"></vue-fa-icon></button>
        <input type="range" step="100" style="margin:1rem 0;width:100%;user-select:none" v-model="position" @change="onSliderChange" @input="onSliderInput" name="volume" min="0" :max="info.duration">

        <!--<h5 style="user-select:none;padding:0;margin:0 auto">{{info.filepath}}</h5>-->
        <!--<p>{{info.state}}</p>-->
        <p style="user-select:none;">{{info.statestring}}</p>
        <!--<p>{{info.position}}</p>-->
        <p style="user-select:none;">{{info.size}} - {{position | milisToDur}}/{{info.durationstring}}</p>
        <p style="user-select:none;">{{info.filepath | folderFilter}}</p>
        <!--<p>{{info.duration}}</p>-->
        <!--<p style="user-select:none;"> <vue-fa-icon :icon="info.muted == '0' ?'volume-up':'volume-mute'" :style="{color:'black'}"></vue-fa-icon> {{info.volumelevel}}</p>-->
        <!--<p>{{info.muted}}</p>-->
      </div>
    </div>
    <div v-if="tabIndex == 1" style="flex:1 1 auto;overflow:auto; width:100%">
      
        <button style="height:6rem;width:100%" v-for="i in files" :key="i.title" @click="openFile(i)">
          <p style="overflow:hidden;text-overflow: ellipsis;font-size:medium; padding:0.5rem 0 0 0; margin:0 auto; text-align:left;
          display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;">
            <vue-fa-icon size="lg" :icon="i.type == 'Directory'? 'folder':'file'" :style="{color:'black'}"></vue-fa-icon>
            <strong> {{i.title}}</strong></p>
          <p style="font-size:small;padding:0.75rem 0 0 0.5rem;margin:0 auto;text-align:right">{{i.date}}</p>
          </button>
    </div>
  </div>
</template>

<script>


    
function circleBySize(canvas){
  let r= 125, r2 = r + 30;
  canvas.defs().path(`M 0 0 L 0 ${r} L ${r} ${r} A ${r} ${r} 0 0 0 0 0 Z`).attr({id:"cArc"})
  canvas.defs().path(`M 0 0 L 0 ${r} L ${r2} ${r} A ${r2} ${r2} 0 0 0 0 ${r-r2} Z`).attr({id:"cArcLarge"})
  canvas.defs().path(`M64.702,30.366L37.12,14.442c-0.995-0.574-2.221-0.574-3.217,0s-1.609,1.639-1.609,2.787v13.072L4.827,14.442   c-0.997-0.574-2.222-0.574-3.218,0S0,16.081,0,17.229v31.849c0,1.148,0.613,2.211,1.609,2.785c0.498,0.287,1.053,0.432,1.608,0.432   s1.111-0.145,1.609-0.432l27.466-15.857v13.072c0,1.148,0.612,2.211,1.608,2.785c0.498,0.287,1.055,0.432,1.609,0.432   s1.111-0.145,1.607-0.432l27.582-15.924c0.996-0.574,1.609-1.637,1.609-2.787C66.311,32.004,65.698,30.94,64.702,30.366z`).attr({'stroke':'black', 'stroke-width':2,'fill':'none','transform':'scale(0.5)',id:'ff',viewBox:"0 0 385.201 385.201"})
  canvas.defs().path("M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179   l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261   C187.881,124.315,187.881,116.495,183.189,111.816z").attr({'stroke':'black', 'stroke-width':7,'fill':'none','transform':'scale(0.15)',id:'next'})
  
  /*let r2 = r-0,
  txts = [canvas.plain("+").attr({x:r2,y:0,"color":'red',"font-size": "xx-large"}),
  canvas.plain(">").attr({x:2*r2,y:r2,"color":'red',"font-size": "xx-large"}),
  canvas.plain("<").attr({x:0,y:r2,"color":'red',"font-size": "xx-large"}),
  canvas.plain("-").attr({x:r2,y:2*r2,"color":'red',"font-size": "xx-large"})]
  /*for(let e of txts){
    let bbox = e.bbox(), attrs = e.attr(['x','y']);
    console.log(attrs)
    e.attr({'x':attrs.x - bbox.w/2, 'y':attrs.y + bbox.h/2 }) 

  }*/

  let g2 = canvas.group().rotate(45,r,r),
  g1 = canvas.group().rotate(45,r,r),
  right2 = g2.use("cArcLarge").translate(r,0).addClass("likeButton"),
  left2 = g2.use("cArcLarge").translate(r-r2,r2).rotate(-180).addClass("likeButton"),

  right = g1.use("cArc").translate(r,0).rotate(0).addClass("likeButton"),
  top = g1.use("cArc").translate(0,0).rotate(-90).addClass("likeButton"),
  left = g1.use("cArc").translate(0,r).rotate(-180).addClass("likeButton"),
  bottom = g1.use("cArc").translate(r,r).rotate(-270).addClass("likeButton")

  canvas.circle({'cx':r,'cy':r,'r':r*0.6}).attr({"fill":"white","stroke-width":1,"stroke":"black"})
  let center = canvas.circle({'cx':r,'cy':r,'r':r*0.45}).addClass("likeButton")

  let ng = canvas.group(),ng2 = canvas.group(), obj = ng.use("ff"), obj2 = ng2.use("ff").scale(-1,1)
  ng.translate(207,110)
  ng2.translate(10,110)

  let ng3 = canvas.group(), ng4 = canvas.group(),
  plus = ng3.path("M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z").attr({"stroke":"black","stroke-width":1,"fill":"none","transform":"scale(0.7)"}),
  sustract = ng4.path("M426.667,170.667H85.333C38.272,170.667,0,208.939,0,256s38.272,85.333,85.333,85.333h341.333    C473.728,341.333,512,303.061,512,256S473.728,170.667,426.667,170.667z").attr({"stroke":"black","stroke-width":10,"fill":"none","transform":"scale(0.07)"})

  ng3.translate(110,10)
  ng4.translate(110,205)

  let ng5 = canvas.group(), ng6 = canvas.group(), next = ng5.use("next"),prev = ng6.use("next").scale(-1,1)
  ng5.translate(247,108)
  ng6.translate(-32,108)

  let ng7= canvas.group(), ng8 = canvas.group(), play = ng7.path("M288.318,145.307L39.832,1.841c-4.253-2.454-9.486-2.454-13.74,0c-4.249,2.452-6.871,6.991-6.871,11.898v286.93   c0,4.908,2.622,9.447,6.871,11.898c2.128,1.229,4.5,1.843,6.87,1.843c2.372,0,4.743-0.614,6.87-1.843l248.487-143.464   c4.25-2.452,6.871-6.991,6.871-11.898C295.189,152.297,292.568,147.759,288.318,145.307z M46.702,276.868V37.541l207.265,119.664   L46.702,276.868z").attr({"stroke":"black","stroke-width":6,"fill":"none","transform":"scale(0.17)"});

  ng8.path("M23.483,202.205H85.83V0H23.483V202.205z M31.417,7.934h46.479v186.336H31.417V7.934z").attr({"stroke":"black","stroke-width":4,"fill":"none","transform":"scale(0.25)"});
  ng8.path("M116.372,0v202.205h62.351V0H116.372z M170.788,194.271h-46.486V7.934h46.482v186.336H170.788z").attr({"stroke":"black","stroke-width":4,"fill":"none","transform":"scale(0.25)"});

  ng7.translate(105,100)
  ng8.translate(102,100)


  /*let txt = canvas.plain('OK').attr({'x':r,'y':r,'stroke-width':1.5,'stroke':'black'}), attrs = txt.attr(['x','y']),bbox = txt.bbox()
    txt.attr({'x':r - bbox.w/2, 'y':r + bbox.h/2 }) 
    console.log(bbox)*/
    return {
      center, right, top, bottom, left, right2, left2, play, pause :ng8
    }
}

import { SVG, Rect } from "@svgdotjs/svg.js";
import {Commands, Functions } from './../api/commands'
import tabs from './Tabs'
export default {
  components:{
    tabs
  },
  filters:{
    milisToDur(m){
      return (new Date(+m)).toGMTString().slice(17,25)
    },
    folderFilter(s = ""){
      return s.substr(0, s.lastIndexOf('\\'));
    }
  },
  data: function() {
    return {
      Canvas: null,
      info:{},
      controls:{},
      tabIndex:0,
      tabs:[{title:'Controles',value:"Controls"},{title:'Archivos',value:"Archives"}],
      files:[],
      position:0,
      interval1s:null,
      interval10s:null,
      isNav:false,
      isSliderMoving:false
    };
  },
  methods:{
    openFile:function(file){
      Functions.FileOpen(file).then(()=>Functions.GetVariables().then(this.updateInfo)).catch(directory=> Functions.FilesFrom(directory,true).then(d=>{ this.files = d.items}))
    },
    navTypeChanged:function(){
      this.bindWithMode(this.isNav?0:1)
    },
    updateInfo:function(info){
      if(!this.isSliderMoving)
          {
            this.info = info;          
            this.controls.pause.attr({"visibility": +this.info.state === 2? 'visible':'hidden'})
            this.controls.play.attr({"visibility": +this.info.state === 2? 'hidden':'visible'})
          }
        this.position = +info.position; 
        return true;
    },
    send:function(cmd){
      switch(cmd){
        case 0: Functions.SendCommand(Commands.NEXT_SUBTITLE); break;
          case 1: Functions.SendCommand(Commands.NEXT_AUDIO); break;
          case 2: Functions.SendCommand(Commands.FULLSCREEN); break;
      }
    },
    onSliderInput: function(){
      this.isSliderMoving = true
      //console.log(this.isSliderMoving)
    },
    onSliderChange: function(){
      this.isSliderMoving = false
      Functions.SendCommand(Commands.SEEK,this.position);
      
    },
    bindWithMode:function(mode = 1){
      this.unbind()     
      //let cb = i=>{this.info = i; this.position = i.position; console.log(i) ;return true}
      this.controls["right2"].click(Functions.SendCommand.bind(this,Commands.NEXT,undefined,this.updateInfo))
      this.controls["left2"].click(Functions.SendCommand.bind(this,Commands.PREVIOUS,undefined,this.updateInfo))

      this.controls["right"].click(Functions.SendCommand.bind(this,mode == 1 ? Commands.JUMP_FORWARD_MEDIUM: Commands.DVD_MENU_RIGHT,undefined,this.updateInfo))
      this.controls["top"].click(Functions.SendCommand.bind(this,mode == 1 ? Commands.VOLUME_UP: Commands.DVD_MENU_UP,undefined,this.updateInfo))
      this.controls["left"].click(Functions.SendCommand.bind(this,mode == 1 ? Commands.JUMP_BACKWARD_MEDIUM: Commands.DVD_MENU_LEFT,undefined,this.updateInfo))
      this.controls["bottom"].click(Functions.SendCommand.bind(this,mode == 1 ? Commands.VOLUME_DOWN: Commands.DVD_MENU_DOWN,undefined,this.updateInfo))
      this.controls["center"].click(Functions.SendCommand.bind(this,mode == 1 ? Commands.PLAY_PAUSE: Commands.DVD_MENU_ACTIVATE,undefined,this.updateInfo))

    },
    unbind:function(){
      for(let prop in this.controls)
      this.controls[prop].off()
    },
    updateTime: function(){
      if(!this.isSliderMoving && +(this.info.state) === 2 && this.info["duration"] && +(this.position) < +(this.info["duration"])){
        this.position = +(this.position) + 1000;
      }

    },
    updateTimeFromSource: function(){
      Functions.GetVariables().then(this.updateInfo)
    }
  },
  unmouted:function(){
    this.unbind()
    clearInterval(this.interval1s)
    clearInterval(this.interval10s)
  },
  mounted: function onMounted() {
    this.Canvas = SVG("#SVGCanvas").attr({'width':'100%', 'height':'100%'})
    //this.Canvas.rect({x:0,y:0,width:100,height:150,rx:5,ry:5}).attr({'fill':'black','stroke-width':1,'stroke':'black'})

    this.controls = circleBySize(this.Canvas)
    let _this = this;
    Functions.GetVariables().then(this.updateInfo)
    .then(flag=>{
      this.bindWithMode()
      return Functions.FilesFrom(this.info.filedirarg)
    }).then(d=>{
      _this.files = d.items
    })
    
    this.interval1s = setInterval(this.updateTime,1000)
    this.interval10s = setInterval(this.updateTimeFromSource,5000)
    
    //this.Canvas.path("M 0 0 L 100 0 A 100 100 0 0 1 100 200 L 0 200 A 100 100 0 0 0 0 0 Z").attr({'fill':'red'})
    


    //this.Canvas.use("cArc").attr({"fill":"red"}).move(100,50).rotate(135,50,50).addClass("likeButton")
    //this.Canvas.use("cArc").attr({"fill":"red"}).move(0,50).rotate(225).addClass("likeButton")
    //this.Canvas.use("cArc").attr({"fill":"red"}).move(0,50).rotate(315).addClass("likeButton")
    /*this.Canvas.use("cArc").attr({"fill":"red"}).move(100,0).rotate(90).addClass("likeButton")
    this.Canvas.use("cArc").attr({"fill":"red"}).move(200,0).rotate(180).addClass("likeButton")
    this.Canvas.use("cArc").attr({"fill":"red"}).move(300,0).rotate(270).addClass("likeButton")*/
    //this.Canvas.path("m 130.61441,55.118859 c 0,0 6.3293,-6.049572 5.88531,-15.190213 -0.065,-8.518299 -5.90893,-13.843081 -5.90893,-13.843081 l -7.13431,6.945313 c 0,0 3.13975,2.514666 2.93157,7.465072 -0.20545,4.885479 -3.14418,7.252375 -3.14418,7.252375 l 7.37054,7.370534").scale(4).attr({"fill":"purple"}).addClass("likeButton")
    
    //new Rect({x:50,y:50,width:150,height:150}).attr({'fill':'black','stroke-width':1,'stroke':'black'}).addTo(this.Canvas)
    //console.log(this.Canvas.children())
    //let r = SVG.Rect(50,50,150,150).attr({'fill':'black','stroke-width':1,'stroke':'black'})
    //this.Canvas.add(r)
    
    //  .attr({ width: "100%", height: "100%" });
  }
};
</script>
<style>
body{
  background: white
}

.likeButton{
  fill:gray;
  transition: fill ease-in-out 0.3ms 0ms;
  stroke:black;
  stroke-width: 1

}
.fxbutton:hover,.likeButton:hover{
  fill:darkgray
}
.likeButton:active{
  fill:dimgrey
}

.fxbutton{
  background: gray;
  padding: 0.75rem 2rem;
  border: solid black .125rem;
  margin: 0 .125rem;
  border-radius: 0.5rem;
  transition: all ease-in-out 0.4ms 0ms
  
}
.fxbutton:active{
  background:dimgrey
}
.fxbutton:hover{
  background:darkgray
}
.fxbutton:focus{
  outline: none;
}
</style>