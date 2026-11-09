(()=>{var dg=Object.create;var $h=Object.defineProperty;var pg=Object.getOwnPropertyDescriptor;var mg=Object.getOwnPropertyNames;var gg=Object.getPrototypeOf,_g=Object.prototype.hasOwnProperty;var xg=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports);var vg=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of mg(t))!_g.call(i,r)&&r!==e&&$h(i,r,{get:()=>t[r],enumerable:!(n=pg(t,r))||n.enumerable});return i};var yg=(i,t,e)=>(e=i!=null?dg(gg(i)):{},vg(t||!i||!i.__esModule?$h(e,"default",{value:i,enumerable:!0}):e,i));var Nm=xg((Dm,Um)=>{var Im=function(){var i=function(y,v){var b=236,T=17,M=y,E=e[v],C=null,_=0,S=null,L=[],U={},X=function(F,w){_=M*4+17,C=function(I){for(var N=new Array(I),k=0;k<I;k+=1){N[k]=new Array(I);for(var $=0;$<I;$+=1)N[k][$]=null}return N}(_),D(0,0),D(_-7,0),D(0,_-7),J(),H(),tt(F,w),M>=7&&Q(F),S==null&&(S=mt(M,E,L)),it(S,w)},D=function(F,w){for(var I=-1;I<=7;I+=1)if(!(F+I<=-1||_<=F+I))for(var N=-1;N<=7;N+=1)w+N<=-1||_<=w+N||(0<=I&&I<=6&&(N==0||N==6)||0<=N&&N<=6&&(I==0||I==6)||2<=I&&I<=4&&2<=N&&N<=4?C[F+I][w+N]=!0:C[F+I][w+N]=!1)},z=function(){for(var F=0,w=0,I=0;I<8;I+=1){X(!0,I);var N=r.getLostPoint(U);(I==0||F>N)&&(F=N,w=I)}return w},H=function(){for(var F=8;F<_-8;F+=1)C[F][6]==null&&(C[F][6]=F%2==0);for(var w=8;w<_-8;w+=1)C[6][w]==null&&(C[6][w]=w%2==0)},J=function(){for(var F=r.getPatternPosition(M),w=0;w<F.length;w+=1)for(var I=0;I<F.length;I+=1){var N=F[w],k=F[I];if(C[N][k]==null)for(var $=-2;$<=2;$+=1)for(var st=-2;st<=2;st+=1)$==-2||$==2||st==-2||st==2||$==0&&st==0?C[N+$][k+st]=!0:C[N+$][k+st]=!1}},Q=function(F){for(var w=r.getBCHTypeNumber(M),I=0;I<18;I+=1){var N=!F&&(w>>I&1)==1;C[Math.floor(I/3)][I%3+_-8-3]=N}for(var I=0;I<18;I+=1){var N=!F&&(w>>I&1)==1;C[I%3+_-8-3][Math.floor(I/3)]=N}},tt=function(F,w){for(var I=E<<3|w,N=r.getBCHTypeInfo(I),k=0;k<15;k+=1){var $=!F&&(N>>k&1)==1;k<6?C[k][8]=$:k<8?C[k+1][8]=$:C[_-15+k][8]=$}for(var k=0;k<15;k+=1){var $=!F&&(N>>k&1)==1;k<8?C[8][_-k-1]=$:k<9?C[8][15-k-1+1]=$:C[8][15-k-1]=$}C[_-8][8]=!F},it=function(F,w){for(var I=-1,N=_-1,k=7,$=0,st=r.getMaskFunction(w),O=_-1;O>0;O-=2)for(O==6&&(O-=1);;){for(var Tt=0;Tt<2;Tt+=1)if(C[N][O-Tt]==null){var dt=!1;$<F.length&&(dt=(F[$]>>>k&1)==1);var et=st(N,O-Tt);et&&(dt=!dt),C[N][O-Tt]=dt,k-=1,k==-1&&($+=1,k=7)}if(N+=I,N<0||_<=N){N-=I,I=-I;break}}},at=function(F,w){for(var I=0,N=0,k=0,$=new Array(w.length),st=new Array(w.length),O=0;O<w.length;O+=1){var Tt=w[O].dataCount,dt=w[O].totalCount-Tt;N=Math.max(N,Tt),k=Math.max(k,dt),$[O]=new Array(Tt);for(var et=0;et<$[O].length;et+=1)$[O][et]=255&F.getBuffer()[et+I];I+=Tt;var pt=r.getErrorCorrectPolynomial(dt),Yt=a($[O],pt.getLength()-1),Xt=Yt.mod(pt);st[O]=new Array(pt.getLength()-1);for(var et=0;et<st[O].length;et+=1){var P=et+Xt.getLength()-st[O].length;st[O][et]=P>=0?Xt.getAt(P):0}}for(var A=0,et=0;et<w.length;et+=1)A+=w[et].totalCount;for(var q=new Array(A),ot=0,et=0;et<N;et+=1)for(var O=0;O<w.length;O+=1)et<$[O].length&&(q[ot]=$[O][et],ot+=1);for(var et=0;et<k;et+=1)for(var O=0;O<w.length;O+=1)et<st[O].length&&(q[ot]=st[O][et],ot+=1);return q},mt=function(F,w,I){for(var N=o.getRSBlocks(F,w),k=l(),$=0;$<I.length;$+=1){var st=I[$];k.put(st.getMode(),4),k.put(st.getLength(),r.getLengthInBits(st.getMode(),F)),st.write(k)}for(var O=0,$=0;$<N.length;$+=1)O+=N[$].dataCount;if(k.getLengthInBits()>O*8)throw"code length overflow. ("+k.getLengthInBits()+">"+O*8+")";for(k.getLengthInBits()+4<=O*8&&k.put(0,4);k.getLengthInBits()%8!=0;)k.putBit(!1);for(;!(k.getLengthInBits()>=O*8||(k.put(b,8),k.getLengthInBits()>=O*8));)k.put(T,8);return at(k,N)};U.addData=function(F,w){w=w||"Byte";var I=null;switch(w){case"Numeric":I=c(F);break;case"Alphanumeric":I=u(F);break;case"Byte":I=h(F);break;case"Kanji":I=f(F);break;default:throw"mode:"+w}L.push(I),S=null},U.isDark=function(F,w){if(F<0||_<=F||w<0||_<=w)throw F+","+w;return C[F][w]},U.getModuleCount=function(){return _},U.make=function(){if(M<1){for(var F=1;F<40;F++){for(var w=o.getRSBlocks(F,E),I=l(),N=0;N<L.length;N++){var k=L[N];I.put(k.getMode(),4),I.put(k.getLength(),r.getLengthInBits(k.getMode(),F)),k.write(I)}for(var $=0,N=0;N<w.length;N++)$+=w[N].dataCount;if(I.getLengthInBits()<=$*8)break}M=F}X(!1,z())},U.createTableTag=function(F,w){F=F||2,w=typeof w>"u"?F*4:w;var I="";I+='<table style="',I+=" border-width: 0px; border-style: none;",I+=" border-collapse: collapse;",I+=" padding: 0px; margin: "+w+"px;",I+='">',I+="<tbody>";for(var N=0;N<U.getModuleCount();N+=1){I+="<tr>";for(var k=0;k<U.getModuleCount();k+=1)I+='<td style="',I+=" border-width: 0px; border-style: none;",I+=" border-collapse: collapse;",I+=" padding: 0px; margin: 0px;",I+=" width: "+F+"px;",I+=" height: "+F+"px;",I+=" background-color: ",I+=U.isDark(N,k)?"#000000":"#ffffff",I+=";",I+='"/>';I+="</tr>"}return I+="</tbody>",I+="</table>",I},U.createSvgTag=function(F,w,I,N){var k={};typeof arguments[0]=="object"&&(k=arguments[0],F=k.cellSize,w=k.margin,I=k.alt,N=k.title),F=F||2,w=typeof w>"u"?F*4:w,I=typeof I=="string"?{text:I}:I||{},I.text=I.text||null,I.id=I.text?I.id||"qrcode-description":null,N=typeof N=="string"?{text:N}:N||{},N.text=N.text||null,N.id=N.text?N.id||"qrcode-title":null;var $=U.getModuleCount()*F+w*2,st,O,Tt,dt,et="",pt;for(pt="l"+F+",0 0,"+F+" -"+F+",0 0,-"+F+"z ",et+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',et+=k.scalable?"":' width="'+$+'px" height="'+$+'px"',et+=' viewBox="0 0 '+$+" "+$+'" ',et+=' preserveAspectRatio="xMinYMin meet"',et+=N.text||I.text?' role="img" aria-labelledby="'+K([N.id,I.id].join(" ").trim())+'"':"",et+=">",et+=N.text?'<title id="'+K(N.id)+'">'+K(N.text)+"</title>":"",et+=I.text?'<description id="'+K(I.id)+'">'+K(I.text)+"</description>":"",et+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',et+='<path d="',Tt=0;Tt<U.getModuleCount();Tt+=1)for(dt=Tt*F+w,st=0;st<U.getModuleCount();st+=1)U.isDark(Tt,st)&&(O=st*F+w,et+="M"+O+","+dt+pt);return et+='" stroke="transparent" fill="black"/>',et+="</svg>",et},U.createDataURL=function(F,w){F=F||2,w=typeof w>"u"?F*4:w;var I=U.getModuleCount()*F+w*2,N=w,k=I-w;return d(I,I,function($,st){if(N<=$&&$<k&&N<=st&&st<k){var O=Math.floor(($-N)/F),Tt=Math.floor((st-N)/F);return U.isDark(Tt,O)?0:1}else return 1})},U.createImgTag=function(F,w,I){F=F||2,w=typeof w>"u"?F*4:w;var N=U.getModuleCount()*F+w*2,k="";return k+="<img",k+=' src="',k+=U.createDataURL(F,w),k+='"',k+=' width="',k+=N,k+='"',k+=' height="',k+=N,k+='"',I&&(k+=' alt="',k+=K(I),k+='"'),k+="/>",k};var K=function(F){for(var w="",I=0;I<F.length;I+=1){var N=F.charAt(I);switch(N){case"<":w+="&lt;";break;case">":w+="&gt;";break;case"&":w+="&amp;";break;case'"':w+="&quot;";break;default:w+=N;break}}return w},nt=function(F){var w=1;F=typeof F>"u"?w*2:F;var I=U.getModuleCount()*w+F*2,N=F,k=I-F,$,st,O,Tt,dt,et={"\u2588\u2588":"\u2588","\u2588 ":"\u2580"," \u2588":"\u2584","  ":" "},pt={"\u2588\u2588":"\u2580","\u2588 ":"\u2580"," \u2588":" ","  ":" "},Yt="";for($=0;$<I;$+=2){for(O=Math.floor(($-N)/w),Tt=Math.floor(($+1-N)/w),st=0;st<I;st+=1)dt="\u2588",N<=st&&st<k&&N<=$&&$<k&&U.isDark(O,Math.floor((st-N)/w))&&(dt=" "),N<=st&&st<k&&N<=$+1&&$+1<k&&U.isDark(Tt,Math.floor((st-N)/w))?dt+=" ":dt+="\u2588",Yt+=F<1&&$+1>=k?pt[dt]:et[dt];Yt+=`
`}return I%2&&F>0?Yt.substring(0,Yt.length-I-1)+Array(I+1).join("\u2580"):Yt.substring(0,Yt.length-1)};return U.createASCII=function(F,w){if(F=F||1,F<2)return nt(w);F-=1,w=typeof w>"u"?F*2:w;var I=U.getModuleCount()*F+w*2,N=w,k=I-w,$,st,O,Tt,dt=Array(F+1).join("\u2588\u2588"),et=Array(F+1).join("  "),pt="",Yt="";for($=0;$<I;$+=1){for(O=Math.floor(($-N)/F),Yt="",st=0;st<I;st+=1)Tt=1,N<=st&&st<k&&N<=$&&$<k&&U.isDark(O,Math.floor((st-N)/F))&&(Tt=0),Yt+=Tt?dt:et;for(O=0;O<F;O+=1)pt+=Yt+`
`}return pt.substring(0,pt.length-1)},U.renderTo2dContext=function(F,w){w=w||2;for(var I=U.getModuleCount(),N=0;N<I;N++)for(var k=0;k<I;k++)F.fillStyle=U.isDark(N,k)?"black":"white",F.fillRect(N*w,k*w,w,w)},U};i.stringToBytesFuncs={default:function(y){for(var v=[],b=0;b<y.length;b+=1){var T=y.charCodeAt(b);v.push(T&255)}return v}},i.stringToBytes=i.stringToBytesFuncs.default,i.createStringToBytes=function(y,v){var b=function(){for(var M=g(y),E=function(){var H=M.read();if(H==-1)throw"eof";return H},C=0,_={};;){var S=M.read();if(S==-1)break;var L=E(),U=E(),X=E(),D=String.fromCharCode(S<<8|L),z=U<<8|X;_[D]=z,C+=1}if(C!=v)throw C+" != "+v;return _}(),T=63;return function(M){for(var E=[],C=0;C<M.length;C+=1){var _=M.charCodeAt(C);if(_<128)E.push(_);else{var S=b[M.charAt(C)];typeof S=="number"?(S&255)==S?E.push(S):(E.push(S>>>8),E.push(S&255)):E.push(T)}}return E}};var t={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},e={L:1,M:0,Q:3,H:2},n={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},r=function(){var y=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],v=1335,b=7973,T=21522,M={},E=function(C){for(var _=0;C!=0;)_+=1,C>>>=1;return _};return M.getBCHTypeInfo=function(C){for(var _=C<<10;E(_)-E(v)>=0;)_^=v<<E(_)-E(v);return(C<<10|_)^T},M.getBCHTypeNumber=function(C){for(var _=C<<12;E(_)-E(b)>=0;)_^=b<<E(_)-E(b);return C<<12|_},M.getPatternPosition=function(C){return y[C-1]},M.getMaskFunction=function(C){switch(C){case n.PATTERN000:return function(_,S){return(_+S)%2==0};case n.PATTERN001:return function(_,S){return _%2==0};case n.PATTERN010:return function(_,S){return S%3==0};case n.PATTERN011:return function(_,S){return(_+S)%3==0};case n.PATTERN100:return function(_,S){return(Math.floor(_/2)+Math.floor(S/3))%2==0};case n.PATTERN101:return function(_,S){return _*S%2+_*S%3==0};case n.PATTERN110:return function(_,S){return(_*S%2+_*S%3)%2==0};case n.PATTERN111:return function(_,S){return(_*S%3+(_+S)%2)%2==0};default:throw"bad maskPattern:"+C}},M.getErrorCorrectPolynomial=function(C){for(var _=a([1],0),S=0;S<C;S+=1)_=_.multiply(a([1,s.gexp(S)],0));return _},M.getLengthInBits=function(C,_){if(1<=_&&_<10)switch(C){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw"mode:"+C}else if(_<27)switch(C){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw"mode:"+C}else if(_<41)switch(C){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw"mode:"+C}else throw"type:"+_},M.getLostPoint=function(C){for(var _=C.getModuleCount(),S=0,L=0;L<_;L+=1)for(var U=0;U<_;U+=1){for(var X=0,D=C.isDark(L,U),z=-1;z<=1;z+=1)if(!(L+z<0||_<=L+z))for(var H=-1;H<=1;H+=1)U+H<0||_<=U+H||z==0&&H==0||D==C.isDark(L+z,U+H)&&(X+=1);X>5&&(S+=3+X-5)}for(var L=0;L<_-1;L+=1)for(var U=0;U<_-1;U+=1){var J=0;C.isDark(L,U)&&(J+=1),C.isDark(L+1,U)&&(J+=1),C.isDark(L,U+1)&&(J+=1),C.isDark(L+1,U+1)&&(J+=1),(J==0||J==4)&&(S+=3)}for(var L=0;L<_;L+=1)for(var U=0;U<_-6;U+=1)C.isDark(L,U)&&!C.isDark(L,U+1)&&C.isDark(L,U+2)&&C.isDark(L,U+3)&&C.isDark(L,U+4)&&!C.isDark(L,U+5)&&C.isDark(L,U+6)&&(S+=40);for(var U=0;U<_;U+=1)for(var L=0;L<_-6;L+=1)C.isDark(L,U)&&!C.isDark(L+1,U)&&C.isDark(L+2,U)&&C.isDark(L+3,U)&&C.isDark(L+4,U)&&!C.isDark(L+5,U)&&C.isDark(L+6,U)&&(S+=40);for(var Q=0,U=0;U<_;U+=1)for(var L=0;L<_;L+=1)C.isDark(L,U)&&(Q+=1);var tt=Math.abs(100*Q/_/_-50)/5;return S+=tt*10,S},M}(),s=function(){for(var y=new Array(256),v=new Array(256),b=0;b<8;b+=1)y[b]=1<<b;for(var b=8;b<256;b+=1)y[b]=y[b-4]^y[b-5]^y[b-6]^y[b-8];for(var b=0;b<255;b+=1)v[y[b]]=b;var T={};return T.glog=function(M){if(M<1)throw"glog("+M+")";return v[M]},T.gexp=function(M){for(;M<0;)M+=255;for(;M>=256;)M-=255;return y[M]},T}();function a(y,v){if(typeof y.length>"u")throw y.length+"/"+v;var b=function(){for(var M=0;M<y.length&&y[M]==0;)M+=1;for(var E=new Array(y.length-M+v),C=0;C<y.length-M;C+=1)E[C]=y[C+M];return E}(),T={};return T.getAt=function(M){return b[M]},T.getLength=function(){return b.length},T.multiply=function(M){for(var E=new Array(T.getLength()+M.getLength()-1),C=0;C<T.getLength();C+=1)for(var _=0;_<M.getLength();_+=1)E[C+_]^=s.gexp(s.glog(T.getAt(C))+s.glog(M.getAt(_)));return a(E,0)},T.mod=function(M){if(T.getLength()-M.getLength()<0)return T;for(var E=s.glog(T.getAt(0))-s.glog(M.getAt(0)),C=new Array(T.getLength()),_=0;_<T.getLength();_+=1)C[_]=T.getAt(_);for(var _=0;_<M.getLength();_+=1)C[_]^=s.gexp(s.glog(M.getAt(_))+E);return a(C,0).mod(M)},T}var o=function(){var y=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],v=function(M,E){var C={};return C.totalCount=M,C.dataCount=E,C},b={},T=function(M,E){switch(E){case e.L:return y[(M-1)*4+0];case e.M:return y[(M-1)*4+1];case e.Q:return y[(M-1)*4+2];case e.H:return y[(M-1)*4+3];default:return}};return b.getRSBlocks=function(M,E){var C=T(M,E);if(typeof C>"u")throw"bad rs block @ typeNumber:"+M+"/errorCorrectionLevel:"+E;for(var _=C.length/3,S=[],L=0;L<_;L+=1)for(var U=C[L*3+0],X=C[L*3+1],D=C[L*3+2],z=0;z<U;z+=1)S.push(v(X,D));return S},b}(),l=function(){var y=[],v=0,b={};return b.getBuffer=function(){return y},b.getAt=function(T){var M=Math.floor(T/8);return(y[M]>>>7-T%8&1)==1},b.put=function(T,M){for(var E=0;E<M;E+=1)b.putBit((T>>>M-E-1&1)==1)},b.getLengthInBits=function(){return v},b.putBit=function(T){var M=Math.floor(v/8);y.length<=M&&y.push(0),T&&(y[M]|=128>>>v%8),v+=1},b},c=function(y){var v=t.MODE_NUMBER,b=y,T={};T.getMode=function(){return v},T.getLength=function(C){return b.length},T.write=function(C){for(var _=b,S=0;S+2<_.length;)C.put(M(_.substring(S,S+3)),10),S+=3;S<_.length&&(_.length-S==1?C.put(M(_.substring(S,S+1)),4):_.length-S==2&&C.put(M(_.substring(S,S+2)),7))};var M=function(C){for(var _=0,S=0;S<C.length;S+=1)_=_*10+E(C.charAt(S));return _},E=function(C){if("0"<=C&&C<="9")return C.charCodeAt(0)-48;throw"illegal char :"+C};return T},u=function(y){var v=t.MODE_ALPHA_NUM,b=y,T={};T.getMode=function(){return v},T.getLength=function(E){return b.length},T.write=function(E){for(var C=b,_=0;_+1<C.length;)E.put(M(C.charAt(_))*45+M(C.charAt(_+1)),11),_+=2;_<C.length&&E.put(M(C.charAt(_)),6)};var M=function(E){if("0"<=E&&E<="9")return E.charCodeAt(0)-48;if("A"<=E&&E<="Z")return E.charCodeAt(0)-65+10;switch(E){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+E}};return T},h=function(y){var v=t.MODE_8BIT_BYTE,b=y,T=i.stringToBytes(y),M={};return M.getMode=function(){return v},M.getLength=function(E){return T.length},M.write=function(E){for(var C=0;C<T.length;C+=1)E.put(T[C],8)},M},f=function(y){var v=t.MODE_KANJI,b=y,T=i.stringToBytesFuncs.SJIS;if(!T)throw"sjis not supported.";(function(C,_){var S=T(C);if(S.length!=2||(S[0]<<8|S[1])!=_)throw"sjis not supported."})("\u53CB",38726);var M=T(y),E={};return E.getMode=function(){return v},E.getLength=function(C){return~~(M.length/2)},E.write=function(C){for(var _=M,S=0;S+1<_.length;){var L=(255&_[S])<<8|255&_[S+1];if(33088<=L&&L<=40956)L-=33088;else if(57408<=L&&L<=60351)L-=49472;else throw"illegal char at "+(S+1)+"/"+L;L=(L>>>8&255)*192+(L&255),C.put(L,13),S+=2}if(S<_.length)throw"illegal char at "+(S+1)},E},p=function(){var y=[],v={};return v.writeByte=function(b){y.push(b&255)},v.writeShort=function(b){v.writeByte(b),v.writeByte(b>>>8)},v.writeBytes=function(b,T,M){T=T||0,M=M||b.length;for(var E=0;E<M;E+=1)v.writeByte(b[E+T])},v.writeString=function(b){for(var T=0;T<b.length;T+=1)v.writeByte(b.charCodeAt(T))},v.toByteArray=function(){return y},v.toString=function(){var b="";b+="[";for(var T=0;T<y.length;T+=1)T>0&&(b+=","),b+=y[T];return b+="]",b},v},x=function(){var y=0,v=0,b=0,T="",M={},E=function(_){T+=String.fromCharCode(C(_&63))},C=function(_){if(!(_<0)){if(_<26)return 65+_;if(_<52)return 97+(_-26);if(_<62)return 48+(_-52);if(_==62)return 43;if(_==63)return 47}throw"n:"+_};return M.writeByte=function(_){for(y=y<<8|_&255,v+=8,b+=1;v>=6;)E(y>>>v-6),v-=6},M.flush=function(){if(v>0&&(E(y<<6-v),y=0,v=0),b%3!=0)for(var _=3-b%3,S=0;S<_;S+=1)T+="="},M.toString=function(){return T},M},g=function(y){var v=y,b=0,T=0,M=0,E={};E.read=function(){for(;M<8;){if(b>=v.length){if(M==0)return-1;throw"unexpected end of file./"+M}var _=v.charAt(b);if(b+=1,_=="=")return M=0,-1;if(_.match(/^\s$/))continue;T=T<<6|C(_.charCodeAt(0)),M+=6}var S=T>>>M-8&255;return M-=8,S};var C=function(_){if(65<=_&&_<=90)return _-65;if(97<=_&&_<=122)return _-97+26;if(48<=_&&_<=57)return _-48+52;if(_==43)return 62;if(_==47)return 63;throw"c:"+_};return E},m=function(y,v){var b=y,T=v,M=new Array(y*v),E={};E.setPixel=function(L,U,X){M[U*b+L]=X},E.write=function(L){L.writeString("GIF87a"),L.writeShort(b),L.writeShort(T),L.writeByte(128),L.writeByte(0),L.writeByte(0),L.writeByte(0),L.writeByte(0),L.writeByte(0),L.writeByte(255),L.writeByte(255),L.writeByte(255),L.writeString(","),L.writeShort(0),L.writeShort(0),L.writeShort(b),L.writeShort(T),L.writeByte(0);var U=2,X=_(U);L.writeByte(U);for(var D=0;X.length-D>255;)L.writeByte(255),L.writeBytes(X,D,255),D+=255;L.writeByte(X.length-D),L.writeBytes(X,D,X.length-D),L.writeByte(0),L.writeString(";")};var C=function(L){var U=L,X=0,D=0,z={};return z.write=function(H,J){if(H>>>J)throw"length over";for(;X+J>=8;)U.writeByte(255&(H<<X|D)),J-=8-X,H>>>=8-X,D=0,X=0;D=H<<X|D,X=X+J},z.flush=function(){X>0&&U.writeByte(D)},z},_=function(L){for(var U=1<<L,X=(1<<L)+1,D=L+1,z=S(),H=0;H<U;H+=1)z.add(String.fromCharCode(H));z.add(String.fromCharCode(U)),z.add(String.fromCharCode(X));var J=p(),Q=C(J);Q.write(U,D);var tt=0,it=String.fromCharCode(M[tt]);for(tt+=1;tt<M.length;){var at=String.fromCharCode(M[tt]);tt+=1,z.contains(it+at)?it=it+at:(Q.write(z.indexOf(it),D),z.size()<4095&&(z.size()==1<<D&&(D+=1),z.add(it+at)),it=at)}return Q.write(z.indexOf(it),D),Q.write(X,D),Q.flush(),J.toByteArray()},S=function(){var L={},U=0,X={};return X.add=function(D){if(X.contains(D))throw"dup key:"+D;L[D]=U,U+=1},X.size=function(){return U},X.indexOf=function(D){return L[D]},X.contains=function(D){return typeof L[D]<"u"},X};return E},d=function(y,v,b){for(var T=m(y,v),M=0;M<v;M+=1)for(var E=0;E<y;E+=1)T.setPixel(E,M,b(E,M));var C=p();T.write(C);for(var _=x(),S=C.toByteArray(),L=0;L<S.length;L+=1)_.writeByte(S[L]);return _.flush(),"data:image/gif;base64,"+_};return i}();(function(){Im.stringToBytesFuncs["UTF-8"]=function(i){function t(e){for(var n=[],r=0;r<e.length;r++){var s=e.charCodeAt(r);s<128?n.push(s):s<2048?n.push(192|s>>6,128|s&63):s<55296||s>=57344?n.push(224|s>>12,128|s>>6&63,128|s&63):(r++,s=65536+((s&1023)<<10|e.charCodeAt(r)&1023),n.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63))}return n}return t(i)}})();(function(i){typeof define=="function"&&define.amd?define([],i):typeof Dm=="object"&&(Um.exports=i())})(function(){return Im})});function _i(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function ef(i,t){i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.__proto__=t}var vn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Zr={duration:.5,overwrite:!1,delay:0},yc,Ke,ye,In=1e8,ge=1/In,cc=Math.PI*2,Mg=cc/4,bg=0,nf=Math.sqrt,Sg=Math.cos,Eg=Math.sin,Oe=function(t){return typeof t=="string"},we=function(t){return typeof t=="function"},vi=function(t){return typeof t=="number"},co=function(t){return typeof t>"u"},oi=function(t){return typeof t=="object"},xn=function(t){return t!==!1},Mc=function(){return typeof window<"u"},to=function(t){return we(t)||Oe(t)},rf=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},je=Array.isArray,uc=/(?:-?\.?\d|\.)+/gi,bc=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,yr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,nc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Sc=/[+-]=-?[.\d]+/,sf=/[^,'"\[\]\s]+/gi,Tg=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Se,si,hc,Ec,Tn={},ro={},af,of=function(t){return(ro=vr(t,Tn))&&Qe},uo=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},ha=function(t,e){return!e&&console.warn(t)},lf=function(t,e){return t&&(Tn[t]=e)&&ro&&(ro[t]=e)||Tn},fa=function(){return 0},wg={suppressEvents:!0,isStart:!0,kill:!1},eo={suppressEvents:!0,kill:!1},Ag={suppressEvents:!0},Tc={},Bi=[],fc={},cf,gn={},ic={},Yh=30,no=[],wc="",Ac=function(t){var e=t[0],n,r;if(oi(e)||we(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(r=no.length;r--&&!no[r].targetTest(e););n=no[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new Pc(t[r],n)))||t.splice(r,1);return t},zi=function(t){return t._gsap||Ac(Dn(t))[0]._gsap},Cc=function(t,e,n){return(n=t[e])&&we(n)?t[e]():co(n)&&t.getAttribute&&t.getAttribute(e)||n},cn=function(t,e){return(t=t.split(",")).forEach(e)||t},Ae=function(t){return Math.round(t*1e5)/1e5||0},Ve=function(t){return Math.round(t*1e7)/1e7||0},Mr=function(t,e){var n=e.charAt(0),r=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+r:n==="-"?t-r:n==="*"?t*r:t/r},Cg=function(t,e){for(var n=e.length,r=0;t.indexOf(e[r])<0&&++r<n;);return r<n},so=function(){var t=Bi.length,e=Bi.slice(0),n,r;for(fc={},Bi.length=0,n=0;n<t;n++)r=e[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},uf=function(t,e,n,r){Bi.length&&!Ke&&so(),t.render(e,n,r||Ke&&e<0&&(t._initted||t._startAt)),Bi.length&&!Ke&&so()},hf=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(sf).length<2?e:Oe(t)?t.trim():t},ff=function(t){return t},Un=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Rg=function(t){return function(e,n){for(var r in n)r in e||r==="duration"&&t||r==="ease"||(e[r]=n[r])}},vr=function(t,e){for(var n in e)t[n]=e[n];return t},Zh=function i(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=oi(e[n])?i(t[n]||(t[n]={}),e[n]):e[n]);return t},ao=function(t,e){var n={},r;for(r in t)r in e||(n[r]=t[r]);return n},la=function(t){var e=t.parent||Se,n=t.keyframes?Rg(je(t.keyframes)):Un;if(xn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},Pg=function(t,e){for(var n=t.length,r=n===e.length;r&&n--&&t[n]===e[n];);return n<0},df=function(t,e,n,r,s){n===void 0&&(n="_first"),r===void 0&&(r="_last");var a=t[r],o;if(s)for(o=e[s];a&&a[s]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[r]=e,e._prev=a,e.parent=e._dp=t,e},ho=function(t,e,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=e._prev,a=e._next;s?s._next=a:t[n]===e&&(t[n]=a),a?a._prev=s:t[r]===e&&(t[r]=s),e._next=e._prev=e.parent=null},ki=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},gr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},Lg=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},dc=function(t,e,n,r){return t._startAt&&(Ke?t._startAt.revert(eo):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,r))},Ig=function i(t){return!t||t._ts&&i(t.parent)},Jh=function(t){return t._repeat?Jr(t._tTime,t=t.duration()+t._rDelay)*t:0},Jr=function(t,e){var n=Math.floor(t/=e);return t&&n===t?n-1:n},oo=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},fo=function(t){return t._end=Ve(t._start+(t._tDur/Math.abs(t._ts||t._rts||ge)||0))},po=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Ve(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),fo(t),n._dirty||gr(n,t)),t},pf=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=oo(t.rawTime(),e),(!e._dur||ma(0,e.totalDuration(),n)-e._tTime>ge)&&e.render(n,!0)),gr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-ge}},ai=function(t,e,n,r){return e.parent&&ki(e),e._start=Ve((vi(n)?n:n||t!==Se?Ln(t,n,e):t._time)+e._delay),e._end=Ve(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),df(t,e,"_first","_last",t._sort?"_start":0),pc(e)||(t._recent=e),r||pf(t,e),t._ts<0&&po(t,t._tTime),t},mf=function(t,e){return(Tn.ScrollTrigger||uo("scrollTrigger",e))&&Tn.ScrollTrigger.create(e,t)},gf=function(t,e,n,r,s){if(Dc(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!Ke&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&cf!==_n.frame)return Bi.push(t),t._lazy=[s,r],1},Dg=function i(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||i(e))},pc=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Ug=function(t,e,n,r){var s=t.ratio,a=e<0||!e&&(!t._start&&Dg(t)&&!(!t._initted&&pc(t))||(t._ts<0||t._dp._ts<0)&&!pc(t))?0:1,o=t._rDelay,l=0,c,u,h;if(o&&t._repeat&&(l=ma(0,t._tDur,e),u=Jr(l,o),t._yoyo&&u&1&&(a=1-a),u!==Jr(t._tTime,o)&&(s=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==s||Ke||r||t._zTime===ge||!e&&t._zTime){if(!t._initted&&gf(t,e,r,n,l))return;for(h=t._zTime,t._zTime=e||(n?ge:0),n||(n=e&&!h),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&dc(t,e,n,!0),t._onUpdate&&!n&&En(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&En(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&ki(t,1),!n&&!Ke&&(En(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},Ng=function(t,e,n){var r;if(n>e)for(r=t._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>e)return r;r=r._next}else for(r=t._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<e)return r;r=r._prev}},Kr=function(t,e,n,r){var s=t._repeat,a=Ve(e)||0,o=t._tTime/t._tDur;return o&&!r&&(t._time*=a/t._dur),t._dur=a,t._tDur=s?s<0?1e10:Ve(a*(s+1)+t._rDelay*s):a,o>0&&!r&&po(t,t._tTime=t._tDur*o),t.parent&&fo(t),n||gr(t.parent,t),t},Kh=function(t){return t instanceof $e?gr(t):Kr(t,t._dur)},Og={_start:0,endTime:fa,totalDuration:fa},Ln=function i(t,e,n){var r=t.labels,s=t._recent||Og,a=t.duration()>=In?s.endTime(!1):t._dur,o,l,c;return Oe(e)&&(isNaN(e)||e in r)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(e in r||(r[e]=a),r[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&n&&(l=l/100*(je(n)?n[0]:n).totalDuration()),o>1?i(t,e.substr(0,o-1),n)+l:a+l)):e==null?a:+e},ca=function(t,e,n){var r=vi(e[1]),s=(r?2:1)+(t<2?0:1),a=e[s],o,l;if(r&&(a.duration=e[1]),a.parent=n,t){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=xn(l.vars.inherit)&&l.parent;a.immediateRender=xn(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[s-1]}return new Re(e[0],a,e[s+1])},Vi=function(t,e){return t||t===0?e(t):e},ma=function(t,e,n){return n<t?t:n>e?e:n},Ye=function(t,e){return!Oe(t)||!(e=Tg.exec(t))?"":e[1]},Fg=function(t,e,n){return Vi(n,function(r){return ma(t,e,r)})},mc=[].slice,_f=function(t,e){return t&&oi(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&oi(t[0]))&&!t.nodeType&&t!==si},Bg=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(r){var s;return Oe(r)&&!e||_f(r,1)?(s=n).push.apply(s,Dn(r)):n.push(r)})||n},Dn=function(t,e,n){return ye&&!e&&ye.selector?ye.selector(t):Oe(t)&&!n&&(hc||!jr())?mc.call((e||Ec).querySelectorAll(t),0):je(t)?Bg(t,n):_f(t)?mc.call(t,0):t?[t]:[]},gc=function(t){return t=Dn(t)[0]||ha("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Dn(e,n.querySelectorAll?n:n===t?ha("Invalid scope")||Ec.createElement("div"):t)}},xf=function(t){return t.sort(function(){return .5-Math.random()})},vf=function(t){if(we(t))return t;var e=oi(t)?t:{each:t},n=_r(e.ease),r=e.from||0,s=parseFloat(e.base)||0,a={},o=r>0&&r<1,l=isNaN(r)||o,c=e.axis,u=r,h=r;return Oe(r)?u=h={center:.5,edges:.5,end:1}[r]||0:!o&&l&&(u=r[0],h=r[1]),function(f,p,x){var g=(x||e).length,m=a[g],d,y,v,b,T,M,E,C,_;if(!m){if(_=e.grid==="auto"?0:(e.grid||[1,In])[1],!_){for(E=-In;E<(E=x[_++].getBoundingClientRect().left)&&_<g;);_<g&&_--}for(m=a[g]=[],d=l?Math.min(_,g)*u-.5:r%_,y=_===In?0:l?g*h/_-.5:r/_|0,E=0,C=In,M=0;M<g;M++)v=M%_-d,b=y-(M/_|0),m[M]=T=c?Math.abs(c==="y"?b:v):nf(v*v+b*b),T>E&&(E=T),T<C&&(C=T);r==="random"&&xf(m),m.max=E-C,m.min=C,m.v=g=(parseFloat(e.amount)||parseFloat(e.each)*(_>g?g-1:c?c==="y"?g/_:_:Math.max(_,g/_))||0)*(r==="edges"?-1:1),m.b=g<0?s-g:s,m.u=Ye(e.amount||e.each)||0,n=n&&g<0?Cf(n):n}return g=(m[f]-m.min)/m.max||0,Ve(m.b+(n?n(g):g)*m.v)+m.u}},_c=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var r=Ve(Math.round(parseFloat(n)/t)*t*e);return(r-r%1)/e+(vi(n)?0:Ye(n))}},yf=function(t,e){var n=je(t),r,s;return!n&&oi(t)&&(r=n=t.radius||In,t.values?(t=Dn(t.values),(s=!vi(t[0]))&&(r*=r)):t=_c(t.increment)),Vi(e,n?we(t)?function(a){return s=t(a),Math.abs(s-a)<=r?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=In,u=0,h=t.length,f,p;h--;)s?(f=t[h].x-o,p=t[h].y-l,f=f*f+p*p):f=Math.abs(t[h]-o),f<c&&(c=f,u=h);return u=!r||c<=r?t[u]:a,s||u===a||vi(a)?u:u+Ye(a)}:_c(t))},Mf=function(t,e,n,r){return Vi(je(t)?!e:n===!0?!!(n=0):!r,function(){return je(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*r)/r})},zg=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(r){return e.reduce(function(s,a){return a(s)},r)}},kg=function(t,e){return function(n){return t(parseFloat(n))+(e||Ye(n))}},Vg=function(t,e,n){return Sf(t,e,0,1,n)},bf=function(t,e,n){return Vi(n,function(r){return t[~~e(r)]})},Hg=function i(t,e,n){var r=e-t;return je(t)?bf(t,i(0,t.length),e):Vi(n,function(s){return(r+(s-t)%r)%r+t})},Gg=function i(t,e,n){var r=e-t,s=r*2;return je(t)?bf(t,i(0,t.length-1),e):Vi(n,function(a){return a=(s+(a-t)%s)%s||0,t+(a>r?s-a:a)})},Qr=function(t){for(var e=0,n="",r,s,a,o;~(r=t.indexOf("random(",e));)a=t.indexOf(")",r),o=t.charAt(r+7)==="[",s=t.substr(r+7,a-r-7).match(o?sf:uc),n+=t.substr(e,r-e)+Mf(o?s:+s[0],o?0:+s[1],+s[2]||1e-5),e=a+1;return n+t.substr(e,t.length-e)},Sf=function(t,e,n,r,s){var a=e-t,o=r-n;return Vi(s,function(l){return n+((l-t)/a*o||0)})},Wg=function i(t,e,n,r){var s=isNaN(t+e)?0:function(p){return(1-p)*t+p*e};if(!s){var a=Oe(t),o={},l,c,u,h,f;if(n===!0&&(r=1)&&(n=null),a)t={p:t},e={p:e};else if(je(t)&&!je(e)){for(u=[],h=t.length,f=h-2,c=1;c<h;c++)u.push(i(t[c-1],t[c]));h--,s=function(x){x*=h;var g=Math.min(f,~~x);return u[g](x-g)},n=e}else r||(t=vr(je(t)?[]:{},t));if(!u){for(l in e)Lc.call(o,t,l,"get",e[l]);s=function(x){return Oc(x,o)||(a?t.p:t)}}}return Vi(n,s)},jh=function(t,e,n){var r=t.labels,s=In,a,o,l;for(a in r)o=r[a]-e,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},En=function(t,e,n){var r=t.vars,s=r[e],a=ye,o=t._ctx,l,c,u;if(s)return l=r[e+"Params"],c=r.callbackScope||t,n&&Bi.length&&so(),o&&(ye=o),u=l?s.apply(c,l):s.call(c),ye=a,u},aa=function(t){return ki(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Ke),t.progress()<1&&En(t,"onInterrupt"),t},Yr,Ef=[],Tf=function(t){if(t)if(t=!t.name&&t.default||t,Mc()||t.headless){var e=t.name,n=we(t),r=e&&!n&&t.init?function(){this._props=[]}:t,s={init:fa,render:Oc,add:Lc,kill:a0,modifier:s0,rawVars:0},a={targetTest:0,get:0,getSetter:mo,aliases:{},register:0};if(jr(),t!==r){if(gn[e])return;Un(r,Un(ao(t,s),a)),vr(r.prototype,vr(s,ao(t,a))),gn[r.prop=e]=r,t.targetTest&&(no.push(r),Tc[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}lf(e,r),t.register&&t.register(Qe,r,un)}else Ef.push(t)},he=255,oa={aqua:[0,he,he],lime:[0,he,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,he],navy:[0,0,128],white:[he,he,he],olive:[128,128,0],yellow:[he,he,0],orange:[he,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[he,0,0],pink:[he,192,203],cyan:[0,he,he],transparent:[he,he,he,0]},rc=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*he+.5|0},wf=function(t,e,n){var r=t?vi(t)?[t>>16,t>>8&he,t&he]:0:oa.black,s,a,o,l,c,u,h,f,p,x;if(!r){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),oa[t])r=oa[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+s+s+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return r=parseInt(t.substr(1,6),16),[r>>16,r>>8&he,r&he,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),r=[t>>16,t>>8&he,t&he]}else if(t.substr(0,3)==="hsl"){if(r=x=t.match(uc),!e)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,a=u<=.5?u*(c+1):u+c-u*c,s=u*2-a,r.length>3&&(r[3]*=1),r[0]=rc(l+1/3,s,a),r[1]=rc(l,s,a),r[2]=rc(l-1/3,s,a);else if(~t.indexOf("="))return r=t.match(bc),n&&r.length<4&&(r[3]=1),r}else r=t.match(uc)||oa.transparent;r=r.map(Number)}return e&&!x&&(s=r[0]/he,a=r[1]/he,o=r[2]/he,h=Math.max(s,a,o),f=Math.min(s,a,o),u=(h+f)/2,h===f?l=c=0:(p=h-f,c=u>.5?p/(2-h-f):p/(h+f),l=h===s?(a-o)/p+(a<o?6:0):h===a?(o-s)/p+2:(s-a)/p+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},Af=function(t){var e=[],n=[],r=-1;return t.split(xi).forEach(function(s){var a=s.match(yr)||[];e.push.apply(e,a),n.push(r+=a.length+1)}),e.c=n,e},Qh=function(t,e,n){var r="",s=(t+r).match(xi),a=e?"hsla(":"rgba(",o=0,l,c,u,h;if(!s)return t;if(s=s.map(function(f){return(f=wf(f,e,1))&&a+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Af(t),l=n.c,l.join(r)!==u.c.join(r)))for(c=t.replace(xi,"1").split(yr),h=c.length-1;o<h;o++)r+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=t.split(xi),h=c.length-1;o<h;o++)r+=c[o]+s[o];return r+c[h]},xi=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in oa)i+="|"+t+"\\b";return new RegExp(i+")","gi")}(),Xg=/hsl[a]?\(/,Rc=function(t){var e=t.join(" "),n;if(xi.lastIndex=0,xi.test(e))return n=Xg.test(e),t[1]=Qh(t[1],n),t[0]=Qh(t[0],n,Af(t[1])),!0},da,_n=function(){var i=Date.now,t=500,e=33,n=i(),r=n,s=1e3/240,a=s,o=[],l,c,u,h,f,p,x=function g(m){var d=i()-r,y=m===!0,v,b,T,M;if((d>t||d<0)&&(n+=d-e),r+=d,T=r-n,v=T-a,(v>0||y)&&(M=++h.frame,f=T-h.time*1e3,h.time=T=T/1e3,a+=v+(v>=s?4:s-v),b=1),y||(l=c(g)),b)for(p=0;p<o.length;p++)o[p](T,f,M,m)};return h={time:0,frame:0,tick:function(){x(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){af&&(!hc&&Mc()&&(si=hc=window,Ec=si.document||{},Tn.gsap=Qe,(si.gsapVersions||(si.gsapVersions=[])).push(Qe.version),of(ro||si.GreenSockGlobals||!si.gsap&&si||{}),Ef.forEach(Tf)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(m){return setTimeout(m,a-h.time*1e3+1|0)},da=1,x(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),da=0,c=fa},lagSmoothing:function(m,d){t=m||1/0,e=Math.min(d||33,t)},fps:function(m){s=1e3/(m||240),a=h.time*1e3+s},add:function(m,d,y){var v=d?function(b,T,M,E){m(b,T,M,E),h.remove(v)}:m;return h.remove(m),o[y?"unshift":"push"](v),jr(),v},remove:function(m,d){~(d=o.indexOf(m))&&o.splice(d,1)&&p>=d&&p--},_listeners:o},h}(),jr=function(){return!da&&_n.wake()},re={},qg=/^[\d.\-M][\d.\-,\s]/,$g=/["']/g,Yg=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),r=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[r]=isNaN(c)?c.replace($g,"").trim():+c,r=l.substr(o+1).trim();return e},Zg=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),r=t.indexOf("(",e);return t.substring(e,~r&&r<n?t.indexOf(")",n+1):n)},Jg=function(t){var e=(t+"").split("("),n=re[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[Yg(e[1])]:Zg(t).split(",").map(hf)):re._CE&&qg.test(t)?re._CE("",t):n},Cf=function(t){return function(e){return 1-t(1-e)}},Rf=function i(t,e){for(var n=t._first,r;n;)n instanceof $e?i(n,e):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==e&&(n.timeline?i(n.timeline,e):(r=n._ease,n._ease=n._yEase,n._yEase=r,n._yoyo=e)),n=n._next},_r=function(t,e){return t&&(we(t)?t:re[t]||Jg(t))||e},br=function(t,e,n,r){n===void 0&&(n=function(l){return 1-e(1-l)}),r===void 0&&(r=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:r},a;return cn(t,function(o){re[o]=Tn[o]=s,re[a=o.toLowerCase()]=n;for(var l in s)re[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=re[o+"."+l]=s[l]}),s},Pf=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},sc=function i(t,e,n){var r=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),a=s/cc*(Math.asin(1/r)||0),o=function(u){return u===1?1:r*Math.pow(2,-10*u)*Eg((u-a)*s)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:Pf(o);return s=cc/s,l.config=function(c,u){return i(t,c,u)},l},ac=function i(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},r=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:Pf(n);return r.config=function(s){return i(t,s)},r};cn("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,t){var e=t<5?t+1:t;br(i+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});re.Linear.easeNone=re.none=re.Linear.easeIn;br("Elastic",sc("in"),sc("out"),sc());(function(i,t){var e=1/t,n=2*e,r=2.5*e,s=function(o){return o<e?i*o*o:o<n?i*Math.pow(o-1.5/t,2)+.75:o<r?i*(o-=2.25/t)*o+.9375:i*Math.pow(o-2.625/t,2)+.984375};br("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);br("Expo",function(i){return i?Math.pow(2,10*(i-1)):0});br("Circ",function(i){return-(nf(1-i*i)-1)});br("Sine",function(i){return i===1?1:-Sg(i*Mg)+1});br("Back",ac("in"),ac("out"),ac());re.SteppedEase=re.steps=Tn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,r=t+(e?0:1),s=e?1:0,a=1-ge;return function(o){return((r*ma(0,a,o)|0)+s)*n}}};Zr.ease=re["quad.out"];cn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return wc+=i+","+i+"Params,"});var Pc=function(t,e){this.id=bg++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Cc,this.set=e?e.getSetter:mo},pa=function(){function i(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Kr(this,+e.duration,1,1),this.data=e.data,ye&&(this._ctx=ye,ye.data.push(this)),da||_n.wake()}var t=i.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Kr(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,r){if(jr(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(po(this,n),!s._dp||s.parent||pf(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&ai(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===ge||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),uf(this,n,r)),this},t.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Jh(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},t.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},t.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Jh(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?Jr(this._tTime,s)+1:1},t.timeScale=function(n,r){if(!arguments.length)return this._rts===-ge?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?oo(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-ge?0:this._rts,this.totalTime(ma(-Math.abs(this._delay),this._tDur,s),r!==!1),fo(this),Lg(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(jr(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==ge&&(this._tTime-=ge)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&ai(r,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(xn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?oo(r.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=Ag);var r=Ke;return Ke=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Ke=r,this},t.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Kh(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,Kh(this),r?this.time(r):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,r){return this.totalTime(Ln(this,n),xn(r))},t.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,xn(r))},t.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},t.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},t.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-ge:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-ge,this},t.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-ge)},t.eventCallback=function(n,r,s){var a=this.vars;return arguments.length>1?(r?(a[n]=r,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete a[n],this):a[n]},t.then=function(n){var r=this;return new Promise(function(s){var a=we(n)?n:ff,o=function(){var c=r.then;r.then=null,we(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=c),s(a),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?o():r._prom=o})},t.kill=function(){aa(this)},i}();Un(pa.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ge,_prom:0,_ps:!1,_rts:1});var $e=function(i){ef(t,i);function t(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=xn(n.sortChildren),Se&&ai(n.parent||Se,_i(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&mf(_i(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(r,s,a){return ca(0,arguments,this),this},e.from=function(r,s,a){return ca(1,arguments,this),this},e.fromTo=function(r,s,a,o){return ca(2,arguments,this),this},e.set=function(r,s,a){return s.duration=0,s.parent=this,la(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Re(r,s,Ln(this,a),1),this},e.call=function(r,s,a){return ai(this,Re.delayedCall(0,r,s),a)},e.staggerTo=function(r,s,a,o,l,c,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new Re(r,a,Ln(this,l)),this},e.staggerFrom=function(r,s,a,o,l,c,u){return a.runBackwards=1,la(a).immediateRender=xn(a.immediateRender),this.staggerTo(r,s,a,o,l,c,u)},e.staggerFromTo=function(r,s,a,o,l,c,u,h){return o.startAt=a,la(o).immediateRender=xn(o.immediateRender),this.staggerTo(r,s,o,l,c,u,h)},e.render=function(r,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:Ve(r),h=this._zTime<0!=r<0&&(this._initted||!c),f,p,x,g,m,d,y,v,b,T,M,E;if(this!==Se&&u>l&&r>=0&&(u=l),u!==this._tTime||a||h){if(o!==this._time&&c&&(u+=this._time-o,r+=this._time-o),f=u,b=this._start,v=this._ts,d=!v,h&&(c||(o=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(M=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,a);if(f=Ve(u%m),u===l?(g=this._repeat,f=c):(g=~~(u/m),g&&g===u/m&&(f=c,g--),f>c&&(f=c)),T=Jr(this._tTime,m),!o&&this._tTime&&T!==g&&this._tTime-T*m-this._dur<=0&&(T=g),M&&g&1&&(f=c-f,E=1),g!==T&&!this._lock){var C=M&&T&1,_=C===(M&&g&1);if(g<T&&(C=!C),o=C?0:u%c?c:u,this._lock=1,this.render(o||(E?0:Ve(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&En(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1),o&&o!==this._time||d!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,_&&(this._lock=2,o=C?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!d)return this;Rf(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=Ng(this,Ve(o),Ve(f)),y&&(u-=f-(f=y._start))),this._tTime=u,this._time=f,this._act=!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,o=0),!o&&f&&!s&&!g&&(En(this,"onStart"),this._tTime!==u))return this;if(f>=o&&r>=0)for(p=this._first;p;){if(x=p._next,(p._act||f>=p._start)&&p._ts&&y!==p){if(p.parent!==this)return this.render(r,s,a);if(p.render(p._ts>0?(f-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(f-p._start)*p._ts,s,a),f!==this._time||!this._ts&&!d){y=0,x&&(u+=this._zTime=-ge);break}}p=x}else{p=this._last;for(var S=r<0?r:f;p;){if(x=p._prev,(p._act||S<=p._end)&&p._ts&&y!==p){if(p.parent!==this)return this.render(r,s,a);if(p.render(p._ts>0?(S-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(S-p._start)*p._ts,s,a||Ke&&(p._initted||p._startAt)),f!==this._time||!this._ts&&!d){y=0,x&&(u+=this._zTime=S?-ge:ge);break}}p=x}}if(y&&!s&&(this.pause(),y.render(f>=o?0:-ge)._zTime=f>=o?1:-1,this._ts))return this._start=b,fo(this),this.render(r,s,a);this._onUpdate&&!s&&En(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(b===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&ki(this,1),!s&&!(r<0&&!o)&&(u||o||!l)&&(En(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(r,s){var a=this;if(vi(s)||(s=Ln(this,s,r)),!(r instanceof pa)){if(je(r))return r.forEach(function(o){return a.add(o,s)}),this;if(Oe(r))return this.addLabel(r,s);if(we(r))r=Re.delayedCall(0,r);else return this}return this!==r?ai(this,r,s):this},e.getChildren=function(r,s,a,o){r===void 0&&(r=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-In);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Re?s&&l.push(c):(a&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},e.getById=function(r){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===r)return s[a]},e.remove=function(r){return Oe(r)?this.removeLabel(r):we(r)?this.killTweensOf(r):(ho(this,r),r===this._recent&&(this._recent=this._last),gr(this))},e.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ve(_n.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},e.addLabel=function(r,s){return this.labels[r]=Ln(this,s),this},e.removeLabel=function(r){return delete this.labels[r],this},e.addPause=function(r,s,a){var o=Re.delayedCall(0,s||fa,a);return o.data="isPause",this._hasPause=1,ai(this,o,Ln(this,r))},e.removePause=function(r){var s=this._first;for(r=Ln(this,r);s;)s._start===r&&s.data==="isPause"&&ki(s),s=s._next},e.killTweensOf=function(r,s,a){for(var o=this.getTweensOf(r,a),l=o.length;l--;)Fi!==o[l]&&o[l].kill(r,s);return this},e.getTweensOf=function(r,s){for(var a=[],o=Dn(r),l=this._first,c=vi(s),u;l;)l instanceof Re?Cg(l._targets,o)&&(c?(!Fi||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(u=l.getTweensOf(o,s)).length&&a.push.apply(a,u),l=l._next;return a},e.tweenTo=function(r,s){s=s||{};var a=this,o=Ln(a,r),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,f=l.immediateRender,p,x=Re.to(a,Un({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||ge,onStart:function(){if(a.pause(),!p){var m=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());x._dur!==m&&Kr(x,m,0,1).render(x._time,!0,!0),p=1}u&&u.apply(x,h||[])}},s));return f?x.render(0):x},e.tweenFromTo=function(r,s,a){return this.tweenTo(s,Un({startAt:{time:Ln(this,r)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(r){return r===void 0&&(r=this._time),jh(this,Ln(this,r))},e.previousLabel=function(r){return r===void 0&&(r=this._time),jh(this,Ln(this,r),1)},e.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+ge)},e.shiftChildren=function(r,s,a){a===void 0&&(a=0);for(var o=this._first,l=this.labels,c;o;)o._start>=a&&(o._start+=r,o._end+=r),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=r);return gr(this)},e.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},e.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),gr(this)},e.totalDuration=function(r){var s=0,a=this,o=a._last,l=In,c,u,h;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-r:r));if(a._dirty){for(h=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,ai(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(s-=u,(!h&&!a._dp||h&&h.smoothChildTiming)&&(a._start+=u/a._ts,a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;Kr(a,a===Se&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(r){if(Se._ts&&(uf(Se,oo(r,Se)),cf=_n.frame),_n.frame>=Yh){Yh+=vn.autoSleep||120;var s=Se._first;if((!s||!s._ts)&&vn.autoSleep&&_n._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||_n.sleep()}}},t}(pa);Un($e.prototype,{_lock:0,_hasPause:0,_forcing:0});var Kg=function(t,e,n,r,s,a,o){var l=new un(this._pt,t,e,0,1,Nc,null,s),c=0,u=0,h,f,p,x,g,m,d,y;for(l.b=n,l.e=r,n+="",r+="",(d=~r.indexOf("random("))&&(r=Qr(r)),a&&(y=[n,r],a(y,t,e),n=y[0],r=y[1]),f=n.match(nc)||[];h=nc.exec(r);)x=h[0],g=r.substring(c,h.index),p?p=(p+1)%5:g.substr(-5)==="rgba("&&(p=1),x!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:x.charAt(1)==="="?Mr(m,x)-m:parseFloat(x)-m,m:p&&p<4?Math.round:0},c=nc.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=o,(Sc.test(r)||d)&&(l.e=0),this._pt=l,l},Lc=function(t,e,n,r,s,a,o,l,c,u){we(r)&&(r=r(s||0,t,a));var h=t[e],f=n!=="get"?n:we(h)?c?t[e.indexOf("set")||!we(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():h,p=we(h)?c?n0:Df:Uc,x;if(Oe(r)&&(~r.indexOf("random(")&&(r=Qr(r)),r.charAt(1)==="="&&(x=Mr(f,r)+(Ye(f)||0),(x||x===0)&&(r=x))),!u||f!==r||xc)return!isNaN(f*r)&&r!==""?(x=new un(this._pt,t,e,+f||0,r-(f||0),typeof h=="boolean"?r0:Uf,0,p),c&&(x.fp=c),o&&x.modifier(o,this,t),this._pt=x):(!h&&!(e in t)&&uo(e,r),Kg.call(this,t,e,f,r,p,l||vn.stringFilter,c))},jg=function(t,e,n,r,s){if(we(t)&&(t=ua(t,s,e,n,r)),!oi(t)||t.style&&t.nodeType||je(t)||rf(t))return Oe(t)?ua(t,s,e,n,r):t;var a={},o;for(o in t)a[o]=ua(t[o],s,e,n,r);return a},Ic=function(t,e,n,r,s,a){var o,l,c,u;if(gn[t]&&(o=new gn[t]).init(s,o.rawVars?e[t]:jg(e[t],r,s,a,n),n,r,a)!==!1&&(n._pt=l=new un(n._pt,s,t,0,1,o.render,o,0,o.priority),n!==Yr))for(c=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)c[o._props[u]]=l;return o},Fi,xc,Dc=function i(t,e,n){var r=t.vars,s=r.ease,a=r.startAt,o=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,h=r.yoyoEase,f=r.keyframes,p=r.autoRevert,x=t._dur,g=t._startAt,m=t._targets,d=t.parent,y=d&&d.data==="nested"?d.vars.targets:m,v=t._overwrite==="auto"&&!yc,b=t.timeline,T,M,E,C,_,S,L,U,X,D,z,H,J;if(b&&(!f||!s)&&(s="none"),t._ease=_r(s,Zr.ease),t._yEase=h?Cf(_r(h===!0?s:h,Zr.ease)):0,h&&t._yoyo&&!t._repeat&&(h=t._yEase,t._yEase=t._ease,t._ease=h),t._from=!b&&!!r.runBackwards,!b||f&&!r.stagger){if(U=m[0]?zi(m[0]).harness:0,H=U&&r[U.prop],T=ao(r,Tc),g&&(g._zTime<0&&g.progress(1),e<0&&u&&o&&!p?g.render(-1,!0):g.revert(u&&x?eo:wg),g._lazy=0),a){if(ki(t._startAt=Re.set(m,Un({data:"isStart",overwrite:!1,parent:d,immediateRender:!0,lazy:!g&&xn(l),startAt:null,delay:0,onUpdate:c&&function(){return En(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ke||!o&&!p)&&t._startAt.revert(eo),o&&x&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(u&&x&&!g){if(e&&(o=!1),E=Un({overwrite:!1,data:"isFromStart",lazy:o&&!g&&xn(l),immediateRender:o,stagger:0,parent:d},T),H&&(E[U.prop]=H),ki(t._startAt=Re.set(m,E)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ke?t._startAt.revert(eo):t._startAt.render(-1,!0)),t._zTime=e,!o)i(t._startAt,ge,ge);else if(!e)return}for(t._pt=t._ptCache=0,l=x&&xn(l)||l&&!x,M=0;M<m.length;M++){if(_=m[M],L=_._gsap||Ac(m)[M]._gsap,t._ptLookup[M]=D={},fc[L.id]&&Bi.length&&so(),z=y===m?M:y.indexOf(_),U&&(X=new U).init(_,H||T,t,z,y)!==!1&&(t._pt=C=new un(t._pt,_,X.name,0,1,X.render,X,0,X.priority),X._props.forEach(function(Q){D[Q]=C}),X.priority&&(S=1)),!U||H)for(E in T)gn[E]&&(X=Ic(E,T,t,z,_,y))?X.priority&&(S=1):D[E]=C=Lc.call(t,_,E,"get",T[E],z,y,0,r.stringFilter);t._op&&t._op[M]&&t.kill(_,t._op[M]),v&&t._pt&&(Fi=t,Se.killTweensOf(_,D,t.globalTime(e)),J=!t.parent,Fi=0),t._pt&&l&&(fc[L.id]=1)}S&&Fc(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!J,f&&e<=0&&b.render(In,!0,!0)},Qg=function(t,e,n,r,s,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,h,f,p;if(!c)for(c=t._ptCache[e]=[],f=t._ptLookup,p=t._targets.length;p--;){if(u=f[p][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return xc=1,t.vars[e]="+=0",Dc(t,o),xc=0,l?ha(e+" not eligible for reset"):1;c.push(u)}for(p=c.length;p--;)h=c[p],u=h._pt||h,u.s=(r||r===0)&&!s?r:u.s+(r||0)+a*u.c,u.c=n-u.s,h.e&&(h.e=Ae(n)+Ye(h.e)),h.b&&(h.b=u.s+Ye(h.b))},t0=function(t,e){var n=t[0]?zi(t[0]).harness:0,r=n&&n.aliases,s,a,o,l;if(!r)return e;s=vr({},e);for(a in r)if(a in s)for(l=r[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},e0=function(t,e,n,r){var s=e.ease||r||"power1.inOut",a,o;if(je(e))o=n[t]||(n[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:s})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:s})},ua=function(t,e,n,r,s){return we(t)?t.call(e,n,r,s):Oe(t)&&~t.indexOf("random(")?Qr(t):t},Lf=wc+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",If={};cn(Lf+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return If[i]=1});var Re=function(i){ef(t,i);function t(n,r,s,a){var o;typeof r=="number"&&(s.duration=r,r=s,s=null),o=i.call(this,a?r:la(r))||this;var l=o.vars,c=l.duration,u=l.delay,h=l.immediateRender,f=l.stagger,p=l.overwrite,x=l.keyframes,g=l.defaults,m=l.scrollTrigger,d=l.yoyoEase,y=r.parent||Se,v=(je(n)||rf(n)?vi(n[0]):"length"in r)?[n]:Dn(n),b,T,M,E,C,_,S,L;if(o._targets=v.length?Ac(v):ha("GSAP target "+n+" not found. https://gsap.com",!vn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=p,x||f||to(c)||to(u)){if(r=o.vars,b=o.timeline=new $e({data:"nested",defaults:g||{},targets:y&&y.data==="nested"?y.vars.targets:v}),b.kill(),b.parent=b._dp=_i(o),b._start=0,f||to(c)||to(u)){if(E=v.length,S=f&&vf(f),oi(f))for(C in f)~Lf.indexOf(C)&&(L||(L={}),L[C]=f[C]);for(T=0;T<E;T++)M=ao(r,If),M.stagger=0,d&&(M.yoyoEase=d),L&&vr(M,L),_=v[T],M.duration=+ua(c,_i(o),T,_,v),M.delay=(+ua(u,_i(o),T,_,v)||0)-o._delay,!f&&E===1&&M.delay&&(o._delay=u=M.delay,o._start+=u,M.delay=0),b.to(_,M,S?S(T,_,v):0),b._ease=re.none;b.duration()?c=u=0:o.timeline=0}else if(x){la(Un(b.vars.defaults,{ease:"none"})),b._ease=_r(x.ease||r.ease||"none");var U=0,X,D,z;if(je(x))x.forEach(function(H){return b.to(v,H,">")}),b.duration();else{M={};for(C in x)C==="ease"||C==="easeEach"||e0(C,x[C],M,x.easeEach);for(C in M)for(X=M[C].sort(function(H,J){return H.t-J.t}),U=0,T=0;T<X.length;T++)D=X[T],z={ease:D.e,duration:(D.t-(T?X[T-1].t:0))/100*c},z[C]=D.v,b.to(v,z,U),U+=z.duration;b.duration()<c&&b.to({},{duration:c-b.duration()})}}c||o.duration(c=b.duration())}else o.timeline=0;return p===!0&&!yc&&(Fi=_i(o),Se.killTweensOf(v),Fi=0),ai(y,_i(o),s),r.reversed&&o.reverse(),r.paused&&o.paused(!0),(h||!c&&!x&&o._start===Ve(y._time)&&xn(h)&&Ig(_i(o))&&y.data!=="nested")&&(o._tTime=-ge,o.render(Math.max(0,-u)||0)),m&&mf(_i(o),m),o}var e=t.prototype;return e.render=function(r,s,a){var o=this._time,l=this._tDur,c=this._dur,u=r<0,h=r>l-ge&&!u?l:r<ge?0:r,f,p,x,g,m,d,y,v,b;if(!c)Ug(this,r,s,a);else if(h!==this._tTime||!r||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u){if(f=h,v=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+r,s,a);if(f=Ve(h%g),h===l?(x=this._repeat,f=c):(x=~~(h/g),x&&x===Ve(h/g)&&(f=c,x--),f>c&&(f=c)),d=this._yoyo&&x&1,d&&(b=this._yEase,f=c-f),m=Jr(this._tTime,g),f===o&&!a&&this._initted&&x===m)return this._tTime=h,this;x!==m&&(v&&this._yEase&&Rf(v,d),this.vars.repeatRefresh&&!d&&!this._lock&&this._time!==g&&this._initted&&(this._lock=a=1,this.render(Ve(g*x),!0).invalidate()._lock=0))}if(!this._initted){if(gf(this,u?r:f,a,s,h))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&x!==m))return this;if(c!==this._dur)return this.render(r,s,a)}if(this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=y=(b||this._ease)(f/c),this._from&&(this.ratio=y=1-y),f&&!o&&!s&&!x&&(En(this,"onStart"),this._tTime!==h))return this;for(p=this._pt;p;)p.r(y,p.d),p=p._next;v&&v.render(r<0?r:v._dur*v._ease(f/this._dur),s,a)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&dc(this,r,s,a),En(this,"onUpdate")),this._repeat&&x!==m&&this.vars.onRepeat&&!s&&this.parent&&En(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&dc(this,r,!0,!0),(r||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&ki(this,1),!s&&!(u&&!o)&&(h||o||d)&&(En(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},e.resetTo=function(r,s,a,o,l){da||_n.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Dc(this,c),u=this._ease(c/this._dur),Qg(this,r,s,a,o,u,c,l)?this.resetTo(r,s,a,o,1):(po(this,0),this.parent||df(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?aa(this):this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,Fi&&Fi.vars.overwrite!==!0)._first||aa(this),this.parent&&a!==this.timeline.totalDuration()&&Kr(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=r?Dn(r):o,c=this._ptLookup,u=this._pt,h,f,p,x,g,m,d;if((!s||s==="all")&&Pg(o,l))return s==="all"&&(this._pt=0),aa(this);for(h=this._op=this._op||[],s!=="all"&&(Oe(s)&&(g={},cn(s,function(y){return g[y]=1}),s=g),s=t0(o,s)),d=o.length;d--;)if(~l.indexOf(o[d])){f=c[d],s==="all"?(h[d]=s,x=f,p={}):(p=h[d]=h[d]||{},x=s);for(g in x)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&ho(this,m,"_pt"),delete f[g]),p!=="all"&&(p[g]=1)}return this._initted&&!this._pt&&u&&aa(this),this},t.to=function(r,s){return new t(r,s,arguments[2])},t.from=function(r,s){return ca(1,arguments)},t.delayedCall=function(r,s,a,o){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(r,s,a){return ca(2,arguments)},t.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(r,s)},t.killTweensOf=function(r,s,a){return Se.killTweensOf(r,s,a)},t}(pa);Un(Re.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});cn("staggerTo,staggerFrom,staggerFromTo",function(i){Re[i]=function(){var t=new $e,e=mc.call(arguments,0);return e.splice(i==="staggerFromTo"?5:4,0,0),t[i].apply(t,e)}});var Uc=function(t,e,n){return t[e]=n},Df=function(t,e,n){return t[e](n)},n0=function(t,e,n,r){return t[e](r.fp,n)},i0=function(t,e,n){return t.setAttribute(e,n)},mo=function(t,e){return we(t[e])?Df:co(t[e])&&t.setAttribute?i0:Uc},Uf=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},r0=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Nc=function(t,e){var n=e._pt,r="";if(!t&&e.b)r=e.b;else if(t===1&&e.e)r=e.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+r,n=n._next;r+=e.c}e.set(e.t,e.p,r,e)},Oc=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},s0=function(t,e,n,r){for(var s=this._pt,a;s;)a=s._next,s.p===r&&s.modifier(t,e,n),s=a},a0=function(t){for(var e=this._pt,n,r;e;)r=e._next,e.p===t&&!e.op||e.op===t?ho(this,e,"_pt"):e.dep||(n=1),e=r;return!n},o0=function(t,e,n,r){r.mSet(t,e,r.m.call(r.tween,n,r.mt),r)},Fc=function(t){for(var e=t._pt,n,r,s,a;e;){for(n=e._next,r=s;r&&r.pr>e.pr;)r=r._next;(e._prev=r?r._prev:a)?e._prev._next=e:s=e,(e._next=r)?r._prev=e:a=e,e=n}t._pt=s},un=function(){function i(e,n,r,s,a,o,l,c,u){this.t=n,this.s=s,this.c=a,this.p=r,this.r=o||Uf,this.d=l||this,this.set=c||Uc,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=i.prototype;return t.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=o0,this.m=n,this.mt=s,this.tween=r},i}();cn(wc+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(i){return Tc[i]=1});Tn.TweenMax=Tn.TweenLite=Re;Tn.TimelineLite=Tn.TimelineMax=$e;Se=new $e({sortChildren:!1,defaults:Zr,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});vn.stringFilter=Rc;var xr=[],io={},l0=[],tf=0,c0=0,oc=function(t){return(io[t]||l0).map(function(e){return e()})},vc=function(){var t=Date.now(),e=[];t-tf>2&&(oc("matchMediaInit"),xr.forEach(function(n){var r=n.queries,s=n.conditions,a,o,l,c;for(o in r)a=si.matchMedia(r[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&e.push(n))}),oc("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),tf=t,oc("matchMedia"))},Nf=function(){function i(e,n){this.selector=n&&gc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=c0++,e&&this.add(e)}var t=i.prototype;return t.add=function(n,r,s){we(n)&&(s=r,r=n,n=we);var a=this,o=function(){var c=ye,u=a.selector,h;return c&&c!==a&&c.data.push(a),s&&(a.selector=gc(s)),ye=a,h=r.apply(a,arguments),we(h)&&a._r.push(h),ye=c,a.selector=u,a.isReverted=!1,h};return a.last=o,n===we?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},t.ignore=function(n){var r=ye;ye=null,n(this),ye=r},t.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof Re&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,r){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof $e?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Re)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),r)for(var a=xr.length;a--;)xr[a].id===this.id&&xr.splice(a,1)},t.revert=function(n){this.kill(n||{})},i}(),u0=function(){function i(e){this.contexts=[],this.scope=e,ye&&ye.data.push(this)}var t=i.prototype;return t.add=function(n,r,s){oi(n)||(n={matches:n});var a=new Nf(0,s||this.scope),o=a.conditions={},l,c,u;ye&&!a.selector&&(a.selector=ye.selector),this.contexts.push(a),r=a.add("onMatch",r),a.queries=n;for(c in n)c==="all"?u=1:(l=si.matchMedia(n[c]),l&&(xr.indexOf(a)<0&&xr.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(vc):l.addEventListener("change",vc)));return u&&r(a,function(h){return a.add(null,h)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i}(),lo={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(r){return Tf(r)})},timeline:function(t){return new $e(t)},getTweensOf:function(t,e){return Se.getTweensOf(t,e)},getProperty:function(t,e,n,r){Oe(t)&&(t=Dn(t)[0]);var s=zi(t||{}).get,a=n?ff:hf;return n==="native"&&(n=""),t&&(e?a((gn[e]&&gn[e].get||s)(t,e,n,r)):function(o,l,c){return a((gn[o]&&gn[o].get||s)(t,o,l,c))})},quickSetter:function(t,e,n){if(t=Dn(t),t.length>1){var r=t.map(function(u){return Qe.quickSetter(u,e,n)}),s=r.length;return function(u){for(var h=s;h--;)r[h](u)}}t=t[0]||{};var a=gn[e],o=zi(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(u){var h=new a;Yr._pt=0,h.init(t,n?u+n:u,Yr,0,[t]),h.render(1,h),Yr._pt&&Oc(1,Yr)}:o.set(t,l);return a?c:function(u){return c(t,l,n?u+n:u,o,1)}},quickTo:function(t,e,n){var r,s=Qe.to(t,vr((r={},r[e]="+=0.1",r.paused=!0,r),n||{})),a=function(l,c,u){return s.resetTo(e,l,c,u)};return a.tween=s,a},isTweening:function(t){return Se.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=_r(t.ease,Zr.ease)),Zh(Zr,t||{})},config:function(t){return Zh(vn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,r=t.plugins,s=t.defaults,a=t.extendTimeline;(r||"").split(",").forEach(function(o){return o&&!gn[o]&&!Tn[o]&&ha(e+" effect requires "+o+" plugin.")}),ic[e]=function(o,l,c){return n(Dn(o),Un(l||{},s),c)},a&&($e.prototype[e]=function(o,l,c){return this.add(ic[e](o,oi(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){re[t]=_r(e)},parseEase:function(t,e){return arguments.length?_r(t,e):re},getById:function(t){return Se.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new $e(t),r,s;for(n.smoothChildTiming=xn(t.smoothChildTiming),Se.remove(n),n._dp=0,n._time=n._tTime=Se._time,r=Se._first;r;)s=r._next,(e||!(!r._dur&&r instanceof Re&&r.vars.onComplete===r._targets[0]))&&ai(n,r,r._start-r._delay),r=s;return ai(Se,n,0),n},context:function(t,e){return t?new Nf(t,e):ye},matchMedia:function(t){return new u0(t)},matchMediaRefresh:function(){return xr.forEach(function(t){var e=t.conditions,n,r;for(r in e)e[r]&&(e[r]=!1,n=1);n&&t.revert()})||vc()},addEventListener:function(t,e){var n=io[t]||(io[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=io[t],r=n&&n.indexOf(e);r>=0&&n.splice(r,1)},utils:{wrap:Hg,wrapYoyo:Gg,distribute:vf,random:Mf,snap:yf,normalize:Vg,getUnit:Ye,clamp:Fg,splitColor:wf,toArray:Dn,selector:gc,mapRange:Sf,pipe:zg,unitize:kg,interpolate:Wg,shuffle:xf},install:of,effects:ic,ticker:_n,updateRoot:$e.updateRoot,plugins:gn,globalTimeline:Se,core:{PropTween:un,globals:lf,Tween:Re,Timeline:$e,Animation:pa,getCache:zi,_removeLinkedListItem:ho,reverting:function(){return Ke},context:function(t){return t&&ye&&(ye.data.push(t),t._ctx=ye),ye},suppressOverwrites:function(t){return yc=t}}};cn("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return lo[i]=Re[i]});_n.add($e.updateRoot);Yr=lo.to({},{duration:0});var h0=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},f0=function(t,e){var n=t._targets,r,s,a;for(r in e)for(s=n.length;s--;)a=t._ptLookup[s][r],a&&(a=a.d)&&(a._pt&&(a=h0(a,r)),a&&a.modifier&&a.modifier(e[r],t,n[s],r))},lc=function(t,e){return{name:t,rawVars:1,init:function(r,s,a){a._onInit=function(o){var l,c;if(Oe(s)&&(l={},cn(s,function(u){return l[u]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}f0(o,s)}}}},Qe=lo.registerPlugin({name:"attr",init:function(t,e,n,r,s){var a,o,l;this.tween=n;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],r,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)Ke?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},lc("roundProps",_c),lc("modifiers"),lc("snap",yf))||lo;Re.version=$e.version=Qe.version="3.12.5";af=1;Mc()&&jr();var d0=re.Power0,p0=re.Power1,m0=re.Power2,g0=re.Power3,_0=re.Power4,x0=re.Linear,v0=re.Quad,y0=re.Cubic,M0=re.Quart,b0=re.Quint,S0=re.Strong,E0=re.Elastic,T0=re.Back,w0=re.SteppedEase,A0=re.Bounce,C0=re.Sine,R0=re.Expo,P0=re.Circ;var Of,Hi,es,Wc,wr,L0,Ff,Xc,I0=function(){return typeof window<"u"},Mi={},Tr=180/Math.PI,ns=Math.PI/180,ts=Math.atan2,Bf=1e8,qc=/([A-Z])/g,D0=/(left|right|width|margin|padding|x)/i,U0=/[\s,\(]\S/,li={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},kc=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},N0=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},O0=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},F0=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Xf=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},qf=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},B0=function(t,e,n){return t.style[e]=n},z0=function(t,e,n){return t.style.setProperty(e,n)},k0=function(t,e,n){return t._gsap[e]=n},V0=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},H0=function(t,e,n,r,s){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},G0=function(t,e,n,r,s){var a=t._gsap;a[e]=n,a.renderTransform(s,a)},Ee="transform",yn=Ee+"Origin",W0=function i(t,e){var n=this,r=this.target,s=r.style,a=r._gsap;if(t in Mi&&s){if(this.tfm=this.tfm||{},t!=="transform")t=li[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=yi(r,o)}):this.tfm[t]=a.x?a[t]:yi(r,t),t===yn&&(this.tfm.zOrigin=a.zOrigin);else return li.transform.split(",").forEach(function(o){return i.call(n,o,e)});if(this.props.indexOf(Ee)>=0)return;a.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(yn,e,"")),t=Ee}(s||e)&&this.props.push(t,e,s[t])},$f=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},X0=function(){var t=this.props,e=this.target,n=e.style,r=e._gsap,s,a;for(s=0;s<t.length;s+=3)t[s+1]?e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(qc,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=Xc(),(!s||!s.isStart)&&!n[Ee]&&($f(n),r.zOrigin&&n[yn]&&(n[yn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Yf=function(t,e){var n={target:t,props:[],revert:X0,save:W0};return t._gsap||Qe.core.getCache(t),e&&e.split(",").forEach(function(r){return n.save(r)}),n},Zf,Vc=function(t,e){var n=Hi.createElementNS?Hi.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Hi.createElement(t);return n&&n.style?n:Hi.createElement(t)},ci=function i(t,e,n){var r=getComputedStyle(t);return r[e]||r.getPropertyValue(e.replace(qc,"-$1").toLowerCase())||r.getPropertyValue(e)||!n&&i(t,is(e)||e,1)||""},zf="O,Moz,ms,Ms,Webkit".split(","),is=function(t,e,n){var r=e||wr,s=r.style,a=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(zf[a]+t in s););return a<0?null:(a===3?"ms":a>=0?zf[a]:"")+t},Hc=function(){I0()&&window.document&&(Of=window,Hi=Of.document,es=Hi.documentElement,wr=Vc("div")||{style:{}},L0=Vc("div"),Ee=is(Ee),yn=Ee+"Origin",wr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Zf=!!is("perspective"),Xc=Qe.core.reverting,Wc=1)},Bc=function i(t){var e=Vc("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,r=this.nextSibling,s=this.style.cssText,a;if(es.appendChild(e),e.appendChild(this),this.style.display="block",t)try{a=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=i}catch{}else this._gsapBBox&&(a=this._gsapBBox());return n&&(r?n.insertBefore(this,r):n.appendChild(this)),es.removeChild(e),this.style.cssText=s,a},kf=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Jf=function(t){var e;try{e=t.getBBox()}catch{e=Bc.call(t,!0)}return e&&(e.width||e.height)||t.getBBox===Bc||(e=Bc.call(t,!0)),e&&!e.width&&!e.x&&!e.y?{x:+kf(t,["x","cx","x1"])||0,y:+kf(t,["y","cy","y1"])||0,width:0,height:0}:e},Kf=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Jf(t))},Ar=function(t,e){if(e){var n=t.style,r;e in Mi&&e!==yn&&(e=Ee),n.removeProperty?(r=e.substr(0,2),(r==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(r==="--"?e:e.replace(qc,"-$1").toLowerCase())):n.removeAttribute(e)}},Gi=function(t,e,n,r,s,a){var o=new un(t._pt,e,n,0,1,a?qf:Xf);return t._pt=o,o.b=r,o.e=s,t._props.push(n),o},Vf={deg:1,rad:1,turn:1},q0={grid:1,flex:1},Wi=function i(t,e,n,r){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=wr.style,l=D0.test(e),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,f=r==="px",p=r==="%",x,g,m,d;if(r===a||!s||Vf[r]||Vf[a])return s;if(a!=="px"&&!f&&(s=i(t,e,n,"px")),d=t.getCTM&&Kf(t),(p||a==="%")&&(Mi[e]||~e.indexOf("adius")))return x=d?t.getBBox()[l?"width":"height"]:t[u],Ae(p?s/x*h:s/100*x);if(o[l?"width":"height"]=h+(f?a:r),g=~e.indexOf("adius")||r==="em"&&t.appendChild&&!c?t:t.parentNode,d&&(g=(t.ownerSVGElement||{}).parentNode),(!g||g===Hi||!g.appendChild)&&(g=Hi.body),m=g._gsap,m&&p&&m.width&&l&&m.time===_n.time&&!m.uncache)return Ae(s/m.width*h);if(p&&(e==="height"||e==="width")){var y=t.style[e];t.style[e]=h+r,x=t[u],y?t.style[e]=y:Ar(t,e)}else(p||a==="%")&&!q0[ci(g,"display")]&&(o.position=ci(t,"position")),g===t&&(o.position="static"),g.appendChild(wr),x=wr[u],g.removeChild(wr),o.position="absolute";return l&&p&&(m=zi(g),m.time=_n.time,m.width=g[u]),Ae(f?x*s/h:x&&s?h/x*s:0)},yi=function(t,e,n,r){var s;return Wc||Hc(),e in li&&e!=="transform"&&(e=li[e],~e.indexOf(",")&&(e=e.split(",")[0])),Mi[e]&&e!=="transform"?(s=xa(t,r),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:_o(ci(t,yn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=go[e]&&go[e](t,e,n)||ci(t,e)||Cc(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Wi(t,e,s,n)+n:s},$0=function(t,e,n,r){if(!n||n==="none"){var s=is(e,t,1),a=s&&ci(t,s,1);a&&a!==n?(e=s,n=a):e==="borderColor"&&(n=ci(t,"borderTopColor"))}var o=new un(this._pt,t.style,e,0,1,Nc),l=0,c=0,u,h,f,p,x,g,m,d,y,v,b,T;if(o.b=n,o.e=r,n+="",r+="",r==="auto"&&(g=t.style[e],t.style[e]=r,r=ci(t,e)||r,g?t.style[e]=g:Ar(t,e)),u=[n,r],Rc(u),n=u[0],r=u[1],f=n.match(yr)||[],T=r.match(yr)||[],T.length){for(;h=yr.exec(r);)m=h[0],y=r.substring(l,h.index),x?x=(x+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(x=1),m!==(g=f[c++]||"")&&(p=parseFloat(g)||0,b=g.substr((p+"").length),m.charAt(1)==="="&&(m=Mr(p,m)+b),d=parseFloat(m),v=m.substr((d+"").length),l=yr.lastIndex-v.length,v||(v=v||vn.units[e]||b,l===r.length&&(r+=v,o.e+=v)),b!==v&&(p=Wi(t,e,g,v)||0),o._pt={_next:o._pt,p:y||c===1?y:",",s:p,c:d-p,m:x&&x<4||e==="zIndex"?Math.round:0});o.c=l<r.length?r.substring(l,r.length):""}else o.r=e==="display"&&r==="none"?qf:Xf;return Sc.test(r)&&(o.e=0),this._pt=o,o},Hf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Y0=function(t){var e=t.split(" "),n=e[0],r=e[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(t=n,n=r,r=t),e[0]=Hf[n]||n,e[1]=Hf[r]||r,e.join(" ")},Z0=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,r=n.style,s=e.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Mi[o]&&(l=1,o=o==="transformOrigin"?yn:Ee),Ar(n,o);l&&(Ar(n,Ee),a&&(a.svg&&n.removeAttribute("transform"),xa(n,1),a.uncache=1,$f(r)))}},go={clearProps:function(t,e,n,r,s){if(s.data!=="isFromStart"){var a=t._pt=new un(t._pt,e,n,0,0,Z0);return a.u=r,a.pr=-10,a.tween=s,t._props.push(n),1}}},_a=[1,0,0,1,0,0],jf={},Qf=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Gf=function(t){var e=ci(t,Ee);return Qf(e)?_a:e.substr(7).match(bc).map(Ae)},$c=function(t,e){var n=t._gsap||zi(t),r=t.style,s=Gf(t),a,o,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?_a:s):(s===_a&&!t.offsetParent&&t!==es&&!n.svg&&(l=r.display,r.display="block",a=t.parentNode,(!a||!t.offsetParent)&&(c=1,o=t.nextElementSibling,es.appendChild(t)),s=Gf(t),l?r.display=l:Ar(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):es.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Gc=function(t,e,n,r,s,a){var o=t._gsap,l=s||$c(t,!0),c=o.xOrigin||0,u=o.yOrigin||0,h=o.xOffset||0,f=o.yOffset||0,p=l[0],x=l[1],g=l[2],m=l[3],d=l[4],y=l[5],v=e.split(" "),b=parseFloat(v[0])||0,T=parseFloat(v[1])||0,M,E,C,_;n?l!==_a&&(E=p*m-x*g)&&(C=b*(m/E)+T*(-g/E)+(g*y-m*d)/E,_=b*(-x/E)+T*(p/E)-(p*y-x*d)/E,b=C,T=_):(M=Jf(t),b=M.x+(~v[0].indexOf("%")?b/100*M.width:b),T=M.y+(~(v[1]||v[0]).indexOf("%")?T/100*M.height:T)),r||r!==!1&&o.smooth?(d=b-c,y=T-u,o.xOffset=h+(d*p+y*g)-d,o.yOffset=f+(d*x+y*m)-y):o.xOffset=o.yOffset=0,o.xOrigin=b,o.yOrigin=T,o.smooth=!!r,o.origin=e,o.originIsAbsolute=!!n,t.style[yn]="0px 0px",a&&(Gi(a,o,"xOrigin",c,b),Gi(a,o,"yOrigin",u,T),Gi(a,o,"xOffset",h,o.xOffset),Gi(a,o,"yOffset",f,o.yOffset)),t.setAttribute("data-svg-origin",b+" "+T)},xa=function(t,e){var n=t._gsap||new Pc(t);if("x"in n&&!e&&!n.uncache)return n;var r=t.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=ci(t,yn)||"0",u,h,f,p,x,g,m,d,y,v,b,T,M,E,C,_,S,L,U,X,D,z,H,J,Q,tt,it,at,mt,K,nt,F;return u=h=f=g=m=d=y=v=b=0,p=x=1,n.svg=!!(t.getCTM&&Kf(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[Ee]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ee]!=="none"?l[Ee]:"")),r.scale=r.rotate=r.translate="none"),E=$c(t,n.svg),n.svg&&(n.uncache?(Q=t.getBBox(),c=n.xOrigin-Q.x+"px "+(n.yOrigin-Q.y)+"px",J=""):J=!e&&t.getAttribute("data-svg-origin"),Gc(t,J||c,!!J||n.originIsAbsolute,n.smooth!==!1,E)),T=n.xOrigin||0,M=n.yOrigin||0,E!==_a&&(L=E[0],U=E[1],X=E[2],D=E[3],u=z=E[4],h=H=E[5],E.length===6?(p=Math.sqrt(L*L+U*U),x=Math.sqrt(D*D+X*X),g=L||U?ts(U,L)*Tr:0,y=X||D?ts(X,D)*Tr+g:0,y&&(x*=Math.abs(Math.cos(y*ns))),n.svg&&(u-=T-(T*L+M*X),h-=M-(T*U+M*D))):(F=E[6],K=E[7],it=E[8],at=E[9],mt=E[10],nt=E[11],u=E[12],h=E[13],f=E[14],C=ts(F,mt),m=C*Tr,C&&(_=Math.cos(-C),S=Math.sin(-C),J=z*_+it*S,Q=H*_+at*S,tt=F*_+mt*S,it=z*-S+it*_,at=H*-S+at*_,mt=F*-S+mt*_,nt=K*-S+nt*_,z=J,H=Q,F=tt),C=ts(-X,mt),d=C*Tr,C&&(_=Math.cos(-C),S=Math.sin(-C),J=L*_-it*S,Q=U*_-at*S,tt=X*_-mt*S,nt=D*S+nt*_,L=J,U=Q,X=tt),C=ts(U,L),g=C*Tr,C&&(_=Math.cos(C),S=Math.sin(C),J=L*_+U*S,Q=z*_+H*S,U=U*_-L*S,H=H*_-z*S,L=J,z=Q),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,d=180-d),p=Ae(Math.sqrt(L*L+U*U+X*X)),x=Ae(Math.sqrt(H*H+F*F)),C=ts(z,H),y=Math.abs(C)>2e-4?C*Tr:0,b=nt?1/(nt<0?-nt:nt):0),n.svg&&(J=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Qf(ci(t,Ee)),J&&t.setAttribute("transform",J))),Math.abs(y)>90&&Math.abs(y)<270&&(s?(p*=-1,y+=g<=0?180:-180,g+=g<=0?180:-180):(x*=-1,y+=y<=0?180:-180)),e=e||n.uncache,n.x=u-((n.xPercent=u&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=h-((n.yPercent=h&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=f+a,n.scaleX=Ae(p),n.scaleY=Ae(x),n.rotation=Ae(g)+o,n.rotationX=Ae(m)+o,n.rotationY=Ae(d)+o,n.skewX=y+o,n.skewY=v+o,n.transformPerspective=b+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(r[yn]=_o(c)),n.xOffset=n.yOffset=0,n.force3D=vn.force3D,n.renderTransform=n.svg?K0:Zf?td:J0,n.uncache=0,n},_o=function(t){return(t=t.split(" "))[0]+" "+t[1]},zc=function(t,e,n){var r=Ye(e);return Ae(parseFloat(e)+parseFloat(Wi(t,"x",n+"px",r)))+r},J0=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,td(t,e)},Sr="0deg",ga="0px",Er=") ",td=function(t,e){var n=e||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,f=n.skewX,p=n.skewY,x=n.scaleX,g=n.scaleY,m=n.transformPerspective,d=n.force3D,y=n.target,v=n.zOrigin,b="",T=d==="auto"&&t&&t!==1||d===!0;if(v&&(h!==Sr||u!==Sr)){var M=parseFloat(u)*ns,E=Math.sin(M),C=Math.cos(M),_;M=parseFloat(h)*ns,_=Math.cos(M),a=zc(y,a,E*_*-v),o=zc(y,o,-Math.sin(M)*-v),l=zc(y,l,C*_*-v+v)}m!==ga&&(b+="perspective("+m+Er),(r||s)&&(b+="translate("+r+"%, "+s+"%) "),(T||a!==ga||o!==ga||l!==ga)&&(b+=l!==ga||T?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Er),c!==Sr&&(b+="rotate("+c+Er),u!==Sr&&(b+="rotateY("+u+Er),h!==Sr&&(b+="rotateX("+h+Er),(f!==Sr||p!==Sr)&&(b+="skew("+f+", "+p+Er),(x!==1||g!==1)&&(b+="scale("+x+", "+g+Er),y.style[Ee]=b||"translate(0, 0)"},K0=function(t,e){var n=e||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,f=n.scaleY,p=n.target,x=n.xOrigin,g=n.yOrigin,m=n.xOffset,d=n.yOffset,y=n.forceCSS,v=parseFloat(a),b=parseFloat(o),T,M,E,C,_;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=ns,c*=ns,T=Math.cos(l)*h,M=Math.sin(l)*h,E=Math.sin(l-c)*-f,C=Math.cos(l-c)*f,c&&(u*=ns,_=Math.tan(c-u),_=Math.sqrt(1+_*_),E*=_,C*=_,u&&(_=Math.tan(u),_=Math.sqrt(1+_*_),T*=_,M*=_)),T=Ae(T),M=Ae(M),E=Ae(E),C=Ae(C)):(T=h,C=f,M=E=0),(v&&!~(a+"").indexOf("px")||b&&!~(o+"").indexOf("px"))&&(v=Wi(p,"x",a,"px"),b=Wi(p,"y",o,"px")),(x||g||m||d)&&(v=Ae(v+x-(x*T+g*E)+m),b=Ae(b+g-(x*M+g*C)+d)),(r||s)&&(_=p.getBBox(),v=Ae(v+r/100*_.width),b=Ae(b+s/100*_.height)),_="matrix("+T+","+M+","+E+","+C+","+v+","+b+")",p.setAttribute("transform",_),y&&(p.style[Ee]=_)},j0=function(t,e,n,r,s){var a=360,o=Oe(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?Tr:1),c=l-r,u=r+c+"deg",h,f;return o&&(h=s.split("_")[1],h==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),h==="cw"&&c<0?c=(c+a*Bf)%a-~~(c/a)*a:h==="ccw"&&c>0&&(c=(c-a*Bf)%a-~~(c/a)*a)),t._pt=f=new un(t._pt,e,n,r,c,N0),f.e=u,f.u="deg",t._props.push(n),f},Wf=function(t,e){for(var n in e)t[n]=e[n];return t},Q0=function(t,e,n){var r=Wf({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,h,f,p,x;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Ee]=e,o=xa(n,1),Ar(n,Ee),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ee],a[Ee]=e,o=xa(n,1),a[Ee]=c);for(l in Mi)c=r[l],u=o[l],c!==u&&s.indexOf(l)<0&&(p=Ye(c),x=Ye(u),h=p!==x?Wi(n,l,c,x):parseFloat(c),f=parseFloat(u),t._pt=new un(t._pt,o,l,h,f-h,kc),t._pt.u=x||0,t._props.push(l));Wf(o,r)};cn("padding,margin,Width,Radius",function(i,t){var e="Top",n="Right",r="Bottom",s="Left",a=(t<3?[e,n,r,s]:[e+s,e+n,r+n,r+s]).map(function(o){return t<2?i+o:"border"+o+i});go[t>1?"border"+i:i]=function(o,l,c,u,h){var f,p;if(arguments.length<4)return f=a.map(function(x){return yi(o,x,c)}),p=f.join(" "),p.split(f[0]).length===5?f[0]:p;f=(u+"").split(" "),p={},a.forEach(function(x,g){return p[x]=f[g]=f[g]||f[(g-1)/2|0]}),o.init(l,p,h)}});var Yc={name:"css",register:Hc,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,r,s){var a=this._props,o=t.style,l=n.vars.startAt,c,u,h,f,p,x,g,m,d,y,v,b,T,M,E,C;Wc||Hc(),this.styles=this.styles||Yf(t),C=this.styles.props,this.tween=n;for(g in e)if(g!=="autoRound"&&(u=e[g],!(gn[g]&&Ic(g,e,n,r,t,s)))){if(p=typeof u,x=go[g],p==="function"&&(u=u.call(n,r,t,s),p=typeof u),p==="string"&&~u.indexOf("random(")&&(u=Qr(u)),x)x(this,t,g,u,n)&&(E=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(g)+"").trim(),u+="",xi.lastIndex=0,xi.test(c)||(m=Ye(c),d=Ye(u)),d?m!==d&&(c=Wi(t,g,c,d)+d):m&&(u+=m),this.add(o,"setProperty",c,u,r,s,0,0,g),a.push(g),C.push(g,0,o[g]);else if(p!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,r,t,s):l[g],Oe(c)&&~c.indexOf("random(")&&(c=Qr(c)),Ye(c+"")||c==="auto"||(c+=vn.units[g]||Ye(yi(t,g))||""),(c+"").charAt(1)==="="&&(c=yi(t,g))):c=yi(t,g),f=parseFloat(c),y=p==="string"&&u.charAt(1)==="="&&u.substr(0,2),y&&(u=u.substr(2)),h=parseFloat(u),g in li&&(g==="autoAlpha"&&(f===1&&yi(t,"visibility")==="hidden"&&h&&(f=0),C.push("visibility",0,o.visibility),Gi(this,o,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),g!=="scale"&&g!=="transform"&&(g=li[g],~g.indexOf(",")&&(g=g.split(",")[0]))),v=g in Mi,v){if(this.styles.save(g),b||(T=t._gsap,T.renderTransform&&!e.parseTransform||xa(t,e.parseTransform),M=e.smoothOrigin!==!1&&T.smooth,b=this._pt=new un(this._pt,o,Ee,0,1,T.renderTransform,T,0,-1),b.dep=1),g==="scale")this._pt=new un(this._pt,T,"scaleY",T.scaleY,(y?Mr(T.scaleY,y+h):h)-T.scaleY||0,kc),this._pt.u=0,a.push("scaleY",g),g+="X";else if(g==="transformOrigin"){C.push(yn,0,o[yn]),u=Y0(u),T.svg?Gc(t,u,0,M,0,this):(d=parseFloat(u.split(" ")[2])||0,d!==T.zOrigin&&Gi(this,T,"zOrigin",T.zOrigin,d),Gi(this,o,g,_o(c),_o(u)));continue}else if(g==="svgOrigin"){Gc(t,u,1,M,0,this);continue}else if(g in jf){j0(this,T,g,f,y?Mr(f,y+u):u);continue}else if(g==="smoothOrigin"){Gi(this,T,"smooth",T.smooth,u);continue}else if(g==="force3D"){T[g]=u;continue}else if(g==="transform"){Q0(this,u,t);continue}}else g in o||(g=is(g)||g);if(v||(h||h===0)&&(f||f===0)&&!U0.test(u)&&g in o)m=(c+"").substr((f+"").length),h||(h=0),d=Ye(u)||(g in vn.units?vn.units[g]:m),m!==d&&(f=Wi(t,g,c,d)),this._pt=new un(this._pt,v?T:o,g,f,(y?Mr(f,y+h):h)-f,!v&&(d==="px"||g==="zIndex")&&e.autoRound!==!1?F0:kc),this._pt.u=d||0,m!==d&&d!=="%"&&(this._pt.b=c,this._pt.r=O0);else if(g in o)$0.call(this,t,g,c,y?y+u:u);else if(g in t)this.add(t,g,c||t[g],y?y+u:u,r,s);else if(g!=="parseTransform"){uo(g,u);continue}v||(g in o?C.push(g,0,o[g]):C.push(g,1,c||t[g])),a.push(g)}}E&&Fc(this)},render:function(t,e){if(e.tween._time||!Xc())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:yi,aliases:li,getSetter:function(t,e,n){var r=li[e];return r&&r.indexOf(",")<0&&(e=r),e in Mi&&e!==yn&&(t._gsap.x||yi(t,"x"))?n&&Ff===n?e==="scale"?V0:k0:(Ff=n||{})&&(e==="scale"?H0:G0):t.style&&!co(t.style[e])?B0:~e.indexOf("-")?z0:mo(t,e)},core:{_removeProperty:Ar,_getMatrix:$c}};Qe.utils.checkPrefix=is;Qe.core.getStyleSaver=Yf;(function(i,t,e,n){var r=cn(i+","+t+","+e,function(s){Mi[s]=1});cn(t,function(s){vn.units[s]="deg",jf[s]=1}),li[r[13]]=i+","+t,cn(n,function(s){var a=s.split(":");li[a[1]]=r[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");cn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){vn.units[i]="px"});Qe.registerPlugin(Yc);var ct=Qe.registerPlugin(Yc)||Qe,rS=ct.core.Tween;var ch="160";var t_=0,ed=1,e_=2;var Pp=1,n_=2,Ai=3,tr=0,sn=1,Fn=2;var hi=0,Ts=1,Br=2,nd=3,id=4,i_=5,Dr=100,r_=101,s_=102,rd=103,sd=104,a_=200,o_=201,l_=202,c_=203,wu=204,Au=205,u_=206,h_=207,f_=208,d_=209,p_=210,m_=211,g_=212,__=213,x_=214,v_=0,y_=1,M_=2,Wo=3,b_=4,S_=5,E_=6,T_=7,Lp=0,w_=1,A_=2,ji=0,uh=1,hh=2,fh=3,Ba=4,C_=5,dh=6;var Ip=300,Cs=301,Rs=302,Cu=303,Ru=304,yl=306,Pu=1e3,Jn=1001,Lu=1002,dn=1003,ad=1004;var Zc=1005;var On=1006,R_=1007;var Pa=1008;var Qi=1009,P_=1010,L_=1011,ph=1012,Dp=1013,Ji=1014,Ki=1015,jn=1016,Up=1017,Np=1018,Nr=1020,I_=1021,Kn=1023,D_=1024,U_=1025,Or=1026,Ps=1027,N_=1028,Op=1029,O_=1030,Fp=1031,Bp=1033,Jc=33776,Kc=33777,jc=33778,Qc=33779,od=35840,ld=35841,cd=35842,ud=35843,zp=36196,hd=37492,fd=37496,dd=37808,pd=37809,md=37810,gd=37811,_d=37812,xd=37813,vd=37814,yd=37815,Md=37816,bd=37817,Sd=37818,Ed=37819,Td=37820,wd=37821,tu=36492,Ad=36494,Cd=36495,F_=36283,Rd=36284,Pd=36285,Ld=36286;var Xo=2300,qo=2301,eu=2302,Id=2400,Dd=2401,Ud=2402;var kp=3e3,Fr=3001,B_=3200,z_=3201,Vp=0,k_=1,Bn="",Fe="srgb",Li="srgb-linear",mh="display-p3",Ml="display-p3-linear",$o="linear",fe="srgb",Yo="rec709",Zo="p3";var rs=7680;var Nd=519,V_=512,H_=513,G_=514,Hp=515,W_=516,X_=517,q_=518,$_=519,Od=35044;var Fd="300 es",Iu=1035,Ri=2e3,Jo=2001,er=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let r=this._listeners[t];if(r!==void 0){let s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}},tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bd=1234567,wa=Math.PI/180,La=180/Math.PI;function Bs(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]+"-"+tn[t&255]+tn[t>>8&255]+"-"+tn[t>>16&15|64]+tn[t>>24&255]+"-"+tn[e&63|128]+tn[e>>8&255]+"-"+tn[e>>16&255]+tn[e>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function nn(i,t,e){return Math.max(t,Math.min(e,i))}function gh(i,t){return(i%t+t)%t}function Y_(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function Z_(i,t,e){return i!==t?(e-i)/(t-i):0}function Aa(i,t,e){return(1-e)*i+e*t}function J_(i,t,e,n){return Aa(i,t,1-Math.exp(-e*n))}function K_(i,t=1){return t-Math.abs(gh(i,t*2)-t)}function j_(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Q_(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function tx(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ex(i,t){return i+Math.random()*(t-i)}function nx(i){return i*(.5-Math.random())}function ix(i){i!==void 0&&(Bd=i);let t=Bd+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function rx(i){return i*wa}function sx(i){return i*La}function Du(i){return(i&i-1)===0&&i!==0}function ax(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ko(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ox(i,t,e,n,r){let s=Math.cos,a=Math.sin,o=s(e/2),l=a(e/2),c=s((t+n)/2),u=a((t+n)/2),h=s((t-n)/2),f=a((t-n)/2),p=s((n-t)/2),x=a((n-t)/2);switch(r){case"XYX":i.set(o*u,l*h,l*f,o*c);break;case"YZY":i.set(l*f,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*f,o*u,o*c);break;case"XZX":i.set(o*u,l*x,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*x,o*c);break;case"ZYZ":i.set(l*x,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ms(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function hn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Gp={DEG2RAD:wa,RAD2DEG:La,generateUUID:Bs,clamp:nn,euclideanModulo:gh,mapLinear:Y_,inverseLerp:Z_,lerp:Aa,damp:J_,pingpong:K_,smoothstep:j_,smootherstep:Q_,randInt:tx,randFloat:ex,randFloatSpread:nx,seededRandom:ix,degToRad:rx,radToDeg:sx,isPowerOfTwo:Du,ceilPowerOfTwo:ax,floorPowerOfTwo:Ko,setQuaternionFromProperEuler:ox,normalize:hn,denormalize:Ms},zt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(nn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*r+t.x,this.y=s*r+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ne=class i{constructor(t,e,n,r,s,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c)}set(t,e,n,r,s,a,o,l,c){let u=this.elements;return u[0]=t,u[1]=r,u[2]=o,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],p=n[5],x=n[8],g=r[0],m=r[3],d=r[6],y=r[1],v=r[4],b=r[7],T=r[2],M=r[5],E=r[8];return s[0]=a*g+o*y+l*T,s[3]=a*m+o*v+l*M,s[6]=a*d+o*b+l*E,s[1]=c*g+u*y+h*T,s[4]=c*m+u*v+h*M,s[7]=c*d+u*b+h*E,s[2]=f*g+p*y+x*T,s[5]=f*m+p*v+x*M,s[8]=f*d+p*b+x*E,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){let t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=u*a-o*c,f=o*l-u*s,p=c*s-a*l,x=e*h+n*f+r*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/x;return t[0]=h*g,t[1]=(r*c-u*n)*g,t[2]=(o*n-r*a)*g,t[3]=f*g,t[4]=(u*e-r*l)*g,t[5]=(r*s-o*e)*g,t[6]=p*g,t[7]=(n*l-c*e)*g,t[8]=(a*e-n*s)*g,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-r*c,r*l,-r*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(nu.makeScale(t,e)),this}rotate(t){return this.premultiply(nu.makeRotation(-t)),this}translate(t,e){return this.premultiply(nu.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},nu=new ne;function Wp(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function jo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function lx(){let i=jo("canvas");return i.style.display="block",i}var zd={};function Ca(i){i in zd||(zd[i]=!0,console.warn(i))}var kd=new ne().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Vd=new ne().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),xo={[Li]:{transfer:$o,primaries:Yo,toReference:i=>i,fromReference:i=>i},[Fe]:{transfer:fe,primaries:Yo,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ml]:{transfer:$o,primaries:Zo,toReference:i=>i.applyMatrix3(Vd),fromReference:i=>i.applyMatrix3(kd)},[mh]:{transfer:fe,primaries:Zo,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Vd),fromReference:i=>i.applyMatrix3(kd).convertLinearToSRGB()}},cx=new Set([Li,Ml]),le={enabled:!0,_workingColorSpace:Li,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!cx.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;let n=xo[t].toReference,r=xo[e].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return xo[i].primaries},getTransfer:function(i){return i===Bn?$o:xo[i].transfer}};function ws(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function iu(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ss,Qo=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ss===void 0&&(ss=jo("canvas")),ss.width=t.width,ss.height=t.height;let n=ss.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ss}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=jo("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ws(s[a]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ws(e[n]/255)*255):e[n]=ws(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ux=0,tl=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ux++}),this.uuid=Bs(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ru(r[a].image)):s.push(ru(r[a]))}else s=ru(r);n.url=s}return e||(t.images[this.uuid]=n),n}};function ru(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Qo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var hx=0,zn=class i extends er{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Jn,r=Jn,s=On,a=Pa,o=Kn,l=Qi,c=i.DEFAULT_ANISOTROPY,u=Bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hx++}),this.uuid=Bs(),this.name="",this.source=new tl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Ca("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Fr?Fe:Bn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ip)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Pu:t.x=t.x-Math.floor(t.x);break;case Jn:t.x=t.x<0?0:1;break;case Lu:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Pu:t.y=t.y-Math.floor(t.y);break;case Jn:t.y=t.y<0?0:1;break;case Lu:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ca("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Fe?Fr:kp}set encoding(t){Ca("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Fr?Fe:Bn}};zn.DEFAULT_IMAGE=null;zn.DEFAULT_MAPPING=Ip;zn.DEFAULT_ANISOTROPY=1;var be=class i{constructor(t=0,e=0,n=0,r=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s,l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],x=l[9],g=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-g)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+g)<.1&&Math.abs(x+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(c+1)/2,b=(p+1)/2,T=(d+1)/2,M=(u+f)/4,E=(h+g)/4,C=(x+m)/4;return v>b&&v>T?v<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(v),r=M/n,s=E/n):b>T?b<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),n=M/r,s=C/r):T<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),n=E/s,r=C/s),this.set(n,r,s,e),this}let y=Math.sqrt((m-x)*(m-x)+(h-g)*(h-g)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(m-x)/y,this.y=(h-g)/y,this.z=(f-u)/y,this.w=Math.acos((c+p+d-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Uu=class extends er{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e);let r={width:t,height:e,depth:1};n.encoding!==void 0&&(Ca("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Fr?Fe:Bn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:On,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new zn(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new tl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},pn=class extends Uu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},el=class extends zn{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=dn,this.minFilter=dn,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Nu=class extends zn{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=dn,this.minFilter=dn,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var fi=class{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3],f=s[a+0],p=s[a+1],x=s[a+2],g=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=f,t[e+1]=p,t[e+2]=x,t[e+3]=g;return}if(h!==g||l!==f||c!==p||u!==x){let m=1-o,d=l*f+c*p+u*x+h*g,y=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){let T=Math.sqrt(v),M=Math.atan2(T,d*y);m=Math.sin(m*M)/T,o=Math.sin(o*M)/T}let b=o*y;if(l=l*m+f*b,c=c*m+p*b,u=u*m+x*b,h=h*m+g*b,m===1-o){let T=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=T,c*=T,u*=T,h*=T}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[a],f=s[a+1],p=s[a+2],x=s[a+3];return t[e]=o*x+u*h+l*p-c*f,t[e+1]=l*x+u*f+c*h-o*p,t[e+2]=c*x+u*p+o*f-l*h,t[e+3]=u*x-o*h-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),h=o(s/2),f=l(n/2),p=l(r/2),x=l(s/2);switch(a){case"XYZ":this._x=f*u*h+c*p*x,this._y=c*p*h-f*u*x,this._z=c*u*x+f*p*h,this._w=c*u*h-f*p*x;break;case"YXZ":this._x=f*u*h+c*p*x,this._y=c*p*h-f*u*x,this._z=c*u*x-f*p*h,this._w=c*u*h+f*p*x;break;case"ZXY":this._x=f*u*h-c*p*x,this._y=c*p*h+f*u*x,this._z=c*u*x+f*p*h,this._w=c*u*h-f*p*x;break;case"ZYX":this._x=f*u*h-c*p*x,this._y=c*p*h+f*u*x,this._z=c*u*x-f*p*h,this._w=c*u*h+f*p*x;break;case"YZX":this._x=f*u*h+c*p*x,this._y=c*p*h+f*u*x,this._z=c*u*x-f*p*h,this._w=c*u*h-f*p*x;break;case"XZY":this._x=f*u*h-c*p*x,this._y=c*p*h-f*u*x,this._z=c*u*x+f*p*h,this._w=c*u*h+f*p*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],r=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=n+o+h;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(n>o&&n>h){let p=2*Math.sqrt(1+n-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>h){let p=2*Math.sqrt(1+o-n-h);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+h-n-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(nn(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,r=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,r=this._y,s=this._z,a=this._w,o=a*t._w+n*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*r+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(r),n*Math.sin(s),n*Math.cos(s),e*Math.sin(r))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},V=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Hd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Hd.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*r-o*n),u=2*(o*e-s*r),h=2*(s*n-a*e);return this.x=e+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,r=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return su.copy(this).projectOnVector(t),this.sub(su)}reflect(t){return this.sub(su.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(nn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},su=new V,Hd=new fi,Ii=class{constructor(t=new V(1/0,1/0,1/0),e=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint($n.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint($n.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=$n.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,$n):$n.fromBufferAttribute(s,a),$n.applyMatrix4(t.matrixWorld),this.expandByPoint($n);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),vo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vo.copy(n.boundingBox)),vo.applyMatrix4(t.matrixWorld),this.union(vo)}let r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,$n),$n.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(va),yo.subVectors(this.max,va),as.subVectors(t.a,va),os.subVectors(t.b,va),ls.subVectors(t.c,va),Xi.subVectors(os,as),qi.subVectors(ls,os),Cr.subVectors(as,ls);let e=[0,-Xi.z,Xi.y,0,-qi.z,qi.y,0,-Cr.z,Cr.y,Xi.z,0,-Xi.x,qi.z,0,-qi.x,Cr.z,0,-Cr.x,-Xi.y,Xi.x,0,-qi.y,qi.x,0,-Cr.y,Cr.x,0];return!au(e,as,os,ls,yo)||(e=[1,0,0,0,1,0,0,0,1],!au(e,as,os,ls,yo))?!1:(Mo.crossVectors(Xi,qi),e=[Mo.x,Mo.y,Mo.z],au(e,as,os,ls,yo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,$n).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize($n).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),bi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),bi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),bi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),bi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),bi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(bi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},bi=[new V,new V,new V,new V,new V,new V,new V,new V],$n=new V,vo=new Ii,as=new V,os=new V,ls=new V,Xi=new V,qi=new V,Cr=new V,va=new V,yo=new V,Mo=new V,Rr=new V;function au(i,t,e,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Rr.fromArray(i,s);let o=r.x*Math.abs(Rr.x)+r.y*Math.abs(Rr.y)+r.z*Math.abs(Rr.z),l=t.dot(Rr),c=e.dot(Rr),u=n.dot(Rr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var fx=new Ii,ya=new V,ou=new V,nr=class{constructor(t=new V,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):fx.setFromPoints(t).getCenter(n);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ya.subVectors(t,this.center);let e=ya.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(ya,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ou.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ya.copy(t.center).add(ou)),this.expandByPoint(ya.copy(t.center).sub(ou))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Si=new V,lu=new V,bo=new V,$i=new V,cu=new V,So=new V,uu=new V,nl=class{constructor(t=new V,e=new V(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Si)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Si.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Si.copy(this.origin).addScaledVector(this.direction,e),Si.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){lu.copy(t).add(e).multiplyScalar(.5),bo.copy(e).sub(t).normalize(),$i.copy(this.origin).sub(lu);let s=t.distanceTo(e)*.5,a=-this.direction.dot(bo),o=$i.dot(this.direction),l=-$i.dot(bo),c=$i.lengthSq(),u=Math.abs(1-a*a),h,f,p,x;if(u>0)if(h=a*l-o,f=a*o-l,x=s*u,h>=0)if(f>=-x)if(f<=x){let g=1/u;h*=g,f*=g,p=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f<=-x?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c):f<=x?(h=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(lu).addScaledVector(bo,f),p}intersectSphere(t,e){Si.subVectors(t.center,this.origin);let n=Si.dot(this.direction),r=Si.dot(Si)-n*n,s=t.radius*t.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,a,o,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,r=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,r=(t.min.x-f.x)*c),u>=0?(s=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(o=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Si)!==null}intersectTriangle(t,e,n,r,s){cu.subVectors(e,t),So.subVectors(n,t),uu.crossVectors(cu,So);let a=this.direction.dot(uu),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;$i.subVectors(this.origin,t);let l=o*this.direction.dot(So.crossVectors($i,So));if(l<0)return null;let c=o*this.direction.dot(cu.cross($i));if(c<0||l+c>a)return null;let u=-o*$i.dot(uu);return u<0?null:this.at(u/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Te=class i{constructor(t,e,n,r,s,a,o,l,c,u,h,f,p,x,g,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c,u,h,f,p,x,g,m)}set(t,e,n,r,s,a,o,l,c,u,h,f,p,x,g,m){let d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=x,d[11]=g,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,r=1/cs.setFromMatrixColumn(t,0).length(),s=1/cs.setFromMatrixColumn(t,1).length(),a=1/cs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){let f=a*u,p=a*h,x=o*u,g=o*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=p+x*c,e[5]=f-g*c,e[9]=-o*l,e[2]=g-f*c,e[6]=x+p*c,e[10]=a*l}else if(t.order==="YXZ"){let f=l*u,p=l*h,x=c*u,g=c*h;e[0]=f+g*o,e[4]=x*o-p,e[8]=a*c,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=p*o-x,e[6]=g+f*o,e[10]=a*l}else if(t.order==="ZXY"){let f=l*u,p=l*h,x=c*u,g=c*h;e[0]=f-g*o,e[4]=-a*h,e[8]=x+p*o,e[1]=p+x*o,e[5]=a*u,e[9]=g-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let f=a*u,p=a*h,x=o*u,g=o*h;e[0]=l*u,e[4]=x*c-p,e[8]=f*c+g,e[1]=l*h,e[5]=g*c+f,e[9]=p*c-x,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let f=a*l,p=a*c,x=o*l,g=o*c;e[0]=l*u,e[4]=g-f*h,e[8]=x*h+p,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=p*h+x,e[10]=f-g*h}else if(t.order==="XZY"){let f=a*l,p=a*c,x=o*l,g=o*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+g,e[5]=a*u,e[9]=p*h-x,e[2]=x*h-p,e[6]=o*u,e[10]=g*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(dx,t,px)}lookAt(t,e,n){let r=this.elements;return wn.subVectors(t,e),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Yi.crossVectors(n,wn),Yi.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Yi.crossVectors(n,wn)),Yi.normalize(),Eo.crossVectors(wn,Yi),r[0]=Yi.x,r[4]=Eo.x,r[8]=wn.x,r[1]=Yi.y,r[5]=Eo.y,r[9]=wn.y,r[2]=Yi.z,r[6]=Eo.z,r[10]=wn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],p=n[13],x=n[2],g=n[6],m=n[10],d=n[14],y=n[3],v=n[7],b=n[11],T=n[15],M=r[0],E=r[4],C=r[8],_=r[12],S=r[1],L=r[5],U=r[9],X=r[13],D=r[2],z=r[6],H=r[10],J=r[14],Q=r[3],tt=r[7],it=r[11],at=r[15];return s[0]=a*M+o*S+l*D+c*Q,s[4]=a*E+o*L+l*z+c*tt,s[8]=a*C+o*U+l*H+c*it,s[12]=a*_+o*X+l*J+c*at,s[1]=u*M+h*S+f*D+p*Q,s[5]=u*E+h*L+f*z+p*tt,s[9]=u*C+h*U+f*H+p*it,s[13]=u*_+h*X+f*J+p*at,s[2]=x*M+g*S+m*D+d*Q,s[6]=x*E+g*L+m*z+d*tt,s[10]=x*C+g*U+m*H+d*it,s[14]=x*_+g*X+m*J+d*at,s[3]=y*M+v*S+b*D+T*Q,s[7]=y*E+v*L+b*z+T*tt,s[11]=y*C+v*U+b*H+T*it,s[15]=y*_+v*X+b*J+T*at,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],p=t[14],x=t[3],g=t[7],m=t[11],d=t[15];return x*(+s*l*h-r*c*h-s*o*f+n*c*f+r*o*p-n*l*p)+g*(+e*l*p-e*c*f+s*a*f-r*a*p+r*c*u-s*l*u)+m*(+e*c*h-e*o*p-s*a*h+n*a*p+s*o*u-n*c*u)+d*(-r*o*u-e*l*h+e*o*f+r*a*h-n*a*f+n*l*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],p=t[11],x=t[12],g=t[13],m=t[14],d=t[15],y=h*m*c-g*f*c+g*l*p-o*m*p-h*l*d+o*f*d,v=x*f*c-u*m*c-x*l*p+a*m*p+u*l*d-a*f*d,b=u*g*c-x*h*c+x*o*p-a*g*p-u*o*d+a*h*d,T=x*h*l-u*g*l-x*o*f+a*g*f+u*o*m-a*h*m,M=e*y+n*v+r*b+s*T;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let E=1/M;return t[0]=y*E,t[1]=(g*f*s-h*m*s-g*r*p+n*m*p+h*r*d-n*f*d)*E,t[2]=(o*m*s-g*l*s+g*r*c-n*m*c-o*r*d+n*l*d)*E,t[3]=(h*l*s-o*f*s-h*r*c+n*f*c+o*r*p-n*l*p)*E,t[4]=v*E,t[5]=(u*m*s-x*f*s+x*r*p-e*m*p-u*r*d+e*f*d)*E,t[6]=(x*l*s-a*m*s-x*r*c+e*m*c+a*r*d-e*l*d)*E,t[7]=(a*f*s-u*l*s+u*r*c-e*f*c-a*r*p+e*l*p)*E,t[8]=b*E,t[9]=(x*h*s-u*g*s-x*n*p+e*g*p+u*n*d-e*h*d)*E,t[10]=(a*g*s-x*o*s+x*n*c-e*g*c-a*n*d+e*o*d)*E,t[11]=(u*o*s-a*h*s-u*n*c+e*h*c+a*n*p-e*o*p)*E,t[12]=T*E,t[13]=(u*g*r-x*h*r+x*n*f-e*g*f-u*n*m+e*h*m)*E,t[14]=(x*o*r-a*g*r-x*n*l+e*g*l+a*n*m-e*o*m)*E,t[15]=(a*h*r-u*o*r+u*n*l-e*h*l-a*n*f+e*o*f)*E,this}scale(t){let e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),r=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){let r=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,u=a+a,h=o+o,f=s*c,p=s*u,x=s*h,g=a*u,m=a*h,d=o*h,y=l*c,v=l*u,b=l*h,T=n.x,M=n.y,E=n.z;return r[0]=(1-(g+d))*T,r[1]=(p+b)*T,r[2]=(x-v)*T,r[3]=0,r[4]=(p-b)*M,r[5]=(1-(f+d))*M,r[6]=(m+y)*M,r[7]=0,r[8]=(x+v)*E,r[9]=(m-y)*E,r[10]=(1-(f+g))*E,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){let r=this.elements,s=cs.set(r[0],r[1],r[2]).length(),a=cs.set(r[4],r[5],r[6]).length(),o=cs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Yn.copy(this);let c=1/s,u=1/a,h=1/o;return Yn.elements[0]*=c,Yn.elements[1]*=c,Yn.elements[2]*=c,Yn.elements[4]*=u,Yn.elements[5]*=u,Yn.elements[6]*=u,Yn.elements[8]*=h,Yn.elements[9]*=h,Yn.elements[10]*=h,e.setFromRotationMatrix(Yn),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,r,s,a,o=Ri){let l=this.elements,c=2*s/(e-t),u=2*s/(n-r),h=(e+t)/(e-t),f=(n+r)/(n-r),p,x;if(o===Ri)p=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Jo)p=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,a,o=Ri){let l=this.elements,c=1/(e-t),u=1/(n-r),h=1/(a-s),f=(e+t)*c,p=(n+r)*u,x,g;if(o===Ri)x=(a+s)*h,g=-2*h;else if(o===Jo)x=s*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=g,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},cs=new V,Yn=new Te,dx=new V(0,0,0),px=new V(1,1,1),Yi=new V,Eo=new V,wn=new V,Gd=new Te,Wd=new fi,Ls=class i{constructor(t=0,e=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(nn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(nn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-nn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(nn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-nn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Gd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Gd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Wd.setFromEuler(this),this.setFromQuaternion(Wd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ls.DEFAULT_ORDER="XYZ";var il=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},mx=0,Xd=new V,us=new fi,Ei=new Te,To=new V,Ma=new V,gx=new V,_x=new fi,qd=new V(1,0,0),$d=new V(0,1,0),Yd=new V(0,0,1),xx={type:"added"},vx={type:"removed"},Ge=class i extends er{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mx++}),this.uuid=Bs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new V,e=new Ls,n=new fi,r=new V(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Te},normalMatrix:{value:new ne}}),this.matrix=new Te,this.matrixWorld=new Te,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new il,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return us.setFromAxisAngle(t,e),this.quaternion.multiply(us),this}rotateOnWorldAxis(t,e){return us.setFromAxisAngle(t,e),this.quaternion.premultiply(us),this}rotateX(t){return this.rotateOnAxis(qd,t)}rotateY(t){return this.rotateOnAxis($d,t)}rotateZ(t){return this.rotateOnAxis(Yd,t)}translateOnAxis(t,e){return Xd.copy(t).applyQuaternion(this.quaternion),this.position.add(Xd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(qd,t)}translateY(t){return this.translateOnAxis($d,t)}translateZ(t){return this.translateOnAxis(Yd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ei.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?To.copy(t):To.set(t,e,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Ma.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ei.lookAt(Ma,To,this.up):Ei.lookAt(To,Ma,this.up),this.quaternion.setFromRotationMatrix(Ei),r&&(Ei.extractRotation(r.matrixWorld),us.setFromRotationMatrix(Ei),this.quaternion.premultiply(us.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(xx)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(vx)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ei.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ei.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ei),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ma,t,gx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ma,_x,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,r=e.length;n<r;n++){let s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++){let o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),h=a(t.shapes),f=a(t.skeletons),p=a(t.animations),x=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),x.length>0&&(n.nodes=x)}return n.object=r,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let r=t.children[n];this.add(r.clone())}return this}};Ge.DEFAULT_UP=new V(0,1,0);Ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Zn=new V,Ti=new V,hu=new V,wi=new V,hs=new V,fs=new V,Zd=new V,fu=new V,du=new V,pu=new V,wo=!1,bs=class i{constructor(t=new V,e=new V,n=new V){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Zn.subVectors(t,e),r.cross(Zn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Zn.subVectors(r,e),Ti.subVectors(n,e),hu.subVectors(t,e);let a=Zn.dot(Zn),o=Zn.dot(Ti),l=Zn.dot(hu),c=Ti.dot(Ti),u=Ti.dot(hu),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;let f=1/h,p=(c*l-o*u)*f,x=(a*u-o*l)*f;return s.set(1-p-x,x,p)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,wi)===null?!1:wi.x>=0&&wi.y>=0&&wi.x+wi.y<=1}static getUV(t,e,n,r,s,a,o,l){return wo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),wo=!0),this.getInterpolation(t,e,n,r,s,a,o,l)}static getInterpolation(t,e,n,r,s,a,o,l){return this.getBarycoord(t,e,n,r,wi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,wi.x),l.addScaledVector(a,wi.y),l.addScaledVector(o,wi.z),l)}static isFrontFacing(t,e,n,r){return Zn.subVectors(n,e),Ti.subVectors(t,e),Zn.cross(Ti).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Zn.subVectors(this.c,this.b),Ti.subVectors(this.a,this.b),Zn.cross(Ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,r,s){return wo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),wo=!0),i.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}getInterpolation(t,e,n,r,s){return i.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,r=this.b,s=this.c,a,o;hs.subVectors(r,n),fs.subVectors(s,n),fu.subVectors(t,n);let l=hs.dot(fu),c=fs.dot(fu);if(l<=0&&c<=0)return e.copy(n);du.subVectors(t,r);let u=hs.dot(du),h=fs.dot(du);if(u>=0&&h<=u)return e.copy(r);let f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(hs,a);pu.subVectors(t,s);let p=hs.dot(pu),x=fs.dot(pu);if(x>=0&&p<=x)return e.copy(s);let g=p*c-l*x;if(g<=0&&c>=0&&x<=0)return o=c/(c-x),e.copy(n).addScaledVector(fs,o);let m=u*x-p*h;if(m<=0&&h-u>=0&&p-x>=0)return Zd.subVectors(s,r),o=(h-u)/(h-u+(p-x)),e.copy(r).addScaledVector(Zd,o);let d=1/(m+g+f);return a=g*d,o=f*d,e.copy(n).addScaledVector(hs,a).addScaledVector(fs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Xp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},Ao={h:0,s:0,l:0};function mu(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Rt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=le.workingColorSpace){return this.r=t,this.g=e,this.b=n,le.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=le.workingColorSpace){if(t=gh(t,1),e=nn(e,0,1),n=nn(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=mu(a,s,t+1/3),this.g=mu(a,s,t),this.b=mu(a,s,t-1/3)}return le.toWorkingColorSpace(this,r),this}setStyle(t,e=Fe){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Fe){let n=Xp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ws(t.r),this.g=ws(t.g),this.b=ws(t.b),this}copyLinearToSRGB(t){return this.r=iu(t.r),this.g=iu(t.g),this.b=iu(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fe){return le.fromWorkingColorSpace(en.copy(this),t),Math.round(nn(en.r*255,0,255))*65536+Math.round(nn(en.g*255,0,255))*256+Math.round(nn(en.b*255,0,255))}getHexString(t=Fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.fromWorkingColorSpace(en.copy(this),e);let n=en.r,r=en.g,s=en.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=le.workingColorSpace){return le.fromWorkingColorSpace(en.copy(this),e),t.r=en.r,t.g=en.g,t.b=en.b,t}getStyle(t=Fe){le.fromWorkingColorSpace(en.copy(this),t);let e=en.r,n=en.g,r=en.b;return t!==Fe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(Zi),this.setHSL(Zi.h+t,Zi.s+e,Zi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Zi),t.getHSL(Ao);let n=Aa(Zi.h,Ao.h,e),r=Aa(Zi.s,Ao.s,e),s=Aa(Zi.l,Ao.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},en=new Rt;Rt.NAMES=Xp;var yx=0,ir=class extends er{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yx++}),this.uuid=Bs(),this.name="",this.type="Material",this.blending=Ts,this.side=tr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wu,this.blendDst=Au,this.blendEquation=Dr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Rt(0,0,0),this.blendAlpha=0,this.depthFunc=Wo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=rs,this.stencilZFail=rs,this.stencilZPass=rs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ts&&(n.blending=this.blending),this.side!==tr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==wu&&(n.blendSrc=this.blendSrc),this.blendDst!==Au&&(n.blendDst=this.blendDst),this.blendEquation!==Dr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Wo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==rs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==rs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==rs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(e){let s=r(t.textures),a=r(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Qn=class extends ir{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Lp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var De=new V,Co=new zt,an=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Od,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ki,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Co.fromBufferAttribute(this,e),Co.applyMatrix3(t),this.setXY(e,Co.x,Co.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix3(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix4(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyNormalMatrix(t),this.setXYZ(e,De.x,De.y,De.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.transformDirection(t),this.setXYZ(e,De.x,De.y,De.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ms(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=hn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ms(e,this.array)),e}setX(t,e){return this.normalized&&(e=hn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ms(e,this.array)),e}setY(t,e){return this.normalized&&(e=hn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ms(e,this.array)),e}setZ(t,e){return this.normalized&&(e=hn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ms(e,this.array)),e}setW(t,e){return this.normalized&&(e=hn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=hn(e,this.array),n=hn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=hn(e,this.array),n=hn(n,this.array),r=hn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=hn(e,this.array),n=hn(n,this.array),r=hn(r,this.array),s=hn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Od&&(t.usage=this.usage),t}};var rl=class extends an{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var sl=class extends an{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var de=class extends an{constructor(t,e,n){super(new Float32Array(t),e,n)}};var Mx=0,Nn=new Te,gu=new Ge,ds=new V,An=new Ii,ba=new Ii,He=new V,Ze=class i extends er{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mx++}),this.uuid=Bs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Wp(t)?sl:rl)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new ne().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Nn.makeRotationFromQuaternion(t),this.applyMatrix4(Nn),this}rotateX(t){return Nn.makeRotationX(t),this.applyMatrix4(Nn),this}rotateY(t){return Nn.makeRotationY(t),this.applyMatrix4(Nn),this}rotateZ(t){return Nn.makeRotationZ(t),this.applyMatrix4(Nn),this}translate(t,e,n){return Nn.makeTranslation(t,e,n),this.applyMatrix4(Nn),this}scale(t,e,n){return Nn.makeScale(t,e,n),this.applyMatrix4(Nn),this}lookAt(t){return gu.lookAt(t),gu.updateMatrix(),this.applyMatrix4(gu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ds).negate(),this.translate(ds.x,ds.y,ds.z),this}setFromPoints(t){let e=[];for(let n=0,r=t.length;n<r;n++){let s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new de(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ii);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){let s=e[n];An.setFromBufferAttribute(s),this.morphTargetsRelative?(He.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(He),He.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(He)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nr);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new V,1/0);return}if(t){let n=this.boundingSphere.center;if(An.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){let o=e[s];ba.setFromBufferAttribute(o),this.morphTargetsRelative?(He.addVectors(An.min,ba.min),An.expandByPoint(He),He.addVectors(An.max,ba.max),An.expandByPoint(He)):(An.expandByPoint(ba.min),An.expandByPoint(ba.max))}An.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)He.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(He));if(e)for(let s=0,a=e.length;s<a;s++){let o=e[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)He.fromBufferAttribute(o,c),l&&(ds.fromBufferAttribute(t,c),He.add(ds)),r=Math.max(r,n.distanceToSquared(He))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,r=e.position.array,s=e.normal.array,a=e.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new an(new Float32Array(4*o),4));let l=this.getAttribute("tangent").array,c=[],u=[];for(let S=0;S<o;S++)c[S]=new V,u[S]=new V;let h=new V,f=new V,p=new V,x=new zt,g=new zt,m=new zt,d=new V,y=new V;function v(S,L,U){h.fromArray(r,S*3),f.fromArray(r,L*3),p.fromArray(r,U*3),x.fromArray(a,S*2),g.fromArray(a,L*2),m.fromArray(a,U*2),f.sub(h),p.sub(h),g.sub(x),m.sub(x);let X=1/(g.x*m.y-m.x*g.y);isFinite(X)&&(d.copy(f).multiplyScalar(m.y).addScaledVector(p,-g.y).multiplyScalar(X),y.copy(p).multiplyScalar(g.x).addScaledVector(f,-m.x).multiplyScalar(X),c[S].add(d),c[L].add(d),c[U].add(d),u[S].add(y),u[L].add(y),u[U].add(y))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let S=0,L=b.length;S<L;++S){let U=b[S],X=U.start,D=U.count;for(let z=X,H=X+D;z<H;z+=3)v(n[z+0],n[z+1],n[z+2])}let T=new V,M=new V,E=new V,C=new V;function _(S){E.fromArray(s,S*3),C.copy(E);let L=c[S];T.copy(L),T.sub(E.multiplyScalar(E.dot(L))).normalize(),M.crossVectors(C,L);let X=M.dot(u[S])<0?-1:1;l[S*4]=T.x,l[S*4+1]=T.y,l[S*4+2]=T.z,l[S*4+3]=X}for(let S=0,L=b.length;S<L;++S){let U=b[S],X=U.start,D=U.count;for(let z=X,H=X+D;z<H;z+=3)_(n[z+0]),_(n[z+1]),_(n[z+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new an(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);let r=new V,s=new V,a=new V,o=new V,l=new V,c=new V,u=new V,h=new V;if(t)for(let f=0,p=t.count;f<p;f+=3){let x=t.getX(f+0),g=t.getX(f+1),m=t.getX(f+2);r.fromBufferAttribute(e,x),s.fromBufferAttribute(e,g),a.fromBufferAttribute(e,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)He.fromBufferAttribute(t,e),He.normalize(),t.setXYZ(e,He.x,He.y,He.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u),p=0,x=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?p=l[g]*o.data.stride+o.offset:p=l[g]*u;for(let d=0;d<u;d++)f[x++]=c[p++]}return new an(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=t(l,n);e.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){let f=c[u],p=t(f,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){let p=c[h];u.push(p.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let r=t.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(e))}let s=t.morphAttributes;for(let c in s){let u=[],h=s[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,u=a.length;c<u;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Jd=new Te,Pr=new nl,Ro=new nr,Kd=new V,ps=new V,ms=new V,gs=new V,_u=new V,Po=new V,Lo=new zt,Io=new zt,Do=new zt,jd=new V,Qd=new V,tp=new V,Uo=new V,No=new V,Ot=class extends Ge{constructor(t=new Ze,e=new Qn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(r,t);let o=this.morphTargetInfluences;if(s&&o){Po.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],h=s[l];u!==0&&(_u.fromBufferAttribute(h,t),a?Po.addScaledVector(_u,u):Po.addScaledVector(_u.sub(e),u))}e.add(Po)}return e}raycast(t,e){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ro.copy(n.boundingSphere),Ro.applyMatrix4(s),Pr.copy(t.ray).recast(t.near),!(Ro.containsPoint(Pr.origin)===!1&&(Pr.intersectSphere(Ro,Kd)===null||Pr.origin.distanceToSquared(Kd)>(t.far-t.near)**2))&&(Jd.copy(s).invert(),Pr.copy(t.ray).applyMatrix4(Jd),!(n.boundingBox!==null&&Pr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Pr)))}_computeIntersections(t,e,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,g=f.length;x<g;x++){let m=f[x],d=a[m.materialIndex],y=Math.max(m.start,p.start),v=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let b=y,T=v;b<T;b+=3){let M=o.getX(b),E=o.getX(b+1),C=o.getX(b+2);r=Oo(this,d,t,n,c,u,h,M,E,C),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{let x=Math.max(0,p.start),g=Math.min(o.count,p.start+p.count);for(let m=x,d=g;m<d;m+=3){let y=o.getX(m),v=o.getX(m+1),b=o.getX(m+2);r=Oo(this,a,t,n,c,u,h,y,v,b),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,g=f.length;x<g;x++){let m=f[x],d=a[m.materialIndex],y=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let b=y,T=v;b<T;b+=3){let M=b,E=b+1,C=b+2;r=Oo(this,d,t,n,c,u,h,M,E,C),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{let x=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let m=x,d=g;m<d;m+=3){let y=m,v=m+1,b=m+2;r=Oo(this,a,t,n,c,u,h,y,v,b),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}};function bx(i,t,e,n,r,s,a,o){let l;if(t.side===sn?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,t.side===tr,o),l===null)return null;No.copy(o),No.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(No);return c<e.near||c>e.far?null:{distance:c,point:No.clone(),object:i}}function Oo(i,t,e,n,r,s,a,o,l,c){i.getVertexPosition(o,ps),i.getVertexPosition(l,ms),i.getVertexPosition(c,gs);let u=bx(i,t,e,n,ps,ms,gs,Uo);if(u){r&&(Lo.fromBufferAttribute(r,o),Io.fromBufferAttribute(r,l),Do.fromBufferAttribute(r,c),u.uv=bs.getInterpolation(Uo,ps,ms,gs,Lo,Io,Do,new zt)),s&&(Lo.fromBufferAttribute(s,o),Io.fromBufferAttribute(s,l),Do.fromBufferAttribute(s,c),u.uv1=bs.getInterpolation(Uo,ps,ms,gs,Lo,Io,Do,new zt),u.uv2=u.uv1),a&&(jd.fromBufferAttribute(a,o),Qd.fromBufferAttribute(a,l),tp.fromBufferAttribute(a,c),u.normal=bs.getInterpolation(Uo,ps,ms,gs,jd,Qd,tp,new V),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new V,materialIndex:0};bs.getNormal(ps,ms,gs,h.normal),u.face=h}return u}var zr=class i extends Ze{constructor(t=1,e=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],u=[],h=[],f=0,p=0;x("z","y","x",-1,-1,n,e,t,a,s,0),x("z","y","x",1,-1,n,e,-t,a,s,1),x("x","z","y",1,1,t,n,e,r,a,2),x("x","z","y",1,-1,t,n,-e,r,a,3),x("x","y","z",1,-1,t,e,n,r,s,4),x("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new de(c,3)),this.setAttribute("normal",new de(u,3)),this.setAttribute("uv",new de(h,2));function x(g,m,d,y,v,b,T,M,E,C,_){let S=b/E,L=T/C,U=b/2,X=T/2,D=M/2,z=E+1,H=C+1,J=0,Q=0,tt=new V;for(let it=0;it<H;it++){let at=it*L-X;for(let mt=0;mt<z;mt++){let K=mt*S-U;tt[g]=K*y,tt[m]=at*v,tt[d]=D,c.push(tt.x,tt.y,tt.z),tt[g]=0,tt[m]=0,tt[d]=M>0?1:-1,u.push(tt.x,tt.y,tt.z),h.push(mt/E),h.push(1-it/C),J+=1}}for(let it=0;it<C;it++)for(let at=0;at<E;at++){let mt=f+at+z*it,K=f+at+z*(it+1),nt=f+(at+1)+z*(it+1),F=f+(at+1)+z*it;l.push(mt,K,F),l.push(K,nt,F),Q+=6}o.addGroup(p,Q,_),p+=Q,f+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Is(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function fn(i){let t={};for(let e=0;e<i.length;e++){let n=Is(i[e]);for(let r in n)t[r]=n[r]}return t}function Sx(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function qp(i){return i.getRenderTarget()===null?i.outputColorSpace:le.workingColorSpace}var ar={clone:Is,merge:fn},Ex=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ue=class extends ir{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ex,this.fragmentShader=Tx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Is(t.uniforms),this.uniformsGroups=Sx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},al=class extends Ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Te,this.projectionMatrix=new Te,this.projectionMatrixInverse=new Te,this.coordinateSystem=Ri}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},rn=class extends al{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=La*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(wa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return La*2*Math.atan(Math.tan(wa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(wa*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,e-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},_s=-90,xs=1,Ou=class extends Ge{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new rn(_s,xs,t,e);r.layers=this.layers,this.add(r);let s=new rn(_s,xs,t,e);s.layers=this.layers,this.add(s);let a=new rn(_s,xs,t,e);a.layers=this.layers,this.add(a);let o=new rn(_s,xs,t,e);o.layers=this.layers,this.add(o);let l=new rn(_s,xs,t,e);l.layers=this.layers,this.add(l);let c=new rn(_s,xs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,r,s,a,o,l]=e;for(let c of e)this.remove(c);if(t===Ri)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Jo)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;let g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,a),t.setRenderTarget(n,2,r),t.render(e,o),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(h,f,p),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},ol=class extends zn{constructor(t,e,n,r,s,a,o,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Cs,super(t,e,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Fu=class extends pn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];e.encoding!==void 0&&(Ca("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Fr?Fe:Bn),this.texture=new ol(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:On}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new zr(5,5,5),s=new Ue({name:"CubemapFromEquirect",uniforms:Is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:sn,blending:hi});s.uniforms.tEquirect.value=e;let a=new Ot(r,s),o=e.minFilter;return e.minFilter===Pa&&(e.minFilter=On),new Ou(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,r){let s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,r);t.setRenderTarget(s)}},xu=new V,wx=new V,Ax=new ne,Ci=class{constructor(t=new V(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let r=xu.subVectors(n,e).cross(wx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(xu),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Ax.getNormalMatrix(t),r=this.coplanarPoint(xu).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Lr=new nr,Fo=new V,Ia=class{constructor(t=new Ci,e=new Ci,n=new Ci,r=new Ci,s=new Ci,a=new Ci){this.planes=[t,e,n,r,s,a]}set(t,e,n,r,s,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ri){let n=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],h=r[6],f=r[7],p=r[8],x=r[9],g=r[10],m=r[11],d=r[12],y=r[13],v=r[14],b=r[15];if(n[0].setComponents(l-s,f-c,m-p,b-d).normalize(),n[1].setComponents(l+s,f+c,m+p,b+d).normalize(),n[2].setComponents(l+a,f+u,m+x,b+y).normalize(),n[3].setComponents(l-a,f-u,m-x,b-y).normalize(),n[4].setComponents(l-o,f-h,m-g,b-v).normalize(),e===Ri)n[5].setComponents(l+o,f+h,m+g,b+v).normalize();else if(e===Jo)n[5].setComponents(o,h,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Lr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Lr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Lr)}intersectsSprite(t){return Lr.center.set(0,0,0),Lr.radius=.7071067811865476,Lr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Lr)}intersectsSphere(t){let e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let r=e[n];if(Fo.x=r.normal.x>0?t.max.x:t.min.x,Fo.y=r.normal.y>0?t.max.y:t.min.y,Fo.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Fo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function $p(){let i=null,t=!1,e=null,n=null;function r(s,a){e(s,a),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Cx(i,t){let e=t.isWebGL2,n=new WeakMap;function r(c,u){let h=c.array,f=c.usage,p=h.byteLength,x=i.createBuffer();i.bindBuffer(u,x),i.bufferData(u,h,f),c.onUploadCallback();let g;if(h instanceof Float32Array)g=i.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)g=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)g=i.SHORT;else if(h instanceof Uint32Array)g=i.UNSIGNED_INT;else if(h instanceof Int32Array)g=i.INT;else if(h instanceof Int8Array)g=i.BYTE;else if(h instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:x,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,u,h){let f=u.array,p=u._updateRange,x=u.updateRanges;if(i.bindBuffer(h,c),p.count===-1&&x.length===0&&i.bufferSubData(h,0,f),x.length!==0){for(let g=0,m=x.length;g<m;g++){let d=x[g];e?i.bufferSubData(h,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):i.bufferSubData(h,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}u.clearUpdateRanges()}p.count!==-1&&(e?i.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):i.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);let u=n.get(c);u&&(i.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){let f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let h=n.get(c);if(h===void 0)n.set(c,r(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,c,u),h.version=c.version}}return{get:a,remove:o,update:l}}var Bu=class i extends Ze{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};let s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,h=t/o,f=e/l,p=[],x=[],g=[],m=[];for(let d=0;d<u;d++){let y=d*f-a;for(let v=0;v<c;v++){let b=v*h-s;x.push(b,-y,0),g.push(0,0,1),m.push(v/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let y=0;y<o;y++){let v=y+c*d,b=y+c*(d+1),T=y+1+c*(d+1),M=y+1+c*d;p.push(v,b,M),p.push(b,T,M)}this.setIndex(p),this.setAttribute("position",new de(x,3)),this.setAttribute("normal",new de(g,3)),this.setAttribute("uv",new de(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Rx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Px=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Lx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ix=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dx=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ux=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ox=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fx=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Bx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,zx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Hx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Gx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Xx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$x=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Jx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Kx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,jx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Qx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,tv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ev=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,iv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sv="gl_FragColor = linearToOutputTexel( gl_FragColor );",av=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,ov=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,lv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,uv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,_v=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,xv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,bv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Sv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ev=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Av=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Cv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Rv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Pv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Lv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Iv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Uv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Nv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Ov=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Wv=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Xv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,qv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$v=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Yv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ty=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ey=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ny=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,iy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ry=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ay=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,oy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ly=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,hy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,fy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dy=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,py=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,my=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_y=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,My=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,by=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Sy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ey=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ty=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ay=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Cy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ry=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Py=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ly=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Iy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ny=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Oy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Fy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,By=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ky=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Gy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$y=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Zy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Jy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ky=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Qy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,t1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,e1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,i1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,r1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,a1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,o1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:Rx,alphahash_pars_fragment:Px,alphamap_fragment:Lx,alphamap_pars_fragment:Ix,alphatest_fragment:Dx,alphatest_pars_fragment:Ux,aomap_fragment:Nx,aomap_pars_fragment:Ox,batching_pars_vertex:Fx,batching_vertex:Bx,begin_vertex:zx,beginnormal_vertex:kx,bsdfs:Vx,iridescence_fragment:Hx,bumpmap_pars_fragment:Gx,clipping_planes_fragment:Wx,clipping_planes_pars_fragment:Xx,clipping_planes_pars_vertex:qx,clipping_planes_vertex:$x,color_fragment:Yx,color_pars_fragment:Zx,color_pars_vertex:Jx,color_vertex:Kx,common:jx,cube_uv_reflection_fragment:Qx,defaultnormal_vertex:tv,displacementmap_pars_vertex:ev,displacementmap_vertex:nv,emissivemap_fragment:iv,emissivemap_pars_fragment:rv,colorspace_fragment:sv,colorspace_pars_fragment:av,envmap_fragment:ov,envmap_common_pars_fragment:lv,envmap_pars_fragment:cv,envmap_pars_vertex:uv,envmap_physical_pars_fragment:bv,envmap_vertex:hv,fog_vertex:fv,fog_pars_vertex:dv,fog_fragment:pv,fog_pars_fragment:mv,gradientmap_pars_fragment:gv,lightmap_fragment:_v,lightmap_pars_fragment:xv,lights_lambert_fragment:vv,lights_lambert_pars_fragment:yv,lights_pars_begin:Mv,lights_toon_fragment:Sv,lights_toon_pars_fragment:Ev,lights_phong_fragment:Tv,lights_phong_pars_fragment:wv,lights_physical_fragment:Av,lights_physical_pars_fragment:Cv,lights_fragment_begin:Rv,lights_fragment_maps:Pv,lights_fragment_end:Lv,logdepthbuf_fragment:Iv,logdepthbuf_pars_fragment:Dv,logdepthbuf_pars_vertex:Uv,logdepthbuf_vertex:Nv,map_fragment:Ov,map_pars_fragment:Fv,map_particle_fragment:Bv,map_particle_pars_fragment:zv,metalnessmap_fragment:kv,metalnessmap_pars_fragment:Vv,morphcolor_vertex:Hv,morphnormal_vertex:Gv,morphtarget_pars_vertex:Wv,morphtarget_vertex:Xv,normal_fragment_begin:qv,normal_fragment_maps:$v,normal_pars_fragment:Yv,normal_pars_vertex:Zv,normal_vertex:Jv,normalmap_pars_fragment:Kv,clearcoat_normal_fragment_begin:jv,clearcoat_normal_fragment_maps:Qv,clearcoat_pars_fragment:ty,iridescence_pars_fragment:ey,opaque_fragment:ny,packing:iy,premultiplied_alpha_fragment:ry,project_vertex:sy,dithering_fragment:ay,dithering_pars_fragment:oy,roughnessmap_fragment:ly,roughnessmap_pars_fragment:cy,shadowmap_pars_fragment:uy,shadowmap_pars_vertex:hy,shadowmap_vertex:fy,shadowmask_pars_fragment:dy,skinbase_vertex:py,skinning_pars_vertex:my,skinning_vertex:gy,skinnormal_vertex:_y,specularmap_fragment:xy,specularmap_pars_fragment:vy,tonemapping_fragment:yy,tonemapping_pars_fragment:My,transmission_fragment:by,transmission_pars_fragment:Sy,uv_pars_fragment:Ey,uv_pars_vertex:Ty,uv_vertex:wy,worldpos_vertex:Ay,background_vert:Cy,background_frag:Ry,backgroundCube_vert:Py,backgroundCube_frag:Ly,cube_vert:Iy,cube_frag:Dy,depth_vert:Uy,depth_frag:Ny,distanceRGBA_vert:Oy,distanceRGBA_frag:Fy,equirect_vert:By,equirect_frag:zy,linedashed_vert:ky,linedashed_frag:Vy,meshbasic_vert:Hy,meshbasic_frag:Gy,meshlambert_vert:Wy,meshlambert_frag:Xy,meshmatcap_vert:qy,meshmatcap_frag:$y,meshnormal_vert:Yy,meshnormal_frag:Zy,meshphong_vert:Jy,meshphong_frag:Ky,meshphysical_vert:jy,meshphysical_frag:Qy,meshtoon_vert:t1,meshtoon_frag:e1,points_vert:n1,points_frag:i1,shadow_vert:r1,shadow_frag:s1,sprite_vert:a1,sprite_frag:o1},vt={common:{diffuse:{value:new Rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ne}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ne},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0},uvTransform:{value:new ne}},sprite:{diffuse:{value:new Rt(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}}},ui={basic:{uniforms:fn([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:fn([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Rt(0)}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:fn([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Rt(0)},specular:{value:new Rt(1118481)},shininess:{value:30}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:fn([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new Rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:fn([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new Rt(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:fn([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:fn([vt.points,vt.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:fn([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:fn([vt.common,vt.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:fn([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:fn([vt.sprite,vt.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distanceRGBA:{uniforms:fn([vt.common,vt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distanceRGBA_vert,fragmentShader:te.distanceRGBA_frag},shadow:{uniforms:fn([vt.lights,vt.fog,{color:{value:new Rt(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};ui.physical={uniforms:fn([ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ne},clearcoatNormalScale:{value:new zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ne},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ne},sheen:{value:0},sheenColor:{value:new Rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ne},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ne},attenuationDistance:{value:0},attenuationColor:{value:new Rt(0)},specularColor:{value:new Rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ne},anisotropyVector:{value:new zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ne}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};var Bo={r:0,b:0,g:0};function l1(i,t,e,n,r,s,a){let o=new Rt(0),l=s===!0?0:1,c,u,h=null,f=0,p=null;function x(m,d){let y=!1,v=d.isScene===!0?d.background:null;v&&v.isTexture&&(v=(d.backgroundBlurriness>0?e:t).get(v)),v===null?g(o,l):v&&v.isColor&&(g(v,1),y=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===yl)?(u===void 0&&(u=new Ot(new zr(1,1,1),new Ue({name:"BackgroundCubeMaterial",uniforms:Is(ui.backgroundCube.uniforms),vertexShader:ui.backgroundCube.vertexShader,fragmentShader:ui.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,M,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=le.getTransfer(v.colorSpace)!==fe,(h!==v||f!==v.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=v,f=v.version,p=i.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Ot(new Bu(2,2),new Ue({name:"BackgroundMaterial",uniforms:Is(ui.background.uniforms),vertexShader:ui.background.vertexShader,fragmentShader:ui.background.fragmentShader,side:tr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=le.getTransfer(v.colorSpace)!==fe,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,p=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function g(m,d){m.getRGB(Bo,qp(i)),n.buffers.color.setClear(Bo.r,Bo.g,Bo.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(m,d=1){o.set(m),l=d,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,g(o,l)},render:x}}function c1(i,t,e,n){let r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=m(null),c=l,u=!1;function h(D,z,H,J,Q){let tt=!1;if(a){let it=g(J,H,z);c!==it&&(c=it,p(c.object)),tt=d(D,J,H,Q),tt&&y(D,J,H,Q)}else{let it=z.wireframe===!0;(c.geometry!==J.id||c.program!==H.id||c.wireframe!==it)&&(c.geometry=J.id,c.program=H.id,c.wireframe=it,tt=!0)}Q!==null&&e.update(Q,i.ELEMENT_ARRAY_BUFFER),(tt||u)&&(u=!1,C(D,z,H,J),Q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function f(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function p(D){return n.isWebGL2?i.bindVertexArray(D):s.bindVertexArrayOES(D)}function x(D){return n.isWebGL2?i.deleteVertexArray(D):s.deleteVertexArrayOES(D)}function g(D,z,H){let J=H.wireframe===!0,Q=o[D.id];Q===void 0&&(Q={},o[D.id]=Q);let tt=Q[z.id];tt===void 0&&(tt={},Q[z.id]=tt);let it=tt[J];return it===void 0&&(it=m(f()),tt[J]=it),it}function m(D){let z=[],H=[],J=[];for(let Q=0;Q<r;Q++)z[Q]=0,H[Q]=0,J[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:H,attributeDivisors:J,object:D,attributes:{},index:null}}function d(D,z,H,J){let Q=c.attributes,tt=z.attributes,it=0,at=H.getAttributes();for(let mt in at)if(at[mt].location>=0){let nt=Q[mt],F=tt[mt];if(F===void 0&&(mt==="instanceMatrix"&&D.instanceMatrix&&(F=D.instanceMatrix),mt==="instanceColor"&&D.instanceColor&&(F=D.instanceColor)),nt===void 0||nt.attribute!==F||F&&nt.data!==F.data)return!0;it++}return c.attributesNum!==it||c.index!==J}function y(D,z,H,J){let Q={},tt=z.attributes,it=0,at=H.getAttributes();for(let mt in at)if(at[mt].location>=0){let nt=tt[mt];nt===void 0&&(mt==="instanceMatrix"&&D.instanceMatrix&&(nt=D.instanceMatrix),mt==="instanceColor"&&D.instanceColor&&(nt=D.instanceColor));let F={};F.attribute=nt,nt&&nt.data&&(F.data=nt.data),Q[mt]=F,it++}c.attributes=Q,c.attributesNum=it,c.index=J}function v(){let D=c.newAttributes;for(let z=0,H=D.length;z<H;z++)D[z]=0}function b(D){T(D,0)}function T(D,z){let H=c.newAttributes,J=c.enabledAttributes,Q=c.attributeDivisors;H[D]=1,J[D]===0&&(i.enableVertexAttribArray(D),J[D]=1),Q[D]!==z&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,z),Q[D]=z)}function M(){let D=c.newAttributes,z=c.enabledAttributes;for(let H=0,J=z.length;H<J;H++)z[H]!==D[H]&&(i.disableVertexAttribArray(H),z[H]=0)}function E(D,z,H,J,Q,tt,it){it===!0?i.vertexAttribIPointer(D,z,H,Q,tt):i.vertexAttribPointer(D,z,H,J,Q,tt)}function C(D,z,H,J){if(n.isWebGL2===!1&&(D.isInstancedMesh||J.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();let Q=J.attributes,tt=H.getAttributes(),it=z.defaultAttributeValues;for(let at in tt){let mt=tt[at];if(mt.location>=0){let K=Q[at];if(K===void 0&&(at==="instanceMatrix"&&D.instanceMatrix&&(K=D.instanceMatrix),at==="instanceColor"&&D.instanceColor&&(K=D.instanceColor)),K!==void 0){let nt=K.normalized,F=K.itemSize,w=e.get(K);if(w===void 0)continue;let I=w.buffer,N=w.type,k=w.bytesPerElement,$=n.isWebGL2===!0&&(N===i.INT||N===i.UNSIGNED_INT||K.gpuType===Dp);if(K.isInterleavedBufferAttribute){let st=K.data,O=st.stride,Tt=K.offset;if(st.isInstancedInterleavedBuffer){for(let dt=0;dt<mt.locationSize;dt++)T(mt.location+dt,st.meshPerAttribute);D.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let dt=0;dt<mt.locationSize;dt++)b(mt.location+dt);i.bindBuffer(i.ARRAY_BUFFER,I);for(let dt=0;dt<mt.locationSize;dt++)E(mt.location+dt,F/mt.locationSize,N,nt,O*k,(Tt+F/mt.locationSize*dt)*k,$)}else{if(K.isInstancedBufferAttribute){for(let st=0;st<mt.locationSize;st++)T(mt.location+st,K.meshPerAttribute);D.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let st=0;st<mt.locationSize;st++)b(mt.location+st);i.bindBuffer(i.ARRAY_BUFFER,I);for(let st=0;st<mt.locationSize;st++)E(mt.location+st,F/mt.locationSize,N,nt,F*k,F/mt.locationSize*st*k,$)}}else if(it!==void 0){let nt=it[at];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv(mt.location,nt);break;case 3:i.vertexAttrib3fv(mt.location,nt);break;case 4:i.vertexAttrib4fv(mt.location,nt);break;default:i.vertexAttrib1fv(mt.location,nt)}}}}M()}function _(){U();for(let D in o){let z=o[D];for(let H in z){let J=z[H];for(let Q in J)x(J[Q].object),delete J[Q];delete z[H]}delete o[D]}}function S(D){if(o[D.id]===void 0)return;let z=o[D.id];for(let H in z){let J=z[H];for(let Q in J)x(J[Q].object),delete J[Q];delete z[H]}delete o[D.id]}function L(D){for(let z in o){let H=o[z];if(H[D.id]===void 0)continue;let J=H[D.id];for(let Q in J)x(J[Q].object),delete J[Q];delete H[D.id]}}function U(){X(),u=!0,c!==l&&(c=l,p(c.object))}function X(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:U,resetDefaultState:X,dispose:_,releaseStatesOfGeometry:S,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:b,disableUnusedAttributes:M}}function u1(i,t,e,n){let r=n.isWebGL2,s;function a(u){s=u}function o(u,h){i.drawArrays(s,u,h),e.update(h,s,1)}function l(u,h,f){if(f===0)return;let p,x;if(r)p=i,x="drawArraysInstanced";else if(p=t.get("ANGLE_instanced_arrays"),x="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[x](s,u,h,f),e.update(h,s,f)}function c(u,h,f){if(f===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<f;x++)this.render(u[x],h[x]);else{p.multiDrawArraysWEBGL(s,u,0,h,0,f);let x=0;for(let g=0;g<f;g++)x+=h[g];e.update(x,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function h1(i,t,e){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let E=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",o=e.precision!==void 0?e.precision:"highp",l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);let c=a||t.has("WEBGL_draw_buffers"),u=e.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),d=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,b=a||t.has("OES_texture_float"),T=v&&b,M=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:y,vertexTextures:v,floatFragmentTextures:b,floatVertexTextures:T,maxSamples:M}}function f1(i){let t=this,e=null,n=0,r=!1,s=!1,a=new Ci,o=new ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let p=h.length!==0||f||n!==0||r;return r=f,n=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,p){let x=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,d=i.get(h);if(!r||x===null||x.length===0||s&&!m)s?u(null):c();else{let y=s?0:n,v=y*4,b=d.clippingState||null;l.value=b,b=u(x,f,v,p);for(let T=0;T!==v;++T)b[T]=e[T];d.clippingState=b,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,p,x){let g=h!==null?h.length:0,m=null;if(g!==0){if(m=l.value,x!==!0||m===null){let d=p+g*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<d)&&(m=new Float32Array(d));for(let v=0,b=p;v!==g;++v,b+=4)a.copy(h[v]).applyMatrix4(y,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function d1(i){let t=new WeakMap;function e(a,o){return o===Cu?a.mapping=Cs:o===Ru&&(a.mapping=Rs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Cu||o===Ru)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Fu(l.height/2);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",r),e(c.texture,a.mapping)}else return null}}return a}function r(a){let o=a.target;o.removeEventListener("dispose",r);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}var Ds=class extends al{constructor(t=-1,e=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-t,a=n+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ss=4,ep=[.125,.215,.35,.446,.526,.582],Ur=20,vu=new Ds,np=new Rt,yu=null,Mu=0,bu=0,Ir=(1+Math.sqrt(5))/2,vs=1/Ir,ip=[new V(1,1,1),new V(-1,1,1),new V(1,1,-1),new V(-1,1,-1),new V(0,Ir,vs),new V(0,Ir,-vs),new V(vs,0,Ir),new V(-vs,0,Ir),new V(Ir,vs,0),new V(-Ir,vs,0)],Us=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){yu=this._renderer.getRenderTarget(),Mu=this._renderer.getActiveCubeFace(),bu=this._renderer.getActiveMipmapLevel(),this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ap(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(yu,Mu,bu),t.scissorTest=!1,zo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Cs||t.mapping===Rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),yu=this._renderer.getRenderTarget(),Mu=this._renderer.getActiveCubeFace(),bu=this._renderer.getActiveMipmapLevel();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:On,minFilter:On,generateMipmaps:!1,type:jn,format:Kn,colorSpace:Li,depthBuffer:!1},r=rp(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=rp(t,e,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=p1(s)),this._blurMaterial=m1(s,t,e)}return r}_compileMaterial(t){let e=new Ot(this._lodPlanes[0],t);this._renderer.compile(e,vu)}_sceneToCubeUV(t,e,n,r){let o=new rn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(np),u.toneMapping=ji,u.autoClear=!1;let p=new Qn({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1}),x=new Ot(new zr,p),g=!1,m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,g=!0):(p.color.copy(np),g=!0);for(let d=0;d<6;d++){let y=d%3;y===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):y===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));let v=this._cubeSize;zo(r,y*v,d>2?v:0,v,v),u.setRenderTarget(r),g&&u.render(x,o),u.render(t,o)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,r=t.mapping===Cs||t.mapping===Rs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ap()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sp());let s=r?this._cubemapMaterial:this._equirectMaterial,a=new Ot(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;let l=this._cubeSize;zo(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,vu)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){let s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=ip[(r-1)%ip.length];this._blur(t,r-1,r,s,a)}e.autoClear=n}_blur(t,e,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,r,"latitudinal",s),this._halfBlur(a,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Ot(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[n]-1,x=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ur-1),g=s/x,m=isFinite(s)?1+Math.floor(u*g):Ur;m>Ur&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ur}`);let d=[],y=0;for(let E=0;E<Ur;++E){let C=E/g,_=Math.exp(-C*C/2);d.push(_),E===0?y+=_:E<m&&(y+=2*_)}for(let E=0;E<d.length;E++)d[E]=d[E]/y;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:v}=this;f.dTheta.value=x,f.mipInt.value=v-n;let b=this._sizeLods[r],T=3*b*(r>v-Ss?r-v+Ss:0),M=4*(this._cubeSize-b);zo(e,T,M,3*b,2*b),l.setRenderTarget(e),l.render(h,vu)}};function p1(i){let t=[],e=[],n=[],r=i,s=i-Ss+1+ep.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);e.push(o);let l=1/o;a>i-Ss?l=ep[a-i+Ss-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,x=6,g=3,m=2,d=1,y=new Float32Array(g*x*p),v=new Float32Array(m*x*p),b=new Float32Array(d*x*p);for(let M=0;M<p;M++){let E=M%3*2/3-1,C=M>2?0:-1,_=[E,C,0,E+2/3,C,0,E+2/3,C+1,0,E,C,0,E+2/3,C+1,0,E,C+1,0];y.set(_,g*x*M),v.set(f,m*x*M);let S=[M,M,M,M,M,M];b.set(S,d*x*M)}let T=new Ze;T.setAttribute("position",new an(y,g)),T.setAttribute("uv",new an(v,m)),T.setAttribute("faceIndex",new an(b,d)),t.push(T),r>Ss&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function rp(i,t,e){let n=new pn(i,t,e);return n.texture.mapping=yl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zo(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function m1(i,t,e){let n=new Float32Array(Ur),r=new V(0,1,0);return new Ue({name:"SphericalGaussianBlur",defines:{n:Ur,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:_h(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function sp(){return new Ue({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_h(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function ap(){return new Ue({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_h(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function _h(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function g1(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Cu||l===Ru,u=l===Cs||l===Rs;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=t.get(o);return e===null&&(e=new Us(i)),h=c?e.fromEquirectangular(o,h):e.fromCubemap(o,h),t.set(o,h),h.texture}else{if(t.has(o))return t.get(o).texture;{let h=o.image;if(c&&h&&h.height>0||u&&h&&r(h)){e===null&&(e=new Us(i));let f=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,f),o.addEventListener("dispose",s),f.texture}else return null}}}return o}function r(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function _1(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let r=e(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function x1(i,t,e,n){let r={},s=new WeakMap;function a(h){let f=h.target;f.index!==null&&t.remove(f.index);for(let x in f.attributes)t.remove(f.attributes[x]);for(let x in f.morphAttributes){let g=f.morphAttributes[x];for(let m=0,d=g.length;m<d;m++)t.remove(g[m])}f.removeEventListener("dispose",a),delete r[f.id];let p=s.get(f);p&&(t.remove(p),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,e.memory.geometries++),f}function l(h){let f=h.attributes;for(let x in f)t.update(f[x],i.ARRAY_BUFFER);let p=h.morphAttributes;for(let x in p){let g=p[x];for(let m=0,d=g.length;m<d;m++)t.update(g[m],i.ARRAY_BUFFER)}}function c(h){let f=[],p=h.index,x=h.attributes.position,g=0;if(p!==null){let y=p.array;g=p.version;for(let v=0,b=y.length;v<b;v+=3){let T=y[v+0],M=y[v+1],E=y[v+2];f.push(T,M,M,E,E,T)}}else if(x!==void 0){let y=x.array;g=x.version;for(let v=0,b=y.length/3-1;v<b;v+=3){let T=v+0,M=v+1,E=v+2;f.push(T,M,M,E,E,T)}}else return;let m=new(Wp(f)?sl:rl)(f,1);m.version=g;let d=s.get(h);d&&t.remove(d),s.set(h,m)}function u(h){let f=s.get(h);if(f){let p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function v1(i,t,e,n){let r=n.isWebGL2,s;function a(p){s=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function u(p,x){i.drawElements(s,x,o,p*l),e.update(x,s,1)}function h(p,x,g){if(g===0)return;let m,d;if(r)m=i,d="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](s,x,o,p*l,g),e.update(x,s,g)}function f(p,x,g){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<g;d++)this.render(p[d]/l,x[d]);else{m.multiDrawElementsWEBGL(s,x,0,o,p,0,g);let d=0;for(let y=0;y<g;y++)d+=x[y];e.update(d,s,1)}}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function y1(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(s/3);break;case i.LINES:e.lines+=o*(s/2);break;case i.LINE_STRIP:e.lines+=o*(s-1);break;case i.LINE_LOOP:e.lines+=o*s;break;case i.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function M1(i,t){return i[0]-t[0]}function b1(i,t){return Math.abs(t[1])-Math.abs(i[1])}function S1(i,t,e){let n={},r=new Float32Array(8),s=new WeakMap,a=new be,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h){let f=c.morphTargetInfluences;if(t.isWebGL2===!0){let p=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,x=p!==void 0?p.length:0,g=s.get(u);if(g===void 0||g.count!==x){let D=function(){U.dispose(),s.delete(u),u.removeEventListener("dispose",D)};g!==void 0&&g.texture.dispose();let y=u.morphAttributes.position!==void 0,v=u.morphAttributes.normal!==void 0,b=u.morphAttributes.color!==void 0,T=u.morphAttributes.position||[],M=u.morphAttributes.normal||[],E=u.morphAttributes.color||[],C=0;y===!0&&(C=1),v===!0&&(C=2),b===!0&&(C=3);let _=u.attributes.position.count*C,S=1;_>t.maxTextureSize&&(S=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let L=new Float32Array(_*S*4*x),U=new el(L,_,S,x);U.type=Ki,U.needsUpdate=!0;let X=C*4;for(let z=0;z<x;z++){let H=T[z],J=M[z],Q=E[z],tt=_*S*4*z;for(let it=0;it<H.count;it++){let at=it*X;y===!0&&(a.fromBufferAttribute(H,it),L[tt+at+0]=a.x,L[tt+at+1]=a.y,L[tt+at+2]=a.z,L[tt+at+3]=0),v===!0&&(a.fromBufferAttribute(J,it),L[tt+at+4]=a.x,L[tt+at+5]=a.y,L[tt+at+6]=a.z,L[tt+at+7]=0),b===!0&&(a.fromBufferAttribute(Q,it),L[tt+at+8]=a.x,L[tt+at+9]=a.y,L[tt+at+10]=a.z,L[tt+at+11]=Q.itemSize===4?a.w:1)}}g={count:x,texture:U,size:new zt(_,S)},s.set(u,g),u.addEventListener("dispose",D)}let m=0;for(let y=0;y<f.length;y++)m+=f[y];let d=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(i,"morphTargetBaseInfluence",d),h.getUniforms().setValue(i,"morphTargetInfluences",f),h.getUniforms().setValue(i,"morphTargetsTexture",g.texture,e),h.getUniforms().setValue(i,"morphTargetsTextureSize",g.size)}else{let p=f===void 0?0:f.length,x=n[u.id];if(x===void 0||x.length!==p){x=[];for(let v=0;v<p;v++)x[v]=[v,0];n[u.id]=x}for(let v=0;v<p;v++){let b=x[v];b[0]=v,b[1]=f[v]}x.sort(b1);for(let v=0;v<8;v++)v<p&&x[v][1]?(o[v][0]=x[v][0],o[v][1]=x[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(M1);let g=u.morphAttributes.position,m=u.morphAttributes.normal,d=0;for(let v=0;v<8;v++){let b=o[v],T=b[0],M=b[1];T!==Number.MAX_SAFE_INTEGER&&M?(g&&u.getAttribute("morphTarget"+v)!==g[T]&&u.setAttribute("morphTarget"+v,g[T]),m&&u.getAttribute("morphNormal"+v)!==m[T]&&u.setAttribute("morphNormal"+v,m[T]),r[v]=M,d+=M):(g&&u.hasAttribute("morphTarget"+v)===!0&&u.deleteAttribute("morphTarget"+v),m&&u.hasAttribute("morphNormal"+v)===!0&&u.deleteAttribute("morphNormal"+v),r[v]=0)}let y=u.morphTargetsRelative?1:1-d;h.getUniforms().setValue(i,"morphTargetBaseInfluence",y),h.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function E1(i,t,e,n){let r=new WeakMap;function s(l){let c=n.render.frame,u=l.geometry,h=t.get(l,u);if(r.get(h)!==c&&(t.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function a(){r=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}var ll=class extends zn{constructor(t,e,n,r,s,a,o,l,c,u){if(u=u!==void 0?u:Or,u!==Or&&u!==Ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Or&&(n=Ji),n===void 0&&u===Ps&&(n=Nr),super(null,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:dn,this.minFilter=l!==void 0?l:dn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Yp=new zn,Zp=new ll(1,1);Zp.compareFunction=Hp;var Jp=new el,Kp=new Nu,jp=new ol,op=[],lp=[],cp=new Float32Array(16),up=new Float32Array(9),hp=new Float32Array(4);function zs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let r=t*e,s=op[r];if(s===void 0&&(s=new Float32Array(r),op[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(s,o)}return s}function Be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ze(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function bl(i,t){let e=lp[t];e===void 0&&(e=new Int32Array(t),lp[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function T1(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function w1(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2fv(this.addr,t),ze(e,t)}}function A1(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;i.uniform3fv(this.addr,t),ze(e,t)}}function C1(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4fv(this.addr,t),ze(e,t)}}function R1(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;hp.set(n),i.uniformMatrix2fv(this.addr,!1,hp),ze(e,n)}}function P1(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;up.set(n),i.uniformMatrix3fv(this.addr,!1,up),ze(e,n)}}function L1(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;cp.set(n),i.uniformMatrix4fv(this.addr,!1,cp),ze(e,n)}}function I1(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function D1(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2iv(this.addr,t),ze(e,t)}}function U1(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;i.uniform3iv(this.addr,t),ze(e,t)}}function N1(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4iv(this.addr,t),ze(e,t)}}function O1(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function F1(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2uiv(this.addr,t),ze(e,t)}}function B1(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;i.uniform3uiv(this.addr,t),ze(e,t)}}function z1(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4uiv(this.addr,t),ze(e,t)}}function k1(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s=this.type===i.SAMPLER_2D_SHADOW?Zp:Yp;e.setTexture2D(t||s,r)}function V1(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Kp,r)}function H1(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||jp,r)}function G1(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||Jp,r)}function W1(i){switch(i){case 5126:return T1;case 35664:return w1;case 35665:return A1;case 35666:return C1;case 35674:return R1;case 35675:return P1;case 35676:return L1;case 5124:case 35670:return I1;case 35667:case 35671:return D1;case 35668:case 35672:return U1;case 35669:case 35673:return N1;case 5125:return O1;case 36294:return F1;case 36295:return B1;case 36296:return z1;case 35678:case 36198:case 36298:case 36306:case 35682:return k1;case 35679:case 36299:case 36307:return V1;case 35680:case 36300:case 36308:case 36293:return H1;case 36289:case 36303:case 36311:case 36292:return G1}}function X1(i,t){i.uniform1fv(this.addr,t)}function q1(i,t){let e=zs(t,this.size,2);i.uniform2fv(this.addr,e)}function $1(i,t){let e=zs(t,this.size,3);i.uniform3fv(this.addr,e)}function Y1(i,t){let e=zs(t,this.size,4);i.uniform4fv(this.addr,e)}function Z1(i,t){let e=zs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function J1(i,t){let e=zs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function K1(i,t){let e=zs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function j1(i,t){i.uniform1iv(this.addr,t)}function Q1(i,t){i.uniform2iv(this.addr,t)}function tM(i,t){i.uniform3iv(this.addr,t)}function eM(i,t){i.uniform4iv(this.addr,t)}function nM(i,t){i.uniform1uiv(this.addr,t)}function iM(i,t){i.uniform2uiv(this.addr,t)}function rM(i,t){i.uniform3uiv(this.addr,t)}function sM(i,t){i.uniform4uiv(this.addr,t)}function aM(i,t,e){let n=this.cache,r=t.length,s=bl(e,r);Be(n,s)||(i.uniform1iv(this.addr,s),ze(n,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||Yp,s[a])}function oM(i,t,e){let n=this.cache,r=t.length,s=bl(e,r);Be(n,s)||(i.uniform1iv(this.addr,s),ze(n,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||Kp,s[a])}function lM(i,t,e){let n=this.cache,r=t.length,s=bl(e,r);Be(n,s)||(i.uniform1iv(this.addr,s),ze(n,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||jp,s[a])}function cM(i,t,e){let n=this.cache,r=t.length,s=bl(e,r);Be(n,s)||(i.uniform1iv(this.addr,s),ze(n,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||Jp,s[a])}function uM(i){switch(i){case 5126:return X1;case 35664:return q1;case 35665:return $1;case 35666:return Y1;case 35674:return Z1;case 35675:return J1;case 35676:return K1;case 5124:case 35670:return j1;case 35667:case 35671:return Q1;case 35668:case 35672:return tM;case 35669:case 35673:return eM;case 5125:return nM;case 36294:return iM;case 36295:return rM;case 36296:return sM;case 35678:case 36198:case 36298:case 36306:case 35682:return aM;case 35679:case 36299:case 36307:return oM;case 35680:case 36300:case 36308:case 36293:return lM;case 36289:case 36303:case 36311:case 36292:return cM}}var zu=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=W1(e.type)}},ku=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=uM(e.type)}},Vu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(t,e[o.id],n)}}},Su=/(\w+)(\])?(\[|\.)?/g;function fp(i,t){i.seq.push(t),i.map[t.id]=t}function hM(i,t,e){let n=i.name,r=n.length;for(Su.lastIndex=0;;){let s=Su.exec(n),a=Su.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){fp(e,c===void 0?new zu(o,i,t):new ku(o,i,t));break}else{let h=e.map[o];h===void 0&&(h=new Vu(o),fp(e,h)),e=h}}}var As=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);hM(s,a,this)}}setValue(t,e,n,r){let s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){let r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,a=e.length;s!==a;++s){let o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){let n=[];for(let r=0,s=t.length;r!==s;++r){let a=t[r];a.id in e&&n.push(a)}return n}};function dp(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var fM=37297,dM=0;function pM(i,t){let e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function mM(i){let t=le.getPrimaries(le.workingColorSpace),e=le.getPrimaries(i),n;switch(t===e?n="":t===Zo&&e===Yo?n="LinearDisplayP3ToLinearSRGB":t===Yo&&e===Zo&&(n="LinearSRGBToLinearDisplayP3"),i){case Li:case Ml:return[n,"LinearTransferOETF"];case Fe:case mh:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function pp(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+pM(i.getShaderSource(t),a)}else return r}function gM(i,t){let e=mM(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function _M(i,t){let e;switch(t){case uh:e="Linear";break;case hh:e="Reinhard";break;case fh:e="OptimizedCineon";break;case Ba:e="ACESFilmic";break;case dh:e="AgX";break;case C_:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function xM(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Es).join(`
`)}function vM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Es).join(`
`)}function yM(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function MM(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(t,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Es(i){return i!==""}function mp(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function gp(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var bM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hu(i){return i.replace(bM,EM)}var SM=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function EM(i,t){let e=te[t];if(e===void 0){let n=SM.get(t);if(n!==void 0)e=te[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Hu(e)}var TM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _p(i){return i.replace(TM,wM)}function wM(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function xp(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function AM(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Pp?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===n_?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ai&&(t="SHADOWMAP_TYPE_VSM"),t}function CM(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Cs:case Rs:t="ENVMAP_TYPE_CUBE";break;case yl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function RM(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Rs:t="ENVMAP_MODE_REFRACTION";break}return t}function PM(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Lp:t="ENVMAP_BLENDING_MULTIPLY";break;case w_:t="ENVMAP_BLENDING_MIX";break;case A_:t="ENVMAP_BLENDING_ADD";break}return t}function LM(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function IM(i,t,e,n){let r=i.getContext(),s=e.defines,a=e.vertexShader,o=e.fragmentShader,l=AM(e),c=CM(e),u=RM(e),h=PM(e),f=LM(e),p=e.isWebGL2?"":xM(e),x=vM(e),g=yM(s),m=r.createProgram(),d,y,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Es).join(`
`),d.length>0&&(d+=`
`),y=[p,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Es).join(`
`),y.length>0&&(y+=`
`)):(d=[xp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Es).join(`
`),y=[p,xp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ji?"#define TONE_MAPPING":"",e.toneMapping!==ji?te.tonemapping_pars_fragment:"",e.toneMapping!==ji?_M("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,gM("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Es).join(`
`)),a=Hu(a),a=mp(a,e),a=gp(a,e),o=Hu(o),o=mp(o,e),o=gp(o,e),a=_p(a),o=_p(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,d=[x,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,y=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Fd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Fd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);let b=v+d+a,T=v+y+o,M=dp(r,r.VERTEX_SHADER,b),E=dp(r,r.FRAGMENT_SHADER,T);r.attachShader(m,M),r.attachShader(m,E),e.index0AttributeName!==void 0?r.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function C(U){if(i.debug.checkShaderErrors){let X=r.getProgramInfoLog(m).trim(),D=r.getShaderInfoLog(M).trim(),z=r.getShaderInfoLog(E).trim(),H=!0,J=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,m,M,E);else{let Q=pp(r,M,"vertex"),tt=pp(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+X+`
`+Q+`
`+tt)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(D===""||z==="")&&(J=!1);J&&(U.diagnostics={runnable:H,programLog:X,vertexShader:{log:D,prefix:d},fragmentShader:{log:z,prefix:y}})}r.deleteShader(M),r.deleteShader(E),_=new As(r,m),S=MM(r,m)}let _;this.getUniforms=function(){return _===void 0&&C(this),_};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(m,fM)),L},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=dM++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=M,this.fragmentShader=E,this}var DM=0,Gu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Wu(t),e.set(t,n)),n}},Wu=class{constructor(t){this.id=DM++,this.code=t,this.usedTimes=0}};function UM(i,t,e,n,r,s,a){let o=new il,l=new Gu,c=[],u=r.isWebGL2,h=r.logarithmicDepthBuffer,f=r.vertexTextures,p=r.precision,x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return _===0?"uv":`uv${_}`}function m(_,S,L,U,X){let D=U.fog,z=X.geometry,H=_.isMeshStandardMaterial?U.environment:null,J=(_.isMeshStandardMaterial?e:t).get(_.envMap||H),Q=J&&J.mapping===yl?J.image.height:null,tt=x[_.type];_.precision!==null&&(p=r.getMaxPrecision(_.precision),p!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",p,"instead."));let it=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,at=it!==void 0?it.length:0,mt=0;z.morphAttributes.position!==void 0&&(mt=1),z.morphAttributes.normal!==void 0&&(mt=2),z.morphAttributes.color!==void 0&&(mt=3);let K,nt,F,w;if(tt){let Le=ui[tt];K=Le.vertexShader,nt=Le.fragmentShader}else K=_.vertexShader,nt=_.fragmentShader,l.update(_),F=l.getVertexShaderID(_),w=l.getFragmentShaderID(_);let I=i.getRenderTarget(),N=X.isInstancedMesh===!0,k=X.isBatchedMesh===!0,$=!!_.map,st=!!_.matcap,O=!!J,Tt=!!_.aoMap,dt=!!_.lightMap,et=!!_.bumpMap,pt=!!_.normalMap,Yt=!!_.displacementMap,Xt=!!_.emissiveMap,P=!!_.metalnessMap,A=!!_.roughnessMap,q=_.anisotropy>0,ot=_.clearcoat>0,ht=_.iridescence>0,ft=_.sheen>0,Pt=_.transmission>0,Mt=q&&!!_.anisotropyMap,At=ot&&!!_.clearcoatMap,Nt=ot&&!!_.clearcoatNormalMap,Zt=ot&&!!_.clearcoatRoughnessMap,lt=ht&&!!_.iridescenceMap,se=ht&&!!_.iridescenceThicknessMap,Jt=ft&&!!_.sheenColorMap,Ht=ft&&!!_.sheenRoughnessMap,Dt=!!_.specularMap,Ct=!!_.specularColorMap,qt=!!_.specularIntensityMap,ae=Pt&&!!_.transmissionMap,_e=Pt&&!!_.thicknessMap,jt=!!_.gradientMap,xt=!!_.alphaMap,B=_.alphaTest>0,bt=!!_.alphaHash,yt=!!_.extensions,kt=!!z.attributes.uv1,Ft=!!z.attributes.uv2,ce=!!z.attributes.uv3,ue=ji;return _.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ue=i.toneMapping),{isWebGL2:u,shaderID:tt,shaderType:_.type,shaderName:_.name,vertexShader:K,fragmentShader:nt,defines:_.defines,customVertexShaderID:F,customFragmentShaderID:w,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:p,batching:k,instancing:N,instancingColor:N&&X.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:I===null?i.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Li,map:$,matcap:st,envMap:O,envMapMode:O&&J.mapping,envMapCubeUVHeight:Q,aoMap:Tt,lightMap:dt,bumpMap:et,normalMap:pt,displacementMap:f&&Yt,emissiveMap:Xt,normalMapObjectSpace:pt&&_.normalMapType===k_,normalMapTangentSpace:pt&&_.normalMapType===Vp,metalnessMap:P,roughnessMap:A,anisotropy:q,anisotropyMap:Mt,clearcoat:ot,clearcoatMap:At,clearcoatNormalMap:Nt,clearcoatRoughnessMap:Zt,iridescence:ht,iridescenceMap:lt,iridescenceThicknessMap:se,sheen:ft,sheenColorMap:Jt,sheenRoughnessMap:Ht,specularMap:Dt,specularColorMap:Ct,specularIntensityMap:qt,transmission:Pt,transmissionMap:ae,thicknessMap:_e,gradientMap:jt,opaque:_.transparent===!1&&_.blending===Ts,alphaMap:xt,alphaTest:B,alphaHash:bt,combine:_.combine,mapUv:$&&g(_.map.channel),aoMapUv:Tt&&g(_.aoMap.channel),lightMapUv:dt&&g(_.lightMap.channel),bumpMapUv:et&&g(_.bumpMap.channel),normalMapUv:pt&&g(_.normalMap.channel),displacementMapUv:Yt&&g(_.displacementMap.channel),emissiveMapUv:Xt&&g(_.emissiveMap.channel),metalnessMapUv:P&&g(_.metalnessMap.channel),roughnessMapUv:A&&g(_.roughnessMap.channel),anisotropyMapUv:Mt&&g(_.anisotropyMap.channel),clearcoatMapUv:At&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:Nt&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Zt&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:lt&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:se&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Jt&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:Ht&&g(_.sheenRoughnessMap.channel),specularMapUv:Dt&&g(_.specularMap.channel),specularColorMapUv:Ct&&g(_.specularColorMap.channel),specularIntensityMapUv:qt&&g(_.specularIntensityMap.channel),transmissionMapUv:ae&&g(_.transmissionMap.channel),thicknessMapUv:_e&&g(_.thicknessMap.channel),alphaMapUv:xt&&g(_.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(pt||q),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:kt,vertexUv2s:Ft,vertexUv3s:ce,pointsUvs:X.isPoints===!0&&!!z.attributes.uv&&($||xt),fog:!!D,useFog:_.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:X.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:mt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:ue,useLegacyLights:i._useLegacyLights,decodeVideoTexture:$&&_.map.isVideoTexture===!0&&le.getTransfer(_.map.colorSpace)===fe,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Fn,flipSided:_.side===sn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionDerivatives:yt&&_.extensions.derivatives===!0,extensionFragDepth:yt&&_.extensions.fragDepth===!0,extensionDrawBuffers:yt&&_.extensions.drawBuffers===!0,extensionShaderTextureLOD:yt&&_.extensions.shaderTextureLOD===!0,extensionClipCullDistance:yt&&_.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()}}function d(_){let S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(let L in _.defines)S.push(L),S.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(y(S,_),v(S,_),S.push(i.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function y(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function v(_,S){o.disableAll(),S.isWebGL2&&o.enable(0),S.supportsVertexTextures&&o.enable(1),S.instancing&&o.enable(2),S.instancingColor&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),_.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.skinning&&o.enable(4),S.morphTargets&&o.enable(5),S.morphNormals&&o.enable(6),S.morphColors&&o.enable(7),S.premultipliedAlpha&&o.enable(8),S.shadowMapEnabled&&o.enable(9),S.useLegacyLights&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),_.push(o.mask)}function b(_){let S=x[_.type],L;if(S){let U=ui[S];L=ar.clone(U.uniforms)}else L=_.uniforms;return L}function T(_,S){let L;for(let U=0,X=c.length;U<X;U++){let D=c[U];if(D.cacheKey===S){L=D,++L.usedTimes;break}}return L===void 0&&(L=new IM(i,S,_,s),c.push(L)),L}function M(_){if(--_.usedTimes===0){let S=c.indexOf(_);c[S]=c[c.length-1],c.pop(),_.destroy()}}function E(_){l.remove(_)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:b,acquireProgram:T,releaseProgram:M,releaseShaderCache:E,programs:c,dispose:C}}function NM(){let i=new WeakMap;function t(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function e(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:r}}function OM(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function vp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function yp(){let i=[],t=0,e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function a(h,f,p,x,g,m){let d=i[t];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:x,renderOrder:h.renderOrder,z:g,group:m},i[t]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=x,d.renderOrder=h.renderOrder,d.z=g,d.group=m),t++,d}function o(h,f,p,x,g,m){let d=a(h,f,p,x,g,m);p.transmission>0?n.push(d):p.transparent===!0?r.push(d):e.push(d)}function l(h,f,p,x,g,m){let d=a(h,f,p,x,g,m);p.transmission>0?n.unshift(d):p.transparent===!0?r.unshift(d):e.unshift(d)}function c(h,f){e.length>1&&e.sort(h||OM),n.length>1&&n.sort(f||vp),r.length>1&&r.sort(f||vp)}function u(){for(let h=t,f=i.length;h<f;h++){let p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function FM(){let i=new WeakMap;function t(n,r){let s=i.get(n),a;return s===void 0?(a=new yp,i.set(n,[a])):r>=s.length?(a=new yp,s.push(a)):a=s[r],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function BM(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new V,color:new Rt};break;case"SpotLight":e={position:new V,direction:new V,color:new Rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new V,color:new Rt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new V,skyColor:new Rt,groundColor:new Rt};break;case"RectAreaLight":e={color:new Rt,position:new V,halfWidth:new V,halfHeight:new V};break}return i[t.id]=e,e}}}function zM(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var kM=0;function VM(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function HM(i,t){let e=new BM,n=zM(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new V);let s=new V,a=new Te,o=new Te;function l(u,h){let f=0,p=0,x=0;for(let U=0;U<9;U++)r.probe[U].set(0,0,0);let g=0,m=0,d=0,y=0,v=0,b=0,T=0,M=0,E=0,C=0,_=0;u.sort(VM);let S=h===!0?Math.PI:1;for(let U=0,X=u.length;U<X;U++){let D=u[U],z=D.color,H=D.intensity,J=D.distance,Q=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)f+=z.r*H*S,p+=z.g*H*S,x+=z.b*H*S;else if(D.isLightProbe){for(let tt=0;tt<9;tt++)r.probe[tt].addScaledVector(D.sh.coefficients[tt],H);_++}else if(D.isDirectionalLight){let tt=e.get(D);if(tt.color.copy(D.color).multiplyScalar(D.intensity*S),D.castShadow){let it=D.shadow,at=n.get(D);at.shadowBias=it.bias,at.shadowNormalBias=it.normalBias,at.shadowRadius=it.radius,at.shadowMapSize=it.mapSize,r.directionalShadow[g]=at,r.directionalShadowMap[g]=Q,r.directionalShadowMatrix[g]=D.shadow.matrix,b++}r.directional[g]=tt,g++}else if(D.isSpotLight){let tt=e.get(D);tt.position.setFromMatrixPosition(D.matrixWorld),tt.color.copy(z).multiplyScalar(H*S),tt.distance=J,tt.coneCos=Math.cos(D.angle),tt.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),tt.decay=D.decay,r.spot[d]=tt;let it=D.shadow;if(D.map&&(r.spotLightMap[E]=D.map,E++,it.updateMatrices(D),D.castShadow&&C++),r.spotLightMatrix[d]=it.matrix,D.castShadow){let at=n.get(D);at.shadowBias=it.bias,at.shadowNormalBias=it.normalBias,at.shadowRadius=it.radius,at.shadowMapSize=it.mapSize,r.spotShadow[d]=at,r.spotShadowMap[d]=Q,M++}d++}else if(D.isRectAreaLight){let tt=e.get(D);tt.color.copy(z).multiplyScalar(H),tt.halfWidth.set(D.width*.5,0,0),tt.halfHeight.set(0,D.height*.5,0),r.rectArea[y]=tt,y++}else if(D.isPointLight){let tt=e.get(D);if(tt.color.copy(D.color).multiplyScalar(D.intensity*S),tt.distance=D.distance,tt.decay=D.decay,D.castShadow){let it=D.shadow,at=n.get(D);at.shadowBias=it.bias,at.shadowNormalBias=it.normalBias,at.shadowRadius=it.radius,at.shadowMapSize=it.mapSize,at.shadowCameraNear=it.camera.near,at.shadowCameraFar=it.camera.far,r.pointShadow[m]=at,r.pointShadowMap[m]=Q,r.pointShadowMatrix[m]=D.shadow.matrix,T++}r.point[m]=tt,m++}else if(D.isHemisphereLight){let tt=e.get(D);tt.skyColor.copy(D.color).multiplyScalar(H*S),tt.groundColor.copy(D.groundColor).multiplyScalar(H*S),r.hemi[v]=tt,v++}}y>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=vt.LTC_FLOAT_1,r.rectAreaLTC2=vt.LTC_FLOAT_2):(r.rectAreaLTC1=vt.LTC_HALF_1,r.rectAreaLTC2=vt.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=vt.LTC_FLOAT_1,r.rectAreaLTC2=vt.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=vt.LTC_HALF_1,r.rectAreaLTC2=vt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=f,r.ambient[1]=p,r.ambient[2]=x;let L=r.hash;(L.directionalLength!==g||L.pointLength!==m||L.spotLength!==d||L.rectAreaLength!==y||L.hemiLength!==v||L.numDirectionalShadows!==b||L.numPointShadows!==T||L.numSpotShadows!==M||L.numSpotMaps!==E||L.numLightProbes!==_)&&(r.directional.length=g,r.spot.length=d,r.rectArea.length=y,r.point.length=m,r.hemi.length=v,r.directionalShadow.length=b,r.directionalShadowMap.length=b,r.pointShadow.length=T,r.pointShadowMap.length=T,r.spotShadow.length=M,r.spotShadowMap.length=M,r.directionalShadowMatrix.length=b,r.pointShadowMatrix.length=T,r.spotLightMatrix.length=M+E-C,r.spotLightMap.length=E,r.numSpotLightShadowsWithMaps=C,r.numLightProbes=_,L.directionalLength=g,L.pointLength=m,L.spotLength=d,L.rectAreaLength=y,L.hemiLength=v,L.numDirectionalShadows=b,L.numPointShadows=T,L.numSpotShadows=M,L.numSpotMaps=E,L.numLightProbes=_,r.version=kM++)}function c(u,h){let f=0,p=0,x=0,g=0,m=0,d=h.matrixWorldInverse;for(let y=0,v=u.length;y<v;y++){let b=u[y];if(b.isDirectionalLight){let T=r.directional[f];T.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(d),f++}else if(b.isSpotLight){let T=r.spot[x];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(d),T.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(d),x++}else if(b.isRectAreaLight){let T=r.rectArea[g];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(d),o.identity(),a.copy(b.matrixWorld),a.premultiply(d),o.extractRotation(a),T.halfWidth.set(b.width*.5,0,0),T.halfHeight.set(0,b.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){let T=r.point[p];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(d),p++}else if(b.isHemisphereLight){let T=r.hemi[m];T.direction.setFromMatrixPosition(b.matrixWorld),T.direction.transformDirection(d),m++}}}return{setup:l,setupView:c,state:r}}function Mp(i,t){let e=new HM(i,t),n=[],r=[];function s(){n.length=0,r.length=0}function a(h){n.push(h)}function o(h){r.push(h)}function l(h){e.setup(n,h)}function c(h){e.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function GM(i,t){let e=new WeakMap;function n(s,a=0){let o=e.get(s),l;return o===void 0?(l=new Mp(i,t),e.set(s,[l])):a>=o.length?(l=new Mp(i,t),o.push(l)):l=o[a],l}function r(){e=new WeakMap}return{get:n,dispose:r}}var Xu=class extends ir{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=B_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},qu=class extends ir{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},WM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,XM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function qM(i,t,e){let n=new Ia,r=new zt,s=new zt,a=new be,o=new Xu({depthPacking:z_}),l=new qu,c={},u=e.maxTextureSize,h={[tr]:sn,[sn]:tr,[Fn]:Fn},f=new Ue({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:WM,fragmentShader:XM}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let x=new Ze;x.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new Ot(x,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pp;let d=this.type;this.render=function(M,E,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;let _=i.getRenderTarget(),S=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),U=i.state;U.setBlending(hi),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let X=d!==Ai&&this.type===Ai,D=d===Ai&&this.type!==Ai;for(let z=0,H=M.length;z<H;z++){let J=M[z],Q=J.shadow;if(Q===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;r.copy(Q.mapSize);let tt=Q.getFrameExtents();if(r.multiply(tt),s.copy(Q.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/tt.x),r.x=s.x*tt.x,Q.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/tt.y),r.y=s.y*tt.y,Q.mapSize.y=s.y)),Q.map===null||X===!0||D===!0){let at=this.type!==Ai?{minFilter:dn,magFilter:dn}:{};Q.map!==null&&Q.map.dispose(),Q.map=new pn(r.x,r.y,at),Q.map.texture.name=J.name+".shadowMap",Q.camera.updateProjectionMatrix()}i.setRenderTarget(Q.map),i.clear();let it=Q.getViewportCount();for(let at=0;at<it;at++){let mt=Q.getViewport(at);a.set(s.x*mt.x,s.y*mt.y,s.x*mt.z,s.y*mt.w),U.viewport(a),Q.updateMatrices(J,at),n=Q.getFrustum(),b(E,C,Q.camera,J,this.type)}Q.isPointLightShadow!==!0&&this.type===Ai&&y(Q,C),Q.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(_,S,L)};function y(M,E){let C=t.update(g);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new pn(r.x,r.y)),f.uniforms.shadow_pass.value=M.map.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(E,null,C,f,g,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(E,null,C,p,g,null)}function v(M,E,C,_){let S=null,L=C.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(L!==void 0)S=L;else if(S=C.isPointLight===!0?l:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){let U=S.uuid,X=E.uuid,D=c[U];D===void 0&&(D={},c[U]=D);let z=D[X];z===void 0&&(z=S.clone(),D[X]=z,E.addEventListener("dispose",T)),S=z}if(S.visible=E.visible,S.wireframe=E.wireframe,_===Ai?S.side=E.shadowSide!==null?E.shadowSide:E.side:S.side=E.shadowSide!==null?E.shadowSide:h[E.side],S.alphaMap=E.alphaMap,S.alphaTest=E.alphaTest,S.map=E.map,S.clipShadows=E.clipShadows,S.clippingPlanes=E.clippingPlanes,S.clipIntersection=E.clipIntersection,S.displacementMap=E.displacementMap,S.displacementScale=E.displacementScale,S.displacementBias=E.displacementBias,S.wireframeLinewidth=E.wireframeLinewidth,S.linewidth=E.linewidth,C.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let U=i.properties.get(S);U.light=C}return S}function b(M,E,C,_,S){if(M.visible===!1)return;if(M.layers.test(E.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&S===Ai)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,M.matrixWorld);let X=t.update(M),D=M.material;if(Array.isArray(D)){let z=X.groups;for(let H=0,J=z.length;H<J;H++){let Q=z[H],tt=D[Q.materialIndex];if(tt&&tt.visible){let it=v(M,tt,_,S);M.onBeforeShadow(i,M,E,C,X,it,Q),i.renderBufferDirect(C,null,X,it,M,Q),M.onAfterShadow(i,M,E,C,X,it,Q)}}}else if(D.visible){let z=v(M,D,_,S);M.onBeforeShadow(i,M,E,C,X,z,null),i.renderBufferDirect(C,null,X,z,M,null),M.onAfterShadow(i,M,E,C,X,z,null)}}let U=M.children;for(let X=0,D=U.length;X<D;X++)b(U[X],E,C,_,S)}function T(M){M.target.removeEventListener("dispose",T);for(let C in c){let _=c[C],S=M.target.uuid;S in _&&(_[S].dispose(),delete _[S])}}}function $M(i,t,e){let n=e.isWebGL2;function r(){let B=!1,bt=new be,yt=null,kt=new be(0,0,0,0);return{setMask:function(Ft){yt!==Ft&&!B&&(i.colorMask(Ft,Ft,Ft,Ft),yt=Ft)},setLocked:function(Ft){B=Ft},setClear:function(Ft,ce,ue,Pe,Le){Le===!0&&(Ft*=Pe,ce*=Pe,ue*=Pe),bt.set(Ft,ce,ue,Pe),kt.equals(bt)===!1&&(i.clearColor(Ft,ce,ue,Pe),kt.copy(bt))},reset:function(){B=!1,yt=null,kt.set(-1,0,0,0)}}}function s(){let B=!1,bt=null,yt=null,kt=null;return{setTest:function(Ft){Ft?k(i.DEPTH_TEST):$(i.DEPTH_TEST)},setMask:function(Ft){bt!==Ft&&!B&&(i.depthMask(Ft),bt=Ft)},setFunc:function(Ft){if(yt!==Ft){switch(Ft){case v_:i.depthFunc(i.NEVER);break;case y_:i.depthFunc(i.ALWAYS);break;case M_:i.depthFunc(i.LESS);break;case Wo:i.depthFunc(i.LEQUAL);break;case b_:i.depthFunc(i.EQUAL);break;case S_:i.depthFunc(i.GEQUAL);break;case E_:i.depthFunc(i.GREATER);break;case T_:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}yt=Ft}},setLocked:function(Ft){B=Ft},setClear:function(Ft){kt!==Ft&&(i.clearDepth(Ft),kt=Ft)},reset:function(){B=!1,bt=null,yt=null,kt=null}}}function a(){let B=!1,bt=null,yt=null,kt=null,Ft=null,ce=null,ue=null,Pe=null,Le=null;return{setTest:function(oe){B||(oe?k(i.STENCIL_TEST):$(i.STENCIL_TEST))},setMask:function(oe){bt!==oe&&!B&&(i.stencilMask(oe),bt=oe)},setFunc:function(oe,We,Wn){(yt!==oe||kt!==We||Ft!==Wn)&&(i.stencilFunc(oe,We,Wn),yt=oe,kt=We,Ft=Wn)},setOp:function(oe,We,Wn){(ce!==oe||ue!==We||Pe!==Wn)&&(i.stencilOp(oe,We,Wn),ce=oe,ue=We,Pe=Wn)},setLocked:function(oe){B=oe},setClear:function(oe){Le!==oe&&(i.clearStencil(oe),Le=oe)},reset:function(){B=!1,bt=null,yt=null,kt=null,Ft=null,ce=null,ue=null,Pe=null,Le=null}}}let o=new r,l=new s,c=new a,u=new WeakMap,h=new WeakMap,f={},p={},x=new WeakMap,g=[],m=null,d=!1,y=null,v=null,b=null,T=null,M=null,E=null,C=null,_=new Rt(0,0,0),S=0,L=!1,U=null,X=null,D=null,z=null,H=null,J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Q=!1,tt=0,it=i.getParameter(i.VERSION);it.indexOf("WebGL")!==-1?(tt=parseFloat(/^WebGL (\d)/.exec(it)[1]),Q=tt>=1):it.indexOf("OpenGL ES")!==-1&&(tt=parseFloat(/^OpenGL ES (\d)/.exec(it)[1]),Q=tt>=2);let at=null,mt={},K=i.getParameter(i.SCISSOR_BOX),nt=i.getParameter(i.VIEWPORT),F=new be().fromArray(K),w=new be().fromArray(nt);function I(B,bt,yt,kt){let Ft=new Uint8Array(4),ce=i.createTexture();i.bindTexture(B,ce),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ue=0;ue<yt;ue++)n&&(B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY)?i.texImage3D(bt,0,i.RGBA,1,1,kt,0,i.RGBA,i.UNSIGNED_BYTE,Ft):i.texImage2D(bt+ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ft);return ce}let N={};N[i.TEXTURE_2D]=I(i.TEXTURE_2D,i.TEXTURE_2D,1),N[i.TEXTURE_CUBE_MAP]=I(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(N[i.TEXTURE_2D_ARRAY]=I(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),N[i.TEXTURE_3D]=I(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),k(i.DEPTH_TEST),l.setFunc(Wo),Xt(!1),P(ed),k(i.CULL_FACE),pt(hi);function k(B){f[B]!==!0&&(i.enable(B),f[B]=!0)}function $(B){f[B]!==!1&&(i.disable(B),f[B]=!1)}function st(B,bt){return p[B]!==bt?(i.bindFramebuffer(B,bt),p[B]=bt,n&&(B===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=bt),B===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=bt)),!0):!1}function O(B,bt){let yt=g,kt=!1;if(B)if(yt=x.get(bt),yt===void 0&&(yt=[],x.set(bt,yt)),B.isWebGLMultipleRenderTargets){let Ft=B.texture;if(yt.length!==Ft.length||yt[0]!==i.COLOR_ATTACHMENT0){for(let ce=0,ue=Ft.length;ce<ue;ce++)yt[ce]=i.COLOR_ATTACHMENT0+ce;yt.length=Ft.length,kt=!0}}else yt[0]!==i.COLOR_ATTACHMENT0&&(yt[0]=i.COLOR_ATTACHMENT0,kt=!0);else yt[0]!==i.BACK&&(yt[0]=i.BACK,kt=!0);kt&&(e.isWebGL2?i.drawBuffers(yt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(yt))}function Tt(B){return m!==B?(i.useProgram(B),m=B,!0):!1}let dt={[Dr]:i.FUNC_ADD,[r_]:i.FUNC_SUBTRACT,[s_]:i.FUNC_REVERSE_SUBTRACT};if(n)dt[rd]=i.MIN,dt[sd]=i.MAX;else{let B=t.get("EXT_blend_minmax");B!==null&&(dt[rd]=B.MIN_EXT,dt[sd]=B.MAX_EXT)}let et={[a_]:i.ZERO,[o_]:i.ONE,[l_]:i.SRC_COLOR,[wu]:i.SRC_ALPHA,[p_]:i.SRC_ALPHA_SATURATE,[f_]:i.DST_COLOR,[u_]:i.DST_ALPHA,[c_]:i.ONE_MINUS_SRC_COLOR,[Au]:i.ONE_MINUS_SRC_ALPHA,[d_]:i.ONE_MINUS_DST_COLOR,[h_]:i.ONE_MINUS_DST_ALPHA,[m_]:i.CONSTANT_COLOR,[g_]:i.ONE_MINUS_CONSTANT_COLOR,[__]:i.CONSTANT_ALPHA,[x_]:i.ONE_MINUS_CONSTANT_ALPHA};function pt(B,bt,yt,kt,Ft,ce,ue,Pe,Le,oe){if(B===hi){d===!0&&($(i.BLEND),d=!1);return}if(d===!1&&(k(i.BLEND),d=!0),B!==i_){if(B!==y||oe!==L){if((v!==Dr||M!==Dr)&&(i.blendEquation(i.FUNC_ADD),v=Dr,M=Dr),oe)switch(B){case Ts:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Br:i.blendFunc(i.ONE,i.ONE);break;case nd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case id:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Ts:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Br:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case nd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case id:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}b=null,T=null,E=null,C=null,_.set(0,0,0),S=0,y=B,L=oe}return}Ft=Ft||bt,ce=ce||yt,ue=ue||kt,(bt!==v||Ft!==M)&&(i.blendEquationSeparate(dt[bt],dt[Ft]),v=bt,M=Ft),(yt!==b||kt!==T||ce!==E||ue!==C)&&(i.blendFuncSeparate(et[yt],et[kt],et[ce],et[ue]),b=yt,T=kt,E=ce,C=ue),(Pe.equals(_)===!1||Le!==S)&&(i.blendColor(Pe.r,Pe.g,Pe.b,Le),_.copy(Pe),S=Le),y=B,L=!1}function Yt(B,bt){B.side===Fn?$(i.CULL_FACE):k(i.CULL_FACE);let yt=B.side===sn;bt&&(yt=!yt),Xt(yt),B.blending===Ts&&B.transparent===!1?pt(hi):pt(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),l.setFunc(B.depthFunc),l.setTest(B.depthTest),l.setMask(B.depthWrite),o.setMask(B.colorWrite);let kt=B.stencilWrite;c.setTest(kt),kt&&(c.setMask(B.stencilWriteMask),c.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),c.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),q(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?k(i.SAMPLE_ALPHA_TO_COVERAGE):$(i.SAMPLE_ALPHA_TO_COVERAGE)}function Xt(B){U!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),U=B)}function P(B){B!==t_?(k(i.CULL_FACE),B!==X&&(B===ed?i.cullFace(i.BACK):B===e_?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):$(i.CULL_FACE),X=B}function A(B){B!==D&&(Q&&i.lineWidth(B),D=B)}function q(B,bt,yt){B?(k(i.POLYGON_OFFSET_FILL),(z!==bt||H!==yt)&&(i.polygonOffset(bt,yt),z=bt,H=yt)):$(i.POLYGON_OFFSET_FILL)}function ot(B){B?k(i.SCISSOR_TEST):$(i.SCISSOR_TEST)}function ht(B){B===void 0&&(B=i.TEXTURE0+J-1),at!==B&&(i.activeTexture(B),at=B)}function ft(B,bt,yt){yt===void 0&&(at===null?yt=i.TEXTURE0+J-1:yt=at);let kt=mt[yt];kt===void 0&&(kt={type:void 0,texture:void 0},mt[yt]=kt),(kt.type!==B||kt.texture!==bt)&&(at!==yt&&(i.activeTexture(yt),at=yt),i.bindTexture(B,bt||N[B]),kt.type=B,kt.texture=bt)}function Pt(){let B=mt[at];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function Mt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function At(){try{i.compressedTexImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Nt(){try{i.texSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Zt(){try{i.texSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function lt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function se(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Jt(){try{i.texStorage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ht(){try{i.texStorage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Dt(){try{i.texImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ct(){try{i.texImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function qt(B){F.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),F.copy(B))}function ae(B){w.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),w.copy(B))}function _e(B,bt){let yt=h.get(bt);yt===void 0&&(yt=new WeakMap,h.set(bt,yt));let kt=yt.get(B);kt===void 0&&(kt=i.getUniformBlockIndex(bt,B.name),yt.set(B,kt))}function jt(B,bt){let kt=h.get(bt).get(B);u.get(bt)!==kt&&(i.uniformBlockBinding(bt,kt,B.__bindingPointIndex),u.set(bt,kt))}function xt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},at=null,mt={},p={},x=new WeakMap,g=[],m=null,d=!1,y=null,v=null,b=null,T=null,M=null,E=null,C=null,_=new Rt(0,0,0),S=0,L=!1,U=null,X=null,D=null,z=null,H=null,F.set(0,0,i.canvas.width,i.canvas.height),w.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:k,disable:$,bindFramebuffer:st,drawBuffers:O,useProgram:Tt,setBlending:pt,setMaterial:Yt,setFlipSided:Xt,setCullFace:P,setLineWidth:A,setPolygonOffset:q,setScissorTest:ot,activeTexture:ht,bindTexture:ft,unbindTexture:Pt,compressedTexImage2D:Mt,compressedTexImage3D:At,texImage2D:Dt,texImage3D:Ct,updateUBOMapping:_e,uniformBlockBinding:jt,texStorage2D:Jt,texStorage3D:Ht,texSubImage2D:Nt,texSubImage3D:Zt,compressedTexSubImage2D:lt,compressedTexSubImage3D:se,scissor:qt,viewport:ae,reset:xt}}function YM(i,t,e,n,r,s,a){let o=r.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,h,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(P,A){return p?new OffscreenCanvas(P,A):jo("canvas")}function g(P,A,q,ot){let ht=1;if((P.width>ot||P.height>ot)&&(ht=ot/Math.max(P.width,P.height)),ht<1||A===!0)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap){let ft=A?Ko:Math.floor,Pt=ft(ht*P.width),Mt=ft(ht*P.height);h===void 0&&(h=x(Pt,Mt));let At=q?x(Pt,Mt):h;return At.width=Pt,At.height=Mt,At.getContext("2d").drawImage(P,0,0,Pt,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+Pt+"x"+Mt+")."),At}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function m(P){return Du(P.width)&&Du(P.height)}function d(P){return o?!1:P.wrapS!==Jn||P.wrapT!==Jn||P.minFilter!==dn&&P.minFilter!==On}function y(P,A){return P.generateMipmaps&&A&&P.minFilter!==dn&&P.minFilter!==On}function v(P){i.generateMipmap(P)}function b(P,A,q,ot,ht=!1){if(o===!1)return A;if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ft=A;if(A===i.RED&&(q===i.FLOAT&&(ft=i.R32F),q===i.HALF_FLOAT&&(ft=i.R16F),q===i.UNSIGNED_BYTE&&(ft=i.R8)),A===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(ft=i.R8UI),q===i.UNSIGNED_SHORT&&(ft=i.R16UI),q===i.UNSIGNED_INT&&(ft=i.R32UI),q===i.BYTE&&(ft=i.R8I),q===i.SHORT&&(ft=i.R16I),q===i.INT&&(ft=i.R32I)),A===i.RG&&(q===i.FLOAT&&(ft=i.RG32F),q===i.HALF_FLOAT&&(ft=i.RG16F),q===i.UNSIGNED_BYTE&&(ft=i.RG8)),A===i.RGBA){let Pt=ht?$o:le.getTransfer(ot);q===i.FLOAT&&(ft=i.RGBA32F),q===i.HALF_FLOAT&&(ft=i.RGBA16F),q===i.UNSIGNED_BYTE&&(ft=Pt===fe?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT_4_4_4_4&&(ft=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(ft=i.RGB5_A1)}return(ft===i.R16F||ft===i.R32F||ft===i.RG16F||ft===i.RG32F||ft===i.RGBA16F||ft===i.RGBA32F)&&t.get("EXT_color_buffer_float"),ft}function T(P,A,q){return y(P,q)===!0||P.isFramebufferTexture&&P.minFilter!==dn&&P.minFilter!==On?Math.log2(Math.max(A.width,A.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?A.mipmaps.length:1}function M(P){return P===dn||P===ad||P===Zc?i.NEAREST:i.LINEAR}function E(P){let A=P.target;A.removeEventListener("dispose",E),_(A),A.isVideoTexture&&u.delete(A)}function C(P){let A=P.target;A.removeEventListener("dispose",C),L(A)}function _(P){let A=n.get(P);if(A.__webglInit===void 0)return;let q=P.source,ot=f.get(q);if(ot){let ht=ot[A.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&S(P),Object.keys(ot).length===0&&f.delete(q)}n.remove(P)}function S(P){let A=n.get(P);i.deleteTexture(A.__webglTexture);let q=P.source,ot=f.get(q);delete ot[A.__cacheKey],a.memory.textures--}function L(P){let A=P.texture,q=n.get(P),ot=n.get(A);if(ot.__webglTexture!==void 0&&(i.deleteTexture(ot.__webglTexture),a.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let ht=0;ht<6;ht++){if(Array.isArray(q.__webglFramebuffer[ht]))for(let ft=0;ft<q.__webglFramebuffer[ht].length;ft++)i.deleteFramebuffer(q.__webglFramebuffer[ht][ft]);else i.deleteFramebuffer(q.__webglFramebuffer[ht]);q.__webglDepthbuffer&&i.deleteRenderbuffer(q.__webglDepthbuffer[ht])}else{if(Array.isArray(q.__webglFramebuffer))for(let ht=0;ht<q.__webglFramebuffer.length;ht++)i.deleteFramebuffer(q.__webglFramebuffer[ht]);else i.deleteFramebuffer(q.__webglFramebuffer);if(q.__webglDepthbuffer&&i.deleteRenderbuffer(q.__webglDepthbuffer),q.__webglMultisampledFramebuffer&&i.deleteFramebuffer(q.__webglMultisampledFramebuffer),q.__webglColorRenderbuffer)for(let ht=0;ht<q.__webglColorRenderbuffer.length;ht++)q.__webglColorRenderbuffer[ht]&&i.deleteRenderbuffer(q.__webglColorRenderbuffer[ht]);q.__webglDepthRenderbuffer&&i.deleteRenderbuffer(q.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let ht=0,ft=A.length;ht<ft;ht++){let Pt=n.get(A[ht]);Pt.__webglTexture&&(i.deleteTexture(Pt.__webglTexture),a.memory.textures--),n.remove(A[ht])}n.remove(A),n.remove(P)}let U=0;function X(){U=0}function D(){let P=U;return P>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),U+=1,P}function z(P){let A=[];return A.push(P.wrapS),A.push(P.wrapT),A.push(P.wrapR||0),A.push(P.magFilter),A.push(P.minFilter),A.push(P.anisotropy),A.push(P.internalFormat),A.push(P.format),A.push(P.type),A.push(P.generateMipmaps),A.push(P.premultiplyAlpha),A.push(P.flipY),A.push(P.unpackAlignment),A.push(P.colorSpace),A.join()}function H(P,A){let q=n.get(P);if(P.isVideoTexture&&Yt(P),P.isRenderTargetTexture===!1&&P.version>0&&q.__version!==P.version){let ot=P.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{F(q,P,A);return}}e.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+A)}function J(P,A){let q=n.get(P);if(P.version>0&&q.__version!==P.version){F(q,P,A);return}e.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+A)}function Q(P,A){let q=n.get(P);if(P.version>0&&q.__version!==P.version){F(q,P,A);return}e.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+A)}function tt(P,A){let q=n.get(P);if(P.version>0&&q.__version!==P.version){w(q,P,A);return}e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+A)}let it={[Pu]:i.REPEAT,[Jn]:i.CLAMP_TO_EDGE,[Lu]:i.MIRRORED_REPEAT},at={[dn]:i.NEAREST,[ad]:i.NEAREST_MIPMAP_NEAREST,[Zc]:i.NEAREST_MIPMAP_LINEAR,[On]:i.LINEAR,[R_]:i.LINEAR_MIPMAP_NEAREST,[Pa]:i.LINEAR_MIPMAP_LINEAR},mt={[V_]:i.NEVER,[$_]:i.ALWAYS,[H_]:i.LESS,[Hp]:i.LEQUAL,[G_]:i.EQUAL,[q_]:i.GEQUAL,[W_]:i.GREATER,[X_]:i.NOTEQUAL};function K(P,A,q){if(q?(i.texParameteri(P,i.TEXTURE_WRAP_S,it[A.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,it[A.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,it[A.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,at[A.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,at[A.minFilter])):(i.texParameteri(P,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(P,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(A.wrapS!==Jn||A.wrapT!==Jn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(P,i.TEXTURE_MAG_FILTER,M(A.magFilter)),i.texParameteri(P,i.TEXTURE_MIN_FILTER,M(A.minFilter)),A.minFilter!==dn&&A.minFilter!==On&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,mt[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let ot=t.get("EXT_texture_filter_anisotropic");if(A.magFilter===dn||A.minFilter!==Zc&&A.minFilter!==Pa||A.type===Ki&&t.has("OES_texture_float_linear")===!1||o===!1&&A.type===jn&&t.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||n.get(A).__currentAnisotropy)&&(i.texParameterf(P,ot.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,r.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy)}}function nt(P,A){let q=!1;P.__webglInit===void 0&&(P.__webglInit=!0,A.addEventListener("dispose",E));let ot=A.source,ht=f.get(ot);ht===void 0&&(ht={},f.set(ot,ht));let ft=z(A);if(ft!==P.__cacheKey){ht[ft]===void 0&&(ht[ft]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,q=!0),ht[ft].usedTimes++;let Pt=ht[P.__cacheKey];Pt!==void 0&&(ht[P.__cacheKey].usedTimes--,Pt.usedTimes===0&&S(A)),P.__cacheKey=ft,P.__webglTexture=ht[ft].texture}return q}function F(P,A,q){let ot=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ot=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ot=i.TEXTURE_3D);let ht=nt(P,A),ft=A.source;e.bindTexture(ot,P.__webglTexture,i.TEXTURE0+q);let Pt=n.get(ft);if(ft.version!==Pt.__version||ht===!0){e.activeTexture(i.TEXTURE0+q);let Mt=le.getPrimaries(le.workingColorSpace),At=A.colorSpace===Bn?null:le.getPrimaries(A.colorSpace),Nt=A.colorSpace===Bn||Mt===At?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);let Zt=d(A)&&m(A.image)===!1,lt=g(A.image,Zt,!1,r.maxTextureSize);lt=Xt(A,lt);let se=m(lt)||o,Jt=s.convert(A.format,A.colorSpace),Ht=s.convert(A.type),Dt=b(A.internalFormat,Jt,Ht,A.colorSpace,A.isVideoTexture);K(ot,A,se);let Ct,qt=A.mipmaps,ae=o&&A.isVideoTexture!==!0&&Dt!==zp,_e=Pt.__version===void 0||ht===!0,jt=T(A,lt,se);if(A.isDepthTexture)Dt=i.DEPTH_COMPONENT,o?A.type===Ki?Dt=i.DEPTH_COMPONENT32F:A.type===Ji?Dt=i.DEPTH_COMPONENT24:A.type===Nr?Dt=i.DEPTH24_STENCIL8:Dt=i.DEPTH_COMPONENT16:A.type===Ki&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===Or&&Dt===i.DEPTH_COMPONENT&&A.type!==ph&&A.type!==Ji&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=Ji,Ht=s.convert(A.type)),A.format===Ps&&Dt===i.DEPTH_COMPONENT&&(Dt=i.DEPTH_STENCIL,A.type!==Nr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=Nr,Ht=s.convert(A.type))),_e&&(ae?e.texStorage2D(i.TEXTURE_2D,1,Dt,lt.width,lt.height):e.texImage2D(i.TEXTURE_2D,0,Dt,lt.width,lt.height,0,Jt,Ht,null));else if(A.isDataTexture)if(qt.length>0&&se){ae&&_e&&e.texStorage2D(i.TEXTURE_2D,jt,Dt,qt[0].width,qt[0].height);for(let xt=0,B=qt.length;xt<B;xt++)Ct=qt[xt],ae?e.texSubImage2D(i.TEXTURE_2D,xt,0,0,Ct.width,Ct.height,Jt,Ht,Ct.data):e.texImage2D(i.TEXTURE_2D,xt,Dt,Ct.width,Ct.height,0,Jt,Ht,Ct.data);A.generateMipmaps=!1}else ae?(_e&&e.texStorage2D(i.TEXTURE_2D,jt,Dt,lt.width,lt.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt.width,lt.height,Jt,Ht,lt.data)):e.texImage2D(i.TEXTURE_2D,0,Dt,lt.width,lt.height,0,Jt,Ht,lt.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){ae&&_e&&e.texStorage3D(i.TEXTURE_2D_ARRAY,jt,Dt,qt[0].width,qt[0].height,lt.depth);for(let xt=0,B=qt.length;xt<B;xt++)Ct=qt[xt],A.format!==Kn?Jt!==null?ae?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,Ct.width,Ct.height,lt.depth,Jt,Ct.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,xt,Dt,Ct.width,Ct.height,lt.depth,0,Ct.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?e.texSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,Ct.width,Ct.height,lt.depth,Jt,Ht,Ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,xt,Dt,Ct.width,Ct.height,lt.depth,0,Jt,Ht,Ct.data)}else{ae&&_e&&e.texStorage2D(i.TEXTURE_2D,jt,Dt,qt[0].width,qt[0].height);for(let xt=0,B=qt.length;xt<B;xt++)Ct=qt[xt],A.format!==Kn?Jt!==null?ae?e.compressedTexSubImage2D(i.TEXTURE_2D,xt,0,0,Ct.width,Ct.height,Jt,Ct.data):e.compressedTexImage2D(i.TEXTURE_2D,xt,Dt,Ct.width,Ct.height,0,Ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?e.texSubImage2D(i.TEXTURE_2D,xt,0,0,Ct.width,Ct.height,Jt,Ht,Ct.data):e.texImage2D(i.TEXTURE_2D,xt,Dt,Ct.width,Ct.height,0,Jt,Ht,Ct.data)}else if(A.isDataArrayTexture)ae?(_e&&e.texStorage3D(i.TEXTURE_2D_ARRAY,jt,Dt,lt.width,lt.height,lt.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,Jt,Ht,lt.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,Dt,lt.width,lt.height,lt.depth,0,Jt,Ht,lt.data);else if(A.isData3DTexture)ae?(_e&&e.texStorage3D(i.TEXTURE_3D,jt,Dt,lt.width,lt.height,lt.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,Jt,Ht,lt.data)):e.texImage3D(i.TEXTURE_3D,0,Dt,lt.width,lt.height,lt.depth,0,Jt,Ht,lt.data);else if(A.isFramebufferTexture){if(_e)if(ae)e.texStorage2D(i.TEXTURE_2D,jt,Dt,lt.width,lt.height);else{let xt=lt.width,B=lt.height;for(let bt=0;bt<jt;bt++)e.texImage2D(i.TEXTURE_2D,bt,Dt,xt,B,0,Jt,Ht,null),xt>>=1,B>>=1}}else if(qt.length>0&&se){ae&&_e&&e.texStorage2D(i.TEXTURE_2D,jt,Dt,qt[0].width,qt[0].height);for(let xt=0,B=qt.length;xt<B;xt++)Ct=qt[xt],ae?e.texSubImage2D(i.TEXTURE_2D,xt,0,0,Jt,Ht,Ct):e.texImage2D(i.TEXTURE_2D,xt,Dt,Jt,Ht,Ct);A.generateMipmaps=!1}else ae?(_e&&e.texStorage2D(i.TEXTURE_2D,jt,Dt,lt.width,lt.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,Jt,Ht,lt)):e.texImage2D(i.TEXTURE_2D,0,Dt,Jt,Ht,lt);y(A,se)&&v(ot),Pt.__version=ft.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function w(P,A,q){if(A.image.length!==6)return;let ot=nt(P,A),ht=A.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+q);let ft=n.get(ht);if(ht.version!==ft.__version||ot===!0){e.activeTexture(i.TEXTURE0+q);let Pt=le.getPrimaries(le.workingColorSpace),Mt=A.colorSpace===Bn?null:le.getPrimaries(A.colorSpace),At=A.colorSpace===Bn||Pt===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let Nt=A.isCompressedTexture||A.image[0].isCompressedTexture,Zt=A.image[0]&&A.image[0].isDataTexture,lt=[];for(let xt=0;xt<6;xt++)!Nt&&!Zt?lt[xt]=g(A.image[xt],!1,!0,r.maxCubemapSize):lt[xt]=Zt?A.image[xt].image:A.image[xt],lt[xt]=Xt(A,lt[xt]);let se=lt[0],Jt=m(se)||o,Ht=s.convert(A.format,A.colorSpace),Dt=s.convert(A.type),Ct=b(A.internalFormat,Ht,Dt,A.colorSpace),qt=o&&A.isVideoTexture!==!0,ae=ft.__version===void 0||ot===!0,_e=T(A,se,Jt);K(i.TEXTURE_CUBE_MAP,A,Jt);let jt;if(Nt){qt&&ae&&e.texStorage2D(i.TEXTURE_CUBE_MAP,_e,Ct,se.width,se.height);for(let xt=0;xt<6;xt++){jt=lt[xt].mipmaps;for(let B=0;B<jt.length;B++){let bt=jt[B];A.format!==Kn?Ht!==null?qt?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,B,0,0,bt.width,bt.height,Ht,bt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,B,Ct,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,B,0,0,bt.width,bt.height,Ht,Dt,bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,B,Ct,bt.width,bt.height,0,Ht,Dt,bt.data)}}}else{jt=A.mipmaps,qt&&ae&&(jt.length>0&&_e++,e.texStorage2D(i.TEXTURE_CUBE_MAP,_e,Ct,lt[0].width,lt[0].height));for(let xt=0;xt<6;xt++)if(Zt){qt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,lt[xt].width,lt[xt].height,Ht,Dt,lt[xt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,Ct,lt[xt].width,lt[xt].height,0,Ht,Dt,lt[xt].data);for(let B=0;B<jt.length;B++){let yt=jt[B].image[xt].image;qt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,B+1,0,0,yt.width,yt.height,Ht,Dt,yt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,B+1,Ct,yt.width,yt.height,0,Ht,Dt,yt.data)}}else{qt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,Ht,Dt,lt[xt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,Ct,Ht,Dt,lt[xt]);for(let B=0;B<jt.length;B++){let bt=jt[B];qt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,B+1,0,0,Ht,Dt,bt.image[xt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,B+1,Ct,Ht,Dt,bt.image[xt])}}}y(A,Jt)&&v(i.TEXTURE_CUBE_MAP),ft.__version=ht.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function I(P,A,q,ot,ht,ft){let Pt=s.convert(q.format,q.colorSpace),Mt=s.convert(q.type),At=b(q.internalFormat,Pt,Mt,q.colorSpace);if(!n.get(A).__hasExternalTextures){let Zt=Math.max(1,A.width>>ft),lt=Math.max(1,A.height>>ft);ht===i.TEXTURE_3D||ht===i.TEXTURE_2D_ARRAY?e.texImage3D(ht,ft,At,Zt,lt,A.depth,0,Pt,Mt,null):e.texImage2D(ht,ft,At,Zt,lt,0,Pt,Mt,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),pt(A)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ot,ht,n.get(q).__webglTexture,0,et(A)):(ht===i.TEXTURE_2D||ht>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ht<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ot,ht,n.get(q).__webglTexture,ft),e.bindFramebuffer(i.FRAMEBUFFER,null)}function N(P,A,q){if(i.bindRenderbuffer(i.RENDERBUFFER,P),A.depthBuffer&&!A.stencilBuffer){let ot=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(q||pt(A)){let ht=A.depthTexture;ht&&ht.isDepthTexture&&(ht.type===Ki?ot=i.DEPTH_COMPONENT32F:ht.type===Ji&&(ot=i.DEPTH_COMPONENT24));let ft=et(A);pt(A)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ft,ot,A.width,A.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ft,ot,A.width,A.height)}else i.renderbufferStorage(i.RENDERBUFFER,ot,A.width,A.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,P)}else if(A.depthBuffer&&A.stencilBuffer){let ot=et(A);q&&pt(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot,i.DEPTH24_STENCIL8,A.width,A.height):pt(A)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot,i.DEPTH24_STENCIL8,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,P)}else{let ot=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let ht=0;ht<ot.length;ht++){let ft=ot[ht],Pt=s.convert(ft.format,ft.colorSpace),Mt=s.convert(ft.type),At=b(ft.internalFormat,Pt,Mt,ft.colorSpace),Nt=et(A);q&&pt(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt,At,A.width,A.height):pt(A)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Nt,At,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,At,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function k(P,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),H(A.depthTexture,0);let ot=n.get(A.depthTexture).__webglTexture,ht=et(A);if(A.depthTexture.format===Or)pt(A)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ot,0,ht):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ot,0);else if(A.depthTexture.format===Ps)pt(A)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ot,0,ht):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ot,0);else throw new Error("Unknown depthTexture format")}function $(P){let A=n.get(P),q=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!A.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");k(A.__webglFramebuffer,P)}else if(q){A.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[ot]),A.__webglDepthbuffer[ot]=i.createRenderbuffer(),N(A.__webglDepthbuffer[ot],P,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=i.createRenderbuffer(),N(A.__webglDepthbuffer,P,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function st(P,A,q){let ot=n.get(P);A!==void 0&&I(ot.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&$(P)}function O(P){let A=P.texture,q=n.get(P),ot=n.get(A);P.addEventListener("dispose",C),P.isWebGLMultipleRenderTargets!==!0&&(ot.__webglTexture===void 0&&(ot.__webglTexture=i.createTexture()),ot.__version=A.version,a.memory.textures++);let ht=P.isWebGLCubeRenderTarget===!0,ft=P.isWebGLMultipleRenderTargets===!0,Pt=m(P)||o;if(ht){q.__webglFramebuffer=[];for(let Mt=0;Mt<6;Mt++)if(o&&A.mipmaps&&A.mipmaps.length>0){q.__webglFramebuffer[Mt]=[];for(let At=0;At<A.mipmaps.length;At++)q.__webglFramebuffer[Mt][At]=i.createFramebuffer()}else q.__webglFramebuffer[Mt]=i.createFramebuffer()}else{if(o&&A.mipmaps&&A.mipmaps.length>0){q.__webglFramebuffer=[];for(let Mt=0;Mt<A.mipmaps.length;Mt++)q.__webglFramebuffer[Mt]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(ft)if(r.drawBuffers){let Mt=P.texture;for(let At=0,Nt=Mt.length;At<Nt;At++){let Zt=n.get(Mt[At]);Zt.__webglTexture===void 0&&(Zt.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&P.samples>0&&pt(P)===!1){let Mt=ft?A:[A];q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let At=0;At<Mt.length;At++){let Nt=Mt[At];q.__webglColorRenderbuffer[At]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[At]);let Zt=s.convert(Nt.format,Nt.colorSpace),lt=s.convert(Nt.type),se=b(Nt.internalFormat,Zt,lt,Nt.colorSpace,P.isXRRenderTarget===!0),Jt=et(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Jt,se,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,q.__webglColorRenderbuffer[At])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),N(q.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ht){e.bindTexture(i.TEXTURE_CUBE_MAP,ot.__webglTexture),K(i.TEXTURE_CUBE_MAP,A,Pt);for(let Mt=0;Mt<6;Mt++)if(o&&A.mipmaps&&A.mipmaps.length>0)for(let At=0;At<A.mipmaps.length;At++)I(q.__webglFramebuffer[Mt][At],P,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,At);else I(q.__webglFramebuffer[Mt],P,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0);y(A,Pt)&&v(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){let Mt=P.texture;for(let At=0,Nt=Mt.length;At<Nt;At++){let Zt=Mt[At],lt=n.get(Zt);e.bindTexture(i.TEXTURE_2D,lt.__webglTexture),K(i.TEXTURE_2D,Zt,Pt),I(q.__webglFramebuffer,P,Zt,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,0),y(Zt,Pt)&&v(i.TEXTURE_2D)}e.unbindTexture()}else{let Mt=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(o?Mt=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(Mt,ot.__webglTexture),K(Mt,A,Pt),o&&A.mipmaps&&A.mipmaps.length>0)for(let At=0;At<A.mipmaps.length;At++)I(q.__webglFramebuffer[At],P,A,i.COLOR_ATTACHMENT0,Mt,At);else I(q.__webglFramebuffer,P,A,i.COLOR_ATTACHMENT0,Mt,0);y(A,Pt)&&v(Mt),e.unbindTexture()}P.depthBuffer&&$(P)}function Tt(P){let A=m(P)||o,q=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let ot=0,ht=q.length;ot<ht;ot++){let ft=q[ot];if(y(ft,A)){let Pt=P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Mt=n.get(ft).__webglTexture;e.bindTexture(Pt,Mt),v(Pt),e.unbindTexture()}}}function dt(P){if(o&&P.samples>0&&pt(P)===!1){let A=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],q=P.width,ot=P.height,ht=i.COLOR_BUFFER_BIT,ft=[],Pt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Mt=n.get(P),At=P.isWebGLMultipleRenderTargets===!0;if(At)for(let Nt=0;Nt<A.length;Nt++)e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let Nt=0;Nt<A.length;Nt++){ft.push(i.COLOR_ATTACHMENT0+Nt),P.depthBuffer&&ft.push(Pt);let Zt=Mt.__ignoreDepthValues!==void 0?Mt.__ignoreDepthValues:!1;if(Zt===!1&&(P.depthBuffer&&(ht|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&(ht|=i.STENCIL_BUFFER_BIT)),At&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Mt.__webglColorRenderbuffer[Nt]),Zt===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Pt]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Pt])),At){let lt=n.get(A[Nt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,lt,0)}i.blitFramebuffer(0,0,q,ot,0,0,q,ot,ht,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ft)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),At)for(let Nt=0;Nt<A.length;Nt++){e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.RENDERBUFFER,Mt.__webglColorRenderbuffer[Nt]);let Zt=n.get(A[Nt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.TEXTURE_2D,Zt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}}function et(P){return Math.min(r.maxSamples,P.samples)}function pt(P){let A=n.get(P);return o&&P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Yt(P){let A=a.render.frame;u.get(P)!==A&&(u.set(P,A),P.update())}function Xt(P,A){let q=P.colorSpace,ot=P.format,ht=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===Iu||q!==Li&&q!==Bn&&(le.getTransfer(q)===fe?o===!1?t.has("EXT_sRGB")===!0&&ot===Kn?(P.format=Iu,P.minFilter=On,P.generateMipmaps=!1):A=Qo.sRGBToLinear(A):(ot!==Kn||ht!==Qi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),A}this.allocateTextureUnit=D,this.resetTextureUnits=X,this.setTexture2D=H,this.setTexture2DArray=J,this.setTexture3D=Q,this.setTextureCube=tt,this.rebindTextures=st,this.setupRenderTarget=O,this.updateRenderTargetMipmap=Tt,this.updateMultisampleRenderTarget=dt,this.setupDepthRenderbuffer=$,this.setupFrameBufferTexture=I,this.useMultisampledRTT=pt}function ZM(i,t,e){let n=e.isWebGL2;function r(s,a=Bn){let o,l=le.getTransfer(a);if(s===Qi)return i.UNSIGNED_BYTE;if(s===Up)return i.UNSIGNED_SHORT_4_4_4_4;if(s===Np)return i.UNSIGNED_SHORT_5_5_5_1;if(s===P_)return i.BYTE;if(s===L_)return i.SHORT;if(s===ph)return i.UNSIGNED_SHORT;if(s===Dp)return i.INT;if(s===Ji)return i.UNSIGNED_INT;if(s===Ki)return i.FLOAT;if(s===jn)return n?i.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===I_)return i.ALPHA;if(s===Kn)return i.RGBA;if(s===D_)return i.LUMINANCE;if(s===U_)return i.LUMINANCE_ALPHA;if(s===Or)return i.DEPTH_COMPONENT;if(s===Ps)return i.DEPTH_STENCIL;if(s===Iu)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===N_)return i.RED;if(s===Op)return i.RED_INTEGER;if(s===O_)return i.RG;if(s===Fp)return i.RG_INTEGER;if(s===Bp)return i.RGBA_INTEGER;if(s===Jc||s===Kc||s===jc||s===Qc)if(l===fe)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Jc)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Kc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===jc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Qc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Jc)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Kc)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===jc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Qc)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===od||s===ld||s===cd||s===ud)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===od)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===ld)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===cd)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===ud)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===zp)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===hd||s===fd)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(s===hd)return l===fe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===fd)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===dd||s===pd||s===md||s===gd||s===_d||s===xd||s===vd||s===yd||s===Md||s===bd||s===Sd||s===Ed||s===Td||s===wd)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(s===dd)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===pd)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===md)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===gd)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===_d)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===xd)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===vd)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===yd)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Md)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===bd)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Sd)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Ed)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Td)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===wd)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===tu||s===Ad||s===Cd)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(s===tu)return l===fe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Ad)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Cd)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===F_||s===Rd||s===Pd||s===Ld)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(s===tu)return o.COMPRESSED_RED_RGTC1_EXT;if(s===Rd)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Pd)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Ld)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Nr?n?i.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}var $u=class extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Pi=class extends Ge{constructor(){super(),this.isGroup=!0,this.type="Group"}},JM={type:"move"},Ra=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let g of t.hand.values()){let m=e.getJointPose(g,n),d=this._getHandJoint(c,g);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,x=.005;c.inputState.pinching&&f>p+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(JM)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Pi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Yu=class extends er{constructor(t,e){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,x=null,g=e.getContextAttributes(),m=null,d=null,y=[],v=[],b=new zt,T=null,M=new rn;M.layers.enable(1),M.viewport=new be;let E=new rn;E.layers.enable(2),E.viewport=new be;let C=[M,E],_=new $u;_.layers.enable(1),_.layers.enable(2);let S=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let nt=y[K];return nt===void 0&&(nt=new Ra,y[K]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(K){let nt=y[K];return nt===void 0&&(nt=new Ra,y[K]=nt),nt.getGripSpace()},this.getHand=function(K){let nt=y[K];return nt===void 0&&(nt=new Ra,y[K]=nt),nt.getHandSpace()};function U(K){let nt=v.indexOf(K.inputSource);if(nt===-1)return;let F=y[nt];F!==void 0&&(F.update(K.inputSource,K.frame,c||a),F.dispatchEvent({type:K.type,data:K.inputSource}))}function X(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",D);for(let K=0;K<y.length;K++){let nt=v[K];nt!==null&&(v[K]=null,y[K].disconnect(nt))}S=null,L=null,t.setRenderTarget(m),p=null,f=null,h=null,r=null,d=null,mt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(m=t.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",X),r.addEventListener("inputsourceschange",D),g.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(b),r.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let nt={antialias:r.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,nt),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),d=new pn(p.framebufferWidth,p.framebufferHeight,{format:Kn,type:Qi,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let nt=null,F=null,w=null;g.depth&&(w=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=g.stencil?Ps:Or,F=g.stencil?Nr:Ji);let I={colorFormat:e.RGBA8,depthFormat:w,scaleFactor:s};h=new XRWebGLBinding(r,e),f=h.createProjectionLayer(I),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),d=new pn(f.textureWidth,f.textureHeight,{format:Kn,type:Qi,depthTexture:new ll(f.textureWidth,f.textureHeight,F,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0});let N=t.properties.get(d);N.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),mt.setContext(r),mt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function D(K){for(let nt=0;nt<K.removed.length;nt++){let F=K.removed[nt],w=v.indexOf(F);w>=0&&(v[w]=null,y[w].disconnect(F))}for(let nt=0;nt<K.added.length;nt++){let F=K.added[nt],w=v.indexOf(F);if(w===-1){for(let N=0;N<y.length;N++)if(N>=v.length){v.push(F),w=N;break}else if(v[N]===null){v[N]=F,w=N;break}if(w===-1)break}let I=y[w];I&&I.connect(F)}}let z=new V,H=new V;function J(K,nt,F){z.setFromMatrixPosition(nt.matrixWorld),H.setFromMatrixPosition(F.matrixWorld);let w=z.distanceTo(H),I=nt.projectionMatrix.elements,N=F.projectionMatrix.elements,k=I[14]/(I[10]-1),$=I[14]/(I[10]+1),st=(I[9]+1)/I[5],O=(I[9]-1)/I[5],Tt=(I[8]-1)/I[0],dt=(N[8]+1)/N[0],et=k*Tt,pt=k*dt,Yt=w/(-Tt+dt),Xt=Yt*-Tt;nt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Xt),K.translateZ(Yt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert();let P=k+Yt,A=$+Yt,q=et-Xt,ot=pt+(w-Xt),ht=st*$/A*P,ft=O*$/A*P;K.projectionMatrix.makePerspective(q,ot,ht,ft,P,A),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}function Q(K,nt){nt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(nt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;_.near=E.near=M.near=K.near,_.far=E.far=M.far=K.far,(S!==_.near||L!==_.far)&&(r.updateRenderState({depthNear:_.near,depthFar:_.far}),S=_.near,L=_.far);let nt=K.parent,F=_.cameras;Q(_,nt);for(let w=0;w<F.length;w++)Q(F[w],nt);F.length===2?J(_,M,E):_.projectionMatrix.copy(M.projectionMatrix),tt(K,_,nt)};function tt(K,nt,F){F===null?K.matrix.copy(nt.matrixWorld):(K.matrix.copy(F.matrixWorld),K.matrix.invert(),K.matrix.multiply(nt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(nt.projectionMatrix),K.projectionMatrixInverse.copy(nt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=La*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(K){l=K,f!==null&&(f.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)};let it=null;function at(K,nt){if(u=nt.getViewerPose(c||a),x=nt,u!==null){let F=u.views;p!==null&&(t.setRenderTargetFramebuffer(d,p.framebuffer),t.setRenderTarget(d));let w=!1;F.length!==_.cameras.length&&(_.cameras.length=0,w=!0);for(let I=0;I<F.length;I++){let N=F[I],k=null;if(p!==null)k=p.getViewport(N);else{let st=h.getViewSubImage(f,N);k=st.viewport,I===0&&(t.setRenderTargetTextures(d,st.colorTexture,f.ignoreDepthValues?void 0:st.depthStencilTexture),t.setRenderTarget(d))}let $=C[I];$===void 0&&($=new rn,$.layers.enable(I),$.viewport=new be,C[I]=$),$.matrix.fromArray(N.transform.matrix),$.matrix.decompose($.position,$.quaternion,$.scale),$.projectionMatrix.fromArray(N.projectionMatrix),$.projectionMatrixInverse.copy($.projectionMatrix).invert(),$.viewport.set(k.x,k.y,k.width,k.height),I===0&&(_.matrix.copy($.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),w===!0&&_.cameras.push($)}}for(let F=0;F<y.length;F++){let w=v[F],I=y[F];w!==null&&I!==void 0&&I.update(w,nt,c||a)}it&&it(K,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),x=null}let mt=new $p;mt.setAnimationLoop(at),this.setAnimationLoop=function(K){it=K},this.dispose=function(){}}};function KM(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,qp(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,y,v,b){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),h(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,b)):d.isMeshMatcapMaterial?(s(m,d),x(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),g(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,y,v):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===sn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===sn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let y=t.get(d).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;let v=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*v,e(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,y,v){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*y,m.scale.value=v*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),t.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,y){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===sn&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,d){d.matcap&&(m.matcap.value=d.matcap)}function g(m,d){let y=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function jM(i,t,e,n){let r={},s={},a=[],o=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,v){let b=v.program;n.uniformBlockBinding(y,b)}function c(y,v){let b=r[y.id];b===void 0&&(x(y),b=u(y),r[y.id]=b,y.addEventListener("dispose",m));let T=v.program;n.updateUBOMapping(y,T);let M=t.render.frame;s[y.id]!==M&&(f(y),s[y.id]=M)}function u(y){let v=h();y.__bindingPointIndex=v;let b=i.createBuffer(),T=y.__size,M=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,T,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,b),b}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){let v=r[y.id],b=y.uniforms,T=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let M=0,E=b.length;M<E;M++){let C=Array.isArray(b[M])?b[M]:[b[M]];for(let _=0,S=C.length;_<S;_++){let L=C[_];if(p(L,M,_,T)===!0){let U=L.__offset,X=Array.isArray(L.value)?L.value:[L.value],D=0;for(let z=0;z<X.length;z++){let H=X[z],J=g(H);typeof H=="number"||typeof H=="boolean"?(L.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,U+D,L.__data)):H.isMatrix3?(L.__data[0]=H.elements[0],L.__data[1]=H.elements[1],L.__data[2]=H.elements[2],L.__data[3]=0,L.__data[4]=H.elements[3],L.__data[5]=H.elements[4],L.__data[6]=H.elements[5],L.__data[7]=0,L.__data[8]=H.elements[6],L.__data[9]=H.elements[7],L.__data[10]=H.elements[8],L.__data[11]=0):(H.toArray(L.__data,D),D+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,v,b,T){let M=y.value,E=v+"_"+b;if(T[E]===void 0)return typeof M=="number"||typeof M=="boolean"?T[E]=M:T[E]=M.clone(),!0;{let C=T[E];if(typeof M=="number"||typeof M=="boolean"){if(C!==M)return T[E]=M,!0}else if(C.equals(M)===!1)return C.copy(M),!0}return!1}function x(y){let v=y.uniforms,b=0,T=16;for(let E=0,C=v.length;E<C;E++){let _=Array.isArray(v[E])?v[E]:[v[E]];for(let S=0,L=_.length;S<L;S++){let U=_[S],X=Array.isArray(U.value)?U.value:[U.value];for(let D=0,z=X.length;D<z;D++){let H=X[D],J=g(H),Q=b%T;Q!==0&&T-Q<J.boundary&&(b+=T-Q),U.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=b,b+=J.storage}}}let M=b%T;return M>0&&(b+=T-M),y.__size=b,y.__cache={},this}function g(y){let v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){let v=y.target;v.removeEventListener("dispose",m);let b=a.indexOf(v.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function d(){for(let y in r)i.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:l,update:c,dispose:d}}var Da=class{constructor(t={}){let{canvas:e=lx(),context:n=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;let p=new Uint32Array(4),x=new Int32Array(4),g=null,m=null,d=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Fe,this._useLegacyLights=!1,this.toneMapping=ji,this.toneMappingExposure=1;let v=this,b=!1,T=0,M=0,E=null,C=-1,_=null,S=new be,L=new be,U=null,X=new Rt(0),D=0,z=e.width,H=e.height,J=1,Q=null,tt=null,it=new be(0,0,z,H),at=new be(0,0,z,H),mt=!1,K=new Ia,nt=!1,F=!1,w=null,I=new Te,N=new zt,k=new V,$={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function st(){return E===null?J:1}let O=n;function Tt(R,W){for(let Z=0;Z<R.length;Z++){let j=R[Z],Y=e.getContext(j,W);if(Y!==null)return Y}return null}try{let R={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ch}`),e.addEventListener("webglcontextlost",xt,!1),e.addEventListener("webglcontextrestored",B,!1),e.addEventListener("webglcontextcreationerror",bt,!1),O===null){let W=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&W.shift(),O=Tt(W,R),O===null)throw Tt(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let dt,et,pt,Yt,Xt,P,A,q,ot,ht,ft,Pt,Mt,At,Nt,Zt,lt,se,Jt,Ht,Dt,Ct,qt,ae;function _e(){dt=new _1(O),et=new h1(O,dt,t),dt.init(et),Ct=new ZM(O,dt,et),pt=new $M(O,dt,et),Yt=new y1(O),Xt=new NM,P=new YM(O,dt,pt,Xt,et,Ct,Yt),A=new d1(v),q=new g1(v),ot=new Cx(O,et),qt=new c1(O,dt,ot,et),ht=new x1(O,ot,Yt,qt),ft=new E1(O,ht,ot,Yt),Jt=new S1(O,et,P),Zt=new f1(Xt),Pt=new UM(v,A,q,dt,et,qt,Zt),Mt=new KM(v,Xt),At=new FM,Nt=new GM(dt,et),se=new l1(v,A,q,pt,ft,f,l),lt=new qM(v,ft,et),ae=new jM(O,Yt,et,pt),Ht=new u1(O,dt,Yt,et),Dt=new v1(O,dt,Yt,et),Yt.programs=Pt.programs,v.capabilities=et,v.extensions=dt,v.properties=Xt,v.renderLists=At,v.shadowMap=lt,v.state=pt,v.info=Yt}_e();let jt=new Yu(v,O);this.xr=jt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let R=dt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=dt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(R){R!==void 0&&(J=R,this.setSize(z,H,!1))},this.getSize=function(R){return R.set(z,H)},this.setSize=function(R,W,Z=!0){if(jt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=R,H=W,e.width=Math.floor(R*J),e.height=Math.floor(W*J),Z===!0&&(e.style.width=R+"px",e.style.height=W+"px"),this.setViewport(0,0,R,W)},this.getDrawingBufferSize=function(R){return R.set(z*J,H*J).floor()},this.setDrawingBufferSize=function(R,W,Z){z=R,H=W,J=Z,e.width=Math.floor(R*Z),e.height=Math.floor(W*Z),this.setViewport(0,0,R,W)},this.getCurrentViewport=function(R){return R.copy(S)},this.getViewport=function(R){return R.copy(it)},this.setViewport=function(R,W,Z,j){R.isVector4?it.set(R.x,R.y,R.z,R.w):it.set(R,W,Z,j),pt.viewport(S.copy(it).multiplyScalar(J).floor())},this.getScissor=function(R){return R.copy(at)},this.setScissor=function(R,W,Z,j){R.isVector4?at.set(R.x,R.y,R.z,R.w):at.set(R,W,Z,j),pt.scissor(L.copy(at).multiplyScalar(J).floor())},this.getScissorTest=function(){return mt},this.setScissorTest=function(R){pt.setScissorTest(mt=R)},this.setOpaqueSort=function(R){Q=R},this.setTransparentSort=function(R){tt=R},this.getClearColor=function(R){return R.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor.apply(se,arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha.apply(se,arguments)},this.clear=function(R=!0,W=!0,Z=!0){let j=0;if(R){let Y=!1;if(E!==null){let Et=E.texture.format;Y=Et===Bp||Et===Fp||Et===Op}if(Y){let Et=E.texture.type,Lt=Et===Qi||Et===Ji||Et===ph||Et===Nr||Et===Up||Et===Np,Bt=se.getClearColor(),Vt=se.getClearAlpha(),Kt=Bt.r,$t=Bt.g,Gt=Bt.b;Lt?(p[0]=Kt,p[1]=$t,p[2]=Gt,p[3]=Vt,O.clearBufferuiv(O.COLOR,0,p)):(x[0]=Kt,x[1]=$t,x[2]=Gt,x[3]=Vt,O.clearBufferiv(O.COLOR,0,x))}else j|=O.COLOR_BUFFER_BIT}W&&(j|=O.DEPTH_BUFFER_BIT),Z&&(j|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",xt,!1),e.removeEventListener("webglcontextrestored",B,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),At.dispose(),Nt.dispose(),Xt.dispose(),A.dispose(),q.dispose(),ft.dispose(),qt.dispose(),ae.dispose(),Pt.dispose(),jt.dispose(),jt.removeEventListener("sessionstart",Le),jt.removeEventListener("sessionend",oe),w&&(w.dispose(),w=null),We.stop()};function xt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function B(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let R=Yt.autoReset,W=lt.enabled,Z=lt.autoUpdate,j=lt.needsUpdate,Y=lt.type;_e(),Yt.autoReset=R,lt.enabled=W,lt.autoUpdate=Z,lt.needsUpdate=j,lt.type=Y}function bt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function yt(R){let W=R.target;W.removeEventListener("dispose",yt),kt(W)}function kt(R){Ft(R),Xt.remove(R)}function Ft(R){let W=Xt.get(R).programs;W!==void 0&&(W.forEach(function(Z){Pt.releaseProgram(Z)}),R.isShaderMaterial&&Pt.releaseShaderCache(R))}this.renderBufferDirect=function(R,W,Z,j,Y,Et){W===null&&(W=$);let Lt=Y.isMesh&&Y.matrixWorld.determinant()<0,Bt=tc(R,W,Z,j,Y);pt.setMaterial(j,Lt);let Vt=Z.index,Kt=1;if(j.wireframe===!0){if(Vt=ht.getWireframeAttribute(Z),Vt===void 0)return;Kt=2}let $t=Z.drawRange,Gt=Z.attributes.position,xe=$t.start*Kt,ln=($t.start+$t.count)*Kt;Et!==null&&(xe=Math.max(xe,Et.start*Kt),ln=Math.min(ln,(Et.start+Et.count)*Kt)),Vt!==null?(xe=Math.max(xe,0),ln=Math.min(ln,Vt.count)):Gt!=null&&(xe=Math.max(xe,0),ln=Math.min(ln,Gt.count));let Ie=ln-xe;if(Ie<0||Ie===1/0)return;qt.setup(Y,j,Bt,Z,Vt);let bn,pe=Ht;if(Vt!==null&&(bn=ot.get(Vt),pe=Dt,pe.setIndex(bn)),Y.isMesh)j.wireframe===!0?(pt.setLineWidth(j.wireframeLinewidth*st()),pe.setMode(O.LINES)):pe.setMode(O.TRIANGLES);else if(Y.isLine){let Qt=j.linewidth;Qt===void 0&&(Qt=1),pt.setLineWidth(Qt*st()),Y.isLineSegments?pe.setMode(O.LINES):Y.isLineLoop?pe.setMode(O.LINE_LOOP):pe.setMode(O.LINE_STRIP)}else Y.isPoints?pe.setMode(O.POINTS):Y.isSprite&&pe.setMode(O.TRIANGLES);if(Y.isBatchedMesh)pe.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else if(Y.isInstancedMesh)pe.renderInstances(xe,Ie,Y.count);else if(Z.isInstancedBufferGeometry){let Qt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ni=Math.min(Z.instanceCount,Qt);pe.renderInstances(xe,Ie,Ni)}else pe.render(xe,Ie)};function ce(R,W,Z){R.transparent===!0&&R.side===Fn&&R.forceSinglePass===!1?(R.side=sn,R.needsUpdate=!0,ke(R,W,Z),R.side=tr,R.needsUpdate=!0,ke(R,W,Z),R.side=Fn):ke(R,W,Z)}this.compile=function(R,W,Z=null){Z===null&&(Z=R),m=Nt.get(Z),m.init(),y.push(m),Z.traverseVisible(function(Y){Y.isLight&&Y.layers.test(W.layers)&&(m.pushLight(Y),Y.castShadow&&m.pushShadow(Y))}),R!==Z&&R.traverseVisible(function(Y){Y.isLight&&Y.layers.test(W.layers)&&(m.pushLight(Y),Y.castShadow&&m.pushShadow(Y))}),m.setupLights(v._useLegacyLights);let j=new Set;return R.traverse(function(Y){let Et=Y.material;if(Et)if(Array.isArray(Et))for(let Lt=0;Lt<Et.length;Lt++){let Bt=Et[Lt];ce(Bt,Z,Y),j.add(Bt)}else ce(Et,Z,Y),j.add(Et)}),y.pop(),m=null,j},this.compileAsync=function(R,W,Z=null){let j=this.compile(R,W,Z);return new Promise(Y=>{function Et(){if(j.forEach(function(Lt){Xt.get(Lt).currentProgram.isReady()&&j.delete(Lt)}),j.size===0){Y(R);return}setTimeout(Et,10)}dt.get("KHR_parallel_shader_compile")!==null?Et():setTimeout(Et,10)})};let ue=null;function Pe(R){ue&&ue(R)}function Le(){We.stop()}function oe(){We.start()}let We=new $p;We.setAnimationLoop(Pe),typeof self<"u"&&We.setContext(self),this.setAnimationLoop=function(R){ue=R,jt.setAnimationLoop(R),R===null?We.stop():We.start()},jt.addEventListener("sessionstart",Le),jt.addEventListener("sessionend",oe),this.render=function(R,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),jt.enabled===!0&&jt.isPresenting===!0&&(jt.cameraAutoUpdate===!0&&jt.updateCamera(W),W=jt.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,W,E),m=Nt.get(R,y.length),m.init(),y.push(m),I.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),K.setFromProjectionMatrix(I),F=this.localClippingEnabled,nt=Zt.init(this.clippingPlanes,F),g=At.get(R,d.length),g.init(),d.push(g),Wn(R,W,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(Q,tt),this.info.render.frame++,nt===!0&&Zt.beginShadows();let Z=m.state.shadowsArray;if(lt.render(Z,R,W),nt===!0&&Zt.endShadows(),this.info.autoReset===!0&&this.info.reset(),se.render(g,R),m.setupLights(v._useLegacyLights),W.isArrayCamera){let j=W.cameras;for(let Y=0,Et=j.length;Y<Et;Y++){let Lt=j[Y];ee(g,R,Lt,Lt.viewport)}}else ee(g,R,W);E!==null&&(P.updateMultisampleRenderTarget(E),P.updateRenderTargetMipmap(E)),R.isScene===!0&&R.onAfterRender(v,R,W),qt.resetDefaultState(),C=-1,_=null,y.pop(),y.length>0?m=y[y.length-1]:m=null,d.pop(),d.length>0?g=d[d.length-1]:g=null};function Wn(R,W,Z,j){if(R.visible===!1)return;if(R.layers.test(W.layers)){if(R.isGroup)Z=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(W);else if(R.isLight)m.pushLight(R),R.castShadow&&m.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||K.intersectsSprite(R)){j&&k.setFromMatrixPosition(R.matrixWorld).applyMatrix4(I);let Lt=ft.update(R),Bt=R.material;Bt.visible&&g.push(R,Lt,Bt,Z,k.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||K.intersectsObject(R))){let Lt=ft.update(R),Bt=R.material;if(j&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),k.copy(R.boundingSphere.center)):(Lt.boundingSphere===null&&Lt.computeBoundingSphere(),k.copy(Lt.boundingSphere.center)),k.applyMatrix4(R.matrixWorld).applyMatrix4(I)),Array.isArray(Bt)){let Vt=Lt.groups;for(let Kt=0,$t=Vt.length;Kt<$t;Kt++){let Gt=Vt[Kt],xe=Bt[Gt.materialIndex];xe&&xe.visible&&g.push(R,Lt,xe,Z,k.z,Gt)}}else Bt.visible&&g.push(R,Lt,Bt,Z,k.z,null)}}let Et=R.children;for(let Lt=0,Bt=Et.length;Lt<Bt;Lt++)Wn(Et[Lt],W,Z,j)}function ee(R,W,Z,j){let Y=R.opaque,Et=R.transmissive,Lt=R.transparent;m.setupLightsView(Z),nt===!0&&Zt.setGlobalState(v.clippingPlanes,Z),Et.length>0&&Xn(Y,Et,W,Z),j&&pt.viewport(S.copy(j)),Y.length>0&&Xe(Y,W,Z),Et.length>0&&Xe(Et,W,Z),Lt.length>0&&Xe(Lt,W,Z),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function Xn(R,W,Z,j){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;let Et=et.isWebGL2;w===null&&(w=new pn(1,1,{generateMipmaps:!0,type:dt.has("EXT_color_buffer_half_float")?jn:Qi,minFilter:Pa,samples:Et?4:0})),v.getDrawingBufferSize(N),Et?w.setSize(N.x,N.y):w.setSize(Ko(N.x),Ko(N.y));let Lt=v.getRenderTarget();v.setRenderTarget(w),v.getClearColor(X),D=v.getClearAlpha(),D<1&&v.setClearColor(16777215,.5),v.clear();let Bt=v.toneMapping;v.toneMapping=ji,Xe(R,Z,j),P.updateMultisampleRenderTarget(w),P.updateRenderTargetMipmap(w);let Vt=!1;for(let Kt=0,$t=W.length;Kt<$t;Kt++){let Gt=W[Kt],xe=Gt.object,ln=Gt.geometry,Ie=Gt.material,bn=Gt.group;if(Ie.side===Fn&&xe.layers.test(j.layers)){let pe=Ie.side;Ie.side=sn,Ie.needsUpdate=!0,on(xe,Z,j,ln,Ie,bn),Ie.side=pe,Ie.needsUpdate=!0,Vt=!0}}Vt===!0&&(P.updateMultisampleRenderTarget(w),P.updateRenderTargetMipmap(w)),v.setRenderTarget(Lt),v.setClearColor(X,D),v.toneMapping=Bt}function Xe(R,W,Z){let j=W.isScene===!0?W.overrideMaterial:null;for(let Y=0,Et=R.length;Y<Et;Y++){let Lt=R[Y],Bt=Lt.object,Vt=Lt.geometry,Kt=j===null?Lt.material:j,$t=Lt.group;Bt.layers.test(Z.layers)&&on(Bt,W,Z,Vt,Kt,$t)}}function on(R,W,Z,j,Y,Et){R.onBeforeRender(v,W,Z,j,Y,Et),R.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),Y.onBeforeRender(v,W,Z,j,R,Et),Y.transparent===!0&&Y.side===Fn&&Y.forceSinglePass===!1?(Y.side=sn,Y.needsUpdate=!0,v.renderBufferDirect(Z,W,j,Y,R,Et),Y.side=tr,Y.needsUpdate=!0,v.renderBufferDirect(Z,W,j,Y,R,Et),Y.side=Fn):v.renderBufferDirect(Z,W,j,Y,R,Et),R.onAfterRender(v,W,Z,j,Y,Et)}function ke(R,W,Z){W.isScene!==!0&&(W=$);let j=Xt.get(R),Y=m.state.lights,Et=m.state.shadowsArray,Lt=Y.state.version,Bt=Pt.getParameters(R,Y.state,Et,W,Z),Vt=Pt.getProgramCacheKey(Bt),Kt=j.programs;j.environment=R.isMeshStandardMaterial?W.environment:null,j.fog=W.fog,j.envMap=(R.isMeshStandardMaterial?q:A).get(R.envMap||j.environment),Kt===void 0&&(R.addEventListener("dispose",yt),Kt=new Map,j.programs=Kt);let $t=Kt.get(Vt);if($t!==void 0){if(j.currentProgram===$t&&j.lightsStateVersion===Lt)return hr(R,Bt),$t}else Bt.uniforms=Pt.getUniforms(R),R.onBuild(Z,Bt,v),R.onBeforeCompile(Bt,v),$t=Pt.acquireProgram(Bt,Vt),Kt.set(Vt,$t),j.uniforms=Bt.uniforms;let Gt=j.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Gt.clippingPlanes=Zt.uniform),hr(R,Bt),j.needsLights=fr(R),j.lightsStateVersion=Lt,j.needsLights&&(Gt.ambientLightColor.value=Y.state.ambient,Gt.lightProbe.value=Y.state.probe,Gt.directionalLights.value=Y.state.directional,Gt.directionalLightShadows.value=Y.state.directionalShadow,Gt.spotLights.value=Y.state.spot,Gt.spotLightShadows.value=Y.state.spotShadow,Gt.rectAreaLights.value=Y.state.rectArea,Gt.ltc_1.value=Y.state.rectAreaLTC1,Gt.ltc_2.value=Y.state.rectAreaLTC2,Gt.pointLights.value=Y.state.point,Gt.pointLightShadows.value=Y.state.pointShadow,Gt.hemisphereLights.value=Y.state.hemi,Gt.directionalShadowMap.value=Y.state.directionalShadowMap,Gt.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Gt.spotShadowMap.value=Y.state.spotShadowMap,Gt.spotLightMatrix.value=Y.state.spotLightMatrix,Gt.spotLightMap.value=Y.state.spotLightMap,Gt.pointShadowMap.value=Y.state.pointShadowMap,Gt.pointShadowMatrix.value=Y.state.pointShadowMatrix),j.currentProgram=$t,j.uniformsList=null,$t}function na(R){if(R.uniformsList===null){let W=R.currentProgram.getUniforms();R.uniformsList=As.seqWithValue(W.seq,R.uniforms)}return R.uniformsList}function hr(R,W){let Z=Xt.get(R);Z.outputColorSpace=W.outputColorSpace,Z.batching=W.batching,Z.instancing=W.instancing,Z.instancingColor=W.instancingColor,Z.skinning=W.skinning,Z.morphTargets=W.morphTargets,Z.morphNormals=W.morphNormals,Z.morphColors=W.morphColors,Z.morphTargetsCount=W.morphTargetsCount,Z.numClippingPlanes=W.numClippingPlanes,Z.numIntersection=W.numClipIntersection,Z.vertexAlphas=W.vertexAlphas,Z.vertexTangents=W.vertexTangents,Z.toneMapping=W.toneMapping}function tc(R,W,Z,j,Y){W.isScene!==!0&&(W=$),P.resetTextureUnits();let Et=W.fog,Lt=j.isMeshStandardMaterial?W.environment:null,Bt=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Li,Vt=(j.isMeshStandardMaterial?q:A).get(j.envMap||Lt),Kt=j.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,$t=!!Z.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Gt=!!Z.morphAttributes.position,xe=!!Z.morphAttributes.normal,ln=!!Z.morphAttributes.color,Ie=ji;j.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Ie=v.toneMapping);let bn=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,pe=bn!==void 0?bn.length:0,Qt=Xt.get(j),Ni=m.state.lights;if(nt===!0&&(F===!0||R!==_)){let It=R===_&&j.id===C;Zt.setState(j,R,It)}let ve=!1;j.version===Qt.__version?(Qt.needsLights&&Qt.lightsStateVersion!==Ni.state.version||Qt.outputColorSpace!==Bt||Y.isBatchedMesh&&Qt.batching===!1||!Y.isBatchedMesh&&Qt.batching===!0||Y.isInstancedMesh&&Qt.instancing===!1||!Y.isInstancedMesh&&Qt.instancing===!0||Y.isSkinnedMesh&&Qt.skinning===!1||!Y.isSkinnedMesh&&Qt.skinning===!0||Y.isInstancedMesh&&Qt.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Qt.instancingColor===!1&&Y.instanceColor!==null||Qt.envMap!==Vt||j.fog===!0&&Qt.fog!==Et||Qt.numClippingPlanes!==void 0&&(Qt.numClippingPlanes!==Zt.numPlanes||Qt.numIntersection!==Zt.numIntersection)||Qt.vertexAlphas!==Kt||Qt.vertexTangents!==$t||Qt.morphTargets!==Gt||Qt.morphNormals!==xe||Qt.morphColors!==ln||Qt.toneMapping!==Ie||et.isWebGL2===!0&&Qt.morphTargetsCount!==pe)&&(ve=!0):(ve=!0,Qt.__version=j.version);let mi=Qt.currentProgram;ve===!0&&(mi=ke(j,W,Y));let Qa=!1,dr=!1,ia=!1,G=mi.getUniforms(),rt=Qt.uniforms;if(pt.useProgram(mi.program)&&(Qa=!0,dr=!0,ia=!0),j.id!==C&&(C=j.id,dr=!0),Qa||_!==R){G.setValue(O,"projectionMatrix",R.projectionMatrix),G.setValue(O,"viewMatrix",R.matrixWorldInverse);let It=G.map.cameraPosition;It!==void 0&&It.setValue(O,k.setFromMatrixPosition(R.matrixWorld)),et.logarithmicDepthBuffer&&G.setValue(O,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&G.setValue(O,"isOrthographic",R.isOrthographicCamera===!0),_!==R&&(_=R,dr=!0,ia=!0)}if(Y.isSkinnedMesh){G.setOptional(O,Y,"bindMatrix"),G.setOptional(O,Y,"bindMatrixInverse");let It=Y.skeleton;It&&(et.floatVertexTextures?(It.boneTexture===null&&It.computeBoneTexture(),G.setValue(O,"boneTexture",It.boneTexture,P)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Y.isBatchedMesh&&(G.setOptional(O,Y,"batchingTexture"),G.setValue(O,"batchingTexture",Y._matricesTexture,P));let St=Z.morphAttributes;if((St.position!==void 0||St.normal!==void 0||St.color!==void 0&&et.isWebGL2===!0)&&Jt.update(Y,Z,mi),(dr||Qt.receiveShadow!==Y.receiveShadow)&&(Qt.receiveShadow=Y.receiveShadow,G.setValue(O,"receiveShadow",Y.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(rt.envMap.value=Vt,rt.flipEnvMap.value=Vt.isCubeTexture&&Vt.isRenderTargetTexture===!1?-1:1),dr&&(G.setValue(O,"toneMappingExposure",v.toneMappingExposure),Qt.needsLights&&Ui(rt,ia),Et&&j.fog===!0&&Mt.refreshFogUniforms(rt,Et),Mt.refreshMaterialUniforms(rt,j,J,H,w),As.upload(O,na(Qt),rt,P)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(As.upload(O,na(Qt),rt,P),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&G.setValue(O,"center",Y.center),G.setValue(O,"modelViewMatrix",Y.modelViewMatrix),G.setValue(O,"normalMatrix",Y.normalMatrix),G.setValue(O,"modelMatrix",Y.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){let It=j.uniformsGroups;for(let ie=0,Ut=It.length;ie<Ut;ie++)if(et.isWebGL2){let gt=It[ie];ae.update(gt,mi),ae.bind(gt,mi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return mi}function Ui(R,W){R.ambientLightColor.needsUpdate=W,R.lightProbe.needsUpdate=W,R.directionalLights.needsUpdate=W,R.directionalLightShadows.needsUpdate=W,R.pointLights.needsUpdate=W,R.pointLightShadows.needsUpdate=W,R.spotLights.needsUpdate=W,R.spotLightShadows.needsUpdate=W,R.rectAreaLights.needsUpdate=W,R.hemisphereLights.needsUpdate=W}function fr(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(R,W,Z){Xt.get(R.texture).__webglTexture=W,Xt.get(R.depthTexture).__webglTexture=Z;let j=Xt.get(R);j.__hasExternalTextures=!0,j.__hasExternalTextures&&(j.__autoAllocateDepthBuffer=Z===void 0,j.__autoAllocateDepthBuffer||dt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,W){let Z=Xt.get(R);Z.__webglFramebuffer=W,Z.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(R,W=0,Z=0){E=R,T=W,M=Z;let j=!0,Y=null,Et=!1,Lt=!1;if(R){let Vt=Xt.get(R);Vt.__useDefaultFramebuffer!==void 0?(pt.bindFramebuffer(O.FRAMEBUFFER,null),j=!1):Vt.__webglFramebuffer===void 0?P.setupRenderTarget(R):Vt.__hasExternalTextures&&P.rebindTextures(R,Xt.get(R.texture).__webglTexture,Xt.get(R.depthTexture).__webglTexture);let Kt=R.texture;(Kt.isData3DTexture||Kt.isDataArrayTexture||Kt.isCompressedArrayTexture)&&(Lt=!0);let $t=Xt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray($t[W])?Y=$t[W][Z]:Y=$t[W],Et=!0):et.isWebGL2&&R.samples>0&&P.useMultisampledRTT(R)===!1?Y=Xt.get(R).__webglMultisampledFramebuffer:Array.isArray($t)?Y=$t[Z]:Y=$t,S.copy(R.viewport),L.copy(R.scissor),U=R.scissorTest}else S.copy(it).multiplyScalar(J).floor(),L.copy(at).multiplyScalar(J).floor(),U=mt;if(pt.bindFramebuffer(O.FRAMEBUFFER,Y)&&et.drawBuffers&&j&&pt.drawBuffers(R,Y),pt.viewport(S),pt.scissor(L),pt.setScissorTest(U),Et){let Vt=Xt.get(R.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+W,Vt.__webglTexture,Z)}else if(Lt){let Vt=Xt.get(R.texture),Kt=W||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Vt.__webglTexture,Z||0,Kt)}C=-1},this.readRenderTargetPixels=function(R,W,Z,j,Y,Et,Lt){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Bt=Xt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Lt!==void 0&&(Bt=Bt[Lt]),Bt){pt.bindFramebuffer(O.FRAMEBUFFER,Bt);try{let Vt=R.texture,Kt=Vt.format,$t=Vt.type;if(Kt!==Kn&&Ct.convert(Kt)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Gt=$t===jn&&(dt.has("EXT_color_buffer_half_float")||et.isWebGL2&&dt.has("EXT_color_buffer_float"));if($t!==Qi&&Ct.convert($t)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!($t===Ki&&(et.isWebGL2||dt.has("OES_texture_float")||dt.has("WEBGL_color_buffer_float")))&&!Gt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=R.width-j&&Z>=0&&Z<=R.height-Y&&O.readPixels(W,Z,j,Y,Ct.convert(Kt),Ct.convert($t),Et)}finally{let Vt=E!==null?Xt.get(E).__webglFramebuffer:null;pt.bindFramebuffer(O.FRAMEBUFFER,Vt)}}},this.copyFramebufferToTexture=function(R,W,Z=0){let j=Math.pow(2,-Z),Y=Math.floor(W.image.width*j),Et=Math.floor(W.image.height*j);P.setTexture2D(W,0),O.copyTexSubImage2D(O.TEXTURE_2D,Z,0,0,R.x,R.y,Y,Et),pt.unbindTexture()},this.copyTextureToTexture=function(R,W,Z,j=0){let Y=W.image.width,Et=W.image.height,Lt=Ct.convert(Z.format),Bt=Ct.convert(Z.type);P.setTexture2D(Z,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,Z.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,Z.unpackAlignment),W.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,j,R.x,R.y,Y,Et,Lt,Bt,W.image.data):W.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,j,R.x,R.y,W.mipmaps[0].width,W.mipmaps[0].height,Lt,W.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,j,R.x,R.y,Lt,Bt,W.image),j===0&&Z.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),pt.unbindTexture()},this.copyTextureToTexture3D=function(R,W,Z,j,Y=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Et=R.max.x-R.min.x+1,Lt=R.max.y-R.min.y+1,Bt=R.max.z-R.min.z+1,Vt=Ct.convert(j.format),Kt=Ct.convert(j.type),$t;if(j.isData3DTexture)P.setTexture3D(j,0),$t=O.TEXTURE_3D;else if(j.isDataArrayTexture||j.isCompressedArrayTexture)P.setTexture2DArray(j,0),$t=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,j.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,j.unpackAlignment);let Gt=O.getParameter(O.UNPACK_ROW_LENGTH),xe=O.getParameter(O.UNPACK_IMAGE_HEIGHT),ln=O.getParameter(O.UNPACK_SKIP_PIXELS),Ie=O.getParameter(O.UNPACK_SKIP_ROWS),bn=O.getParameter(O.UNPACK_SKIP_IMAGES),pe=Z.isCompressedTexture?Z.mipmaps[Y]:Z.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,pe.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,pe.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,R.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,R.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,R.min.z),Z.isDataTexture||Z.isData3DTexture?O.texSubImage3D($t,Y,W.x,W.y,W.z,Et,Lt,Bt,Vt,Kt,pe.data):Z.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D($t,Y,W.x,W.y,W.z,Et,Lt,Bt,Vt,pe.data)):O.texSubImage3D($t,Y,W.x,W.y,W.z,Et,Lt,Bt,Vt,Kt,pe),O.pixelStorei(O.UNPACK_ROW_LENGTH,Gt),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,xe),O.pixelStorei(O.UNPACK_SKIP_PIXELS,ln),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ie),O.pixelStorei(O.UNPACK_SKIP_IMAGES,bn),Y===0&&j.generateMipmaps&&O.generateMipmap($t),pt.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?P.setTextureCube(R,0):R.isData3DTexture?P.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?P.setTexture2DArray(R,0):P.setTexture2D(R,0),pt.unbindTexture()},this.resetState=function(){T=0,M=0,E=null,pt.reset(),qt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===mh?"display-p3":"srgb",e.unpackColorSpace=le.workingColorSpace===Ml?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Fe?Fr:kp}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Fr?Fe:Li}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},Zu=class extends Da{};Zu.prototype.isWebGL1Renderer=!0;var cl=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Rt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ns=class extends Ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}};var ul=class extends an{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ys=new Te,bp=new Te,ko=[],Sp=new Ii,QM=new Te,Sa=new Ot,Ea=new nr,hl=class extends Ot{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ul(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,QM)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ii),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ys),Sp.copy(t.boundingBox).applyMatrix4(ys),this.boundingBox.union(Sp)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new nr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ys),Ea.copy(t.boundingSphere).applyMatrix4(ys),this.boundingSphere.union(Ea)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){let n=this.matrixWorld,r=this.count;if(Sa.geometry=this.geometry,Sa.material=this.material,Sa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ea.copy(this.boundingSphere),Ea.applyMatrix4(n),t.ray.intersectsSphere(Ea)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,ys),bp.multiplyMatrices(n,ys),Sa.matrixWorld=bp,Sa.raycast(t,ko);for(let a=0,o=ko.length;a<o;a++){let l=ko[a];l.instanceId=s,l.object=this,e.push(l)}ko.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ul(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Ua=class extends ir{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Ep=new Te,Ju=new nl,Vo=new nr,Ho=new V,fl=class extends Ge{constructor(t=new Ze,e=new Ua){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vo.copy(n.boundingSphere),Vo.applyMatrix4(r),Vo.radius+=s,t.ray.intersectsSphere(Vo)===!1)return;Ep.copy(r).invert(),Ju.copy(t.ray).applyMatrix4(Ep);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){let f=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let x=f,g=p;x<g;x++){let m=c.getX(x);Ho.fromBufferAttribute(h,m),Tp(Ho,m,l,r,t,e,this)}}else{let f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let x=f,g=p;x<g;x++)Ho.fromBufferAttribute(h,x),Tp(Ho,x,l,r,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Tp(i,t,e,n,r,s,a){let o=Ju.distanceSqToPoint(i);if(o<e){let l=new V;Ju.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,object:a})}}var Na=class extends zn{constructor(t,e,n,r,s,a,o,l,c){super(t,e,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var dl=class i extends Ze{constructor(t=1,e=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:r},e=Math.max(3,e);let s=[],a=[],o=[],l=[],c=new V,u=new zt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=e;h++,f+=3){let p=n+h/e*r;c.x=t*Math.cos(p),c.y=t*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[f]/t+1)/2,u.y=(a[f+1]/t+1)/2,l.push(u.x,u.y)}for(let h=1;h<=e;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new de(a,3)),this.setAttribute("normal",new de(o,3)),this.setAttribute("uv",new de(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},kn=class i extends Ze{constructor(t=1,e=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],h=[],f=[],p=[],x=0,g=[],m=n/2,d=0;y(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new de(h,3)),this.setAttribute("normal",new de(f,3)),this.setAttribute("uv",new de(p,2));function y(){let b=new V,T=new V,M=0,E=(e-t)/n;for(let C=0;C<=s;C++){let _=[],S=C/s,L=S*(e-t)+t;for(let U=0;U<=r;U++){let X=U/r,D=X*l+o,z=Math.sin(D),H=Math.cos(D);T.x=L*z,T.y=-S*n+m,T.z=L*H,h.push(T.x,T.y,T.z),b.set(z,E,H).normalize(),f.push(b.x,b.y,b.z),p.push(X,1-S),_.push(x++)}g.push(_)}for(let C=0;C<r;C++)for(let _=0;_<s;_++){let S=g[_][C],L=g[_+1][C],U=g[_+1][C+1],X=g[_][C+1];u.push(S,L,X),u.push(L,U,X),M+=6}c.addGroup(d,M,0),d+=M}function v(b){let T=x,M=new zt,E=new V,C=0,_=b===!0?t:e,S=b===!0?1:-1;for(let U=1;U<=r;U++)h.push(0,m*S,0),f.push(0,S,0),p.push(.5,.5),x++;let L=x;for(let U=0;U<=r;U++){let D=U/r*l+o,z=Math.cos(D),H=Math.sin(D);E.x=_*H,E.y=m*S,E.z=_*z,h.push(E.x,E.y,E.z),f.push(0,S,0),M.x=z*.5+.5,M.y=H*.5*S+.5,p.push(M.x,M.y),x++}for(let U=0;U<r;U++){let X=T+U,D=L+U;b===!0?u.push(D,D+1,X):u.push(D+1,D,X),C+=3}c.addGroup(d,C,b===!0?1:2),d+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},pl=class i extends kn{constructor(t=1,e=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var ml=class i extends Ze{constructor(t=.5,e=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],l=[],c=[],u=[],h=t,f=(e-t)/r,p=new V,x=new zt;for(let g=0;g<=r;g++){for(let m=0;m<=n;m++){let d=s+m/n*a;p.x=h*Math.cos(d),p.y=h*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),x.x=(p.x/e+1)/2,x.y=(p.y/e+1)/2,u.push(x.x,x.y)}h+=f}for(let g=0;g<r;g++){let m=g*(n+1);for(let d=0;d<n;d++){let y=d+m,v=y,b=y+n+1,T=y+n+2,M=y+1;o.push(v,b,M),o.push(b,T,M)}}this.setIndex(o),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(c,3)),this.setAttribute("uv",new de(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var rr=class i extends Ze{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],h=new V,f=new V,p=[],x=[],g=[],m=[];for(let d=0;d<=n;d++){let y=[],v=d/n,b=0;d===0&&a===0?b=.5/e:d===n&&l===Math.PI&&(b=-.5/e);for(let T=0;T<=e;T++){let M=T/e;h.x=-t*Math.cos(r+M*s)*Math.sin(a+v*o),h.y=t*Math.cos(a+v*o),h.z=t*Math.sin(r+M*s)*Math.sin(a+v*o),x.push(h.x,h.y,h.z),f.copy(h).normalize(),g.push(f.x,f.y,f.z),m.push(M+b,1-v),y.push(c++)}u.push(y)}for(let d=0;d<n;d++)for(let y=0;y<e;y++){let v=u[d][y+1],b=u[d][y],T=u[d+1][y],M=u[d+1][y+1];(d!==0||a>0)&&p.push(v,b,M),(d!==n-1||l<Math.PI)&&p.push(b,T,M)}this.setIndex(p),this.setAttribute("position",new de(x,3)),this.setAttribute("normal",new de(g,3)),this.setAttribute("uv",new de(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Vn=class i extends Ze{constructor(t=1,e=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);let a=[],o=[],l=[],c=[],u=new V,h=new V,f=new V;for(let p=0;p<=n;p++)for(let x=0;x<=r;x++){let g=x/r*s,m=p/n*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(g),h.y=(t+e*Math.cos(m))*Math.sin(g),h.z=e*Math.sin(m),o.push(h.x,h.y,h.z),u.x=t*Math.cos(g),u.y=t*Math.sin(g),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(x/r),c.push(p/n)}for(let p=1;p<=n;p++)for(let x=1;x<=r;x++){let g=(r+1)*p+x-1,m=(r+1)*(p-1)+x-1,d=(r+1)*(p-1)+x,y=(r+1)*p+x;a.push(g,m,y),a.push(m,d,y)}this.setIndex(a),this.setAttribute("position",new de(o,3)),this.setAttribute("normal",new de(l,3)),this.setAttribute("uv",new de(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var gl=class extends Ue{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Hn=class extends ir{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Rt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vp,this.normalScale=new zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Oa=class extends Hn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new zt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return nn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Rt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Rt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Rt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function Go(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function tb(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Os=class{constructor(t,e,n,r){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,r=e[n],s=e[n-1];n:{t:{let a;e:{i:if(!(t<r)){for(let o=n+2;;){if(r===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=e[++n],t<r)break t}a=e.length;break e}if(!(t>=s)){let o=e[1];t<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=e[--n-1],t>=s)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(r=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,t,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=t*r;for(let a=0;a!==r;++a)e[a]=n[s+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ku=class extends Os{constructor(t,e,n,r){super(t,e,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Id,endingEnd:Id}}intervalChanged_(t,e,n){let r=this.parameterPositions,s=t-2,a=t+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Dd:s=t,o=2*e-n;break;case Ud:s=r.length-2,o=e+r[s]-r[s+1];break;default:s=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Dd:a=t,l=2*n-e;break;case Ud:a=1,l=n+r[1]-r[0];break;default:a=t-1,l=e}let c=(n-e)*.5,u=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(t,e,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,p=this._weightNext,x=(n-e)/(r-e),g=x*x,m=g*x,d=-f*m+2*f*g-f*x,y=(1+f)*m+(-1.5-2*f)*g+(-.5+f)*x+1,v=(-1-p)*m+(1.5+p)*g+.5*x,b=p*m-p*g;for(let T=0;T!==o;++T)s[T]=d*a[u+T]+y*a[c+T]+v*a[l+T]+b*a[h+T];return s}},ju=class extends Os{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t,e,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(n-e)/(r-e),h=1-u;for(let f=0;f!==o;++f)s[f]=a[c+f]*h+a[l+f]*u;return s}},Qu=class extends Os{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t){return this.copySampleValue_(t-1)}},ti=class{constructor(t,e,n,r){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Go(e,this.TimeBufferType),this.values=Go(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Go(t.times,Array),values:Go(t.values,Array)};let r=t.getInterpolation();r!==t.DefaultInterpolation&&(n.interpolation=r)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Qu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ju(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ku(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Xo:e=this.InterpolantFactoryMethodDiscrete;break;case qo:e=this.InterpolantFactoryMethodLinear;break;case eu:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Xo;case this.InterpolantFactoryMethodLinear:return qo;case this.InterpolantFactoryMethodSmooth:return eu}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,r=e.length;n!==r;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,r=e.length;n!==r;++n)e[n]*=t}return this}trim(t,e){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<t;)++s;for(;a!==-1&&n[a]>e;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(r!==void 0&&tb(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===eu,s=t.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(r)l=!0;else{let h=o*n,f=h-n,p=h+n;for(let x=0;x!==n;++x){let g=e[h+x];if(g!==e[f+x]||g!==e[p+x]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let h=o*n,f=a*n;for(let p=0;p!==n;++p)e[f+p]=e[h+p]}++a}}if(s>0){t[a]=t[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,r=new n(this.name,t,e);return r.createInterpolant=this.createInterpolant,r}};ti.prototype.TimeBufferType=Float32Array;ti.prototype.ValueBufferType=Float32Array;ti.prototype.DefaultInterpolation=qo;var kr=class extends ti{};kr.prototype.ValueTypeName="bool";kr.prototype.ValueBufferType=Array;kr.prototype.DefaultInterpolation=Xo;kr.prototype.InterpolantFactoryMethodLinear=void 0;kr.prototype.InterpolantFactoryMethodSmooth=void 0;var th=class extends ti{};th.prototype.ValueTypeName="color";var eh=class extends ti{};eh.prototype.ValueTypeName="number";var nh=class extends Os{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t,e,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(r-e),c=t*o;for(let u=c+o;c!==u;c+=4)fi.slerpFlat(s,0,a,c-o,a,c,l);return s}},Fa=class extends ti{InterpolantFactoryMethodLinear(t){return new nh(this.times,this.values,this.getValueSize(),t)}};Fa.prototype.ValueTypeName="quaternion";Fa.prototype.DefaultInterpolation=qo;Fa.prototype.InterpolantFactoryMethodSmooth=void 0;var Vr=class extends ti{};Vr.prototype.ValueTypeName="string";Vr.prototype.ValueBufferType=Array;Vr.prototype.DefaultInterpolation=Xo;Vr.prototype.InterpolantFactoryMethodLinear=void 0;Vr.prototype.InterpolantFactoryMethodSmooth=void 0;var ih=class extends ti{};ih.prototype.ValueTypeName="vector";var rh=class{constructor(t,e,n){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){let p=c[h],x=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return x}return null}}},eb=new rh,sh=class{constructor(t){this.manager=t!==void 0?t:eb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(r,s){n.load(t,r,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};sh.DEFAULT_MATERIAL_NAME="__DEFAULT";var _l=class extends Ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Rt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}};var Eu=new Te,wp=new V,Ap=new V,xl=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new zt(512,512),this.map=null,this.mapPass=null,this.matrix=new Te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ia,this._frameExtents=new zt(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;wp.setFromMatrixPosition(t.matrixWorld),e.position.copy(wp),Ap.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ap),e.updateMatrixWorld(),Eu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Eu),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Eu)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Cp=new Te,Ta=new V,Tu=new V,ah=class extends xl{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new zt(4,2),this._viewportCount=6,this._viewports=[new be(2,1,1,1),new be(0,1,1,1),new be(3,1,1,1),new be(1,1,1,1),new be(3,0,1,1),new be(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,r=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ta.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ta),Tu.copy(n.position),Tu.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Tu),n.updateMatrixWorld(),r.makeTranslation(-Ta.x,-Ta.y,-Ta.z),Cp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cp)}},sr=class extends _l{constructor(t,e,n=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new ah}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},oh=class extends xl{constructor(){super(new Ds(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},vl=class extends _l{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ge.DEFAULT_UP),this.updateMatrix(),this.target=new Ge,this.shadow=new oh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Fs=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Rp(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Rp();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Rp(){return(typeof performance>"u"?Date:performance).now()}var xh="\\[\\]\\.:\\/",nb=new RegExp("["+xh+"]","g"),vh="[^"+xh+"]",ib="[^"+xh.replace("\\.","")+"]",rb=/((?:WC+[\/:])*)/.source.replace("WC",vh),sb=/(WCOD+)?/.source.replace("WCOD",ib),ab=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",vh),ob=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",vh),lb=new RegExp("^"+rb+sb+ab+ob+"$"),cb=["material","materials","bones","map"],lh=class{constructor(t,e,n){let r=n||Me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,r)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Me=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(nb,"")}static parseTrackName(t){let e=lb.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);cb.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},r=n(t.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)t[e++]=n[r]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,r=e.propertyName,s=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[r];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Me.Composite=lh;Me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Me.prototype.GetterByBindingType=[Me.prototype._getValue_direct,Me.prototype._getValue_array,Me.prototype._getValue_arrayElement,Me.prototype._getValue_toArray];Me.prototype.SetterByBindingTypeAndVersioning=[[Me.prototype._setValue_direct,Me.prototype._setValue_direct_setNeedsUpdate,Me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_array,Me.prototype._setValue_array_setNeedsUpdate,Me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_arrayElement,Me.prototype._setValue_arrayElement_setNeedsUpdate,Me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_fromArray,Me.prototype._setValue_fromArray_setNeedsUpdate,Me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var aS=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ch}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ch);var Sl=class extends Ns{constructor(t=null){super();let e=new zr;e.deleteAttribute("uv");let n=new Hn({side:sn}),r=new Hn,s=5;t!==null&&t._useLegacyLights===!1&&(s=900);let a=new sr(16777215,s,28,2);a.position.set(.418,16.199,.3),this.add(a);let o=new Ot(e,n);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);let l=new Ot(e,r);l.position.set(-10.906,2.009,1.846),l.rotation.set(0,-.195,0),l.scale.set(2.328,7.905,4.651),this.add(l);let c=new Ot(e,r);c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),this.add(c);let u=new Ot(e,r);u.position.set(6.167,.857,7.803),u.rotation.set(0,.561,0),u.scale.set(3.927,6.285,3.687),this.add(u);let h=new Ot(e,r);h.position.set(-2.017,.018,6.124),h.rotation.set(0,.333,0),h.scale.set(2.002,4.566,2.064),this.add(h);let f=new Ot(e,r);f.position.set(2.291,-.756,-2.621),f.rotation.set(0,-.286,0),f.scale.set(1.546,1.552,1.496),this.add(f);let p=new Ot(e,r);p.position.set(-2.193,-.369,-5.547),p.rotation.set(0,.516,0),p.scale.set(3.875,3.487,2.986),this.add(p);let x=new Ot(e,ks(50));x.position.set(-16.116,14.37,8.208),x.scale.set(.1,2.428,2.739),this.add(x);let g=new Ot(e,ks(50));g.position.set(-16.109,18.021,-8.207),g.scale.set(.1,2.425,2.751),this.add(g);let m=new Ot(e,ks(17));m.position.set(14.904,12.198,-1.832),m.scale.set(.15,4.265,6.331),this.add(m);let d=new Ot(e,ks(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let y=new Ot(e,ks(20));y.position.set(3.235,11.486,-12.541),y.scale.set(2.5,2,.1),this.add(y);let v=new Ot(e,ks(100));v.position.set(0,20,0),v.scale.set(1,.1,1),this.add(v)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function ks(i){let t=new Qn;return t.color.setScalar(i),t}var El={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Cn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},ub=new Ds(-1,1,1,-1,0,1),yh=class extends Ze{constructor(){super(),this.setAttribute("position",new de([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new de([0,2,0,0,2,0],2))}},hb=new yh,or=class{constructor(t){this._mesh=new Ot(hb,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,ub)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var Tl=class extends Cn{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Ue?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ar.clone(t.uniforms),this.material=new Ue({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new or(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var za=class extends Cn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){let r=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}},wl=class extends Cn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var Al=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let n=t.getSize(new zt);this._width=n.width,this._height=n.height,e=new pn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:jn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Tl(El),this.copyPass.material.blending=hi,this.clock=new Fs}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),n=!1;for(let r=0,s=this.passes.length;r<s;r++){let a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}za!==void 0&&(a instanceof za?n=!0:a instanceof wl&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new zt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,r)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Cl=class extends Cn{constructor(t,e,n=null,r=null,s=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Rt}render(t,e,n){let r=t.autoClear;t.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor)),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=r}};var tm={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Rt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Vs=class i extends Cn{constructor(t,e,n,r){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=r,this.resolution=t!==void 0?new zt(t.x,t.y):new zt(256,256),this.clearColor=new Rt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new pn(s,a,{type:jn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let f=new pn(s,a,{type:jn});f.texture.name="UnrealBloomPass.h"+h,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);let p=new pn(s,a,{type:jn});p.texture.name="UnrealBloomPass.v"+h,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),s=Math.round(s/2),a=Math.round(a/2)}let o=tm;this.highPassUniforms=ar.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ue({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new zt(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new V(1,1,1),new V(1,1,1),new V(1,1,1),new V(1,1,1),new V(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let u=El;this.copyUniforms=ar.clone(u.uniforms),this.blendMaterial=new Ue({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Br,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Rt,this.oldClearAlpha=1,this.basic=new Qn,this.fsQuad=new or(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),r=Math.round(e/2);this.renderTargetBright.setSize(n,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,r),this.renderTargetsVertical[s].setSize(n,r),this.separableBlurMaterials[s].uniforms.invSize.value=new zt(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,e,n,r,s){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){let e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Ue({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new zt(.5,.5)},direction:{value:new zt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new Ue({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};Vs.BlurDirectionX=new zt(1,0);Vs.BlurDirectionY=new zt(0,1);var em={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Rl=class extends Cn{constructor(){super();let t=em;this.uniforms=ar.clone(t.uniforms),this.material=new gl({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new or(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},le.getTransfer(this._outputColorSpace)===fe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===uh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===hh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===fh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ba?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===dh&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var nm="#14112b";function Mh({numero:i,letra:t,color:e},n=256,r=null){let s=n/2,a=document.createElement("canvas");a.width=n,a.height=s;let o=a.getContext("2d"),l=n/1024,c=o.createLinearGradient(0,0,0,s);c.addColorStop(0,im(e,"#000000",.25)),c.addColorStop(.5,e),c.addColorStop(1,im(e,"#000000",.35)),o.fillStyle=c,o.fillRect(0,0,n,s);for(let h of[n*.25,n*.75])o.save(),o.translate(h,s/2),o.beginPath(),o.arc(0,0,132*l,0,Math.PI*2),o.fillStyle=nm,o.fill(),o.beginPath(),o.arc(0,0,116*l,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.fillStyle=nm,o.textAlign="center",o.textBaseline="middle",o.font=`${46*l}px Bungee, Impact, sans-serif`,o.fillText(t,0,-60*l),o.font=`${(String(i).length>1?104:124)*l}px Bungee, Impact, sans-serif`,o.fillText(String(i),0,22*l),o.restore();let u=new Na(a);return u.colorSpace=Fe,r&&(u.anisotropy=Math.min(8,r.capabilities.getMaxAnisotropy())),u}function rm(){let i=document.createElement("canvas");i.width=i.height=64;let t=i.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.35,"rgba(255,255,255,0.8)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new Na(i)}function im(i,t,e){let n=new Rt(i);return n.lerp(new Rt(t),e),"#"+n.getHexString()}var mn=2,ei=mn+.07,Gn=.2,Hs=4,sm=.4,bh=1.45,fb=.03,db=98,Pl=1,pb=6.8,mb=8.5,Hr=-3.05,Gr=-2.8,Gs=-2.55,Sh=2.5,am=3.3,om=2.95,lm="#1a0d36",cm=424,Ne=()=>new V,Eh=new V(0,1,0);function um(i,{columnaDe:t,colores:e,reducirMovimiento:n=!1}){let r=new Da({canvas:i,antialias:!0,powerPreference:"high-performance"}),s=Math.min(window.devicePixelRatio,1.75);r.setPixelRatio(s),r.toneMapping=Ba,r.toneMappingExposure=.85;let a=new Ns;a.background=new Rt(lm),a.fog=new cl(lm,16,36);let o=new Us(r);a.environment=o.fromScene(new Sl(r),.04).texture;let l=new rn(38,1,.1,90),c=new Al(r);c.addPass(new Cl(a,l));let u=new Vs(new zt(256,256),.55,.4,.92);c.addPass(u),c.addPass(new Rl);let h={omega:0,angulo:0},f={ang:.42,alt:2.2,factor:1,distBase:15,mx:0,my:.35,mz:0,sacudida:0},p={modo:"apagado",velocidad:6,destello:0,color:new Rt("#ffc43d")},x={enfoque:0,intensidad:0,velocidad:1},g=new vl("#ffe7c4",1.5);g.position.set(4,8,7),a.add(g);let m=new sr("#ff4fa3",28,24);m.position.set(-6,3,-3);let d=new sr("#3d6bff",28,24);d.position.set(6,2,-3);let y=new sr("#ffffff",0,16);y.position.set(0,1.5,4),a.add(m,d,y);let v=new Hn({color:"#e9a93a",metalness:1,roughness:.3,envMapIntensity:.7}),b=new Hn({color:"#c8193b",metalness:.1,roughness:.35,envMapIntensity:.5}),T=new Hn({color:"#241455",metalness:.2,roughness:.5,envMapIntensity:.25}),M=new Pi;a.add(M);for(let G=0;G<6;G++){let rt=new Ot(new Vn(ei,.035,8,120),v);rt.rotation.order="ZYX",rt.rotation.set(0,Math.PI/2,G*Math.PI/6),M.add(rt)}for(let G of[-1.5,-.8,.8,1.5]){let rt=new Ot(new Vn(Math.sqrt(ei*ei-G*G),.03,8,100),v);rt.position.z=G,M.add(rt)}M.add(new Ot(new Vn(ei,.06,10,140),v));for(let G of[-ei,ei]){let rt=new Ot(new rr(.17,20,14),v);rt.position.z=G,M.add(rt)}let E=Math.asin(bh/mn);for(let G=0;G<Hs;G++){let rt=new Ot(new ml(mn-sm,mn+.02,48,1,-E,2*E),new Hn({color:"#e9a93a",metalness:1,roughness:.35,envMapIntensity:.7,side:Fn}));rt.rotation.order="ZYX",rt.rotation.set(Math.PI/2,0,G*Math.PI*2/Hs+Math.PI/Hs),M.add(rt)}let C=new Ot(new rr(mn+.02,48,32),new Oa({color:"#ffffff",roughness:.04,transparent:!0,opacity:.04,clearcoat:1,depthWrite:!1,envMapIntensity:.6}));a.add(C);let _=new Ot(new kn(.09,.09,1.7,16),v);_.rotation.x=Math.PI/2,_.position.z=-(ei+.85);let S=new Ot(new kn(.16,.24,-Gr,20),b);S.position.set(0,Gr/2,-(ei+1.7));let L=new Ot(new rr(.22,20,14),v);L.position.set(0,0,-(ei+1.7)),a.add(_,S,L);let U=new Ot(new kn(am,am+.15,Gr-Hr,72),T);U.position.y=(Gr+Hr)/2;let X=new Ot(new kn(Sh,Sh+.1,Gs-Gr,72),T);X.position.y=(Gs+Gr)/2;let D=new Ot(new Vn(Sh,.05,8,160),new Qn({color:new Rt("#ffc43d").multiplyScalar(1.6)}));D.rotation.x=Math.PI/2,D.position.y=Gs;let z=new Ot(new dl(45,64),new Hn({color:"#180c36",roughness:.8,envMapIntensity:.12}));z.rotation.x=-Math.PI/2,z.position.y=Hr,a.add(U,X,D,z);let H=-1.35,J=Math.sqrt(ei*ei-H*H)+.12,Q=-2.3,tt=new Ot(new kn(.42,.62,Q-Gs,28),b);tt.position.y=(Q+Gs)/2;let it=new Ot(new Vn(.45,.06,10,40),v);it.rotation.x=Math.PI/2,it.position.y=Q;let at=new Ot(new Vn(.64,.06,10,40),v);at.rotation.x=Math.PI/2,at.position.y=Gs+.03;let mt=new Ot(new Vn(J,.06,10,120),v);mt.rotation.x=Math.PI/2,mt.position.y=H,a.add(tt,it,at,mt);let K=Ne(),nt=Ne();for(let G=0;G<4;G++){let rt=G*Math.PI/2+Math.PI/4;K.set(Math.cos(rt)*.5,Q,Math.sin(rt)*.5),nt.set(Math.cos(rt)*J,H,Math.sin(rt)*J);let St=K.distanceTo(nt),It=new Ot(new kn(.045,.045,St,10),v);It.position.copy(K).add(nt).multiplyScalar(.5),It.quaternion.setFromUnitVectors(Eh,nt.clone().sub(K).normalize()),a.add(It)}let F=4.5,w=.1,I=-4.3,N=.24,k=w-Hr,$=new Ot(new Vn(F,N,14,90,Math.PI),b);$.position.set(0,w,I),a.add($);for(let G of[-1,1]){let rt=new Ot(new kn(N,N,k,14),b);rt.position.set(G*F,Hr+k/2,I);let St=new Ot(new Vn(N+.02,.05,8,24),v);St.rotation.x=Math.PI/2,St.position.set(G*F,w,I);let It=new Ot(new kn(.42,.52,.32,24),v);It.position.set(G*F,Hr+.16,I),a.add(rt,St,It)}let st=[],O=52,Tt=Hr+.5,dt=w-Tt,et=Math.PI*F,pt=2*dt+et,Yt=I+N+.04;for(let G=0;G<O;G++){let rt=pt*G/(O-1);if(rt<=dt)st.push(new V(-F,Tt+rt,Yt));else if(rt<=dt+et){let St=Math.PI-(rt-dt)/F;st.push(new V(Math.cos(St)*F,w+Math.sin(St)*F,Yt))}else st.push(new V(F,w+dt+et-rt,Yt))}let Xt=44;for(let G=0;G<Xt;G++){let rt=G/Xt*Math.PI*2;st.push(new V(Math.cos(rt)*om,Gr+.07,Math.sin(rt)*om))}let P=new hl(new rr(.1,12,8),new Qn({color:"#ffffff"}),st.length),A=new Ge;st.forEach((G,rt)=>{A.position.copy(G),A.updateMatrix(),P.setMatrixAt(rt,A.matrix),P.setColorAt(rt,new Rt(0,0,0))}),a.add(P);let q=e.map(G=>new Rt(G)),ot=new Rt,ht=new Rt("#ffd98a"),ft=[-6.5,-2.4,2.4,6.5].map((G,rt)=>{let It=new pl(1.4,16,40,1,!0);It.translate(0,-16/2,0);let ie=new Ue({uniforms:{uColor:{value:new Rt(e[(rt+1)%e.length])},uOpacidad:{value:0}},vertexShader:`
                varying vec3 vN; varying vec3 vV; varying float vH;
                void main() {
                    vec4 mv = modelViewMatrix * vec4(position, 1.0);
                    vN = normalize(normalMatrix * normal);
                    vV = normalize(-mv.xyz);
                    vH = uv.y;
                    gl_Position = projectionMatrix * mv;
                }`,fragmentShader:`
                uniform vec3 uColor; uniform float uOpacidad;
                varying vec3 vN; varying vec3 vV; varying float vH;
                void main() {
                    float borde = pow(abs(dot(normalize(vN), normalize(vV))), 1.8);
                    float a = borde * pow(vH, 1.3) * uOpacidad;
                    gl_FragColor = vec4(uColor, a);
                }`,transparent:!0,depthWrite:!1,blending:Br,side:Fn}),Ut=new Ot(It,ie),gt=new Pi;return gt.position.set(G,10,-1.2),gt.add(Ut),a.add(gt),{pivote:gt,mat:ie,base:Math.atan2(-G,10),fase:rt*1.7}}),Pt=new rr(Gn,28,18),Mt=[],At=new Map;for(let G=1;G<=75;G++){let rt={...t(G),numero:G},St=Mh(rt,256,r),It=new Ot(Pt,new Oa({map:St,roughness:.25,clearcoat:1,clearcoatRoughness:.1,envMapIntensity:.55}));It.visible=!1,It.quaternion.setFromEuler(new Ls(Math.random()*6,Math.random()*6,Math.random()*6)),a.add(It);let ie={n:G,info:rt,mesh:It,textura:St,p:Ne(),v:Ne(),w:Ne(),estado:"fuera"};Mt.push(ie),At.set(G,ie)}let Nt=600,Zt=Array.from({length:Nt},()=>({p:Ne(),v:Ne(),vida:0,max:1,color:new Rt})),lt=new Ze,se=new Float32Array(Nt*3),Jt=new Float32Array(Nt*3);lt.setAttribute("position",new an(se,3)),lt.setAttribute("color",new an(Jt,3));let Ht=new fl(lt,new Ua({size:.22,map:rm(),vertexColors:!0,transparent:!0,depthWrite:!1,blending:Br}));Ht.frustumCulled=!1,a.add(Ht);let Dt=0;function Ct(G,rt,St=120,It=6){let ie=new Rt(rt);for(let Ut=0;Ut<St;Ut++){let gt=Zt[Dt];Dt=(Dt+1)%Nt,gt.p.copy(G),gt.v.set(Math.random()-.5,Math.random()-.3,Math.random()-.5).normalize().multiplyScalar(It*(.35+Math.random()*.65)),gt.max=gt.vida=.7+Math.random()*.9,gt.color.copy(Math.random()<.25?new Rt("#fff3df"):ie).multiplyScalar(2.2)}}let qt=1/240,ae=2,_e=.6,jt=.4,xt=.15,B=.4,bt=5/(2*Gn*Gn),yt=45,kt=12,Ft=.1,ce=.3,ue=.35,Pe=.35,Le=Ne(),oe=0,We=Ne(),Wn=Ne(),ee=Ne(),Xn=Ne(),Xe=Ne(),on=Ne(),ke=Ne(),na=Ne(),hr=Ne(),tc=Ne(),Ui=Ne();function fr(G,rt,St){return St.crossVectors(G.w,na.copy(rt).multiplyScalar(Gn)).add(G.v)}function R(G,rt,St){G.v.add(St),G.w.addScaledVector(na.copy(rt).multiplyScalar(Gn).cross(St),bt)}function W(G,rt){ee.subVectors(rt.p,G.p);let St=ee.lengthSq(),It=2*Gn;if(St>=It*It||St===0)return;let ie=Math.sqrt(St);ee.divideScalar(ie),Xn.copy(ee).negate();let Ut=Math.max(0,It-ie-.002)*.5;G.p.addScaledVector(ee,-Ut),rt.p.addScaledVector(ee,Ut),Xe.subVectors(fr(rt,Xn,tc),fr(G,ee,hr));let gt=Xe.dot(ee);if(gt>=0)return;let me=-(1+(gt<-1?_e:0))*gt/2;ke.copy(ee).multiplyScalar(me),on.copy(Xe).addScaledVector(ee,-gt);let qe=on.length();if(qe>1e-6){let Je=Math.min(qe/7,xt*me);ke.addScaledVector(on,-Je/qe)}R(rt,Xn,ke),R(G,ee,ke.negate())}function Z(G,rt){let St=mn-Gn,It=G.p.length();if(It<=St)return;ee.copy(G.p).divideScalar(It),G.p.copy(ee).multiplyScalar(St),Ui.set(-rt*mn*ee.y,rt*mn*ee.x,0),Xe.subVectors(fr(G,ee,hr),Ui);let ie=Xe.dot(ee);if(ie<=0)return;let gt=(1+(ie>1?jt:0))*ie;ke.copy(ee).multiplyScalar(-gt),on.copy(Xe).addScaledVector(ee,-ie);let Wt=on.length();if(Wt>1e-6){let me=Math.min(Wt/3.5,B*gt);ke.addScaledVector(on,-me/Wt)}R(G,ee,ke),Y(G,rt)}function j(G,rt){for(let St=0;St<Hs;St++){let It=h.angulo+St*Math.PI*2/Hs+Math.PI/Hs,ie=Math.cos(It),Ut=Math.sin(It),gt=G.p.x*ie+G.p.y*Ut;if(gt<-Gn)continue;let Wt=Math.max(-bh,Math.min(bh,G.p.z));gt=Math.max(0,gt);let me=Math.hypot(gt,Wt);if(me<1e-6)continue;let qe=Math.max(mn-sm,Math.min(mn,me));gt*=qe/me,Wt*=qe/me,Le.set(gt*ie,gt*Ut,Wt),ee.subVectors(G.p,Le);let Je=ee.length(),qn=Gn+fb/2;if(Je>=qn||Je===0)continue;ee.divideScalar(Je),G.p.addScaledVector(ee,qn-Je),Ui.set(-rt*Le.y,rt*Le.x,0),Xn.copy(ee).negate(),Xe.subVectors(fr(G,Xn,hr),Ui);let ni=Xe.dot(ee);if(ni>=0)continue;let ii=-(1+(ni<-1?ue:0))*ni;ke.copy(ee).multiplyScalar(ii),on.copy(Xe).addScaledVector(ee,-ni);let gi=on.length();gi>1e-6&&ke.addScaledVector(on,-Math.min(gi/3.5,Pe*ii)/gi),R(G,Xn,ke)}}function Y(G,rt){let St=Math.PI*2/kt,It=Math.round((Math.atan2(G.p.y,G.p.x)-h.angulo)/St),ie=h.angulo+It*St,Ut=-Math.sin(ie),gt=Math.cos(ie),Wt=G.p.x*Ut+G.p.y*gt,me=G.p.x-Wt*Ut,qe=G.p.y-Wt*gt,Je=Math.hypot(me,qe,G.p.z);if(Je<1e-6)return;let qn=me/Je*mn,ni=qe/Je*mn,pr=G.p.z/Je*mn;ee.set(G.p.x-qn,G.p.y-ni,G.p.z-pr);let ii=ee.length(),gi=Gn+Ft;if(ii>=gi||ii===0)return;ee.divideScalar(ii),G.p.addScaledVector(ee,gi-ii),Ui.set(-rt*ni,rt*qn,0),Xn.copy(ee).negate(),Xe.subVectors(fr(G,Xn,hr),Ui);let Oi=Xe.dot(ee);if(Oi>=0)return;let ra=-(1+(Oi<-1?ce:0))*Oi;ke.copy(ee).multiplyScalar(ra),on.copy(Xe).addScaledVector(ee,-Oi);let $r=on.length();$r>1e-6&&ke.addScaledVector(on,-Math.min($r/3.5,B*ra)/$r),R(G,Xn,ke)}function Et(G,rt){let St=h.omega,It=1-.05*G,ie=1-.8*G;for(let Ut of rt)Ut.v.y-=db*G,Ut.v.multiplyScalar(It),Ut.v.lengthSq()>yt*yt&&Ut.v.setLength(yt),Ut.w.multiplyScalar(ie),Ut.p.addScaledVector(Ut.v,G);for(let Ut=0;Ut<ae;Ut++){for(let gt=0;gt<rt.length;gt++)for(let Wt=gt+1;Wt<rt.length;Wt++)W(rt[gt],rt[Wt]);for(let gt of rt)j(gt,St),Z(gt,St)}}function Lt(G){let rt=Mt.filter(St=>St.estado==="bombo");for(oe=Math.min(oe+G,qt*10);oe>=qt;)Et(qt,rt),oe-=qt;for(let St of rt){St.mesh.position.copy(St.p);let It=St.w.length();It>1e-4&&St.mesh.rotateOnWorldAxis(We.copy(St.w).divideScalar(It),It*G)}}function Bt(G){for(let rt of G){let St=At.get(rt);!St||St.estado!=="bombo"||(St.estado="fuera",St.mesh.visible=!1)}}function Vt(G,rt=0){return ct.delayedCall(rt,()=>{G.estado="bombo",G.p.set((Math.random()-.5)*1.2,mn-Gn-.2-Math.random()*.3,(Math.random()-.5)*1.2),G.v.set((Math.random()-.5)*2,-1.5,(Math.random()-.5)*2),G.w.set((Math.random()-.5)*20,(Math.random()-.5)*20,(Math.random()-.5)*20),G.mesh.position.copy(G.p),G.mesh.visible=!0,G.mesh.material.map=G.textura,ct.fromTo(G.mesh.scale,{x:.01,y:.01,z:.01},{x:1,y:1,z:1,duration:.3,ease:"back.out(2)"})})}function Kt(){let G=window.innerWidth,rt=window.innerHeight;r.setSize(G,rt,!1),c.setSize(G,rt),l.aspect=G/rt;let St=G>=1024,ie=(St?G-cm:G)/rt;f.distBase=Math.max(15.5,10/ie),a.fog.near=f.distBase+3,a.fog.far=f.distBase+24,l.setViewOffset(G,rt,St?cm/2:0,St?rt*.04:rt*.07,G,rt),l.updateProjectionMatrix()}window.addEventListener("resize",Kt),Kt();let $t=new Fs,Gt=Ne(),xe=new fi;r.setAnimationLoop(()=>{let G=Math.min($t.getDelta(),.03333333333333333),rt=$t.elapsedTime;h.angulo+=h.omega*G,M.rotation.z=h.angulo,Lt(G);let St=rt*p.velocidad;for(let gt=0;gt<st.length;gt++){let Wt=gt<O,me;p.modo==="apagado"?me=.04:p.modo==="arcoiris"?me=(gt+Math.floor(St))%2===0?2.2:.3:Wt?me=((gt-St)%4+4)%4<1?2.6:.85:me=((gt-St)%5+5)%5<2?2.2:.15,ot.copy(Wt?ht:q[Math.floor(gt/2)%q.length]),p.modo==="arcoiris"&&ot.copy(q[(gt+Math.floor(St/2))%q.length]),ot.multiplyScalar(me).lerp(Ie(),p.destello),P.setColorAt(gt,ot)}P.instanceColor.needsUpdate=!0,ft.forEach(gt=>{let Wt=Math.sin(rt*.55*x.velocidad+gt.fase)*.45;gt.pivote.rotation.z=gt.base+Wt*(1-x.enfoque)*1.2,gt.pivote.rotation.x=Math.cos(rt*.4*x.velocidad+gt.fase)*.18*(1-x.enfoque),gt.mat.uniforms.uOpacidad.value=x.intensidad});for(let gt=0;gt<Nt;gt++){let Wt=Zt[gt];Wt.vida>0&&(Wt.vida-=G,Wt.v.y-=4*G,Wt.v.multiplyScalar(.985),Wt.p.addScaledVector(Wt.v,G));let me=Math.max(0,Wt.vida/Wt.max);se[gt*3]=Wt.p.x,se[gt*3+1]=me>0?Wt.p.y:-999,se[gt*3+2]=Wt.p.z,Jt[gt*3]=Wt.color.r*me,Jt[gt*3+1]=Wt.color.g*me,Jt[gt*3+2]=Wt.color.b*me}lt.attributes.position.needsUpdate=!0,lt.attributes.color.needsUpdate=!0;let It=n?0:1,ie=f.ang+Math.sin(rt*.21)*.07*It,Ut=f.distBase*f.factor;Gt.set(Math.sin(ie)*Ut,f.alt+Math.sin(rt*.37)*.12*It,Math.cos(ie)*Ut),f.sacudida>.001&&(Gt.x+=(Math.random()-.5)*f.sacudida,Gt.y+=(Math.random()-.5)*f.sacudida),l.position.copy(Gt),l.lookAt(f.mx,f.my,f.mz),c.render()});let ln=new Rt;function Ie(){return ln.copy(p.color).multiplyScalar(3)}function bn(G=.35){n||ct.fromTo(f,{sacudida:G},{sacudida:0,duration:.6,ease:"power2.out",overwrite:"auto"})}function pe(G,rt=1.2){p.color.set(G),ct.fromTo(p,{destello:1},{destello:0,duration:rt,ease:"power2.out",overwrite:"auto"}),y.color.set(G),ct.fromTo(y,{intensity:120},{intensity:0,duration:rt*1.2,ease:"power2.out",overwrite:"auto"})}function Qt(){let G=ct.timeline();return G.fromTo(f,{factor:2.1,alt:7,ang:-.9},{factor:1,alt:2.2,ang:.42,duration:3,ease:"power3.inOut"},0),ft.forEach((rt,St)=>{G.call(()=>{x.intensidad=Math.max(x.intensidad,.08+St*.04)},null,.35+St*.25)}),G.to(x,{intensidad:.22,duration:.4},1.4),G.call(()=>{p.modo="persecucion"},null,1.3),G.to(h,{omega:Pl,duration:1.5,ease:"power2.inOut"},1.2),Mt.forEach((rt,St)=>G.add(Vt(rt),.9+St*.022)),G}let Ni=null;function ve(G,{ritmo:rt=1,onSalida:St,onRevelar:It,onImpacto:ie}={}){Ni?.progress(1);let Ut=At.get(G),gt=n?.6:rt,Wt=ct.timeline();Ni=Wt,Wt.to(h,{omega:pb,duration:.45*gt,ease:"power2.in"},0).to(x,{enfoque:1,velocidad:3,duration:.4*gt},0).to(p,{velocidad:24,duration:.4*gt},0);let me={t:0},qe,Je,qn,ni,pr,ii,gi,Oi=new Ge;Wt.to(me,{t:1,duration:.8*gt,ease:"power2.inOut",onStart(){qe||(Ut.estado="vuelo",Ut.mesh.visible=!0,Ut.mesh.scale.setScalar(1),Ut.mesh.material.map=Mh(Ut.info,1024,r),qe=Ut.p.clone(),{P:qn,escala:ii,camPos:gi}=mi(),Je=new V(qe.x*.3,mn+1.8,.8),ni=Ut.mesh.quaternion.clone(),Oi.position.copy(qn),Oi.lookAt(gi),pr=Oi.quaternion.clone(),St?.())},onUpdate(){qe||this.vars.onStart.call(this);let Sn=me.t,ri=1-Sn;Ut.mesh.position.set(ri*ri*qe.x+2*ri*Sn*Je.x+Sn*Sn*qn.x,ri*ri*qe.y+2*ri*Sn*Je.y+Sn*Sn*qn.y,ri*ri*qe.z+2*ri*Sn*Je.z+Sn*Sn*qn.z),Ut.mesh.scale.setScalar(1+(ii-1)*Sn*Sn),Ut.mesh.quaternion.slerpQuaternions(ni,pr,Sn),Ut.mesh.quaternion.multiply(xe.setFromAxisAngle(Eh,ri*Math.PI*6))}},.75*gt),Wt.to(f,{factor:.88,my:.5,duration:.9*gt,ease:"power2.inOut"},.75*gt);let mr=.75*gt+.8*gt;Wt.call(()=>{Ct(Ut.mesh.position,Ut.info.color,n?40:160,7),pe(Ut.info.color),bn(.18),It?.()},null,mr).to(h,{omega:Pl,duration:1.8,ease:"power2.out"},mr).to(x,{enfoque:0,velocidad:1,duration:1.5},mr).to(p,{velocidad:6,duration:1.2},mr);let ra={a:0};Wt.to(ra,{a:1,duration:.6*gt,ease:"sine.inOut",onUpdate(){pr&&Ut.mesh.quaternion.copy(pr).multiply(xe.setFromAxisAngle(Eh,Math.sin(ra.a*Math.PI*2)*.22))}},mr);let $r={t:0},sa,qh,ec=mr+.6*gt;return Wt.to($r,{t:1,duration:.3*gt,ease:"power3.in",onStart(){sa||(sa=Ut.mesh.position.clone(),qh=l.position.clone().add(sa.clone().sub(l.position).normalize().multiplyScalar(l.near+.5)))},onUpdate(){sa||this.vars.onStart.call(this),Ut.mesh.position.lerpVectors(sa,qh,$r.t)}},ec),Wt.call(()=>{Ut.mesh.visible=!1,Ut.estado="fuera",Ut.mesh.material.map.dispose(),Ut.mesh.material.map=Ut.textura,Ut.mesh.scale.setScalar(1),bn(.5),ie?.()},null,ec+.3*gt),Wt.to(f,{factor:1,my:.35,duration:1,ease:"power3.out"},ec+.3*gt),Wt}function mi(){let G=l.position.clone(),rt=new V(f.mx,f.my,f.mz),St=G.clone().sub(rt),It=St.length();St.normalize();let ie=rt.clone().addScaledVector(St,It*.55),gt=.26*(It*.45)*Math.tan(Gp.degToRad(l.fov/2));return{P:ie,escala:gt/Gn,camPos:G}}function Qa(){Ni?.progress(1);let G=ct.timeline();return p.modo="arcoiris",G.to(h,{omega:mb,duration:.6,ease:"power2.in"},0).to(h,{omega:Pl,duration:3.5,ease:"power2.out"},1.4).to(x,{velocidad:6,intensidad:.4,duration:.3},0).to(x,{velocidad:1,intensidad:.22,duration:2},3).to(p,{velocidad:10,duration:.3},0).call(()=>{p.modo="persecucion",p.velocidad=6},null,4.5),n||G.to(f,{ang:`+=${Math.PI*2}`,duration:3.6,ease:"power2.inOut",onComplete:()=>{f.ang=.42}},.2),e.forEach((rt,St)=>{G.call(()=>{Ct(new V((Math.random()-.5)*6,1+Math.random()*2.5,(Math.random()-.5)*2),rt,140,8),pe(rt,.6)},null,.2+St*.35)}),G}function dr(){Ni?.progress(1),p.modo="persecucion",ct.to(h,{omega:4.5,duration:.4,yoyo:!0,repeat:1}),ct.to(h,{omega:Pl,duration:1.2,delay:.8}),Mt.filter(G=>G.estado==="fuera").forEach((G,rt)=>Vt(G,.2+rt*.03)),ct.to(x,{intensidad:.22,duration:.6})}function ia(){ct.to(h,{omega:0,duration:2.5,ease:"power2.out"}),ct.to(x,{intensidad:.2,duration:2}),p.velocidad=2}return{intro:Qt,sortear:ve,celebrar:Qa,reiniciar:dr,terminar:ia,sacudir:bn,retirar:Bt}}var Ws=i=>document.getElementById(i),ka="#14112b",hm=null;function Th(i=14,t=!1){if(t)return;let e=Ws("mundo");ct.killTweensOf(e),ct.timeline().to(e,{x:()=>ct.utils.random(-i,i),y:()=>ct.utils.random(-i,i),rotation:()=>ct.utils.random(-.6,.6),duration:.05,repeat:5,yoyo:!0,ease:"none"}).to(e,{x:0,y:0,rotation:0,duration:.2,ease:"elastic.out(1, 0.4)"})}function fm({letra:i,numero:t,color:e,textoClaro:n},{ritmo:r=1,reducirMovimiento:s=!1}={}){hm?.progress(1);let a=Ws("anuncio"),o=Ws("franja"),l=Ws("franjaTinta"),c=Ws("anuncioLetra"),u=Ws("anuncioNumero");c.textContent=i,c.style.background=e,c.style.color=n?"#fff3df":ka,u.innerHTML=String(t).split("").map(x=>`<span class="inline-block">${x}</span>`).join("");let h=u.children,f=s?.5:r,p=ct.timeline();return hm=p,p.set(a,{display:"block"}).set([o,l],{skewY:-7,backgroundColor:x=>x===0?e:ka}).fromTo(l,{scaleX:0,transformOrigin:"0% 50%"},{scaleX:1,duration:.3*f,ease:"expo.out"}).fromTo(o,{scaleX:0,transformOrigin:"0% 50%"},{scaleX:1,duration:.3*f,ease:"expo.out"},`<${.06*f}`).fromTo(c,{scale:4,rotation:-50,autoAlpha:0},{scale:1,rotation:-8,autoAlpha:1,duration:.4*f,ease:"expo.out"},`<${.05*f}`).call(()=>Th(16,s)).fromTo(h,{yPercent:140,rotation:25,autoAlpha:0,scale:.6},{yPercent:0,rotation:0,autoAlpha:1,scale:1,duration:.5*f,ease:"back.out(2.4)",stagger:.08*f},`<${.04*f}`).to(c,{rotation:-3,scale:1.06,duration:.35*f,ease:"sine.inOut",yoyo:!0,repeat:1}).to(h,{y:-10,duration:.35*f,ease:"sine.inOut",yoyo:!0,repeat:1,stagger:.05},"<").to([c,u],{xPercent:160,skewX:-20,autoAlpha:0,duration:.3*f,ease:"power3.in",stagger:.04}).to([o,l],{scaleX:0,transformOrigin:"100% 50%",duration:.3*f,ease:"expo.in",stagger:.04},"<0.08").set([c,u],{clearProps:"transform,opacity,visibility"}).set(a,{display:"none"}),p}var Ll=null;function wh({colores:i,reducirMovimiento:t=!1}){let e=document.querySelectorAll("#tituloBingo .letra-bingo"),n=document.querySelector("#modalBingo .modal-caja"),r=ct.timeline();return Ll?.kill(),r.fromTo("#flash",{opacity:.95},{opacity:0,duration:.7,ease:"power2.out"},0).fromTo(e,{y:()=>-window.innerHeight,rotation:()=>ct.utils.random(-120,120),scale:1.3},{y:0,rotation:(s,a)=>Number(a.dataset.rot),scale:1,duration:1,ease:"bounce.out",stagger:.12},.1).fromTo(n,{yPercent:140,rotation:6},{yPercent:0,rotation:0,duration:.8,ease:"back.out(1.4)"},.75),e.forEach((s,a)=>r.call(()=>Th(10,t),null,.1+a*.12+.36)),r.call(()=>Va(i,{cantidad:t?40:110}),null,.2).call(()=>Va(i,{cantidad:t?0:90}),null,1.1).call(()=>{t||(Ll=ct.to(e,{y:-14,rotation:(s,a)=>Number(a.dataset.rot)*-1,duration:.7,ease:"sine.inOut",yoyo:!0,repeat:-1,stagger:{each:.12,yoyo:!0,repeat:-1}}))},null,1.8),r}function dm(){Ll?.kill(),Ll=null}function Il(i,{texto:t,fondo:e,color:n=ka},r=!1){i.textContent=t,i.style.background=e,i.style.color=n,i.style.borderColor=ka,i.classList.remove("hidden"),ct.fromTo(i,{scale:3.5,rotation:-35,autoAlpha:0},{scale:1,rotation:-12,autoAlpha:1,duration:.42,ease:"power4.in",onComplete:()=>{Th(12,r),ct.fromTo(i,{scale:.92},{scale:1,duration:.4,ease:"elastic.out(1, 0.4)"})}})}function Va(i,{cantidad:t=100}={}){if(!t)return;let e=document.createElement("div");e.className="pointer-events-none fixed inset-0 z-[55] overflow-hidden",e.setAttribute("aria-hidden","true"),document.body.appendChild(e);let n=window.innerWidth,r=window.innerHeight,s=["50%","3px","triangulo"];for(let a=0;a<t;a++){let o=a%2===0,l=document.createElement("span"),c=ct.utils.random(10,18),u=s[a%s.length],h=i[a%i.length];l.style.cssText=`position:absolute;left:${o?-10:n+10}px;top:${r+10}px;width:${c}px;height:${c*(u==="3px"?.6:1)}px;`+(u==="triangulo"?`background:${h};clip-path:polygon(50% 0,100% 100%,0 100%);`:`background:${h};border:2.5px solid ${ka};border-radius:${u};`),e.appendChild(l);let f=ct.utils.random(.25,.85)*n,p=ct.utils.random(.45,.95)*r,x=ct.utils.random(.55,.85),g=ct.utils.random(1.4,2.4),m=o?f:-f,d=ct.utils.random(0,.25);ct.to(l,{x:m,duration:x+g,ease:"none",delay:d}),ct.to(l,{rotation:ct.utils.random(-900,900),duration:x+g,ease:"none",delay:d}),ct.timeline({delay:d}).to(l,{y:-p,duration:x,ease:"power2.out"}).to(l,{y:r*.3,duration:g,ease:"power1.in"}).to(l,{opacity:0,duration:.4},"-=0.4"),ct.to(l,{scaleY:-1,duration:ct.utils.random(.15,.35),repeat:-1,yoyo:!0,ease:"sine.inOut"})}ct.delayedCall(3.6,()=>{ct.killTweensOf(e.children),e.remove()})}var Ha=null,Dl=null;function Wa(){if(!Ha){let i=window.AudioContext||window.webkitAudioContext;if(!i)return null;Ha=new i}return Ha.state==="suspended"&&Ha.resume(),Ha}function Ah(i){if(!Dl){Dl=i.createBuffer(1,i.sampleRate*2,i.sampleRate);let e=Dl.getChannelData(0);for(let n=0;n<e.length;n++)e[n]=Math.random()*2-1}let t=i.createBufferSource();return t.buffer=Dl,t.loop=!0,t}function Ga(i,t,e,n,r){let s=i.createGain();return s.gain.setValueAtTime(1e-4,t),s.gain.exponentialRampToValueAtTime(e,t+n),s.gain.exponentialRampToValueAtTime(1e-4,t+n+r),s}function pm(i=1){let t=Wa();if(!t)return;let e=t.currentTime,n=Ah(t),r=t.createBiquadFilter();r.type="bandpass",r.frequency.value=220,r.Q.value=.7;let s=t.createGain();s.gain.value=.5;let a=t.createOscillator();a.frequency.value=24;let o=t.createGain();o.gain.value=.5,a.connect(o).connect(s.gain);let l=t.createGain();l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(.35,e+i*.85),l.gain.exponentialRampToValueAtTime(1e-4,e+i+.05),n.connect(r).connect(s).connect(l).connect(t.destination),n.start(e),a.start(e),n.stop(e+i+.1),a.stop(e+i+.1)}function mm(i=.6){let t=Wa();if(!t)return;let e=t.currentTime,n=Ah(t),r=t.createBiquadFilter();r.type="bandpass",r.Q.value=4,r.frequency.setValueAtTime(500,e),r.frequency.exponentialRampToValueAtTime(3200,e+i);let s=Ga(t,e,.3,i*.7,i*.3);n.connect(r).connect(s).connect(t.destination),n.start(e),n.stop(e+i+.05)}function gm(){let i=Wa();if(!i)return;let t=i.currentTime;[1318.5,1975.5,2637].forEach((e,n)=>{let r=i.createOscillator();r.type="sine",r.frequency.value=e;let s=Ga(i,t,.16/(n+1),.005,1.1);r.connect(s).connect(i.destination),r.start(t),r.stop(t+1.2)})}function Xs(i=1){let t=Wa();if(!t)return;let e=t.currentTime,n=t.createOscillator();n.type="sine",n.frequency.setValueAtTime(150,e),n.frequency.exponentialRampToValueAtTime(40,e+.3);let r=Ga(t,e,.7*i,.005,.35);n.connect(r).connect(t.destination),n.start(e),n.stop(e+.4);let s=Ah(t),a=t.createBiquadFilter();a.type="highpass",a.frequency.value=1800;let o=Ga(t,e,.25*i,.002,.06);s.connect(a).connect(o).connect(t.destination),s.start(e),s.stop(e+.1)}function qs(){let i=Wa();if(!i)return;let t=[[523.25,0],[659.25,.12],[783.99,.24],[1046.5,.36],[783.99,.56],[1046.5,.68]];t.forEach(([e,n],r)=>{let s=i.currentTime+n;for(let a of[-8,8]){let o=i.createOscillator();o.type="sawtooth",o.frequency.value=e,o.detune.value=a;let l=i.createBiquadFilter();l.type="lowpass",l.frequency.value=2400;let c=Ga(i,s,.07,.02,r===t.length-1?1.1:.18);o.connect(l).connect(c).connect(i.destination),o.start(s),o.stop(s+1.3)}})}function lr(i,t="es-ES"){if(!("speechSynthesis"in window)||(i&&typeof i=="object"&&({texto:i,lang:t="es-ES"}=i),!i))return;window.speechSynthesis.cancel();let e=new SpeechSynthesisUtterance(i);e.lang=t,e.rate=.95,e.pitch=1.05,window.speechSynthesis.speak(e)}function Ul(){"speechSynthesis"in window&&window.speechSynthesis.cancel()}var Ch=["B","I","N","G","O"];var vm="ABCDEFGHJKMNPQRSTUVWXYZ23456789",Rh=vm,gb=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]);function Zs(i){let t=i.length,e=Math.ceil((t+9)/64)*64,n=new Uint8Array(e);n.set(i),n[t]=128;let r=new DataView(n.buffer);r.setUint32(e-8,Math.floor(t/536870912)),r.setUint32(e-4,t*8>>>0);let s=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),a=new Uint32Array(64),o=(l,c)=>l>>>c|l<<32-c;for(let l=0;l<e;l+=64){for(let d=0;d<16;d++)a[d]=r.getUint32(l+d*4);for(let d=16;d<64;d++){let y=o(a[d-15],7)^o(a[d-15],18)^a[d-15]>>>3,v=o(a[d-2],17)^o(a[d-2],19)^a[d-2]>>>10;a[d]=a[d-16]+y+a[d-7]+v|0}let[c,u,h,f,p,x,g,m]=s;for(let d=0;d<64;d++){let y=m+(o(p,6)^o(p,11)^o(p,25))+(p&x^~p&g)+gb[d]+a[d]|0,v=(o(c,2)^o(c,13)^o(c,22))+(c&u^c&h^u&h)|0;m=g,g=x,x=p,p=f+y|0,f=h,h=u,u=c,c=y+v|0}s[0]+=c,s[1]+=u,s[2]+=h,s[3]+=f,s[4]+=p,s[5]+=x,s[6]+=g,s[7]+=m}return s}function _b(i){let t=new TextEncoder().encode(i),e=new Uint8Array(t.length+4);e.set(t);let n=new DataView(e.buffer,t.length,4),r=0,s=[],a=()=>(s.length===0&&(n.setUint32(0,r++),s=Array.from(Zs(e))),s.shift());return o=>{let l=4294967296-4294967296%o;for(;;){let c=a();if(c<l)return c%o}}}function ym(i){return String(i??"").toUpperCase().replace(/[^A-Z0-9]/g,"")}function Ph(i){return i.length===4&&[...i].every(t=>vm.includes(t))}var xb=(i,t)=>`${i}-${String(t).padStart(3,"0")}`;function Mm(i,t=null){let e=String(i??"").toUpperCase().match(/[A-Z0-9]+/g)||[];if(e.length===0)return{error:"Escribe el n\xFAmero o el c\xF3digo del cart\xF3n."};let n,r;if(e.length===1&&/^\d+$/.test(e[0])&&e[0].length<=3){if(!t)return{error:"Escribe el c\xF3digo completo, ej: K7QX-042."};n=t,r=e[0]}else if(e.length===1)n=e[0].slice(0,4),r=e[0].slice(4);else if(e.length===2)[n,r]=e;else return{error:"C\xF3digo no reconocido. Ejemplo: K7QX-042."};return Ph(n)?!/^\d{1,3}$/.test(r)||Number(r)<1?{error:"El n\xFAmero de cart\xF3n va del 1 al 999."}:{serie:n,numero:Number(r)}:{error:`"${n}" no es una serie v\xE1lida.`}}function Ol(i,t){let e=_b(`bingoshow:carton:v2:${i}:${t}`),n=Ch.map((r,s)=>{let a=Array.from({length:15},(c,u)=>s*15+u+1),o=s===2?4:5;for(let c=0;c<o;c++){let u=c+e(a.length-c);[a[c],a[u]]=[a[u],a[c]]}let l=a.slice(0,o).sort((c,u)=>c-u);return s===2&&l.splice(2,0,null),l});return{serie:i,numero:t,codigo:xb(i,t),columnas:n}}var Ys=[0,1,2,3,4],$s=Ys.map(i=>Ys.map(t=>[t,i])),Xa=Ys.map(i=>Ys.map(t=>[i,t])),xm=[Ys.map(i=>[i,i]),Ys.map(i=>[i,4-i])],Nl=(...i)=>[...new Map(i.flat().map(t=>[t.join(","),t])).values()],vb=[1,2,3].flatMap(i=>[1,2,3].map(t=>[i,t])),Wr={linea:{nombre:"L\xEDnea",detalle:"fila, columna o diagonal",figuras:[...$s,...Xa,...xm]},esquinas:{nombre:"4 esquinas",detalle:"las cuatro esquinas",figuras:[[[0,0],[4,0],[0,4],[4,4]]]},lleno:{nombre:"Cart\xF3n lleno",detalle:"los 24 n\xFAmeros",figuras:[$s.flat()]},letraL:{nombre:"Letra L",detalle:"columna B y fila de abajo",figuras:[Nl(Xa[0],$s[4])]},letraT:{nombre:"Letra T",detalle:"fila de arriba y columna N",figuras:[Nl($s[0],Xa[2])]},letraX:{nombre:"Letra X",detalle:"las dos diagonales",figuras:[Nl(...xm)]},marco:{nombre:"Marco",detalle:"todo el borde del cart\xF3n",figuras:[Nl($s[0],$s[4],Xa[0],Xa[4])]},cuadro:{nombre:"Cuadro central",detalle:"los 8 n\xFAmeros alrededor del centro",figuras:[vb]}};function Fl(i,t,e="linea"){let{figuras:n}=Wr[e]??Wr.linea,r=([l,c])=>i.columnas[l][c],s=[],a=null;for(let l of n){let c=l.map(r).filter(u=>u!==null&&!t.has(u));c.length===0?s.push(l):(!a||c.length<a.faltan.length)&&(a={figura:l,faltan:c})}let o=i.columnas.map(l=>l.map(c=>c===null||t.has(c)));return{gana:s.length>0,ganadoras:s,figura:s.length?s.flat():a.figura,faltan:s.length?[]:a.faltan.sort((l,c)=>l-c),marcadas:o}}var bm=["#ff5a36","#ffc43d","#19c3a0","#3d6bff","#ff4fa3"],yb=[!1,!1,!1,!0,!1],Sm=i=>yb[i]?"#fff3df":"#14112b";function Bl(i,{marcadas:t=null,clave:e=[],faltan:n=[]}={}){let r=new Set(e.map(([l,c])=>`${l},${c}`)),s=new Set(n),a=Ch.map((l,c)=>`<div class="carton-letra" style="--c:${bm[c]};color:${Sm(c)}">${l}</div>`).join(""),o="";for(let l=0;l<5;l++)for(let c=0;c<5;c++){let u=i.columnas[c][l],h=["carton-celda"],f=`--c:${bm[c]}`;u===null?h.push("carton-libre"):t&&(t[c][l]?(h.push("marcada"),f+=`;color:${Sm(c)}`):s.has(u)||h.push("apagada")),r.has(`${c},${l}`)&&h.push("clave"),s.has(u)&&h.push("falta");let p=u===null?"<span>\u2605</span>Libre":u;o+=`<div class="${h.join(" ")}" style="${f}">${p}</div>`}return`<article class="carton" aria-label="Cart\xF3n ${i.codigo}"><div class="carton-fila" aria-hidden="true">${a}</div><div class="carton-fila">${o}</div><footer class="carton-pie"><span>Bingo Show</span><span class="carton-codigo">${i.codigo}</span></footer></article>`}var Mb=i=>globalThis.crypto.getRandomValues(i);function bb(i,t=Mb){if(!Number.isInteger(i)||i<1||i>4294967296)throw new RangeError(`n fuera de rango: ${i}`);let e=4294967296-4294967296%i,n=new Uint32Array(1);for(;;)if(t(n),n[0]<e)return n[0]%i}function Em(i,t){if(i.length===0)throw new RangeError("No quedan bolas");return i.splice(bb(i.length,t),1)[0]}var Tm={jugador:i=>`bingoshow.jugador.${i}`,anfitrion:i=>`bingoshow.anfitrion.${i}`,apodo:"bingoshow.apodo"},zl=i=>String(i??"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6);async function Sb(i,t){let e=await fetch(i,{...t,headers:{"content-type":"application/json",...t?.headers||{}}}),n=await e.json().catch(()=>({}));if(!e.ok)throw new Error(n.error||`Error ${e.status}`);return n}var wm=i=>Sb(`/api/salas/${encodeURIComponent(zl(i))}`);function Am(i,{hola:t,alMensaje:e,alCambiarConexion:n=()=>{}}){let r=new URL(`/api/salas/${encodeURIComponent(zl(i))}/ws`,location.href);r.protocol=r.protocol==="https:"?"wss:":"ws:";let s=null,a=0,o=!1,l=null,c=null;function u(){n(a===0?"conectando":"reconectando"),s=new WebSocket(r),s.addEventListener("open",()=>{a=0,s.send(JSON.stringify({tipo:"hola",...t()})),n("conectado"),clearInterval(c),c=setInterval(()=>h({tipo:"ping"}),25e3)}),s.addEventListener("message",p=>{let x;try{x=JSON.parse(p.data)}catch{return}x.tipo==="expulsado"&&(o=!0),e(x)}),s.addEventListener("close",()=>{if(clearInterval(c),o)return n("cerrado");let p=Math.min(8e3,500*2**a++);n("reconectando"),l=setTimeout(u,p)})}function h(p){return s?.readyState===WebSocket.OPEN?(s.send(JSON.stringify(p)),!0):!1}function f(){o=!0,clearTimeout(l),clearInterval(c),s?.close()}return u(),{enviar:h,cerrar:f}}var Lh="fila5",Cm={nombre:"Fila de 5",detalle:"los 5 n\xFAmeros de tu fila"},qa=i=>i?.tipo==="fila";function Rm(i){if(!Number.isInteger(i)||i<1||i>15)throw new RangeError("La fila debe ser un n\xFAmero del 1 al 15.");return[0,1,2,3,4].map(t=>i+t*15)}var Ih="elige5",Pm={nombre:"Elige tus 5",detalle:"los 5 n\xFAmeros que elegiste"},kl=i=>i?.tipo==="elige",Lm=i=>qa(i)||kl(i);var Hm=yg(Nm(),1);var Fm=new TextEncoder,Tb=i=>Array.from(i,t=>t.toString(16).padStart(2,"0")).join("");function Bm(i){if(typeof i!="string"||i.length%2||/[^0-9a-f]/i.test(i))throw new TypeError("Hex no v\xE1lido");return Uint8Array.from(i.match(/../g)||[],t=>parseInt(t,16))}function Dh(i){let t=new Uint8Array(i.length*4),e=new DataView(t.buffer);return i.forEach((n,r)=>e.setUint32(r*4,n)),t}var Om=(i,t)=>{let e=new Uint8Array(i.length+t.length);return e.set(i),e.set(t,i.length),e},zm=i=>Tb(Dh(Zs(i)));function wb(i,t){let e=i.length>64?Dh(Zs(i)):i,n=new Uint8Array(64);n.set(e);let r=n.map(a=>a^54),s=n.map(a=>a^92);return Zs(Om(s,Dh(Zs(Om(r,t)))))}var Ab=i=>zm(Bm(i));function Cb(i){let t=i.map(({apodo:e,semilla:n})=>`${e}:${n}`).sort();return zm(Fm.encode(t.join(`
`)))}function Uh(i,t){let e=Bm(i),n=0,r=[],s=()=>(r.length===0&&(r=Array.from(wb(e,Fm.encode(`${t}:${n++}`)))),r.shift());return a=>{let o=4294967296-4294967296%a;for(;;){let l=s();if(l<o)return l%a}}}function Rb(i,t){let e=Uh(i,`bingoshow:serie:v1:${t}`);return Array.from({length:4},()=>Rh[e(Rh.length)]).join("")}function Pb(i,t,e=75){let n=Array.from({length:75},(s,a)=>a+1),r=[];for(let s=0;s<Math.min(e,75);s++){let a=Uh(i,`bingoshow:bola:v1:${t}:${s}`);r.push(n.splice(a(n.length),1)[0])}return r}function Lb(i,t){return Uh(i,`bingoshow:dorada:v1:${t}`)(75)+1}function km({compromiso:i,semillaServidor:t,semillasClientes:e,semillaClientes:n,serie:r,bolas:s,dorada:a=null}){let o=[];try{Ab(t)!==i&&o.push("La semilla revelada no coincide con el compromiso publicado al principio.");let l=Cb(e);l!==n&&o.push("Las semillas de los jugadores no dan la semilla combinada publicada."),Rb(t,l)!==r&&o.push("La serie de los cartones no sale de las semillas.");let c=Pb(t,l),u=s.findIndex((h,f)=>h!==c[f]);u!==-1&&o.push(`La bola n\xBA ${u+1} (${s[u]}) no es la que tocaba (${c[u]}).`),a!==null&&Lb(t,l)!==a&&o.push("La bola dorada no sale de las semillas.")}catch(l){o.push(`Datos no v\xE1lidos: ${l.message}`)}return{valida:o.length===0,errores:o}}var wt=i=>document.getElementById(i),Ib=["bg-tomate","bg-girasol","bg-menta","bg-cobalto text-crema","bg-fucsia","bg-crema"],Db={conectando:"Conectando\u2026",conectado:"Conectado",reconectando:"Reconectando\u2026",cerrado:"Desconectado"},Ce=i=>String(i??"").replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`),$a=i=>i===Lh?Cm.nombre:i===Ih?Pm.nombre:Wr[i]?.nombre??i,Vl=i=>Math.max(0,Math.ceil((i-Date.now())/1e3));function Ub(i){let t=(0,Hm.default)(0,"M");return t.addData(i),t.make(),t.createSvgTag({cellSize:4,margin:0,scalable:!0})}var Nb=["#ff5a36","#ffc43d","#19c3a0","#3d6bff","#ff4fa3"],Vm=i=>kl(i?.config)?{uno:"jugada",varios:"jugadas",Uno:"Jugada",Varios:"Jugadas",vendido:"jugada vendida",vendidos:"jugadas vendidas",sin:"Sin jugadas",alguien:"Esperando a que alguien arme una jugada"}:qa(i?.config)?{uno:"fila",varios:"filas",Uno:"Fila",Varios:"Filas",vendido:"fila vendida",vendidos:"filas vendidas",sin:"Sin filas",alguien:"Esperando a que alguien elija una fila"}:{uno:"cart\xF3n",varios:"cartones",Uno:"Cart\xF3n",Varios:"Cartones",vendido:"cart\xF3n vendido",vendidos:"cartones vendidos",sin:"Sin cartones",alguien:"Esperando a que alguien elija un cart\xF3n"},Js=i=>`${Number(i||0).toLocaleString("es")} ${i===1?"ficha":"fichas"}`,Nh=(i,t,e)=>`${i} ${i===1?t:e}`;function Ob(i){try{return localStorage.getItem(Tm.anfitrion(i))}catch{return null}}function Gm(){let i=zl(new URLSearchParams(location.search).get("sala"));return i.length===6?i:null}var Oh=i=>`${location.origin}/jugar.html?sala=${i}`;function Wm(i,t){document.body.classList.add("en-linea","sala-cargando"),wt("infoCodigo").textContent=i;let e=null,n=null,r=!1,s=!1,a=null,o=null,l=!1,c=null,u=null,h=null;d();let f=Ob(i);if(!f)return mt("Esta sala no es tuya",`En este dispositivo no est\xE1 guardada la llave de anfitri\xF3n de la sala ${i}. Si vienes a jugar, entra desde el m\xF3vil.`,[{texto:"Jugar en esta sala",href:`jugar.html?sala=${i}`,clase:"bg-girasol"},{texto:"Crear otra sala",href:"sala.html",clase:"bg-crema"},{texto:"Show sin conexi\xF3n",href:"index.html",clase:"bg-crema"}]),F();wm(i).then(()=>p()).catch(w=>{/no existe|404|encontr/i.test(w.message)?mt("Sala no encontrada",`No hay ninguna sala con el c\xF3digo ${i}. Puede que haya caducado.`,[{texto:"Crear una sala",href:"sala.html",clase:"bg-girasol"},{texto:"Show sin conexi\xF3n",href:"index.html",clase:"bg-crema"}]):p()});function p(){e=Am(i,{hola:()=>({rol:"anfitrion",token:f}),alMensaje:g,alCambiarConexion:v})}function x(w){return e?.enviar(w)?!0:(t.avisar("Sin conexi\xF3n con la sala"),!1)}function g(w){switch(w.tipo){case"bienvenida":return w.rol!=="anfitrion"?(e?.cerrar(),mt("No eres el anfitri\xF3n","El servidor no reconoce la llave de anfitri\xF3n guardada en este dispositivo.",[{texto:"Jugar en esta sala",href:`jugar.html?sala=${i}`,clase:"bg-girasol"}])):(r=!0,m(w.estado));case"estado":return m(w.estado);case"bola":Number.isInteger(w.numero)&&!(w.indice>t.cantadas())&&t.bola(w.numero);return;case"ganador":return Q(w);case"dorada":return ct.delayedCall(2.4,()=>z(w));case"reaccion":return H(w.emoji,w.apodo);case"aviso":return t.avisar(w.texto);case"error":return r?t.avisar(w.mensaje||"Algo sali\xF3 mal"):(e?.cerrar(),mt("No se pudo abrir la sala",w.mensaje||"El servidor rechaz\xF3 la conexi\xF3n del anfitri\xF3n.",[{texto:"Jugar en esta sala",href:`jugar.html?sala=${i}`,clase:"bg-girasol"},{texto:"Crear otra sala",href:"sala.html",clase:"bg-crema"}]));default:return}}function m(w){if(!w)return;let I=n;n=w;let N=w.estado;document.body.classList.remove("sala-cargando"),document.body.classList.toggle("sala-lobby",N==="lobby"),wt("lobby").classList.toggle("hidden",N!=="lobby");let k=h&&Date.now()<h.hasta&&w.config?.intervalo!==h.valor;if(k||(h=null),!k&&w.config?.intervalo&&t.fijarVelocidad(w.config.intervalo),N==="lobby"?(I&&I.estado!=="lobby"?(a?.kill(),o?.kill(),t.hayModal()&&t.cerrarModal(),t.reiniciar({aviso:"\xA1Nueva partida! A elegir cartones"}),ct.from("#lobby section, #empezarBtn",{y:60,opacity:0,duration:.6,ease:"back.out(1.8)",stagger:.08,clearProps:"all"})):t.cantadas()>0&&t.fijarBolas([]),s=!1,M(w)):(I?.estado==="lobby"&&(t.avisar("\xA1Que empiece el show!"),ct.from("#actual > div, #controles > *, #infoEnLinea",{y:60,opacity:0,duration:.6,ease:"back.out(2)",stagger:.06,clearProps:"transform,opacity"})),t.fijarBolas(w.bolas||[])),t.correrReloj(N==="jugando"),L(w),C(w),_(w),S(w),N==="terminada"&&!s){s=!0;let $=t.hayModal()||o?.isActive()?6:I?1.6:0;a?.kill(),a=ct.delayedCall($,()=>{t.hayModal()&&t.cerrarModal(),t.finalizar(it(n)),wt("finNuevaBtn")?.addEventListener("click",nt),wt("finVerificarBtn")?.addEventListener("click",at)})}}function d(){wt("conexion").classList.remove("hidden"),wt("enLineaBtn").classList.add("hidden"),wt("cartonesBtn").classList.add("hidden"),wt("bingoBtn").classList.add("hidden"),wt("infoEnLinea").classList.remove("hidden"),wt("bingoLocal").classList.add("hidden"),wt("bingoEnLinea").classList.remove("hidden"),wt("nuevaPartidaBtn").classList.add("hidden"),wt("bingoBotones").classList.replace("grid-cols-2","grid-cols-1"),wt("textoReset").textContent="Se liberan los cartones y todos vuelven a la sala de espera. Los saldos de fichas se conservan.",wt("confirmarResetBtn").textContent="Nueva partida",document.querySelector("#tituloReset").textContent="\xBFNueva partida?",wt("lobbyCodigo").innerHTML=[...i].map((w,I)=>`<span class="lobby-letra ${Ib[I]}" style="--r:${[-5,3,-2,5,-4,2][I]}deg">${w}</span>`).join(""),wt("lobbyEnlace").value=Oh(i);try{wt("lobbyQr").innerHTML=Ub(Oh(i))}catch{wt("lobbyQr").classList.add("hidden")}wt("detenerCuentaBtn").addEventListener("click",()=>x({tipo:"detenerCuenta"})),setInterval(()=>{document.querySelectorAll("[data-hasta]").forEach(w=>{w.textContent=String(Vl(Number(w.dataset.hasta)))}),n?.estado==="lobby"&&n.inicioAutoEn&&(wt("lobbyCuentaSeg").textContent=String(Vl(n.inicioAutoEn)))},250),wt("copiarBtn").addEventListener("click",y),wt("lobbyEnlace").addEventListener("focus",w=>w.target.select()),wt("empezarBtn").addEventListener("click",()=>{n?.estado==="lobby"&&x({tipo:"iniciar"})&&(wt("empezarBtn").disabled=!0)}),wt("lobbyJugadores").addEventListener("click",w=>{let I=w.target.closest("[data-expulsar]");if(!I)return;let N=I.dataset.expulsar;if(u!==N){u=N,M(n);return}u=null,x({tipo:"expulsar",jugadorId:N})})}async function y(){let w=Oh(i);try{await navigator.clipboard.writeText(w)}catch{wt("lobbyEnlace").focus(),wt("lobbyEnlace").select();try{document.execCommand("copy")}catch{}}t.avisar("\xA1Enlace copiado!"),ct.fromTo("#copiarBtn",{rotation:-8},{rotation:0,duration:.6,ease:"elastic.out(1, 0.3)",clearProps:"transform"})}function v(w){let I=wt("conexion");I.dataset.estado=w,wt("conexionTexto").textContent=Db[w]??w,w==="reconectando"&&S(n),w==="conectado"&&S(n)}function b(w){return Object.keys(w.ocupados||{}).length}function T(w){if(w.estado!=="lobby"&&w.pozo)return w.pozo;let I=b(w)*(w.config?.precioCarton||0),N=Math.floor(I*(w.config?.botePorcentaje||0)/100);return Math.max(w.pozo||0,I-N+(w.config?.pozoExtra||0))}function M(w){let I=w.config||{},N=I.cartones||0,k=b(w),$=T(w),st=Vm(w);wt("lobbyUnidades").textContent=st.Varios,wt("lobbyNombre").textContent=w.nombre||`Sala ${i}`,wt("lobbyPozo").textContent=$.toLocaleString("es"),wt("lobbyVendidos").textContent=k,wt("lobbyTotal").textContent=N,wt("lobbyBarra").style.width=`${N?k/N*100:0}%`,wt("lobbyReglas").textContent=`${qa(I)?"Fila de 5 \xB7 ":""}${Js(I.precioCarton)} por ${st.uno} \xB7 m\xE1x. ${I.maxCartonesPorJugador??"\u2014"} por jugador \xB7 ${Js(I.fichasIniciales)} al entrar`,wt("lobbyPremios").innerHTML=(I.premios||[]).map((pt,Yt)=>`
            <li class="flex items-center justify-between gap-3 rounded-xl border-[2.5px] border-tinta bg-papel px-3 py-2">
                <span class="flex items-center gap-2">
                    <span class="grid h-7 w-7 place-items-center rounded-lg border-[2.5px] border-tinta bg-girasol font-display text-sm">${Yt+1}</span>
                    <span class="font-ui font-black uppercase tracking-wide">${Ce($a(pt.modalidad))}</span>
                </span>
                <span class="text-right font-ui font-bold"><span class="font-display">${Math.floor($*pt.porcentaje/100).toLocaleString("es")}</span> <span class="text-tinta/50">\xB7 ${pt.porcentaje}%</span></span>
            </li>`).join("");let O=w.jugadores||[];wt("lobbyConectados").textContent=`${O.filter(pt=>pt.conectado).length}/${O.length}`,wt("lobbyJugadores").innerHTML=O.length?O.map(pt=>`
            <li class="flex items-center gap-3 rounded-xl border-[2.5px] border-tinta bg-white px-3 py-2 ${pt.conectado?"":"opacity-60"}">
                <span class="h-3 w-3 shrink-0 rounded-full border-2 border-tinta ${pt.conectado?"bg-menta":"bg-tinta/20"}" title="${pt.conectado?"Conectado":"Desconectado"}"></span>
                <span class="min-w-0 flex-1">
                    <span class="block truncate font-ui font-black">${Ce(pt.apodo)}</span>
                    <span class="flex flex-wrap gap-1 pt-0.5">${(pt.cartones||[]).length?pt.cartones.map(Yt=>`<span class="rounded-md border-2 border-tinta bg-girasol px-1.5 font-display text-[11px] leading-5">${Yt}</span>`).join(""):`<span class="font-ui text-xs font-bold text-tinta/50">${st.sin}</span>`}</span>
                </span>
                <span class="shrink-0 text-right font-ui text-xs font-bold text-tinta/60">${Js(pt.fichas)}</span>
                <button type="button" data-expulsar="${Ce(pt.id)}" class="boton h-8 shrink-0 px-2 text-[10px] ${u===pt.id?"bg-tomate text-crema":"bg-crema"}"
                        aria-label="Expulsar a ${Ce(pt.apodo)}" title="Expulsar">${u===pt.id?"\xBFSeguro?":"\u2715"}</button>
            </li>`).join(""):`<li class="grid flex-1 place-items-center rounded-xl border-[2.5px] border-dashed border-tinta/30 p-6 text-center font-ui font-bold text-tinta/50">
                A\xFAn no hay nadie.<br>Escanea o escribe el enlace en el m\xF3vil para unirte.</li>`;let Tt=w.justo?.compromiso;wt("lobbyJusto").classList.toggle("hidden",!Tt),wt("lobbyJusto").classList.toggle("flex",!!Tt),wt("lobbyCompromiso").textContent=Tt?Tt.slice(0,12):"",wt("lobbyExtras").innerHTML=E(w);let dt=!!w.inicioAutoEn;wt("lobbyCuenta").classList.toggle("hidden",!dt),wt("lobbyCuenta").classList.toggle("flex",dt),dt&&(wt("lobbyCuentaSeg").textContent=String(Vl(w.inicioAutoEn)));let et=k>0;wt("empezarBtn").disabled=!et,wt("empezarAyuda").textContent=et?`${Nh(k,st.vendido,st.vendidos)} \xB7 \xA1Todo listo!`:O.length?st.alguien:"Esperando jugadores"}function E(w,I="div"){let N=w?.config||{},k=[];if(N.rondasSeguidas&&k.push(`<${I} class="flex items-center justify-between gap-2 rounded-xl border-[2.5px] border-tinta bg-menta px-3 py-1.5">
                <span class="font-ui font-black uppercase tracking-wide">Ronda ${w.ronda??1}</span><span class="font-ui text-xs font-bold">rondas seguidas</span></${I}>`),N.botePorcentaje>0){let $=(w.bote||0)+(w.estado==="lobby"&&w.aporteRonda||0);k.push(`<${I} class="flex items-center justify-between gap-2 rounded-xl border-[2.5px] border-tinta bg-fucsia px-3 py-1.5">
                <span class="font-ui font-black uppercase tracking-wide">Bote <span class="text-xs normal-case">\xB7 en ${N.boteBolas} bolas o menos</span></span>
                <span class="font-display text-lg">${$.toLocaleString("es")}</span></${I}>`)}return N.bolaDorada&&k.push(`<${I} class="flex items-center justify-between gap-2 rounded-xl border-[2.5px] border-tinta bg-girasol px-3 py-1.5">
                <span class="font-ui font-black uppercase tracking-wide">Bola dorada <span class="text-xs normal-case">\xB7 premio \xD72</span></span>
                <span class="font-display text-lg">${w.dorada?Ce(`${t.columnaDe(w.dorada).letra}-${w.dorada}`):"\xBF?"}</span></${I}>`),k.join("")}function C(w){let I=w.jugadores||[],N=I.filter($=>$.conectado).length;wt("infoJugadores").textContent=`${N}/${I.length} conectados`,wt("infoPozo").textContent=T(w).toLocaleString("es");let k=w.premios?.length?w.premios:w.config?.premios||[];wt("infoPremios").innerHTML=E(w,"li")+k.map(($,st)=>{let O=st===w.premioActual&&w.estado!=="lobby"&&w.estado!=="terminada",Tt=$.ganadores||[],dt=Tt.length?`<span class="truncate text-tinta/70">${Tt.map(et=>Ce(et.apodo)).join(", ")}</span>`:O?'<span class="premio-en-juego">En juego</span>':'<span class="text-tinta/40">Pendiente</span>';return`<li class="premio-fila ${O?"activo":""} ${Tt.length?"ganado":""}">
                <span class="font-ui text-[11px] font-black uppercase tracking-wide">${Tt.length?"\u2713 ":""}${Ce($a($.modalidad))}${$.doble?" \xD72":""}</span>
                <span class="font-display text-xs">${($.fichas??Math.floor(T(w)*$.porcentaje/100)).toLocaleString("es")}</span>
                <span class="col-span-2 flex min-w-0 font-ui text-[11px] font-bold">${dt}</span>
            </li>`}).join("")}function _(w){let I=!!w.ventanaHasta&&w.estado==="jugando",N=wt("ventanaBingo");I&&!l?(wt("ventanaTitulo").textContent=qa(w.config)?"\xA1Fila completa!":kl(w.config)?"\xA1Jugada completa!":"\xA1Bingo cantado!",N.classList.remove("hidden"),ct.fromTo(N.firstElementChild,{scale:2.5,rotation:-20,opacity:0},{scale:1,rotation:-3,opacity:1,duration:.45,ease:"back.out(2)"}),t.sonido()&&(Xs(.8),lr(t.voz(Lm(w.config)?"fila":"bingo")))):!I&&l&&ct.to(N.firstElementChild,{scale:.6,opacity:0,duration:.25,ease:"power2.in",onComplete:()=>N.classList.add("hidden")}),l=I}function S(w){if(!w)return;let I=wt("conexion").dataset.estado==="conectado";wt("playBtn").disabled=!I||w.estado==="terminada"||w.estado==="lobby",wt("velocidadBtn").disabled=!I,wt("resetBtn").disabled=!I||w.estado==="jugando"||w.estado==="pausa",wt("resetBtn").title=w.estado==="terminada"?"Nueva partida (R)":"Disponible al terminar la partida",wt("playBtn").setAttribute("aria-label",w.estado==="pausa"?"Reanudar":"Pausar")}function L(w){let I=w.estado==="jugando"&&!w.ventanaHasta?w.siguienteBolaEn:null;if(!I){c=null;return}if(c?.objetivo===I)return;let N=w.config?.intervalo||8e3,k=ct.utils.clamp(0,N+8e3,I-Date.now());c={objetivo:I,hasta:performance.now()+k,total:Math.max(N,k)}}function U(){return c?ct.utils.clamp(0,1,1-(c.hasta-performance.now())/c.total):0}function X(w){return`<div class="flex gap-2 rounded-2xl border-[3px] border-tinta bg-white p-3">${w.map((I,N)=>`
            <span class="fila-celda grid h-14 w-14 place-items-center rounded-full border-[3px] border-tinta font-display text-xl text-tinta"
                  style="background:${Nb[N]}">${I}</span>`).join("")}</div>`}function D(w,I){if(I===Lh)return Number.isInteger(w.carton)?X(Rm(w.carton)):"";if(I===Ih)return n?.jugadas?.[w.carton]?X(n.jugadas[w.carton]):"";if(!n?.serie||!Number.isInteger(w.carton))return"";try{let N=Ol(n.serie,w.carton),k=Fl(N,new Set(n.bolas||[]),I);return Bl(N,{marcadas:k.marcadas,clave:k.gana?k.figura:[]})}catch{return""}}function z({numero:w,fichas:I}){let N=document.createElement("div");N.className="aviso-dorada",N.innerHTML=`<p class="font-display text-4xl leading-none sm:text-6xl">\xA1Bola dorada!</p>
            <p class="mt-2 font-ui text-lg font-black">Sali\xF3 el ${Ce(`${t.columnaDe(w).letra}-${w}`)} \xB7 el premio se duplica: ${Js(I)}</p>`,document.body.append(N),ct.timeline({onComplete:()=>N.remove()}).fromTo(N,{scale:.2,rotation:-12,autoAlpha:0},{scale:1,rotation:-3,autoAlpha:1,duration:.6,ease:"back.out(2.2)"}).to(N,{autoAlpha:0,y:-40,duration:.5,ease:"power2.in"},"+=2.6"),t.sacudir(),t.sonido()&&(qs(),ct.delayedCall(.6,()=>lr(t.voz("dorada"))))}function H(w,I){if(document.hidden)return;let N=document.createElement("div");N.className="reaccion-show",N.innerHTML=`<span class="text-5xl sm:text-6xl">${Ce(w)}</span><span class="reaccion-apodo">${Ce(I)}</span>`,N.style.left=`${8+Math.random()*55}%`,document.body.append(N),setTimeout(()=>N.remove(),3200)}function J(w,I){if(t.reducirMovimiento||!Number.isInteger(w))return I();let{letra:N,color:k}=t.columnaDe(w),$=document.createElement("div");$.className="repeticion",$.innerHTML=`<div class="repeticion-barra arriba"></div><div class="repeticion-barra abajo"></div>
            <p class="repeticion-etiqueta">\u25CF Repetici\xF3n \xB7 bola decisiva</p>
            <div class="repeticion-bola" style="--c:${k}"><b><small>${N}</small>${w}</b></div>`,document.body.append($);let st=$.querySelector(".repeticion-bola");ct.timeline({onComplete:()=>{$.remove(),I()}}).fromTo($.querySelectorAll(".repeticion-barra"),{scaleY:0},{scaleY:1,duration:.35,ease:"power2.out"}).from($.querySelector(".repeticion-etiqueta"),{autoAlpha:0,x:-30,duration:.3},.2).fromTo(st,{scale:.15,rotation:-540,x:-260,y:160,filter:"blur(6px)"},{scale:1,rotation:0,x:0,y:0,filter:"blur(0px)",duration:1.6,ease:"power3.out"},.25).call(()=>t.sacudir(),null,1.55).to(st,{scale:1.12,duration:.18,yoyo:!0,repeat:1,ease:"power1.inOut"},1.6).to($,{autoAlpha:0,duration:.3},"+=0.25")}function Q(w){let I=n?.bolas||[];J(I.at(-1),()=>tt(w))}function tt({modalidad:w,ganadores:I=[],siguiente:N=null,bote:k=0}){let $=$a(w),st=n?.premios||[],O=st.findIndex(et=>et.modalidad===w),Tt=st.find(et=>et.modalidad===N),dt=I.length>1;wt("bingoEnLinea").innerHTML=`
            <p class="text-center etiqueta text-tinta/60">${O>=0?`Premio ${O+1} de ${st.length}`:"Premio"} \xB7 ${t.cantadas()} bolas</p>
            <h3 class="mt-1 text-center font-display text-3xl leading-none sm:text-4xl">\xA1${Ce($)}!</h3>
            <ul class="mt-4 grid gap-2">${I.map(et=>`
                <li class="flex items-center justify-between gap-3 rounded-xl border-[2.5px] border-tinta bg-papel px-3 py-2">
                    <span class="min-w-0">
                        <span class="block truncate font-ui text-lg font-black">${Ce(et.apodo)}</span>
                        <span class="etiqueta text-tinta/60">${Vm(n).Uno} n\xBA ${Ce(et.carton)}</span>
                    </span>
                    <span class="shrink-0 rounded-lg border-[2.5px] border-tinta bg-girasol px-2 py-1 font-display text-base shadow-duro-sm">+${Number(et.fichas||0).toLocaleString("es")}</span>
                </li>`).join("")}
            </ul>
            ${k?`<p class="mt-3 rounded-xl border-[2.5px] border-tinta bg-fucsia px-3 py-2 text-center font-display text-xl">\xA1Y se lleva el bote! +${Number(k).toLocaleString("es")}</p>`:""}
            <div class="ganadores-cartones mt-4 flex flex-wrap justify-center gap-3 ${dt?"varios":""}">
                ${I.slice(0,3).map(et=>D(et,w)).join("")}
            </div>
            <p class="mt-4 rounded-xl bg-tinta px-3 py-2 text-center font-ui font-black text-crema">${N?`Seguimos por: ${Ce($a(N))}${Tt?.fichas?` \xB7 ${Js(Tt.fichas)}`:""}`:"\xA1Era el \xFAltimo premio!"}</p>`,t.celebrarGanador(),wt("sello").classList.add("hidden"),ct.delayedCall(1.2,()=>{if(!t.hayModal())return;let et=wt("sello");et.textContent="\xA1V\xE1lido!",et.style.background="#19c3a0",et.style.color="#14112b",et.style.borderColor="#14112b",et.classList.remove("hidden"),ct.fromTo(et,{scale:3.5,rotation:-35,autoAlpha:0},{scale:1,rotation:-12,autoAlpha:1,duration:.42,ease:"power4.in"})}),ct.from("#bingoEnLinea .carton-celda, #bingoEnLinea .fila-celda",{scale:0,duration:.35,ease:"back.out(2.5)",stagger:{amount:.35,from:"center"},delay:.9}),o?.kill(),o=ct.delayedCall(5.4,()=>{t.hayModal()&&t.cerrarModal()})}function it(w){let N=(w?.premios||[]).map(Tt=>{let dt=(Tt.ganadores||[]).map(et=>`${Ce(et.apodo)} <span class="text-tinta/50">(n\xBA ${Ce(et.carton)})</span>`).join(", ")||"\u2014";return`<li class="flex items-baseline justify-between gap-4 border-t-2 border-tinta/15 py-1.5 text-left">
                <span class="font-ui text-sm font-black uppercase tracking-wide">${Ce($a(Tt.modalidad))}</span>
                <span class="font-ui text-sm font-bold">${dt} \xB7 <span class="font-display">${Number(Tt.fichas||0).toLocaleString("es")}</span></span>
            </li>`}).join(""),k=[...w?.jugadores||[]].filter(Tt=>(Tt.ganado||0)>0).sort((Tt,dt)=>dt.ganado-Tt.ganado).slice(0,5),$=["\u{1F947}","\u{1F948}","\u{1F949}","4.","5."],st=k.length?`<p class="etiqueta mt-4">Ranking de la noche</p>
            <ol class="mx-auto mt-1 max-w-md">${k.map((Tt,dt)=>`<li class="flex items-baseline justify-between gap-4 border-t-2 border-tinta/15 py-1 text-left font-ui text-sm font-bold">
                <span>${$[dt]} ${Ce(Tt.apodo)}</span><span class="font-display">+${Number(Tt.ganado).toLocaleString("es")}</span></li>`).join("")}</ol>`:"",O=w?.config?.rondasSeguidas&&w?.siguienteRondaEn?`<p class="mt-3 rounded-full bg-menta px-4 py-1.5 font-ui font-black">Ronda ${(w.ronda??1)+1} en <span class="font-display text-lg" data-hasta="${w.siguienteRondaEn}">${Vl(w.siguienteRondaEn)}</span> s</p>`:"";return`<p class="font-display text-3xl sm:text-5xl">\xA1Partida terminada!</p>
            <p class="etiqueta mt-1">${w?.config?.rondasSeguidas?`Ronda ${w.ronda??1} \xB7 `:""}${Nh((w?.bolas||[]).length,"bola","bolas")} \xB7 pozo de ${Js(w?.pozo)}</p>
            <ol class="mx-auto mt-3 max-w-md">${N}</ol>
            ${st}
            ${O}
            <div class="mt-4 flex flex-wrap justify-center gap-2">
                ${w?.justo?'<button id="finVerificarBtn" type="button" class="boton pointer-events-auto h-11 bg-menta px-4">Verificar partida</button>':""}
                <button id="finNuevaBtn" type="button" class="boton pointer-events-auto h-11 bg-tinta px-5 text-crema">Nueva partida</button>
            </div>
            <div id="finVerificacion" class="mx-auto mt-3 hidden max-w-md rounded-xl border-[2.5px] border-tinta px-3 py-2 text-left font-ui text-sm font-bold" aria-live="polite"></div>`}function at(){let w=wt("finVerificacion"),I=n,N=I?.justo,k;N?.semillaServidor?k=km({compromiso:N.compromiso,semillaServidor:N.semillaServidor,semillasClientes:N.semillasClientes||[],semillaClientes:N.semillaClientes,serie:I.serie,bolas:I.bolas||[],dorada:I.config?.bolaDorada?I.dorada??null:null}):k={valida:!1,errores:["El servidor a\xFAn no ha revelado su semilla."]},w.classList.remove("hidden"),w.style.background=k.valida?"#19c3a0":"#fff",w.style.color=k.valida?"#14112b":"#ff5a36",w.innerHTML=k.valida?`\u2713 Partida verificada: las ${(I.bolas||[]).length} bolas y la serie ${Ce(I.serie)} salen de la semilla comprometida (${Ce(N.compromiso.slice(0,12))}\u2026) y de las semillas de ${Nh((N.semillasClientes||[]).length,"jugador","jugadores")}.`:`\u2715 No cuadra:<ul class="mt-1 list-disc pl-5">${k.errores.map($=>`<li>${Ce($)}</li>`).join("")}</ul>`,ct.fromTo(w,{scale:.6,opacity:0},{scale:1,opacity:1,duration:.4,ease:"back.out(2.5)"})}function mt(w,I,N){document.body.classList.remove("sala-cargando"),wt("salaAvisoTitulo").textContent=w,wt("salaAvisoTexto").textContent=I,wt("salaAvisoAcciones").innerHTML=N.map(k=>`<a href="${k.href}" class="boton h-12 ${k.clase}">${Ce(k.texto)}</a>`).join(""),wt("salaAviso").classList.replace("hidden","grid"),v("cerrado")}function K(){n&&(n.estado==="jugando"?x({tipo:"pausar"}):n.estado==="pausa"?x({tipo:"reanudar"}):n.estado==="lobby"&&t.avisar("Pulsa \xAB\xA1Empezar!\xBB cuando est\xE9is listos"))}function nt(){if(n){if(n.estado==="jugando"||n.estado==="pausa")return t.avisar("La partida en curso tiene que terminar");if(n.estado==="lobby")return t.avisar("Ya est\xE1is en la sala de espera");t.abrirModal("modalReset")}}function F(){return{alternar:K,pedirReinicio:nt,nuevaPartida:()=>x({tipo:"nuevaPartida"}),velocidad:w=>{x({tipo:"velocidad",intervalo:w})?(h={valor:w,hasta:Date.now()+3e3},t.avisar(`Una bola cada ${w/1e3} segundos`)):n?.config?.intervalo&&t.fijarVelocidad(n.config.intervalo)},progresoAnillo:U}}return F()}var Ks=[{id:"normal",nombre:"Voz normal",lang:"es-ES"},{id:"frases",nombre:"Voz con frases",lang:"es-ES"},{id:"en",nombre:"Voice in English",lang:"en-US"},{id:"pt",nombre:"Voz em portugu\xEAs",lang:"pt-BR"}],Xm={1:"el uno, como ninguno",2:"el dos, \xA1qu\xE9 arroz!",3:"el tres, al rev\xE9s",4:"el cuatro, \xA1qu\xE9 retrato!",5:"el cinco, \xA1dale un brinco!",7:"el siete de la suerte",8:"el ocho, \xA1qu\xE9 bizcocho!",9:"el nueve, \xA1c\xF3mo llueve!",10:"el diez, \xA1otra vez!",11:"las dos patitas",12:"la docena",13:"el de la mala suerte",15:"la ni\xF1a bonita",20:"veinte, \xA1qu\xE9 valiente!",22:"los dos patitos",25:"Navidad, Navidad",30:"treinta, \xA1qu\xE9 calor!",33:"la edad de Cristo",40:"cuarenta, \xA1cuenta y cuenta!",44:"cuatro y cuatro, a bailar",45:"el \xFAltimo de la N",50:"medio siglo",55:"los dos cincos, \xA1qu\xE9 brincos!",60:"sesenta, \xA1qu\xE9 tormenta!",61:"empieza la O",66:"los dos seises",70:"setenta, \xA1se calienta!",75:"la \xFAltima del bombo"};function Ya(){try{return localStorage.getItem("bingoshow.voz")||"normal"}catch{return"normal"}}function qm(i){try{localStorage.setItem("bingoshow.voz",i)}catch{}}var Hl=i=>Ks.find(t=>t.id===i)??Ks[0];function Fh(i,t,e=Ya()){let{lang:n}=Hl(e);return e==="frases"&&Xm[t]?{texto:`${i}, ${t}\u2026 \xA1${Xm[t]}!`,lang:n}:{texto:`${i}, ${t}`,lang:n}}function Gl(i,t=Ya()){let e={bingo:{es:"\xA1Bingo!",en:"Bingo!",pt:"Bingo!"},fila:{es:"\xA1Fila completa!",en:"Full row!",pt:"Linha completa!"},dorada:{es:"\xA1Bola dorada! \xA1Premio doble!",en:"Golden ball! Double prize!",pt:"Bola dourada! Pr\xEAmio em dobro!"}},n=t==="en"||t==="pt"?t:"es";return{texto:e[i]?.[n]??"",lang:Hl(t).lang}}var Zl=[{letra:"B",color:"#ff5a36"},{letra:"I",color:"#ffc43d"},{letra:"N",color:"#19c3a0"},{letra:"G",color:"#3d6bff",textoClaro:!0},{letra:"O",color:"#ff4fa3"}],Qs=Zl.map(i=>i.color),Xr=75,Zm=5,Za=[4e3,6e3,8e3,12e3],pi=window.matchMedia("(prefers-reduced-motion: reduce)").matches,_t=i=>document.getElementById(i),Rn=i=>Zl[Math.floor((i-1)/15)];function js(i,t){try{let e=localStorage.getItem("bingoshow."+i);return e===null?t:JSON.parse(e)}catch{return t}}function Jl(i,t){try{localStorage.setItem("bingoshow."+i,JSON.stringify(t))}catch{}}var ut={bolas:[],restantes:[],indice:-1,salidas:new Set,jugando:!1,terminado:!1,intervalo:Za.includes(js("intervalo",8e3))?js("intervalo",8e3):8e3,sonido:js("sonido",!0),patron:Wr[js("patron","linea")]?js("patron","linea"):"linea",tiempoAcumulado:0,inicioTramo:0},Pn=null,zh=null,cr=null,di=null,Xl=null,Ja=null,ql=0,$l=null,Mn=null,Wl=null,kh=()=>Array.from({length:Xr},(i,t)=>t+1),Fb=()=>ct.utils.clamp(.6,1,ut.intervalo/7e3);function Bb(){let i=_t("tablero"),t=document.createDocumentFragment();Zl.forEach(({letra:e,color:n,textoClaro:r},s)=>{let a=document.createElement("div");a.className="mb-1 grid place-items-center rounded-lg border-[2.5px] border-tinta py-1 shadow-duro-sm",a.style.background=n,a.style.color=r?"#fff3df":"#14112b",a.innerHTML=`<span class="font-display text-lg leading-none sm:text-xl">${e}</span><span class="font-ui text-[10px] font-black leading-none opacity-80" data-cuenta="${e}">0/15</span>`,t.appendChild(a);for(let o=1;o<=15;o++){let l=s*15+o,c=document.createElement("div");c.className="casilla",c.id="num"+l,c.innerHTML=`<div class="casilla-giro"><div class="casilla-cara casilla-frente">${l}</div><div class="casilla-cara casilla-dorso" style="--c:${n};color:${r?"#fff3df":"#14112b"}">${l}</div></div>`,t.appendChild(c)}}),i.appendChild(t)}function zb(i){let t=_t("num"+i);cr?.classList.remove("ultima"),t.classList.add("ultima"),cr=t,ct.to(t.firstElementChild,{rotationX:180,duration:.8,ease:"back.out(1.7)"}),ct.fromTo(t,{scale:1.5,zIndex:5},{scale:1,duration:.6,ease:"elastic.out(1, 0.5)",clearProps:"zIndex"})}function Vh(){let i=ut.salidas.size;_t("contadorBolas").textContent=i,_t("pizarraCuenta").textContent=i,ct.to("#progreso",{width:`${i/Xr*100}%`,duration:.6,ease:"power3.out"}),Zl.forEach(({letra:t},e)=>{let n=0;ut.salidas.forEach(a=>{Math.floor((a-1)/15)===e&&n++});let r=document.querySelector(`[data-cuenta="${t}"]`),s=`${n}/15`;r.textContent!==s&&(r.textContent=s,n&&ct.fromTo(r.parentElement,{scale:1.25},{scale:1,duration:.5,ease:"elastic.out(1, 0.4)"}))}),i&&ct.fromTo("#contadorBolas",{scale:1.6,color:"#ff5a36"},{scale:1,color:"#14112b",duration:.5,ease:"back.out(3)"})}function Ka(i,t=!1){let{letra:e}=Rn(i);return`<span class="ficha-centro"><span class="text-center leading-none"><span class="block ${t?"text-[9px]":"text-[7px]"}">${e}</span><span class="${t?"text-base sm:text-lg":"text-[11px]"}">${i}</span></span></span>`}function kb(i){let{letra:t,color:e}=Rn(i),n=_t("fichaActual"),r=$l;$l=i,Xl?.kill(),Xl=ct.timeline().to(n,{rotationY:90,duration:.15,ease:"power2.in"}).call(()=>{n.style.setProperty("--c",e),n.innerHTML=Ka(i,!0),_t("textoActual").textContent=`${t}-${i}`}).to(n,{rotationY:0,duration:.5,ease:"back.out(3)"}),ct.fromTo("#textoActual",{x:-16,opacity:0},{x:0,opacity:1,duration:.4,ease:"power3.out",delay:.15}),r&&Vb(r)}function Vb(i){let t=_t("historial"),e=document.createElement("li");e.className="ficha h-10 w-10 sm:h-11 sm:w-11",e.style.setProperty("--c",Rn(i).color),e.innerHTML=Ka(i),e.setAttribute("aria-label",`${Rn(i).letra} ${i}`),t.prepend(e),ct.from(e,{x:-60,rotation:-270,scale:.3,duration:.7,ease:"back.out(1.8)"}),ct.from([...t.children].slice(1),{x:-46,duration:.5,ease:"power3.out"});let n=t.children;for(;n.length>Zm;)n[n.length-1].remove()}var Jm=i=>{let t=Math.floor(i/1e3);return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`},Hh=()=>ut.tiempoAcumulado+(ut.jugando?performance.now()-ut.inicioTramo:0),Kl=()=>{_t("tiempo").textContent=Jm(Hh())},$m=null;function ur(i){let t=_t("aviso");t.textContent=i,$m?.kill(),$m=ct.timeline().fromTo(t,{xPercent:-50,y:-30,rotation:-4,opacity:0},{y:0,rotation:-2,opacity:1,duration:.45,ease:"back.out(2.5)"}).to(t,{y:-20,opacity:0,duration:.3,delay:1.8,ease:"power2.in"})}function ta(){_t("iconoPlay").classList.toggle("hidden",ut.jugando),_t("iconoPausa").classList.toggle("hidden",!ut.jugando);let i=ut.jugando?"Pausar":ut.indice>=0?"Continuar":"Iniciar";_t("playBtn").setAttribute("aria-label",i),_t("playBtn").disabled=ut.terminado}function Km(){if(ut.restantes.length===0)return Gh();let i=Em(ut.restantes);ut.bolas.push(i),ut.indice=ut.bolas.length-1,jm(i),ut.indice<Xr-1&&Qm()}function jm(i){let t={...Rn(i),numero:i};ut.salidas.add(i);let e=Fb(),n=ql,r=()=>n===ql,s=()=>r()&&!Di;ut.sonido&&pm(1.5*e),di.sortear(i,{ritmo:e,onSalida:()=>s()&&ut.sonido&&mm(.8*e),onRevelar:()=>s()&&ut.sonido&&gm(),onImpacto:()=>{r()&&(s()&&(ut.sonido&&(Xs(),ct.delayedCall(.35,()=>s()&&ut.sonido&&lr(Fh(t.letra,i)))),fm(t,{ritmo:e,reducirMovimiento:pi})),zb(i),kb(i),Vh(),!Mn&&ut.indice>=Xr-1&&(Ja=ct.delayedCall(1.6,Gh)))}})}function Qm(){Pn?.kill(),Pn=ct.delayedCall(ut.intervalo/1e3,Km),ut.jugando||Pn.pause()}function tg(){ut.jugando||ut.terminado||(ut.jugando=!0,ut.inicioTramo=performance.now(),zh=setInterval(Kl,250),Pn?Pn.resume():Km(),ta())}function ea(){ut.jugando&&(ut.tiempoAcumulado=Hh(),ut.jugando=!1,clearInterval(zh),Pn?.pause(),Ul(),Kl(),ta())}var eg=()=>Mn?Mn.alternar():ut.jugando?ea():tg();function Gh(i){if(ut.terminado)return;ea(),Pn?.kill(),Pn=null,ut.terminado=!0,ta(),di.terminar(),_t("fin").classList.replace("hidden","grid"),Il(_t("finSello"),{texto:"",fondo:"#ffc43d"},pi),_t("finSello").innerHTML=typeof i=="string"?i:'<p class="font-display text-3xl sm:text-5xl">\xA1Se acabaron!</p><p class="etiqueta mt-1">Salieron las 75 bolas</p>',Va(Qs,{cantidad:pi?0:80}),ut.sonido&&qs()}function Wh({aviso:i="\xA1Las bolas vuelven al bombo!"}={}){ql++,ea(),Pn?.kill(),Pn=null,Ja?.kill(),Ja=null,Xl?.kill(),Ul(),Object.assign(ut,{bolas:[],restantes:kh(),indice:-1,salidas:new Set,terminado:!1,tiempoAcumulado:0}),cr?.classList.remove("ultima"),cr=null,$l=null,ct.to("#tablero .casilla-giro",{rotationX:0,duration:.5,ease:"power3.inOut",stagger:{each:.012,from:"end"}});let t=[..._t("historial").children];ct.to(t,{y:80,rotation:90,opacity:0,duration:.4,stagger:.05,ease:"power2.in",onComplete:()=>t.forEach(n=>n.remove())});let e=_t("fichaActual");e.style.setProperty("--c","#3b2a6e"),e.innerHTML='<span class="ficha-centro">?</span>',_t("textoActual").textContent="\u2014",_t("fin").classList.replace("grid","hidden"),di.reiniciar(),Vh(),Kl(),ta(),i&&ur(i)}function Hb(i){ut.salidas.has(i)||ut.salidas.size>=Xr||(ut.indice=ut.salidas.size,ut.bolas=[...ut.bolas.slice(0,ut.indice),i],ut.restantes=ut.restantes.filter(t=>t!==i),jm(i))}function Gb(i){let t=ut.bolas.slice(0,ut.indice+1);if(t.length===i.length&&i.every((s,a)=>s===t[a]))return!1;ql++,Ja?.kill(),Ja=null,Xl?.kill(),ut.bolas=[...i],ut.indice=i.length-1,ut.salidas=new Set(i),ut.restantes=kh().filter(s=>!ut.salidas.has(s)),di.retirar(i),Wl&&Wl.progress()<1?Wl.eventCallback("onComplete",Ym):Ym(),cr?.classList.remove("ultima"),cr=null;let e=i[i.length-1]??null,n=_t("fichaActual");ct.set(n,{rotationY:0}),$l=e,e?(cr=_t("num"+e),cr.classList.add("ultima"),n.style.setProperty("--c",Rn(e).color),n.innerHTML=Ka(e,!0),_t("textoActual").textContent=`${Rn(e).letra}-${e}`):(n.style.setProperty("--c","#3b2a6e"),n.innerHTML='<span class="ficha-centro">?</span>',_t("textoActual").textContent="\u2014");let r=_t("historial");return ct.killTweensOf(r.children),r.innerHTML="",i.slice(0,-1).slice(-Zm).reverse().forEach(s=>{let a=document.createElement("li");a.className="ficha h-10 w-10 sm:h-11 sm:w-11",a.style.setProperty("--c",Rn(s).color),a.innerHTML=Ka(s),a.setAttribute("aria-label",`${Rn(s).letra} ${s}`),r.appendChild(a)}),Vh(),!0}function Ym(){for(let i=1;i<=Xr;i++){let t=_t("num"+i);ct.killTweensOf([t,t.firstElementChild]),ct.set(t.firstElementChild,{rotationX:ut.salidas.has(i)?180:0,opacity:1}),ct.set(t,{scale:1,clearProps:"zIndex"})}}function Wb(i){if(i!==ut.jugando){if(!i)return ea();ut.jugando=!0,ut.inicioTramo=performance.now(),zh=setInterval(Kl,250),ta()}}function Xb(i){!Za.includes(i)||i===ut.intervalo||(ut.intervalo=i,Yl())}function qb(){Di&&qr(),jl(_t("modalBingo")),wh({colores:Qs,reducirMovimiento:pi}),di.celebrar(),ut.sonido&&(qs(),lr(Gl("bingo")))}ct.ticker.add(()=>{let i=Mn?Mn.progresoAnillo():Pn&&!ut.terminado?Pn.progress():0;_t("anillo").setAttribute("stroke-dashoffset",String(100-i*100))});var Di=null,ng=null;function jl(i){ng=document.activeElement,Di=i,i.classList.replace("hidden","flex"),ct.fromTo(i.querySelector(".modal-fondo"),{opacity:0},{opacity:1,duration:.3}),i.id==="modalReset"&&ct.fromTo(i.querySelector(".modal-caja"),{scale:.4,rotation:-10,opacity:0},{scale:1,rotation:0,opacity:1,duration:.55,ease:"elastic.out(1, 0.6)"}),(i.querySelector("[data-autofoco]")??i.querySelector("button:not([data-cerrar])"))?.focus({preventScroll:!0})}function qr(){let i=Di;i&&(Di=null,dm(),ct.to(i.querySelector(".modal-fondo"),{opacity:0,duration:.25}),ct.to(i.querySelectorAll(".modal-caja, .letra-bingo"),{y:60,scale:.85,opacity:0,duration:.25,ease:"power2.in",stagger:.02,onComplete:()=>{i.classList.replace("flex","hidden"),ct.set(i.querySelectorAll(".modal-caja, .letra-bingo"),{clearProps:"all"})}}),ng?.focus?.({preventScroll:!0}))}document.querySelectorAll("[data-cerrar]").forEach(i=>i.addEventListener("click",qr));document.addEventListener("keydown",i=>{if(!Di||i.key!=="Tab")return;let t=[...Di.querySelectorAll("button, textarea, input, summary")].filter(r=>r.offsetParent),e=t[0],n=t[t.length-1];i.shiftKey&&document.activeElement===e?(i.preventDefault(),n.focus()):!i.shiftKey&&document.activeElement===n&&(i.preventDefault(),e.focus())});function ig(){if(!Mn){if(ut.salidas.size===0){ur("A\xFAn no ha salido ninguna bola"),ct.fromTo("#bingoBtn",{rotation:-8},{rotation:0,duration:.6,ease:"elastic.out(1, 0.25)",clearProps:"transform"});return}ea(),_t("bingoBolas").textContent=ut.salidas.size,_t("bingoBolasPalabra").textContent=ut.salidas.size===1?"bola":"bolas",_t("bingoTiempo").textContent=Jm(Hh()),_t("codigoCarton").value="",_t("numerosCarton").value="",_t("aMano").open=!1,_t("resultado").classList.add("hidden"),_t("sello").classList.add("hidden"),ja=null,ag(),sg(),jl(_t("modalBingo")),wh({colores:Qs,reducirMovimiento:pi}),di.celebrar(),ut.sonido&&(qs(),lr(Gl("bingo")))}}var ja=null;function rg(){let i=ym(js("serie",""));return Ph(i)?i:null}function sg(){_t("serieActual").textContent=rg()??"\u2014"}function ag(){document.querySelectorAll("#patrones [data-patron]").forEach(i=>{i.setAttribute("aria-checked",String(i.dataset.patron===ut.patron))})}function og(){_t("resultado").classList.remove("hidden"),_t("resultadoCarton").innerHTML="",_t("resultadoChips").innerHTML=""}function lg(i){_t("resultadoTexto").textContent=i,_t("resultadoTexto").className="mb-3 text-center font-ui font-black text-tinta/60",_t("sello").classList.add("hidden")}function Bh(i,t){let e=_t("resultadoTexto");e.textContent=t,e.className=`mb-3 text-center font-ui font-black ${i?"text-tinta":"text-tomate"}`,i?(Il(_t("sello"),{texto:"\xA1V\xE1lido!",fondo:"#19c3a0"},pi),ct.delayedCall(.4,()=>{Va(Qs,{cantidad:pi?0:70}),ut.sonido&&Xs(.8)})):(Il(_t("sello"),{texto:"No vale",fondo:"#ff5a36",color:"#fff3df"},pi),ct.delayedCall(.4,()=>ut.sonido&&Xs(.6)))}var $b=i=>i.map(t=>Rn(t).letra+t).join(", "),cg=i=>`${i.length===1?"falta 1 n\xFAmero":`faltan ${i.length} n\xFAmeros`}: ${$b(i)}`;function Xh(){ja=Xh,og();let i=Mm(_t("codigoCarton").value,rg());if(i.error)return lg(i.error);Jl("serie",i.serie),sg();let t=Ol(i.serie,i.numero),e=Fl(t,ut.salidas,ut.patron),{nombre:n}=Wr[ut.patron];_t("resultadoCarton").innerHTML=Bl(t,{marcadas:e.marcadas,clave:e.figura,faltan:e.faltan}),ct.from("#resultadoCarton .carton-celda",{scale:0,duration:.35,ease:"back.out(2.5)",stagger:{amount:.35,grid:[5,5],from:"center"}});let r=e.gana?`Cart\xF3n ${t.codigo}: \xA1${n}!`:`Cart\xF3n ${t.codigo}: para ${n.toLowerCase()} le ${cg(e.faltan)}`;Bh(e.gana,r)}function ug(){ja=null,og();let i=_t("numerosCarton").value,t=[...new Set((i.match(/\d+/g)||[]).map(Number))].filter(r=>r>=1&&r<=Xr);if(t.length===0)return lg("Escribe n\xFAmeros del 1 al 75.");let e=_t("resultadoChips");t.forEach(r=>{let s=ut.salidas.has(r),a=document.createElement("span");a.className="ficha h-14 w-14"+(s?"":" opacity-40 grayscale"),a.style.setProperty("--c",Rn(r).color),a.innerHTML=Ka(r,!0),s||(a.title="A\xFAn no ha salido"),e.appendChild(a)}),ct.from(e.children,{scale:0,rotation:-180,duration:.5,stagger:.05,ease:"back.out(2.5)"});let n=t.filter(r=>!ut.salidas.has(r));if(n.length===0)Bh(!0,`Los ${t.length} n\xFAmeros ya salieron.`);else{let r=cg(n);Bh(!1,r[0].toUpperCase()+r.slice(1))}}function Ql(i){let t=_t("pizarra"),e=_t("pizarraFondo"),n=i??!t.classList.contains("abierta");t.classList.toggle("abierta",n),_t("pizarraBtn").setAttribute("aria-expanded",String(n)),n?(e.classList.remove("hidden"),ct.fromTo(e,{opacity:0},{opacity:1,duration:.3}),ct.from("#tablero > div",{scale:.5,opacity:0,duration:.35,stagger:{amount:.4,grid:"auto",from:"start"},ease:"back.out(2)",delay:.15})):ct.to(e,{opacity:0,duration:.25,onComplete:()=>e.classList.add("hidden")})}function hg(){if(Mn)return Mn.pedirReinicio();if(ut.salidas.size===0)return ur("La partida a\xFAn no ha empezado");ea(),jl(_t("modalReset"))}function fg(){let i=_t("sonidoBtn");i.setAttribute("aria-pressed",String(ut.sonido)),i.setAttribute("aria-label",ut.sonido?"Sonido y voz activados":"Sonido y voz desactivados"),_t("iconoSonidoOn").classList.toggle("hidden",!ut.sonido),_t("iconoSonidoOff").classList.toggle("hidden",ut.sonido)}function Yl(){let i=ut.intervalo/1e3;_t("velocidadBtn").textContent=`${i}s`,_t("velocidadBtn").setAttribute("aria-label",`Velocidad: una bola cada ${i} segundos`)}_t("playBtn").addEventListener("click",eg);_t("resetBtn").addEventListener("click",hg);_t("bingoBtn").addEventListener("click",ig);_t("verificarBtn").addEventListener("click",Xh);_t("codigoCarton").addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),Xh())});_t("verificarNumerosBtn").addEventListener("click",ug);_t("numerosCarton").addEventListener("keydown",i=>{i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),ug())});_t("patrones").addEventListener("click",i=>{let t=i.target.closest("[data-patron]");!t||t.dataset.patron===ut.patron||(ut.patron=t.dataset.patron,Jl("patron",ut.patron),ag(),ja&&_t("codigoCarton").value.trim()&&ja())});_t("seguirBtn").addEventListener("click",()=>{qr(),Mn||tg()});_t("nuevaPartidaBtn").addEventListener("click",()=>{qr(),Wh()});_t("confirmarResetBtn").addEventListener("click",()=>{qr(),Mn?Mn.nuevaPartida():Wh()});_t("pizarraBtn").addEventListener("click",()=>Ql());_t("cerrarPizarra").addEventListener("click",()=>Ql(!1));_t("pizarraFondo").addEventListener("click",()=>Ql(!1));_t("sonidoBtn").addEventListener("click",()=>{ut.sonido=!ut.sonido,ut.sonido||Ul(),Jl("sonido",ut.sonido),fg(),ur(ut.sonido?"Sonido y voz activados":"Sonido apagado")});_t("vozBtn").addEventListener("click",()=>{let i=Ks.findIndex(e=>e.id===Ya()),t=Ks[(i+1)%Ks.length];qm(t.id),ur(t.nombre),ut.sonido&&lr(Fh("B",15,t.id))});_t("vozBtn").title=`Voz del narrador: ${Hl(Ya()).nombre}`;_t("velocidadBtn").addEventListener("click",()=>{let i=Za.indexOf(ut.intervalo);if(ut.intervalo=Za[(i+1)%Za.length],Mn)return Yl(),Mn.velocidad(ut.intervalo);Jl("intervalo",ut.intervalo),Yl(),Pn&&Qm(),ur(`Una bola cada ${ut.intervalo/1e3} segundos`)});document.addEventListener("keydown",i=>{if(Di){i.key==="Escape"&&qr();return}if(i.key==="Escape"&&_t("pizarra").classList.contains("abierta"))return Ql(!1);i.target.closest("textarea, input")||i.ctrlKey||i.metaKey||i.altKey||(i.code==="Space"&&!i.target.closest("button")?(i.preventDefault(),ut.terminado||eg()):i.key.toLowerCase()==="b"?(i.preventDefault(),ig()):i.key.toLowerCase()==="r"&&hg())});async function Yb(){try{await Promise.race([document.fonts.load("48px Bungee"),new Promise(r=>setTimeout(r,2500))])}catch{}ut.restantes=kh(),Bb(),fg(),Yl(),ta();let i=!0;try{di=um(_t("escena"),{columnaDe:Rn,colores:Qs,reducirMovimiento:pi})}catch(r){console.warn("No se pudo iniciar la escena 3D:",r),di=Zb(),_t("escena").classList.add("hidden"),i=!1}let t=window.innerWidth>=1024,e=ct.timeline();Wl=e,e.to(".telon-izq",{xPercent:-102,duration:1.3,ease:"power3.inOut"},.25).to(".telon-der",{xPercent:102,duration:1.3,ease:"power3.inOut"},.25).set("#telon",{display:"none"}).add(di.intro(),.2).fromTo(".logo-ficha",{y:-160,rotation:()=>ct.utils.random(-120,120),opacity:0},{y:0,rotation:(r,s)=>Number(s.dataset.rot),opacity:1,duration:1,ease:"bounce.out",stagger:.09},.9).from("#enVivo",{scale:0,rotation:-30,duration:.6,ease:"back.out(3)"},1.6).from("#lema",{x:-20,opacity:0,duration:.5},1.75).from("#stats > *",{y:-80,rotation:8,opacity:0,duration:.7,ease:"back.out(2)",stagger:.1,clearProps:"transform"},1.2).from("#actual > div",{x:-140,rotation:-8,opacity:0,duration:.8,ease:"back.out(1.6)"},1.5).from("#controles > *",{y:120,opacity:0,duration:.7,ease:"back.out(2)",stagger:.07,clearProps:"transform"},1.6),t&&e.from("#pizarra",{x:480,rotation:6,duration:1,ease:"power4.out",clearProps:"transform"},1.1).from("#tablero .casilla-giro",{rotationX:-100,opacity:0,duration:.5,ease:"back.out(2)",stagger:{amount:1,from:"start"}},1.5),i||e.call(()=>ur("Modo sin 3D: el sorteo funciona igual"),null,2.4);let n=Gm();n&&(Mn=Wm(n,{bola:Hb,fijarBolas:Gb,reiniciar:Wh,finalizar:Gh,correrReloj:Wb,fijarVelocidad:Xb,celebrarGanador:qb,avisar:ur,abrirModal:r=>jl(_t(r)),cerrarModal:qr,hayModal:()=>!!Di,cantadas:()=>ut.salidas.size,sonido:()=>ut.sonido,sacudir:()=>di.sacudir?.(),voz:Gl,columnaDe:Rn,colores:Qs,reducirMovimiento:pi}))}function Zb(){let i=()=>ct.timeline(),t=null;return{intro:i,celebrar(){return t?.progress(1),i()},reiniciar(){t?.progress(1)},terminar(){},sacudir(){},retirar(){},sortear(e,{onSalida:n,onRevelar:r,onImpacto:s}={}){return t?.progress(1),t=ct.timeline().call(()=>n?.(),null,0).call(()=>r?.(),null,.4).call(()=>s?.(),null,.6),t}}}Yb();})();
/*! Bundled license information:

gsap/gsap-core.js:
  (*!
   * GSAP 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.12.5
   * https://gsap.com
   *
   * Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
