import{d as ue,q as ce,r as m,s as re,v as $,x as ie,c as v,w as t,y as de,a as c,o as e,e as a,b as y,t as p,i as d,f as o,g as k,F as f,z as _e,A as h,n as O,B as me,C as Q,D as pe,p as ve,h as fe,_ as he}from"./index.d5c9f17a.js";const ye=F=>(ve("data-v-c5c0d842"),F=F(),fe(),F),ge={class:"title"},ke={class:"info"},Ce=["src"],Be={class:"btns"},be={class:"name"},we={key:0,class:"extra"},Fe={key:1,class:"fee"},xe={key:0},Ae={class:"hot"},Ee=ye(()=>y("p",{class:"ctitle"},"\u7CBE\u5F69\u8BC4\u8BBA",-1)),De={key:0,class:"comment_inner"},Ie={key:0,class:"deleted"},Se={class:"newc"},Ue={class:"ctitle new_comment_title"},$e={key:0,class:"comment_inner"},Pe={key:0,class:"deleted"},Re=ue({__name:"index",setup(F){const x=de(),{player:A}=ce(),L=m(),r=m(null),P=m(!0),E=m(!1),D=m(!1),I=m(!1),R=m([]),b=m([]);let N=[];const V=m(1),S=m([]),T=m(20),j=m([]);re(()=>{console.log("playlist onBeforeMount"),W()});function W(){r.value||$.playlistDetail({id:x.params.id}).then(l=>{var s;P.value=!1,l.code===200?(r.value=l.playlist,R.value=(s=l.playlist)==null?void 0:s.trackIds,N=R.value.map(w=>w.id),X(),q()):I.value=!0}).catch(l=>{P.value=!1,I.value=!0})}function X(){b.value.length||(E.value=!0,ie.detail({ids:N.join(",")}).then(l=>l.code===200?Promise.resolve(l):$.trackAll({id:x.params.id})).then(l=>{b.value=l.songs,E.value=!1}).catch(l=>{E.value=!1,I.value=!0}))}function q(l=!0){console.log(l),!S.value.length&&l&&$.commentHot({id:x.params.id,type:2}).then(s=>{s.code===200&&(S.value=s.hotComments)}),$.commentList({id:x.params.id,offset:(V.value-1)*60}).then(s=>{s.code===200&&(j.value=s.comments)})}function Y(l){const s=document.querySelector(".new_comment_title"),w=(s==null?void 0:s.offsetTop)||0+152;q(!1),me(()=>{var _;(_=L.value)==null||_.scrollTop(w)})}function M(l){console.log(l),A.list=b.value,A.current={queueIndex:l,...b.value[l||0]},A.playing=!0}return(l,s)=>{const w=c("a-image"),_=c("a-col"),H=c("a-button"),z=c("a-row"),G=c("a-list-item"),Z=c("icon-play-arrow"),ee=c("a-list"),J=c("a-tab-pane"),K=c("icon-thumb-up"),U=c("a-comment"),te=c("a-pagination"),ae=c("a-tabs"),ne=c("a-spin"),se=c("icon-wifi"),le=c("a-result"),oe=c("a-scrollbar");return e(),v(oe,{"outer-class":"songs",ref_key:"scrollbarElem",ref:L,"outer-style":{width:"100%",height:"100%",overflow:"hidden auto"},style:{padding:"0 40px",height:"100%",overflow:"hidden auto"}},{default:t(()=>[a(ne,{class:"contain",loading:P.value},{default:t(()=>[r.value?(e(),v(z,{key:0,class:"header",gutter:24},{default:t(()=>[a(_,{span:6},{default:t(()=>{var g;return[a(w,{class:"cover_img",src:(g=r.value)==null?void 0:g.coverImgUrl,width:"100%",height:"auto",fit:"cover","show-loader":""},null,8,["src"])]}),_:1}),a(_,{span:18},{default:t(()=>[y("strong",ge,p(r.value.name),1),y("div",ke,[y("img",{class:"avatar",src:r.value.creator.avatarUrl,alt:""},null,8,Ce),d(" "+p(r.value.creator.nickname)+" ",1),(e(!0),o(f,null,k(r.value.tags,(g,u)=>(e(),o("span",{class:"tag",key:u}," #"+p(g),1))),128))]),y("div",Be,[a(H,{class:"btn_play",size:"small",onClick:s[0]||(s[0]=g=>M())},{default:t(()=>[d("\u64AD\u653E\u5168\u90E8")]),_:1})]),y("div",{class:O(["desc",D.value?"show":""])},[d(p(r.value.description)+" ",1),r.value.description.length>32?(e(),v(_e(D.value?"icon-up":"icon-down"),{key:0,class:"more",onClick:s[1]||(s[1]=g=>D.value=!D.value)})):h("",!0)],2)]),_:1})]),_:1})):h("",!0),r.value?(e(),v(ae,{key:1,"default-active-key":"1",tabBarGutter:40,headerPadding:!1},{default:t(()=>{var g;return[a(J,{title:`\u6B4C\u66F2${R.value.length}`,key:"1"},{default:t(()=>[a(ee,{class:"songs",bordered:!1,split:!1,loading:E.value,hoverable:""},{default:t(()=>[a(G,{class:"head"},{default:t(()=>[a(z,null,{default:t(()=>[a(_,{span:12},{default:t(()=>[d("\u6B4C\u66F2")]),_:1}),a(_,{span:5},{default:t(()=>[d("\u6B4C\u624B")]),_:1}),a(_,{span:5},{default:t(()=>[d("\u4E13\u8F91")]),_:1}),a(_,{span:2},{default:t(()=>[d("\u65F6\u957F")]),_:1})]),_:1})]),_:1}),(e(!0),o(f,null,k(b.value,(u,n)=>{var C;return e(),v(G,{key:n,class:O(["song_item",u.id===((C=Q(A).current)==null?void 0:C.id)?"current_item":""])},{default:t(()=>[a(z,null,{default:t(()=>[a(_,{span:12,class:"names",title:u.name+" "+u.alia.join(" ")},{default:t(()=>[d(" \xA0 "),a(Z,{class:"play_arrow",onClick:i=>M(n)},null,8,["onClick"]),y("span",be,p(u.name),1),u.alia.length?(e(),o("span",we," ("+p(u.alia.join(","))+") ",1)):h("",!0),u.fee==1?(e(),o("span",Fe," VIP ")):h("",!0)]),_:2},1032,["title"]),a(_,{class:"songers",span:5},{default:t(()=>[(e(!0),o(f,null,k(u.ar,(i,B)=>(e(),o(f,{key:B},[d(p(i.name),1),B<u.ar.length-1?(e(),o("i",xe,"/")):h("",!0)],64))),128))]),_:2},1024),a(_,{class:"album",span:5,title:u.al.name},{default:t(()=>[d(p(u.al.name),1)]),_:2},1032,["title"]),a(_,{span:2},{default:t(()=>[d(p(Q(pe)(u.dt)),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["class"])}),128))]),_:1},8,["loading"])]),_:1},8,["title"]),a(J,{class:"comments",title:`\u8BC4\u8BBA${(g=r.value)==null?void 0:g.commentCount}`,key:"2"},{default:t(()=>{var u;return[y("section",Ae,[Ee,(e(!0),o(f,null,k(S.value,(n,C)=>(e(),v(U,{key:C,class:"comment_item",content:n.content,author:n.user.nickname,avatar:n.user.avatarUrl,datetime:n.timeStr},{actions:t(()=>[a(K),d(" "+p(n.likedCount),1)]),default:t(()=>[n.beReplied.length?(e(),o("div",De,[(e(!0),o(f,null,k(n.beReplied,(i,B)=>(e(),o(f,{key:B},[i.status===-5?(e(),o("p",Ie,"\u8BE5\u8BC4\u8BBA\u5DF2\u5220\u9664")):(e(),v(U,{key:1,content:i.content,author:i.user.nickname,avatar:i.user.avatarUrl,datetime:i.timeStr},null,8,["content","author","avatar","datetime"]))],64))),128))])):h("",!0)]),_:2},1032,["content","author","avatar","datetime"]))),128)),S.value.length>T.value?(e(),v(H,{key:0,class:"showmore",shape:"round",onClick:s[2]||(s[2]=n=>T.value+=20)},{default:t(()=>[d("\u66F4\u591A\u7CBE\u5F69\u8BC4\u8BBA")]),_:1})):h("",!0)]),y("section",Se,[y("p",Ue," \u5168\u90E8\u8BC4\u8BBA("+p((u=r.value)==null?void 0:u.commentCount)+") ",1),(e(!0),o(f,null,k(j.value,(n,C)=>(e(),v(U,{key:C,class:"comment_item",content:n.content,author:n.user.nickname,avatar:n.user.avatarUrl,datetime:n.timeStr},{actions:t(()=>[a(K),d(" "+p(n.likedCount?n.likedCount:""),1)]),default:t(()=>[n.beReplied.length?(e(),o("div",$e,[(e(!0),o(f,null,k(n.beReplied,(i,B)=>(e(),o(f,{key:B},[i.status===-5?(e(),o("p",Pe,"\u8BE5\u8BC4\u8BBA\u5DF2\u5220\u9664")):(e(),v(U,{key:1,content:i.content,author:i.user.nickname,avatar:i.user.avatarUrl,datetime:i.timeStr},null,8,["content","author","avatar","datetime"]))],64))),128))])):h("",!0)]),_:2},1032,["content","author","avatar","datetime"]))),128)),a(te,{class:"pages",current:V.value,"onUpdate:current":s[3]||(s[3]=n=>V.value=n),size:"small",total:r.value.commentCount,onChange:Y},null,8,["current","total"])])]}),_:1},8,["title"])]}),_:1})):h("",!0)]),_:1},8,["loading"]),I.value?(e(),v(le,{key:0,status:"error",title:"\u7F51\u7EDC\u9519\u8BEF"},{icon:t(()=>[a(se)]),_:1})):h("",!0)]),_:1},512)}}});const ze=he(Re,[["__scopeId","data-v-c5c0d842"]]);export{ze as default};
