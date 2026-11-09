(()=>{var Ug=Object.create;var ud=Object.defineProperty;var Ng=Object.getOwnPropertyDescriptor;var Og=Object.getOwnPropertyNames;var Fg=Object.getPrototypeOf,Bg=Object.prototype.hasOwnProperty;var zg=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports);var kg=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Og(t))!Bg.call(i,r)&&r!==e&&ud(i,r,{get:()=>t[r],enumerable:!(n=Ng(t,r))||n.enumerable});return i};var Vg=(i,t,e)=>(e=i!=null?Ug(Fg(i)):{},kg(t||!i||!i.__esModule?ud(e,"default",{value:i,enumerable:!0}):e,i));var Jm=zg((Ym,Zm)=>{var $m=function(){var i=function(y,v){var b=236,w=17,M=y,E=e[v],C=null,_=0,S=null,L=[],U={},q=function(O,H){_=M*4+17,C=function(z){for(var $=new Array(z),A=0;A<z;A+=1){$[A]=new Array(z);for(var N=0;N<z;N+=1)$[A][N]=null}return $}(_),D(0,0),D(_-7,0),D(0,_-7),K(),G(),et(O,H),M>=7&&tt(O),S==null&&(S=_t(M,E,L)),it(S,H)},D=function(O,H){for(var z=-1;z<=7;z+=1)if(!(O+z<=-1||_<=O+z))for(var $=-1;$<=7;$+=1)H+$<=-1||_<=H+$||(0<=z&&z<=6&&($==0||$==6)||0<=$&&$<=6&&(z==0||z==6)||2<=z&&z<=4&&2<=$&&$<=4?C[O+z][H+$]=!0:C[O+z][H+$]=!1)},B=function(){for(var O=0,H=0,z=0;z<8;z+=1){q(!0,z);var $=r.getLostPoint(U);(z==0||O>$)&&(O=$,H=z)}return H},G=function(){for(var O=8;O<_-8;O+=1)C[O][6]==null&&(C[O][6]=O%2==0);for(var H=8;H<_-8;H+=1)C[6][H]==null&&(C[6][H]=H%2==0)},K=function(){for(var O=r.getPatternPosition(M),H=0;H<O.length;H+=1)for(var z=0;z<O.length;z+=1){var $=O[H],A=O[z];if(C[$][A]==null)for(var N=-2;N<=2;N+=1)for(var X=-2;X<=2;X+=1)N==-2||N==2||X==-2||X==2||N==0&&X==0?C[$+N][A+X]=!0:C[$+N][A+X]=!1}},tt=function(O){for(var H=r.getBCHTypeNumber(M),z=0;z<18;z+=1){var $=!O&&(H>>z&1)==1;C[Math.floor(z/3)][z%3+_-8-3]=$}for(var z=0;z<18;z+=1){var $=!O&&(H>>z&1)==1;C[z%3+_-8-3][Math.floor(z/3)]=$}},et=function(O,H){for(var z=E<<3|H,$=r.getBCHTypeInfo(z),A=0;A<15;A+=1){var N=!O&&($>>A&1)==1;A<6?C[A][8]=N:A<8?C[A+1][8]=N:C[_-15+A][8]=N}for(var A=0;A<15;A+=1){var N=!O&&($>>A&1)==1;A<8?C[8][_-A-1]=N:A<9?C[8][15-A-1+1]=N:C[8][15-A-1]=N}C[_-8][8]=!O},it=function(O,H){for(var z=-1,$=_-1,A=7,N=0,X=r.getMaskFunction(H),I=_-1;I>0;I-=2)for(I==6&&(I-=1);;){for(var xt=0;xt<2;xt+=1)if(C[$][I-xt]==null){var dt=!1;N<O.length&&(dt=(O[N]>>>A&1)==1);var at=X($,I-xt);at&&(dt=!dt),C[$][I-xt]=dt,A-=1,A==-1&&(N+=1,A=7)}if($+=z,$<0||_<=$){$-=z,z=-z;break}}},st=function(O,H){for(var z=0,$=0,A=0,N=new Array(H.length),X=new Array(H.length),I=0;I<H.length;I+=1){var xt=H[I].dataCount,dt=H[I].totalCount-xt;$=Math.max($,xt),A=Math.max(A,dt),N[I]=new Array(xt);for(var at=0;at<N[I].length;at+=1)N[I][at]=255&O.getBuffer()[at+z];z+=xt;var ht=r.getErrorCorrectPolynomial(dt),Nt=a(N[I],ht.getLength()-1),wt=Nt.mod(ht);X[I]=new Array(ht.getLength()-1);for(var at=0;at<X[I].length;at+=1){var P=at+wt.getLength()-X[I].length;X[I][at]=P>=0?wt.getAt(P):0}}for(var T=0,at=0;at<H.length;at+=1)T+=H[at].totalCount;for(var Y=new Array(T),ct=0,at=0;at<$;at+=1)for(var I=0;I<H.length;I+=1)at<N[I].length&&(Y[ct]=N[I][at],ct+=1);for(var at=0;at<A;at+=1)for(var I=0;I<H.length;I+=1)at<X[I].length&&(Y[ct]=X[I][at],ct+=1);return Y},_t=function(O,H,z){for(var $=o.getRSBlocks(O,H),A=l(),N=0;N<z.length;N+=1){var X=z[N];A.put(X.getMode(),4),A.put(X.getLength(),r.getLengthInBits(X.getMode(),O)),X.write(A)}for(var I=0,N=0;N<$.length;N+=1)I+=$[N].dataCount;if(A.getLengthInBits()>I*8)throw"code length overflow. ("+A.getLengthInBits()+">"+I*8+")";for(A.getLengthInBits()+4<=I*8&&A.put(0,4);A.getLengthInBits()%8!=0;)A.putBit(!1);for(;!(A.getLengthInBits()>=I*8||(A.put(b,8),A.getLengthInBits()>=I*8));)A.put(w,8);return st(A,$)};U.addData=function(O,H){H=H||"Byte";var z=null;switch(H){case"Numeric":z=c(O);break;case"Alphanumeric":z=u(O);break;case"Byte":z=h(O);break;case"Kanji":z=d(O);break;default:throw"mode:"+H}L.push(z),S=null},U.isDark=function(O,H){if(O<0||_<=O||H<0||_<=H)throw O+","+H;return C[O][H]},U.getModuleCount=function(){return _},U.make=function(){if(M<1){for(var O=1;O<40;O++){for(var H=o.getRSBlocks(O,E),z=l(),$=0;$<L.length;$++){var A=L[$];z.put(A.getMode(),4),z.put(A.getLength(),r.getLengthInBits(A.getMode(),O)),A.write(z)}for(var N=0,$=0;$<H.length;$++)N+=H[$].dataCount;if(z.getLengthInBits()<=N*8)break}M=O}q(!1,B())},U.createTableTag=function(O,H){O=O||2,H=typeof H>"u"?O*4:H;var z="";z+='<table style="',z+=" border-width: 0px; border-style: none;",z+=" border-collapse: collapse;",z+=" padding: 0px; margin: "+H+"px;",z+='">',z+="<tbody>";for(var $=0;$<U.getModuleCount();$+=1){z+="<tr>";for(var A=0;A<U.getModuleCount();A+=1)z+='<td style="',z+=" border-width: 0px; border-style: none;",z+=" border-collapse: collapse;",z+=" padding: 0px; margin: 0px;",z+=" width: "+O+"px;",z+=" height: "+O+"px;",z+=" background-color: ",z+=U.isDark($,A)?"#000000":"#ffffff",z+=";",z+='"/>';z+="</tr>"}return z+="</tbody>",z+="</table>",z},U.createSvgTag=function(O,H,z,$){var A={};typeof arguments[0]=="object"&&(A=arguments[0],O=A.cellSize,H=A.margin,z=A.alt,$=A.title),O=O||2,H=typeof H>"u"?O*4:H,z=typeof z=="string"?{text:z}:z||{},z.text=z.text||null,z.id=z.text?z.id||"qrcode-description":null,$=typeof $=="string"?{text:$}:$||{},$.text=$.text||null,$.id=$.text?$.id||"qrcode-title":null;var N=U.getModuleCount()*O+H*2,X,I,xt,dt,at="",ht;for(ht="l"+O+",0 0,"+O+" -"+O+",0 0,-"+O+"z ",at+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',at+=A.scalable?"":' width="'+N+'px" height="'+N+'px"',at+=' viewBox="0 0 '+N+" "+N+'" ',at+=' preserveAspectRatio="xMinYMin meet"',at+=$.text||z.text?' role="img" aria-labelledby="'+j([$.id,z.id].join(" ").trim())+'"':"",at+=">",at+=$.text?'<title id="'+j($.id)+'">'+j($.text)+"</title>":"",at+=z.text?'<description id="'+j(z.id)+'">'+j(z.text)+"</description>":"",at+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',at+='<path d="',xt=0;xt<U.getModuleCount();xt+=1)for(dt=xt*O+H,X=0;X<U.getModuleCount();X+=1)U.isDark(xt,X)&&(I=X*O+H,at+="M"+I+","+dt+ht);return at+='" stroke="transparent" fill="black"/>',at+="</svg>",at},U.createDataURL=function(O,H){O=O||2,H=typeof H>"u"?O*4:H;var z=U.getModuleCount()*O+H*2,$=H,A=z-H;return p(z,z,function(N,X){if($<=N&&N<A&&$<=X&&X<A){var I=Math.floor((N-$)/O),xt=Math.floor((X-$)/O);return U.isDark(xt,I)?0:1}else return 1})},U.createImgTag=function(O,H,z){O=O||2,H=typeof H>"u"?O*4:H;var $=U.getModuleCount()*O+H*2,A="";return A+="<img",A+=' src="',A+=U.createDataURL(O,H),A+='"',A+=' width="',A+=$,A+='"',A+=' height="',A+=$,A+='"',z&&(A+=' alt="',A+=j(z),A+='"'),A+="/>",A};var j=function(O){for(var H="",z=0;z<O.length;z+=1){var $=O.charAt(z);switch($){case"<":H+="&lt;";break;case">":H+="&gt;";break;case"&":H+="&amp;";break;case'"':H+="&quot;";break;default:H+=$;break}}return H},rt=function(O){var H=1;O=typeof O>"u"?H*2:O;var z=U.getModuleCount()*H+O*2,$=O,A=z-O,N,X,I,xt,dt,at={"\u2588\u2588":"\u2588","\u2588 ":"\u2580"," \u2588":"\u2584","  ":" "},ht={"\u2588\u2588":"\u2580","\u2588 ":"\u2580"," \u2588":" ","  ":" "},Nt="";for(N=0;N<z;N+=2){for(I=Math.floor((N-$)/H),xt=Math.floor((N+1-$)/H),X=0;X<z;X+=1)dt="\u2588",$<=X&&X<A&&$<=N&&N<A&&U.isDark(I,Math.floor((X-$)/H))&&(dt=" "),$<=X&&X<A&&$<=N+1&&N+1<A&&U.isDark(xt,Math.floor((X-$)/H))?dt+=" ":dt+="\u2588",Nt+=O<1&&N+1>=A?ht[dt]:at[dt];Nt+=`
`}return z%2&&O>0?Nt.substring(0,Nt.length-z-1)+Array(z+1).join("\u2580"):Nt.substring(0,Nt.length-1)};return U.createASCII=function(O,H){if(O=O||1,O<2)return rt(H);O-=1,H=typeof H>"u"?O*2:H;var z=U.getModuleCount()*O+H*2,$=H,A=z-H,N,X,I,xt,dt=Array(O+1).join("\u2588\u2588"),at=Array(O+1).join("  "),ht="",Nt="";for(N=0;N<z;N+=1){for(I=Math.floor((N-$)/O),Nt="",X=0;X<z;X+=1)xt=1,$<=X&&X<A&&$<=N&&N<A&&U.isDark(I,Math.floor((X-$)/O))&&(xt=0),Nt+=xt?dt:at;for(I=0;I<O;I+=1)ht+=Nt+`
`}return ht.substring(0,ht.length-1)},U.renderTo2dContext=function(O,H){H=H||2;for(var z=U.getModuleCount(),$=0;$<z;$++)for(var A=0;A<z;A++)O.fillStyle=U.isDark($,A)?"black":"white",O.fillRect($*H,A*H,H,H)},U};i.stringToBytesFuncs={default:function(y){for(var v=[],b=0;b<y.length;b+=1){var w=y.charCodeAt(b);v.push(w&255)}return v}},i.stringToBytes=i.stringToBytesFuncs.default,i.createStringToBytes=function(y,v){var b=function(){for(var M=g(y),E=function(){var G=M.read();if(G==-1)throw"eof";return G},C=0,_={};;){var S=M.read();if(S==-1)break;var L=E(),U=E(),q=E(),D=String.fromCharCode(S<<8|L),B=U<<8|q;_[D]=B,C+=1}if(C!=v)throw C+" != "+v;return _}(),w=63;return function(M){for(var E=[],C=0;C<M.length;C+=1){var _=M.charCodeAt(C);if(_<128)E.push(_);else{var S=b[M.charAt(C)];typeof S=="number"?(S&255)==S?E.push(S):(E.push(S>>>8),E.push(S&255)):E.push(w)}}return E}};var t={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},e={L:1,M:0,Q:3,H:2},n={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},r=function(){var y=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],v=1335,b=7973,w=21522,M={},E=function(C){for(var _=0;C!=0;)_+=1,C>>>=1;return _};return M.getBCHTypeInfo=function(C){for(var _=C<<10;E(_)-E(v)>=0;)_^=v<<E(_)-E(v);return(C<<10|_)^w},M.getBCHTypeNumber=function(C){for(var _=C<<12;E(_)-E(b)>=0;)_^=b<<E(_)-E(b);return C<<12|_},M.getPatternPosition=function(C){return y[C-1]},M.getMaskFunction=function(C){switch(C){case n.PATTERN000:return function(_,S){return(_+S)%2==0};case n.PATTERN001:return function(_,S){return _%2==0};case n.PATTERN010:return function(_,S){return S%3==0};case n.PATTERN011:return function(_,S){return(_+S)%3==0};case n.PATTERN100:return function(_,S){return(Math.floor(_/2)+Math.floor(S/3))%2==0};case n.PATTERN101:return function(_,S){return _*S%2+_*S%3==0};case n.PATTERN110:return function(_,S){return(_*S%2+_*S%3)%2==0};case n.PATTERN111:return function(_,S){return(_*S%3+(_+S)%2)%2==0};default:throw"bad maskPattern:"+C}},M.getErrorCorrectPolynomial=function(C){for(var _=a([1],0),S=0;S<C;S+=1)_=_.multiply(a([1,s.gexp(S)],0));return _},M.getLengthInBits=function(C,_){if(1<=_&&_<10)switch(C){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw"mode:"+C}else if(_<27)switch(C){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw"mode:"+C}else if(_<41)switch(C){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw"mode:"+C}else throw"type:"+_},M.getLostPoint=function(C){for(var _=C.getModuleCount(),S=0,L=0;L<_;L+=1)for(var U=0;U<_;U+=1){for(var q=0,D=C.isDark(L,U),B=-1;B<=1;B+=1)if(!(L+B<0||_<=L+B))for(var G=-1;G<=1;G+=1)U+G<0||_<=U+G||B==0&&G==0||D==C.isDark(L+B,U+G)&&(q+=1);q>5&&(S+=3+q-5)}for(var L=0;L<_-1;L+=1)for(var U=0;U<_-1;U+=1){var K=0;C.isDark(L,U)&&(K+=1),C.isDark(L+1,U)&&(K+=1),C.isDark(L,U+1)&&(K+=1),C.isDark(L+1,U+1)&&(K+=1),(K==0||K==4)&&(S+=3)}for(var L=0;L<_;L+=1)for(var U=0;U<_-6;U+=1)C.isDark(L,U)&&!C.isDark(L,U+1)&&C.isDark(L,U+2)&&C.isDark(L,U+3)&&C.isDark(L,U+4)&&!C.isDark(L,U+5)&&C.isDark(L,U+6)&&(S+=40);for(var U=0;U<_;U+=1)for(var L=0;L<_-6;L+=1)C.isDark(L,U)&&!C.isDark(L+1,U)&&C.isDark(L+2,U)&&C.isDark(L+3,U)&&C.isDark(L+4,U)&&!C.isDark(L+5,U)&&C.isDark(L+6,U)&&(S+=40);for(var tt=0,U=0;U<_;U+=1)for(var L=0;L<_;L+=1)C.isDark(L,U)&&(tt+=1);var et=Math.abs(100*tt/_/_-50)/5;return S+=et*10,S},M}(),s=function(){for(var y=new Array(256),v=new Array(256),b=0;b<8;b+=1)y[b]=1<<b;for(var b=8;b<256;b+=1)y[b]=y[b-4]^y[b-5]^y[b-6]^y[b-8];for(var b=0;b<255;b+=1)v[y[b]]=b;var w={};return w.glog=function(M){if(M<1)throw"glog("+M+")";return v[M]},w.gexp=function(M){for(;M<0;)M+=255;for(;M>=256;)M-=255;return y[M]},w}();function a(y,v){if(typeof y.length>"u")throw y.length+"/"+v;var b=function(){for(var M=0;M<y.length&&y[M]==0;)M+=1;for(var E=new Array(y.length-M+v),C=0;C<y.length-M;C+=1)E[C]=y[C+M];return E}(),w={};return w.getAt=function(M){return b[M]},w.getLength=function(){return b.length},w.multiply=function(M){for(var E=new Array(w.getLength()+M.getLength()-1),C=0;C<w.getLength();C+=1)for(var _=0;_<M.getLength();_+=1)E[C+_]^=s.gexp(s.glog(w.getAt(C))+s.glog(M.getAt(_)));return a(E,0)},w.mod=function(M){if(w.getLength()-M.getLength()<0)return w;for(var E=s.glog(w.getAt(0))-s.glog(M.getAt(0)),C=new Array(w.getLength()),_=0;_<w.getLength();_+=1)C[_]=w.getAt(_);for(var _=0;_<M.getLength();_+=1)C[_]^=s.gexp(s.glog(M.getAt(_))+E);return a(C,0).mod(M)},w}var o=function(){var y=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],v=function(M,E){var C={};return C.totalCount=M,C.dataCount=E,C},b={},w=function(M,E){switch(E){case e.L:return y[(M-1)*4+0];case e.M:return y[(M-1)*4+1];case e.Q:return y[(M-1)*4+2];case e.H:return y[(M-1)*4+3];default:return}};return b.getRSBlocks=function(M,E){var C=w(M,E);if(typeof C>"u")throw"bad rs block @ typeNumber:"+M+"/errorCorrectionLevel:"+E;for(var _=C.length/3,S=[],L=0;L<_;L+=1)for(var U=C[L*3+0],q=C[L*3+1],D=C[L*3+2],B=0;B<U;B+=1)S.push(v(q,D));return S},b}(),l=function(){var y=[],v=0,b={};return b.getBuffer=function(){return y},b.getAt=function(w){var M=Math.floor(w/8);return(y[M]>>>7-w%8&1)==1},b.put=function(w,M){for(var E=0;E<M;E+=1)b.putBit((w>>>M-E-1&1)==1)},b.getLengthInBits=function(){return v},b.putBit=function(w){var M=Math.floor(v/8);y.length<=M&&y.push(0),w&&(y[M]|=128>>>v%8),v+=1},b},c=function(y){var v=t.MODE_NUMBER,b=y,w={};w.getMode=function(){return v},w.getLength=function(C){return b.length},w.write=function(C){for(var _=b,S=0;S+2<_.length;)C.put(M(_.substring(S,S+3)),10),S+=3;S<_.length&&(_.length-S==1?C.put(M(_.substring(S,S+1)),4):_.length-S==2&&C.put(M(_.substring(S,S+2)),7))};var M=function(C){for(var _=0,S=0;S<C.length;S+=1)_=_*10+E(C.charAt(S));return _},E=function(C){if("0"<=C&&C<="9")return C.charCodeAt(0)-48;throw"illegal char :"+C};return w},u=function(y){var v=t.MODE_ALPHA_NUM,b=y,w={};w.getMode=function(){return v},w.getLength=function(E){return b.length},w.write=function(E){for(var C=b,_=0;_+1<C.length;)E.put(M(C.charAt(_))*45+M(C.charAt(_+1)),11),_+=2;_<C.length&&E.put(M(C.charAt(_)),6)};var M=function(E){if("0"<=E&&E<="9")return E.charCodeAt(0)-48;if("A"<=E&&E<="Z")return E.charCodeAt(0)-65+10;switch(E){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+E}};return w},h=function(y){var v=t.MODE_8BIT_BYTE,b=y,w=i.stringToBytes(y),M={};return M.getMode=function(){return v},M.getLength=function(E){return w.length},M.write=function(E){for(var C=0;C<w.length;C+=1)E.put(w[C],8)},M},d=function(y){var v=t.MODE_KANJI,b=y,w=i.stringToBytesFuncs.SJIS;if(!w)throw"sjis not supported.";(function(C,_){var S=w(C);if(S.length!=2||(S[0]<<8|S[1])!=_)throw"sjis not supported."})("\u53CB",38726);var M=w(y),E={};return E.getMode=function(){return v},E.getLength=function(C){return~~(M.length/2)},E.write=function(C){for(var _=M,S=0;S+1<_.length;){var L=(255&_[S])<<8|255&_[S+1];if(33088<=L&&L<=40956)L-=33088;else if(57408<=L&&L<=60351)L-=49472;else throw"illegal char at "+(S+1)+"/"+L;L=(L>>>8&255)*192+(L&255),C.put(L,13),S+=2}if(S<_.length)throw"illegal char at "+(S+1)},E},f=function(){var y=[],v={};return v.writeByte=function(b){y.push(b&255)},v.writeShort=function(b){v.writeByte(b),v.writeByte(b>>>8)},v.writeBytes=function(b,w,M){w=w||0,M=M||b.length;for(var E=0;E<M;E+=1)v.writeByte(b[E+w])},v.writeString=function(b){for(var w=0;w<b.length;w+=1)v.writeByte(b.charCodeAt(w))},v.toByteArray=function(){return y},v.toString=function(){var b="";b+="[";for(var w=0;w<y.length;w+=1)w>0&&(b+=","),b+=y[w];return b+="]",b},v},x=function(){var y=0,v=0,b=0,w="",M={},E=function(_){w+=String.fromCharCode(C(_&63))},C=function(_){if(!(_<0)){if(_<26)return 65+_;if(_<52)return 97+(_-26);if(_<62)return 48+(_-52);if(_==62)return 43;if(_==63)return 47}throw"n:"+_};return M.writeByte=function(_){for(y=y<<8|_&255,v+=8,b+=1;v>=6;)E(y>>>v-6),v-=6},M.flush=function(){if(v>0&&(E(y<<6-v),y=0,v=0),b%3!=0)for(var _=3-b%3,S=0;S<_;S+=1)w+="="},M.toString=function(){return w},M},g=function(y){var v=y,b=0,w=0,M=0,E={};E.read=function(){for(;M<8;){if(b>=v.length){if(M==0)return-1;throw"unexpected end of file./"+M}var _=v.charAt(b);if(b+=1,_=="=")return M=0,-1;if(_.match(/^\s$/))continue;w=w<<6|C(_.charCodeAt(0)),M+=6}var S=w>>>M-8&255;return M-=8,S};var C=function(_){if(65<=_&&_<=90)return _-65;if(97<=_&&_<=122)return _-97+26;if(48<=_&&_<=57)return _-48+52;if(_==43)return 62;if(_==47)return 63;throw"c:"+_};return E},m=function(y,v){var b=y,w=v,M=new Array(y*v),E={};E.setPixel=function(L,U,q){M[U*b+L]=q},E.write=function(L){L.writeString("GIF87a"),L.writeShort(b),L.writeShort(w),L.writeByte(128),L.writeByte(0),L.writeByte(0),L.writeByte(0),L.writeByte(0),L.writeByte(0),L.writeByte(255),L.writeByte(255),L.writeByte(255),L.writeString(","),L.writeShort(0),L.writeShort(0),L.writeShort(b),L.writeShort(w),L.writeByte(0);var U=2,q=_(U);L.writeByte(U);for(var D=0;q.length-D>255;)L.writeByte(255),L.writeBytes(q,D,255),D+=255;L.writeByte(q.length-D),L.writeBytes(q,D,q.length-D),L.writeByte(0),L.writeString(";")};var C=function(L){var U=L,q=0,D=0,B={};return B.write=function(G,K){if(G>>>K)throw"length over";for(;q+K>=8;)U.writeByte(255&(G<<q|D)),K-=8-q,G>>>=8-q,D=0,q=0;D=G<<q|D,q=q+K},B.flush=function(){q>0&&U.writeByte(D)},B},_=function(L){for(var U=1<<L,q=(1<<L)+1,D=L+1,B=S(),G=0;G<U;G+=1)B.add(String.fromCharCode(G));B.add(String.fromCharCode(U)),B.add(String.fromCharCode(q));var K=f(),tt=C(K);tt.write(U,D);var et=0,it=String.fromCharCode(M[et]);for(et+=1;et<M.length;){var st=String.fromCharCode(M[et]);et+=1,B.contains(it+st)?it=it+st:(tt.write(B.indexOf(it),D),B.size()<4095&&(B.size()==1<<D&&(D+=1),B.add(it+st)),it=st)}return tt.write(B.indexOf(it),D),tt.write(q,D),tt.flush(),K.toByteArray()},S=function(){var L={},U=0,q={};return q.add=function(D){if(q.contains(D))throw"dup key:"+D;L[D]=U,U+=1},q.size=function(){return U},q.indexOf=function(D){return L[D]},q.contains=function(D){return typeof L[D]<"u"},q};return E},p=function(y,v,b){for(var w=m(y,v),M=0;M<v;M+=1)for(var E=0;E<y;E+=1)w.setPixel(E,M,b(E,M));var C=f();w.write(C);for(var _=x(),S=C.toByteArray(),L=0;L<S.length;L+=1)_.writeByte(S[L]);return _.flush(),"data:image/gif;base64,"+_};return i}();(function(){$m.stringToBytesFuncs["UTF-8"]=function(i){function t(e){for(var n=[],r=0;r<e.length;r++){var s=e.charCodeAt(r);s<128?n.push(s):s<2048?n.push(192|s>>6,128|s&63):s<55296||s>=57344?n.push(224|s>>12,128|s>>6&63,128|s&63):(r++,s=65536+((s&1023)<<10|e.charCodeAt(r)&1023),n.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63))}return n}return t(i)}})();(function(i){typeof define=="function"&&define.amd?define([],i):typeof Ym=="object"&&(Zm.exports=i())})(function(){return $m})});function Mi(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function xd(i,t){i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.__proto__=t}var Sn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},rs={duration:.5,overwrite:!1,delay:0},Lc,Qe,be,Bn=1e8,_e=1/Bn,yc=Math.PI*2,Hg=yc/4,Gg=0,vd=Math.sqrt,Wg=Math.cos,Xg=Math.sin,Be=function(t){return typeof t=="string"},Re=function(t){return typeof t=="function"},Si=function(t){return typeof t=="number"},bo=function(t){return typeof t>"u"},hi=function(t){return typeof t=="object"},bn=function(t){return t!==!1},Ic=function(){return typeof window<"u"},fo=function(t){return Re(t)||Be(t)},yd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},tn=Array.isArray,Mc=/(?:-?\.?\d|\.)+/gi,Dc=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Er=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,fc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Uc=/[+-]=-?[.\d]+/,Md=/[^,'"\[\]\s]+/gi,qg=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,we,ci,bc,Nc,Rn={},_o={},bd,Sd=function(t){return(_o=Sr(t,Rn))&&en},So=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Ta=function(t,e){return!e&&console.warn(t)},Ed=function(t,e){return t&&(Rn[t]=e)&&_o&&(_o[t]=e)||Rn},wa=function(){return 0},$g={suppressEvents:!0,isStart:!0,kill:!1},po={suppressEvents:!0,kill:!1},Yg={suppressEvents:!0},Oc={},Gi=[],Sc={},Td,yn={},pc={},hd=30,mo=[],Fc="",Bc=function(t){var e=t[0],n,r;if(hi(e)||Re(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(r=mo.length;r--&&!mo[r].targetTest(e););n=mo[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new Vc(t[r],n)))||t.splice(r,1);return t},Wi=function(t){return t._gsap||Bc(zn(t))[0]._gsap},zc=function(t,e,n){return(n=t[e])&&Re(n)?t[e]():bo(n)&&t.getAttribute&&t.getAttribute(e)||n},dn=function(t,e){return(t=t.split(",")).forEach(e)||t},Pe=function(t){return Math.round(t*1e5)/1e5||0},We=function(t){return Math.round(t*1e7)/1e7||0},Tr=function(t,e){var n=e.charAt(0),r=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+r:n==="-"?t-r:n==="*"?t*r:t/r},Zg=function(t,e){for(var n=e.length,r=0;t.indexOf(e[r])<0&&++r<n;);return r<n},xo=function(){var t=Gi.length,e=Gi.slice(0),n,r;for(Sc={},Gi.length=0,n=0;n<t;n++)r=e[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},wd=function(t,e,n,r){Gi.length&&!Qe&&xo(),t.render(e,n,r||Qe&&e<0&&(t._initted||t._startAt)),Gi.length&&!Qe&&xo()},Ad=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(Md).length<2?e:Be(t)?t.trim():t},Cd=function(t){return t},kn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Jg=function(t){return function(e,n){for(var r in n)r in e||r==="duration"&&t||r==="ease"||(e[r]=n[r])}},Sr=function(t,e){for(var n in e)t[n]=e[n];return t},dd=function i(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=hi(e[n])?i(t[n]||(t[n]={}),e[n]):e[n]);return t},vo=function(t,e){var n={},r;for(r in t)r in e||(n[r]=t[r]);return n},ba=function(t){var e=t.parent||we,n=t.keyframes?Jg(tn(t.keyframes)):kn;if(bn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},Kg=function(t,e){for(var n=t.length,r=n===e.length;r&&n--&&t[n]===e[n];);return n<0},Rd=function(t,e,n,r,s){n===void 0&&(n="_first"),r===void 0&&(r="_last");var a=t[r],o;if(s)for(o=e[s];a&&a[s]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[r]=e,e._prev=a,e.parent=e._dp=t,e},Eo=function(t,e,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=e._prev,a=e._next;s?s._next=a:t[n]===e&&(t[n]=a),a?a._prev=s:t[r]===e&&(t[r]=s),e._next=e._prev=e.parent=null},Xi=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},yr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},jg=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Ec=function(t,e,n,r){return t._startAt&&(Qe?t._startAt.revert(po):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,r))},Qg=function i(t){return!t||t._ts&&i(t.parent)},fd=function(t){return t._repeat?ss(t._tTime,t=t.duration()+t._rDelay)*t:0},ss=function(t,e){var n=Math.floor(t/=e);return t&&n===t?n-1:n},yo=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},To=function(t){return t._end=We(t._start+(t._tDur/Math.abs(t._ts||t._rts||_e)||0))},wo=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=We(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),To(t),n._dirty||yr(n,t)),t},Pd=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=yo(t.rawTime(),e),(!e._dur||Ra(0,e.totalDuration(),n)-e._tTime>_e)&&e.render(n,!0)),yr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-_e}},ui=function(t,e,n,r){return e.parent&&Xi(e),e._start=We((Si(n)?n:n||t!==we?Fn(t,n,e):t._time)+e._delay),e._end=We(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Rd(t,e,"_first","_last",t._sort?"_start":0),Tc(e)||(t._recent=e),r||Pd(t,e),t._ts<0&&wo(t,t._tTime),t},Ld=function(t,e){return(Rn.ScrollTrigger||So("scrollTrigger",e))&&Rn.ScrollTrigger.create(e,t)},Id=function(t,e,n,r,s){if(Wc(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!Qe&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Td!==Mn.frame)return Gi.push(t),t._lazy=[s,r],1},t0=function i(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||i(e))},Tc=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},e0=function(t,e,n,r){var s=t.ratio,a=e<0||!e&&(!t._start&&t0(t)&&!(!t._initted&&Tc(t))||(t._ts<0||t._dp._ts<0)&&!Tc(t))?0:1,o=t._rDelay,l=0,c,u,h;if(o&&t._repeat&&(l=Ra(0,t._tDur,e),u=ss(l,o),t._yoyo&&u&1&&(a=1-a),u!==ss(t._tTime,o)&&(s=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==s||Qe||r||t._zTime===_e||!e&&t._zTime){if(!t._initted&&Id(t,e,r,n,l))return;for(h=t._zTime,t._zTime=e||(n?_e:0),n||(n=e&&!h),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&Ec(t,e,n,!0),t._onUpdate&&!n&&Cn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&Cn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&Xi(t,1),!n&&!Qe&&(Cn(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},n0=function(t,e,n){var r;if(n>e)for(r=t._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>e)return r;r=r._next}else for(r=t._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<e)return r;r=r._prev}},as=function(t,e,n,r){var s=t._repeat,a=We(e)||0,o=t._tTime/t._tDur;return o&&!r&&(t._time*=a/t._dur),t._dur=a,t._tDur=s?s<0?1e10:We(a*(s+1)+t._rDelay*s):a,o>0&&!r&&wo(t,t._tTime=t._tDur*o),t.parent&&To(t),n||yr(t.parent,t),t},pd=function(t){return t instanceof Ze?yr(t):as(t,t._dur)},i0={_start:0,endTime:wa,totalDuration:wa},Fn=function i(t,e,n){var r=t.labels,s=t._recent||i0,a=t.duration()>=Bn?s.endTime(!1):t._dur,o,l,c;return Be(e)&&(isNaN(e)||e in r)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(e in r||(r[e]=a),r[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&n&&(l=l/100*(tn(n)?n[0]:n).totalDuration()),o>1?i(t,e.substr(0,o-1),n)+l:a+l)):e==null?a:+e},Sa=function(t,e,n){var r=Si(e[1]),s=(r?2:1)+(t<2?0:1),a=e[s],o,l;if(r&&(a.duration=e[1]),a.parent=n,t){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=bn(l.vars.inherit)&&l.parent;a.immediateRender=bn(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[s-1]}return new Ie(e[0],a,e[s+1])},qi=function(t,e){return t||t===0?e(t):e},Ra=function(t,e,n){return n<t?t:n>e?e:n},Je=function(t,e){return!Be(t)||!(e=qg.exec(t))?"":e[1]},r0=function(t,e,n){return qi(n,function(r){return Ra(t,e,r)})},wc=[].slice,Dd=function(t,e){return t&&hi(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&hi(t[0]))&&!t.nodeType&&t!==ci},s0=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(r){var s;return Be(r)&&!e||Dd(r,1)?(s=n).push.apply(s,zn(r)):n.push(r)})||n},zn=function(t,e,n){return be&&!e&&be.selector?be.selector(t):Be(t)&&!n&&(bc||!os())?wc.call((e||Nc).querySelectorAll(t),0):tn(t)?s0(t,n):Dd(t)?wc.call(t,0):t?[t]:[]},Ac=function(t){return t=zn(t)[0]||Ta("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return zn(e,n.querySelectorAll?n:n===t?Ta("Invalid scope")||Nc.createElement("div"):t)}},Ud=function(t){return t.sort(function(){return .5-Math.random()})},Nd=function(t){if(Re(t))return t;var e=hi(t)?t:{each:t},n=Mr(e.ease),r=e.from||0,s=parseFloat(e.base)||0,a={},o=r>0&&r<1,l=isNaN(r)||o,c=e.axis,u=r,h=r;return Be(r)?u=h={center:.5,edges:.5,end:1}[r]||0:!o&&l&&(u=r[0],h=r[1]),function(d,f,x){var g=(x||e).length,m=a[g],p,y,v,b,w,M,E,C,_;if(!m){if(_=e.grid==="auto"?0:(e.grid||[1,Bn])[1],!_){for(E=-Bn;E<(E=x[_++].getBoundingClientRect().left)&&_<g;);_<g&&_--}for(m=a[g]=[],p=l?Math.min(_,g)*u-.5:r%_,y=_===Bn?0:l?g*h/_-.5:r/_|0,E=0,C=Bn,M=0;M<g;M++)v=M%_-p,b=y-(M/_|0),m[M]=w=c?Math.abs(c==="y"?b:v):vd(v*v+b*b),w>E&&(E=w),w<C&&(C=w);r==="random"&&Ud(m),m.max=E-C,m.min=C,m.v=g=(parseFloat(e.amount)||parseFloat(e.each)*(_>g?g-1:c?c==="y"?g/_:_:Math.max(_,g/_))||0)*(r==="edges"?-1:1),m.b=g<0?s-g:s,m.u=Je(e.amount||e.each)||0,n=n&&g<0?Wd(n):n}return g=(m[d]-m.min)/m.max||0,We(m.b+(n?n(g):g)*m.v)+m.u}},Cc=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var r=We(Math.round(parseFloat(n)/t)*t*e);return(r-r%1)/e+(Si(n)?0:Je(n))}},Od=function(t,e){var n=tn(t),r,s;return!n&&hi(t)&&(r=n=t.radius||Bn,t.values?(t=zn(t.values),(s=!Si(t[0]))&&(r*=r)):t=Cc(t.increment)),qi(e,n?Re(t)?function(a){return s=t(a),Math.abs(s-a)<=r?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=Bn,u=0,h=t.length,d,f;h--;)s?(d=t[h].x-o,f=t[h].y-l,d=d*d+f*f):d=Math.abs(t[h]-o),d<c&&(c=d,u=h);return u=!r||c<=r?t[u]:a,s||u===a||Si(a)?u:u+Je(a)}:Cc(t))},Fd=function(t,e,n,r){return qi(tn(t)?!e:n===!0?!!(n=0):!r,function(){return tn(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*r)/r})},a0=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(r){return e.reduce(function(s,a){return a(s)},r)}},o0=function(t,e){return function(n){return t(parseFloat(n))+(e||Je(n))}},l0=function(t,e,n){return zd(t,e,0,1,n)},Bd=function(t,e,n){return qi(n,function(r){return t[~~e(r)]})},c0=function i(t,e,n){var r=e-t;return tn(t)?Bd(t,i(0,t.length),e):qi(n,function(s){return(r+(s-t)%r)%r+t})},u0=function i(t,e,n){var r=e-t,s=r*2;return tn(t)?Bd(t,i(0,t.length-1),e):qi(n,function(a){return a=(s+(a-t)%s)%s||0,t+(a>r?s-a:a)})},ls=function(t){for(var e=0,n="",r,s,a,o;~(r=t.indexOf("random(",e));)a=t.indexOf(")",r),o=t.charAt(r+7)==="[",s=t.substr(r+7,a-r-7).match(o?Md:Mc),n+=t.substr(e,r-e)+Fd(o?s:+s[0],o?0:+s[1],+s[2]||1e-5),e=a+1;return n+t.substr(e,t.length-e)},zd=function(t,e,n,r,s){var a=e-t,o=r-n;return qi(s,function(l){return n+((l-t)/a*o||0)})},h0=function i(t,e,n,r){var s=isNaN(t+e)?0:function(f){return(1-f)*t+f*e};if(!s){var a=Be(t),o={},l,c,u,h,d;if(n===!0&&(r=1)&&(n=null),a)t={p:t},e={p:e};else if(tn(t)&&!tn(e)){for(u=[],h=t.length,d=h-2,c=1;c<h;c++)u.push(i(t[c-1],t[c]));h--,s=function(x){x*=h;var g=Math.min(d,~~x);return u[g](x-g)},n=e}else r||(t=Sr(tn(t)?[]:{},t));if(!u){for(l in e)Hc.call(o,t,l,"get",e[l]);s=function(x){return $c(x,o)||(a?t.p:t)}}}return qi(n,s)},md=function(t,e,n){var r=t.labels,s=Bn,a,o,l;for(a in r)o=r[a]-e,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},Cn=function(t,e,n){var r=t.vars,s=r[e],a=be,o=t._ctx,l,c,u;if(s)return l=r[e+"Params"],c=r.callbackScope||t,n&&Gi.length&&xo(),o&&(be=o),u=l?s.apply(c,l):s.call(c),be=a,u},ya=function(t){return Xi(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Qe),t.progress()<1&&Cn(t,"onInterrupt"),t},is,kd=[],Vd=function(t){if(t)if(t=!t.name&&t.default||t,Ic()||t.headless){var e=t.name,n=Re(t),r=e&&!n&&t.init?function(){this._props=[]}:t,s={init:wa,render:$c,add:Hc,kill:A0,modifier:w0,rawVars:0},a={targetTest:0,get:0,getSetter:Ao,aliases:{},register:0};if(os(),t!==r){if(yn[e])return;kn(r,kn(vo(t,s),a)),Sr(r.prototype,Sr(s,vo(t,a))),yn[r.prop=e]=r,t.targetTest&&(mo.push(r),Oc[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Ed(e,r),t.register&&t.register(en,r,fn)}else kd.push(t)},pe=255,Ma={aqua:[0,pe,pe],lime:[0,pe,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,pe],navy:[0,0,128],white:[pe,pe,pe],olive:[128,128,0],yellow:[pe,pe,0],orange:[pe,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[pe,0,0],pink:[pe,192,203],cyan:[0,pe,pe],transparent:[pe,pe,pe,0]},mc=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*pe+.5|0},Hd=function(t,e,n){var r=t?Si(t)?[t>>16,t>>8&pe,t&pe]:0:Ma.black,s,a,o,l,c,u,h,d,f,x;if(!r){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Ma[t])r=Ma[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+s+s+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return r=parseInt(t.substr(1,6),16),[r>>16,r>>8&pe,r&pe,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),r=[t>>16,t>>8&pe,t&pe]}else if(t.substr(0,3)==="hsl"){if(r=x=t.match(Mc),!e)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,a=u<=.5?u*(c+1):u+c-u*c,s=u*2-a,r.length>3&&(r[3]*=1),r[0]=mc(l+1/3,s,a),r[1]=mc(l,s,a),r[2]=mc(l-1/3,s,a);else if(~t.indexOf("="))return r=t.match(Dc),n&&r.length<4&&(r[3]=1),r}else r=t.match(Mc)||Ma.transparent;r=r.map(Number)}return e&&!x&&(s=r[0]/pe,a=r[1]/pe,o=r[2]/pe,h=Math.max(s,a,o),d=Math.min(s,a,o),u=(h+d)/2,h===d?l=c=0:(f=h-d,c=u>.5?f/(2-h-d):f/(h+d),l=h===s?(a-o)/f+(a<o?6:0):h===a?(o-s)/f+2:(s-a)/f+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},Gd=function(t){var e=[],n=[],r=-1;return t.split(bi).forEach(function(s){var a=s.match(Er)||[];e.push.apply(e,a),n.push(r+=a.length+1)}),e.c=n,e},gd=function(t,e,n){var r="",s=(t+r).match(bi),a=e?"hsla(":"rgba(",o=0,l,c,u,h;if(!s)return t;if(s=s.map(function(d){return(d=Hd(d,e,1))&&a+(e?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(u=Gd(t),l=n.c,l.join(r)!==u.c.join(r)))for(c=t.replace(bi,"1").split(Er),h=c.length-1;o<h;o++)r+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=t.split(bi),h=c.length-1;o<h;o++)r+=c[o]+s[o];return r+c[h]},bi=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Ma)i+="|"+t+"\\b";return new RegExp(i+")","gi")}(),d0=/hsl[a]?\(/,kc=function(t){var e=t.join(" "),n;if(bi.lastIndex=0,bi.test(e))return n=d0.test(e),t[1]=gd(t[1],n),t[0]=gd(t[0],n,Gd(t[1])),!0},Aa,Mn=function(){var i=Date.now,t=500,e=33,n=i(),r=n,s=1e3/240,a=s,o=[],l,c,u,h,d,f,x=function g(m){var p=i()-r,y=m===!0,v,b,w,M;if((p>t||p<0)&&(n+=p-e),r+=p,w=r-n,v=w-a,(v>0||y)&&(M=++h.frame,d=w-h.time*1e3,h.time=w=w/1e3,a+=v+(v>=s?4:s-v),b=1),y||(l=c(g)),b)for(f=0;f<o.length;f++)o[f](w,d,M,m)};return h={time:0,frame:0,tick:function(){x(!0)},deltaRatio:function(m){return d/(1e3/(m||60))},wake:function(){bd&&(!bc&&Ic()&&(ci=bc=window,Nc=ci.document||{},Rn.gsap=en,(ci.gsapVersions||(ci.gsapVersions=[])).push(en.version),Sd(_o||ci.GreenSockGlobals||!ci.gsap&&ci||{}),kd.forEach(Vd)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(m){return setTimeout(m,a-h.time*1e3+1|0)},Aa=1,x(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Aa=0,c=wa},lagSmoothing:function(m,p){t=m||1/0,e=Math.min(p||33,t)},fps:function(m){s=1e3/(m||240),a=h.time*1e3+s},add:function(m,p,y){var v=p?function(b,w,M,E){m(b,w,M,E),h.remove(v)}:m;return h.remove(m),o[y?"unshift":"push"](v),os(),v},remove:function(m,p){~(p=o.indexOf(m))&&o.splice(p,1)&&f>=p&&f--},_listeners:o},h}(),os=function(){return!Aa&&Mn.wake()},re={},f0=/^[\d.\-M][\d.\-,\s]/,p0=/["']/g,m0=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),r=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[r]=isNaN(c)?c.replace(p0,"").trim():+c,r=l.substr(o+1).trim();return e},g0=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),r=t.indexOf("(",e);return t.substring(e,~r&&r<n?t.indexOf(")",n+1):n)},_0=function(t){var e=(t+"").split("("),n=re[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[m0(e[1])]:g0(t).split(",").map(Ad)):re._CE&&f0.test(t)?re._CE("",t):n},Wd=function(t){return function(e){return 1-t(1-e)}},Xd=function i(t,e){for(var n=t._first,r;n;)n instanceof Ze?i(n,e):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==e&&(n.timeline?i(n.timeline,e):(r=n._ease,n._ease=n._yEase,n._yEase=r,n._yoyo=e)),n=n._next},Mr=function(t,e){return t&&(Re(t)?t:re[t]||_0(t))||e},wr=function(t,e,n,r){n===void 0&&(n=function(l){return 1-e(1-l)}),r===void 0&&(r=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:r},a;return dn(t,function(o){re[o]=Rn[o]=s,re[a=o.toLowerCase()]=n;for(var l in s)re[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=re[o+"."+l]=s[l]}),s},qd=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},gc=function i(t,e,n){var r=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),a=s/yc*(Math.asin(1/r)||0),o=function(u){return u===1?1:r*Math.pow(2,-10*u)*Xg((u-a)*s)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:qd(o);return s=yc/s,l.config=function(c,u){return i(t,c,u)},l},_c=function i(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},r=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:qd(n);return r.config=function(s){return i(t,s)},r};dn("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,t){var e=t<5?t+1:t;wr(i+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});re.Linear.easeNone=re.none=re.Linear.easeIn;wr("Elastic",gc("in"),gc("out"),gc());(function(i,t){var e=1/t,n=2*e,r=2.5*e,s=function(o){return o<e?i*o*o:o<n?i*Math.pow(o-1.5/t,2)+.75:o<r?i*(o-=2.25/t)*o+.9375:i*Math.pow(o-2.625/t,2)+.984375};wr("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);wr("Expo",function(i){return i?Math.pow(2,10*(i-1)):0});wr("Circ",function(i){return-(vd(1-i*i)-1)});wr("Sine",function(i){return i===1?1:-Wg(i*Hg)+1});wr("Back",_c("in"),_c("out"),_c());re.SteppedEase=re.steps=Rn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,r=t+(e?0:1),s=e?1:0,a=1-_e;return function(o){return((r*Ra(0,a,o)|0)+s)*n}}};rs.ease=re["quad.out"];dn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return Fc+=i+","+i+"Params,"});var Vc=function(t,e){this.id=Gg++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:zc,this.set=e?e.getSetter:Ao},Ca=function(){function i(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,as(this,+e.duration,1,1),this.data=e.data,be&&(this._ctx=be,be.data.push(this)),Aa||Mn.wake()}var t=i.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,as(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,r){if(os(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(wo(this,n),!s._dp||s.parent||Pd(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&ui(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===_e||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),wd(this,n,r)),this},t.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+fd(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},t.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},t.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+fd(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?ss(this._tTime,s)+1:1},t.timeScale=function(n,r){if(!arguments.length)return this._rts===-_e?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?yo(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-_e?0:this._rts,this.totalTime(Ra(-Math.abs(this._delay),this._tDur,s),r!==!1),To(this),jg(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(os(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==_e&&(this._tTime-=_e)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&ui(r,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(bn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?yo(r.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=Yg);var r=Qe;return Qe=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Qe=r,this},t.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,pd(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,pd(this),r?this.time(r):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,r){return this.totalTime(Fn(this,n),bn(r))},t.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,bn(r))},t.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},t.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},t.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-_e:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-_e,this},t.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-_e)},t.eventCallback=function(n,r,s){var a=this.vars;return arguments.length>1?(r?(a[n]=r,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete a[n],this):a[n]},t.then=function(n){var r=this;return new Promise(function(s){var a=Re(n)?n:Cd,o=function(){var c=r.then;r.then=null,Re(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=c),s(a),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?o():r._prom=o})},t.kill=function(){ya(this)},i}();kn(Ca.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-_e,_prom:0,_ps:!1,_rts:1});var Ze=function(i){xd(t,i);function t(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=bn(n.sortChildren),we&&ui(n.parent||we,Mi(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Ld(Mi(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(r,s,a){return Sa(0,arguments,this),this},e.from=function(r,s,a){return Sa(1,arguments,this),this},e.fromTo=function(r,s,a,o){return Sa(2,arguments,this),this},e.set=function(r,s,a){return s.duration=0,s.parent=this,ba(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ie(r,s,Fn(this,a),1),this},e.call=function(r,s,a){return ui(this,Ie.delayedCall(0,r,s),a)},e.staggerTo=function(r,s,a,o,l,c,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new Ie(r,a,Fn(this,l)),this},e.staggerFrom=function(r,s,a,o,l,c,u){return a.runBackwards=1,ba(a).immediateRender=bn(a.immediateRender),this.staggerTo(r,s,a,o,l,c,u)},e.staggerFromTo=function(r,s,a,o,l,c,u,h){return o.startAt=a,ba(o).immediateRender=bn(o.immediateRender),this.staggerTo(r,s,o,l,c,u,h)},e.render=function(r,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:We(r),h=this._zTime<0!=r<0&&(this._initted||!c),d,f,x,g,m,p,y,v,b,w,M,E;if(this!==we&&u>l&&r>=0&&(u=l),u!==this._tTime||a||h){if(o!==this._time&&c&&(u+=this._time-o,r+=this._time-o),d=u,b=this._start,v=this._ts,p=!v,h&&(c||(o=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(M=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,a);if(d=We(u%m),u===l?(g=this._repeat,d=c):(g=~~(u/m),g&&g===u/m&&(d=c,g--),d>c&&(d=c)),w=ss(this._tTime,m),!o&&this._tTime&&w!==g&&this._tTime-w*m-this._dur<=0&&(w=g),M&&g&1&&(d=c-d,E=1),g!==w&&!this._lock){var C=M&&w&1,_=C===(M&&g&1);if(g<w&&(C=!C),o=C?0:u%c?c:u,this._lock=1,this.render(o||(E?0:We(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Cn(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1),o&&o!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,_&&(this._lock=2,o=C?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;Xd(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=n0(this,We(o),We(d)),y&&(u-=d-(d=y._start))),this._tTime=u,this._time=d,this._act=!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,o=0),!o&&d&&!s&&!g&&(Cn(this,"onStart"),this._tTime!==u))return this;if(d>=o&&r>=0)for(f=this._first;f;){if(x=f._next,(f._act||d>=f._start)&&f._ts&&y!==f){if(f.parent!==this)return this.render(r,s,a);if(f.render(f._ts>0?(d-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(d-f._start)*f._ts,s,a),d!==this._time||!this._ts&&!p){y=0,x&&(u+=this._zTime=-_e);break}}f=x}else{f=this._last;for(var S=r<0?r:d;f;){if(x=f._prev,(f._act||S<=f._end)&&f._ts&&y!==f){if(f.parent!==this)return this.render(r,s,a);if(f.render(f._ts>0?(S-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(S-f._start)*f._ts,s,a||Qe&&(f._initted||f._startAt)),d!==this._time||!this._ts&&!p){y=0,x&&(u+=this._zTime=S?-_e:_e);break}}f=x}}if(y&&!s&&(this.pause(),y.render(d>=o?0:-_e)._zTime=d>=o?1:-1,this._ts))return this._start=b,To(this),this.render(r,s,a);this._onUpdate&&!s&&Cn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(b===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Xi(this,1),!s&&!(r<0&&!o)&&(u||o||!l)&&(Cn(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(r,s){var a=this;if(Si(s)||(s=Fn(this,s,r)),!(r instanceof Ca)){if(tn(r))return r.forEach(function(o){return a.add(o,s)}),this;if(Be(r))return this.addLabel(r,s);if(Re(r))r=Ie.delayedCall(0,r);else return this}return this!==r?ui(this,r,s):this},e.getChildren=function(r,s,a,o){r===void 0&&(r=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Bn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Ie?s&&l.push(c):(a&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},e.getById=function(r){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===r)return s[a]},e.remove=function(r){return Be(r)?this.removeLabel(r):Re(r)?this.killTweensOf(r):(Eo(this,r),r===this._recent&&(this._recent=this._last),yr(this))},e.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=We(Mn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},e.addLabel=function(r,s){return this.labels[r]=Fn(this,s),this},e.removeLabel=function(r){return delete this.labels[r],this},e.addPause=function(r,s,a){var o=Ie.delayedCall(0,s||wa,a);return o.data="isPause",this._hasPause=1,ui(this,o,Fn(this,r))},e.removePause=function(r){var s=this._first;for(r=Fn(this,r);s;)s._start===r&&s.data==="isPause"&&Xi(s),s=s._next},e.killTweensOf=function(r,s,a){for(var o=this.getTweensOf(r,a),l=o.length;l--;)Hi!==o[l]&&o[l].kill(r,s);return this},e.getTweensOf=function(r,s){for(var a=[],o=zn(r),l=this._first,c=Si(s),u;l;)l instanceof Ie?Zg(l._targets,o)&&(c?(!Hi||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(u=l.getTweensOf(o,s)).length&&a.push.apply(a,u),l=l._next;return a},e.tweenTo=function(r,s){s=s||{};var a=this,o=Fn(a,r),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,d=l.immediateRender,f,x=Ie.to(a,kn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||_e,onStart:function(){if(a.pause(),!f){var m=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());x._dur!==m&&as(x,m,0,1).render(x._time,!0,!0),f=1}u&&u.apply(x,h||[])}},s));return d?x.render(0):x},e.tweenFromTo=function(r,s,a){return this.tweenTo(s,kn({startAt:{time:Fn(this,r)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(r){return r===void 0&&(r=this._time),md(this,Fn(this,r))},e.previousLabel=function(r){return r===void 0&&(r=this._time),md(this,Fn(this,r),1)},e.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+_e)},e.shiftChildren=function(r,s,a){a===void 0&&(a=0);for(var o=this._first,l=this.labels,c;o;)o._start>=a&&(o._start+=r,o._end+=r),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=r);return yr(this)},e.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},e.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),yr(this)},e.totalDuration=function(r){var s=0,a=this,o=a._last,l=Bn,c,u,h;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-r:r));if(a._dirty){for(h=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,ui(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(s-=u,(!h&&!a._dp||h&&h.smoothChildTiming)&&(a._start+=u/a._ts,a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;as(a,a===we&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(r){if(we._ts&&(wd(we,yo(r,we)),Td=Mn.frame),Mn.frame>=hd){hd+=Sn.autoSleep||120;var s=we._first;if((!s||!s._ts)&&Sn.autoSleep&&Mn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Mn.sleep()}}},t}(Ca);kn(Ze.prototype,{_lock:0,_hasPause:0,_forcing:0});var x0=function(t,e,n,r,s,a,o){var l=new fn(this._pt,t,e,0,1,qc,null,s),c=0,u=0,h,d,f,x,g,m,p,y;for(l.b=n,l.e=r,n+="",r+="",(p=~r.indexOf("random("))&&(r=ls(r)),a&&(y=[n,r],a(y,t,e),n=y[0],r=y[1]),d=n.match(fc)||[];h=fc.exec(r);)x=h[0],g=r.substring(c,h.index),f?f=(f+1)%5:g.substr(-5)==="rgba("&&(f=1),x!==d[u++]&&(m=parseFloat(d[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:x.charAt(1)==="="?Tr(m,x)-m:parseFloat(x)-m,m:f&&f<4?Math.round:0},c=fc.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=o,(Uc.test(r)||p)&&(l.e=0),this._pt=l,l},Hc=function(t,e,n,r,s,a,o,l,c,u){Re(r)&&(r=r(s||0,t,a));var h=t[e],d=n!=="get"?n:Re(h)?c?t[e.indexOf("set")||!Re(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():h,f=Re(h)?c?S0:Zd:Xc,x;if(Be(r)&&(~r.indexOf("random(")&&(r=ls(r)),r.charAt(1)==="="&&(x=Tr(d,r)+(Je(d)||0),(x||x===0)&&(r=x))),!u||d!==r||Rc)return!isNaN(d*r)&&r!==""?(x=new fn(this._pt,t,e,+d||0,r-(d||0),typeof h=="boolean"?T0:Jd,0,f),c&&(x.fp=c),o&&x.modifier(o,this,t),this._pt=x):(!h&&!(e in t)&&So(e,r),x0.call(this,t,e,d,r,f,l||Sn.stringFilter,c))},v0=function(t,e,n,r,s){if(Re(t)&&(t=Ea(t,s,e,n,r)),!hi(t)||t.style&&t.nodeType||tn(t)||yd(t))return Be(t)?Ea(t,s,e,n,r):t;var a={},o;for(o in t)a[o]=Ea(t[o],s,e,n,r);return a},Gc=function(t,e,n,r,s,a){var o,l,c,u;if(yn[t]&&(o=new yn[t]).init(s,o.rawVars?e[t]:v0(e[t],r,s,a,n),n,r,a)!==!1&&(n._pt=l=new fn(n._pt,s,t,0,1,o.render,o,0,o.priority),n!==is))for(c=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)c[o._props[u]]=l;return o},Hi,Rc,Wc=function i(t,e,n){var r=t.vars,s=r.ease,a=r.startAt,o=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,h=r.yoyoEase,d=r.keyframes,f=r.autoRevert,x=t._dur,g=t._startAt,m=t._targets,p=t.parent,y=p&&p.data==="nested"?p.vars.targets:m,v=t._overwrite==="auto"&&!Lc,b=t.timeline,w,M,E,C,_,S,L,U,q,D,B,G,K;if(b&&(!d||!s)&&(s="none"),t._ease=Mr(s,rs.ease),t._yEase=h?Wd(Mr(h===!0?s:h,rs.ease)):0,h&&t._yoyo&&!t._repeat&&(h=t._yEase,t._yEase=t._ease,t._ease=h),t._from=!b&&!!r.runBackwards,!b||d&&!r.stagger){if(U=m[0]?Wi(m[0]).harness:0,G=U&&r[U.prop],w=vo(r,Oc),g&&(g._zTime<0&&g.progress(1),e<0&&u&&o&&!f?g.render(-1,!0):g.revert(u&&x?po:$g),g._lazy=0),a){if(Xi(t._startAt=Ie.set(m,kn({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&bn(l),startAt:null,delay:0,onUpdate:c&&function(){return Cn(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Qe||!o&&!f)&&t._startAt.revert(po),o&&x&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(u&&x&&!g){if(e&&(o=!1),E=kn({overwrite:!1,data:"isFromStart",lazy:o&&!g&&bn(l),immediateRender:o,stagger:0,parent:p},w),G&&(E[U.prop]=G),Xi(t._startAt=Ie.set(m,E)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Qe?t._startAt.revert(po):t._startAt.render(-1,!0)),t._zTime=e,!o)i(t._startAt,_e,_e);else if(!e)return}for(t._pt=t._ptCache=0,l=x&&bn(l)||l&&!x,M=0;M<m.length;M++){if(_=m[M],L=_._gsap||Bc(m)[M]._gsap,t._ptLookup[M]=D={},Sc[L.id]&&Gi.length&&xo(),B=y===m?M:y.indexOf(_),U&&(q=new U).init(_,G||w,t,B,y)!==!1&&(t._pt=C=new fn(t._pt,_,q.name,0,1,q.render,q,0,q.priority),q._props.forEach(function(tt){D[tt]=C}),q.priority&&(S=1)),!U||G)for(E in w)yn[E]&&(q=Gc(E,w,t,B,_,y))?q.priority&&(S=1):D[E]=C=Hc.call(t,_,E,"get",w[E],B,y,0,r.stringFilter);t._op&&t._op[M]&&t.kill(_,t._op[M]),v&&t._pt&&(Hi=t,we.killTweensOf(_,D,t.globalTime(e)),K=!t.parent,Hi=0),t._pt&&l&&(Sc[L.id]=1)}S&&Yc(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!K,d&&e<=0&&b.render(Bn,!0,!0)},y0=function(t,e,n,r,s,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,h,d,f;if(!c)for(c=t._ptCache[e]=[],d=t._ptLookup,f=t._targets.length;f--;){if(u=d[f][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return Rc=1,t.vars[e]="+=0",Wc(t,o),Rc=0,l?Ta(e+" not eligible for reset"):1;c.push(u)}for(f=c.length;f--;)h=c[f],u=h._pt||h,u.s=(r||r===0)&&!s?r:u.s+(r||0)+a*u.c,u.c=n-u.s,h.e&&(h.e=Pe(n)+Je(h.e)),h.b&&(h.b=u.s+Je(h.b))},M0=function(t,e){var n=t[0]?Wi(t[0]).harness:0,r=n&&n.aliases,s,a,o,l;if(!r)return e;s=Sr({},e);for(a in r)if(a in s)for(l=r[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},b0=function(t,e,n,r){var s=e.ease||r||"power1.inOut",a,o;if(tn(e))o=n[t]||(n[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:s})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:s})},Ea=function(t,e,n,r,s){return Re(t)?t.call(e,n,r,s):Be(t)&&~t.indexOf("random(")?ls(t):t},$d=Fc+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Yd={};dn($d+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return Yd[i]=1});var Ie=function(i){xd(t,i);function t(n,r,s,a){var o;typeof r=="number"&&(s.duration=r,r=s,s=null),o=i.call(this,a?r:ba(r))||this;var l=o.vars,c=l.duration,u=l.delay,h=l.immediateRender,d=l.stagger,f=l.overwrite,x=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,y=r.parent||we,v=(tn(n)||yd(n)?Si(n[0]):"length"in r)?[n]:zn(n),b,w,M,E,C,_,S,L;if(o._targets=v.length?Bc(v):Ta("GSAP target "+n+" not found. https://gsap.com",!Sn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,x||d||fo(c)||fo(u)){if(r=o.vars,b=o.timeline=new Ze({data:"nested",defaults:g||{},targets:y&&y.data==="nested"?y.vars.targets:v}),b.kill(),b.parent=b._dp=Mi(o),b._start=0,d||fo(c)||fo(u)){if(E=v.length,S=d&&Nd(d),hi(d))for(C in d)~$d.indexOf(C)&&(L||(L={}),L[C]=d[C]);for(w=0;w<E;w++)M=vo(r,Yd),M.stagger=0,p&&(M.yoyoEase=p),L&&Sr(M,L),_=v[w],M.duration=+Ea(c,Mi(o),w,_,v),M.delay=(+Ea(u,Mi(o),w,_,v)||0)-o._delay,!d&&E===1&&M.delay&&(o._delay=u=M.delay,o._start+=u,M.delay=0),b.to(_,M,S?S(w,_,v):0),b._ease=re.none;b.duration()?c=u=0:o.timeline=0}else if(x){ba(kn(b.vars.defaults,{ease:"none"})),b._ease=Mr(x.ease||r.ease||"none");var U=0,q,D,B;if(tn(x))x.forEach(function(G){return b.to(v,G,">")}),b.duration();else{M={};for(C in x)C==="ease"||C==="easeEach"||b0(C,x[C],M,x.easeEach);for(C in M)for(q=M[C].sort(function(G,K){return G.t-K.t}),U=0,w=0;w<q.length;w++)D=q[w],B={ease:D.e,duration:(D.t-(w?q[w-1].t:0))/100*c},B[C]=D.v,b.to(v,B,U),U+=B.duration;b.duration()<c&&b.to({},{duration:c-b.duration()})}}c||o.duration(c=b.duration())}else o.timeline=0;return f===!0&&!Lc&&(Hi=Mi(o),we.killTweensOf(v),Hi=0),ui(y,Mi(o),s),r.reversed&&o.reverse(),r.paused&&o.paused(!0),(h||!c&&!x&&o._start===We(y._time)&&bn(h)&&Qg(Mi(o))&&y.data!=="nested")&&(o._tTime=-_e,o.render(Math.max(0,-u)||0)),m&&Ld(Mi(o),m),o}var e=t.prototype;return e.render=function(r,s,a){var o=this._time,l=this._tDur,c=this._dur,u=r<0,h=r>l-_e&&!u?l:r<_e?0:r,d,f,x,g,m,p,y,v,b;if(!c)e0(this,r,s,a);else if(h!==this._tTime||!r||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u){if(d=h,v=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+r,s,a);if(d=We(h%g),h===l?(x=this._repeat,d=c):(x=~~(h/g),x&&x===We(h/g)&&(d=c,x--),d>c&&(d=c)),p=this._yoyo&&x&1,p&&(b=this._yEase,d=c-d),m=ss(this._tTime,g),d===o&&!a&&this._initted&&x===m)return this._tTime=h,this;x!==m&&(v&&this._yEase&&Xd(v,p),this.vars.repeatRefresh&&!p&&!this._lock&&this._time!==g&&this._initted&&(this._lock=a=1,this.render(We(g*x),!0).invalidate()._lock=0))}if(!this._initted){if(Id(this,u?r:d,a,s,h))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&x!==m))return this;if(c!==this._dur)return this.render(r,s,a)}if(this._tTime=h,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=y=(b||this._ease)(d/c),this._from&&(this.ratio=y=1-y),d&&!o&&!s&&!x&&(Cn(this,"onStart"),this._tTime!==h))return this;for(f=this._pt;f;)f.r(y,f.d),f=f._next;v&&v.render(r<0?r:v._dur*v._ease(d/this._dur),s,a)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&Ec(this,r,s,a),Cn(this,"onUpdate")),this._repeat&&x!==m&&this.vars.onRepeat&&!s&&this.parent&&Cn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&Ec(this,r,!0,!0),(r||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&Xi(this,1),!s&&!(u&&!o)&&(h||o||p)&&(Cn(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},e.resetTo=function(r,s,a,o,l){Aa||Mn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Wc(this,c),u=this._ease(c/this._dur),y0(this,r,s,a,o,u,c,l)?this.resetTo(r,s,a,o,1):(wo(this,0),this.parent||Rd(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?ya(this):this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,Hi&&Hi.vars.overwrite!==!0)._first||ya(this),this.parent&&a!==this.timeline.totalDuration()&&as(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=r?zn(r):o,c=this._ptLookup,u=this._pt,h,d,f,x,g,m,p;if((!s||s==="all")&&Kg(o,l))return s==="all"&&(this._pt=0),ya(this);for(h=this._op=this._op||[],s!=="all"&&(Be(s)&&(g={},dn(s,function(y){return g[y]=1}),s=g),s=M0(o,s)),p=o.length;p--;)if(~l.indexOf(o[p])){d=c[p],s==="all"?(h[p]=s,x=d,f={}):(f=h[p]=h[p]||{},x=s);for(g in x)m=d&&d[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&Eo(this,m,"_pt"),delete d[g]),f!=="all"&&(f[g]=1)}return this._initted&&!this._pt&&u&&ya(this),this},t.to=function(r,s){return new t(r,s,arguments[2])},t.from=function(r,s){return Sa(1,arguments)},t.delayedCall=function(r,s,a,o){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(r,s,a){return Sa(2,arguments)},t.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(r,s)},t.killTweensOf=function(r,s,a){return we.killTweensOf(r,s,a)},t}(Ca);kn(Ie.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});dn("staggerTo,staggerFrom,staggerFromTo",function(i){Ie[i]=function(){var t=new Ze,e=wc.call(arguments,0);return e.splice(i==="staggerFromTo"?5:4,0,0),t[i].apply(t,e)}});var Xc=function(t,e,n){return t[e]=n},Zd=function(t,e,n){return t[e](n)},S0=function(t,e,n,r){return t[e](r.fp,n)},E0=function(t,e,n){return t.setAttribute(e,n)},Ao=function(t,e){return Re(t[e])?Zd:bo(t[e])&&t.setAttribute?E0:Xc},Jd=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},T0=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},qc=function(t,e){var n=e._pt,r="";if(!t&&e.b)r=e.b;else if(t===1&&e.e)r=e.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+r,n=n._next;r+=e.c}e.set(e.t,e.p,r,e)},$c=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},w0=function(t,e,n,r){for(var s=this._pt,a;s;)a=s._next,s.p===r&&s.modifier(t,e,n),s=a},A0=function(t){for(var e=this._pt,n,r;e;)r=e._next,e.p===t&&!e.op||e.op===t?Eo(this,e,"_pt"):e.dep||(n=1),e=r;return!n},C0=function(t,e,n,r){r.mSet(t,e,r.m.call(r.tween,n,r.mt),r)},Yc=function(t){for(var e=t._pt,n,r,s,a;e;){for(n=e._next,r=s;r&&r.pr>e.pr;)r=r._next;(e._prev=r?r._prev:a)?e._prev._next=e:s=e,(e._next=r)?r._prev=e:a=e,e=n}t._pt=s},fn=function(){function i(e,n,r,s,a,o,l,c,u){this.t=n,this.s=s,this.c=a,this.p=r,this.r=o||Jd,this.d=l||this,this.set=c||Xc,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=i.prototype;return t.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=C0,this.m=n,this.mt=s,this.tween=r},i}();dn(Fc+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(i){return Oc[i]=1});Rn.TweenMax=Rn.TweenLite=Ie;Rn.TimelineLite=Rn.TimelineMax=Ze;we=new Ze({sortChildren:!1,defaults:rs,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Sn.stringFilter=kc;var br=[],go={},R0=[],_d=0,P0=0,xc=function(t){return(go[t]||R0).map(function(e){return e()})},Pc=function(){var t=Date.now(),e=[];t-_d>2&&(xc("matchMediaInit"),br.forEach(function(n){var r=n.queries,s=n.conditions,a,o,l,c;for(o in r)a=ci.matchMedia(r[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&e.push(n))}),xc("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),_d=t,xc("matchMedia"))},Kd=function(){function i(e,n){this.selector=n&&Ac(n),this.data=[],this._r=[],this.isReverted=!1,this.id=P0++,e&&this.add(e)}var t=i.prototype;return t.add=function(n,r,s){Re(n)&&(s=r,r=n,n=Re);var a=this,o=function(){var c=be,u=a.selector,h;return c&&c!==a&&c.data.push(a),s&&(a.selector=Ac(s)),be=a,h=r.apply(a,arguments),Re(h)&&a._r.push(h),be=c,a.selector=u,a.isReverted=!1,h};return a.last=o,n===Re?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},t.ignore=function(n){var r=be;be=null,n(this),be=r},t.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof Ie&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,r){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Ze?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ie)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),r)for(var a=br.length;a--;)br[a].id===this.id&&br.splice(a,1)},t.revert=function(n){this.kill(n||{})},i}(),L0=function(){function i(e){this.contexts=[],this.scope=e,be&&be.data.push(this)}var t=i.prototype;return t.add=function(n,r,s){hi(n)||(n={matches:n});var a=new Kd(0,s||this.scope),o=a.conditions={},l,c,u;be&&!a.selector&&(a.selector=be.selector),this.contexts.push(a),r=a.add("onMatch",r),a.queries=n;for(c in n)c==="all"?u=1:(l=ci.matchMedia(n[c]),l&&(br.indexOf(a)<0&&br.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(Pc):l.addEventListener("change",Pc)));return u&&r(a,function(h){return a.add(null,h)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i}(),Mo={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(r){return Vd(r)})},timeline:function(t){return new Ze(t)},getTweensOf:function(t,e){return we.getTweensOf(t,e)},getProperty:function(t,e,n,r){Be(t)&&(t=zn(t)[0]);var s=Wi(t||{}).get,a=n?Cd:Ad;return n==="native"&&(n=""),t&&(e?a((yn[e]&&yn[e].get||s)(t,e,n,r)):function(o,l,c){return a((yn[o]&&yn[o].get||s)(t,o,l,c))})},quickSetter:function(t,e,n){if(t=zn(t),t.length>1){var r=t.map(function(u){return en.quickSetter(u,e,n)}),s=r.length;return function(u){for(var h=s;h--;)r[h](u)}}t=t[0]||{};var a=yn[e],o=Wi(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(u){var h=new a;is._pt=0,h.init(t,n?u+n:u,is,0,[t]),h.render(1,h),is._pt&&$c(1,is)}:o.set(t,l);return a?c:function(u){return c(t,l,n?u+n:u,o,1)}},quickTo:function(t,e,n){var r,s=en.to(t,Sr((r={},r[e]="+=0.1",r.paused=!0,r),n||{})),a=function(l,c,u){return s.resetTo(e,l,c,u)};return a.tween=s,a},isTweening:function(t){return we.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Mr(t.ease,rs.ease)),dd(rs,t||{})},config:function(t){return dd(Sn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,r=t.plugins,s=t.defaults,a=t.extendTimeline;(r||"").split(",").forEach(function(o){return o&&!yn[o]&&!Rn[o]&&Ta(e+" effect requires "+o+" plugin.")}),pc[e]=function(o,l,c){return n(zn(o),kn(l||{},s),c)},a&&(Ze.prototype[e]=function(o,l,c){return this.add(pc[e](o,hi(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){re[t]=Mr(e)},parseEase:function(t,e){return arguments.length?Mr(t,e):re},getById:function(t){return we.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Ze(t),r,s;for(n.smoothChildTiming=bn(t.smoothChildTiming),we.remove(n),n._dp=0,n._time=n._tTime=we._time,r=we._first;r;)s=r._next,(e||!(!r._dur&&r instanceof Ie&&r.vars.onComplete===r._targets[0]))&&ui(n,r,r._start-r._delay),r=s;return ui(we,n,0),n},context:function(t,e){return t?new Kd(t,e):be},matchMedia:function(t){return new L0(t)},matchMediaRefresh:function(){return br.forEach(function(t){var e=t.conditions,n,r;for(r in e)e[r]&&(e[r]=!1,n=1);n&&t.revert()})||Pc()},addEventListener:function(t,e){var n=go[t]||(go[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=go[t],r=n&&n.indexOf(e);r>=0&&n.splice(r,1)},utils:{wrap:c0,wrapYoyo:u0,distribute:Nd,random:Fd,snap:Od,normalize:l0,getUnit:Je,clamp:r0,splitColor:Hd,toArray:zn,selector:Ac,mapRange:zd,pipe:a0,unitize:o0,interpolate:h0,shuffle:Ud},install:Sd,effects:pc,ticker:Mn,updateRoot:Ze.updateRoot,plugins:yn,globalTimeline:we,core:{PropTween:fn,globals:Ed,Tween:Ie,Timeline:Ze,Animation:Ca,getCache:Wi,_removeLinkedListItem:Eo,reverting:function(){return Qe},context:function(t){return t&&be&&(be.data.push(t),t._ctx=be),be},suppressOverwrites:function(t){return Lc=t}}};dn("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return Mo[i]=Ie[i]});Mn.add(Ze.updateRoot);is=Mo.to({},{duration:0});var I0=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},D0=function(t,e){var n=t._targets,r,s,a;for(r in e)for(s=n.length;s--;)a=t._ptLookup[s][r],a&&(a=a.d)&&(a._pt&&(a=I0(a,r)),a&&a.modifier&&a.modifier(e[r],t,n[s],r))},vc=function(t,e){return{name:t,rawVars:1,init:function(r,s,a){a._onInit=function(o){var l,c;if(Be(s)&&(l={},dn(s,function(u){return l[u]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}D0(o,s)}}}},en=Mo.registerPlugin({name:"attr",init:function(t,e,n,r,s){var a,o,l;this.tween=n;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],r,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)Qe?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},vc("roundProps",Cc),vc("modifiers"),vc("snap",Od))||Mo;Ie.version=Ze.version=en.version="3.12.5";bd=1;Ic()&&os();var U0=re.Power0,N0=re.Power1,O0=re.Power2,F0=re.Power3,B0=re.Power4,z0=re.Linear,k0=re.Quad,V0=re.Cubic,H0=re.Quart,G0=re.Quint,W0=re.Strong,X0=re.Elastic,q0=re.Back,$0=re.SteppedEase,Y0=re.Bounce,Z0=re.Sine,J0=re.Expo,K0=re.Circ;var jd,$i,us,eu,Pr,j0,Qd,nu,Q0=function(){return typeof window<"u"},Ti={},Rr=180/Math.PI,hs=Math.PI/180,cs=Math.atan2,tf=1e8,iu=/([A-Z])/g,t_=/(left|right|width|margin|padding|x)/i,e_=/[\s,\(]\S/,di={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Kc=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},n_=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},i_=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},r_=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},lf=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},cf=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},s_=function(t,e,n){return t.style[e]=n},a_=function(t,e,n){return t.style.setProperty(e,n)},o_=function(t,e,n){return t._gsap[e]=n},l_=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},c_=function(t,e,n,r,s){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},u_=function(t,e,n,r,s){var a=t._gsap;a[e]=n,a.renderTransform(s,a)},Ae="transform",En=Ae+"Origin",h_=function i(t,e){var n=this,r=this.target,s=r.style,a=r._gsap;if(t in Ti&&s){if(this.tfm=this.tfm||{},t!=="transform")t=di[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=Ei(r,o)}):this.tfm[t]=a.x?a[t]:Ei(r,t),t===En&&(this.tfm.zOrigin=a.zOrigin);else return di.transform.split(",").forEach(function(o){return i.call(n,o,e)});if(this.props.indexOf(Ae)>=0)return;a.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(En,e,"")),t=Ae}(s||e)&&this.props.push(t,e,s[t])},uf=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},d_=function(){var t=this.props,e=this.target,n=e.style,r=e._gsap,s,a;for(s=0;s<t.length;s+=3)t[s+1]?e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(iu,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=nu(),(!s||!s.isStart)&&!n[Ae]&&(uf(n),r.zOrigin&&n[En]&&(n[En]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},hf=function(t,e){var n={target:t,props:[],revert:d_,save:h_};return t._gsap||en.core.getCache(t),e&&e.split(",").forEach(function(r){return n.save(r)}),n},df,jc=function(t,e){var n=$i.createElementNS?$i.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):$i.createElement(t);return n&&n.style?n:$i.createElement(t)},fi=function i(t,e,n){var r=getComputedStyle(t);return r[e]||r.getPropertyValue(e.replace(iu,"-$1").toLowerCase())||r.getPropertyValue(e)||!n&&i(t,ds(e)||e,1)||""},ef="O,Moz,ms,Ms,Webkit".split(","),ds=function(t,e,n){var r=e||Pr,s=r.style,a=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(ef[a]+t in s););return a<0?null:(a===3?"ms":a>=0?ef[a]:"")+t},Qc=function(){Q0()&&window.document&&(jd=window,$i=jd.document,us=$i.documentElement,Pr=jc("div")||{style:{}},j0=jc("div"),Ae=ds(Ae),En=Ae+"Origin",Pr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",df=!!ds("perspective"),nu=en.core.reverting,eu=1)},Zc=function i(t){var e=jc("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,r=this.nextSibling,s=this.style.cssText,a;if(us.appendChild(e),e.appendChild(this),this.style.display="block",t)try{a=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=i}catch{}else this._gsapBBox&&(a=this._gsapBBox());return n&&(r?n.insertBefore(this,r):n.appendChild(this)),us.removeChild(e),this.style.cssText=s,a},nf=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},ff=function(t){var e;try{e=t.getBBox()}catch{e=Zc.call(t,!0)}return e&&(e.width||e.height)||t.getBBox===Zc||(e=Zc.call(t,!0)),e&&!e.width&&!e.x&&!e.y?{x:+nf(t,["x","cx","x1"])||0,y:+nf(t,["y","cy","y1"])||0,width:0,height:0}:e},pf=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&ff(t))},Lr=function(t,e){if(e){var n=t.style,r;e in Ti&&e!==En&&(e=Ae),n.removeProperty?(r=e.substr(0,2),(r==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(r==="--"?e:e.replace(iu,"-$1").toLowerCase())):n.removeAttribute(e)}},Yi=function(t,e,n,r,s,a){var o=new fn(t._pt,e,n,0,1,a?cf:lf);return t._pt=o,o.b=r,o.e=s,t._props.push(n),o},rf={deg:1,rad:1,turn:1},f_={grid:1,flex:1},Zi=function i(t,e,n,r){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Pr.style,l=t_.test(e),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,d=r==="px",f=r==="%",x,g,m,p;if(r===a||!s||rf[r]||rf[a])return s;if(a!=="px"&&!d&&(s=i(t,e,n,"px")),p=t.getCTM&&pf(t),(f||a==="%")&&(Ti[e]||~e.indexOf("adius")))return x=p?t.getBBox()[l?"width":"height"]:t[u],Pe(f?s/x*h:s/100*x);if(o[l?"width":"height"]=h+(d?a:r),g=~e.indexOf("adius")||r==="em"&&t.appendChild&&!c?t:t.parentNode,p&&(g=(t.ownerSVGElement||{}).parentNode),(!g||g===$i||!g.appendChild)&&(g=$i.body),m=g._gsap,m&&f&&m.width&&l&&m.time===Mn.time&&!m.uncache)return Pe(s/m.width*h);if(f&&(e==="height"||e==="width")){var y=t.style[e];t.style[e]=h+r,x=t[u],y?t.style[e]=y:Lr(t,e)}else(f||a==="%")&&!f_[fi(g,"display")]&&(o.position=fi(t,"position")),g===t&&(o.position="static"),g.appendChild(Pr),x=Pr[u],g.removeChild(Pr),o.position="absolute";return l&&f&&(m=Wi(g),m.time=Mn.time,m.width=g[u]),Pe(d?x*s/h:x&&s?h/x*s:0)},Ei=function(t,e,n,r){var s;return eu||Qc(),e in di&&e!=="transform"&&(e=di[e],~e.indexOf(",")&&(e=e.split(",")[0])),Ti[e]&&e!=="transform"?(s=Ia(t,r),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:Ro(fi(t,En))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Co[e]&&Co[e](t,e,n)||fi(t,e)||zc(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Zi(t,e,s,n)+n:s},p_=function(t,e,n,r){if(!n||n==="none"){var s=ds(e,t,1),a=s&&fi(t,s,1);a&&a!==n?(e=s,n=a):e==="borderColor"&&(n=fi(t,"borderTopColor"))}var o=new fn(this._pt,t.style,e,0,1,qc),l=0,c=0,u,h,d,f,x,g,m,p,y,v,b,w;if(o.b=n,o.e=r,n+="",r+="",r==="auto"&&(g=t.style[e],t.style[e]=r,r=fi(t,e)||r,g?t.style[e]=g:Lr(t,e)),u=[n,r],kc(u),n=u[0],r=u[1],d=n.match(Er)||[],w=r.match(Er)||[],w.length){for(;h=Er.exec(r);)m=h[0],y=r.substring(l,h.index),x?x=(x+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(x=1),m!==(g=d[c++]||"")&&(f=parseFloat(g)||0,b=g.substr((f+"").length),m.charAt(1)==="="&&(m=Tr(f,m)+b),p=parseFloat(m),v=m.substr((p+"").length),l=Er.lastIndex-v.length,v||(v=v||Sn.units[e]||b,l===r.length&&(r+=v,o.e+=v)),b!==v&&(f=Zi(t,e,g,v)||0),o._pt={_next:o._pt,p:y||c===1?y:",",s:f,c:p-f,m:x&&x<4||e==="zIndex"?Math.round:0});o.c=l<r.length?r.substring(l,r.length):""}else o.r=e==="display"&&r==="none"?cf:lf;return Uc.test(r)&&(o.e=0),this._pt=o,o},sf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},m_=function(t){var e=t.split(" "),n=e[0],r=e[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(t=n,n=r,r=t),e[0]=sf[n]||n,e[1]=sf[r]||r,e.join(" ")},g_=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,r=n.style,s=e.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Ti[o]&&(l=1,o=o==="transformOrigin"?En:Ae),Lr(n,o);l&&(Lr(n,Ae),a&&(a.svg&&n.removeAttribute("transform"),Ia(n,1),a.uncache=1,uf(r)))}},Co={clearProps:function(t,e,n,r,s){if(s.data!=="isFromStart"){var a=t._pt=new fn(t._pt,e,n,0,0,g_);return a.u=r,a.pr=-10,a.tween=s,t._props.push(n),1}}},La=[1,0,0,1,0,0],mf={},gf=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},af=function(t){var e=fi(t,Ae);return gf(e)?La:e.substr(7).match(Dc).map(Pe)},ru=function(t,e){var n=t._gsap||Wi(t),r=t.style,s=af(t),a,o,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?La:s):(s===La&&!t.offsetParent&&t!==us&&!n.svg&&(l=r.display,r.display="block",a=t.parentNode,(!a||!t.offsetParent)&&(c=1,o=t.nextElementSibling,us.appendChild(t)),s=af(t),l?r.display=l:Lr(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):us.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},tu=function(t,e,n,r,s,a){var o=t._gsap,l=s||ru(t,!0),c=o.xOrigin||0,u=o.yOrigin||0,h=o.xOffset||0,d=o.yOffset||0,f=l[0],x=l[1],g=l[2],m=l[3],p=l[4],y=l[5],v=e.split(" "),b=parseFloat(v[0])||0,w=parseFloat(v[1])||0,M,E,C,_;n?l!==La&&(E=f*m-x*g)&&(C=b*(m/E)+w*(-g/E)+(g*y-m*p)/E,_=b*(-x/E)+w*(f/E)-(f*y-x*p)/E,b=C,w=_):(M=ff(t),b=M.x+(~v[0].indexOf("%")?b/100*M.width:b),w=M.y+(~(v[1]||v[0]).indexOf("%")?w/100*M.height:w)),r||r!==!1&&o.smooth?(p=b-c,y=w-u,o.xOffset=h+(p*f+y*g)-p,o.yOffset=d+(p*x+y*m)-y):o.xOffset=o.yOffset=0,o.xOrigin=b,o.yOrigin=w,o.smooth=!!r,o.origin=e,o.originIsAbsolute=!!n,t.style[En]="0px 0px",a&&(Yi(a,o,"xOrigin",c,b),Yi(a,o,"yOrigin",u,w),Yi(a,o,"xOffset",h,o.xOffset),Yi(a,o,"yOffset",d,o.yOffset)),t.setAttribute("data-svg-origin",b+" "+w)},Ia=function(t,e){var n=t._gsap||new Vc(t);if("x"in n&&!e&&!n.uncache)return n;var r=t.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=fi(t,En)||"0",u,h,d,f,x,g,m,p,y,v,b,w,M,E,C,_,S,L,U,q,D,B,G,K,tt,et,it,st,_t,j,rt,O;return u=h=d=g=m=p=y=v=b=0,f=x=1,n.svg=!!(t.getCTM&&pf(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[Ae]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ae]!=="none"?l[Ae]:"")),r.scale=r.rotate=r.translate="none"),E=ru(t,n.svg),n.svg&&(n.uncache?(tt=t.getBBox(),c=n.xOrigin-tt.x+"px "+(n.yOrigin-tt.y)+"px",K=""):K=!e&&t.getAttribute("data-svg-origin"),tu(t,K||c,!!K||n.originIsAbsolute,n.smooth!==!1,E)),w=n.xOrigin||0,M=n.yOrigin||0,E!==La&&(L=E[0],U=E[1],q=E[2],D=E[3],u=B=E[4],h=G=E[5],E.length===6?(f=Math.sqrt(L*L+U*U),x=Math.sqrt(D*D+q*q),g=L||U?cs(U,L)*Rr:0,y=q||D?cs(q,D)*Rr+g:0,y&&(x*=Math.abs(Math.cos(y*hs))),n.svg&&(u-=w-(w*L+M*q),h-=M-(w*U+M*D))):(O=E[6],j=E[7],it=E[8],st=E[9],_t=E[10],rt=E[11],u=E[12],h=E[13],d=E[14],C=cs(O,_t),m=C*Rr,C&&(_=Math.cos(-C),S=Math.sin(-C),K=B*_+it*S,tt=G*_+st*S,et=O*_+_t*S,it=B*-S+it*_,st=G*-S+st*_,_t=O*-S+_t*_,rt=j*-S+rt*_,B=K,G=tt,O=et),C=cs(-q,_t),p=C*Rr,C&&(_=Math.cos(-C),S=Math.sin(-C),K=L*_-it*S,tt=U*_-st*S,et=q*_-_t*S,rt=D*S+rt*_,L=K,U=tt,q=et),C=cs(U,L),g=C*Rr,C&&(_=Math.cos(C),S=Math.sin(C),K=L*_+U*S,tt=B*_+G*S,U=U*_-L*S,G=G*_-B*S,L=K,B=tt),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),f=Pe(Math.sqrt(L*L+U*U+q*q)),x=Pe(Math.sqrt(G*G+O*O)),C=cs(B,G),y=Math.abs(C)>2e-4?C*Rr:0,b=rt?1/(rt<0?-rt:rt):0),n.svg&&(K=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!gf(fi(t,Ae)),K&&t.setAttribute("transform",K))),Math.abs(y)>90&&Math.abs(y)<270&&(s?(f*=-1,y+=g<=0?180:-180,g+=g<=0?180:-180):(x*=-1,y+=y<=0?180:-180)),e=e||n.uncache,n.x=u-((n.xPercent=u&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=h-((n.yPercent=h&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=Pe(f),n.scaleY=Pe(x),n.rotation=Pe(g)+o,n.rotationX=Pe(m)+o,n.rotationY=Pe(p)+o,n.skewX=y+o,n.skewY=v+o,n.transformPerspective=b+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(r[En]=Ro(c)),n.xOffset=n.yOffset=0,n.force3D=Sn.force3D,n.renderTransform=n.svg?x_:df?_f:__,n.uncache=0,n},Ro=function(t){return(t=t.split(" "))[0]+" "+t[1]},Jc=function(t,e,n){var r=Je(e);return Pe(parseFloat(e)+parseFloat(Zi(t,"x",n+"px",r)))+r},__=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,_f(t,e)},Ar="0deg",Pa="0px",Cr=") ",_f=function(t,e){var n=e||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,d=n.skewX,f=n.skewY,x=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,y=n.target,v=n.zOrigin,b="",w=p==="auto"&&t&&t!==1||p===!0;if(v&&(h!==Ar||u!==Ar)){var M=parseFloat(u)*hs,E=Math.sin(M),C=Math.cos(M),_;M=parseFloat(h)*hs,_=Math.cos(M),a=Jc(y,a,E*_*-v),o=Jc(y,o,-Math.sin(M)*-v),l=Jc(y,l,C*_*-v+v)}m!==Pa&&(b+="perspective("+m+Cr),(r||s)&&(b+="translate("+r+"%, "+s+"%) "),(w||a!==Pa||o!==Pa||l!==Pa)&&(b+=l!==Pa||w?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Cr),c!==Ar&&(b+="rotate("+c+Cr),u!==Ar&&(b+="rotateY("+u+Cr),h!==Ar&&(b+="rotateX("+h+Cr),(d!==Ar||f!==Ar)&&(b+="skew("+d+", "+f+Cr),(x!==1||g!==1)&&(b+="scale("+x+", "+g+Cr),y.style[Ae]=b||"translate(0, 0)"},x_=function(t,e){var n=e||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,d=n.scaleY,f=n.target,x=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,y=n.forceCSS,v=parseFloat(a),b=parseFloat(o),w,M,E,C,_;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=hs,c*=hs,w=Math.cos(l)*h,M=Math.sin(l)*h,E=Math.sin(l-c)*-d,C=Math.cos(l-c)*d,c&&(u*=hs,_=Math.tan(c-u),_=Math.sqrt(1+_*_),E*=_,C*=_,u&&(_=Math.tan(u),_=Math.sqrt(1+_*_),w*=_,M*=_)),w=Pe(w),M=Pe(M),E=Pe(E),C=Pe(C)):(w=h,C=d,M=E=0),(v&&!~(a+"").indexOf("px")||b&&!~(o+"").indexOf("px"))&&(v=Zi(f,"x",a,"px"),b=Zi(f,"y",o,"px")),(x||g||m||p)&&(v=Pe(v+x-(x*w+g*E)+m),b=Pe(b+g-(x*M+g*C)+p)),(r||s)&&(_=f.getBBox(),v=Pe(v+r/100*_.width),b=Pe(b+s/100*_.height)),_="matrix("+w+","+M+","+E+","+C+","+v+","+b+")",f.setAttribute("transform",_),y&&(f.style[Ae]=_)},v_=function(t,e,n,r,s){var a=360,o=Be(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?Rr:1),c=l-r,u=r+c+"deg",h,d;return o&&(h=s.split("_")[1],h==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),h==="cw"&&c<0?c=(c+a*tf)%a-~~(c/a)*a:h==="ccw"&&c>0&&(c=(c-a*tf)%a-~~(c/a)*a)),t._pt=d=new fn(t._pt,e,n,r,c,n_),d.e=u,d.u="deg",t._props.push(n),d},of=function(t,e){for(var n in e)t[n]=e[n];return t},y_=function(t,e,n){var r=of({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,h,d,f,x;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Ae]=e,o=Ia(n,1),Lr(n,Ae),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ae],a[Ae]=e,o=Ia(n,1),a[Ae]=c);for(l in Ti)c=r[l],u=o[l],c!==u&&s.indexOf(l)<0&&(f=Je(c),x=Je(u),h=f!==x?Zi(n,l,c,x):parseFloat(c),d=parseFloat(u),t._pt=new fn(t._pt,o,l,h,d-h,Kc),t._pt.u=x||0,t._props.push(l));of(o,r)};dn("padding,margin,Width,Radius",function(i,t){var e="Top",n="Right",r="Bottom",s="Left",a=(t<3?[e,n,r,s]:[e+s,e+n,r+n,r+s]).map(function(o){return t<2?i+o:"border"+o+i});Co[t>1?"border"+i:i]=function(o,l,c,u,h){var d,f;if(arguments.length<4)return d=a.map(function(x){return Ei(o,x,c)}),f=d.join(" "),f.split(d[0]).length===5?d[0]:f;d=(u+"").split(" "),f={},a.forEach(function(x,g){return f[x]=d[g]=d[g]||d[(g-1)/2|0]}),o.init(l,f,h)}});var su={name:"css",register:Qc,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,r,s){var a=this._props,o=t.style,l=n.vars.startAt,c,u,h,d,f,x,g,m,p,y,v,b,w,M,E,C;eu||Qc(),this.styles=this.styles||hf(t),C=this.styles.props,this.tween=n;for(g in e)if(g!=="autoRound"&&(u=e[g],!(yn[g]&&Gc(g,e,n,r,t,s)))){if(f=typeof u,x=Co[g],f==="function"&&(u=u.call(n,r,t,s),f=typeof u),f==="string"&&~u.indexOf("random(")&&(u=ls(u)),x)x(this,t,g,u,n)&&(E=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(g)+"").trim(),u+="",bi.lastIndex=0,bi.test(c)||(m=Je(c),p=Je(u)),p?m!==p&&(c=Zi(t,g,c,p)+p):m&&(u+=m),this.add(o,"setProperty",c,u,r,s,0,0,g),a.push(g),C.push(g,0,o[g]);else if(f!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,r,t,s):l[g],Be(c)&&~c.indexOf("random(")&&(c=ls(c)),Je(c+"")||c==="auto"||(c+=Sn.units[g]||Je(Ei(t,g))||""),(c+"").charAt(1)==="="&&(c=Ei(t,g))):c=Ei(t,g),d=parseFloat(c),y=f==="string"&&u.charAt(1)==="="&&u.substr(0,2),y&&(u=u.substr(2)),h=parseFloat(u),g in di&&(g==="autoAlpha"&&(d===1&&Ei(t,"visibility")==="hidden"&&h&&(d=0),C.push("visibility",0,o.visibility),Yi(this,o,"visibility",d?"inherit":"hidden",h?"inherit":"hidden",!h)),g!=="scale"&&g!=="transform"&&(g=di[g],~g.indexOf(",")&&(g=g.split(",")[0]))),v=g in Ti,v){if(this.styles.save(g),b||(w=t._gsap,w.renderTransform&&!e.parseTransform||Ia(t,e.parseTransform),M=e.smoothOrigin!==!1&&w.smooth,b=this._pt=new fn(this._pt,o,Ae,0,1,w.renderTransform,w,0,-1),b.dep=1),g==="scale")this._pt=new fn(this._pt,w,"scaleY",w.scaleY,(y?Tr(w.scaleY,y+h):h)-w.scaleY||0,Kc),this._pt.u=0,a.push("scaleY",g),g+="X";else if(g==="transformOrigin"){C.push(En,0,o[En]),u=m_(u),w.svg?tu(t,u,0,M,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==w.zOrigin&&Yi(this,w,"zOrigin",w.zOrigin,p),Yi(this,o,g,Ro(c),Ro(u)));continue}else if(g==="svgOrigin"){tu(t,u,1,M,0,this);continue}else if(g in mf){v_(this,w,g,d,y?Tr(d,y+u):u);continue}else if(g==="smoothOrigin"){Yi(this,w,"smooth",w.smooth,u);continue}else if(g==="force3D"){w[g]=u;continue}else if(g==="transform"){y_(this,u,t);continue}}else g in o||(g=ds(g)||g);if(v||(h||h===0)&&(d||d===0)&&!e_.test(u)&&g in o)m=(c+"").substr((d+"").length),h||(h=0),p=Je(u)||(g in Sn.units?Sn.units[g]:m),m!==p&&(d=Zi(t,g,c,p)),this._pt=new fn(this._pt,v?w:o,g,d,(y?Tr(d,y+h):h)-d,!v&&(p==="px"||g==="zIndex")&&e.autoRound!==!1?r_:Kc),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=i_);else if(g in o)p_.call(this,t,g,c,y?y+u:u);else if(g in t)this.add(t,g,c||t[g],y?y+u:u,r,s);else if(g!=="parseTransform"){So(g,u);continue}v||(g in o?C.push(g,0,o[g]):C.push(g,1,c||t[g])),a.push(g)}}E&&Yc(this)},render:function(t,e){if(e.tween._time||!nu())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Ei,aliases:di,getSetter:function(t,e,n){var r=di[e];return r&&r.indexOf(",")<0&&(e=r),e in Ti&&e!==En&&(t._gsap.x||Ei(t,"x"))?n&&Qd===n?e==="scale"?l_:o_:(Qd=n||{})&&(e==="scale"?c_:u_):t.style&&!bo(t.style[e])?s_:~e.indexOf("-")?a_:Ao(t,e)},core:{_removeProperty:Lr,_getMatrix:ru}};en.utils.checkPrefix=ds;en.core.getStyleSaver=hf;(function(i,t,e,n){var r=dn(i+","+t+","+e,function(s){Ti[s]=1});dn(t,function(s){Sn.units[s]="deg",mf[s]=1}),di[r[13]]=i+","+t,dn(n,function(s){var a=s.split(":");di[a[1]]=r[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");dn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){Sn.units[i]="px"});en.registerPlugin(su);var lt=en.registerPlugin(su)||en,AS=lt.core.Tween;var yh="160";var M_=0,xf=1,b_=2;var $p=1,S_=2,Li=3,sr=0,on=1,Gn=2;var mi=0,Us=1,Hr=2,vf=3,yf=4,E_=5,Fr=100,T_=101,w_=102,Mf=103,bf=104,A_=200,C_=201,R_=202,P_=203,Fu=204,Bu=205,L_=206,I_=207,D_=208,U_=209,N_=210,O_=211,F_=212,B_=213,z_=214,k_=0,V_=1,H_=2,nl=3,G_=4,W_=5,X_=6,q_=7,Yp=0,$_=1,Y_=2,ir=0,Mh=1,bh=2,Sh=3,ja=4,Z_=5,Eh=6;var Zp=300,Fs=301,Bs=302,zu=303,ku=304,Il=306,Vu=1e3,ei=1001,Hu=1002,gn=1003,Sf=1004;var au=1005;var Hn=1006,J_=1007;var Wa=1008;var rr=1009,K_=1010,j_=1011,Th=1012,Jp=1013,er=1014,nr=1015,ii=1016,Kp=1017,jp=1018,zr=1020,Q_=1021,ni=1023,tx=1024,ex=1025,kr=1026,zs=1027,nx=1028,Qp=1029,ix=1030,tm=1031,em=1033,ou=33776,lu=33777,cu=33778,uu=33779,Ef=35840,Tf=35841,wf=35842,Af=35843,nm=36196,Cf=37492,Rf=37496,Pf=37808,Lf=37809,If=37810,Df=37811,Uf=37812,Nf=37813,Of=37814,Ff=37815,Bf=37816,zf=37817,kf=37818,Vf=37819,Hf=37820,Gf=37821,hu=36492,Wf=36494,Xf=36495,rx=36283,qf=36284,$f=36285,Yf=36286;var il=2300,rl=2301,du=2302,Zf=2400,Jf=2401,Kf=2402;var im=3e3,Vr=3001,sx=3200,ax=3201,rm=0,ox=1,Wn="",ze="srgb",Ni="srgb-linear",wh="display-p3",Dl="display-p3-linear",sl="linear",me="srgb",al="rec709",ol="p3";var fs=7680;var jf=519,lx=512,cx=513,ux=514,sm=515,hx=516,dx=517,fx=518,px=519,Qf=35044;var tp="300 es",Gu=1035,Di=2e3,ll=2001,ar=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let r=this._listeners[t];if(r!==void 0){let s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}},nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ep=1234567,ka=Math.PI/180,Xa=180/Math.PI;function $s(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]+"-"+nn[t&255]+nn[t>>8&255]+"-"+nn[t>>16&15|64]+nn[t>>24&255]+"-"+nn[e&63|128]+nn[e>>8&255]+"-"+nn[e>>16&255]+nn[e>>24&255]+nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]).toLowerCase()}function sn(i,t,e){return Math.max(t,Math.min(e,i))}function Ah(i,t){return(i%t+t)%t}function mx(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function gx(i,t,e){return i!==t?(e-i)/(t-i):0}function Va(i,t,e){return(1-e)*i+e*t}function _x(i,t,e,n){return Va(i,t,1-Math.exp(-e*n))}function xx(i,t=1){return t-Math.abs(Ah(i,t*2)-t)}function vx(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function yx(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Mx(i,t){return i+Math.floor(Math.random()*(t-i+1))}function bx(i,t){return i+Math.random()*(t-i)}function Sx(i){return i*(.5-Math.random())}function Ex(i){i!==void 0&&(ep=i);let t=ep+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Tx(i){return i*ka}function wx(i){return i*Xa}function Wu(i){return(i&i-1)===0&&i!==0}function Ax(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function cl(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Cx(i,t,e,n,r){let s=Math.cos,a=Math.sin,o=s(e/2),l=a(e/2),c=s((t+n)/2),u=a((t+n)/2),h=s((t-n)/2),d=a((t-n)/2),f=s((n-t)/2),x=a((n-t)/2);switch(r){case"XYX":i.set(o*u,l*h,l*d,o*c);break;case"YZY":i.set(l*d,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*d,o*u,o*c);break;case"XZX":i.set(o*u,l*x,l*f,o*c);break;case"YXY":i.set(l*f,o*u,l*x,o*c);break;case"ZYZ":i.set(l*x,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ps(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function pn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var am={DEG2RAD:ka,RAD2DEG:Xa,generateUUID:$s,clamp:sn,euclideanModulo:Ah,mapLinear:mx,inverseLerp:gx,lerp:Va,damp:_x,pingpong:xx,smoothstep:vx,smootherstep:yx,randInt:Mx,randFloat:bx,randFloatSpread:Sx,seededRandom:Ex,degToRad:Tx,radToDeg:wx,isPowerOfTwo:Wu,ceilPowerOfTwo:Ax,floorPowerOfTwo:cl,setQuaternionFromProperEuler:Cx,normalize:pn,denormalize:Ps},Vt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(sn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*r+t.x,this.y=s*r+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ie=class i{constructor(t,e,n,r,s,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c)}set(t,e,n,r,s,a,o,l,c){let u=this.elements;return u[0]=t,u[1]=r,u[2]=o,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],x=n[8],g=r[0],m=r[3],p=r[6],y=r[1],v=r[4],b=r[7],w=r[2],M=r[5],E=r[8];return s[0]=a*g+o*y+l*w,s[3]=a*m+o*v+l*M,s[6]=a*p+o*b+l*E,s[1]=c*g+u*y+h*w,s[4]=c*m+u*v+h*M,s[7]=c*p+u*b+h*E,s[2]=d*g+f*y+x*w,s[5]=d*m+f*v+x*M,s[8]=d*p+f*b+x*E,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){let t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=u*a-o*c,d=o*l-u*s,f=c*s-a*l,x=e*h+n*d+r*f;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/x;return t[0]=h*g,t[1]=(r*c-u*n)*g,t[2]=(o*n-r*a)*g,t[3]=d*g,t[4]=(u*e-r*l)*g,t[5]=(r*s-o*e)*g,t[6]=f*g,t[7]=(n*l-c*e)*g,t[8]=(a*e-n*s)*g,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-r*c,r*l,-r*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(fu.makeScale(t,e)),this}rotate(t){return this.premultiply(fu.makeRotation(-t)),this}translate(t,e){return this.premultiply(fu.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},fu=new ie;function om(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ul(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Rx(){let i=ul("canvas");return i.style.display="block",i}var np={};function Ha(i){i in np||(np[i]=!0,console.warn(i))}var ip=new ie().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),rp=new ie().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Po={[Ni]:{transfer:sl,primaries:al,toReference:i=>i,fromReference:i=>i},[ze]:{transfer:me,primaries:al,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Dl]:{transfer:sl,primaries:ol,toReference:i=>i.applyMatrix3(rp),fromReference:i=>i.applyMatrix3(ip)},[wh]:{transfer:me,primaries:ol,toReference:i=>i.convertSRGBToLinear().applyMatrix3(rp),fromReference:i=>i.applyMatrix3(ip).convertLinearToSRGB()}},Px=new Set([Ni,Dl]),le={enabled:!0,_workingColorSpace:Ni,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Px.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;let n=Po[t].toReference,r=Po[e].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Po[i].primaries},getTransfer:function(i){return i===Wn?sl:Po[i].transfer}};function Ns(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function pu(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ps,hl=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ps===void 0&&(ps=ul("canvas")),ps.width=t.width,ps.height=t.height;let n=ps.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ps}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ul("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Ns(s[a]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ns(e[n]/255)*255):e[n]=Ns(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Lx=0,dl=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Lx++}),this.uuid=$s(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(mu(r[a].image)):s.push(mu(r[a]))}else s=mu(r);n.url=s}return e||(t.images[this.uuid]=n),n}};function mu(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?hl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ix=0,Xn=class i extends ar{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=ei,r=ei,s=Hn,a=Wa,o=ni,l=rr,c=i.DEFAULT_ANISOTROPY,u=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ix++}),this.uuid=$s(),this.name="",this.source=new dl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Vt(0,0),this.repeat=new Vt(1,1),this.center=new Vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Ha("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Vr?ze:Wn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Zp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Vu:t.x=t.x-Math.floor(t.x);break;case ei:t.x=t.x<0?0:1;break;case Hu:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Vu:t.y=t.y-Math.floor(t.y);break;case ei:t.y=t.y<0?0:1;break;case Hu:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ha("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ze?Vr:im}set encoding(t){Ha("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Vr?ze:Wn}};Xn.DEFAULT_IMAGE=null;Xn.DEFAULT_MAPPING=Zp;Xn.DEFAULT_ANISOTROPY=1;var Ee=class i{constructor(t=0,e=0,n=0,r=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s,l=t.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],x=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-g)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+g)<.1&&Math.abs(x+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(c+1)/2,b=(f+1)/2,w=(p+1)/2,M=(u+d)/4,E=(h+g)/4,C=(x+m)/4;return v>b&&v>w?v<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(v),r=M/n,s=E/n):b>w?b<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),n=M/r,s=C/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=E/s,r=C/s),this.set(n,r,s,e),this}let y=Math.sqrt((m-x)*(m-x)+(h-g)*(h-g)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(m-x)/y,this.y=(h-g)/y,this.z=(d-u)/y,this.w=Math.acos((c+f+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Xu=class extends ar{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ee(0,0,t,e),this.scissorTest=!1,this.viewport=new Ee(0,0,t,e);let r={width:t,height:e,depth:1};n.encoding!==void 0&&(Ha("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Vr?ze:Wn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Xn(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new dl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},_n=class extends Xu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},fl=class extends Xn{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=gn,this.minFilter=gn,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var qu=class extends Xn{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=gn,this.minFilter=gn,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var gi=class{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3],d=s[a+0],f=s[a+1],x=s[a+2],g=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=x,t[e+3]=g;return}if(h!==g||l!==d||c!==f||u!==x){let m=1-o,p=l*d+c*f+u*x+h*g,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let w=Math.sqrt(v),M=Math.atan2(w,p*y);m=Math.sin(m*M)/w,o=Math.sin(o*M)/w}let b=o*y;if(l=l*m+d*b,c=c*m+f*b,u=u*m+x*b,h=h*m+g*b,m===1-o){let w=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=w,c*=w,u*=w,h*=w}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[a],d=s[a+1],f=s[a+2],x=s[a+3];return t[e]=o*x+u*h+l*f-c*d,t[e+1]=l*x+u*d+c*h-o*f,t[e+2]=c*x+u*f+o*d-l*h,t[e+3]=u*x-o*h-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),h=o(s/2),d=l(n/2),f=l(r/2),x=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*f*x,this._y=c*f*h-d*u*x,this._z=c*u*x+d*f*h,this._w=c*u*h-d*f*x;break;case"YXZ":this._x=d*u*h+c*f*x,this._y=c*f*h-d*u*x,this._z=c*u*x-d*f*h,this._w=c*u*h+d*f*x;break;case"ZXY":this._x=d*u*h-c*f*x,this._y=c*f*h+d*u*x,this._z=c*u*x+d*f*h,this._w=c*u*h-d*f*x;break;case"ZYX":this._x=d*u*h-c*f*x,this._y=c*f*h+d*u*x,this._z=c*u*x-d*f*h,this._w=c*u*h+d*f*x;break;case"YZX":this._x=d*u*h+c*f*x,this._y=c*f*h+d*u*x,this._z=c*u*x-d*f*h,this._w=c*u*h-d*f*x;break;case"XZY":this._x=d*u*h-c*f*x,this._y=c*f*h-d*u*x,this._z=c*u*x+d*f*h,this._w=c*u*h+d*f*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],r=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],h=e[10],d=n+o+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(n>o&&n>h){let f=2*Math.sqrt(1+n-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>h){let f=2*Math.sqrt(1+o-n-h);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+h-n-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(sn(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,r=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,r=this._y,s=this._z,a=this._w,o=a*t._w+n*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*r+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-e)*u)/c,d=Math.sin(e*u)/c;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(r),n*Math.sin(s),n*Math.cos(s),e*Math.sin(r))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},k=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(sp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(sp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*r-o*n),u=2*(o*e-s*r),h=2*(s*n-a*e);return this.x=e+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,r=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return gu.copy(this).projectOnVector(t),this.sub(gu)}reflect(t){return this.sub(gu.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(sn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},gu=new k,sp=new gi,Oi=class{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(jn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(jn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=jn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,jn):jn.fromBufferAttribute(s,a),jn.applyMatrix4(t.matrixWorld),this.expandByPoint(jn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Lo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Lo.copy(n.boundingBox)),Lo.applyMatrix4(t.matrixWorld),this.union(Lo)}let r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,jn),jn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Da),Io.subVectors(this.max,Da),ms.subVectors(t.a,Da),gs.subVectors(t.b,Da),_s.subVectors(t.c,Da),Ji.subVectors(gs,ms),Ki.subVectors(_s,gs),Ir.subVectors(ms,_s);let e=[0,-Ji.z,Ji.y,0,-Ki.z,Ki.y,0,-Ir.z,Ir.y,Ji.z,0,-Ji.x,Ki.z,0,-Ki.x,Ir.z,0,-Ir.x,-Ji.y,Ji.x,0,-Ki.y,Ki.x,0,-Ir.y,Ir.x,0];return!_u(e,ms,gs,_s,Io)||(e=[1,0,0,0,1,0,0,0,1],!_u(e,ms,gs,_s,Io))?!1:(Do.crossVectors(Ji,Ki),e=[Do.x,Do.y,Do.z],_u(e,ms,gs,_s,Io))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,jn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(jn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},wi=[new k,new k,new k,new k,new k,new k,new k,new k],jn=new k,Lo=new Oi,ms=new k,gs=new k,_s=new k,Ji=new k,Ki=new k,Ir=new k,Da=new k,Io=new k,Do=new k,Dr=new k;function _u(i,t,e,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Dr.fromArray(i,s);let o=r.x*Math.abs(Dr.x)+r.y*Math.abs(Dr.y)+r.z*Math.abs(Dr.z),l=t.dot(Dr),c=e.dot(Dr),u=n.dot(Dr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Dx=new Oi,Ua=new k,xu=new k,or=class{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Dx.setFromPoints(t).getCenter(n);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ua.subVectors(t,this.center);let e=Ua.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Ua,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(xu.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ua.copy(t.center).add(xu)),this.expandByPoint(Ua.copy(t.center).sub(xu))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ai=new k,vu=new k,Uo=new k,ji=new k,yu=new k,No=new k,Mu=new k,pl=class{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ai)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Ai.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ai.copy(this.origin).addScaledVector(this.direction,e),Ai.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){vu.copy(t).add(e).multiplyScalar(.5),Uo.copy(e).sub(t).normalize(),ji.copy(this.origin).sub(vu);let s=t.distanceTo(e)*.5,a=-this.direction.dot(Uo),o=ji.dot(this.direction),l=-ji.dot(Uo),c=ji.lengthSq(),u=Math.abs(1-a*a),h,d,f,x;if(u>0)if(h=a*l-o,d=a*o-l,x=s*u,h>=0)if(d>=-x)if(d<=x){let g=1/u;h*=g,d*=g,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-x?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=x?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(vu).addScaledVector(Uo,d),f}intersectSphere(t,e){Ai.subVectors(t.center,this.origin);let n=Ai.dot(this.direction),r=Ai.dot(Ai)-n*n,s=t.radius*t.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,a,o,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,r=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,r=(t.min.x-d.x)*c),u>=0?(s=(t.min.y-d.y)*u,a=(t.max.y-d.y)*u):(s=(t.max.y-d.y)*u,a=(t.min.y-d.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(t.min.z-d.z)*h,l=(t.max.z-d.z)*h):(o=(t.max.z-d.z)*h,l=(t.min.z-d.z)*h),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Ai)!==null}intersectTriangle(t,e,n,r,s){yu.subVectors(e,t),No.subVectors(n,t),Mu.crossVectors(yu,No);let a=this.direction.dot(Mu),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ji.subVectors(this.origin,t);let l=o*this.direction.dot(No.crossVectors(ji,No));if(l<0)return null;let c=o*this.direction.dot(yu.cross(ji));if(c<0||l+c>a)return null;let u=-o*ji.dot(Mu);return u<0?null:this.at(u/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ce=class i{constructor(t,e,n,r,s,a,o,l,c,u,h,d,f,x,g,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c,u,h,d,f,x,g,m)}set(t,e,n,r,s,a,o,l,c,u,h,d,f,x,g,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=x,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,r=1/xs.setFromMatrixColumn(t,0).length(),s=1/xs.setFromMatrixColumn(t,1).length(),a=1/xs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){let d=a*u,f=a*h,x=o*u,g=o*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=f+x*c,e[5]=d-g*c,e[9]=-o*l,e[2]=g-d*c,e[6]=x+f*c,e[10]=a*l}else if(t.order==="YXZ"){let d=l*u,f=l*h,x=c*u,g=c*h;e[0]=d+g*o,e[4]=x*o-f,e[8]=a*c,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=f*o-x,e[6]=g+d*o,e[10]=a*l}else if(t.order==="ZXY"){let d=l*u,f=l*h,x=c*u,g=c*h;e[0]=d-g*o,e[4]=-a*h,e[8]=x+f*o,e[1]=f+x*o,e[5]=a*u,e[9]=g-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let d=a*u,f=a*h,x=o*u,g=o*h;e[0]=l*u,e[4]=x*c-f,e[8]=d*c+g,e[1]=l*h,e[5]=g*c+d,e[9]=f*c-x,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let d=a*l,f=a*c,x=o*l,g=o*c;e[0]=l*u,e[4]=g-d*h,e[8]=x*h+f,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=f*h+x,e[10]=d-g*h}else if(t.order==="XZY"){let d=a*l,f=a*c,x=o*l,g=o*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=d*h+g,e[5]=a*u,e[9]=f*h-x,e[2]=x*h-f,e[6]=o*u,e[10]=g*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ux,t,Nx)}lookAt(t,e,n){let r=this.elements;return Pn.subVectors(t,e),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),Qi.crossVectors(n,Pn),Qi.lengthSq()===0&&(Math.abs(n.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),Qi.crossVectors(n,Pn)),Qi.normalize(),Oo.crossVectors(Pn,Qi),r[0]=Qi.x,r[4]=Oo.x,r[8]=Pn.x,r[1]=Qi.y,r[5]=Oo.y,r[9]=Pn.y,r[2]=Qi.z,r[6]=Oo.z,r[10]=Pn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],x=n[2],g=n[6],m=n[10],p=n[14],y=n[3],v=n[7],b=n[11],w=n[15],M=r[0],E=r[4],C=r[8],_=r[12],S=r[1],L=r[5],U=r[9],q=r[13],D=r[2],B=r[6],G=r[10],K=r[14],tt=r[3],et=r[7],it=r[11],st=r[15];return s[0]=a*M+o*S+l*D+c*tt,s[4]=a*E+o*L+l*B+c*et,s[8]=a*C+o*U+l*G+c*it,s[12]=a*_+o*q+l*K+c*st,s[1]=u*M+h*S+d*D+f*tt,s[5]=u*E+h*L+d*B+f*et,s[9]=u*C+h*U+d*G+f*it,s[13]=u*_+h*q+d*K+f*st,s[2]=x*M+g*S+m*D+p*tt,s[6]=x*E+g*L+m*B+p*et,s[10]=x*C+g*U+m*G+p*it,s[14]=x*_+g*q+m*K+p*st,s[3]=y*M+v*S+b*D+w*tt,s[7]=y*E+v*L+b*B+w*et,s[11]=y*C+v*U+b*G+w*it,s[15]=y*_+v*q+b*K+w*st,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],h=t[6],d=t[10],f=t[14],x=t[3],g=t[7],m=t[11],p=t[15];return x*(+s*l*h-r*c*h-s*o*d+n*c*d+r*o*f-n*l*f)+g*(+e*l*f-e*c*d+s*a*d-r*a*f+r*c*u-s*l*u)+m*(+e*c*h-e*o*f-s*a*h+n*a*f+s*o*u-n*c*u)+p*(-r*o*u-e*l*h+e*o*d+r*a*h-n*a*d+n*l*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=t[9],d=t[10],f=t[11],x=t[12],g=t[13],m=t[14],p=t[15],y=h*m*c-g*d*c+g*l*f-o*m*f-h*l*p+o*d*p,v=x*d*c-u*m*c-x*l*f+a*m*f+u*l*p-a*d*p,b=u*g*c-x*h*c+x*o*f-a*g*f-u*o*p+a*h*p,w=x*h*l-u*g*l-x*o*d+a*g*d+u*o*m-a*h*m,M=e*y+n*v+r*b+s*w;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let E=1/M;return t[0]=y*E,t[1]=(g*d*s-h*m*s-g*r*f+n*m*f+h*r*p-n*d*p)*E,t[2]=(o*m*s-g*l*s+g*r*c-n*m*c-o*r*p+n*l*p)*E,t[3]=(h*l*s-o*d*s-h*r*c+n*d*c+o*r*f-n*l*f)*E,t[4]=v*E,t[5]=(u*m*s-x*d*s+x*r*f-e*m*f-u*r*p+e*d*p)*E,t[6]=(x*l*s-a*m*s-x*r*c+e*m*c+a*r*p-e*l*p)*E,t[7]=(a*d*s-u*l*s+u*r*c-e*d*c-a*r*f+e*l*f)*E,t[8]=b*E,t[9]=(x*h*s-u*g*s-x*n*f+e*g*f+u*n*p-e*h*p)*E,t[10]=(a*g*s-x*o*s+x*n*c-e*g*c-a*n*p+e*o*p)*E,t[11]=(u*o*s-a*h*s-u*n*c+e*h*c+a*n*f-e*o*f)*E,t[12]=w*E,t[13]=(u*g*r-x*h*r+x*n*d-e*g*d-u*n*m+e*h*m)*E,t[14]=(x*o*r-a*g*r-x*n*l+e*g*l+a*n*m-e*o*m)*E,t[15]=(a*h*r-u*o*r+u*n*l-e*h*l-a*n*d+e*o*d)*E,this}scale(t){let e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),r=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){let r=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,u=a+a,h=o+o,d=s*c,f=s*u,x=s*h,g=a*u,m=a*h,p=o*h,y=l*c,v=l*u,b=l*h,w=n.x,M=n.y,E=n.z;return r[0]=(1-(g+p))*w,r[1]=(f+b)*w,r[2]=(x-v)*w,r[3]=0,r[4]=(f-b)*M,r[5]=(1-(d+p))*M,r[6]=(m+y)*M,r[7]=0,r[8]=(x+v)*E,r[9]=(m-y)*E,r[10]=(1-(d+g))*E,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){let r=this.elements,s=xs.set(r[0],r[1],r[2]).length(),a=xs.set(r[4],r[5],r[6]).length(),o=xs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Qn.copy(this);let c=1/s,u=1/a,h=1/o;return Qn.elements[0]*=c,Qn.elements[1]*=c,Qn.elements[2]*=c,Qn.elements[4]*=u,Qn.elements[5]*=u,Qn.elements[6]*=u,Qn.elements[8]*=h,Qn.elements[9]*=h,Qn.elements[10]*=h,e.setFromRotationMatrix(Qn),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,r,s,a,o=Di){let l=this.elements,c=2*s/(e-t),u=2*s/(n-r),h=(e+t)/(e-t),d=(n+r)/(n-r),f,x;if(o===Di)f=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===ll)f=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,a,o=Di){let l=this.elements,c=1/(e-t),u=1/(n-r),h=1/(a-s),d=(e+t)*c,f=(n+r)*u,x,g;if(o===Di)x=(a+s)*h,g=-2*h;else if(o===ll)x=s*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},xs=new k,Qn=new Ce,Ux=new k(0,0,0),Nx=new k(1,1,1),Qi=new k,Oo=new k,Pn=new k,ap=new Ce,op=new gi,ks=class i{constructor(t=0,e=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],f=r[10];switch(e){case"XYZ":this._y=Math.asin(sn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-sn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(sn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-sn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(sn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-sn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ap.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ap,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return op.setFromEuler(this),this.setFromQuaternion(op,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ks.DEFAULT_ORDER="XYZ";var ml=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Ox=0,lp=new k,vs=new gi,Ci=new Ce,Fo=new k,Na=new k,Fx=new k,Bx=new gi,cp=new k(1,0,0),up=new k(0,1,0),hp=new k(0,0,1),zx={type:"added"},kx={type:"removed"},qe=class i extends ar{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ox++}),this.uuid=$s(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new k,e=new ks,n=new gi,r=new k(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ce},normalMatrix:{value:new ie}}),this.matrix=new Ce,this.matrixWorld=new Ce,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ml,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return vs.setFromAxisAngle(t,e),this.quaternion.multiply(vs),this}rotateOnWorldAxis(t,e){return vs.setFromAxisAngle(t,e),this.quaternion.premultiply(vs),this}rotateX(t){return this.rotateOnAxis(cp,t)}rotateY(t){return this.rotateOnAxis(up,t)}rotateZ(t){return this.rotateOnAxis(hp,t)}translateOnAxis(t,e){return lp.copy(t).applyQuaternion(this.quaternion),this.position.add(lp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(cp,t)}translateY(t){return this.translateOnAxis(up,t)}translateZ(t){return this.translateOnAxis(hp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ci.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Fo.copy(t):Fo.set(t,e,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Na.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ci.lookAt(Na,Fo,this.up):Ci.lookAt(Fo,Na,this.up),this.quaternion.setFromRotationMatrix(Ci),r&&(Ci.extractRotation(r.matrixWorld),vs.setFromRotationMatrix(Ci),this.quaternion.premultiply(vs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(zx)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(kx)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ci.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ci.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ci),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Na,t,Fx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Na,Bx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,r=e.length;n<r;n++){let s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++){let o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),h=a(t.shapes),d=a(t.skeletons),f=a(t.animations),x=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),x.length>0&&(n.nodes=x)}return n.object=r,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let r=t.children[n];this.add(r.clone())}return this}};qe.DEFAULT_UP=new k(0,1,0);qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ti=new k,Ri=new k,bu=new k,Pi=new k,ys=new k,Ms=new k,dp=new k,Su=new k,Eu=new k,Tu=new k,Bo=!1,Ls=class i{constructor(t=new k,e=new k,n=new k){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),ti.subVectors(t,e),r.cross(ti);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){ti.subVectors(r,e),Ri.subVectors(n,e),bu.subVectors(t,e);let a=ti.dot(ti),o=ti.dot(Ri),l=ti.dot(bu),c=Ri.dot(Ri),u=Ri.dot(bu),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;let d=1/h,f=(c*l-o*u)*d,x=(a*u-o*l)*d;return s.set(1-f-x,x,f)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,Pi)===null?!1:Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getUV(t,e,n,r,s,a,o,l){return Bo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Bo=!0),this.getInterpolation(t,e,n,r,s,a,o,l)}static getInterpolation(t,e,n,r,s,a,o,l){return this.getBarycoord(t,e,n,r,Pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Pi.x),l.addScaledVector(a,Pi.y),l.addScaledVector(o,Pi.z),l)}static isFrontFacing(t,e,n,r){return ti.subVectors(n,e),Ri.subVectors(t,e),ti.cross(Ri).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ti.subVectors(this.c,this.b),Ri.subVectors(this.a,this.b),ti.cross(Ri).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,r,s){return Bo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Bo=!0),i.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}getInterpolation(t,e,n,r,s){return i.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,r=this.b,s=this.c,a,o;ys.subVectors(r,n),Ms.subVectors(s,n),Su.subVectors(t,n);let l=ys.dot(Su),c=Ms.dot(Su);if(l<=0&&c<=0)return e.copy(n);Eu.subVectors(t,r);let u=ys.dot(Eu),h=Ms.dot(Eu);if(u>=0&&h<=u)return e.copy(r);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(ys,a);Tu.subVectors(t,s);let f=ys.dot(Tu),x=Ms.dot(Tu);if(x>=0&&f<=x)return e.copy(s);let g=f*c-l*x;if(g<=0&&c>=0&&x<=0)return o=c/(c-x),e.copy(n).addScaledVector(Ms,o);let m=u*x-f*h;if(m<=0&&h-u>=0&&f-x>=0)return dp.subVectors(s,r),o=(h-u)/(h-u+(f-x)),e.copy(r).addScaledVector(dp,o);let p=1/(m+g+d);return a=g*p,o=d*p,e.copy(n).addScaledVector(ys,a).addScaledVector(Ms,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},lm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},tr={h:0,s:0,l:0},zo={h:0,s:0,l:0};function wu(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Lt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=le.workingColorSpace){return this.r=t,this.g=e,this.b=n,le.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=le.workingColorSpace){if(t=Ah(t,1),e=sn(e,0,1),n=sn(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=wu(a,s,t+1/3),this.g=wu(a,s,t),this.b=wu(a,s,t-1/3)}return le.toWorkingColorSpace(this,r),this}setStyle(t,e=ze){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ze){let n=lm[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ns(t.r),this.g=Ns(t.g),this.b=Ns(t.b),this}copyLinearToSRGB(t){return this.r=pu(t.r),this.g=pu(t.g),this.b=pu(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ze){return le.fromWorkingColorSpace(rn.copy(this),t),Math.round(sn(rn.r*255,0,255))*65536+Math.round(sn(rn.g*255,0,255))*256+Math.round(sn(rn.b*255,0,255))}getHexString(t=ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.fromWorkingColorSpace(rn.copy(this),e);let n=rn.r,r=rn.g,s=rn.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=le.workingColorSpace){return le.fromWorkingColorSpace(rn.copy(this),e),t.r=rn.r,t.g=rn.g,t.b=rn.b,t}getStyle(t=ze){le.fromWorkingColorSpace(rn.copy(this),t);let e=rn.r,n=rn.g,r=rn.b;return t!==ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(tr),this.setHSL(tr.h+t,tr.s+e,tr.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(tr),t.getHSL(zo);let n=Va(tr.h,zo.h,e),r=Va(tr.s,zo.s,e),s=Va(tr.l,zo.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},rn=new Lt;Lt.NAMES=lm;var Vx=0,lr=class extends ar{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vx++}),this.uuid=$s(),this.name="",this.type="Material",this.blending=Us,this.side=sr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fu,this.blendDst=Bu,this.blendEquation=Fr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Lt(0,0,0),this.blendAlpha=0,this.depthFunc=nl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fs,this.stencilZFail=fs,this.stencilZPass=fs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Us&&(n.blending=this.blending),this.side!==sr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Fu&&(n.blendSrc=this.blendSrc),this.blendDst!==Bu&&(n.blendDst=this.blendDst),this.blendEquation!==Fr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==nl&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(e){let s=r(t.textures),a=r(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},ri=class extends lr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Yp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Oe=new k,ko=new Vt,ln=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Qf,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=nr,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ko.fromBufferAttribute(this,e),ko.applyMatrix3(t),this.setXY(e,ko.x,ko.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix3(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ps(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=pn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ps(e,this.array)),e}setX(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ps(e,this.array)),e}setY(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ps(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ps(e,this.array)),e}setW(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array),r=pn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array),r=pn(r,this.array),s=pn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Qf&&(t.usage=this.usage),t}};var gl=class extends ln{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var _l=class extends ln{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ge=class extends ln{constructor(t,e,n){super(new Float32Array(t),e,n)}};var Hx=0,Vn=new Ce,Au=new qe,bs=new k,Ln=new Oi,Oa=new Oi,Xe=new k,Ke=class i extends ar{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hx++}),this.uuid=$s(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(om(t)?_l:gl)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new ie().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Vn.makeRotationFromQuaternion(t),this.applyMatrix4(Vn),this}rotateX(t){return Vn.makeRotationX(t),this.applyMatrix4(Vn),this}rotateY(t){return Vn.makeRotationY(t),this.applyMatrix4(Vn),this}rotateZ(t){return Vn.makeRotationZ(t),this.applyMatrix4(Vn),this}translate(t,e,n){return Vn.makeTranslation(t,e,n),this.applyMatrix4(Vn),this}scale(t,e,n){return Vn.makeScale(t,e,n),this.applyMatrix4(Vn),this}lookAt(t){return Au.lookAt(t),Au.updateMatrix(),this.applyMatrix4(Au.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bs).negate(),this.translate(bs.x,bs.y,bs.z),this}setFromPoints(t){let e=[];for(let n=0,r=t.length;n<r;n++){let s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ge(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Oi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){let s=e[n];Ln.setFromBufferAttribute(s),this.morphTargetsRelative?(Xe.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint(Xe),Xe.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint(Xe)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new or);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new k,1/0);return}if(t){let n=this.boundingSphere.center;if(Ln.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){let o=e[s];Oa.setFromBufferAttribute(o),this.morphTargetsRelative?(Xe.addVectors(Ln.min,Oa.min),Ln.expandByPoint(Xe),Xe.addVectors(Ln.max,Oa.max),Ln.expandByPoint(Xe)):(Ln.expandByPoint(Oa.min),Ln.expandByPoint(Oa.max))}Ln.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)Xe.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(Xe));if(e)for(let s=0,a=e.length;s<a;s++){let o=e[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Xe.fromBufferAttribute(o,c),l&&(bs.fromBufferAttribute(t,c),Xe.add(bs)),r=Math.max(r,n.distanceToSquared(Xe))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,r=e.position.array,s=e.normal.array,a=e.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ln(new Float32Array(4*o),4));let l=this.getAttribute("tangent").array,c=[],u=[];for(let S=0;S<o;S++)c[S]=new k,u[S]=new k;let h=new k,d=new k,f=new k,x=new Vt,g=new Vt,m=new Vt,p=new k,y=new k;function v(S,L,U){h.fromArray(r,S*3),d.fromArray(r,L*3),f.fromArray(r,U*3),x.fromArray(a,S*2),g.fromArray(a,L*2),m.fromArray(a,U*2),d.sub(h),f.sub(h),g.sub(x),m.sub(x);let q=1/(g.x*m.y-m.x*g.y);isFinite(q)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-g.y).multiplyScalar(q),y.copy(f).multiplyScalar(g.x).addScaledVector(d,-m.x).multiplyScalar(q),c[S].add(p),c[L].add(p),c[U].add(p),u[S].add(y),u[L].add(y),u[U].add(y))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let S=0,L=b.length;S<L;++S){let U=b[S],q=U.start,D=U.count;for(let B=q,G=q+D;B<G;B+=3)v(n[B+0],n[B+1],n[B+2])}let w=new k,M=new k,E=new k,C=new k;function _(S){E.fromArray(s,S*3),C.copy(E);let L=c[S];w.copy(L),w.sub(E.multiplyScalar(E.dot(L))).normalize(),M.crossVectors(C,L);let q=M.dot(u[S])<0?-1:1;l[S*4]=w.x,l[S*4+1]=w.y,l[S*4+2]=w.z,l[S*4+3]=q}for(let S=0,L=b.length;S<L;++S){let U=b[S],q=U.start,D=U.count;for(let B=q,G=q+D;B<G;B+=3)_(n[B+0]),_(n[B+1]),_(n[B+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ln(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let r=new k,s=new k,a=new k,o=new k,l=new k,c=new k,u=new k,h=new k;if(t)for(let d=0,f=t.count;d<f;d+=3){let x=t.getX(d+0),g=t.getX(d+1),m=t.getX(d+2);r.fromBufferAttribute(e,x),s.fromBufferAttribute(e,g),a.fromBufferAttribute(e,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)r.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Xe.fromBufferAttribute(t,e),Xe.normalize(),t.setXYZ(e,Xe.x,Xe.y,Xe.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u),f=0,x=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?f=l[g]*o.data.stride+o.offset:f=l[g]*u;for(let p=0;p<u;p++)d[x++]=c[f++]}return new ln(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=t(l,n);e.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let r=t.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(e))}let s=t.morphAttributes;for(let c in s){let u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,u=a.length;c<u;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},fp=new Ce,Ur=new pl,Vo=new or,pp=new k,Ss=new k,Es=new k,Ts=new k,Cu=new k,Ho=new k,Go=new Vt,Wo=new Vt,Xo=new Vt,mp=new k,gp=new k,_p=new k,qo=new k,$o=new k,Bt=class extends qe{constructor(t=new Ke,e=new ri){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(r,t);let o=this.morphTargetInfluences;if(s&&o){Ho.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],h=s[l];u!==0&&(Cu.fromBufferAttribute(h,t),a?Ho.addScaledVector(Cu,u):Ho.addScaledVector(Cu.sub(e),u))}e.add(Ho)}return e}raycast(t,e){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vo.copy(n.boundingSphere),Vo.applyMatrix4(s),Ur.copy(t.ray).recast(t.near),!(Vo.containsPoint(Ur.origin)===!1&&(Ur.intersectSphere(Vo,pp)===null||Ur.origin.distanceToSquared(pp)>(t.far-t.near)**2))&&(fp.copy(s).invert(),Ur.copy(t.ray).applyMatrix4(fp),!(n.boundingBox!==null&&Ur.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ur)))}_computeIntersections(t,e,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,g=d.length;x<g;x++){let m=d[x],p=a[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let b=y,w=v;b<w;b+=3){let M=o.getX(b),E=o.getX(b+1),C=o.getX(b+2);r=Yo(this,p,t,n,c,u,h,M,E,C),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{let x=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let m=x,p=g;m<p;m+=3){let y=o.getX(m),v=o.getX(m+1),b=o.getX(m+2);r=Yo(this,a,t,n,c,u,h,y,v,b),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,g=d.length;x<g;x++){let m=d[x],p=a[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let b=y,w=v;b<w;b+=3){let M=b,E=b+1,C=b+2;r=Yo(this,p,t,n,c,u,h,M,E,C),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{let x=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let m=x,p=g;m<p;m+=3){let y=m,v=m+1,b=m+2;r=Yo(this,a,t,n,c,u,h,y,v,b),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}};function Gx(i,t,e,n,r,s,a,o){let l;if(t.side===on?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,t.side===sr,o),l===null)return null;$o.copy(o),$o.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo($o);return c<e.near||c>e.far?null:{distance:c,point:$o.clone(),object:i}}function Yo(i,t,e,n,r,s,a,o,l,c){i.getVertexPosition(o,Ss),i.getVertexPosition(l,Es),i.getVertexPosition(c,Ts);let u=Gx(i,t,e,n,Ss,Es,Ts,qo);if(u){r&&(Go.fromBufferAttribute(r,o),Wo.fromBufferAttribute(r,l),Xo.fromBufferAttribute(r,c),u.uv=Ls.getInterpolation(qo,Ss,Es,Ts,Go,Wo,Xo,new Vt)),s&&(Go.fromBufferAttribute(s,o),Wo.fromBufferAttribute(s,l),Xo.fromBufferAttribute(s,c),u.uv1=Ls.getInterpolation(qo,Ss,Es,Ts,Go,Wo,Xo,new Vt),u.uv2=u.uv1),a&&(mp.fromBufferAttribute(a,o),gp.fromBufferAttribute(a,l),_p.fromBufferAttribute(a,c),u.normal=Ls.getInterpolation(qo,Ss,Es,Ts,mp,gp,_p,new k),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new k,materialIndex:0};Ls.getNormal(Ss,Es,Ts,h.normal),u.face=h}return u}var Gr=class i extends Ke{constructor(t=1,e=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],u=[],h=[],d=0,f=0;x("z","y","x",-1,-1,n,e,t,a,s,0),x("z","y","x",1,-1,n,e,-t,a,s,1),x("x","z","y",1,1,t,n,e,r,a,2),x("x","z","y",1,-1,t,n,-e,r,a,3),x("x","y","z",1,-1,t,e,n,r,s,4),x("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new ge(c,3)),this.setAttribute("normal",new ge(u,3)),this.setAttribute("uv",new ge(h,2));function x(g,m,p,y,v,b,w,M,E,C,_){let S=b/E,L=w/C,U=b/2,q=w/2,D=M/2,B=E+1,G=C+1,K=0,tt=0,et=new k;for(let it=0;it<G;it++){let st=it*L-q;for(let _t=0;_t<B;_t++){let j=_t*S-U;et[g]=j*y,et[m]=st*v,et[p]=D,c.push(et.x,et.y,et.z),et[g]=0,et[m]=0,et[p]=M>0?1:-1,u.push(et.x,et.y,et.z),h.push(_t/E),h.push(1-it/C),K+=1}}for(let it=0;it<C;it++)for(let st=0;st<E;st++){let _t=d+st+B*it,j=d+st+B*(it+1),rt=d+(st+1)+B*(it+1),O=d+(st+1)+B*it;l.push(_t,j,O),l.push(j,rt,O),tt+=6}o.addGroup(f,tt,_),f+=tt,d+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Vs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function mn(i){let t={};for(let e=0;e<i.length;e++){let n=Vs(i[e]);for(let r in n)t[r]=n[r]}return t}function Wx(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function cm(i){return i.getRenderTarget()===null?i.outputColorSpace:le.workingColorSpace}var hr={clone:Vs,merge:mn},Xx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Fe=class extends lr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xx,this.fragmentShader=qx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Vs(t.uniforms),this.uniformsGroups=Wx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},xl=class extends qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ce,this.projectionMatrix=new Ce,this.projectionMatrixInverse=new Ce,this.coordinateSystem=Di}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},an=class extends xl{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Xa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ka*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Xa*2*Math.atan(Math.tan(ka*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ka*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,e-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ws=-90,As=1,$u=class extends qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new an(ws,As,t,e);r.layers=this.layers,this.add(r);let s=new an(ws,As,t,e);s.layers=this.layers,this.add(s);let a=new an(ws,As,t,e);a.layers=this.layers,this.add(a);let o=new an(ws,As,t,e);o.layers=this.layers,this.add(o);let l=new an(ws,As,t,e);l.layers=this.layers,this.add(l);let c=new an(ws,As,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,r,s,a,o,l]=e;for(let c of e)this.remove(c);if(t===Di)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ll)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;let g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,a),t.setRenderTarget(n,2,r),t.render(e,o),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(h,d,f),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},vl=class extends Xn{constructor(t,e,n,r,s,a,o,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Fs,super(t,e,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Yu=class extends _n{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];e.encoding!==void 0&&(Ha("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Vr?ze:Wn),this.texture=new vl(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Hn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Gr(5,5,5),s=new Fe({name:"CubemapFromEquirect",uniforms:Vs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:on,blending:mi});s.uniforms.tEquirect.value=e;let a=new Bt(r,s),o=e.minFilter;return e.minFilter===Wa&&(e.minFilter=Hn),new $u(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,r){let s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,r);t.setRenderTarget(s)}},Ru=new k,$x=new k,Yx=new ie,Ii=class{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let r=Ru.subVectors(n,e).cross($x.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Ru),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Yx.getNormalMatrix(t),r=this.coplanarPoint(Ru).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Nr=new or,Zo=new k,qa=class{constructor(t=new Ii,e=new Ii,n=new Ii,r=new Ii,s=new Ii,a=new Ii){this.planes=[t,e,n,r,s,a]}set(t,e,n,r,s,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Di){let n=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],h=r[6],d=r[7],f=r[8],x=r[9],g=r[10],m=r[11],p=r[12],y=r[13],v=r[14],b=r[15];if(n[0].setComponents(l-s,d-c,m-f,b-p).normalize(),n[1].setComponents(l+s,d+c,m+f,b+p).normalize(),n[2].setComponents(l+a,d+u,m+x,b+y).normalize(),n[3].setComponents(l-a,d-u,m-x,b-y).normalize(),n[4].setComponents(l-o,d-h,m-g,b-v).normalize(),e===Di)n[5].setComponents(l+o,d+h,m+g,b+v).normalize();else if(e===ll)n[5].setComponents(o,h,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Nr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Nr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Nr)}intersectsSprite(t){return Nr.center.set(0,0,0),Nr.radius=.7071067811865476,Nr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Nr)}intersectsSphere(t){let e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let r=e[n];if(Zo.x=r.normal.x>0?t.max.x:t.min.x,Zo.y=r.normal.y>0?t.max.y:t.min.y,Zo.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Zo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function um(){let i=null,t=!1,e=null,n=null;function r(s,a){e(s,a),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Zx(i,t){let e=t.isWebGL2,n=new WeakMap;function r(c,u){let h=c.array,d=c.usage,f=h.byteLength,x=i.createBuffer();i.bindBuffer(u,x),i.bufferData(u,h,d),c.onUploadCallback();let g;if(h instanceof Float32Array)g=i.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)g=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)g=i.SHORT;else if(h instanceof Uint32Array)g=i.UNSIGNED_INT;else if(h instanceof Int32Array)g=i.INT;else if(h instanceof Int8Array)g=i.BYTE;else if(h instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:x,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:f}}function s(c,u,h){let d=u.array,f=u._updateRange,x=u.updateRanges;if(i.bindBuffer(h,c),f.count===-1&&x.length===0&&i.bufferSubData(h,0,d),x.length!==0){for(let g=0,m=x.length;g<m;g++){let p=x[g];e?i.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):i.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}f.count!==-1&&(e?i.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):i.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);let u=n.get(c);u&&(i.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){let d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let h=n.get(c);if(h===void 0)n.set(c,r(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,c,u),h.version=c.version}}return{get:a,remove:o,update:l}}var Zu=class i extends Ke{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};let s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,h=t/o,d=e/l,f=[],x=[],g=[],m=[];for(let p=0;p<u;p++){let y=p*d-a;for(let v=0;v<c;v++){let b=v*h-s;x.push(b,-y,0),g.push(0,0,1),m.push(v/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){let v=y+c*p,b=y+c*(p+1),w=y+1+c*(p+1),M=y+1+c*p;f.push(v,b,M),f.push(b,w,M)}this.setIndex(f),this.setAttribute("position",new ge(x,3)),this.setAttribute("normal",new ge(g,3)),this.setAttribute("uv",new ge(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Jx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kx=`#ifdef USE_ALPHAHASH
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
#endif`,jx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tv=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,ev=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nv=`#ifdef USE_AOMAP
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
#endif`,iv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,rv=`#ifdef USE_BATCHING
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
#endif`,sv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,av=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ov=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cv=`#ifdef USE_IRIDESCENCE
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
#endif`,uv=`#ifdef USE_BUMPMAP
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
#endif`,hv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,dv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_v=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,xv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,vv=`#define PI 3.141592653589793
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
} // validated`,yv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Mv=`vec3 transformedNormal = objectNormal;
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
#endif`,bv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ev=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Av=`
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
}`,Cv=`#ifdef USE_ENVMAP
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
#endif`,Rv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Pv=`#ifdef USE_ENVMAP
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
#endif`,Lv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Iv=`#ifdef USE_ENVMAP
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
#endif`,Dv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Uv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ov=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fv=`#ifdef USE_GRADIENTMAP
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
}`,Bv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,zv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hv=`uniform bool receiveShadow;
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
#endif`,Gv=`#ifdef USE_ENVMAP
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
#endif`,Wv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$v=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Yv=`PhysicalMaterial material;
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
#endif`,Zv=`struct PhysicalMaterial {
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
}`,Jv=`
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
#endif`,Kv=`#if defined( RE_IndirectDiffuse )
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
#endif`,jv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ty=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ey=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,ny=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,iy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ry=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ay=`#if defined( USE_POINTS_UV )
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
#endif`,oy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ly=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cy=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,uy=`#ifdef USE_MORPHNORMALS
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
#endif`,hy=`#ifdef USE_MORPHTARGETS
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
#endif`,dy=`#ifdef USE_MORPHTARGETS
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
#endif`,fy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,py=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,my=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_y=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xy=`#ifdef USE_NORMALMAP
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
#endif`,vy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,My=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,by=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ey=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ty=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ay=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ry=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Py=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ly=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Iy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Uy=`float getShadowMask() {
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
}`,Ny=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Oy=`#ifdef USE_SKINNING
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
#endif`,Fy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,By=`#ifdef USE_SKINNING
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
#endif`,zy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ky=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gy=`#ifdef USE_TRANSMISSION
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
#endif`,Wy=`#ifdef USE_TRANSMISSION
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
#endif`,Xy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$y=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Zy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jy=`uniform sampler2D t2D;
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
}`,Ky=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Qy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,t1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e1=`#include <common>
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
}`,n1=`#if DEPTH_PACKING == 3200
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
}`,i1=`#define DISTANCE
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
}`,r1=`#define DISTANCE
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
}`,s1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,a1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o1=`uniform float scale;
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
}`,l1=`uniform vec3 diffuse;
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
}`,c1=`#include <common>
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
}`,u1=`uniform vec3 diffuse;
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
}`,h1=`#define LAMBERT
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
}`,d1=`#define LAMBERT
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
}`,f1=`#define MATCAP
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
}`,p1=`#define MATCAP
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
}`,m1=`#define NORMAL
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
}`,g1=`#define NORMAL
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
}`,_1=`#define PHONG
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
}`,x1=`#define PHONG
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
}`,v1=`#define STANDARD
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
}`,y1=`#define STANDARD
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
}`,M1=`#define TOON
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
}`,b1=`#define TOON
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
}`,S1=`uniform float size;
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
}`,E1=`uniform vec3 diffuse;
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
}`,T1=`#include <common>
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
}`,w1=`uniform vec3 color;
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
}`,A1=`uniform float rotation;
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
}`,C1=`uniform vec3 diffuse;
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
}`,ee={alphahash_fragment:Jx,alphahash_pars_fragment:Kx,alphamap_fragment:jx,alphamap_pars_fragment:Qx,alphatest_fragment:tv,alphatest_pars_fragment:ev,aomap_fragment:nv,aomap_pars_fragment:iv,batching_pars_vertex:rv,batching_vertex:sv,begin_vertex:av,beginnormal_vertex:ov,bsdfs:lv,iridescence_fragment:cv,bumpmap_pars_fragment:uv,clipping_planes_fragment:hv,clipping_planes_pars_fragment:dv,clipping_planes_pars_vertex:fv,clipping_planes_vertex:pv,color_fragment:mv,color_pars_fragment:gv,color_pars_vertex:_v,color_vertex:xv,common:vv,cube_uv_reflection_fragment:yv,defaultnormal_vertex:Mv,displacementmap_pars_vertex:bv,displacementmap_vertex:Sv,emissivemap_fragment:Ev,emissivemap_pars_fragment:Tv,colorspace_fragment:wv,colorspace_pars_fragment:Av,envmap_fragment:Cv,envmap_common_pars_fragment:Rv,envmap_pars_fragment:Pv,envmap_pars_vertex:Lv,envmap_physical_pars_fragment:Gv,envmap_vertex:Iv,fog_vertex:Dv,fog_pars_vertex:Uv,fog_fragment:Nv,fog_pars_fragment:Ov,gradientmap_pars_fragment:Fv,lightmap_fragment:Bv,lightmap_pars_fragment:zv,lights_lambert_fragment:kv,lights_lambert_pars_fragment:Vv,lights_pars_begin:Hv,lights_toon_fragment:Wv,lights_toon_pars_fragment:Xv,lights_phong_fragment:qv,lights_phong_pars_fragment:$v,lights_physical_fragment:Yv,lights_physical_pars_fragment:Zv,lights_fragment_begin:Jv,lights_fragment_maps:Kv,lights_fragment_end:jv,logdepthbuf_fragment:Qv,logdepthbuf_pars_fragment:ty,logdepthbuf_pars_vertex:ey,logdepthbuf_vertex:ny,map_fragment:iy,map_pars_fragment:ry,map_particle_fragment:sy,map_particle_pars_fragment:ay,metalnessmap_fragment:oy,metalnessmap_pars_fragment:ly,morphcolor_vertex:cy,morphnormal_vertex:uy,morphtarget_pars_vertex:hy,morphtarget_vertex:dy,normal_fragment_begin:fy,normal_fragment_maps:py,normal_pars_fragment:my,normal_pars_vertex:gy,normal_vertex:_y,normalmap_pars_fragment:xy,clearcoat_normal_fragment_begin:vy,clearcoat_normal_fragment_maps:yy,clearcoat_pars_fragment:My,iridescence_pars_fragment:by,opaque_fragment:Sy,packing:Ey,premultiplied_alpha_fragment:Ty,project_vertex:wy,dithering_fragment:Ay,dithering_pars_fragment:Cy,roughnessmap_fragment:Ry,roughnessmap_pars_fragment:Py,shadowmap_pars_fragment:Ly,shadowmap_pars_vertex:Iy,shadowmap_vertex:Dy,shadowmask_pars_fragment:Uy,skinbase_vertex:Ny,skinning_pars_vertex:Oy,skinning_vertex:Fy,skinnormal_vertex:By,specularmap_fragment:zy,specularmap_pars_fragment:ky,tonemapping_fragment:Vy,tonemapping_pars_fragment:Hy,transmission_fragment:Gy,transmission_pars_fragment:Wy,uv_pars_fragment:Xy,uv_pars_vertex:qy,uv_vertex:$y,worldpos_vertex:Yy,background_vert:Zy,background_frag:Jy,backgroundCube_vert:Ky,backgroundCube_frag:jy,cube_vert:Qy,cube_frag:t1,depth_vert:e1,depth_frag:n1,distanceRGBA_vert:i1,distanceRGBA_frag:r1,equirect_vert:s1,equirect_frag:a1,linedashed_vert:o1,linedashed_frag:l1,meshbasic_vert:c1,meshbasic_frag:u1,meshlambert_vert:h1,meshlambert_frag:d1,meshmatcap_vert:f1,meshmatcap_frag:p1,meshnormal_vert:m1,meshnormal_frag:g1,meshphong_vert:_1,meshphong_frag:x1,meshphysical_vert:v1,meshphysical_frag:y1,meshtoon_vert:M1,meshtoon_frag:b1,points_vert:S1,points_frag:E1,shadow_vert:T1,shadow_frag:w1,sprite_vert:A1,sprite_frag:C1},yt={common:{diffuse:{value:new Lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ie}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ie},normalScale:{value:new Vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0},uvTransform:{value:new ie}},sprite:{diffuse:{value:new Lt(16777215)},opacity:{value:1},center:{value:new Vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}}},pi={basic:{uniforms:mn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:mn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Lt(0)}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:mn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Lt(0)},specular:{value:new Lt(1118481)},shininess:{value:30}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:mn([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new Lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:mn([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new Lt(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:mn([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:mn([yt.points,yt.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:mn([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:mn([yt.common,yt.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:mn([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:mn([yt.sprite,yt.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distanceRGBA:{uniforms:mn([yt.common,yt.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distanceRGBA_vert,fragmentShader:ee.distanceRGBA_frag},shadow:{uniforms:mn([yt.lights,yt.fog,{color:{value:new Lt(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};pi.physical={uniforms:mn([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ie},clearcoatNormalScale:{value:new Vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ie},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ie},sheen:{value:0},sheenColor:{value:new Lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ie},transmissionSamplerSize:{value:new Vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ie},attenuationDistance:{value:0},attenuationColor:{value:new Lt(0)},specularColor:{value:new Lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ie},anisotropyVector:{value:new Vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ie}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};var Jo={r:0,b:0,g:0};function R1(i,t,e,n,r,s,a){let o=new Lt(0),l=s===!0?0:1,c,u,h=null,d=0,f=null;function x(m,p){let y=!1,v=p.isScene===!0?p.background:null;v&&v.isTexture&&(v=(p.backgroundBlurriness>0?e:t).get(v)),v===null?g(o,l):v&&v.isColor&&(g(v,1),y=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Il)?(u===void 0&&(u=new Bt(new Gr(1,1,1),new Fe({name:"BackgroundCubeMaterial",uniforms:Vs(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,M,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=le.getTransfer(v.colorSpace)!==me,(h!==v||d!==v.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=v,d=v.version,f=i.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Bt(new Zu(2,2),new Fe({name:"BackgroundMaterial",uniforms:Vs(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:sr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=le.getTransfer(v.colorSpace)!==me,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,f=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function g(m,p){m.getRGB(Jo,cm(i)),n.buffers.color.setClear(Jo.r,Jo.g,Jo.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),l=p,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,g(o,l)},render:x}}function P1(i,t,e,n){let r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=m(null),c=l,u=!1;function h(D,B,G,K,tt){let et=!1;if(a){let it=g(K,G,B);c!==it&&(c=it,f(c.object)),et=p(D,K,G,tt),et&&y(D,K,G,tt)}else{let it=B.wireframe===!0;(c.geometry!==K.id||c.program!==G.id||c.wireframe!==it)&&(c.geometry=K.id,c.program=G.id,c.wireframe=it,et=!0)}tt!==null&&e.update(tt,i.ELEMENT_ARRAY_BUFFER),(et||u)&&(u=!1,C(D,B,G,K),tt!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(tt).buffer))}function d(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function f(D){return n.isWebGL2?i.bindVertexArray(D):s.bindVertexArrayOES(D)}function x(D){return n.isWebGL2?i.deleteVertexArray(D):s.deleteVertexArrayOES(D)}function g(D,B,G){let K=G.wireframe===!0,tt=o[D.id];tt===void 0&&(tt={},o[D.id]=tt);let et=tt[B.id];et===void 0&&(et={},tt[B.id]=et);let it=et[K];return it===void 0&&(it=m(d()),et[K]=it),it}function m(D){let B=[],G=[],K=[];for(let tt=0;tt<r;tt++)B[tt]=0,G[tt]=0,K[tt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:G,attributeDivisors:K,object:D,attributes:{},index:null}}function p(D,B,G,K){let tt=c.attributes,et=B.attributes,it=0,st=G.getAttributes();for(let _t in st)if(st[_t].location>=0){let rt=tt[_t],O=et[_t];if(O===void 0&&(_t==="instanceMatrix"&&D.instanceMatrix&&(O=D.instanceMatrix),_t==="instanceColor"&&D.instanceColor&&(O=D.instanceColor)),rt===void 0||rt.attribute!==O||O&&rt.data!==O.data)return!0;it++}return c.attributesNum!==it||c.index!==K}function y(D,B,G,K){let tt={},et=B.attributes,it=0,st=G.getAttributes();for(let _t in st)if(st[_t].location>=0){let rt=et[_t];rt===void 0&&(_t==="instanceMatrix"&&D.instanceMatrix&&(rt=D.instanceMatrix),_t==="instanceColor"&&D.instanceColor&&(rt=D.instanceColor));let O={};O.attribute=rt,rt&&rt.data&&(O.data=rt.data),tt[_t]=O,it++}c.attributes=tt,c.attributesNum=it,c.index=K}function v(){let D=c.newAttributes;for(let B=0,G=D.length;B<G;B++)D[B]=0}function b(D){w(D,0)}function w(D,B){let G=c.newAttributes,K=c.enabledAttributes,tt=c.attributeDivisors;G[D]=1,K[D]===0&&(i.enableVertexAttribArray(D),K[D]=1),tt[D]!==B&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,B),tt[D]=B)}function M(){let D=c.newAttributes,B=c.enabledAttributes;for(let G=0,K=B.length;G<K;G++)B[G]!==D[G]&&(i.disableVertexAttribArray(G),B[G]=0)}function E(D,B,G,K,tt,et,it){it===!0?i.vertexAttribIPointer(D,B,G,tt,et):i.vertexAttribPointer(D,B,G,K,tt,et)}function C(D,B,G,K){if(n.isWebGL2===!1&&(D.isInstancedMesh||K.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();let tt=K.attributes,et=G.getAttributes(),it=B.defaultAttributeValues;for(let st in et){let _t=et[st];if(_t.location>=0){let j=tt[st];if(j===void 0&&(st==="instanceMatrix"&&D.instanceMatrix&&(j=D.instanceMatrix),st==="instanceColor"&&D.instanceColor&&(j=D.instanceColor)),j!==void 0){let rt=j.normalized,O=j.itemSize,H=e.get(j);if(H===void 0)continue;let z=H.buffer,$=H.type,A=H.bytesPerElement,N=n.isWebGL2===!0&&($===i.INT||$===i.UNSIGNED_INT||j.gpuType===Jp);if(j.isInterleavedBufferAttribute){let X=j.data,I=X.stride,xt=j.offset;if(X.isInstancedInterleavedBuffer){for(let dt=0;dt<_t.locationSize;dt++)w(_t.location+dt,X.meshPerAttribute);D.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let dt=0;dt<_t.locationSize;dt++)b(_t.location+dt);i.bindBuffer(i.ARRAY_BUFFER,z);for(let dt=0;dt<_t.locationSize;dt++)E(_t.location+dt,O/_t.locationSize,$,rt,I*A,(xt+O/_t.locationSize*dt)*A,N)}else{if(j.isInstancedBufferAttribute){for(let X=0;X<_t.locationSize;X++)w(_t.location+X,j.meshPerAttribute);D.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let X=0;X<_t.locationSize;X++)b(_t.location+X);i.bindBuffer(i.ARRAY_BUFFER,z);for(let X=0;X<_t.locationSize;X++)E(_t.location+X,O/_t.locationSize,$,rt,O*A,O/_t.locationSize*X*A,N)}}else if(it!==void 0){let rt=it[st];if(rt!==void 0)switch(rt.length){case 2:i.vertexAttrib2fv(_t.location,rt);break;case 3:i.vertexAttrib3fv(_t.location,rt);break;case 4:i.vertexAttrib4fv(_t.location,rt);break;default:i.vertexAttrib1fv(_t.location,rt)}}}}M()}function _(){U();for(let D in o){let B=o[D];for(let G in B){let K=B[G];for(let tt in K)x(K[tt].object),delete K[tt];delete B[G]}delete o[D]}}function S(D){if(o[D.id]===void 0)return;let B=o[D.id];for(let G in B){let K=B[G];for(let tt in K)x(K[tt].object),delete K[tt];delete B[G]}delete o[D.id]}function L(D){for(let B in o){let G=o[B];if(G[D.id]===void 0)continue;let K=G[D.id];for(let tt in K)x(K[tt].object),delete K[tt];delete G[D.id]}}function U(){q(),u=!0,c!==l&&(c=l,f(c.object))}function q(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:U,resetDefaultState:q,dispose:_,releaseStatesOfGeometry:S,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:b,disableUnusedAttributes:M}}function L1(i,t,e,n){let r=n.isWebGL2,s;function a(u){s=u}function o(u,h){i.drawArrays(s,u,h),e.update(h,s,1)}function l(u,h,d){if(d===0)return;let f,x;if(r)f=i,x="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),x="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[x](s,u,h,d),e.update(h,s,d)}function c(u,h,d){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let x=0;x<d;x++)this.render(u[x],h[x]);else{f.multiDrawArraysWEBGL(s,u,0,h,0,d);let x=0;for(let g=0;g<d;g++)x+=h[g];e.update(x,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function I1(i,t,e){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let E=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",o=e.precision!==void 0?e.precision:"highp",l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);let c=a||t.has("WEBGL_draw_buffers"),u=e.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,b=a||t.has("OES_texture_float"),w=v&&b,M=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:y,vertexTextures:v,floatFragmentTextures:b,floatVertexTextures:w,maxSamples:M}}function D1(i){let t=this,e=null,n=0,r=!1,s=!1,a=new Ii,o=new ie,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||n!==0||r;return r=d,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,f){let x=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!r||x===null||x.length===0||s&&!m)s?u(null):c();else{let y=s?0:n,v=y*4,b=p.clippingState||null;l.value=b,b=u(x,d,v,f);for(let w=0;w!==v;++w)b[w]=e[w];p.clippingState=b,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,f,x){let g=h!==null?h.length:0,m=null;if(g!==0){if(m=l.value,x!==!0||m===null){let p=f+g*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,b=f;v!==g;++v,b+=4)a.copy(h[v]).applyMatrix4(y,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function U1(i){let t=new WeakMap;function e(a,o){return o===zu?a.mapping=Fs:o===ku&&(a.mapping=Bs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===zu||o===ku)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Yu(l.height/2);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",r),e(c.texture,a.mapping)}else return null}}return a}function r(a){let o=a.target;o.removeEventListener("dispose",r);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}var Hs=class extends xl{constructor(t=-1,e=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-t,a=n+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Is=4,xp=[.125,.215,.35,.446,.526,.582],Br=20,Pu=new Hs,vp=new Lt,Lu=null,Iu=0,Du=0,Or=(1+Math.sqrt(5))/2,Cs=1/Or,yp=[new k(1,1,1),new k(-1,1,1),new k(1,1,-1),new k(-1,1,-1),new k(0,Or,Cs),new k(0,Or,-Cs),new k(Cs,0,Or),new k(-Cs,0,Or),new k(Or,Cs,0),new k(-Or,Cs,0)],Gs=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){Lu=this._renderer.getRenderTarget(),Iu=this._renderer.getActiveCubeFace(),Du=this._renderer.getActiveMipmapLevel(),this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Lu,Iu,Du),t.scissorTest=!1,Ko(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Fs||t.mapping===Bs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Lu=this._renderer.getRenderTarget(),Iu=this._renderer.getActiveCubeFace(),Du=this._renderer.getActiveMipmapLevel();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Hn,minFilter:Hn,generateMipmaps:!1,type:ii,format:ni,colorSpace:Ni,depthBuffer:!1},r=Mp(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mp(t,e,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=N1(s)),this._blurMaterial=O1(s,t,e)}return r}_compileMaterial(t){let e=new Bt(this._lodPlanes[0],t);this._renderer.compile(e,Pu)}_sceneToCubeUV(t,e,n,r){let o=new an(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(vp),u.toneMapping=ir,u.autoClear=!1;let f=new ri({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),x=new Bt(new Gr,f),g=!1,m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,g=!0):(f.color.copy(vp),g=!0);for(let p=0;p<6;p++){let y=p%3;y===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):y===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));let v=this._cubeSize;Ko(r,y*v,p>2?v:0,v,v),u.setRenderTarget(r),g&&u.render(x,o),u.render(t,o)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=d,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,r=t.mapping===Fs||t.mapping===Bs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sp()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bp());let s=r?this._cubemapMaterial:this._equirectMaterial,a=new Bt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;let l=this._cubeSize;Ko(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Pu)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){let s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=yp[(r-1)%yp.length];this._blur(t,r-1,r,s,a)}e.autoClear=n}_blur(t,e,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,r,"latitudinal",s),this._halfBlur(a,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Bt(this._lodPlanes[r],c),d=c.uniforms,f=this._sizeLods[n]-1,x=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Br-1),g=s/x,m=isFinite(s)?1+Math.floor(u*g):Br;m>Br&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Br}`);let p=[],y=0;for(let E=0;E<Br;++E){let C=E/g,_=Math.exp(-C*C/2);p.push(_),E===0?y+=_:E<m&&(y+=2*_)}for(let E=0;E<p.length;E++)p[E]=p[E]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:v}=this;d.dTheta.value=x,d.mipInt.value=v-n;let b=this._sizeLods[r],w=3*b*(r>v-Is?r-v+Is:0),M=4*(this._cubeSize-b);Ko(e,w,M,3*b,2*b),l.setRenderTarget(e),l.render(h,Pu)}};function N1(i){let t=[],e=[],n=[],r=i,s=i-Is+1+xp.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);e.push(o);let l=1/o;a>i-Is?l=xp[a-i+Is-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,x=6,g=3,m=2,p=1,y=new Float32Array(g*x*f),v=new Float32Array(m*x*f),b=new Float32Array(p*x*f);for(let M=0;M<f;M++){let E=M%3*2/3-1,C=M>2?0:-1,_=[E,C,0,E+2/3,C,0,E+2/3,C+1,0,E,C,0,E+2/3,C+1,0,E,C+1,0];y.set(_,g*x*M),v.set(d,m*x*M);let S=[M,M,M,M,M,M];b.set(S,p*x*M)}let w=new Ke;w.setAttribute("position",new ln(y,g)),w.setAttribute("uv",new ln(v,m)),w.setAttribute("faceIndex",new ln(b,p)),t.push(w),r>Is&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Mp(i,t,e){let n=new _n(i,t,e);return n.texture.mapping=Il,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ko(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function O1(i,t,e){let n=new Float32Array(Br),r=new k(0,1,0);return new Fe({name:"SphericalGaussianBlur",defines:{n:Br,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ch(),fragmentShader:`

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
		`,blending:mi,depthTest:!1,depthWrite:!1})}function bp(){return new Fe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ch(),fragmentShader:`

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
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Sp(){return new Fe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ch(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Ch(){return`

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
	`}function F1(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===zu||l===ku,u=l===Fs||l===Bs;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=t.get(o);return e===null&&(e=new Gs(i)),h=c?e.fromEquirectangular(o,h):e.fromCubemap(o,h),t.set(o,h),h.texture}else{if(t.has(o))return t.get(o).texture;{let h=o.image;if(c&&h&&h.height>0||u&&h&&r(h)){e===null&&(e=new Gs(i));let d=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function B1(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let r=e(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function z1(i,t,e,n){let r={},s=new WeakMap;function a(h){let d=h.target;d.index!==null&&t.remove(d.index);for(let x in d.attributes)t.remove(d.attributes[x]);for(let x in d.morphAttributes){let g=d.morphAttributes[x];for(let m=0,p=g.length;m<p;m++)t.remove(g[m])}d.removeEventListener("dispose",a),delete r[d.id];let f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,e.memory.geometries++),d}function l(h){let d=h.attributes;for(let x in d)t.update(d[x],i.ARRAY_BUFFER);let f=h.morphAttributes;for(let x in f){let g=f[x];for(let m=0,p=g.length;m<p;m++)t.update(g[m],i.ARRAY_BUFFER)}}function c(h){let d=[],f=h.index,x=h.attributes.position,g=0;if(f!==null){let y=f.array;g=f.version;for(let v=0,b=y.length;v<b;v+=3){let w=y[v+0],M=y[v+1],E=y[v+2];d.push(w,M,M,E,E,w)}}else if(x!==void 0){let y=x.array;g=x.version;for(let v=0,b=y.length/3-1;v<b;v+=3){let w=v+0,M=v+1,E=v+2;d.push(w,M,M,E,E,w)}}else return;let m=new(om(d)?_l:gl)(d,1);m.version=g;let p=s.get(h);p&&t.remove(p),s.set(h,m)}function u(h){let d=s.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function k1(i,t,e,n){let r=n.isWebGL2,s;function a(f){s=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function u(f,x){i.drawElements(s,x,o,f*l),e.update(x,s,1)}function h(f,x,g){if(g===0)return;let m,p;if(r)m=i,p="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,x,o,f*l,g),e.update(x,s,g)}function d(f,x,g){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<g;p++)this.render(f[p]/l,x[p]);else{m.multiDrawElementsWEBGL(s,x,0,o,f,0,g);let p=0;for(let y=0;y<g;y++)p+=x[y];e.update(p,s,1)}}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=d}function V1(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(s/3);break;case i.LINES:e.lines+=o*(s/2);break;case i.LINE_STRIP:e.lines+=o*(s-1);break;case i.LINE_LOOP:e.lines+=o*s;break;case i.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function H1(i,t){return i[0]-t[0]}function G1(i,t){return Math.abs(t[1])-Math.abs(i[1])}function W1(i,t,e){let n={},r=new Float32Array(8),s=new WeakMap,a=new Ee,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h){let d=c.morphTargetInfluences;if(t.isWebGL2===!0){let f=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,x=f!==void 0?f.length:0,g=s.get(u);if(g===void 0||g.count!==x){let D=function(){U.dispose(),s.delete(u),u.removeEventListener("dispose",D)};g!==void 0&&g.texture.dispose();let y=u.morphAttributes.position!==void 0,v=u.morphAttributes.normal!==void 0,b=u.morphAttributes.color!==void 0,w=u.morphAttributes.position||[],M=u.morphAttributes.normal||[],E=u.morphAttributes.color||[],C=0;y===!0&&(C=1),v===!0&&(C=2),b===!0&&(C=3);let _=u.attributes.position.count*C,S=1;_>t.maxTextureSize&&(S=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let L=new Float32Array(_*S*4*x),U=new fl(L,_,S,x);U.type=nr,U.needsUpdate=!0;let q=C*4;for(let B=0;B<x;B++){let G=w[B],K=M[B],tt=E[B],et=_*S*4*B;for(let it=0;it<G.count;it++){let st=it*q;y===!0&&(a.fromBufferAttribute(G,it),L[et+st+0]=a.x,L[et+st+1]=a.y,L[et+st+2]=a.z,L[et+st+3]=0),v===!0&&(a.fromBufferAttribute(K,it),L[et+st+4]=a.x,L[et+st+5]=a.y,L[et+st+6]=a.z,L[et+st+7]=0),b===!0&&(a.fromBufferAttribute(tt,it),L[et+st+8]=a.x,L[et+st+9]=a.y,L[et+st+10]=a.z,L[et+st+11]=tt.itemSize===4?a.w:1)}}g={count:x,texture:U,size:new Vt(_,S)},s.set(u,g),u.addEventListener("dispose",D)}let m=0;for(let y=0;y<d.length;y++)m+=d[y];let p=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(i,"morphTargetBaseInfluence",p),h.getUniforms().setValue(i,"morphTargetInfluences",d),h.getUniforms().setValue(i,"morphTargetsTexture",g.texture,e),h.getUniforms().setValue(i,"morphTargetsTextureSize",g.size)}else{let f=d===void 0?0:d.length,x=n[u.id];if(x===void 0||x.length!==f){x=[];for(let v=0;v<f;v++)x[v]=[v,0];n[u.id]=x}for(let v=0;v<f;v++){let b=x[v];b[0]=v,b[1]=d[v]}x.sort(G1);for(let v=0;v<8;v++)v<f&&x[v][1]?(o[v][0]=x[v][0],o[v][1]=x[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(H1);let g=u.morphAttributes.position,m=u.morphAttributes.normal,p=0;for(let v=0;v<8;v++){let b=o[v],w=b[0],M=b[1];w!==Number.MAX_SAFE_INTEGER&&M?(g&&u.getAttribute("morphTarget"+v)!==g[w]&&u.setAttribute("morphTarget"+v,g[w]),m&&u.getAttribute("morphNormal"+v)!==m[w]&&u.setAttribute("morphNormal"+v,m[w]),r[v]=M,p+=M):(g&&u.hasAttribute("morphTarget"+v)===!0&&u.deleteAttribute("morphTarget"+v),m&&u.hasAttribute("morphNormal"+v)===!0&&u.deleteAttribute("morphNormal"+v),r[v]=0)}let y=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(i,"morphTargetBaseInfluence",y),h.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function X1(i,t,e,n){let r=new WeakMap;function s(l){let c=n.render.frame,u=l.geometry,h=t.get(l,u);if(r.get(h)!==c&&(t.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return h}function a(){r=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}var yl=class extends Xn{constructor(t,e,n,r,s,a,o,l,c,u){if(u=u!==void 0?u:kr,u!==kr&&u!==zs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===kr&&(n=er),n===void 0&&u===zs&&(n=zr),super(null,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:gn,this.minFilter=l!==void 0?l:gn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},hm=new Xn,dm=new yl(1,1);dm.compareFunction=sm;var fm=new fl,pm=new qu,mm=new vl,Ep=[],Tp=[],wp=new Float32Array(16),Ap=new Float32Array(9),Cp=new Float32Array(4);function Ys(i,t,e){let n=i[0];if(n<=0||n>0)return i;let r=t*e,s=Ep[r];if(s===void 0&&(s=new Float32Array(r),Ep[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(s,o)}return s}function ke(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ve(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ul(i,t){let e=Tp[t];e===void 0&&(e=new Int32Array(t),Tp[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function q1(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function $1(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;i.uniform2fv(this.addr,t),Ve(e,t)}}function Y1(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ke(e,t))return;i.uniform3fv(this.addr,t),Ve(e,t)}}function Z1(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;i.uniform4fv(this.addr,t),Ve(e,t)}}function J1(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(ke(e,n))return;Cp.set(n),i.uniformMatrix2fv(this.addr,!1,Cp),Ve(e,n)}}function K1(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(ke(e,n))return;Ap.set(n),i.uniformMatrix3fv(this.addr,!1,Ap),Ve(e,n)}}function j1(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(ke(e,n))return;wp.set(n),i.uniformMatrix4fv(this.addr,!1,wp),Ve(e,n)}}function Q1(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function tM(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;i.uniform2iv(this.addr,t),Ve(e,t)}}function eM(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;i.uniform3iv(this.addr,t),Ve(e,t)}}function nM(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;i.uniform4iv(this.addr,t),Ve(e,t)}}function iM(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function rM(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;i.uniform2uiv(this.addr,t),Ve(e,t)}}function sM(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;i.uniform3uiv(this.addr,t),Ve(e,t)}}function aM(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;i.uniform4uiv(this.addr,t),Ve(e,t)}}function oM(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s=this.type===i.SAMPLER_2D_SHADOW?dm:hm;e.setTexture2D(t||s,r)}function lM(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||pm,r)}function cM(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||mm,r)}function uM(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||fm,r)}function hM(i){switch(i){case 5126:return q1;case 35664:return $1;case 35665:return Y1;case 35666:return Z1;case 35674:return J1;case 35675:return K1;case 35676:return j1;case 5124:case 35670:return Q1;case 35667:case 35671:return tM;case 35668:case 35672:return eM;case 35669:case 35673:return nM;case 5125:return iM;case 36294:return rM;case 36295:return sM;case 36296:return aM;case 35678:case 36198:case 36298:case 36306:case 35682:return oM;case 35679:case 36299:case 36307:return lM;case 35680:case 36300:case 36308:case 36293:return cM;case 36289:case 36303:case 36311:case 36292:return uM}}function dM(i,t){i.uniform1fv(this.addr,t)}function fM(i,t){let e=Ys(t,this.size,2);i.uniform2fv(this.addr,e)}function pM(i,t){let e=Ys(t,this.size,3);i.uniform3fv(this.addr,e)}function mM(i,t){let e=Ys(t,this.size,4);i.uniform4fv(this.addr,e)}function gM(i,t){let e=Ys(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function _M(i,t){let e=Ys(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function xM(i,t){let e=Ys(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function vM(i,t){i.uniform1iv(this.addr,t)}function yM(i,t){i.uniform2iv(this.addr,t)}function MM(i,t){i.uniform3iv(this.addr,t)}function bM(i,t){i.uniform4iv(this.addr,t)}function SM(i,t){i.uniform1uiv(this.addr,t)}function EM(i,t){i.uniform2uiv(this.addr,t)}function TM(i,t){i.uniform3uiv(this.addr,t)}function wM(i,t){i.uniform4uiv(this.addr,t)}function AM(i,t,e){let n=this.cache,r=t.length,s=Ul(e,r);ke(n,s)||(i.uniform1iv(this.addr,s),Ve(n,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||hm,s[a])}function CM(i,t,e){let n=this.cache,r=t.length,s=Ul(e,r);ke(n,s)||(i.uniform1iv(this.addr,s),Ve(n,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||pm,s[a])}function RM(i,t,e){let n=this.cache,r=t.length,s=Ul(e,r);ke(n,s)||(i.uniform1iv(this.addr,s),Ve(n,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||mm,s[a])}function PM(i,t,e){let n=this.cache,r=t.length,s=Ul(e,r);ke(n,s)||(i.uniform1iv(this.addr,s),Ve(n,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||fm,s[a])}function LM(i){switch(i){case 5126:return dM;case 35664:return fM;case 35665:return pM;case 35666:return mM;case 35674:return gM;case 35675:return _M;case 35676:return xM;case 5124:case 35670:return vM;case 35667:case 35671:return yM;case 35668:case 35672:return MM;case 35669:case 35673:return bM;case 5125:return SM;case 36294:return EM;case 36295:return TM;case 36296:return wM;case 35678:case 36198:case 36298:case 36306:case 35682:return AM;case 35679:case 36299:case 36307:return CM;case 35680:case 36300:case 36308:case 36293:return RM;case 36289:case 36303:case 36311:case 36292:return PM}}var Ju=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=hM(e.type)}},Ku=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=LM(e.type)}},ju=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(t,e[o.id],n)}}},Uu=/(\w+)(\])?(\[|\.)?/g;function Rp(i,t){i.seq.push(t),i.map[t.id]=t}function IM(i,t,e){let n=i.name,r=n.length;for(Uu.lastIndex=0;;){let s=Uu.exec(n),a=Uu.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Rp(e,c===void 0?new Ju(o,i,t):new Ku(o,i,t));break}else{let h=e.map[o];h===void 0&&(h=new ju(o),Rp(e,h)),e=h}}}var Os=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);IM(s,a,this)}}setValue(t,e,n,r){let s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){let r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,a=e.length;s!==a;++s){let o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){let n=[];for(let r=0,s=t.length;r!==s;++r){let a=t[r];a.id in e&&n.push(a)}return n}};function Pp(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var DM=37297,UM=0;function NM(i,t){let e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function OM(i){let t=le.getPrimaries(le.workingColorSpace),e=le.getPrimaries(i),n;switch(t===e?n="":t===ol&&e===al?n="LinearDisplayP3ToLinearSRGB":t===al&&e===ol&&(n="LinearSRGBToLinearDisplayP3"),i){case Ni:case Dl:return[n,"LinearTransferOETF"];case ze:case wh:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Lp(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+NM(i.getShaderSource(t),a)}else return r}function FM(i,t){let e=OM(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function BM(i,t){let e;switch(t){case Mh:e="Linear";break;case bh:e="Reinhard";break;case Sh:e="OptimizedCineon";break;case ja:e="ACESFilmic";break;case Eh:e="AgX";break;case Z_:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function zM(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ds).join(`
`)}function kM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ds).join(`
`)}function VM(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function HM(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(t,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ds(i){return i!==""}function Ip(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Dp(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var GM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qu(i){return i.replace(GM,XM)}var WM=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function XM(i,t){let e=ee[t];if(e===void 0){let n=WM.get(t);if(n!==void 0)e=ee[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Qu(e)}var qM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Up(i){return i.replace(qM,$M)}function $M(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Np(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function YM(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===$p?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===S_?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Li&&(t="SHADOWMAP_TYPE_VSM"),t}function ZM(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Fs:case Bs:t="ENVMAP_TYPE_CUBE";break;case Il:t="ENVMAP_TYPE_CUBE_UV";break}return t}function JM(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Bs:t="ENVMAP_MODE_REFRACTION";break}return t}function KM(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Yp:t="ENVMAP_BLENDING_MULTIPLY";break;case $_:t="ENVMAP_BLENDING_MIX";break;case Y_:t="ENVMAP_BLENDING_ADD";break}return t}function jM(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function QM(i,t,e,n){let r=i.getContext(),s=e.defines,a=e.vertexShader,o=e.fragmentShader,l=YM(e),c=ZM(e),u=JM(e),h=KM(e),d=jM(e),f=e.isWebGL2?"":zM(e),x=kM(e),g=VM(s),m=r.createProgram(),p,y,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ds).join(`
`),p.length>0&&(p+=`
`),y=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ds).join(`
`),y.length>0&&(y+=`
`)):(p=[Np(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ds).join(`
`),y=[f,Np(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ir?"#define TONE_MAPPING":"",e.toneMapping!==ir?ee.tonemapping_pars_fragment:"",e.toneMapping!==ir?BM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,FM("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ds).join(`
`)),a=Qu(a),a=Ip(a,e),a=Dp(a,e),o=Qu(o),o=Ip(o,e),o=Dp(o,e),a=Up(a),o=Up(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[x,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,y=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===tp?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===tp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);let b=v+p+a,w=v+y+o,M=Pp(r,r.VERTEX_SHADER,b),E=Pp(r,r.FRAGMENT_SHADER,w);r.attachShader(m,M),r.attachShader(m,E),e.index0AttributeName!==void 0?r.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function C(U){if(i.debug.checkShaderErrors){let q=r.getProgramInfoLog(m).trim(),D=r.getShaderInfoLog(M).trim(),B=r.getShaderInfoLog(E).trim(),G=!0,K=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,m,M,E);else{let tt=Lp(r,M,"vertex"),et=Lp(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+q+`
`+tt+`
`+et)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(D===""||B==="")&&(K=!1);K&&(U.diagnostics={runnable:G,programLog:q,vertexShader:{log:D,prefix:p},fragmentShader:{log:B,prefix:y}})}r.deleteShader(M),r.deleteShader(E),_=new Os(r,m),S=HM(r,m)}let _;this.getUniforms=function(){return _===void 0&&C(this),_};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(m,DM)),L},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=UM++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=M,this.fragmentShader=E,this}var tb=0,th=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new eh(t),e.set(t,n)),n}},eh=class{constructor(t){this.id=tb++,this.code=t,this.usedTimes=0}};function eb(i,t,e,n,r,s,a){let o=new ml,l=new th,c=[],u=r.isWebGL2,h=r.logarithmicDepthBuffer,d=r.vertexTextures,f=r.precision,x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return _===0?"uv":`uv${_}`}function m(_,S,L,U,q){let D=U.fog,B=q.geometry,G=_.isMeshStandardMaterial?U.environment:null,K=(_.isMeshStandardMaterial?e:t).get(_.envMap||G),tt=K&&K.mapping===Il?K.image.height:null,et=x[_.type];_.precision!==null&&(f=r.getMaxPrecision(_.precision),f!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",f,"instead."));let it=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,st=it!==void 0?it.length:0,_t=0;B.morphAttributes.position!==void 0&&(_t=1),B.morphAttributes.normal!==void 0&&(_t=2),B.morphAttributes.color!==void 0&&(_t=3);let j,rt,O,H;if(et){let Ue=pi[et];j=Ue.vertexShader,rt=Ue.fragmentShader}else j=_.vertexShader,rt=_.fragmentShader,l.update(_),O=l.getVertexShaderID(_),H=l.getFragmentShaderID(_);let z=i.getRenderTarget(),$=q.isInstancedMesh===!0,A=q.isBatchedMesh===!0,N=!!_.map,X=!!_.matcap,I=!!K,xt=!!_.aoMap,dt=!!_.lightMap,at=!!_.bumpMap,ht=!!_.normalMap,Nt=!!_.displacementMap,wt=!!_.emissiveMap,P=!!_.metalnessMap,T=!!_.roughnessMap,Y=_.anisotropy>0,ct=_.clearcoat>0,ft=_.iridescence>0,pt=_.sheen>0,Dt=_.transmission>0,St=Y&&!!_.anisotropyMap,Ct=ct&&!!_.clearcoatMap,Ft=ct&&!!_.clearcoatNormalMap,Kt=ct&&!!_.clearcoatRoughnessMap,ut=ft&&!!_.iridescenceMap,se=ft&&!!_.iridescenceThicknessMap,jt=pt&&!!_.sheenColorMap,$t=pt&&!!_.sheenRoughnessMap,Ot=!!_.specularMap,Rt=!!_.specularColorMap,Zt=!!_.specularIntensityMap,ae=Dt&&!!_.transmissionMap,ye=Dt&&!!_.thicknessMap,te=!!_.gradientMap,vt=!!_.alphaMap,F=_.alphaTest>0,Et=!!_.alphaHash,Mt=!!_.extensions,Gt=!!B.attributes.uv1,zt=!!B.attributes.uv2,ue=!!B.attributes.uv3,he=ir;return _.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(he=i.toneMapping),{isWebGL2:u,shaderID:et,shaderType:_.type,shaderName:_.name,vertexShader:j,fragmentShader:rt,defines:_.defines,customVertexShaderID:O,customFragmentShaderID:H,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:f,batching:A,instancing:$,instancingColor:$&&q.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:z===null?i.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Ni,map:N,matcap:X,envMap:I,envMapMode:I&&K.mapping,envMapCubeUVHeight:tt,aoMap:xt,lightMap:dt,bumpMap:at,normalMap:ht,displacementMap:d&&Nt,emissiveMap:wt,normalMapObjectSpace:ht&&_.normalMapType===ox,normalMapTangentSpace:ht&&_.normalMapType===rm,metalnessMap:P,roughnessMap:T,anisotropy:Y,anisotropyMap:St,clearcoat:ct,clearcoatMap:Ct,clearcoatNormalMap:Ft,clearcoatRoughnessMap:Kt,iridescence:ft,iridescenceMap:ut,iridescenceThicknessMap:se,sheen:pt,sheenColorMap:jt,sheenRoughnessMap:$t,specularMap:Ot,specularColorMap:Rt,specularIntensityMap:Zt,transmission:Dt,transmissionMap:ae,thicknessMap:ye,gradientMap:te,opaque:_.transparent===!1&&_.blending===Us,alphaMap:vt,alphaTest:F,alphaHash:Et,combine:_.combine,mapUv:N&&g(_.map.channel),aoMapUv:xt&&g(_.aoMap.channel),lightMapUv:dt&&g(_.lightMap.channel),bumpMapUv:at&&g(_.bumpMap.channel),normalMapUv:ht&&g(_.normalMap.channel),displacementMapUv:Nt&&g(_.displacementMap.channel),emissiveMapUv:wt&&g(_.emissiveMap.channel),metalnessMapUv:P&&g(_.metalnessMap.channel),roughnessMapUv:T&&g(_.roughnessMap.channel),anisotropyMapUv:St&&g(_.anisotropyMap.channel),clearcoatMapUv:Ct&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:Ft&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Kt&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:ut&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:se&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:jt&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:$t&&g(_.sheenRoughnessMap.channel),specularMapUv:Ot&&g(_.specularMap.channel),specularColorMapUv:Rt&&g(_.specularColorMap.channel),specularIntensityMapUv:Zt&&g(_.specularIntensityMap.channel),transmissionMapUv:ae&&g(_.transmissionMap.channel),thicknessMapUv:ye&&g(_.thicknessMap.channel),alphaMapUv:vt&&g(_.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ht||Y),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUv1s:Gt,vertexUv2s:zt,vertexUv3s:ue,pointsUvs:q.isPoints===!0&&!!B.attributes.uv&&(N||vt),fog:!!D,useFog:_.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:q.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:st,morphTextureStride:_t,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:he,useLegacyLights:i._useLegacyLights,decodeVideoTexture:N&&_.map.isVideoTexture===!0&&le.getTransfer(_.map.colorSpace)===me,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Gn,flipSided:_.side===on,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionDerivatives:Mt&&_.extensions.derivatives===!0,extensionFragDepth:Mt&&_.extensions.fragDepth===!0,extensionDrawBuffers:Mt&&_.extensions.drawBuffers===!0,extensionShaderTextureLOD:Mt&&_.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Mt&&_.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()}}function p(_){let S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(let L in _.defines)S.push(L),S.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(y(S,_),v(S,_),S.push(i.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function y(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function v(_,S){o.disableAll(),S.isWebGL2&&o.enable(0),S.supportsVertexTextures&&o.enable(1),S.instancing&&o.enable(2),S.instancingColor&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),_.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.skinning&&o.enable(4),S.morphTargets&&o.enable(5),S.morphNormals&&o.enable(6),S.morphColors&&o.enable(7),S.premultipliedAlpha&&o.enable(8),S.shadowMapEnabled&&o.enable(9),S.useLegacyLights&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),_.push(o.mask)}function b(_){let S=x[_.type],L;if(S){let U=pi[S];L=hr.clone(U.uniforms)}else L=_.uniforms;return L}function w(_,S){let L;for(let U=0,q=c.length;U<q;U++){let D=c[U];if(D.cacheKey===S){L=D,++L.usedTimes;break}}return L===void 0&&(L=new QM(i,S,_,s),c.push(L)),L}function M(_){if(--_.usedTimes===0){let S=c.indexOf(_);c[S]=c[c.length-1],c.pop(),_.destroy()}}function E(_){l.remove(_)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:b,acquireProgram:w,releaseProgram:M,releaseShaderCache:E,programs:c,dispose:C}}function nb(){let i=new WeakMap;function t(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function e(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:r}}function ib(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Op(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Fp(){let i=[],t=0,e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function a(h,d,f,x,g,m){let p=i[t];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:x,renderOrder:h.renderOrder,z:g,group:m},i[t]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=x,p.renderOrder=h.renderOrder,p.z=g,p.group=m),t++,p}function o(h,d,f,x,g,m){let p=a(h,d,f,x,g,m);f.transmission>0?n.push(p):f.transparent===!0?r.push(p):e.push(p)}function l(h,d,f,x,g,m){let p=a(h,d,f,x,g,m);f.transmission>0?n.unshift(p):f.transparent===!0?r.unshift(p):e.unshift(p)}function c(h,d){e.length>1&&e.sort(h||ib),n.length>1&&n.sort(d||Op),r.length>1&&r.sort(d||Op)}function u(){for(let h=t,d=i.length;h<d;h++){let f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function rb(){let i=new WeakMap;function t(n,r){let s=i.get(n),a;return s===void 0?(a=new Fp,i.set(n,[a])):r>=s.length?(a=new Fp,s.push(a)):a=s[r],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function sb(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new k,color:new Lt};break;case"SpotLight":e={position:new k,direction:new k,color:new Lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new Lt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new Lt,groundColor:new Lt};break;case"RectAreaLight":e={color:new Lt,position:new k,halfWidth:new k,halfHeight:new k};break}return i[t.id]=e,e}}}function ab(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var ob=0;function lb(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function cb(i,t){let e=new sb,n=ab(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new k);let s=new k,a=new Ce,o=new Ce;function l(u,h){let d=0,f=0,x=0;for(let U=0;U<9;U++)r.probe[U].set(0,0,0);let g=0,m=0,p=0,y=0,v=0,b=0,w=0,M=0,E=0,C=0,_=0;u.sort(lb);let S=h===!0?Math.PI:1;for(let U=0,q=u.length;U<q;U++){let D=u[U],B=D.color,G=D.intensity,K=D.distance,tt=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=B.r*G*S,f+=B.g*G*S,x+=B.b*G*S;else if(D.isLightProbe){for(let et=0;et<9;et++)r.probe[et].addScaledVector(D.sh.coefficients[et],G);_++}else if(D.isDirectionalLight){let et=e.get(D);if(et.color.copy(D.color).multiplyScalar(D.intensity*S),D.castShadow){let it=D.shadow,st=n.get(D);st.shadowBias=it.bias,st.shadowNormalBias=it.normalBias,st.shadowRadius=it.radius,st.shadowMapSize=it.mapSize,r.directionalShadow[g]=st,r.directionalShadowMap[g]=tt,r.directionalShadowMatrix[g]=D.shadow.matrix,b++}r.directional[g]=et,g++}else if(D.isSpotLight){let et=e.get(D);et.position.setFromMatrixPosition(D.matrixWorld),et.color.copy(B).multiplyScalar(G*S),et.distance=K,et.coneCos=Math.cos(D.angle),et.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),et.decay=D.decay,r.spot[p]=et;let it=D.shadow;if(D.map&&(r.spotLightMap[E]=D.map,E++,it.updateMatrices(D),D.castShadow&&C++),r.spotLightMatrix[p]=it.matrix,D.castShadow){let st=n.get(D);st.shadowBias=it.bias,st.shadowNormalBias=it.normalBias,st.shadowRadius=it.radius,st.shadowMapSize=it.mapSize,r.spotShadow[p]=st,r.spotShadowMap[p]=tt,M++}p++}else if(D.isRectAreaLight){let et=e.get(D);et.color.copy(B).multiplyScalar(G),et.halfWidth.set(D.width*.5,0,0),et.halfHeight.set(0,D.height*.5,0),r.rectArea[y]=et,y++}else if(D.isPointLight){let et=e.get(D);if(et.color.copy(D.color).multiplyScalar(D.intensity*S),et.distance=D.distance,et.decay=D.decay,D.castShadow){let it=D.shadow,st=n.get(D);st.shadowBias=it.bias,st.shadowNormalBias=it.normalBias,st.shadowRadius=it.radius,st.shadowMapSize=it.mapSize,st.shadowCameraNear=it.camera.near,st.shadowCameraFar=it.camera.far,r.pointShadow[m]=st,r.pointShadowMap[m]=tt,r.pointShadowMatrix[m]=D.shadow.matrix,w++}r.point[m]=et,m++}else if(D.isHemisphereLight){let et=e.get(D);et.skyColor.copy(D.color).multiplyScalar(G*S),et.groundColor.copy(D.groundColor).multiplyScalar(G*S),r.hemi[v]=et,v++}}y>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=yt.LTC_FLOAT_1,r.rectAreaLTC2=yt.LTC_FLOAT_2):(r.rectAreaLTC1=yt.LTC_HALF_1,r.rectAreaLTC2=yt.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=yt.LTC_FLOAT_1,r.rectAreaLTC2=yt.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=yt.LTC_HALF_1,r.rectAreaLTC2=yt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=f,r.ambient[2]=x;let L=r.hash;(L.directionalLength!==g||L.pointLength!==m||L.spotLength!==p||L.rectAreaLength!==y||L.hemiLength!==v||L.numDirectionalShadows!==b||L.numPointShadows!==w||L.numSpotShadows!==M||L.numSpotMaps!==E||L.numLightProbes!==_)&&(r.directional.length=g,r.spot.length=p,r.rectArea.length=y,r.point.length=m,r.hemi.length=v,r.directionalShadow.length=b,r.directionalShadowMap.length=b,r.pointShadow.length=w,r.pointShadowMap.length=w,r.spotShadow.length=M,r.spotShadowMap.length=M,r.directionalShadowMatrix.length=b,r.pointShadowMatrix.length=w,r.spotLightMatrix.length=M+E-C,r.spotLightMap.length=E,r.numSpotLightShadowsWithMaps=C,r.numLightProbes=_,L.directionalLength=g,L.pointLength=m,L.spotLength=p,L.rectAreaLength=y,L.hemiLength=v,L.numDirectionalShadows=b,L.numPointShadows=w,L.numSpotShadows=M,L.numSpotMaps=E,L.numLightProbes=_,r.version=ob++)}function c(u,h){let d=0,f=0,x=0,g=0,m=0,p=h.matrixWorldInverse;for(let y=0,v=u.length;y<v;y++){let b=u[y];if(b.isDirectionalLight){let w=r.directional[d];w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),d++}else if(b.isSpotLight){let w=r.spot[x];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),x++}else if(b.isRectAreaLight){let w=r.rectArea[g];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),o.identity(),a.copy(b.matrixWorld),a.premultiply(p),o.extractRotation(a),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){let w=r.point[f];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){let w=r.hemi[m];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:r}}function Bp(i,t){let e=new cb(i,t),n=[],r=[];function s(){n.length=0,r.length=0}function a(h){n.push(h)}function o(h){r.push(h)}function l(h){e.setup(n,h)}function c(h){e.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function ub(i,t){let e=new WeakMap;function n(s,a=0){let o=e.get(s),l;return o===void 0?(l=new Bp(i,t),e.set(s,[l])):a>=o.length?(l=new Bp(i,t),o.push(l)):l=o[a],l}function r(){e=new WeakMap}return{get:n,dispose:r}}var nh=class extends lr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ih=class extends lr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},hb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,db=`uniform sampler2D shadow_pass;
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
}`;function fb(i,t,e){let n=new qa,r=new Vt,s=new Vt,a=new Ee,o=new nh({depthPacking:ax}),l=new ih,c={},u=e.maxTextureSize,h={[sr]:on,[on]:sr,[Gn]:Gn},d=new Fe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vt},radius:{value:4}},vertexShader:hb,fragmentShader:db}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let x=new Ke;x.setAttribute("position",new ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new Bt(x,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$p;let p=this.type;this.render=function(M,E,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;let _=i.getRenderTarget(),S=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),U=i.state;U.setBlending(mi),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let q=p!==Li&&this.type===Li,D=p===Li&&this.type!==Li;for(let B=0,G=M.length;B<G;B++){let K=M[B],tt=K.shadow;if(tt===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(tt.autoUpdate===!1&&tt.needsUpdate===!1)continue;r.copy(tt.mapSize);let et=tt.getFrameExtents();if(r.multiply(et),s.copy(tt.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/et.x),r.x=s.x*et.x,tt.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/et.y),r.y=s.y*et.y,tt.mapSize.y=s.y)),tt.map===null||q===!0||D===!0){let st=this.type!==Li?{minFilter:gn,magFilter:gn}:{};tt.map!==null&&tt.map.dispose(),tt.map=new _n(r.x,r.y,st),tt.map.texture.name=K.name+".shadowMap",tt.camera.updateProjectionMatrix()}i.setRenderTarget(tt.map),i.clear();let it=tt.getViewportCount();for(let st=0;st<it;st++){let _t=tt.getViewport(st);a.set(s.x*_t.x,s.y*_t.y,s.x*_t.z,s.y*_t.w),U.viewport(a),tt.updateMatrices(K,st),n=tt.getFrustum(),b(E,C,tt.camera,K,this.type)}tt.isPointLightShadow!==!0&&this.type===Li&&y(tt,C),tt.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(_,S,L)};function y(M,E){let C=t.update(g);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new _n(r.x,r.y)),d.uniforms.shadow_pass.value=M.map.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(E,null,C,d,g,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(E,null,C,f,g,null)}function v(M,E,C,_){let S=null,L=C.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(L!==void 0)S=L;else if(S=C.isPointLight===!0?l:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){let U=S.uuid,q=E.uuid,D=c[U];D===void 0&&(D={},c[U]=D);let B=D[q];B===void 0&&(B=S.clone(),D[q]=B,E.addEventListener("dispose",w)),S=B}if(S.visible=E.visible,S.wireframe=E.wireframe,_===Li?S.side=E.shadowSide!==null?E.shadowSide:E.side:S.side=E.shadowSide!==null?E.shadowSide:h[E.side],S.alphaMap=E.alphaMap,S.alphaTest=E.alphaTest,S.map=E.map,S.clipShadows=E.clipShadows,S.clippingPlanes=E.clippingPlanes,S.clipIntersection=E.clipIntersection,S.displacementMap=E.displacementMap,S.displacementScale=E.displacementScale,S.displacementBias=E.displacementBias,S.wireframeLinewidth=E.wireframeLinewidth,S.linewidth=E.linewidth,C.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let U=i.properties.get(S);U.light=C}return S}function b(M,E,C,_,S){if(M.visible===!1)return;if(M.layers.test(E.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&S===Li)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,M.matrixWorld);let q=t.update(M),D=M.material;if(Array.isArray(D)){let B=q.groups;for(let G=0,K=B.length;G<K;G++){let tt=B[G],et=D[tt.materialIndex];if(et&&et.visible){let it=v(M,et,_,S);M.onBeforeShadow(i,M,E,C,q,it,tt),i.renderBufferDirect(C,null,q,it,M,tt),M.onAfterShadow(i,M,E,C,q,it,tt)}}}else if(D.visible){let B=v(M,D,_,S);M.onBeforeShadow(i,M,E,C,q,B,null),i.renderBufferDirect(C,null,q,B,M,null),M.onAfterShadow(i,M,E,C,q,B,null)}}let U=M.children;for(let q=0,D=U.length;q<D;q++)b(U[q],E,C,_,S)}function w(M){M.target.removeEventListener("dispose",w);for(let C in c){let _=c[C],S=M.target.uuid;S in _&&(_[S].dispose(),delete _[S])}}}function pb(i,t,e){let n=e.isWebGL2;function r(){let F=!1,Et=new Ee,Mt=null,Gt=new Ee(0,0,0,0);return{setMask:function(zt){Mt!==zt&&!F&&(i.colorMask(zt,zt,zt,zt),Mt=zt)},setLocked:function(zt){F=zt},setClear:function(zt,ue,he,De,Ue){Ue===!0&&(zt*=De,ue*=De,he*=De),Et.set(zt,ue,he,De),Gt.equals(Et)===!1&&(i.clearColor(zt,ue,he,De),Gt.copy(Et))},reset:function(){F=!1,Mt=null,Gt.set(-1,0,0,0)}}}function s(){let F=!1,Et=null,Mt=null,Gt=null;return{setTest:function(zt){zt?A(i.DEPTH_TEST):N(i.DEPTH_TEST)},setMask:function(zt){Et!==zt&&!F&&(i.depthMask(zt),Et=zt)},setFunc:function(zt){if(Mt!==zt){switch(zt){case k_:i.depthFunc(i.NEVER);break;case V_:i.depthFunc(i.ALWAYS);break;case H_:i.depthFunc(i.LESS);break;case nl:i.depthFunc(i.LEQUAL);break;case G_:i.depthFunc(i.EQUAL);break;case W_:i.depthFunc(i.GEQUAL);break;case X_:i.depthFunc(i.GREATER);break;case q_:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Mt=zt}},setLocked:function(zt){F=zt},setClear:function(zt){Gt!==zt&&(i.clearDepth(zt),Gt=zt)},reset:function(){F=!1,Et=null,Mt=null,Gt=null}}}function a(){let F=!1,Et=null,Mt=null,Gt=null,zt=null,ue=null,he=null,De=null,Ue=null;return{setTest:function(oe){F||(oe?A(i.STENCIL_TEST):N(i.STENCIL_TEST))},setMask:function(oe){Et!==oe&&!F&&(i.stencilMask(oe),Et=oe)},setFunc:function(oe,$e,Zn){(Mt!==oe||Gt!==$e||zt!==Zn)&&(i.stencilFunc(oe,$e,Zn),Mt=oe,Gt=$e,zt=Zn)},setOp:function(oe,$e,Zn){(ue!==oe||he!==$e||De!==Zn)&&(i.stencilOp(oe,$e,Zn),ue=oe,he=$e,De=Zn)},setLocked:function(oe){F=oe},setClear:function(oe){Ue!==oe&&(i.clearStencil(oe),Ue=oe)},reset:function(){F=!1,Et=null,Mt=null,Gt=null,zt=null,ue=null,he=null,De=null,Ue=null}}}let o=new r,l=new s,c=new a,u=new WeakMap,h=new WeakMap,d={},f={},x=new WeakMap,g=[],m=null,p=!1,y=null,v=null,b=null,w=null,M=null,E=null,C=null,_=new Lt(0,0,0),S=0,L=!1,U=null,q=null,D=null,B=null,G=null,K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),tt=!1,et=0,it=i.getParameter(i.VERSION);it.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(it)[1]),tt=et>=1):it.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(it)[1]),tt=et>=2);let st=null,_t={},j=i.getParameter(i.SCISSOR_BOX),rt=i.getParameter(i.VIEWPORT),O=new Ee().fromArray(j),H=new Ee().fromArray(rt);function z(F,Et,Mt,Gt){let zt=new Uint8Array(4),ue=i.createTexture();i.bindTexture(F,ue),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let he=0;he<Mt;he++)n&&(F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY)?i.texImage3D(Et,0,i.RGBA,1,1,Gt,0,i.RGBA,i.UNSIGNED_BYTE,zt):i.texImage2D(Et+he,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,zt);return ue}let $={};$[i.TEXTURE_2D]=z(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&($[i.TEXTURE_2D_ARRAY]=z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=z(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),A(i.DEPTH_TEST),l.setFunc(nl),wt(!1),P(xf),A(i.CULL_FACE),ht(mi);function A(F){d[F]!==!0&&(i.enable(F),d[F]=!0)}function N(F){d[F]!==!1&&(i.disable(F),d[F]=!1)}function X(F,Et){return f[F]!==Et?(i.bindFramebuffer(F,Et),f[F]=Et,n&&(F===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=Et),F===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=Et)),!0):!1}function I(F,Et){let Mt=g,Gt=!1;if(F)if(Mt=x.get(Et),Mt===void 0&&(Mt=[],x.set(Et,Mt)),F.isWebGLMultipleRenderTargets){let zt=F.texture;if(Mt.length!==zt.length||Mt[0]!==i.COLOR_ATTACHMENT0){for(let ue=0,he=zt.length;ue<he;ue++)Mt[ue]=i.COLOR_ATTACHMENT0+ue;Mt.length=zt.length,Gt=!0}}else Mt[0]!==i.COLOR_ATTACHMENT0&&(Mt[0]=i.COLOR_ATTACHMENT0,Gt=!0);else Mt[0]!==i.BACK&&(Mt[0]=i.BACK,Gt=!0);Gt&&(e.isWebGL2?i.drawBuffers(Mt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(Mt))}function xt(F){return m!==F?(i.useProgram(F),m=F,!0):!1}let dt={[Fr]:i.FUNC_ADD,[T_]:i.FUNC_SUBTRACT,[w_]:i.FUNC_REVERSE_SUBTRACT};if(n)dt[Mf]=i.MIN,dt[bf]=i.MAX;else{let F=t.get("EXT_blend_minmax");F!==null&&(dt[Mf]=F.MIN_EXT,dt[bf]=F.MAX_EXT)}let at={[A_]:i.ZERO,[C_]:i.ONE,[R_]:i.SRC_COLOR,[Fu]:i.SRC_ALPHA,[N_]:i.SRC_ALPHA_SATURATE,[D_]:i.DST_COLOR,[L_]:i.DST_ALPHA,[P_]:i.ONE_MINUS_SRC_COLOR,[Bu]:i.ONE_MINUS_SRC_ALPHA,[U_]:i.ONE_MINUS_DST_COLOR,[I_]:i.ONE_MINUS_DST_ALPHA,[O_]:i.CONSTANT_COLOR,[F_]:i.ONE_MINUS_CONSTANT_COLOR,[B_]:i.CONSTANT_ALPHA,[z_]:i.ONE_MINUS_CONSTANT_ALPHA};function ht(F,Et,Mt,Gt,zt,ue,he,De,Ue,oe){if(F===mi){p===!0&&(N(i.BLEND),p=!1);return}if(p===!1&&(A(i.BLEND),p=!0),F!==E_){if(F!==y||oe!==L){if((v!==Fr||M!==Fr)&&(i.blendEquation(i.FUNC_ADD),v=Fr,M=Fr),oe)switch(F){case Us:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Hr:i.blendFunc(i.ONE,i.ONE);break;case vf:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yf:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Us:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Hr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case vf:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yf:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}b=null,w=null,E=null,C=null,_.set(0,0,0),S=0,y=F,L=oe}return}zt=zt||Et,ue=ue||Mt,he=he||Gt,(Et!==v||zt!==M)&&(i.blendEquationSeparate(dt[Et],dt[zt]),v=Et,M=zt),(Mt!==b||Gt!==w||ue!==E||he!==C)&&(i.blendFuncSeparate(at[Mt],at[Gt],at[ue],at[he]),b=Mt,w=Gt,E=ue,C=he),(De.equals(_)===!1||Ue!==S)&&(i.blendColor(De.r,De.g,De.b,Ue),_.copy(De),S=Ue),y=F,L=!1}function Nt(F,Et){F.side===Gn?N(i.CULL_FACE):A(i.CULL_FACE);let Mt=F.side===on;Et&&(Mt=!Mt),wt(Mt),F.blending===Us&&F.transparent===!1?ht(mi):ht(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),l.setFunc(F.depthFunc),l.setTest(F.depthTest),l.setMask(F.depthWrite),o.setMask(F.colorWrite);let Gt=F.stencilWrite;c.setTest(Gt),Gt&&(c.setMask(F.stencilWriteMask),c.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),c.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Y(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?A(i.SAMPLE_ALPHA_TO_COVERAGE):N(i.SAMPLE_ALPHA_TO_COVERAGE)}function wt(F){U!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),U=F)}function P(F){F!==M_?(A(i.CULL_FACE),F!==q&&(F===xf?i.cullFace(i.BACK):F===b_?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):N(i.CULL_FACE),q=F}function T(F){F!==D&&(tt&&i.lineWidth(F),D=F)}function Y(F,Et,Mt){F?(A(i.POLYGON_OFFSET_FILL),(B!==Et||G!==Mt)&&(i.polygonOffset(Et,Mt),B=Et,G=Mt)):N(i.POLYGON_OFFSET_FILL)}function ct(F){F?A(i.SCISSOR_TEST):N(i.SCISSOR_TEST)}function ft(F){F===void 0&&(F=i.TEXTURE0+K-1),st!==F&&(i.activeTexture(F),st=F)}function pt(F,Et,Mt){Mt===void 0&&(st===null?Mt=i.TEXTURE0+K-1:Mt=st);let Gt=_t[Mt];Gt===void 0&&(Gt={type:void 0,texture:void 0},_t[Mt]=Gt),(Gt.type!==F||Gt.texture!==Et)&&(st!==Mt&&(i.activeTexture(Mt),st=Mt),i.bindTexture(F,Et||$[F]),Gt.type=F,Gt.texture=Et)}function Dt(){let F=_t[st];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function St(){try{i.compressedTexImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ct(){try{i.compressedTexImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ft(){try{i.texSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Kt(){try{i.texSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ut(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function se(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function jt(){try{i.texStorage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function $t(){try{i.texStorage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ot(){try{i.texImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Rt(){try{i.texImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Zt(F){O.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),O.copy(F))}function ae(F){H.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),H.copy(F))}function ye(F,Et){let Mt=h.get(Et);Mt===void 0&&(Mt=new WeakMap,h.set(Et,Mt));let Gt=Mt.get(F);Gt===void 0&&(Gt=i.getUniformBlockIndex(Et,F.name),Mt.set(F,Gt))}function te(F,Et){let Gt=h.get(Et).get(F);u.get(Et)!==Gt&&(i.uniformBlockBinding(Et,Gt,F.__bindingPointIndex),u.set(Et,Gt))}function vt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},st=null,_t={},f={},x=new WeakMap,g=[],m=null,p=!1,y=null,v=null,b=null,w=null,M=null,E=null,C=null,_=new Lt(0,0,0),S=0,L=!1,U=null,q=null,D=null,B=null,G=null,O.set(0,0,i.canvas.width,i.canvas.height),H.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:A,disable:N,bindFramebuffer:X,drawBuffers:I,useProgram:xt,setBlending:ht,setMaterial:Nt,setFlipSided:wt,setCullFace:P,setLineWidth:T,setPolygonOffset:Y,setScissorTest:ct,activeTexture:ft,bindTexture:pt,unbindTexture:Dt,compressedTexImage2D:St,compressedTexImage3D:Ct,texImage2D:Ot,texImage3D:Rt,updateUBOMapping:ye,uniformBlockBinding:te,texStorage2D:jt,texStorage3D:$t,texSubImage2D:Ft,texSubImage3D:Kt,compressedTexSubImage2D:ut,compressedTexSubImage3D:se,scissor:Zt,viewport:ae,reset:vt}}function mb(i,t,e,n,r,s,a){let o=r.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,h,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(P,T){return f?new OffscreenCanvas(P,T):ul("canvas")}function g(P,T,Y,ct){let ft=1;if((P.width>ct||P.height>ct)&&(ft=ct/Math.max(P.width,P.height)),ft<1||T===!0)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap){let pt=T?cl:Math.floor,Dt=pt(ft*P.width),St=pt(ft*P.height);h===void 0&&(h=x(Dt,St));let Ct=Y?x(Dt,St):h;return Ct.width=Dt,Ct.height=St,Ct.getContext("2d").drawImage(P,0,0,Dt,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+Dt+"x"+St+")."),Ct}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function m(P){return Wu(P.width)&&Wu(P.height)}function p(P){return o?!1:P.wrapS!==ei||P.wrapT!==ei||P.minFilter!==gn&&P.minFilter!==Hn}function y(P,T){return P.generateMipmaps&&T&&P.minFilter!==gn&&P.minFilter!==Hn}function v(P){i.generateMipmap(P)}function b(P,T,Y,ct,ft=!1){if(o===!1)return T;if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let pt=T;if(T===i.RED&&(Y===i.FLOAT&&(pt=i.R32F),Y===i.HALF_FLOAT&&(pt=i.R16F),Y===i.UNSIGNED_BYTE&&(pt=i.R8)),T===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(pt=i.R8UI),Y===i.UNSIGNED_SHORT&&(pt=i.R16UI),Y===i.UNSIGNED_INT&&(pt=i.R32UI),Y===i.BYTE&&(pt=i.R8I),Y===i.SHORT&&(pt=i.R16I),Y===i.INT&&(pt=i.R32I)),T===i.RG&&(Y===i.FLOAT&&(pt=i.RG32F),Y===i.HALF_FLOAT&&(pt=i.RG16F),Y===i.UNSIGNED_BYTE&&(pt=i.RG8)),T===i.RGBA){let Dt=ft?sl:le.getTransfer(ct);Y===i.FLOAT&&(pt=i.RGBA32F),Y===i.HALF_FLOAT&&(pt=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(pt=Dt===me?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT_4_4_4_4&&(pt=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(pt=i.RGB5_A1)}return(pt===i.R16F||pt===i.R32F||pt===i.RG16F||pt===i.RG32F||pt===i.RGBA16F||pt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),pt}function w(P,T,Y){return y(P,Y)===!0||P.isFramebufferTexture&&P.minFilter!==gn&&P.minFilter!==Hn?Math.log2(Math.max(T.width,T.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?T.mipmaps.length:1}function M(P){return P===gn||P===Sf||P===au?i.NEAREST:i.LINEAR}function E(P){let T=P.target;T.removeEventListener("dispose",E),_(T),T.isVideoTexture&&u.delete(T)}function C(P){let T=P.target;T.removeEventListener("dispose",C),L(T)}function _(P){let T=n.get(P);if(T.__webglInit===void 0)return;let Y=P.source,ct=d.get(Y);if(ct){let ft=ct[T.__cacheKey];ft.usedTimes--,ft.usedTimes===0&&S(P),Object.keys(ct).length===0&&d.delete(Y)}n.remove(P)}function S(P){let T=n.get(P);i.deleteTexture(T.__webglTexture);let Y=P.source,ct=d.get(Y);delete ct[T.__cacheKey],a.memory.textures--}function L(P){let T=P.texture,Y=n.get(P),ct=n.get(T);if(ct.__webglTexture!==void 0&&(i.deleteTexture(ct.__webglTexture),a.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let ft=0;ft<6;ft++){if(Array.isArray(Y.__webglFramebuffer[ft]))for(let pt=0;pt<Y.__webglFramebuffer[ft].length;pt++)i.deleteFramebuffer(Y.__webglFramebuffer[ft][pt]);else i.deleteFramebuffer(Y.__webglFramebuffer[ft]);Y.__webglDepthbuffer&&i.deleteRenderbuffer(Y.__webglDepthbuffer[ft])}else{if(Array.isArray(Y.__webglFramebuffer))for(let ft=0;ft<Y.__webglFramebuffer.length;ft++)i.deleteFramebuffer(Y.__webglFramebuffer[ft]);else i.deleteFramebuffer(Y.__webglFramebuffer);if(Y.__webglDepthbuffer&&i.deleteRenderbuffer(Y.__webglDepthbuffer),Y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(Y.__webglMultisampledFramebuffer),Y.__webglColorRenderbuffer)for(let ft=0;ft<Y.__webglColorRenderbuffer.length;ft++)Y.__webglColorRenderbuffer[ft]&&i.deleteRenderbuffer(Y.__webglColorRenderbuffer[ft]);Y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(Y.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let ft=0,pt=T.length;ft<pt;ft++){let Dt=n.get(T[ft]);Dt.__webglTexture&&(i.deleteTexture(Dt.__webglTexture),a.memory.textures--),n.remove(T[ft])}n.remove(T),n.remove(P)}let U=0;function q(){U=0}function D(){let P=U;return P>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),U+=1,P}function B(P){let T=[];return T.push(P.wrapS),T.push(P.wrapT),T.push(P.wrapR||0),T.push(P.magFilter),T.push(P.minFilter),T.push(P.anisotropy),T.push(P.internalFormat),T.push(P.format),T.push(P.type),T.push(P.generateMipmaps),T.push(P.premultiplyAlpha),T.push(P.flipY),T.push(P.unpackAlignment),T.push(P.colorSpace),T.join()}function G(P,T){let Y=n.get(P);if(P.isVideoTexture&&Nt(P),P.isRenderTargetTexture===!1&&P.version>0&&Y.__version!==P.version){let ct=P.image;if(ct===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ct.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{O(Y,P,T);return}}e.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+T)}function K(P,T){let Y=n.get(P);if(P.version>0&&Y.__version!==P.version){O(Y,P,T);return}e.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+T)}function tt(P,T){let Y=n.get(P);if(P.version>0&&Y.__version!==P.version){O(Y,P,T);return}e.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+T)}function et(P,T){let Y=n.get(P);if(P.version>0&&Y.__version!==P.version){H(Y,P,T);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+T)}let it={[Vu]:i.REPEAT,[ei]:i.CLAMP_TO_EDGE,[Hu]:i.MIRRORED_REPEAT},st={[gn]:i.NEAREST,[Sf]:i.NEAREST_MIPMAP_NEAREST,[au]:i.NEAREST_MIPMAP_LINEAR,[Hn]:i.LINEAR,[J_]:i.LINEAR_MIPMAP_NEAREST,[Wa]:i.LINEAR_MIPMAP_LINEAR},_t={[lx]:i.NEVER,[px]:i.ALWAYS,[cx]:i.LESS,[sm]:i.LEQUAL,[ux]:i.EQUAL,[fx]:i.GEQUAL,[hx]:i.GREATER,[dx]:i.NOTEQUAL};function j(P,T,Y){if(Y?(i.texParameteri(P,i.TEXTURE_WRAP_S,it[T.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,it[T.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,it[T.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,st[T.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,st[T.minFilter])):(i.texParameteri(P,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(P,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(T.wrapS!==ei||T.wrapT!==ei)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(P,i.TEXTURE_MAG_FILTER,M(T.magFilter)),i.texParameteri(P,i.TEXTURE_MIN_FILTER,M(T.minFilter)),T.minFilter!==gn&&T.minFilter!==Hn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),T.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,_t[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let ct=t.get("EXT_texture_filter_anisotropic");if(T.magFilter===gn||T.minFilter!==au&&T.minFilter!==Wa||T.type===nr&&t.has("OES_texture_float_linear")===!1||o===!1&&T.type===ii&&t.has("OES_texture_half_float_linear")===!1)return;(T.anisotropy>1||n.get(T).__currentAnisotropy)&&(i.texParameterf(P,ct.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy)}}function rt(P,T){let Y=!1;P.__webglInit===void 0&&(P.__webglInit=!0,T.addEventListener("dispose",E));let ct=T.source,ft=d.get(ct);ft===void 0&&(ft={},d.set(ct,ft));let pt=B(T);if(pt!==P.__cacheKey){ft[pt]===void 0&&(ft[pt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),ft[pt].usedTimes++;let Dt=ft[P.__cacheKey];Dt!==void 0&&(ft[P.__cacheKey].usedTimes--,Dt.usedTimes===0&&S(T)),P.__cacheKey=pt,P.__webglTexture=ft[pt].texture}return Y}function O(P,T,Y){let ct=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ct=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ct=i.TEXTURE_3D);let ft=rt(P,T),pt=T.source;e.bindTexture(ct,P.__webglTexture,i.TEXTURE0+Y);let Dt=n.get(pt);if(pt.version!==Dt.__version||ft===!0){e.activeTexture(i.TEXTURE0+Y);let St=le.getPrimaries(le.workingColorSpace),Ct=T.colorSpace===Wn?null:le.getPrimaries(T.colorSpace),Ft=T.colorSpace===Wn||St===Ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ft);let Kt=p(T)&&m(T.image)===!1,ut=g(T.image,Kt,!1,r.maxTextureSize);ut=wt(T,ut);let se=m(ut)||o,jt=s.convert(T.format,T.colorSpace),$t=s.convert(T.type),Ot=b(T.internalFormat,jt,$t,T.colorSpace,T.isVideoTexture);j(ct,T,se);let Rt,Zt=T.mipmaps,ae=o&&T.isVideoTexture!==!0&&Ot!==nm,ye=Dt.__version===void 0||ft===!0,te=w(T,ut,se);if(T.isDepthTexture)Ot=i.DEPTH_COMPONENT,o?T.type===nr?Ot=i.DEPTH_COMPONENT32F:T.type===er?Ot=i.DEPTH_COMPONENT24:T.type===zr?Ot=i.DEPTH24_STENCIL8:Ot=i.DEPTH_COMPONENT16:T.type===nr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===kr&&Ot===i.DEPTH_COMPONENT&&T.type!==Th&&T.type!==er&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=er,$t=s.convert(T.type)),T.format===zs&&Ot===i.DEPTH_COMPONENT&&(Ot=i.DEPTH_STENCIL,T.type!==zr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=zr,$t=s.convert(T.type))),ye&&(ae?e.texStorage2D(i.TEXTURE_2D,1,Ot,ut.width,ut.height):e.texImage2D(i.TEXTURE_2D,0,Ot,ut.width,ut.height,0,jt,$t,null));else if(T.isDataTexture)if(Zt.length>0&&se){ae&&ye&&e.texStorage2D(i.TEXTURE_2D,te,Ot,Zt[0].width,Zt[0].height);for(let vt=0,F=Zt.length;vt<F;vt++)Rt=Zt[vt],ae?e.texSubImage2D(i.TEXTURE_2D,vt,0,0,Rt.width,Rt.height,jt,$t,Rt.data):e.texImage2D(i.TEXTURE_2D,vt,Ot,Rt.width,Rt.height,0,jt,$t,Rt.data);T.generateMipmaps=!1}else ae?(ye&&e.texStorage2D(i.TEXTURE_2D,te,Ot,ut.width,ut.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut.width,ut.height,jt,$t,ut.data)):e.texImage2D(i.TEXTURE_2D,0,Ot,ut.width,ut.height,0,jt,$t,ut.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){ae&&ye&&e.texStorage3D(i.TEXTURE_2D_ARRAY,te,Ot,Zt[0].width,Zt[0].height,ut.depth);for(let vt=0,F=Zt.length;vt<F;vt++)Rt=Zt[vt],T.format!==ni?jt!==null?ae?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,vt,0,0,0,Rt.width,Rt.height,ut.depth,jt,Rt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,vt,Ot,Rt.width,Rt.height,ut.depth,0,Rt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?e.texSubImage3D(i.TEXTURE_2D_ARRAY,vt,0,0,0,Rt.width,Rt.height,ut.depth,jt,$t,Rt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,vt,Ot,Rt.width,Rt.height,ut.depth,0,jt,$t,Rt.data)}else{ae&&ye&&e.texStorage2D(i.TEXTURE_2D,te,Ot,Zt[0].width,Zt[0].height);for(let vt=0,F=Zt.length;vt<F;vt++)Rt=Zt[vt],T.format!==ni?jt!==null?ae?e.compressedTexSubImage2D(i.TEXTURE_2D,vt,0,0,Rt.width,Rt.height,jt,Rt.data):e.compressedTexImage2D(i.TEXTURE_2D,vt,Ot,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?e.texSubImage2D(i.TEXTURE_2D,vt,0,0,Rt.width,Rt.height,jt,$t,Rt.data):e.texImage2D(i.TEXTURE_2D,vt,Ot,Rt.width,Rt.height,0,jt,$t,Rt.data)}else if(T.isDataArrayTexture)ae?(ye&&e.texStorage3D(i.TEXTURE_2D_ARRAY,te,Ot,ut.width,ut.height,ut.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,jt,$t,ut.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ot,ut.width,ut.height,ut.depth,0,jt,$t,ut.data);else if(T.isData3DTexture)ae?(ye&&e.texStorage3D(i.TEXTURE_3D,te,Ot,ut.width,ut.height,ut.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,jt,$t,ut.data)):e.texImage3D(i.TEXTURE_3D,0,Ot,ut.width,ut.height,ut.depth,0,jt,$t,ut.data);else if(T.isFramebufferTexture){if(ye)if(ae)e.texStorage2D(i.TEXTURE_2D,te,Ot,ut.width,ut.height);else{let vt=ut.width,F=ut.height;for(let Et=0;Et<te;Et++)e.texImage2D(i.TEXTURE_2D,Et,Ot,vt,F,0,jt,$t,null),vt>>=1,F>>=1}}else if(Zt.length>0&&se){ae&&ye&&e.texStorage2D(i.TEXTURE_2D,te,Ot,Zt[0].width,Zt[0].height);for(let vt=0,F=Zt.length;vt<F;vt++)Rt=Zt[vt],ae?e.texSubImage2D(i.TEXTURE_2D,vt,0,0,jt,$t,Rt):e.texImage2D(i.TEXTURE_2D,vt,Ot,jt,$t,Rt);T.generateMipmaps=!1}else ae?(ye&&e.texStorage2D(i.TEXTURE_2D,te,Ot,ut.width,ut.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,jt,$t,ut)):e.texImage2D(i.TEXTURE_2D,0,Ot,jt,$t,ut);y(T,se)&&v(ct),Dt.__version=pt.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function H(P,T,Y){if(T.image.length!==6)return;let ct=rt(P,T),ft=T.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+Y);let pt=n.get(ft);if(ft.version!==pt.__version||ct===!0){e.activeTexture(i.TEXTURE0+Y);let Dt=le.getPrimaries(le.workingColorSpace),St=T.colorSpace===Wn?null:le.getPrimaries(T.colorSpace),Ct=T.colorSpace===Wn||Dt===St?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);let Ft=T.isCompressedTexture||T.image[0].isCompressedTexture,Kt=T.image[0]&&T.image[0].isDataTexture,ut=[];for(let vt=0;vt<6;vt++)!Ft&&!Kt?ut[vt]=g(T.image[vt],!1,!0,r.maxCubemapSize):ut[vt]=Kt?T.image[vt].image:T.image[vt],ut[vt]=wt(T,ut[vt]);let se=ut[0],jt=m(se)||o,$t=s.convert(T.format,T.colorSpace),Ot=s.convert(T.type),Rt=b(T.internalFormat,$t,Ot,T.colorSpace),Zt=o&&T.isVideoTexture!==!0,ae=pt.__version===void 0||ct===!0,ye=w(T,se,jt);j(i.TEXTURE_CUBE_MAP,T,jt);let te;if(Ft){Zt&&ae&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ye,Rt,se.width,se.height);for(let vt=0;vt<6;vt++){te=ut[vt].mipmaps;for(let F=0;F<te.length;F++){let Et=te[F];T.format!==ni?$t!==null?Zt?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,F,0,0,Et.width,Et.height,$t,Et.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,F,Rt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Zt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,F,0,0,Et.width,Et.height,$t,Ot,Et.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,F,Rt,Et.width,Et.height,0,$t,Ot,Et.data)}}}else{te=T.mipmaps,Zt&&ae&&(te.length>0&&ye++,e.texStorage2D(i.TEXTURE_CUBE_MAP,ye,Rt,ut[0].width,ut[0].height));for(let vt=0;vt<6;vt++)if(Kt){Zt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,ut[vt].width,ut[vt].height,$t,Ot,ut[vt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,Rt,ut[vt].width,ut[vt].height,0,$t,Ot,ut[vt].data);for(let F=0;F<te.length;F++){let Mt=te[F].image[vt].image;Zt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,F+1,0,0,Mt.width,Mt.height,$t,Ot,Mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,F+1,Rt,Mt.width,Mt.height,0,$t,Ot,Mt.data)}}else{Zt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,$t,Ot,ut[vt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,Rt,$t,Ot,ut[vt]);for(let F=0;F<te.length;F++){let Et=te[F];Zt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,F+1,0,0,$t,Ot,Et.image[vt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,F+1,Rt,$t,Ot,Et.image[vt])}}}y(T,jt)&&v(i.TEXTURE_CUBE_MAP),pt.__version=ft.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function z(P,T,Y,ct,ft,pt){let Dt=s.convert(Y.format,Y.colorSpace),St=s.convert(Y.type),Ct=b(Y.internalFormat,Dt,St,Y.colorSpace);if(!n.get(T).__hasExternalTextures){let Kt=Math.max(1,T.width>>pt),ut=Math.max(1,T.height>>pt);ft===i.TEXTURE_3D||ft===i.TEXTURE_2D_ARRAY?e.texImage3D(ft,pt,Ct,Kt,ut,T.depth,0,Dt,St,null):e.texImage2D(ft,pt,Ct,Kt,ut,0,Dt,St,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),ht(T)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ct,ft,n.get(Y).__webglTexture,0,at(T)):(ft===i.TEXTURE_2D||ft>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ft<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ct,ft,n.get(Y).__webglTexture,pt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function $(P,T,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,P),T.depthBuffer&&!T.stencilBuffer){let ct=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(Y||ht(T)){let ft=T.depthTexture;ft&&ft.isDepthTexture&&(ft.type===nr?ct=i.DEPTH_COMPONENT32F:ft.type===er&&(ct=i.DEPTH_COMPONENT24));let pt=at(T);ht(T)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt,ct,T.width,T.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,pt,ct,T.width,T.height)}else i.renderbufferStorage(i.RENDERBUFFER,ct,T.width,T.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,P)}else if(T.depthBuffer&&T.stencilBuffer){let ct=at(T);Y&&ht(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,i.DEPTH24_STENCIL8,T.width,T.height):ht(T)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,i.DEPTH24_STENCIL8,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,P)}else{let ct=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let ft=0;ft<ct.length;ft++){let pt=ct[ft],Dt=s.convert(pt.format,pt.colorSpace),St=s.convert(pt.type),Ct=b(pt.internalFormat,Dt,St,pt.colorSpace),Ft=at(T);Y&&ht(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ft,Ct,T.width,T.height):ht(T)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ft,Ct,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,Ct,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function A(P,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),G(T.depthTexture,0);let ct=n.get(T.depthTexture).__webglTexture,ft=at(T);if(T.depthTexture.format===kr)ht(T)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ct,0,ft):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ct,0);else if(T.depthTexture.format===zs)ht(T)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ct,0,ft):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ct,0);else throw new Error("Unknown depthTexture format")}function N(P){let T=n.get(P),Y=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!T.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");A(T.__webglFramebuffer,P)}else if(Y){T.__webglDepthbuffer=[];for(let ct=0;ct<6;ct++)e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[ct]),T.__webglDepthbuffer[ct]=i.createRenderbuffer(),$(T.__webglDepthbuffer[ct],P,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=i.createRenderbuffer(),$(T.__webglDepthbuffer,P,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function X(P,T,Y){let ct=n.get(P);T!==void 0&&z(ct.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&N(P)}function I(P){let T=P.texture,Y=n.get(P),ct=n.get(T);P.addEventListener("dispose",C),P.isWebGLMultipleRenderTargets!==!0&&(ct.__webglTexture===void 0&&(ct.__webglTexture=i.createTexture()),ct.__version=T.version,a.memory.textures++);let ft=P.isWebGLCubeRenderTarget===!0,pt=P.isWebGLMultipleRenderTargets===!0,Dt=m(P)||o;if(ft){Y.__webglFramebuffer=[];for(let St=0;St<6;St++)if(o&&T.mipmaps&&T.mipmaps.length>0){Y.__webglFramebuffer[St]=[];for(let Ct=0;Ct<T.mipmaps.length;Ct++)Y.__webglFramebuffer[St][Ct]=i.createFramebuffer()}else Y.__webglFramebuffer[St]=i.createFramebuffer()}else{if(o&&T.mipmaps&&T.mipmaps.length>0){Y.__webglFramebuffer=[];for(let St=0;St<T.mipmaps.length;St++)Y.__webglFramebuffer[St]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(pt)if(r.drawBuffers){let St=P.texture;for(let Ct=0,Ft=St.length;Ct<Ft;Ct++){let Kt=n.get(St[Ct]);Kt.__webglTexture===void 0&&(Kt.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&P.samples>0&&ht(P)===!1){let St=pt?T:[T];Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let Ct=0;Ct<St.length;Ct++){let Ft=St[Ct];Y.__webglColorRenderbuffer[Ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[Ct]);let Kt=s.convert(Ft.format,Ft.colorSpace),ut=s.convert(Ft.type),se=b(Ft.internalFormat,Kt,ut,Ft.colorSpace,P.isXRRenderTarget===!0),jt=at(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,jt,se,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.RENDERBUFFER,Y.__webglColorRenderbuffer[Ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),$(Y.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ft){e.bindTexture(i.TEXTURE_CUBE_MAP,ct.__webglTexture),j(i.TEXTURE_CUBE_MAP,T,Dt);for(let St=0;St<6;St++)if(o&&T.mipmaps&&T.mipmaps.length>0)for(let Ct=0;Ct<T.mipmaps.length;Ct++)z(Y.__webglFramebuffer[St][Ct],P,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+St,Ct);else z(Y.__webglFramebuffer[St],P,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+St,0);y(T,Dt)&&v(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){let St=P.texture;for(let Ct=0,Ft=St.length;Ct<Ft;Ct++){let Kt=St[Ct],ut=n.get(Kt);e.bindTexture(i.TEXTURE_2D,ut.__webglTexture),j(i.TEXTURE_2D,Kt,Dt),z(Y.__webglFramebuffer,P,Kt,i.COLOR_ATTACHMENT0+Ct,i.TEXTURE_2D,0),y(Kt,Dt)&&v(i.TEXTURE_2D)}e.unbindTexture()}else{let St=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(o?St=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(St,ct.__webglTexture),j(St,T,Dt),o&&T.mipmaps&&T.mipmaps.length>0)for(let Ct=0;Ct<T.mipmaps.length;Ct++)z(Y.__webglFramebuffer[Ct],P,T,i.COLOR_ATTACHMENT0,St,Ct);else z(Y.__webglFramebuffer,P,T,i.COLOR_ATTACHMENT0,St,0);y(T,Dt)&&v(St),e.unbindTexture()}P.depthBuffer&&N(P)}function xt(P){let T=m(P)||o,Y=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let ct=0,ft=Y.length;ct<ft;ct++){let pt=Y[ct];if(y(pt,T)){let Dt=P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,St=n.get(pt).__webglTexture;e.bindTexture(Dt,St),v(Dt),e.unbindTexture()}}}function dt(P){if(o&&P.samples>0&&ht(P)===!1){let T=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],Y=P.width,ct=P.height,ft=i.COLOR_BUFFER_BIT,pt=[],Dt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=n.get(P),Ct=P.isWebGLMultipleRenderTargets===!0;if(Ct)for(let Ft=0;Ft<T.length;Ft++)e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ft,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ft,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let Ft=0;Ft<T.length;Ft++){pt.push(i.COLOR_ATTACHMENT0+Ft),P.depthBuffer&&pt.push(Dt);let Kt=St.__ignoreDepthValues!==void 0?St.__ignoreDepthValues:!1;if(Kt===!1&&(P.depthBuffer&&(ft|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&(ft|=i.STENCIL_BUFFER_BIT)),Ct&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,St.__webglColorRenderbuffer[Ft]),Kt===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Dt]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Dt])),Ct){let ut=n.get(T[Ft]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ut,0)}i.blitFramebuffer(0,0,Y,ct,0,0,Y,ct,ft,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pt)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Ct)for(let Ft=0;Ft<T.length;Ft++){e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ft,i.RENDERBUFFER,St.__webglColorRenderbuffer[Ft]);let Kt=n.get(T[Ft]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ft,i.TEXTURE_2D,Kt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}}function at(P){return Math.min(r.maxSamples,P.samples)}function ht(P){let T=n.get(P);return o&&P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Nt(P){let T=a.render.frame;u.get(P)!==T&&(u.set(P,T),P.update())}function wt(P,T){let Y=P.colorSpace,ct=P.format,ft=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===Gu||Y!==Ni&&Y!==Wn&&(le.getTransfer(Y)===me?o===!1?t.has("EXT_sRGB")===!0&&ct===ni?(P.format=Gu,P.minFilter=Hn,P.generateMipmaps=!1):T=hl.sRGBToLinear(T):(ct!==ni||ft!==rr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),T}this.allocateTextureUnit=D,this.resetTextureUnits=q,this.setTexture2D=G,this.setTexture2DArray=K,this.setTexture3D=tt,this.setTextureCube=et,this.rebindTextures=X,this.setupRenderTarget=I,this.updateRenderTargetMipmap=xt,this.updateMultisampleRenderTarget=dt,this.setupDepthRenderbuffer=N,this.setupFrameBufferTexture=z,this.useMultisampledRTT=ht}function gb(i,t,e){let n=e.isWebGL2;function r(s,a=Wn){let o,l=le.getTransfer(a);if(s===rr)return i.UNSIGNED_BYTE;if(s===Kp)return i.UNSIGNED_SHORT_4_4_4_4;if(s===jp)return i.UNSIGNED_SHORT_5_5_5_1;if(s===K_)return i.BYTE;if(s===j_)return i.SHORT;if(s===Th)return i.UNSIGNED_SHORT;if(s===Jp)return i.INT;if(s===er)return i.UNSIGNED_INT;if(s===nr)return i.FLOAT;if(s===ii)return n?i.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Q_)return i.ALPHA;if(s===ni)return i.RGBA;if(s===tx)return i.LUMINANCE;if(s===ex)return i.LUMINANCE_ALPHA;if(s===kr)return i.DEPTH_COMPONENT;if(s===zs)return i.DEPTH_STENCIL;if(s===Gu)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===nx)return i.RED;if(s===Qp)return i.RED_INTEGER;if(s===ix)return i.RG;if(s===tm)return i.RG_INTEGER;if(s===em)return i.RGBA_INTEGER;if(s===ou||s===lu||s===cu||s===uu)if(l===me)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===ou)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===lu)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===cu)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===uu)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===ou)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===lu)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===cu)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===uu)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ef||s===Tf||s===wf||s===Af)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Ef)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Tf)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===wf)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Af)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===nm)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Cf||s===Rf)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Cf)return l===me?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Rf)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Pf||s===Lf||s===If||s===Df||s===Uf||s===Nf||s===Of||s===Ff||s===Bf||s===zf||s===kf||s===Vf||s===Hf||s===Gf)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Pf)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Lf)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===If)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Df)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Uf)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Nf)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Of)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ff)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Bf)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===zf)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===kf)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Vf)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Hf)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Gf)return l===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===hu||s===Wf||s===Xf)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(s===hu)return l===me?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Wf)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Xf)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===rx||s===qf||s===$f||s===Yf)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(s===hu)return o.COMPRESSED_RED_RGTC1_EXT;if(s===qf)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===$f)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Yf)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===zr?n?i.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}var rh=class extends an{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Ui=class extends qe{constructor(){super(),this.isGroup=!0,this.type="Group"}},_b={type:"move"},Ga=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ui,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ui,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ui,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let g of t.hand.values()){let m=e.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,x=.005;c.inputState.pinching&&d>f+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_b)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ui;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},sh=class extends ar{constructor(t,e){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,x=null,g=e.getContextAttributes(),m=null,p=null,y=[],v=[],b=new Vt,w=null,M=new an;M.layers.enable(1),M.viewport=new Ee;let E=new an;E.layers.enable(2),E.viewport=new Ee;let C=[M,E],_=new rh;_.layers.enable(1),_.layers.enable(2);let S=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let rt=y[j];return rt===void 0&&(rt=new Ga,y[j]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(j){let rt=y[j];return rt===void 0&&(rt=new Ga,y[j]=rt),rt.getGripSpace()},this.getHand=function(j){let rt=y[j];return rt===void 0&&(rt=new Ga,y[j]=rt),rt.getHandSpace()};function U(j){let rt=v.indexOf(j.inputSource);if(rt===-1)return;let O=y[rt];O!==void 0&&(O.update(j.inputSource,j.frame,c||a),O.dispatchEvent({type:j.type,data:j.inputSource}))}function q(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",D);for(let j=0;j<y.length;j++){let rt=v[j];rt!==null&&(v[j]=null,y[j].disconnect(rt))}S=null,L=null,t.setRenderTarget(m),f=null,d=null,h=null,r=null,p=null,_t.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(m=t.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",q),r.addEventListener("inputsourceschange",D),g.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(b),r.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let rt={antialias:r.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,e,rt),r.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new _n(f.framebufferWidth,f.framebufferHeight,{format:ni,type:rr,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let rt=null,O=null,H=null;g.depth&&(H=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=g.stencil?zs:kr,O=g.stencil?zr:er);let z={colorFormat:e.RGBA8,depthFormat:H,scaleFactor:s};h=new XRWebGLBinding(r,e),d=h.createProjectionLayer(z),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),p=new _n(d.textureWidth,d.textureHeight,{format:ni,type:rr,depthTexture:new yl(d.textureWidth,d.textureHeight,O,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0});let $=t.properties.get(p);$.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),_t.setContext(r),_t.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function D(j){for(let rt=0;rt<j.removed.length;rt++){let O=j.removed[rt],H=v.indexOf(O);H>=0&&(v[H]=null,y[H].disconnect(O))}for(let rt=0;rt<j.added.length;rt++){let O=j.added[rt],H=v.indexOf(O);if(H===-1){for(let $=0;$<y.length;$++)if($>=v.length){v.push(O),H=$;break}else if(v[$]===null){v[$]=O,H=$;break}if(H===-1)break}let z=y[H];z&&z.connect(O)}}let B=new k,G=new k;function K(j,rt,O){B.setFromMatrixPosition(rt.matrixWorld),G.setFromMatrixPosition(O.matrixWorld);let H=B.distanceTo(G),z=rt.projectionMatrix.elements,$=O.projectionMatrix.elements,A=z[14]/(z[10]-1),N=z[14]/(z[10]+1),X=(z[9]+1)/z[5],I=(z[9]-1)/z[5],xt=(z[8]-1)/z[0],dt=($[8]+1)/$[0],at=A*xt,ht=A*dt,Nt=H/(-xt+dt),wt=Nt*-xt;rt.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(wt),j.translateZ(Nt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();let P=A+Nt,T=N+Nt,Y=at-wt,ct=ht+(H-wt),ft=X*N/T*P,pt=I*N/T*P;j.projectionMatrix.makePerspective(Y,ct,ft,pt,P,T),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}function tt(j,rt){rt===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(rt.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;_.near=E.near=M.near=j.near,_.far=E.far=M.far=j.far,(S!==_.near||L!==_.far)&&(r.updateRenderState({depthNear:_.near,depthFar:_.far}),S=_.near,L=_.far);let rt=j.parent,O=_.cameras;tt(_,rt);for(let H=0;H<O.length;H++)tt(O[H],rt);O.length===2?K(_,M,E):_.projectionMatrix.copy(M.projectionMatrix),et(j,_,rt)};function et(j,rt,O){O===null?j.matrix.copy(rt.matrixWorld):(j.matrix.copy(O.matrixWorld),j.matrix.invert(),j.matrix.multiply(rt.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(rt.projectionMatrix),j.projectionMatrixInverse.copy(rt.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Xa*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)};let it=null;function st(j,rt){if(u=rt.getViewerPose(c||a),x=rt,u!==null){let O=u.views;f!==null&&(t.setRenderTargetFramebuffer(p,f.framebuffer),t.setRenderTarget(p));let H=!1;O.length!==_.cameras.length&&(_.cameras.length=0,H=!0);for(let z=0;z<O.length;z++){let $=O[z],A=null;if(f!==null)A=f.getViewport($);else{let X=h.getViewSubImage(d,$);A=X.viewport,z===0&&(t.setRenderTargetTextures(p,X.colorTexture,d.ignoreDepthValues?void 0:X.depthStencilTexture),t.setRenderTarget(p))}let N=C[z];N===void 0&&(N=new an,N.layers.enable(z),N.viewport=new Ee,C[z]=N),N.matrix.fromArray($.transform.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale),N.projectionMatrix.fromArray($.projectionMatrix),N.projectionMatrixInverse.copy(N.projectionMatrix).invert(),N.viewport.set(A.x,A.y,A.width,A.height),z===0&&(_.matrix.copy(N.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),H===!0&&_.cameras.push(N)}}for(let O=0;O<y.length;O++){let H=v[O],z=y[O];H!==null&&z!==void 0&&z.update(H,rt,c||a)}it&&it(j,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),x=null}let _t=new um;_t.setAnimationLoop(st),this.setAnimationLoop=function(j){it=j},this.dispose=function(){}}};function xb(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,cm(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,y,v,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(s(m,p),x(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,y,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===on&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===on&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let y=t.get(p).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let v=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*v,e(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),t.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===on&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){let y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function vb(i,t,e,n){let r={},s={},a=[],o=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,v){let b=v.program;n.uniformBlockBinding(y,b)}function c(y,v){let b=r[y.id];b===void 0&&(x(y),b=u(y),r[y.id]=b,y.addEventListener("dispose",m));let w=v.program;n.updateUBOMapping(y,w);let M=t.render.frame;s[y.id]!==M&&(d(y),s[y.id]=M)}function u(y){let v=h();y.__bindingPointIndex=v;let b=i.createBuffer(),w=y.__size,M=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,w,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,b),b}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){let v=r[y.id],b=y.uniforms,w=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let M=0,E=b.length;M<E;M++){let C=Array.isArray(b[M])?b[M]:[b[M]];for(let _=0,S=C.length;_<S;_++){let L=C[_];if(f(L,M,_,w)===!0){let U=L.__offset,q=Array.isArray(L.value)?L.value:[L.value],D=0;for(let B=0;B<q.length;B++){let G=q[B],K=g(G);typeof G=="number"||typeof G=="boolean"?(L.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,U+D,L.__data)):G.isMatrix3?(L.__data[0]=G.elements[0],L.__data[1]=G.elements[1],L.__data[2]=G.elements[2],L.__data[3]=0,L.__data[4]=G.elements[3],L.__data[5]=G.elements[4],L.__data[6]=G.elements[5],L.__data[7]=0,L.__data[8]=G.elements[6],L.__data[9]=G.elements[7],L.__data[10]=G.elements[8],L.__data[11]=0):(G.toArray(L.__data,D),D+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,v,b,w){let M=y.value,E=v+"_"+b;if(w[E]===void 0)return typeof M=="number"||typeof M=="boolean"?w[E]=M:w[E]=M.clone(),!0;{let C=w[E];if(typeof M=="number"||typeof M=="boolean"){if(C!==M)return w[E]=M,!0}else if(C.equals(M)===!1)return C.copy(M),!0}return!1}function x(y){let v=y.uniforms,b=0,w=16;for(let E=0,C=v.length;E<C;E++){let _=Array.isArray(v[E])?v[E]:[v[E]];for(let S=0,L=_.length;S<L;S++){let U=_[S],q=Array.isArray(U.value)?U.value:[U.value];for(let D=0,B=q.length;D<B;D++){let G=q[D],K=g(G),tt=b%w;tt!==0&&w-tt<K.boundary&&(b+=w-tt),U.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=b,b+=K.storage}}}let M=b%w;return M>0&&(b+=w-M),y.__size=b,y.__cache={},this}function g(y){let v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){let v=y.target;v.removeEventListener("dispose",m);let b=a.indexOf(v.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function p(){for(let y in r)i.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:l,update:c,dispose:p}}var $a=class{constructor(t={}){let{canvas:e=Rx(),context:n=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;let f=new Uint32Array(4),x=new Int32Array(4),g=null,m=null,p=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ze,this._useLegacyLights=!1,this.toneMapping=ir,this.toneMappingExposure=1;let v=this,b=!1,w=0,M=0,E=null,C=-1,_=null,S=new Ee,L=new Ee,U=null,q=new Lt(0),D=0,B=e.width,G=e.height,K=1,tt=null,et=null,it=new Ee(0,0,B,G),st=new Ee(0,0,B,G),_t=!1,j=new qa,rt=!1,O=!1,H=null,z=new Ce,$=new Vt,A=new k,N={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function X(){return E===null?K:1}let I=n;function xt(R,W){for(let J=0;J<R.length;J++){let Q=R[J],Z=e.getContext(Q,W);if(Z!==null)return Z}return null}try{let R={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${yh}`),e.addEventListener("webglcontextlost",vt,!1),e.addEventListener("webglcontextrestored",F,!1),e.addEventListener("webglcontextcreationerror",Et,!1),I===null){let W=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&W.shift(),I=xt(W,R),I===null)throw xt(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&I instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),I.getShaderPrecisionFormat===void 0&&(I.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let dt,at,ht,Nt,wt,P,T,Y,ct,ft,pt,Dt,St,Ct,Ft,Kt,ut,se,jt,$t,Ot,Rt,Zt,ae;function ye(){dt=new B1(I),at=new I1(I,dt,t),dt.init(at),Rt=new gb(I,dt,at),ht=new pb(I,dt,at),Nt=new V1(I),wt=new nb,P=new mb(I,dt,ht,wt,at,Rt,Nt),T=new U1(v),Y=new F1(v),ct=new Zx(I,at),Zt=new P1(I,dt,ct,at),ft=new z1(I,ct,Nt,Zt),pt=new X1(I,ft,ct,Nt),jt=new W1(I,at,P),Kt=new D1(wt),Dt=new eb(v,T,Y,dt,at,Zt,Kt),St=new xb(v,wt),Ct=new rb,Ft=new ub(dt,at),se=new R1(v,T,Y,ht,pt,d,l),ut=new fb(v,pt,at),ae=new vb(I,Nt,at,ht),$t=new L1(I,dt,Nt,at),Ot=new k1(I,dt,Nt,at),Nt.programs=Dt.programs,v.capabilities=at,v.extensions=dt,v.properties=wt,v.renderLists=Ct,v.shadowMap=ut,v.state=ht,v.info=Nt}ye();let te=new sh(v,I);this.xr=te,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let R=dt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=dt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(R){R!==void 0&&(K=R,this.setSize(B,G,!1))},this.getSize=function(R){return R.set(B,G)},this.setSize=function(R,W,J=!0){if(te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=R,G=W,e.width=Math.floor(R*K),e.height=Math.floor(W*K),J===!0&&(e.style.width=R+"px",e.style.height=W+"px"),this.setViewport(0,0,R,W)},this.getDrawingBufferSize=function(R){return R.set(B*K,G*K).floor()},this.setDrawingBufferSize=function(R,W,J){B=R,G=W,K=J,e.width=Math.floor(R*J),e.height=Math.floor(W*J),this.setViewport(0,0,R,W)},this.getCurrentViewport=function(R){return R.copy(S)},this.getViewport=function(R){return R.copy(it)},this.setViewport=function(R,W,J,Q){R.isVector4?it.set(R.x,R.y,R.z,R.w):it.set(R,W,J,Q),ht.viewport(S.copy(it).multiplyScalar(K).floor())},this.getScissor=function(R){return R.copy(st)},this.setScissor=function(R,W,J,Q){R.isVector4?st.set(R.x,R.y,R.z,R.w):st.set(R,W,J,Q),ht.scissor(L.copy(st).multiplyScalar(K).floor())},this.getScissorTest=function(){return _t},this.setScissorTest=function(R){ht.setScissorTest(_t=R)},this.setOpaqueSort=function(R){tt=R},this.setTransparentSort=function(R){et=R},this.getClearColor=function(R){return R.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor.apply(se,arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha.apply(se,arguments)},this.clear=function(R=!0,W=!0,J=!0){let Q=0;if(R){let Z=!1;if(E!==null){let At=E.texture.format;Z=At===em||At===tm||At===Qp}if(Z){let At=E.texture.type,Ut=At===rr||At===er||At===Th||At===zr||At===Kp||At===jp,kt=se.getClearColor(),Wt=se.getClearAlpha(),Yt=kt.r,Xt=kt.g,Jt=kt.b;Ut?(f[0]=Yt,f[1]=Xt,f[2]=Jt,f[3]=Wt,I.clearBufferuiv(I.COLOR,0,f)):(x[0]=Yt,x[1]=Xt,x[2]=Jt,x[3]=Wt,I.clearBufferiv(I.COLOR,0,x))}else Q|=I.COLOR_BUFFER_BIT}W&&(Q|=I.DEPTH_BUFFER_BIT),J&&(Q|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",vt,!1),e.removeEventListener("webglcontextrestored",F,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),Ct.dispose(),Ft.dispose(),wt.dispose(),T.dispose(),Y.dispose(),pt.dispose(),Zt.dispose(),ae.dispose(),Dt.dispose(),te.dispose(),te.removeEventListener("sessionstart",Ue),te.removeEventListener("sessionend",oe),H&&(H.dispose(),H=null),$e.stop()};function vt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function F(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let R=Nt.autoReset,W=ut.enabled,J=ut.autoUpdate,Q=ut.needsUpdate,Z=ut.type;ye(),Nt.autoReset=R,ut.enabled=W,ut.autoUpdate=J,ut.needsUpdate=Q,ut.type=Z}function Et(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Mt(R){let W=R.target;W.removeEventListener("dispose",Mt),Gt(W)}function Gt(R){zt(R),wt.remove(R)}function zt(R){let W=wt.get(R).programs;W!==void 0&&(W.forEach(function(J){Dt.releaseProgram(J)}),R.isShaderMaterial&&Dt.releaseShaderCache(R))}this.renderBufferDirect=function(R,W,J,Q,Z,At){W===null&&(W=N);let Ut=Z.isMesh&&Z.matrixWorld.determinant()<0,kt=hc(R,W,J,Q,Z);ht.setMaterial(Q,Ut);let Wt=J.index,Yt=1;if(Q.wireframe===!0){if(Wt=ft.getWireframeAttribute(J),Wt===void 0)return;Yt=2}let Xt=J.drawRange,Jt=J.attributes.position,xe=Xt.start*Yt,un=(Xt.start+Xt.count)*Yt;At!==null&&(xe=Math.max(xe,At.start*Yt),un=Math.min(un,(At.start+At.count)*Yt)),Wt!==null?(xe=Math.max(xe,0),un=Math.min(un,Wt.count)):Jt!=null&&(xe=Math.max(xe,0),un=Math.min(un,Jt.count));let Le=un-xe;if(Le<0||Le===1/0)return;Zt.setup(Z,Q,kt,J,Wt);let Nn,de=$t;if(Wt!==null&&(Nn=ct.get(Wt),de=Ot,de.setIndex(Nn)),Z.isMesh)Q.wireframe===!0?(ht.setLineWidth(Q.wireframeLinewidth*X()),de.setMode(I.LINES)):de.setMode(I.TRIANGLES);else if(Z.isLine){let Qt=Q.linewidth;Qt===void 0&&(Qt=1),ht.setLineWidth(Qt*X()),Z.isLineSegments?de.setMode(I.LINES):Z.isLineLoop?de.setMode(I.LINE_LOOP):de.setMode(I.LINE_STRIP)}else Z.isPoints?de.setMode(I.POINTS):Z.isSprite&&de.setMode(I.TRIANGLES);if(Z.isBatchedMesh)de.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else if(Z.isInstancedMesh)de.renderInstances(xe,Le,Z.count);else if(J.isInstancedBufferGeometry){let Qt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,pa=Math.min(J.instanceCount,Qt);de.renderInstances(xe,Le,pa)}else de.render(xe,Le)};function ue(R,W,J){R.transparent===!0&&R.side===Gn&&R.forceSinglePass===!1?(R.side=on,R.needsUpdate=!0,He(R,W,J),R.side=sr,R.needsUpdate=!0,He(R,W,J),R.side=Gn):He(R,W,J)}this.compile=function(R,W,J=null){J===null&&(J=R),m=Ft.get(J),m.init(),y.push(m),J.traverseVisible(function(Z){Z.isLight&&Z.layers.test(W.layers)&&(m.pushLight(Z),Z.castShadow&&m.pushShadow(Z))}),R!==J&&R.traverseVisible(function(Z){Z.isLight&&Z.layers.test(W.layers)&&(m.pushLight(Z),Z.castShadow&&m.pushShadow(Z))}),m.setupLights(v._useLegacyLights);let Q=new Set;return R.traverse(function(Z){let At=Z.material;if(At)if(Array.isArray(At))for(let Ut=0;Ut<At.length;Ut++){let kt=At[Ut];ue(kt,J,Z),Q.add(kt)}else ue(At,J,Z),Q.add(At)}),y.pop(),m=null,Q},this.compileAsync=function(R,W,J=null){let Q=this.compile(R,W,J);return new Promise(Z=>{function At(){if(Q.forEach(function(Ut){wt.get(Ut).currentProgram.isReady()&&Q.delete(Ut)}),Q.size===0){Z(R);return}setTimeout(At,10)}dt.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let he=null;function De(R){he&&he(R)}function Ue(){$e.stop()}function oe(){$e.start()}let $e=new um;$e.setAnimationLoop(De),typeof self<"u"&&$e.setContext(self),this.setAnimationLoop=function(R){he=R,te.setAnimationLoop(R),R===null?$e.stop():$e.start()},te.addEventListener("sessionstart",Ue),te.addEventListener("sessionend",oe),this.render=function(R,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(te.cameraAutoUpdate===!0&&te.updateCamera(W),W=te.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,W,E),m=Ft.get(R,y.length),m.init(),y.push(m),z.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),j.setFromProjectionMatrix(z),O=this.localClippingEnabled,rt=Kt.init(this.clippingPlanes,O),g=Ct.get(R,p.length),g.init(),p.push(g),Zn(R,W,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(tt,et),this.info.render.frame++,rt===!0&&Kt.beginShadows();let J=m.state.shadowsArray;if(ut.render(J,R,W),rt===!0&&Kt.endShadows(),this.info.autoReset===!0&&this.info.reset(),se.render(g,R),m.setupLights(v._useLegacyLights),W.isArrayCamera){let Q=W.cameras;for(let Z=0,At=Q.length;Z<At;Z++){let Ut=Q[Z];ne(g,R,Ut,Ut.viewport)}}else ne(g,R,W);E!==null&&(P.updateMultisampleRenderTarget(E),P.updateRenderTargetMipmap(E)),R.isScene===!0&&R.onAfterRender(v,R,W),Zt.resetDefaultState(),C=-1,_=null,y.pop(),y.length>0?m=y[y.length-1]:m=null,p.pop(),p.length>0?g=p[p.length-1]:g=null};function Zn(R,W,J,Q){if(R.visible===!1)return;if(R.layers.test(W.layers)){if(R.isGroup)J=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(W);else if(R.isLight)m.pushLight(R),R.castShadow&&m.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||j.intersectsSprite(R)){Q&&A.setFromMatrixPosition(R.matrixWorld).applyMatrix4(z);let Ut=pt.update(R),kt=R.material;kt.visible&&g.push(R,Ut,kt,J,A.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||j.intersectsObject(R))){let Ut=pt.update(R),kt=R.material;if(Q&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),A.copy(R.boundingSphere.center)):(Ut.boundingSphere===null&&Ut.computeBoundingSphere(),A.copy(Ut.boundingSphere.center)),A.applyMatrix4(R.matrixWorld).applyMatrix4(z)),Array.isArray(kt)){let Wt=Ut.groups;for(let Yt=0,Xt=Wt.length;Yt<Xt;Yt++){let Jt=Wt[Yt],xe=kt[Jt.materialIndex];xe&&xe.visible&&g.push(R,Ut,xe,J,A.z,Jt)}}else kt.visible&&g.push(R,Ut,kt,J,A.z,null)}}let At=R.children;for(let Ut=0,kt=At.length;Ut<kt;Ut++)Zn(At[Ut],W,J,Q)}function ne(R,W,J,Q){let Z=R.opaque,At=R.transmissive,Ut=R.transparent;m.setupLightsView(J),rt===!0&&Kt.setGlobalState(v.clippingPlanes,J),At.length>0&&Jn(Z,At,W,J),Q&&ht.viewport(S.copy(Q)),Z.length>0&&Ye(Z,W,J),At.length>0&&Ye(At,W,J),Ut.length>0&&Ye(Ut,W,J),ht.buffers.depth.setTest(!0),ht.buffers.depth.setMask(!0),ht.buffers.color.setMask(!0),ht.setPolygonOffset(!1)}function Jn(R,W,J,Q){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;let At=at.isWebGL2;H===null&&(H=new _n(1,1,{generateMipmaps:!0,type:dt.has("EXT_color_buffer_half_float")?ii:rr,minFilter:Wa,samples:At?4:0})),v.getDrawingBufferSize($),At?H.setSize($.x,$.y):H.setSize(cl($.x),cl($.y));let Ut=v.getRenderTarget();v.setRenderTarget(H),v.getClearColor(q),D=v.getClearAlpha(),D<1&&v.setClearColor(16777215,.5),v.clear();let kt=v.toneMapping;v.toneMapping=ir,Ye(R,J,Q),P.updateMultisampleRenderTarget(H),P.updateRenderTargetMipmap(H);let Wt=!1;for(let Yt=0,Xt=W.length;Yt<Xt;Yt++){let Jt=W[Yt],xe=Jt.object,un=Jt.geometry,Le=Jt.material,Nn=Jt.group;if(Le.side===Gn&&xe.layers.test(Q.layers)){let de=Le.side;Le.side=on,Le.needsUpdate=!0,cn(xe,J,Q,un,Le,Nn),Le.side=de,Le.needsUpdate=!0,Wt=!0}}Wt===!0&&(P.updateMultisampleRenderTarget(H),P.updateRenderTargetMipmap(H)),v.setRenderTarget(Ut),v.setClearColor(q,D),v.toneMapping=kt}function Ye(R,W,J){let Q=W.isScene===!0?W.overrideMaterial:null;for(let Z=0,At=R.length;Z<At;Z++){let Ut=R[Z],kt=Ut.object,Wt=Ut.geometry,Yt=Q===null?Ut.material:Q,Xt=Ut.group;kt.layers.test(J.layers)&&cn(kt,W,J,Wt,Yt,Xt)}}function cn(R,W,J,Q,Z,At){R.onBeforeRender(v,W,J,Q,Z,At),R.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),Z.onBeforeRender(v,W,J,Q,R,At),Z.transparent===!0&&Z.side===Gn&&Z.forceSinglePass===!1?(Z.side=on,Z.needsUpdate=!0,v.renderBufferDirect(J,W,Q,Z,R,At),Z.side=sr,Z.needsUpdate=!0,v.renderBufferDirect(J,W,Q,Z,R,At),Z.side=Gn):v.renderBufferDirect(J,W,Q,Z,R,At),R.onAfterRender(v,W,J,Q,Z,At)}function He(R,W,J){W.isScene!==!0&&(W=N);let Q=wt.get(R),Z=m.state.lights,At=m.state.shadowsArray,Ut=Z.state.version,kt=Dt.getParameters(R,Z.state,At,W,J),Wt=Dt.getProgramCacheKey(kt),Yt=Q.programs;Q.environment=R.isMeshStandardMaterial?W.environment:null,Q.fog=W.fog,Q.envMap=(R.isMeshStandardMaterial?Y:T).get(R.envMap||Q.environment),Yt===void 0&&(R.addEventListener("dispose",Mt),Yt=new Map,Q.programs=Yt);let Xt=Yt.get(Wt);if(Xt!==void 0){if(Q.currentProgram===Xt&&Q.lightsStateVersion===Ut)return gr(R,kt),Xt}else kt.uniforms=Dt.getUniforms(R),R.onBuild(J,kt,v),R.onBeforeCompile(kt,v),Xt=Dt.acquireProgram(kt,Wt),Yt.set(Wt,Xt),Q.uniforms=kt.uniforms;let Jt=Q.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Jt.clippingPlanes=Kt.uniform),gr(R,kt),Q.needsLights=_r(R),Q.lightsStateVersion=Ut,Q.needsLights&&(Jt.ambientLightColor.value=Z.state.ambient,Jt.lightProbe.value=Z.state.probe,Jt.directionalLights.value=Z.state.directional,Jt.directionalLightShadows.value=Z.state.directionalShadow,Jt.spotLights.value=Z.state.spot,Jt.spotLightShadows.value=Z.state.spotShadow,Jt.rectAreaLights.value=Z.state.rectArea,Jt.ltc_1.value=Z.state.rectAreaLTC1,Jt.ltc_2.value=Z.state.rectAreaLTC2,Jt.pointLights.value=Z.state.point,Jt.pointLightShadows.value=Z.state.pointShadow,Jt.hemisphereLights.value=Z.state.hemi,Jt.directionalShadowMap.value=Z.state.directionalShadowMap,Jt.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Jt.spotShadowMap.value=Z.state.spotShadowMap,Jt.spotLightMatrix.value=Z.state.spotLightMatrix,Jt.spotLightMap.value=Z.state.spotLightMap,Jt.pointShadowMap.value=Z.state.pointShadowMap,Jt.pointShadowMatrix.value=Z.state.pointShadowMatrix),Q.currentProgram=Xt,Q.uniformsList=null,Xt}function fa(R){if(R.uniformsList===null){let W=R.currentProgram.getUniforms();R.uniformsList=Os.seqWithValue(W.seq,R.uniforms)}return R.uniformsList}function gr(R,W){let J=wt.get(R);J.outputColorSpace=W.outputColorSpace,J.batching=W.batching,J.instancing=W.instancing,J.instancingColor=W.instancingColor,J.skinning=W.skinning,J.morphTargets=W.morphTargets,J.morphNormals=W.morphNormals,J.morphColors=W.morphColors,J.morphTargetsCount=W.morphTargetsCount,J.numClippingPlanes=W.numClippingPlanes,J.numIntersection=W.numClipIntersection,J.vertexAlphas=W.vertexAlphas,J.vertexTangents=W.vertexTangents,J.toneMapping=W.toneMapping}function hc(R,W,J,Q,Z){W.isScene!==!0&&(W=N),P.resetTextureUnits();let At=W.fog,Ut=Q.isMeshStandardMaterial?W.environment:null,kt=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Ni,Wt=(Q.isMeshStandardMaterial?Y:T).get(Q.envMap||Ut),Yt=Q.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Xt=!!J.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Jt=!!J.morphAttributes.position,xe=!!J.morphAttributes.normal,un=!!J.morphAttributes.color,Le=ir;Q.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Le=v.toneMapping);let Nn=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,de=Nn!==void 0?Nn.length:0,Qt=wt.get(Q),pa=m.state.lights;if(rt===!0&&(O===!0||R!==_)){let xn=R===_&&Q.id===C;Kt.setState(Q,R,xn)}let Me=!1;Q.version===Qt.__version?(Qt.needsLights&&Qt.lightsStateVersion!==pa.state.version||Qt.outputColorSpace!==kt||Z.isBatchedMesh&&Qt.batching===!1||!Z.isBatchedMesh&&Qt.batching===!0||Z.isInstancedMesh&&Qt.instancing===!1||!Z.isInstancedMesh&&Qt.instancing===!0||Z.isSkinnedMesh&&Qt.skinning===!1||!Z.isSkinnedMesh&&Qt.skinning===!0||Z.isInstancedMesh&&Qt.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Qt.instancingColor===!1&&Z.instanceColor!==null||Qt.envMap!==Wt||Q.fog===!0&&Qt.fog!==At||Qt.numClippingPlanes!==void 0&&(Qt.numClippingPlanes!==Kt.numPlanes||Qt.numIntersection!==Kt.numIntersection)||Qt.vertexAlphas!==Yt||Qt.vertexTangents!==Xt||Qt.morphTargets!==Jt||Qt.morphNormals!==xe||Qt.morphColors!==un||Qt.toneMapping!==Le||at.isWebGL2===!0&&Qt.morphTargetsCount!==de)&&(Me=!0):(Me=!0,Qt.__version=Q.version);let On=Qt.currentProgram;Me===!0&&(On=He(Q,W,Z));let ma=!1,xr=!1,ki=!1,Ge=On.getUniforms(),vi=Qt.uniforms;if(ht.useProgram(On.program)&&(ma=!0,xr=!0,ki=!0),Q.id!==C&&(C=Q.id,xr=!0),ma||_!==R){Ge.setValue(I,"projectionMatrix",R.projectionMatrix),Ge.setValue(I,"viewMatrix",R.matrixWorldInverse);let xn=Ge.map.cameraPosition;xn!==void 0&&xn.setValue(I,A.setFromMatrixPosition(R.matrixWorld)),at.logarithmicDepthBuffer&&Ge.setValue(I,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&Ge.setValue(I,"isOrthographic",R.isOrthographicCamera===!0),_!==R&&(_=R,xr=!0,ki=!0)}if(Z.isSkinnedMesh){Ge.setOptional(I,Z,"bindMatrix"),Ge.setOptional(I,Z,"bindMatrixInverse");let xn=Z.skeleton;xn&&(at.floatVertexTextures?(xn.boneTexture===null&&xn.computeBoneTexture(),Ge.setValue(I,"boneTexture",xn.boneTexture,P)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Z.isBatchedMesh&&(Ge.setOptional(I,Z,"batchingTexture"),Ge.setValue(I,"batchingTexture",Z._matricesTexture,P));let ga=J.morphAttributes;if((ga.position!==void 0||ga.normal!==void 0||ga.color!==void 0&&at.isWebGL2===!0)&&jt.update(Z,J,On),(xr||Qt.receiveShadow!==Z.receiveShadow)&&(Qt.receiveShadow=Z.receiveShadow,Ge.setValue(I,"receiveShadow",Z.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(vi.envMap.value=Wt,vi.flipEnvMap.value=Wt.isCubeTexture&&Wt.isRenderTargetTexture===!1?-1:1),xr&&(Ge.setValue(I,"toneMappingExposure",v.toneMappingExposure),Qt.needsLights&&zi(vi,ki),At&&Q.fog===!0&&St.refreshFogUniforms(vi,At),St.refreshMaterialUniforms(vi,Q,K,G,H),Os.upload(I,fa(Qt),vi,P)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(Os.upload(I,fa(Qt),vi,P),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&Ge.setValue(I,"center",Z.center),Ge.setValue(I,"modelViewMatrix",Z.modelViewMatrix),Ge.setValue(I,"normalMatrix",Z.normalMatrix),Ge.setValue(I,"modelMatrix",Z.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){let xn=Q.uniformsGroups;for(let _a=0,V=xn.length;_a<V;_a++)if(at.isWebGL2){let nt=xn[_a];ae.update(nt,On),ae.bind(nt,On)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return On}function zi(R,W){R.ambientLightColor.needsUpdate=W,R.lightProbe.needsUpdate=W,R.directionalLights.needsUpdate=W,R.directionalLightShadows.needsUpdate=W,R.pointLights.needsUpdate=W,R.pointLightShadows.needsUpdate=W,R.spotLights.needsUpdate=W,R.spotLightShadows.needsUpdate=W,R.rectAreaLights.needsUpdate=W,R.hemisphereLights.needsUpdate=W}function _r(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(R,W,J){wt.get(R.texture).__webglTexture=W,wt.get(R.depthTexture).__webglTexture=J;let Q=wt.get(R);Q.__hasExternalTextures=!0,Q.__hasExternalTextures&&(Q.__autoAllocateDepthBuffer=J===void 0,Q.__autoAllocateDepthBuffer||dt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,W){let J=wt.get(R);J.__webglFramebuffer=W,J.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(R,W=0,J=0){E=R,w=W,M=J;let Q=!0,Z=null,At=!1,Ut=!1;if(R){let Wt=wt.get(R);Wt.__useDefaultFramebuffer!==void 0?(ht.bindFramebuffer(I.FRAMEBUFFER,null),Q=!1):Wt.__webglFramebuffer===void 0?P.setupRenderTarget(R):Wt.__hasExternalTextures&&P.rebindTextures(R,wt.get(R.texture).__webglTexture,wt.get(R.depthTexture).__webglTexture);let Yt=R.texture;(Yt.isData3DTexture||Yt.isDataArrayTexture||Yt.isCompressedArrayTexture)&&(Ut=!0);let Xt=wt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Xt[W])?Z=Xt[W][J]:Z=Xt[W],At=!0):at.isWebGL2&&R.samples>0&&P.useMultisampledRTT(R)===!1?Z=wt.get(R).__webglMultisampledFramebuffer:Array.isArray(Xt)?Z=Xt[J]:Z=Xt,S.copy(R.viewport),L.copy(R.scissor),U=R.scissorTest}else S.copy(it).multiplyScalar(K).floor(),L.copy(st).multiplyScalar(K).floor(),U=_t;if(ht.bindFramebuffer(I.FRAMEBUFFER,Z)&&at.drawBuffers&&Q&&ht.drawBuffers(R,Z),ht.viewport(S),ht.scissor(L),ht.setScissorTest(U),At){let Wt=wt.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+W,Wt.__webglTexture,J)}else if(Ut){let Wt=wt.get(R.texture),Yt=W||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Wt.__webglTexture,J||0,Yt)}C=-1},this.readRenderTargetPixels=function(R,W,J,Q,Z,At,Ut){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=wt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ut!==void 0&&(kt=kt[Ut]),kt){ht.bindFramebuffer(I.FRAMEBUFFER,kt);try{let Wt=R.texture,Yt=Wt.format,Xt=Wt.type;if(Yt!==ni&&Rt.convert(Yt)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Jt=Xt===ii&&(dt.has("EXT_color_buffer_half_float")||at.isWebGL2&&dt.has("EXT_color_buffer_float"));if(Xt!==rr&&Rt.convert(Xt)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Xt===nr&&(at.isWebGL2||dt.has("OES_texture_float")||dt.has("WEBGL_color_buffer_float")))&&!Jt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=R.width-Q&&J>=0&&J<=R.height-Z&&I.readPixels(W,J,Q,Z,Rt.convert(Yt),Rt.convert(Xt),At)}finally{let Wt=E!==null?wt.get(E).__webglFramebuffer:null;ht.bindFramebuffer(I.FRAMEBUFFER,Wt)}}},this.copyFramebufferToTexture=function(R,W,J=0){let Q=Math.pow(2,-J),Z=Math.floor(W.image.width*Q),At=Math.floor(W.image.height*Q);P.setTexture2D(W,0),I.copyTexSubImage2D(I.TEXTURE_2D,J,0,0,R.x,R.y,Z,At),ht.unbindTexture()},this.copyTextureToTexture=function(R,W,J,Q=0){let Z=W.image.width,At=W.image.height,Ut=Rt.convert(J.format),kt=Rt.convert(J.type);P.setTexture2D(J,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,J.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,J.unpackAlignment),W.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,Q,R.x,R.y,Z,At,Ut,kt,W.image.data):W.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,Q,R.x,R.y,W.mipmaps[0].width,W.mipmaps[0].height,Ut,W.mipmaps[0].data):I.texSubImage2D(I.TEXTURE_2D,Q,R.x,R.y,Ut,kt,W.image),Q===0&&J.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),ht.unbindTexture()},this.copyTextureToTexture3D=function(R,W,J,Q,Z=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let At=R.max.x-R.min.x+1,Ut=R.max.y-R.min.y+1,kt=R.max.z-R.min.z+1,Wt=Rt.convert(Q.format),Yt=Rt.convert(Q.type),Xt;if(Q.isData3DTexture)P.setTexture3D(Q,0),Xt=I.TEXTURE_3D;else if(Q.isDataArrayTexture||Q.isCompressedArrayTexture)P.setTexture2DArray(Q,0),Xt=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,Q.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,Q.unpackAlignment);let Jt=I.getParameter(I.UNPACK_ROW_LENGTH),xe=I.getParameter(I.UNPACK_IMAGE_HEIGHT),un=I.getParameter(I.UNPACK_SKIP_PIXELS),Le=I.getParameter(I.UNPACK_SKIP_ROWS),Nn=I.getParameter(I.UNPACK_SKIP_IMAGES),de=J.isCompressedTexture?J.mipmaps[Z]:J.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,de.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,de.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,R.min.x),I.pixelStorei(I.UNPACK_SKIP_ROWS,R.min.y),I.pixelStorei(I.UNPACK_SKIP_IMAGES,R.min.z),J.isDataTexture||J.isData3DTexture?I.texSubImage3D(Xt,Z,W.x,W.y,W.z,At,Ut,kt,Wt,Yt,de.data):J.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),I.compressedTexSubImage3D(Xt,Z,W.x,W.y,W.z,At,Ut,kt,Wt,de.data)):I.texSubImage3D(Xt,Z,W.x,W.y,W.z,At,Ut,kt,Wt,Yt,de),I.pixelStorei(I.UNPACK_ROW_LENGTH,Jt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,xe),I.pixelStorei(I.UNPACK_SKIP_PIXELS,un),I.pixelStorei(I.UNPACK_SKIP_ROWS,Le),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Nn),Z===0&&Q.generateMipmaps&&I.generateMipmap(Xt),ht.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?P.setTextureCube(R,0):R.isData3DTexture?P.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?P.setTexture2DArray(R,0):P.setTexture2D(R,0),ht.unbindTexture()},this.resetState=function(){w=0,M=0,E=null,ht.reset(),Zt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===wh?"display-p3":"srgb",e.unpackColorSpace=le.workingColorSpace===Dl?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ze?Vr:im}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Vr?ze:Ni}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},ah=class extends $a{};ah.prototype.isWebGL1Renderer=!0;var Ml=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Lt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ws=class extends qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}};var bl=class extends ln{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Rs=new Ce,zp=new Ce,jo=[],kp=new Oi,yb=new Ce,Fa=new Bt,Ba=new or,Sl=class extends Bt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new bl(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,yb)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Oi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Rs),kp.copy(t.boundingBox).applyMatrix4(Rs),this.boundingBox.union(kp)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new or),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Rs),Ba.copy(t.boundingSphere).applyMatrix4(Rs),this.boundingSphere.union(Ba)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){let n=this.matrixWorld,r=this.count;if(Fa.geometry=this.geometry,Fa.material=this.material,Fa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ba.copy(this.boundingSphere),Ba.applyMatrix4(n),t.ray.intersectsSphere(Ba)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Rs),zp.multiplyMatrices(n,Rs),Fa.matrixWorld=zp,Fa.raycast(t,jo);for(let a=0,o=jo.length;a<o;a++){let l=jo[a];l.instanceId=s,l.object=this,e.push(l)}jo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new bl(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Ya=class extends lr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Lt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Vp=new Ce,oh=new pl,Qo=new or,tl=new k,El=class extends qe{constructor(t=new Ke,e=new Ya){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qo.copy(n.boundingSphere),Qo.applyMatrix4(r),Qo.radius+=s,t.ray.intersectsSphere(Qo)===!1)return;Vp.copy(r).invert(),oh.copy(t.ray).applyMatrix4(Vp);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let x=d,g=f;x<g;x++){let m=c.getX(x);tl.fromBufferAttribute(h,m),Hp(tl,m,l,r,t,e,this)}}else{let d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let x=d,g=f;x<g;x++)tl.fromBufferAttribute(h,x),Hp(tl,x,l,r,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Hp(i,t,e,n,r,s,a){let o=oh.distanceSqToPoint(i);if(o<e){let l=new k;oh.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,object:a})}}var Za=class extends Xn{constructor(t,e,n,r,s,a,o,l,c){super(t,e,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Tl=class i extends Ke{constructor(t=1,e=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:r},e=Math.max(3,e);let s=[],a=[],o=[],l=[],c=new k,u=new Vt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=e;h++,d+=3){let f=n+h/e*r;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[d]/t+1)/2,u.y=(a[d+1]/t+1)/2,l.push(u.x,u.y)}for(let h=1;h<=e;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new ge(a,3)),this.setAttribute("normal",new ge(o,3)),this.setAttribute("uv",new ge(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},qn=class i extends Ke{constructor(t=1,e=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],h=[],d=[],f=[],x=0,g=[],m=n/2,p=0;y(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new ge(h,3)),this.setAttribute("normal",new ge(d,3)),this.setAttribute("uv",new ge(f,2));function y(){let b=new k,w=new k,M=0,E=(e-t)/n;for(let C=0;C<=s;C++){let _=[],S=C/s,L=S*(e-t)+t;for(let U=0;U<=r;U++){let q=U/r,D=q*l+o,B=Math.sin(D),G=Math.cos(D);w.x=L*B,w.y=-S*n+m,w.z=L*G,h.push(w.x,w.y,w.z),b.set(B,E,G).normalize(),d.push(b.x,b.y,b.z),f.push(q,1-S),_.push(x++)}g.push(_)}for(let C=0;C<r;C++)for(let _=0;_<s;_++){let S=g[_][C],L=g[_+1][C],U=g[_+1][C+1],q=g[_][C+1];u.push(S,L,q),u.push(L,U,q),M+=6}c.addGroup(p,M,0),p+=M}function v(b){let w=x,M=new Vt,E=new k,C=0,_=b===!0?t:e,S=b===!0?1:-1;for(let U=1;U<=r;U++)h.push(0,m*S,0),d.push(0,S,0),f.push(.5,.5),x++;let L=x;for(let U=0;U<=r;U++){let D=U/r*l+o,B=Math.cos(D),G=Math.sin(D);E.x=_*G,E.y=m*S,E.z=_*B,h.push(E.x,E.y,E.z),d.push(0,S,0),M.x=B*.5+.5,M.y=G*.5*S+.5,f.push(M.x,M.y),x++}for(let U=0;U<r;U++){let q=w+U,D=L+U;b===!0?u.push(D,D+1,q):u.push(D+1,D,q),C+=3}c.addGroup(p,C,b===!0?1:2),p+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},wl=class i extends qn{constructor(t=1,e=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Al=class i extends Ke{constructor(t=.5,e=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],l=[],c=[],u=[],h=t,d=(e-t)/r,f=new k,x=new Vt;for(let g=0;g<=r;g++){for(let m=0;m<=n;m++){let p=s+m/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),x.x=(f.x/e+1)/2,x.y=(f.y/e+1)/2,u.push(x.x,x.y)}h+=d}for(let g=0;g<r;g++){let m=g*(n+1);for(let p=0;p<n;p++){let y=p+m,v=y,b=y+n+1,w=y+n+2,M=y+1;o.push(v,b,M),o.push(b,w,M)}}this.setIndex(o),this.setAttribute("position",new ge(l,3)),this.setAttribute("normal",new ge(c,3)),this.setAttribute("uv",new ge(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var cr=class i extends Ke{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],h=new k,d=new k,f=[],x=[],g=[],m=[];for(let p=0;p<=n;p++){let y=[],v=p/n,b=0;p===0&&a===0?b=.5/e:p===n&&l===Math.PI&&(b=-.5/e);for(let w=0;w<=e;w++){let M=w/e;h.x=-t*Math.cos(r+M*s)*Math.sin(a+v*o),h.y=t*Math.cos(a+v*o),h.z=t*Math.sin(r+M*s)*Math.sin(a+v*o),x.push(h.x,h.y,h.z),d.copy(h).normalize(),g.push(d.x,d.y,d.z),m.push(M+b,1-v),y.push(c++)}u.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){let v=u[p][y+1],b=u[p][y],w=u[p+1][y],M=u[p+1][y+1];(p!==0||a>0)&&f.push(v,b,M),(p!==n-1||l<Math.PI)&&f.push(b,w,M)}this.setIndex(f),this.setAttribute("position",new ge(x,3)),this.setAttribute("normal",new ge(g,3)),this.setAttribute("uv",new ge(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var $n=class i extends Ke{constructor(t=1,e=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);let a=[],o=[],l=[],c=[],u=new k,h=new k,d=new k;for(let f=0;f<=n;f++)for(let x=0;x<=r;x++){let g=x/r*s,m=f/n*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(g),h.y=(t+e*Math.cos(m))*Math.sin(g),h.z=e*Math.sin(m),o.push(h.x,h.y,h.z),u.x=t*Math.cos(g),u.y=t*Math.sin(g),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(x/r),c.push(f/n)}for(let f=1;f<=n;f++)for(let x=1;x<=r;x++){let g=(r+1)*f+x-1,m=(r+1)*(f-1)+x-1,p=(r+1)*(f-1)+x,y=(r+1)*f+x;a.push(g,m,y),a.push(m,p,y)}this.setIndex(a),this.setAttribute("position",new ge(o,3)),this.setAttribute("normal",new ge(l,3)),this.setAttribute("uv",new ge(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Cl=class extends Fe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Yn=class extends lr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rm,this.normalScale=new Vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ja=class extends Yn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Vt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return sn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Lt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Lt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Lt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function el(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Mb(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Xs=class{constructor(t,e,n,r){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,r=e[n],s=e[n-1];n:{t:{let a;e:{i:if(!(t<r)){for(let o=n+2;;){if(r===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=e[++n],t<r)break t}a=e.length;break e}if(!(t>=s)){let o=e[1];t<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=e[--n-1],t>=s)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(r=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,t,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=t*r;for(let a=0;a!==r;++a)e[a]=n[s+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},lh=class extends Xs{constructor(t,e,n,r){super(t,e,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Zf,endingEnd:Zf}}intervalChanged_(t,e,n){let r=this.parameterPositions,s=t-2,a=t+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Jf:s=t,o=2*e-n;break;case Kf:s=r.length-2,o=e+r[s]-r[s+1];break;default:s=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Jf:a=t,l=2*n-e;break;case Kf:a=1,l=n+r[1]-r[0];break;default:a=t-1,l=e}let c=(n-e)*.5,u=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(t,e,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,x=(n-e)/(r-e),g=x*x,m=g*x,p=-d*m+2*d*g-d*x,y=(1+d)*m+(-1.5-2*d)*g+(-.5+d)*x+1,v=(-1-f)*m+(1.5+f)*g+.5*x,b=f*m-f*g;for(let w=0;w!==o;++w)s[w]=p*a[u+w]+y*a[c+w]+v*a[l+w]+b*a[h+w];return s}},ch=class extends Xs{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t,e,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(n-e)/(r-e),h=1-u;for(let d=0;d!==o;++d)s[d]=a[c+d]*h+a[l+d]*u;return s}},uh=class extends Xs{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t){return this.copySampleValue_(t-1)}},si=class{constructor(t,e,n,r){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=el(e,this.TimeBufferType),this.values=el(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:el(t.times,Array),values:el(t.values,Array)};let r=t.getInterpolation();r!==t.DefaultInterpolation&&(n.interpolation=r)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new uh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ch(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new lh(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case il:e=this.InterpolantFactoryMethodDiscrete;break;case rl:e=this.InterpolantFactoryMethodLinear;break;case du:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return il;case this.InterpolantFactoryMethodLinear:return rl;case this.InterpolantFactoryMethodSmooth:return du}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,r=e.length;n!==r;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,r=e.length;n!==r;++n)e[n]*=t}return this}trim(t,e){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<t;)++s;for(;a!==-1&&n[a]>e;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(r!==void 0&&Mb(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===du,s=t.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(r)l=!0;else{let h=o*n,d=h-n,f=h+n;for(let x=0;x!==n;++x){let g=e[h+x];if(g!==e[d+x]||g!==e[f+x]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let h=o*n,d=a*n;for(let f=0;f!==n;++f)e[d+f]=e[h+f]}++a}}if(s>0){t[a]=t[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,r=new n(this.name,t,e);return r.createInterpolant=this.createInterpolant,r}};si.prototype.TimeBufferType=Float32Array;si.prototype.ValueBufferType=Float32Array;si.prototype.DefaultInterpolation=rl;var Wr=class extends si{};Wr.prototype.ValueTypeName="bool";Wr.prototype.ValueBufferType=Array;Wr.prototype.DefaultInterpolation=il;Wr.prototype.InterpolantFactoryMethodLinear=void 0;Wr.prototype.InterpolantFactoryMethodSmooth=void 0;var hh=class extends si{};hh.prototype.ValueTypeName="color";var dh=class extends si{};dh.prototype.ValueTypeName="number";var fh=class extends Xs{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t,e,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(r-e),c=t*o;for(let u=c+o;c!==u;c+=4)gi.slerpFlat(s,0,a,c-o,a,c,l);return s}},Ka=class extends si{InterpolantFactoryMethodLinear(t){return new fh(this.times,this.values,this.getValueSize(),t)}};Ka.prototype.ValueTypeName="quaternion";Ka.prototype.DefaultInterpolation=rl;Ka.prototype.InterpolantFactoryMethodSmooth=void 0;var Xr=class extends si{};Xr.prototype.ValueTypeName="string";Xr.prototype.ValueBufferType=Array;Xr.prototype.DefaultInterpolation=il;Xr.prototype.InterpolantFactoryMethodLinear=void 0;Xr.prototype.InterpolantFactoryMethodSmooth=void 0;var ph=class extends si{};ph.prototype.ValueTypeName="vector";var mh=class{constructor(t,e,n){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],x=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return x}return null}}},bb=new mh,gh=class{constructor(t){this.manager=t!==void 0?t:bb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(r,s){n.load(t,r,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};gh.DEFAULT_MATERIAL_NAME="__DEFAULT";var Rl=class extends qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Lt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}};var Nu=new Ce,Gp=new k,Wp=new k,Pl=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Vt(512,512),this.map=null,this.mapPass=null,this.matrix=new Ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qa,this._frameExtents=new Vt(1,1),this._viewportCount=1,this._viewports=[new Ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Gp.setFromMatrixPosition(t.matrixWorld),e.position.copy(Gp),Wp.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Wp),e.updateMatrixWorld(),Nu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nu),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Nu)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Xp=new Ce,za=new k,Ou=new k,_h=class extends Pl{constructor(){super(new an(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Vt(4,2),this._viewportCount=6,this._viewports=[new Ee(2,1,1,1),new Ee(0,1,1,1),new Ee(3,1,1,1),new Ee(1,1,1,1),new Ee(3,0,1,1),new Ee(1,0,1,1)],this._cubeDirections=[new k(1,0,0),new k(-1,0,0),new k(0,0,1),new k(0,0,-1),new k(0,1,0),new k(0,-1,0)],this._cubeUps=[new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,0,1),new k(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,r=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),za.setFromMatrixPosition(t.matrixWorld),n.position.copy(za),Ou.copy(n.position),Ou.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Ou),n.updateMatrixWorld(),r.makeTranslation(-za.x,-za.y,-za.z),Xp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xp)}},ur=class extends Rl{constructor(t,e,n=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new _h}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},xh=class extends Pl{constructor(){super(new Hs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ll=class extends Rl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.target=new qe,this.shadow=new xh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var qs=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=qp(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=qp();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function qp(){return(typeof performance>"u"?Date:performance).now()}var Rh="\\[\\]\\.:\\/",Sb=new RegExp("["+Rh+"]","g"),Ph="[^"+Rh+"]",Eb="[^"+Rh.replace("\\.","")+"]",Tb=/((?:WC+[\/:])*)/.source.replace("WC",Ph),wb=/(WCOD+)?/.source.replace("WCOD",Eb),Ab=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ph),Cb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ph),Rb=new RegExp("^"+Tb+wb+Ab+Cb+"$"),Pb=["material","materials","bones","map"],vh=class{constructor(t,e,n){let r=n||Se.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,r)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Se=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Sb,"")}static parseTrackName(t){let e=Rb.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);Pb.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},r=n(t.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)t[e++]=n[r]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,r=e.propertyName,s=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[r];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Se.Composite=vh;Se.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Se.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Se.prototype.GetterByBindingType=[Se.prototype._getValue_direct,Se.prototype._getValue_array,Se.prototype._getValue_arrayElement,Se.prototype._getValue_toArray];Se.prototype.SetterByBindingTypeAndVersioning=[[Se.prototype._setValue_direct,Se.prototype._setValue_direct_setNeedsUpdate,Se.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_array,Se.prototype._setValue_array_setNeedsUpdate,Se.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_arrayElement,Se.prototype._setValue_arrayElement_setNeedsUpdate,Se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_fromArray,Se.prototype._setValue_fromArray_setNeedsUpdate,Se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var RS=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yh);var Nl=class extends Ws{constructor(t=null){super();let e=new Gr;e.deleteAttribute("uv");let n=new Yn({side:on}),r=new Yn,s=5;t!==null&&t._useLegacyLights===!1&&(s=900);let a=new ur(16777215,s,28,2);a.position.set(.418,16.199,.3),this.add(a);let o=new Bt(e,n);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);let l=new Bt(e,r);l.position.set(-10.906,2.009,1.846),l.rotation.set(0,-.195,0),l.scale.set(2.328,7.905,4.651),this.add(l);let c=new Bt(e,r);c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),this.add(c);let u=new Bt(e,r);u.position.set(6.167,.857,7.803),u.rotation.set(0,.561,0),u.scale.set(3.927,6.285,3.687),this.add(u);let h=new Bt(e,r);h.position.set(-2.017,.018,6.124),h.rotation.set(0,.333,0),h.scale.set(2.002,4.566,2.064),this.add(h);let d=new Bt(e,r);d.position.set(2.291,-.756,-2.621),d.rotation.set(0,-.286,0),d.scale.set(1.546,1.552,1.496),this.add(d);let f=new Bt(e,r);f.position.set(-2.193,-.369,-5.547),f.rotation.set(0,.516,0),f.scale.set(3.875,3.487,2.986),this.add(f);let x=new Bt(e,Zs(50));x.position.set(-16.116,14.37,8.208),x.scale.set(.1,2.428,2.739),this.add(x);let g=new Bt(e,Zs(50));g.position.set(-16.109,18.021,-8.207),g.scale.set(.1,2.425,2.751),this.add(g);let m=new Bt(e,Zs(17));m.position.set(14.904,12.198,-1.832),m.scale.set(.15,4.265,6.331),this.add(m);let p=new Bt(e,Zs(43));p.position.set(-.462,8.89,14.52),p.scale.set(4.38,5.441,.088),this.add(p);let y=new Bt(e,Zs(20));y.position.set(3.235,11.486,-12.541),y.scale.set(2.5,2,.1),this.add(y);let v=new Bt(e,Zs(100));v.position.set(0,20,0),v.scale.set(1,.1,1),this.add(v)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function Zs(i){let t=new ri;return t.color.setScalar(i),t}var Ol={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var In=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Lb=new Hs(-1,1,1,-1,0,1),Lh=class extends Ke{constructor(){super(),this.setAttribute("position",new ge([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ge([0,2,0,0,2,0],2))}},Ib=new Lh,dr=class{constructor(t){this._mesh=new Bt(Ib,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Lb)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var Fl=class extends In{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Fe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=hr.clone(t.uniforms),this.material=new Fe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new dr(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Qa=class extends In{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){let r=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}},Bl=class extends In{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var zl=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let n=t.getSize(new Vt);this._width=n.width,this._height=n.height,e=new _n(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ii}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Fl(Ol),this.copyPass.material.blending=mi,this.clock=new qs}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),n=!1;for(let r=0,s=this.passes.length;r<s;r++){let a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Qa!==void 0&&(a instanceof Qa?n=!0:a instanceof Bl&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new Vt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,r)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var kl=class extends In{constructor(t,e,n=null,r=null,s=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Lt}render(t,e,n){let r=t.autoClear;t.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor)),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=r}};var _m={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Lt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var Js=class i extends In{constructor(t,e,n,r){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=r,this.resolution=t!==void 0?new Vt(t.x,t.y):new Vt(256,256),this.clearColor=new Lt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new _n(s,a,{type:ii}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let d=new _n(s,a,{type:ii});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let f=new _n(s,a,{type:ii});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),a=Math.round(a/2)}let o=_m;this.highPassUniforms=hr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Fe({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Vt(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let u=Ol;this.copyUniforms=hr.clone(u.uniforms),this.blendMaterial=new Fe({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Hr,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Lt,this.oldClearAlpha=1,this.basic=new ri,this.fsQuad=new dr(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),r=Math.round(e/2);this.renderTargetBright.setSize(n,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,r),this.renderTargetsVertical[s].setSize(n,r),this.separableBlurMaterials[s].uniforms.invSize.value=new Vt(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,e,n,r,s){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){let e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Fe({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Vt(.5,.5)},direction:{value:new Vt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new Fe({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}};Js.BlurDirectionX=new Vt(1,0);Js.BlurDirectionY=new Vt(0,1);var xm={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var Vl=class extends In{constructor(){super();let t=xm;this.uniforms=hr.clone(t.uniforms),this.material=new Cl({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new dr(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},le.getTransfer(this._outputColorSpace)===me&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Mh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===bh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Sh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ja?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Eh&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var vm="#14112b";function Ih({numero:i,letra:t,color:e},n=256,r=null){let s=n/2,a=document.createElement("canvas");a.width=n,a.height=s;let o=a.getContext("2d"),l=n/1024,c=o.createLinearGradient(0,0,0,s);c.addColorStop(0,ym(e,"#000000",.25)),c.addColorStop(.5,e),c.addColorStop(1,ym(e,"#000000",.35)),o.fillStyle=c,o.fillRect(0,0,n,s);for(let h of[n*.25,n*.75])o.save(),o.translate(h,s/2),o.beginPath(),o.arc(0,0,132*l,0,Math.PI*2),o.fillStyle=vm,o.fill(),o.beginPath(),o.arc(0,0,116*l,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.fillStyle=vm,o.textAlign="center",o.textBaseline="middle",o.font=`${46*l}px Bungee, Impact, sans-serif`,o.fillText(t,0,-60*l),o.font=`${(String(i).length>1?104:124)*l}px Bungee, Impact, sans-serif`,o.fillText(String(i),0,22*l),o.restore();let u=new Za(a);return u.colorSpace=ze,r&&(u.anisotropy=Math.min(8,r.capabilities.getMaxAnisotropy())),u}function Mm(){let i=document.createElement("canvas");i.width=i.height=64;let t=i.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.35,"rgba(255,255,255,0.8)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new Za(i)}function ym(i,t,e){let n=new Lt(i);return n.lerp(new Lt(t),e),"#"+n.getHexString()}var je=2,ai=je+.07,Dn=.2,Ks=4,bm=.4,Dh=1.45,Db=.03,Ub=98,Hl=1,Nb=6.8,Ob=8.5,fr=-3.05,qr=-2.8,js=-2.55,Uh=2.5,Sm=3.3,Em=2.95,Tm="#1a0d36",wm=424,Te=()=>new k,Nh=new k(0,1,0);function Am(i,{columnaDe:t,colores:e,reducirMovimiento:n=!1}){let r=new $a({canvas:i,antialias:!0,powerPreference:"high-performance"}),s=Math.min(window.devicePixelRatio,1.75);r.setPixelRatio(s),r.toneMapping=ja,r.toneMappingExposure=.85;let a=new Ws;a.background=new Lt(Tm),a.fog=new Ml(Tm,16,36);let o=new Gs(r);a.environment=o.fromScene(new Nl(r),.04).texture;let l=new an(38,1,.1,90),c=new zl(r);c.addPass(new kl(a,l));let u=new Js(new Vt(256,256),.55,.4,.92);c.addPass(u),c.addPass(new Vl);let h={omega:0,angulo:0},d={ang:.42,alt:2.2,factor:1,distBase:15,mx:0,my:.35,mz:0,sacudida:0},f={modo:"apagado",velocidad:6,destello:0,color:new Lt("#ffc43d")},x={enfoque:0,intensidad:0,velocidad:1},g=new Ll("#ffe7c4",1.5);g.position.set(4,8,7),a.add(g);let m=new ur("#ff4fa3",28,24);m.position.set(-6,3,-3);let p=new ur("#3d6bff",28,24);p.position.set(6,2,-3);let y=new ur("#ffffff",0,16);y.position.set(0,1.5,4),a.add(m,p,y);let v=new Yn({color:"#e9a93a",metalness:1,roughness:.3,envMapIntensity:.7}),b=new Yn({color:"#c8193b",metalness:.1,roughness:.35,envMapIntensity:.5}),w=new Yn({color:"#241455",metalness:.2,roughness:.5,envMapIntensity:.25}),M=new Ui;a.add(M);for(let V=0;V<6;V++){let nt=new Bt(new $n(ai,.035,8,120),v);nt.rotation.order="ZYX",nt.rotation.set(0,Math.PI/2,V*Math.PI/6),M.add(nt)}for(let V of[-1.5,-.8,.8,1.5]){let nt=new Bt(new $n(Math.sqrt(ai*ai-V*V),.03,8,100),v);nt.position.z=V,M.add(nt)}M.add(new Bt(new $n(ai,.06,10,140),v));for(let V of[-ai,ai]){let nt=new Bt(new cr(.17,20,14),v);nt.position.z=V,M.add(nt)}let E=Math.asin(Dh/je);for(let V=0;V<Ks;V++){let nt=new Bt(new Al(je-bm,je+.02,48,1,-E,2*E),new Yn({color:"#e9a93a",metalness:1,roughness:.35,envMapIntensity:.7,side:Gn}));nt.rotation.order="ZYX",nt.rotation.set(Math.PI/2,0,V*Math.PI*2/Ks+Math.PI/Ks),M.add(nt)}let C=new Bt(new cr(je+.02,48,32),new Ja({color:"#ffffff",roughness:.04,transparent:!0,opacity:.04,clearcoat:1,depthWrite:!1,envMapIntensity:.6}));a.add(C);let _=new Bt(new qn(.09,.09,1.7,16),v);_.rotation.x=Math.PI/2,_.position.z=-(ai+.85);let S=new Bt(new qn(.16,.24,-qr,20),b);S.position.set(0,qr/2,-(ai+1.7));let L=new Bt(new cr(.22,20,14),v);L.position.set(0,0,-(ai+1.7)),a.add(_,S,L);let U=new Bt(new qn(Sm,Sm+.15,qr-fr,72),w);U.position.y=(qr+fr)/2;let q=new Bt(new qn(Uh,Uh+.1,js-qr,72),w);q.position.y=(js+qr)/2;let D=new Bt(new $n(Uh,.05,8,160),new ri({color:new Lt("#ffc43d").multiplyScalar(1.6)}));D.rotation.x=Math.PI/2,D.position.y=js;let B=new Bt(new Tl(45,64),new Yn({color:"#180c36",roughness:.8,envMapIntensity:.12}));B.rotation.x=-Math.PI/2,B.position.y=fr,a.add(U,q,D,B);let G=-1.35,K=Math.sqrt(ai*ai-G*G)+.12,tt=-2.3,et=new Bt(new qn(.42,.62,tt-js,28),b);et.position.y=(tt+js)/2;let it=new Bt(new $n(.45,.06,10,40),v);it.rotation.x=Math.PI/2,it.position.y=tt;let st=new Bt(new $n(.64,.06,10,40),v);st.rotation.x=Math.PI/2,st.position.y=js+.03;let _t=new Bt(new $n(K,.06,10,120),v);_t.rotation.x=Math.PI/2,_t.position.y=G,a.add(et,it,st,_t);let j=Te(),rt=Te();for(let V=0;V<4;V++){let nt=V*Math.PI/2+Math.PI/4;j.set(Math.cos(nt)*.5,tt,Math.sin(nt)*.5),rt.set(Math.cos(nt)*K,G,Math.sin(nt)*K);let bt=j.distanceTo(rt),Pt=new Bt(new qn(.045,.045,bt,10),v);Pt.position.copy(j).add(rt).multiplyScalar(.5),Pt.quaternion.setFromUnitVectors(Nh,rt.clone().sub(j).normalize()),a.add(Pt)}let O=4.5,H=.1,z=-4.3,$=.24,A=H-fr,N=new Bt(new $n(O,$,14,90,Math.PI),b);N.position.set(0,H,z),a.add(N);for(let V of[-1,1]){let nt=new Bt(new qn($,$,A,14),b);nt.position.set(V*O,fr+A/2,z);let bt=new Bt(new $n($+.02,.05,8,24),v);bt.rotation.x=Math.PI/2,bt.position.set(V*O,H,z);let Pt=new Bt(new qn(.42,.52,.32,24),v);Pt.position.set(V*O,fr+.16,z),a.add(nt,bt,Pt)}let X=[],I=52,xt=fr+.5,dt=H-xt,at=Math.PI*O,ht=2*dt+at,Nt=z+$+.04;for(let V=0;V<I;V++){let nt=ht*V/(I-1);if(nt<=dt)X.push(new k(-O,xt+nt,Nt));else if(nt<=dt+at){let bt=Math.PI-(nt-dt)/O;X.push(new k(Math.cos(bt)*O,H+Math.sin(bt)*O,Nt))}else X.push(new k(O,H+dt+at-nt,Nt))}let wt=44;for(let V=0;V<wt;V++){let nt=V/wt*Math.PI*2;X.push(new k(Math.cos(nt)*Em,qr+.07,Math.sin(nt)*Em))}let P=new Sl(new cr(.1,12,8),new ri({color:"#ffffff"}),X.length),T=new qe;X.forEach((V,nt)=>{T.position.copy(V),T.updateMatrix(),P.setMatrixAt(nt,T.matrix),P.setColorAt(nt,new Lt(0,0,0))}),a.add(P);let Y=e.map(V=>new Lt(V)),ct=new Lt,ft=new Lt("#ffd98a"),pt=[-6.5,-2.4,2.4,6.5].map((V,nt)=>{let Pt=new wl(1.4,16,40,1,!0);Pt.translate(0,-16/2,0);let qt=new Fe({uniforms:{uColor:{value:new Lt(e[(nt+1)%e.length])},uOpacidad:{value:0}},vertexShader:`
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
                }`,transparent:!0,depthWrite:!1,blending:Hr,side:Gn}),It=new Bt(Pt,qt),mt=new Ui;return mt.position.set(V,10,-1.2),mt.add(It),a.add(mt),{pivote:mt,mat:qt,base:Math.atan2(-V,10),fase:nt*1.7}}),Dt=new cr(Dn,28,18),St=[],Ct=new Map;for(let V=1;V<=75;V++){let nt={...t(V),numero:V},bt=Ih(nt,256,r),Pt=new Bt(Dt,new Ja({map:bt,roughness:.25,clearcoat:1,clearcoatRoughness:.1,envMapIntensity:.55}));Pt.visible=!1,Pt.quaternion.setFromEuler(new ks(Math.random()*6,Math.random()*6,Math.random()*6)),a.add(Pt);let qt={n:V,info:nt,mesh:Pt,textura:bt,p:Te(),v:Te(),w:Te(),estado:"fuera"};St.push(qt),Ct.set(V,qt)}let Ft=600,Kt=Array.from({length:Ft},()=>({p:Te(),v:Te(),vida:0,max:1,color:new Lt})),ut=new Ke,se=new Float32Array(Ft*3),jt=new Float32Array(Ft*3);ut.setAttribute("position",new ln(se,3)),ut.setAttribute("color",new ln(jt,3));let $t=new El(ut,new Ya({size:.22,map:Mm(),vertexColors:!0,transparent:!0,depthWrite:!1,blending:Hr}));$t.frustumCulled=!1,a.add($t);let Ot=0;function Rt(V,nt,bt=120,Pt=6){let qt=new Lt(nt);for(let It=0;It<bt;It++){let mt=Kt[Ot];Ot=(Ot+1)%Ft,mt.p.copy(V),mt.v.set(Math.random()-.5,Math.random()-.3,Math.random()-.5).normalize().multiplyScalar(Pt*(.35+Math.random()*.65)),mt.max=mt.vida=.7+Math.random()*.9,mt.color.copy(Math.random()<.25?new Lt("#fff3df"):qt).multiplyScalar(2.2)}}let Zt=1/240,ae=2,ye=.6,te=.4,vt=.15,F=.4,Et=5/(2*Dn*Dn),Mt=45,Gt=12,zt=.1,ue=.3,he=.35,De=.35,Ue=Te(),oe=0,$e=Te(),Zn=Te(),ne=Te(),Jn=Te(),Ye=Te(),cn=Te(),He=Te(),fa=Te(),gr=Te(),hc=Te(),zi=Te();function _r(V,nt,bt){return bt.crossVectors(V.w,fa.copy(nt).multiplyScalar(Dn)).add(V.v)}function R(V,nt,bt){V.v.add(bt),V.w.addScaledVector(fa.copy(nt).multiplyScalar(Dn).cross(bt),Et)}function W(V,nt){ne.subVectors(nt.p,V.p);let bt=ne.lengthSq(),Pt=2*Dn;if(bt>=Pt*Pt||bt===0)return;let qt=Math.sqrt(bt);ne.divideScalar(qt),Jn.copy(ne).negate();let It=Math.max(0,Pt-qt-.002)*.5;V.p.addScaledVector(ne,-It),nt.p.addScaledVector(ne,It),Ye.subVectors(_r(nt,Jn,hc),_r(V,ne,gr));let mt=Ye.dot(ne);if(mt>=0)return;let ce=-(1+(mt<-1?ye:0))*mt/2;He.copy(ne).multiplyScalar(ce),cn.copy(Ye).addScaledVector(ne,-mt);let Ne=cn.length();if(Ne>1e-6){let ve=Math.min(Ne/7,vt*ce);He.addScaledVector(cn,-ve/Ne)}R(nt,Jn,He),R(V,ne,He.negate())}function J(V,nt){let bt=je-Dn,Pt=V.p.length();if(Pt<=bt)return;ne.copy(V.p).divideScalar(Pt),V.p.copy(ne).multiplyScalar(bt),zi.set(-nt*je*ne.y,nt*je*ne.x,0),Ye.subVectors(_r(V,ne,gr),zi);let qt=Ye.dot(ne);if(qt<=0)return;let mt=(1+(qt>1?te:0))*qt;He.copy(ne).multiplyScalar(-mt),cn.copy(Ye).addScaledVector(ne,-qt);let Ht=cn.length();if(Ht>1e-6){let ce=Math.min(Ht/3.5,F*mt);He.addScaledVector(cn,-ce/Ht)}R(V,ne,He),Z(V,nt)}function Q(V,nt){for(let bt=0;bt<Ks;bt++){let Pt=h.angulo+bt*Math.PI*2/Ks+Math.PI/Ks,qt=Math.cos(Pt),It=Math.sin(Pt),mt=V.p.x*qt+V.p.y*It;if(mt<-Dn)continue;let Ht=Math.max(-Dh,Math.min(Dh,V.p.z));mt=Math.max(0,mt);let ce=Math.hypot(mt,Ht);if(ce<1e-6)continue;let Ne=Math.max(je-bm,Math.min(je,ce));mt*=Ne/ce,Ht*=Ne/ce,Ue.set(mt*qt,mt*It,Ht),ne.subVectors(V.p,Ue);let ve=ne.length(),hn=Dn+Db/2;if(ve>=hn||ve===0)continue;ne.divideScalar(ve),V.p.addScaledVector(ne,hn-ve),zi.set(-nt*Ue.y,nt*Ue.x,0),Jn.copy(ne).negate(),Ye.subVectors(_r(V,Jn,gr),zi);let vn=Ye.dot(ne);if(vn>=0)continue;let oi=-(1+(vn<-1?he:0))*vn;He.copy(ne).multiplyScalar(oi),cn.copy(Ye).addScaledVector(ne,-vn);let yi=cn.length();yi>1e-6&&He.addScaledVector(cn,-Math.min(yi/3.5,De*oi)/yi),R(V,Jn,He)}}function Z(V,nt){let bt=Math.PI*2/Gt,Pt=Math.round((Math.atan2(V.p.y,V.p.x)-h.angulo)/bt),qt=h.angulo+Pt*bt,It=-Math.sin(qt),mt=Math.cos(qt),Ht=V.p.x*It+V.p.y*mt,ce=V.p.x-Ht*It,Ne=V.p.y-Ht*mt,ve=Math.hypot(ce,Ne,V.p.z);if(ve<1e-6)return;let hn=ce/ve*je,vn=Ne/ve*je,Kn=V.p.z/ve*je;ne.set(V.p.x-hn,V.p.y-vn,V.p.z-Kn);let oi=ne.length(),yi=Dn+zt;if(oi>=yi||oi===0)return;ne.divideScalar(oi),V.p.addScaledVector(ne,yi-oi),zi.set(-nt*vn,nt*hn,0),Jn.copy(ne).negate(),Ye.subVectors(_r(V,Jn,gr),zi);let Vi=Ye.dot(ne);if(Vi>=0)return;let xa=-(1+(Vi<-1?ue:0))*Vi;He.copy(ne).multiplyScalar(xa),cn.copy(Ye).addScaledVector(ne,-Vi);let ns=cn.length();ns>1e-6&&He.addScaledVector(cn,-Math.min(ns/3.5,F*xa)/ns),R(V,Jn,He)}function At(V,nt){let bt=h.omega,Pt=1-.05*V,qt=1-.8*V;for(let It of nt)It.v.y-=Ub*V,It.v.multiplyScalar(Pt),It.v.lengthSq()>Mt*Mt&&It.v.setLength(Mt),It.w.multiplyScalar(qt),It.p.addScaledVector(It.v,V);for(let It=0;It<ae;It++){for(let mt=0;mt<nt.length;mt++)for(let Ht=mt+1;Ht<nt.length;Ht++)W(nt[mt],nt[Ht]);for(let mt of nt)Q(mt,bt),J(mt,bt)}}function Ut(V){let nt=St.filter(bt=>bt.estado==="bombo");for(oe=Math.min(oe+V,Zt*10);oe>=Zt;)At(Zt,nt),oe-=Zt;for(let bt of nt){bt.mesh.position.copy(bt.p);let Pt=bt.w.length();Pt>1e-4&&bt.mesh.rotateOnWorldAxis($e.copy(bt.w).divideScalar(Pt),Pt*V)}}function kt(V){for(let nt of V){let bt=Ct.get(nt);bt&&xe(bt),!(!bt||bt.estado!=="bombo")&&(bt.estado="fuera",bt.mesh.visible=!1)}}function Wt(V,nt=0){return lt.delayedCall(nt,()=>{V.estado="bombo",V.p.set((Math.random()-.5)*1.2,je-Dn-.2-Math.random()*.3,(Math.random()-.5)*1.2),V.v.set((Math.random()-.5)*2,-1.5,(Math.random()-.5)*2),V.w.set((Math.random()-.5)*20,(Math.random()-.5)*20,(Math.random()-.5)*20),V.mesh.position.copy(V.p),V.mesh.visible=!0,V.mesh.material.map=V.textura,lt.fromTo(V.mesh.scale,{x:.01,y:.01,z:.01},{x:1,y:1,z:1,duration:.3,ease:"back.out(2)"})})}let Yt=null,Xt=new Map;function Jt(V,nt,bt){let Pt=Te().set((Math.random()-.5)*7,fr+.6,4.6+Math.random()*1.6),qt=Te().set((Math.random()-.5)*1.1,je-Dn-.25,(Math.random()-.5)*1.1),It=Te().set((Pt.x+qt.x)/2,je+2.6+Math.random()*1.4,(Pt.z+qt.z)/2+.6),mt=Te().set(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),Ht={u:0},ce=0,Ne=lt.to(Ht,{u:1,duration:nt,ease:"none",onStart(){V.estado="entrando",V.mesh.material.map=V.textura,V.mesh.visible=!0,V.mesh.position.copy(Pt),lt.fromTo(V.mesh.scale,{x:.3,y:.3,z:.3},{x:1,y:1,z:1,duration:nt*.4,ease:"back.out(2)"})},onUpdate(){let ve=Ht.u,hn=(1-ve)*(1-ve),vn=2*(1-ve)*ve,Kn=ve*ve;V.mesh.position.set(hn*Pt.x+vn*It.x+Kn*qt.x,hn*Pt.y+vn*It.y+Kn*qt.y,hn*Pt.z+vn*It.z+Kn*qt.z),V.mesh.rotateOnWorldAxis(mt,(ve-ce)*14),ce=ve},onComplete(){Xt.delete(V),V.estado="bombo",V.p.copy(qt),V.v.set((Math.random()-.5)*3,-6,(Math.random()-.5)*3),V.w.set((Math.random()-.5)*20,(Math.random()-.5)*20,(Math.random()-.5)*20),V.mesh.position.copy(V.p),bt?.()}});return Xt.set(V,Ne),Ne}function xe(V=null){if(V){Xt.get(V)?.progress(1);return}Yt?.progress(1);for(let nt of[...Xt.values()])nt.progress(1)}function un({alEntrar:V}={}){xe();let nt=St.filter(Pt=>Pt.estado==="fuera");if(!nt.length)return;if(n){nt.forEach((Pt,qt)=>Wt(Pt,qt*.01));return}for(let Pt=nt.length-1;Pt>0;Pt--){let qt=Math.floor(Math.random()*(Pt+1));[nt[Pt],nt[qt]]=[nt[qt],nt[Pt]]}let bt=Math.min(.09,3/nt.length);Yt=lt.timeline(),Yt.to(h,{omega:3,duration:.5,ease:"power2.out"},0),nt.forEach((Pt,qt)=>{Yt.add(Jt(Pt,.85+Math.random()*.25,()=>V?.(qt,nt.length)),.25+qt*bt)}),Yt.call(()=>On(.25),null,">-0.05"),Yt.to(h,{omega:Hl,duration:1.4,ease:"power2.inOut"},">")}function Le(){let V=window.innerWidth,nt=window.innerHeight;r.setSize(V,nt,!1),c.setSize(V,nt),l.aspect=V/nt;let bt=V>=1024,qt=(bt?V-wm:V)/nt;d.distBase=Math.max(15.5,10/qt),a.fog.near=d.distBase+3,a.fog.far=d.distBase+24,l.setViewOffset(V,nt,bt?wm/2:0,bt?nt*.04:nt*.07,V,nt),l.updateProjectionMatrix()}window.addEventListener("resize",Le),Le();let Nn=new qs,de=Te(),Qt=new gi;r.setAnimationLoop(()=>{let V=Math.min(Nn.getDelta(),.03333333333333333),nt=Nn.elapsedTime;h.angulo+=h.omega*V,M.rotation.z=h.angulo,Ut(V);let bt=nt*f.velocidad;for(let mt=0;mt<X.length;mt++){let Ht=mt<I,ce;f.modo==="apagado"?ce=.04:f.modo==="arcoiris"?ce=(mt+Math.floor(bt))%2===0?2.2:.3:Ht?ce=((mt-bt)%4+4)%4<1?2.6:.85:ce=((mt-bt)%5+5)%5<2?2.2:.15,ct.copy(Ht?ft:Y[Math.floor(mt/2)%Y.length]),f.modo==="arcoiris"&&ct.copy(Y[(mt+Math.floor(bt/2))%Y.length]),ct.multiplyScalar(ce).lerp(Me(),f.destello),P.setColorAt(mt,ct)}P.instanceColor.needsUpdate=!0,pt.forEach(mt=>{let Ht=Math.sin(nt*.55*x.velocidad+mt.fase)*.45;mt.pivote.rotation.z=mt.base+Ht*(1-x.enfoque)*1.2,mt.pivote.rotation.x=Math.cos(nt*.4*x.velocidad+mt.fase)*.18*(1-x.enfoque),mt.mat.uniforms.uOpacidad.value=x.intensidad});for(let mt=0;mt<Ft;mt++){let Ht=Kt[mt];Ht.vida>0&&(Ht.vida-=V,Ht.v.y-=4*V,Ht.v.multiplyScalar(.985),Ht.p.addScaledVector(Ht.v,V));let ce=Math.max(0,Ht.vida/Ht.max);se[mt*3]=Ht.p.x,se[mt*3+1]=ce>0?Ht.p.y:-999,se[mt*3+2]=Ht.p.z,jt[mt*3]=Ht.color.r*ce,jt[mt*3+1]=Ht.color.g*ce,jt[mt*3+2]=Ht.color.b*ce}ut.attributes.position.needsUpdate=!0,ut.attributes.color.needsUpdate=!0;let Pt=n?0:1,qt=d.ang+Math.sin(nt*.21)*.07*Pt,It=d.distBase*d.factor;de.set(Math.sin(qt)*It,d.alt+Math.sin(nt*.37)*.12*Pt,Math.cos(qt)*It),d.sacudida>.001&&(de.x+=(Math.random()-.5)*d.sacudida,de.y+=(Math.random()-.5)*d.sacudida),l.position.copy(de),l.lookAt(d.mx,d.my,d.mz),c.render()});let pa=new Lt;function Me(){return pa.copy(f.color).multiplyScalar(3)}function On(V=.35){n||lt.fromTo(d,{sacudida:V},{sacudida:0,duration:.6,ease:"power2.out",overwrite:"auto"})}function ma(V,nt=1.2){f.color.set(V),lt.fromTo(f,{destello:1},{destello:0,duration:nt,ease:"power2.out",overwrite:"auto"}),y.color.set(V),lt.fromTo(y,{intensity:120},{intensity:0,duration:nt*1.2,ease:"power2.out",overwrite:"auto"})}function xr(){let V=lt.timeline();return V.fromTo(d,{factor:2.1,alt:7,ang:-.9},{factor:1,alt:2.2,ang:.42,duration:3,ease:"power3.inOut"},0),pt.forEach((nt,bt)=>{V.call(()=>{x.intensidad=Math.max(x.intensidad,.08+bt*.04)},null,.35+bt*.25)}),V.to(x,{intensidad:.22,duration:.4},1.4),V.call(()=>{f.modo="persecucion"},null,1.3),V.to(h,{omega:Hl,duration:1.5,ease:"power2.inOut"},1.2),St.forEach((nt,bt)=>V.add(Wt(nt),.9+bt*.022)),V}let ki=null;function Ge(V,{ritmo:nt=1,onSalida:bt,onRevelar:Pt,onImpacto:qt}={}){ki?.progress(1);let It=Ct.get(V),mt=n?.6:nt;xe(It);let Ht=lt.timeline();ki=Ht,Ht.to(h,{omega:Nb,duration:.45*mt,ease:"power2.in"},0).to(x,{enfoque:1,velocidad:3,duration:.4*mt},0).to(f,{velocidad:24,duration:.4*mt},0);let ce={t:0},Ne,ve,hn,vn,Kn,oi,yi,Vi=new qe;Ht.to(ce,{t:1,duration:.8*mt,ease:"power2.inOut",onStart(){Ne||(It.estado="vuelo",It.mesh.visible=!0,It.mesh.scale.setScalar(1),It.mesh.material.map=Ih(It.info,1024,r),Ne=It.p.clone(),{P:hn,escala:oi,camPos:yi}=vi(),ve=new k(Ne.x*.3,je+1.8,.8),vn=It.mesh.quaternion.clone(),Vi.position.copy(hn),Vi.lookAt(yi),Kn=Vi.quaternion.clone(),bt?.())},onUpdate(){Ne||this.vars.onStart.call(this);let An=ce.t,li=1-An;It.mesh.position.set(li*li*Ne.x+2*li*An*ve.x+An*An*hn.x,li*li*Ne.y+2*li*An*ve.y+An*An*hn.y,li*li*Ne.z+2*li*An*ve.z+An*An*hn.z),It.mesh.scale.setScalar(1+(oi-1)*An*An),It.mesh.quaternion.slerpQuaternions(vn,Kn,An),It.mesh.quaternion.multiply(Qt.setFromAxisAngle(Nh,li*Math.PI*6))}},.75*mt),Ht.to(d,{factor:.88,my:.5,duration:.9*mt,ease:"power2.inOut"},.75*mt);let vr=.75*mt+.8*mt;Ht.call(()=>{Rt(It.mesh.position,It.info.color,n?40:160,7),ma(It.info.color),On(.18),Pt?.()},null,vr).to(h,{omega:Hl,duration:1.8,ease:"power2.out"},vr).to(x,{enfoque:0,velocidad:1,duration:1.5},vr).to(f,{velocidad:6,duration:1.2},vr);let xa={a:0};Ht.to(xa,{a:1,duration:.6*mt,ease:"sine.inOut",onUpdate(){Kn&&It.mesh.quaternion.copy(Kn).multiply(Qt.setFromAxisAngle(Nh,Math.sin(xa.a*Math.PI*2)*.22))}},vr);let ns={t:0},va,cd,dc=vr+.6*mt;return Ht.to(ns,{t:1,duration:.3*mt,ease:"power3.in",onStart(){va||(va=It.mesh.position.clone(),cd=l.position.clone().add(va.clone().sub(l.position).normalize().multiplyScalar(l.near+.5)))},onUpdate(){va||this.vars.onStart.call(this),It.mesh.position.lerpVectors(va,cd,ns.t)}},dc),Ht.call(()=>{It.mesh.visible=!1,It.estado="fuera",It.mesh.material.map.dispose(),It.mesh.material.map=It.textura,It.mesh.scale.setScalar(1),On(.5),qt?.()},null,dc+.3*mt),Ht.to(d,{factor:1,my:.35,duration:1,ease:"power3.out"},dc+.3*mt),Ht}function vi(){let V=l.position.clone(),nt=new k(d.mx,d.my,d.mz),bt=V.clone().sub(nt),Pt=bt.length();bt.normalize();let qt=nt.clone().addScaledVector(bt,Pt*.55),mt=.26*(Pt*.45)*Math.tan(am.degToRad(l.fov/2));return{P:qt,escala:mt/Dn,camPos:V}}function ga(){ki?.progress(1);let V=lt.timeline();return f.modo="arcoiris",V.to(h,{omega:Ob,duration:.6,ease:"power2.in"},0).to(h,{omega:Hl,duration:3.5,ease:"power2.out"},1.4).to(x,{velocidad:6,intensidad:.4,duration:.3},0).to(x,{velocidad:1,intensidad:.22,duration:2},3).to(f,{velocidad:10,duration:.3},0).call(()=>{f.modo="persecucion",f.velocidad=6},null,4.5),n||V.to(d,{ang:`+=${Math.PI*2}`,duration:3.6,ease:"power2.inOut",onComplete:()=>{d.ang=.42}},.2),e.forEach((nt,bt)=>{V.call(()=>{Rt(new k((Math.random()-.5)*6,1+Math.random()*2.5,(Math.random()-.5)*2),nt,140,8),ma(nt,.6)},null,.2+bt*.35)}),V}function xn({alEntrar:V}={}){ki?.progress(1),f.modo="persecucion",un({alEntrar:V}),lt.to(x,{intensidad:.22,duration:.6})}function _a(){lt.to(h,{omega:0,duration:2.5,ease:"power2.out"}),lt.to(x,{intensidad:.2,duration:2}),f.velocidad=2}return{intro:xr,sortear:Ge,celebrar:ga,reiniciar:xn,terminar:_a,sacudir:On,retirar:kt}}var Qs=i=>document.getElementById(i),to="#14112b",Cm=null;function Oh(i=14,t=!1){if(t)return;let e=Qs("mundo");lt.killTweensOf(e),lt.timeline().to(e,{x:()=>lt.utils.random(-i,i),y:()=>lt.utils.random(-i,i),rotation:()=>lt.utils.random(-.6,.6),duration:.05,repeat:5,yoyo:!0,ease:"none"}).to(e,{x:0,y:0,rotation:0,duration:.2,ease:"elastic.out(1, 0.4)"})}function Rm({letra:i,numero:t,color:e,textoClaro:n},{ritmo:r=1,reducirMovimiento:s=!1}={}){Cm?.progress(1);let a=Qs("anuncio"),o=Qs("franja"),l=Qs("franjaTinta"),c=Qs("anuncioLetra"),u=Qs("anuncioNumero");c.textContent=i,c.style.background=e,c.style.color=n?"#fff3df":to,u.innerHTML=String(t).split("").map(x=>`<span class="inline-block">${x}</span>`).join("");let h=u.children,d=s?.5:r,f=lt.timeline();return Cm=f,f.set(a,{display:"block"}).set([o,l],{skewY:-7,backgroundColor:x=>x===0?e:to}).fromTo(l,{scaleX:0,transformOrigin:"0% 50%"},{scaleX:1,duration:.3*d,ease:"expo.out"}).fromTo(o,{scaleX:0,transformOrigin:"0% 50%"},{scaleX:1,duration:.3*d,ease:"expo.out"},`<${.06*d}`).fromTo(c,{scale:4,rotation:-50,autoAlpha:0},{scale:1,rotation:-8,autoAlpha:1,duration:.4*d,ease:"expo.out"},`<${.05*d}`).call(()=>Oh(16,s)).fromTo(h,{yPercent:140,rotation:25,autoAlpha:0,scale:.6},{yPercent:0,rotation:0,autoAlpha:1,scale:1,duration:.5*d,ease:"back.out(2.4)",stagger:.08*d},`<${.04*d}`).to(c,{rotation:-3,scale:1.06,duration:.35*d,ease:"sine.inOut",yoyo:!0,repeat:1}).to(h,{y:-10,duration:.35*d,ease:"sine.inOut",yoyo:!0,repeat:1,stagger:.05},"<").to([c,u],{xPercent:160,skewX:-20,autoAlpha:0,duration:.3*d,ease:"power3.in",stagger:.04}).to([o,l],{scaleX:0,transformOrigin:"100% 50%",duration:.3*d,ease:"expo.in",stagger:.04},"<0.08").set([c,u],{clearProps:"transform,opacity,visibility"}).set(a,{display:"none"}),f}var Gl=null;function Fh({colores:i,reducirMovimiento:t=!1}){let e=document.querySelectorAll("#tituloBingo .letra-bingo"),n=document.querySelector("#modalBingo .modal-caja"),r=lt.timeline();return Gl?.kill(),r.fromTo("#flash",{opacity:.95},{opacity:0,duration:.7,ease:"power2.out"},0).fromTo(e,{y:()=>-window.innerHeight,rotation:()=>lt.utils.random(-120,120),scale:1.3},{y:0,rotation:(s,a)=>Number(a.dataset.rot),scale:1,duration:1,ease:"bounce.out",stagger:.12},.1).fromTo(n,{yPercent:140,rotation:6},{yPercent:0,rotation:0,duration:.8,ease:"back.out(1.4)"},.75),e.forEach((s,a)=>r.call(()=>Oh(10,t),null,.1+a*.12+.36)),r.call(()=>eo(i,{cantidad:t?40:110}),null,.2).call(()=>eo(i,{cantidad:t?0:90}),null,1.1).call(()=>{t||(Gl=lt.to(e,{y:-14,rotation:(s,a)=>Number(a.dataset.rot)*-1,duration:.7,ease:"sine.inOut",yoyo:!0,repeat:-1,stagger:{each:.12,yoyo:!0,repeat:-1}}))},null,1.8),r}function Pm(){Gl?.kill(),Gl=null}function Wl(i,{texto:t,fondo:e,color:n=to},r=!1){i.textContent=t,i.style.background=e,i.style.color=n,i.style.borderColor=to,i.classList.remove("hidden"),lt.fromTo(i,{scale:3.5,rotation:-35,autoAlpha:0},{scale:1,rotation:-12,autoAlpha:1,duration:.42,ease:"power4.in",onComplete:()=>{Oh(12,r),lt.fromTo(i,{scale:.92},{scale:1,duration:.4,ease:"elastic.out(1, 0.4)"})}})}function eo(i,{cantidad:t=100}={}){if(!t)return;let e=document.createElement("div");e.className="pointer-events-none fixed inset-0 z-[55] overflow-hidden",e.setAttribute("aria-hidden","true"),document.body.appendChild(e);let n=window.innerWidth,r=window.innerHeight,s=["50%","3px","triangulo"];for(let a=0;a<t;a++){let o=a%2===0,l=document.createElement("span"),c=lt.utils.random(10,18),u=s[a%s.length],h=i[a%i.length];l.style.cssText=`position:absolute;left:${o?-10:n+10}px;top:${r+10}px;width:${c}px;height:${c*(u==="3px"?.6:1)}px;`+(u==="triangulo"?`background:${h};clip-path:polygon(50% 0,100% 100%,0 100%);`:`background:${h};border:2.5px solid ${to};border-radius:${u};`),e.appendChild(l);let d=lt.utils.random(.25,.85)*n,f=lt.utils.random(.45,.95)*r,x=lt.utils.random(.55,.85),g=lt.utils.random(1.4,2.4),m=o?d:-d,p=lt.utils.random(0,.25);lt.to(l,{x:m,duration:x+g,ease:"none",delay:p}),lt.to(l,{rotation:lt.utils.random(-900,900),duration:x+g,ease:"none",delay:p}),lt.timeline({delay:p}).to(l,{y:-f,duration:x,ease:"power2.out"}).to(l,{y:r*.3,duration:g,ease:"power1.in"}).to(l,{opacity:0,duration:.4},"-=0.4"),lt.to(l,{scaleY:-1,duration:lt.utils.random(.15,.35),repeat:-1,yoyo:!0,ease:"sine.inOut"})}lt.delayedCall(3.6,()=>{lt.killTweensOf(e.children),e.remove()})}var $r=null,Xl=null,Yr=null,Bh=.8,zh=1;function Zr(i){return Yr||(Yr=i.createGain(),Yr.gain.value=Bh,Yr.connect(i.destination)),Yr}function kh({efectos:i,voz:t}={}){Number.isFinite(i)&&(Bh=Math.min(1,Math.max(0,i)),Yr&&$r&&Yr.gain.setTargetAtTime(Bh,$r.currentTime,.02)),Number.isFinite(t)&&(zh=Math.min(1,Math.max(0,t)))}function ea(){if(!$r){let i=window.AudioContext||window.webkitAudioContext;if(!i)return null;$r=new i}return $r.state==="suspended"&&$r.resume(),$r}function Vh(i){if(!Xl){Xl=i.createBuffer(1,i.sampleRate*2,i.sampleRate);let e=Xl.getChannelData(0);for(let n=0;n<e.length;n++)e[n]=Math.random()*2-1}let t=i.createBufferSource();return t.buffer=Xl,t.loop=!0,t}function ta(i,t,e,n,r){let s=i.createGain();return s.gain.setValueAtTime(1e-4,t),s.gain.exponentialRampToValueAtTime(e,t+n),s.gain.exponentialRampToValueAtTime(1e-4,t+n+r),s}function Lm(i=1){let t=ea();if(!t)return;let e=t.currentTime,n=Vh(t),r=t.createBiquadFilter();r.type="bandpass",r.frequency.value=220,r.Q.value=.7;let s=t.createGain();s.gain.value=.5;let a=t.createOscillator();a.frequency.value=24;let o=t.createGain();o.gain.value=.5,a.connect(o).connect(s.gain);let l=t.createGain();l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(.35,e+i*.85),l.gain.exponentialRampToValueAtTime(1e-4,e+i+.05),n.connect(r).connect(s).connect(l).connect(Zr(t)),n.start(e),a.start(e),n.stop(e+i+.1),a.stop(e+i+.1)}function Im(i=.6){let t=ea();if(!t)return;let e=t.currentTime,n=Vh(t),r=t.createBiquadFilter();r.type="bandpass",r.Q.value=4,r.frequency.setValueAtTime(500,e),r.frequency.exponentialRampToValueAtTime(3200,e+i);let s=ta(t,e,.3,i*.7,i*.3);n.connect(r).connect(s).connect(Zr(t)),n.start(e),n.stop(e+i+.05)}function na(){let i=ea();if(!i)return;let t=i.currentTime;[1318.5,1975.5,2637].forEach((e,n)=>{let r=i.createOscillator();r.type="sine",r.frequency.value=e;let s=ta(i,t,.16/(n+1),.005,1.1);r.connect(s).connect(Zr(i)),r.start(t),r.stop(t+1.2)})}function Jr(i=1){let t=ea();if(!t)return;let e=t.currentTime,n=t.createOscillator();n.type="sine",n.frequency.setValueAtTime(150,e),n.frequency.exponentialRampToValueAtTime(40,e+.3);let r=ta(t,e,.7*i,.005,.35);n.connect(r).connect(Zr(t)),n.start(e),n.stop(e+.4);let s=Vh(t),a=t.createBiquadFilter();a.type="highpass",a.frequency.value=1800;let o=ta(t,e,.25*i,.002,.06);s.connect(a).connect(o).connect(Zr(t)),s.start(e),s.stop(e+.1)}function ia(){let i=ea();if(!i)return;let t=[[523.25,0],[659.25,.12],[783.99,.24],[1046.5,.36],[783.99,.56],[1046.5,.68]];t.forEach(([e,n],r)=>{let s=i.currentTime+n;for(let a of[-8,8]){let o=i.createOscillator();o.type="sawtooth",o.frequency.value=e,o.detune.value=a;let l=i.createBiquadFilter();l.type="lowpass",l.frequency.value=2400;let c=ta(i,s,.07,.02,r===t.length-1?1.1:.18);o.connect(l).connect(c).connect(Zr(i)),o.start(s),o.stop(s+1.3)}})}function Dm(i=.5){let t=ea();if(!t)return;let e=t.currentTime,n=1200+i*900+Math.random()*120;for(let[r,s]of[[n,.12],[n*2.7,.04]]){let a=t.createOscillator();a.type="sine",a.frequency.setValueAtTime(r,e);let o=ta(t,e,s,.004,.18);a.connect(o).connect(Zr(t)),a.start(e),a.stop(e+.25)}}function Fi(i,t="es-ES"){if(!("speechSynthesis"in window)||(i&&typeof i=="object"&&({texto:i,lang:t="es-ES"}=i),!i||zh===0))return;window.speechSynthesis.cancel();let e=new SpeechSynthesisUtterance(i);e.lang=t,e.volume=zh,e.rate=.95,e.pitch=1.05,window.speechSynthesis.speak(e)}function ql(){"speechSynthesis"in window&&window.speechSynthesis.cancel()}var Gh=["B","I","N","G","O"];var Nm="ABCDEFGHJKMNPQRSTUVWXYZ23456789",Wh=Nm,Fb=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]);function aa(i){let t=i.length,e=Math.ceil((t+9)/64)*64,n=new Uint8Array(e);n.set(i),n[t]=128;let r=new DataView(n.buffer);r.setUint32(e-8,Math.floor(t/536870912)),r.setUint32(e-4,t*8>>>0);let s=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),a=new Uint32Array(64),o=(l,c)=>l>>>c|l<<32-c;for(let l=0;l<e;l+=64){for(let p=0;p<16;p++)a[p]=r.getUint32(l+p*4);for(let p=16;p<64;p++){let y=o(a[p-15],7)^o(a[p-15],18)^a[p-15]>>>3,v=o(a[p-2],17)^o(a[p-2],19)^a[p-2]>>>10;a[p]=a[p-16]+y+a[p-7]+v|0}let[c,u,h,d,f,x,g,m]=s;for(let p=0;p<64;p++){let y=m+(o(f,6)^o(f,11)^o(f,25))+(f&x^~f&g)+Fb[p]+a[p]|0,v=(o(c,2)^o(c,13)^o(c,22))+(c&u^c&h^u&h)|0;m=g,g=x,x=f,f=d+y|0,d=h,h=u,u=c,c=y+v|0}s[0]+=c,s[1]+=u,s[2]+=h,s[3]+=d,s[4]+=f,s[5]+=x,s[6]+=g,s[7]+=m}return s}function Bb(i){let t=new TextEncoder().encode(i),e=new Uint8Array(t.length+4);e.set(t);let n=new DataView(e.buffer,t.length,4),r=0,s=[],a=()=>(s.length===0&&(n.setUint32(0,r++),s=Array.from(aa(e))),s.shift());return o=>{let l=4294967296-4294967296%o;for(;;){let c=a();if(c<l)return c%o}}}function Om(i){return String(i??"").toUpperCase().replace(/[^A-Z0-9]/g,"")}function Xh(i){return i.length===4&&[...i].every(t=>Nm.includes(t))}var zb=(i,t)=>`${i}-${String(t).padStart(3,"0")}`;function Fm(i,t=null){let e=String(i??"").toUpperCase().match(/[A-Z0-9]+/g)||[];if(e.length===0)return{error:"Escribe el n\xFAmero o el c\xF3digo del cart\xF3n."};let n,r;if(e.length===1&&/^\d+$/.test(e[0])&&e[0].length<=3){if(!t)return{error:"Escribe el c\xF3digo completo, ej: K7QX-042."};n=t,r=e[0]}else if(e.length===1)n=e[0].slice(0,4),r=e[0].slice(4);else if(e.length===2)[n,r]=e;else return{error:"C\xF3digo no reconocido. Ejemplo: K7QX-042."};return Xh(n)?!/^\d{1,3}$/.test(r)||Number(r)<1?{error:"El n\xFAmero de cart\xF3n va del 1 al 999."}:{serie:n,numero:Number(r)}:{error:`"${n}" no es una serie v\xE1lida.`}}function Yl(i,t){let e=Bb(`bingoshow:carton:v2:${i}:${t}`),n=Gh.map((r,s)=>{let a=Array.from({length:15},(c,u)=>s*15+u+1),o=s===2?4:5;for(let c=0;c<o;c++){let u=c+e(a.length-c);[a[c],a[u]]=[a[u],a[c]]}let l=a.slice(0,o).sort((c,u)=>c-u);return s===2&&l.splice(2,0,null),l});return{serie:i,numero:t,codigo:zb(i,t),columnas:n}}var sa=[0,1,2,3,4],ra=sa.map(i=>sa.map(t=>[t,i])),no=sa.map(i=>sa.map(t=>[i,t])),Um=[sa.map(i=>[i,i]),sa.map(i=>[i,4-i])],$l=(...i)=>[...new Map(i.flat().map(t=>[t.join(","),t])).values()],kb=[1,2,3].flatMap(i=>[1,2,3].map(t=>[i,t])),Kr={linea:{nombre:"L\xEDnea",detalle:"fila, columna o diagonal",figuras:[...ra,...no,...Um]},esquinas:{nombre:"4 esquinas",detalle:"las cuatro esquinas",figuras:[[[0,0],[4,0],[0,4],[4,4]]]},lleno:{nombre:"Cart\xF3n lleno",detalle:"los 24 n\xFAmeros",figuras:[ra.flat()]},letraL:{nombre:"Letra L",detalle:"columna B y fila de abajo",figuras:[$l(no[0],ra[4])]},letraT:{nombre:"Letra T",detalle:"fila de arriba y columna N",figuras:[$l(ra[0],no[2])]},letraX:{nombre:"Letra X",detalle:"las dos diagonales",figuras:[$l(...Um)]},marco:{nombre:"Marco",detalle:"todo el borde del cart\xF3n",figuras:[$l(ra[0],ra[4],no[0],no[4])]},cuadro:{nombre:"Cuadro central",detalle:"los 8 n\xFAmeros alrededor del centro",figuras:[kb]}};function Zl(i,t,e="linea"){let{figuras:n}=Kr[e]??Kr.linea,r=([l,c])=>i.columnas[l][c],s=[],a=null;for(let l of n){let c=l.map(r).filter(u=>u!==null&&!t.has(u));c.length===0?s.push(l):(!a||c.length<a.faltan.length)&&(a={figura:l,faltan:c})}let o=i.columnas.map(l=>l.map(c=>c===null||t.has(c)));return{gana:s.length>0,ganadoras:s,figura:s.length?s.flat():a.figura,faltan:s.length?[]:a.faltan.sort((l,c)=>l-c),marcadas:o}}var Bm=["#ff5a36","#ffc43d","#19c3a0","#3d6bff","#ff4fa3"],Vb=[!1,!1,!1,!0,!1],zm=i=>Vb[i]?"#fff3df":"#14112b";function Jl(i,{marcadas:t=null,clave:e=[],faltan:n=[]}={}){let r=new Set(e.map(([l,c])=>`${l},${c}`)),s=new Set(n),a=Gh.map((l,c)=>`<div class="carton-letra" style="--c:${Bm[c]};color:${zm(c)}">${l}</div>`).join(""),o="";for(let l=0;l<5;l++)for(let c=0;c<5;c++){let u=i.columnas[c][l],h=["carton-celda"],d=`--c:${Bm[c]}`;u===null?h.push("carton-libre"):t&&(t[c][l]?(h.push("marcada"),d+=`;color:${zm(c)}`):s.has(u)||h.push("apagada")),r.has(`${c},${l}`)&&h.push("clave"),s.has(u)&&h.push("falta");let f=u===null?"<span>\u2605</span>Libre":u;o+=`<div class="${h.join(" ")}" style="${d}">${f}</div>`}return`<article class="carton" aria-label="Cart\xF3n ${i.codigo}"><div class="carton-fila" aria-hidden="true">${a}</div><div class="carton-fila">${o}</div><footer class="carton-pie"><span>Bingo Show</span><span class="carton-codigo">${i.codigo}</span></footer></article>`}var Hb=i=>globalThis.crypto.getRandomValues(i);function Gb(i,t=Hb){if(!Number.isInteger(i)||i<1||i>4294967296)throw new RangeError(`n fuera de rango: ${i}`);let e=4294967296-4294967296%i,n=new Uint32Array(1);for(;;)if(t(n),n[0]<e)return n[0]%i}function km(i,t){if(i.length===0)throw new RangeError("No quedan bolas");return i.splice(Gb(i.length,t),1)[0]}var qh={jugador:i=>`bingoshow.jugador.${i}`,anfitrion:i=>`bingoshow.anfitrion.${i}`,apodo:"bingoshow.apodo"},Kl=i=>String(i??"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6);async function Wb(i,t){let e=await fetch(i,{...t,headers:{"content-type":"application/json",...t?.headers||{}}}),n=await e.json().catch(()=>({}));if(!e.ok)throw new Error(n.error||`Error ${e.status}`);return n}var Vm=i=>Wb(`/api/salas/${encodeURIComponent(Kl(i))}`);function Hm(i,{hola:t,alMensaje:e,alCambiarConexion:n=()=>{}}){let r=new URL(`/api/salas/${encodeURIComponent(Kl(i))}/ws`,location.href);r.protocol=r.protocol==="https:"?"wss:":"ws:";let s=null,a=0,o=!1,l=null,c=null;function u(){n(a===0?"conectando":"reconectando"),s=new WebSocket(r),s.addEventListener("open",()=>{a=0,s.send(JSON.stringify({tipo:"hola",...t()})),n("conectado"),clearInterval(c),c=setInterval(()=>h({tipo:"ping"}),25e3)}),s.addEventListener("message",f=>{let x;try{x=JSON.parse(f.data)}catch{return}x.tipo==="expulsado"&&(o=!0),e(x)}),s.addEventListener("close",()=>{if(clearInterval(c),o)return n("cerrado");let f=Math.min(8e3,500*2**a++);n("reconectando"),l=setTimeout(u,f)})}function h(f){return s?.readyState===WebSocket.OPEN?(s.send(JSON.stringify(f)),!0):!1}function d(){o=!0,clearTimeout(l),clearInterval(c),s?.close()}return u(),{enviar:h,cerrar:d}}var $h="fila5",Gm={nombre:"Fila de 5",detalle:"los 5 n\xFAmeros de tu fila"},io=i=>i?.tipo==="fila";function Wm(i){if(!Number.isInteger(i)||i<1||i>15)throw new RangeError("La fila debe ser un n\xFAmero del 1 al 15.");return[0,1,2,3,4].map(t=>i+t*15)}var Yh="elige5",Xm={nombre:"Elige tus 5",detalle:"los 5 n\xFAmeros que elegiste"},jl=i=>i?.tipo==="elige",qm=i=>io(i)||jl(i);var rg=Vg(Jm(),1);var jm=new TextEncoder,qb=i=>Array.from(i,t=>t.toString(16).padStart(2,"0")).join("");function Qm(i){if(typeof i!="string"||i.length%2||/[^0-9a-f]/i.test(i))throw new TypeError("Hex no v\xE1lido");return Uint8Array.from(i.match(/../g)||[],t=>parseInt(t,16))}function Zh(i){let t=new Uint8Array(i.length*4),e=new DataView(t.buffer);return i.forEach((n,r)=>e.setUint32(r*4,n)),t}var Km=(i,t)=>{let e=new Uint8Array(i.length+t.length);return e.set(i),e.set(t,i.length),e},tg=i=>qb(Zh(aa(i)));function $b(i,t){let e=i.length>64?Zh(aa(i)):i,n=new Uint8Array(64);n.set(e);let r=n.map(a=>a^54),s=n.map(a=>a^92);return aa(Km(s,Zh(aa(Km(r,t)))))}var Yb=i=>tg(Qm(i));function Zb(i){let t=i.map(({apodo:e,semilla:n})=>`${e}:${n}`).sort();return tg(jm.encode(t.join(`
`)))}function Jh(i,t){let e=Qm(i),n=0,r=[],s=()=>(r.length===0&&(r=Array.from($b(e,jm.encode(`${t}:${n++}`)))),r.shift());return a=>{let o=4294967296-4294967296%a;for(;;){let l=s();if(l<o)return l%a}}}function Jb(i,t){let e=Jh(i,`bingoshow:serie:v1:${t}`);return Array.from({length:4},()=>Wh[e(Wh.length)]).join("")}function Kb(i,t,e=75){let n=Array.from({length:75},(s,a)=>a+1),r=[];for(let s=0;s<Math.min(e,75);s++){let a=Jh(i,`bingoshow:bola:v1:${t}:${s}`);r.push(n.splice(a(n.length),1)[0])}return r}function jb(i,t){return Jh(i,`bingoshow:dorada:v1:${t}`)(75)+1}function eg({compromiso:i,semillaServidor:t,semillasClientes:e,semillaClientes:n,serie:r,bolas:s,dorada:a=null}){let o=[];try{Yb(t)!==i&&o.push("La semilla revelada no coincide con el compromiso publicado al principio.");let l=Zb(e);l!==n&&o.push("Las semillas de los jugadores no dan la semilla combinada publicada."),Jb(t,l)!==r&&o.push("La serie de los cartones no sale de las semillas.");let c=Kb(t,l),u=s.findIndex((h,d)=>h!==c[d]);u!==-1&&o.push(`La bola n\xBA ${u+1} (${s[u]}) no es la que tocaba (${c[u]}).`),a!==null&&jb(t,l)!==a&&o.push("La bola dorada no sale de las semillas.")}catch(l){o.push(`Datos no v\xE1lidos: ${l.message}`)}return{valida:o.length===0,errores:o}}var Tt=i=>document.getElementById(i),Qb=["bg-tomate","bg-girasol","bg-menta","bg-cobalto text-crema","bg-fucsia","bg-crema"],tS={conectando:"Conectando\u2026",conectado:"Conectado",reconectando:"Reconectando\u2026",cerrado:"Desconectado"},fe=i=>String(i??"").replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`),ro=i=>i===$h?Gm.nombre:i===Yh?Xm.nombre:Kr[i]?.nombre??i,so=i=>Math.max(0,Math.ceil((i-Date.now())/1e3));function ng(i){let t=(0,rg.default)(0,"M");return t.addData(i),t.make(),t.createSvgTag({cellSize:4,margin:0,scalable:!0})}var eS=["#ff5a36","#ffc43d","#19c3a0","#3d6bff","#ff4fa3"],ig=i=>jl(i?.config)?{uno:"jugada",varios:"jugadas",Uno:"Jugada",Varios:"Jugadas",vendido:"jugada vendida",vendidos:"jugadas vendidas",sin:"Sin jugadas",alguien:"Esperando a que alguien arme una jugada"}:io(i?.config)?{uno:"fila",varios:"filas",Uno:"Fila",Varios:"Filas",vendido:"fila vendida",vendidos:"filas vendidas",sin:"Sin filas",alguien:"Esperando a que alguien elija una fila"}:{uno:"cart\xF3n",varios:"cartones",Uno:"Cart\xF3n",Varios:"Cartones",vendido:"cart\xF3n vendido",vendidos:"cartones vendidos",sin:"Sin cartones",alguien:"Esperando a que alguien elija un cart\xF3n"},pr=i=>`${Number(i||0).toLocaleString("es")} ${i===1?"ficha":"fichas"}`,Kh=(i,t,e)=>`${i} ${i===1?t:e}`;function nS(i){try{return localStorage.getItem(qh.anfitrion(i))}catch{return null}}function sg(){let i=Kl(new URLSearchParams(location.search).get("sala"));return i.length===6?i:null}var jh=i=>`${location.origin}/jugar.html?sala=${i}`;function iS(i){let t=Tt("salaVincular"),e=Tt("salaVincularCodigo"),n=Tt("salaVincularError");t.classList.remove("hidden"),e.addEventListener("input",()=>{e.value=e.value.replace(/\D/g,"").slice(0,6)}),t.addEventListener("submit",async r=>{r.preventDefault();let s=a=>{n.textContent=a,n.classList.remove("hidden")};if(e.value.length!==6)return s("Son 6 cifras.");try{let a=await fetch(`/api/salas/${i}/vincular`,{method:"POST",body:JSON.stringify({codigo:e.value})}),o=await a.json().catch(()=>({}));if(!a.ok)throw new Error(o.error||"No se pudo vincular.");localStorage.setItem(qh.anfitrion(i),o.tokenAnfitrion),location.reload()}catch(a){s(a instanceof TypeError?"No se pudo contactar con el servidor.":a.message)}})}function ag(i,t){document.body.classList.add("en-linea","sala-cargando"),Tt("infoCodigo").textContent=i;let e=null,n=null,r=!1,s=!1,a=null,o=null,l=!1,c=null,u=null,h=null;p();let d=nS(i);if(!d)return O("Esta sala no es tuya",`En este dispositivo no est\xE1 guardada la llave de anfitri\xF3n de la sala ${i}. Si vienes a jugar, entra desde el m\xF3vil.`,[{texto:"Jugar en esta sala",href:`jugar.html?sala=${i}`,clase:"bg-girasol"},{texto:"Crear otra sala",href:"sala.html",clase:"bg-crema"},{texto:"Show sin conexi\xF3n",href:"show.html",clase:"bg-crema"}]),iS(i),$();Vm(i).then(()=>f()).catch(A=>{/no existe|404|encontr/i.test(A.message)?O("Sala no encontrada",`No hay ninguna sala con el c\xF3digo ${i}. Puede que haya caducado.`,[{texto:"Crear una sala",href:"sala.html",clase:"bg-girasol"},{texto:"Show sin conexi\xF3n",href:"show.html",clase:"bg-crema"}]):f()});function f(){e=Hm(i,{hola:()=>({rol:"anfitrion",token:d}),alMensaje:g,alCambiarConexion:v})}function x(A){return e?.enviar(A)?!0:(t.avisar("Sin conexi\xF3n con la sala"),!1)}function g(A){switch(A.tipo){case"bienvenida":return A.rol!=="anfitrion"?(e?.cerrar(),O("No eres el anfitri\xF3n","El servidor no reconoce la llave de anfitri\xF3n guardada en este dispositivo.",[{texto:"Jugar en esta sala",href:`jugar.html?sala=${i}`,clase:"bg-girasol"}])):(r=!0,m(A.estado));case"estado":return m(A.estado);case"bola":Number.isInteger(A.numero)&&!(A.indice>t.cantadas())&&t.bola(A.numero);return;case"ganador":return st(A);case"cuenta":return t.cuentaAtras(Number(A.ms)||4e3);case"dorada":return lt.delayedCall(2.4,()=>K(A));case"reaccion":return tt(A.emoji,A.apodo);case"solicitud":return t.sonido()&&na(),t.avisar(`${A.apodo} pide ${pr(A.cantidad)}`);case"vinculo":return et(A);case"aviso":return t.avisar(A.texto);case"error":return r?t.avisar(A.mensaje||"Algo sali\xF3 mal"):(e?.cerrar(),O("No se pudo abrir la sala",A.mensaje||"El servidor rechaz\xF3 la conexi\xF3n del anfitri\xF3n.",[{texto:"Jugar en esta sala",href:`jugar.html?sala=${i}`,clase:"bg-girasol"},{texto:"Crear otra sala",href:"sala.html",clase:"bg-crema"}]));default:return}}function m(A){if(!A)return;let N=n;n=A;let X=A.estado;document.body.classList.remove("sala-cargando"),document.body.classList.toggle("sala-lobby",X==="lobby"),Tt("lobby").classList.toggle("hidden",X!=="lobby");let I=h&&Date.now()<h.hasta&&A.config?.intervalo!==h.valor;if(I||(h=null),!I&&A.config?.intervalo&&t.fijarVelocidad(A.config.intervalo),X==="lobby"?(N&&N.estado!=="lobby"?(a?.kill(),o?.kill(),t.hayModal()&&t.cerrarModal(),t.reiniciar({aviso:"\xA1Nueva partida! A elegir cartones"}),lt.from("#lobby section, #empezarBtn",{y:60,opacity:0,duration:.6,ease:"back.out(1.8)",stagger:.08,clearProps:"all"})):t.cantadas()>0&&t.fijarBolas([]),s=!1,M(A)):(N?.estado==="lobby"&&(t.avisar("\xA1Que empiece el show!"),lt.from("#actual > div, #controles > *, #infoEnLinea",{y:60,opacity:0,duration:.6,ease:"back.out(2)",stagger:.06,clearProps:"transform,opacity"})),t.fijarBolas(A.bolas||[])),_(A),t.correrReloj(X==="jugando"),q(A),S(A),L(A),U(A),X==="terminada"&&!s){s=!0;let xt=t.hayModal()||o?.isActive()?6:N?1.6:0;a?.kill(),a=lt.delayedCall(xt,()=>{t.hayModal()&&t.cerrarModal(),t.finalizar(j(n)),Tt("finNuevaBtn")?.addEventListener("click",z),Tt("finVerificarBtn")?.addEventListener("click",rt)})}}function p(){Tt("conexion").classList.remove("hidden"),Tt("enLineaBtn").classList.add("hidden"),Tt("cartonesBtn").classList.add("hidden"),Tt("bingoBtn").classList.add("hidden"),Tt("infoEnLinea").classList.remove("hidden"),Tt("bingoLocal").classList.add("hidden"),Tt("bingoEnLinea").classList.remove("hidden"),Tt("nuevaPartidaBtn").classList.add("hidden"),Tt("bingoBotones").classList.replace("grid-cols-2","grid-cols-1"),Tt("textoReset").textContent="Se liberan los cartones y todos vuelven a la sala de espera. Los saldos de fichas se conservan.",Tt("confirmarResetBtn").textContent="Nueva partida",document.querySelector("#tituloReset").textContent="\xBFNueva partida?",Tt("lobbyCodigo").innerHTML=[...i].map((A,N)=>`<span class="lobby-letra ${Qb[N]}" style="--r:${[-5,3,-2,5,-4,2][N]}deg">${A}</span>`).join(""),Tt("lobbyEnlace").value=jh(i);try{Tt("lobbyQr").innerHTML=ng(jh(i))}catch{Tt("lobbyQr").classList.add("hidden")}Tt("detenerCuentaBtn").addEventListener("click",()=>x({tipo:"detenerCuenta"})),setInterval(()=>{document.querySelectorAll("[data-hasta]").forEach(A=>{A.textContent=String(so(Number(A.dataset.hasta)))}),n?.estado==="lobby"&&n.inicioAutoEn&&(Tt("lobbyCuentaSeg").textContent=String(so(n.inicioAutoEn)))},250),Tt("copiarBtn").addEventListener("click",y),Tt("lobbyEnlace").addEventListener("focus",A=>A.target.select()),Tt("empezarBtn").addEventListener("click",()=>{n?.estado==="lobby"&&x({tipo:"iniciar"})&&(Tt("empezarBtn").disabled=!0)}),Tt("vincularBtn").addEventListener("click",()=>x({tipo:"vincular"})),Tt("lobbyJugadores").addEventListener("click",A=>{let N=A.target.closest("[data-admitir]");if(N){let dt=Number(N.dataset.cantidad)||0;return x(dt>0?{tipo:"darFichas",jugadorId:N.dataset.admitir,cantidad:dt}:{tipo:"admitir",jugadorId:N.dataset.admitir})}let X=A.target.closest("[data-dar]");if(X)return x({tipo:"darFichas",jugadorId:X.dataset.dar,cantidad:Number(X.dataset.cantidad)});let I=A.target.closest("[data-expulsar]");if(!I)return;let xt=I.dataset.expulsar;if(u!==xt){u=xt,M(n);return}u=null,x({tipo:"expulsar",jugadorId:xt})})}async function y(){let A=jh(i);try{await navigator.clipboard.writeText(A)}catch{Tt("lobbyEnlace").focus(),Tt("lobbyEnlace").select();try{document.execCommand("copy")}catch{}}t.avisar("\xA1Enlace copiado!"),lt.fromTo("#copiarBtn",{rotation:-8},{rotation:0,duration:.6,ease:"elastic.out(1, 0.3)",clearProps:"transform"})}function v(A){let N=Tt("conexion");N.dataset.estado=A,Tt("conexionTexto").textContent=tS[A]??A,A==="reconectando"&&U(n),A==="conectado"&&U(n)}function b(A){return Object.keys(A.ocupados||{}).length}function w(A){if(A.estado!=="lobby"&&A.pozo)return A.pozo;let N=b(A)*(A.config?.precioCarton||0),X=Math.floor(N*(A.config?.botePorcentaje||0)/100);return Math.max(A.pozo||0,N-X+(A.config?.pozoExtra||0))}function M(A){let N=A.config||{},X=N.cartones||0,I=b(A),xt=w(A),dt=ig(A);Tt("lobbyUnidades").textContent=dt.Varios,Tt("lobbyNombre").textContent=A.nombre||`Sala ${i}`,Tt("lobbyPozo").textContent=xt.toLocaleString("es"),Tt("lobbyVendidos").textContent=I,Tt("lobbyTotal").textContent=X,Tt("lobbyBarra").style.width=`${X?I/X*100:0}%`,Tt("lobbyReglas").textContent=`${io(N)?"Fila de 5 \xB7 ":""}${pr(N.precioCarton)} por ${dt.uno} \xB7 m\xE1x. ${N.maxCartonesPorJugador??"\u2014"} por jugador \xB7 ${pr(N.fichasIniciales)} al entrar`,Tt("lobbyPremios").innerHTML=(N.premios||[]).map((T,Y)=>`
            <li class="flex items-center justify-between gap-3 rounded-xl border-[2.5px] border-tinta bg-papel px-3 py-2">
                <span class="flex items-center gap-2">
                    <span class="grid h-7 w-7 place-items-center rounded-lg border-[2.5px] border-tinta bg-girasol font-display text-sm">${Y+1}</span>
                    <span class="font-ui font-black uppercase tracking-wide">${fe(ro(T.modalidad))}</span>
                </span>
                <span class="text-right font-ui font-bold"><span class="font-display">${Math.floor(xt*T.porcentaje/100).toLocaleString("es")}</span> <span class="text-tinta/50">\xB7 ${T.porcentaje}%</span></span>
            </li>`).join("");let at=A.jugadores||[];Tt("lobbyConectados").textContent=`${at.filter(T=>T.conectado).length}/${at.length}${A.pro?"":` (m\xE1x. ${A.maxJugadores??15})`}`;let ht=new Map((A.solicitudes||[]).map(T=>[T.jugadorId,T.cantidad]));Tt("lobbyJugadores").innerHTML=at.length?at.map(T=>T.admitido===!1?`
            <li class="flex flex-wrap items-center gap-2 rounded-xl border-[2.5px] border-dashed border-tinta bg-papel px-3 py-2">
                <span class="min-w-0 flex-1">
                    <span class="block truncate font-ui font-black">${fe(T.apodo)}</span>
                    <span class="font-ui text-xs font-bold text-tinta/60">En espera${ht.has(T.id)?` \xB7 pide ${pr(ht.get(T.id))}`:""}</span>
                </span>
                <button type="button" data-admitir="${fe(T.id)}" data-cantidad="${ht.get(T.id)??0}" class="boton h-8 shrink-0 bg-menta px-2 text-[10px]">${ht.has(T.id)?`Admitir y dar ${ht.get(T.id)}`:"Admitir"}</button>
                <button type="button" data-expulsar="${fe(T.id)}" class="boton h-8 shrink-0 bg-crema px-2 text-[10px]">Rechazar</button>
            </li>`:`
            <li class="flex items-center gap-3 rounded-xl border-[2.5px] border-tinta bg-white px-3 py-2 ${T.conectado?"":"opacity-60"}">
                <span class="h-3 w-3 shrink-0 rounded-full border-2 border-tinta ${T.conectado?"bg-menta":"bg-tinta/20"}" title="${T.conectado?"Conectado":"Desconectado"}"></span>
                <span class="min-w-0 flex-1">
                    <span class="block truncate font-ui font-black">${fe(T.apodo)}</span>
                    <span class="flex flex-wrap gap-1 pt-0.5">${(T.cartones||[]).length?T.cartones.map(Y=>`<span class="rounded-md border-2 border-tinta bg-girasol px-1.5 font-display text-[11px] leading-5">${Y}</span>`).join(""):`<span class="font-ui text-xs font-bold text-tinta/50">${dt.sin}</span>`}</span>
                </span>
                <span class="shrink-0 text-right font-ui text-xs font-bold text-tinta/60">${pr(T.fichas)}${ht.has(T.id)?`<button type="button" data-dar="${fe(T.id)}" data-cantidad="${ht.get(T.id)}" class="boton mt-1 block h-7 bg-girasol px-2 text-[10px]">Dar ${ht.get(T.id)}</button>`:""}</span>
                <button type="button" data-expulsar="${fe(T.id)}" class="boton h-8 shrink-0 px-2 text-[10px] ${u===T.id?"bg-tomate text-crema":"bg-crema"}"
                        aria-label="Expulsar a ${fe(T.apodo)}" title="Expulsar">${u===T.id?"\xBFSeguro?":"\u2715"}</button>
            </li>`).join(""):`<li class="grid flex-1 place-items-center rounded-xl border-[2.5px] border-dashed border-tinta/30 p-6 text-center font-ui font-bold text-tinta/50">
                A\xFAn no hay nadie.<br>Escanea o escribe el enlace en el m\xF3vil para unirte.</li>`;let Nt=A.justo?.compromiso;Tt("lobbyJusto").classList.toggle("hidden",!Nt),Tt("lobbyJusto").classList.toggle("flex",!!Nt),Tt("lobbyCompromiso").textContent=Nt?Nt.slice(0,12):"",Tt("lobbyExtras").innerHTML=E(A),Tt("lobbyPlan").classList.toggle("hidden",!!A.pro),A.pro||(Tt("lobbyPlan").innerHTML=`<span class="font-black">Versi\xF3n gratis</span> \xB7 hasta ${A.maxJugadores??15} jugadores y 1 premio. <a href="precios.html" target="_blank" class="pointer-events-auto font-black underline">P\xE1sate a Pro</a>`);let wt=!!A.inicioAutoEn;Tt("lobbyCuenta").classList.toggle("hidden",!wt),Tt("lobbyCuenta").classList.toggle("flex",wt),wt&&(Tt("lobbyCuentaSeg").textContent=String(so(A.inicioAutoEn)));let P=I>0;Tt("empezarBtn").disabled=!P,Tt("empezarAyuda").textContent=P?`${Kh(I,dt.vendido,dt.vendidos)} \xB7 \xA1Todo listo!`:at.length?dt.alguien:"Esperando jugadores"}function E(A,N="div"){let X=A?.config||{},I=[];if(X.rondasSeguidas&&I.push(`<${N} class="flex items-center justify-between gap-2 rounded-xl border-[2.5px] border-tinta bg-menta px-3 py-1.5">
                <span class="font-ui font-black uppercase tracking-wide">Ronda ${A.ronda??1}</span><span class="font-ui text-xs font-bold">rondas seguidas</span></${N}>`),X.botePorcentaje>0){let xt=(A.bote||0)+(A.estado==="lobby"&&A.aporteRonda||0);I.push(`<${N} class="flex items-center justify-between gap-2 rounded-xl border-[2.5px] border-tinta bg-fucsia px-3 py-1.5">
                <span class="font-ui font-black uppercase tracking-wide">Bote <span class="text-xs normal-case">\xB7 en ${X.boteBolas} bolas o menos</span></span>
                <span class="font-display text-lg">${xt.toLocaleString("es")}</span></${N}>`)}return X.bolaDorada&&I.push(`<${N} class="flex items-center justify-between gap-2 rounded-xl border-[2.5px] border-tinta bg-girasol px-3 py-1.5">
                <span class="font-ui font-black uppercase tracking-wide">Bola dorada <span class="text-xs normal-case">\xB7 premio \xD72</span></span>
                <span class="font-display text-lg">${A.dorada?fe(`${t.columnaDe(A.dorada).letra}-${A.dorada}`):"\xBF?"}</span></${N}>`),I.join("")}let C=null;function _(A){if(A.logo===C)return;C=A.logo;let N=A.logo?`/api/salas/${i}/logo?v=${encodeURIComponent(A.logo)}`:"";for(let X of["marcaLogo","lobbyLogo"]){let I=Tt(X);I.classList.toggle("hidden",!N),N?(I.src=N,I.alt=`Logo de ${A.nombre||"el evento"}`):I.removeAttribute("src")}}function S(A){let N=A.jugadores||[],X=N.filter(xt=>xt.conectado).length;Tt("infoJugadores").textContent=`${X}/${N.length} conectados`,Tt("infoPozo").textContent=w(A).toLocaleString("es");let I=A.premios?.length?A.premios:A.config?.premios||[];Tt("infoPremios").innerHTML=E(A,"li")+I.map((xt,dt)=>{let at=dt===A.premioActual&&A.estado!=="lobby"&&A.estado!=="terminada",ht=xt.ganadores||[],Nt=ht.length?`<span class="truncate text-tinta/70">${ht.map(wt=>fe(wt.apodo)).join(", ")}</span>`:at?'<span class="premio-en-juego">En juego</span>':'<span class="text-tinta/40">Pendiente</span>';return`<li class="premio-fila ${at?"activo":""} ${ht.length?"ganado":""}">
                <span class="font-ui text-[11px] font-black uppercase tracking-wide">${ht.length?"\u2713 ":""}${fe(ro(xt.modalidad))}${xt.doble?" \xD72":""}</span>
                <span class="font-display text-xs">${(xt.fichas??Math.floor(w(A)*xt.porcentaje/100)).toLocaleString("es")}</span>
                <span class="col-span-2 flex min-w-0 font-ui text-[11px] font-bold">${Nt}</span>
            </li>`}).join("")}function L(A){let N=!!A.ventanaHasta&&A.estado==="jugando",X=Tt("ventanaBingo");N&&!l?(Tt("ventanaTitulo").textContent=io(A.config)?"\xA1Fila completa!":jl(A.config)?"\xA1Jugada completa!":"\xA1Bingo cantado!",X.classList.remove("hidden"),lt.fromTo(X.firstElementChild,{scale:2.5,rotation:-20,opacity:0},{scale:1,rotation:-3,opacity:1,duration:.45,ease:"back.out(2)"}),t.sonido()&&(Jr(.8),Fi(t.voz(qm(A.config)?"fila":"bingo")))):!N&&l&&lt.to(X.firstElementChild,{scale:.6,opacity:0,duration:.25,ease:"power2.in",onComplete:()=>X.classList.add("hidden")}),l=N}function U(A){if(!A)return;let N=Tt("conexion").dataset.estado==="conectado";Tt("playBtn").disabled=!N||A.estado==="terminada"||A.estado==="lobby",Tt("velocidadBtn").disabled=!N,Tt("resetBtn").disabled=!N||A.estado==="jugando"||A.estado==="pausa",Tt("resetBtn").title=A.estado==="terminada"?"Nueva partida (R)":"Disponible al terminar la partida",Tt("playBtn").setAttribute("aria-label",A.estado==="pausa"?"Reanudar":"Pausar")}function q(A){let N=A.estado==="jugando"&&!A.ventanaHasta?A.siguienteBolaEn:null;if(!N){c=null;return}if(c?.objetivo===N)return;let X=A.config?.intervalo||8e3,I=lt.utils.clamp(0,X+8e3,N-Date.now());c={objetivo:N,hasta:performance.now()+I,total:Math.max(X,I)}}function D(){return c?lt.utils.clamp(0,1,1-(c.hasta-performance.now())/c.total):0}function B(A){return`<div class="flex gap-2 rounded-2xl border-[3px] border-tinta bg-white p-3">${A.map((N,X)=>`
            <span class="fila-celda grid h-14 w-14 place-items-center rounded-full border-[3px] border-tinta font-display text-xl text-tinta"
                  style="background:${eS[X]}">${N}</span>`).join("")}</div>`}function G(A,N){if(N===$h)return Number.isInteger(A.carton)?B(Wm(A.carton)):"";if(N===Yh)return n?.jugadas?.[A.carton]?B(n.jugadas[A.carton]):"";if(!n?.serie||!Number.isInteger(A.carton))return"";try{let X=Yl(n.serie,A.carton),I=Zl(X,new Set(n.bolas||[]),N);return Jl(X,{marcadas:I.marcadas,clave:I.gana?I.figura:[]})}catch{return""}}function K({numero:A,fichas:N}){let X=document.createElement("div");X.className="aviso-dorada",X.innerHTML=`<p class="font-display text-4xl leading-none sm:text-6xl">\xA1Bola dorada!</p>
            <p class="mt-2 font-ui text-lg font-black">Sali\xF3 el ${fe(`${t.columnaDe(A).letra}-${A}`)} \xB7 el premio se duplica: ${pr(N)}</p>`,document.body.append(X),lt.timeline({onComplete:()=>X.remove()}).fromTo(X,{scale:.2,rotation:-12,autoAlpha:0},{scale:1,rotation:-3,autoAlpha:1,duration:.6,ease:"back.out(2.2)"}).to(X,{autoAlpha:0,y:-40,duration:.5,ease:"power2.in"},"+=2.6"),t.sacudir(),t.sonido()&&(ia(),lt.delayedCall(.6,()=>Fi(t.voz("dorada"))))}function tt(A,N){if(document.hidden)return;let X=document.createElement("div");X.className="reaccion-show",X.innerHTML=`<span class="text-5xl sm:text-6xl">${fe(A)}</span><span class="reaccion-apodo">${fe(N)}</span>`,X.style.left=`${8+Math.random()*55}%`,document.body.append(X),setTimeout(()=>X.remove(),3200)}function et({codigo:A,expira:N}){document.querySelector(".vinculo-capa")?.remove();let X=`${location.origin}/anfitrion.html?sala=${i}`,I=document.createElement("div");I.className="vinculo-capa",I.innerHTML=`<div class="carta w-full max-w-sm p-5 text-center" role="dialog" aria-modal="true" aria-label="Controlar desde el m\xF3vil">
            <p class="font-display text-2xl">Controla la sala desde tu m\xF3vil</p>
            <div class="mx-auto mt-3 h-36 w-36 rounded-xl border-[3px] border-tinta bg-white p-1.5 [&>svg]:h-full [&>svg]:w-full">${ng(X)}</div>
            <p class="mt-2 break-all font-ui text-xs font-bold text-tinta/70">${fe(X)}</p>
            <p class="etiqueta mt-3">Escribe este c\xF3digo en el m\xF3vil</p>
            <p class="font-display text-5xl tracking-[0.2em]">${fe(A)}</p>
            <p class="mt-2 font-ui text-xs font-bold text-tinta/70">Vale <span data-hasta="${N}">${so(N)}</span> s y una sola vez. No lo dejes a la vista del p\xFAblico.</p>
            <button type="button" class="boton mt-4 h-11 w-full bg-crema">Cerrar</button>
        </div>`,document.body.append(I);let xt=()=>I.remove();I.querySelector("button").addEventListener("click",xt),I.addEventListener("click",dt=>{dt.target===I&&xt()}),setTimeout(xt,Math.max(0,N-Date.now())+500)}function it(A,N){if(t.reducirMovimiento||!Number.isInteger(A))return N();let{letra:X,color:I}=t.columnaDe(A),xt=document.createElement("div");xt.className="repeticion",xt.innerHTML=`<div class="repeticion-barra arriba"></div><div class="repeticion-barra abajo"></div>
            <p class="repeticion-etiqueta">\u25CF Repetici\xF3n \xB7 bola decisiva</p>
            <div class="repeticion-bola" style="--c:${I}"><b><small>${X}</small>${A}</b></div>`,document.body.append(xt);let dt=xt.querySelector(".repeticion-bola");lt.timeline({onComplete:()=>{xt.remove(),N()}}).fromTo(xt.querySelectorAll(".repeticion-barra"),{scaleY:0},{scaleY:1,duration:.35,ease:"power2.out"}).from(xt.querySelector(".repeticion-etiqueta"),{autoAlpha:0,x:-30,duration:.3},.2).fromTo(dt,{scale:.15,rotation:-540,x:-260,y:160,filter:"blur(6px)"},{scale:1,rotation:0,x:0,y:0,filter:"blur(0px)",duration:1.6,ease:"power3.out"},.25).call(()=>t.sacudir(),null,1.55).to(dt,{scale:1.12,duration:.18,yoyo:!0,repeat:1,ease:"power1.inOut"},1.6).to(xt,{autoAlpha:0,duration:.3},"+=0.25")}function st(A){let N=n?.bolas||[];it(N.at(-1),()=>_t(A))}function _t({modalidad:A,ganadores:N=[],siguiente:X=null,bote:I=0}){let xt=ro(A),dt=n?.premios||[],at=dt.findIndex(wt=>wt.modalidad===A),ht=dt.find(wt=>wt.modalidad===X),Nt=N.length>1;Tt("bingoEnLinea").innerHTML=`
            <p class="text-center etiqueta text-tinta/60">${at>=0?`Premio ${at+1} de ${dt.length}`:"Premio"} \xB7 ${t.cantadas()} bolas</p>
            <h3 class="mt-1 text-center font-display text-3xl leading-none sm:text-4xl">\xA1${fe(xt)}!</h3>
            <ul class="mt-4 grid gap-2">${N.map(wt=>`
                <li class="flex items-center justify-between gap-3 rounded-xl border-[2.5px] border-tinta bg-papel px-3 py-2">
                    <span class="min-w-0">
                        <span class="block truncate font-ui text-lg font-black">${fe(wt.apodo)}</span>
                        <span class="etiqueta text-tinta/60">${ig(n).Uno} n\xBA ${fe(wt.carton)}</span>
                    </span>
                    <span class="shrink-0 rounded-lg border-[2.5px] border-tinta bg-girasol px-2 py-1 font-display text-base shadow-duro-sm">+${Number(wt.fichas||0).toLocaleString("es")}</span>
                </li>`).join("")}
            </ul>
            ${I?`<p class="mt-3 rounded-xl border-[2.5px] border-tinta bg-fucsia px-3 py-2 text-center font-display text-xl">\xA1Y se lleva el bote! +${Number(I).toLocaleString("es")}</p>`:""}
            <div class="ganadores-cartones mt-4 flex flex-wrap justify-center gap-3 ${Nt?"varios":""}">
                ${N.slice(0,3).map(wt=>G(wt,A)).join("")}
            </div>
            <p class="mt-4 rounded-xl bg-tinta px-3 py-2 text-center font-ui font-black text-crema">${X?`Seguimos por: ${fe(ro(X))}${ht?.fichas?` \xB7 ${pr(ht.fichas)}`:""}`:"\xA1Era el \xFAltimo premio!"}</p>`,t.celebrarGanador(),Tt("sello").classList.add("hidden"),lt.delayedCall(1.2,()=>{if(!t.hayModal())return;let wt=Tt("sello");wt.textContent="\xA1V\xE1lido!",wt.style.background="#19c3a0",wt.style.color="#14112b",wt.style.borderColor="#14112b",wt.classList.remove("hidden"),lt.fromTo(wt,{scale:3.5,rotation:-35,autoAlpha:0},{scale:1,rotation:-12,autoAlpha:1,duration:.42,ease:"power4.in"})}),lt.from("#bingoEnLinea .carton-celda, #bingoEnLinea .fila-celda",{scale:0,duration:.35,ease:"back.out(2.5)",stagger:{amount:.35,from:"center"},delay:.9}),o?.kill(),o=lt.delayedCall(5.4,()=>{t.hayModal()&&t.cerrarModal()})}function j(A){let X=(A?.premios||[]).map(ht=>{let Nt=(ht.ganadores||[]).map(wt=>`${fe(wt.apodo)} <span class="text-tinta/50">(n\xBA ${fe(wt.carton)})</span>`).join(", ")||"\u2014";return`<li class="flex items-baseline justify-between gap-4 border-t-2 border-tinta/15 py-1.5 text-left">
                <span class="font-ui text-sm font-black uppercase tracking-wide">${fe(ro(ht.modalidad))}</span>
                <span class="font-ui text-sm font-bold">${Nt} \xB7 <span class="font-display">${Number(ht.fichas||0).toLocaleString("es")}</span></span>
            </li>`}).join(""),I=[...A?.jugadores||[]].filter(ht=>(ht.ganado||0)>0).sort((ht,Nt)=>Nt.ganado-ht.ganado).slice(0,5),xt=["\u{1F947}","\u{1F948}","\u{1F949}","4.","5."],dt=I.length?`<p class="etiqueta mt-4">Ranking de la noche</p>
            <ol class="mx-auto mt-1 max-w-md">${I.map((ht,Nt)=>`<li class="flex items-baseline justify-between gap-4 border-t-2 border-tinta/15 py-1 text-left font-ui text-sm font-bold">
                <span>${xt[Nt]} ${fe(ht.apodo)}</span><span class="font-display">+${Number(ht.ganado).toLocaleString("es")}</span></li>`).join("")}</ol>`:"",at=A?.config?.rondasSeguidas&&A?.siguienteRondaEn?`<p class="mt-3 rounded-full bg-menta px-4 py-1.5 font-ui font-black">Ronda ${(A.ronda??1)+1} en <span class="font-display text-lg" data-hasta="${A.siguienteRondaEn}">${so(A.siguienteRondaEn)}</span> s</p>`:"";return`<p class="font-display text-3xl sm:text-5xl">\xA1Partida terminada!</p>
            <p class="etiqueta mt-1">${A?.config?.rondasSeguidas?`Ronda ${A.ronda??1} \xB7 `:""}${Kh((A?.bolas||[]).length,"bola","bolas")} \xB7 pozo de ${pr(A?.pozo)}</p>
            <ol class="mx-auto mt-3 max-w-md">${X}</ol>
            ${dt}
            ${at}
            <div class="mt-4 flex flex-wrap justify-center gap-2">
                ${A?.justo?'<button id="finVerificarBtn" type="button" class="boton pointer-events-auto h-11 bg-menta px-4">Verificar partida</button>':""}
                <button id="finNuevaBtn" type="button" class="boton pointer-events-auto h-11 bg-tinta px-5 text-crema">Nueva partida</button>
            </div>
            <div id="finVerificacion" class="mx-auto mt-3 hidden max-w-md rounded-xl border-[2.5px] border-tinta px-3 py-2 text-left font-ui text-sm font-bold" aria-live="polite"></div>`}function rt(){let A=Tt("finVerificacion"),N=n,X=N?.justo,I;X?.semillaServidor?I=eg({compromiso:X.compromiso,semillaServidor:X.semillaServidor,semillasClientes:X.semillasClientes||[],semillaClientes:X.semillaClientes,serie:N.serie,bolas:N.bolas||[],dorada:N.config?.bolaDorada?N.dorada??null:null}):I={valida:!1,errores:["El servidor a\xFAn no ha revelado su semilla."]},A.classList.remove("hidden"),A.style.background=I.valida?"#19c3a0":"#fff",A.style.color=I.valida?"#14112b":"#ff5a36",A.innerHTML=I.valida?`\u2713 Partida verificada: las ${(N.bolas||[]).length} bolas y la serie ${fe(N.serie)} salen de la semilla comprometida (${fe(X.compromiso.slice(0,12))}\u2026) y de las semillas de ${Kh((X.semillasClientes||[]).length,"jugador","jugadores")}.`:`\u2715 No cuadra:<ul class="mt-1 list-disc pl-5">${I.errores.map(xt=>`<li>${fe(xt)}</li>`).join("")}</ul>`,lt.fromTo(A,{scale:.6,opacity:0},{scale:1,opacity:1,duration:.4,ease:"back.out(2.5)"})}function O(A,N,X){document.body.classList.remove("sala-cargando"),Tt("salaAvisoTitulo").textContent=A,Tt("salaAvisoTexto").textContent=N,Tt("salaAvisoAcciones").innerHTML=X.map(I=>`<a href="${I.href}" class="boton h-12 ${I.clase}">${fe(I.texto)}</a>`).join(""),Tt("salaAviso").classList.replace("hidden","grid"),v("cerrado")}function H(){n&&(n.estado==="jugando"?x({tipo:"pausar"}):n.estado==="pausa"?x({tipo:"reanudar"}):n.estado==="lobby"&&t.avisar("Pulsa \xAB\xA1Empezar!\xBB cuando est\xE9is listos"))}function z(){if(n){if(n.estado==="jugando"||n.estado==="pausa")return t.avisar("La partida en curso tiene que terminar");if(n.estado==="lobby")return t.avisar("Ya est\xE1is en la sala de espera");t.abrirModal("modalReset")}}function $(){return{alternar:H,pedirReinicio:z,nuevaPartida:()=>x({tipo:"nuevaPartida"}),velocidad:A=>{x({tipo:"velocidad",intervalo:A})?(h={valor:A,hasta:Date.now()+3e3},t.avisar(`Una bola cada ${A/1e3} segundos`)):n?.config?.intervalo&&t.fijarVelocidad(n.config.intervalo)},progresoAnillo:D}}return $()}var lg="bingoshow.volumen",Qh={efectos:.8,voz:1},og=(i,t)=>Number.isFinite(i)?Math.min(1,Math.max(0,i)):t;function rS(){try{let i=JSON.parse(localStorage.getItem(lg)??"null");return{efectos:og(i?.efectos,Qh.efectos),voz:og(i?.voz,Qh.voz)}}catch{return{...Qh}}}function sS(i){try{localStorage.setItem(lg,JSON.stringify(i))}catch{}}function cg(i,{activo:t,alternar:e,probar:n}){let r=rS();kh(r);let s=document.createElement("div");s.className="panel-sonido carta",s.hidden=!0,s.setAttribute("role","dialog"),s.setAttribute("aria-label","Sonido"),s.innerHTML=`
        <div class="flex items-center justify-between gap-3">
            <p class="font-display text-lg leading-none">Sonido</p>
            <button type="button" data-silencio role="switch" class="interruptor-sonido" aria-label="Sonido activado">
                <span class="interruptor-bola"></span>
            </button>
        </div>
        <div data-controles class="mt-3 grid gap-3">
            <label class="block">
                <span class="flex items-center justify-between font-ui text-xs font-black uppercase tracking-wide">
                    Efectos <output data-valor="efectos"></output></span>
                <input type="range" min="0" max="100" step="5" data-vol="efectos" class="control-volumen mt-1 w-full" aria-label="Volumen de los efectos">
            </label>
            <label class="block">
                <span class="flex items-center justify-between font-ui text-xs font-black uppercase tracking-wide">
                    Voz del narrador <output data-valor="voz"></output></span>
                <input type="range" min="0" max="100" step="5" data-vol="voz" class="control-volumen mt-1 w-full" aria-label="Volumen de la voz">
            </label>
            <button type="button" data-probar class="boton h-10 w-full bg-girasol text-xs">Probar</button>
        </div>`,document.body.append(s);let a=h=>s.querySelector(h);function o(){let h=t();a("[data-silencio]").setAttribute("aria-checked",String(h)),a("[data-silencio]").setAttribute("aria-label",h?"Sonido activado":"Sonido apagado"),a("[data-controles]").classList.toggle("opacity-40",!h);for(let d of["efectos","voz"]){let f=Math.round(r[d]*100);a(`[data-vol="${d}"]`).value=String(f),a(`[data-vol="${d}"]`).disabled=!h,a(`[data-valor="${d}"]`).textContent=`${f} %`}a("[data-probar]").disabled=!h}function l(){let h=i.getBoundingClientRect(),d=s.offsetWidth||260;s.style.top=`${Math.round(h.bottom+10)}px`,s.style.left=`${Math.round(Math.min(window.innerWidth-d-16,Math.max(16,h.right-d)))}px`}function c(){o(),s.hidden=!1,l(),i.setAttribute("aria-expanded","true"),a("[data-silencio]").focus({preventScroll:!0})}function u({devolverFoco:h=!1}={}){s.hidden||(s.hidden=!0,i.setAttribute("aria-expanded","false"),h&&i.focus({preventScroll:!0}))}return i.setAttribute("aria-haspopup","dialog"),i.setAttribute("aria-expanded","false"),i.addEventListener("click",h=>{h.stopPropagation(),s.hidden?c():u()}),a("[data-silencio]").addEventListener("click",()=>{e(),o()}),s.addEventListener("input",h=>{let d=h.target.dataset?.vol;d&&(r[d]=Number(h.target.value)/100,kh(r),sS(r),a(`[data-valor="${d}"]`).textContent=`${h.target.value} %`)}),s.addEventListener("change",h=>{h.target.dataset?.vol&&t()&&n(h.target.dataset.vol)}),a("[data-probar]").addEventListener("click",()=>n("todo")),document.addEventListener("click",h=>{!s.hidden&&!s.contains(h.target)&&h.target!==i&&u()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&!s.hidden&&(h.stopPropagation(),u({devolverFoco:!0}))},!0),window.addEventListener("resize",()=>{s.hidden||l()}),{pintar:o,cerrar:u}}var oa=null;function td({ms:i=4e3,alTick:t=()=>{},alTerminar:e=()=>{}}={}){oa?.cancelar();let n=Math.max(1,Math.round(i/1e3)-1),r=document.createElement("div");r.className="cuenta-atras",r.setAttribute("role","status"),r.setAttribute("aria-live","assertive"),r.innerHTML='<p class="cuenta-etiqueta">\xA1Atentos!</p><p class="cuenta-numero"></p>',document.body.append(r);let s=r.querySelector(".cuenta-numero"),a=[],o=!1,l=h=>{s.textContent=h>0?String(h):"\xA1Ya!",s.classList.toggle("ya",h===0),s.classList.remove("latido"),s.offsetWidth,s.classList.add("latido"),t(h)},c=i/(n+1);for(let h=0;h<=n;h++)a.push(setTimeout(()=>l(n-h),h*c));a.push(setTimeout(()=>{r.classList.add("saliendo"),setTimeout(()=>r.remove(),300),oa===u&&(oa=null),o||e()},i));let u={cancelar(){o=!0,a.forEach(clearTimeout),r.remove(),oa===u&&(oa=null)}};return oa=u,u}var la=[{id:"normal",nombre:"Voz normal",lang:"es-ES"},{id:"frases",nombre:"Voz con frases",lang:"es-ES"},{id:"en",nombre:"Voice in English",lang:"en-US"},{id:"pt",nombre:"Voz em portugu\xEAs",lang:"pt-BR"}],ug={1:"el uno, como ninguno",2:"el dos, \xA1qu\xE9 arroz!",3:"el tres, al rev\xE9s",4:"el cuatro, \xA1qu\xE9 retrato!",5:"el cinco, \xA1dale un brinco!",7:"el siete de la suerte",8:"el ocho, \xA1qu\xE9 bizcocho!",9:"el nueve, \xA1c\xF3mo llueve!",10:"el diez, \xA1otra vez!",11:"las dos patitas",12:"la docena",13:"el de la mala suerte",15:"la ni\xF1a bonita",20:"veinte, \xA1qu\xE9 valiente!",22:"los dos patitos",25:"Navidad, Navidad",30:"treinta, \xA1qu\xE9 calor!",33:"la edad de Cristo",40:"cuarenta, \xA1cuenta y cuenta!",44:"cuatro y cuatro, a bailar",45:"el \xFAltimo de la N",50:"medio siglo",55:"los dos cincos, \xA1qu\xE9 brincos!",60:"sesenta, \xA1qu\xE9 tormenta!",61:"empieza la O",66:"los dos seises",70:"setenta, \xA1se calienta!",75:"la \xFAltima del bombo"};function ao(){try{return localStorage.getItem("bingoshow.voz")||"normal"}catch{return"normal"}}function hg(i){try{localStorage.setItem("bingoshow.voz",i)}catch{}}var Ql=i=>la.find(t=>t.id===i)??la[0];function tc(i,t,e=ao()){let{lang:n}=Ql(e);return e==="frases"&&ug[t]?{texto:`${i}, ${t}\u2026 \xA1${ug[t]}!`,lang:n}:{texto:`${i}, ${t}`,lang:n}}function ec(i,t=ao()){let e={bingo:{es:"\xA1Bingo!",en:"Bingo!",pt:"Bingo!"},fila:{es:"\xA1Fila completa!",en:"Full row!",pt:"Linha completa!"},dorada:{es:"\xA1Bola dorada! \xA1Premio doble!",en:"Golden ball! Double prize!",pt:"Bola dourada! Pr\xEAmio em dobro!"}},n=t==="en"||t==="pt"?t:"es";return{texto:e[i]?.[n]??"",lang:Ql(t).lang}}var ac=[{letra:"B",color:"#ff5a36"},{letra:"I",color:"#ffc43d"},{letra:"N",color:"#19c3a0"},{letra:"G",color:"#3d6bff",textoClaro:!0},{letra:"O",color:"#ff4fa3"}],ua=ac.map(i=>i.color),ts=75,mg=5,oo=[4e3,6e3,8e3,12e3],xi=window.matchMedia("(prefers-reduced-motion: reduce)").matches,gt=i=>document.getElementById(i),Un=i=>ac[Math.floor((i-1)/15)];function ca(i,t){try{let e=localStorage.getItem("bingoshow."+i);return e===null?t:JSON.parse(e)}catch{return t}}function oc(i,t){try{localStorage.setItem("bingoshow."+i,JSON.stringify(t))}catch{}}var ot={bolas:[],restantes:[],indice:-1,salidas:new Set,jugando:!1,terminado:!1,intervalo:oo.includes(ca("intervalo",8e3))?ca("intervalo",8e3):8e3,sonido:ca("sonido",!0),patron:Kr[ca("patron","linea")]?ca("patron","linea"):"linea",tiempoAcumulado:0,inicioTramo:0},Tn=null,nd=null,mr=null,_i=null,ic=null,co=null,ha=0,rc=null,wn=null,nc=null,id=()=>Array.from({length:ts},(i,t)=>t+1),aS=()=>lt.utils.clamp(.6,1,ot.intervalo/7e3);function oS(){let i=gt("tablero"),t=document.createDocumentFragment();ac.forEach(({letra:e,color:n,textoClaro:r},s)=>{let a=document.createElement("div");a.className="mb-1 grid place-items-center rounded-lg border-[2.5px] border-tinta py-1 shadow-duro-sm",a.style.background=n,a.style.color=r?"#fff3df":"#14112b",a.innerHTML=`<span class="font-display text-lg leading-none sm:text-xl">${e}</span><span class="font-ui text-[10px] font-black leading-none opacity-80" data-cuenta="${e}">0/15</span>`,t.appendChild(a);for(let o=1;o<=15;o++){let l=s*15+o,c=document.createElement("div");c.className="casilla",c.id="num"+l,c.innerHTML=`<div class="casilla-giro"><div class="casilla-cara casilla-frente">${l}</div><div class="casilla-cara casilla-dorso" style="--c:${n};color:${r?"#fff3df":"#14112b"}">${l}</div></div>`,t.appendChild(c)}}),i.appendChild(t)}function lS(i){let t=gt("num"+i);mr?.classList.remove("ultima"),t.classList.add("ultima"),mr=t,lt.to(t.firstElementChild,{rotationX:180,duration:.8,ease:"back.out(1.7)"}),lt.fromTo(t,{scale:1.5,zIndex:5},{scale:1,duration:.6,ease:"elastic.out(1, 0.5)",clearProps:"zIndex"})}function rd(){let i=ot.salidas.size;gt("contadorBolas").textContent=i,gt("pizarraCuenta").textContent=i,lt.to("#progreso",{width:`${i/ts*100}%`,duration:.6,ease:"power3.out"}),ac.forEach(({letra:t},e)=>{let n=0;ot.salidas.forEach(a=>{Math.floor((a-1)/15)===e&&n++});let r=document.querySelector(`[data-cuenta="${t}"]`),s=`${n}/15`;r.textContent!==s&&(r.textContent=s,n&&lt.fromTo(r.parentElement,{scale:1.25},{scale:1,duration:.5,ease:"elastic.out(1, 0.4)"}))}),i&&lt.fromTo("#contadorBolas",{scale:1.6,color:"#ff5a36"},{scale:1,color:"#14112b",duration:.5,ease:"back.out(3)"})}function uo(i,t=!1){let{letra:e}=Un(i);return`<span class="ficha-centro"><span class="text-center leading-none"><span class="block ${t?"text-[9px]":"text-[7px]"}">${e}</span><span class="${t?"text-base sm:text-lg":"text-[11px]"}">${i}</span></span></span>`}function cS(i){let{letra:t,color:e}=Un(i),n=gt("fichaActual"),r=rc;rc=i,ic?.kill(),ic=lt.timeline().to(n,{rotationY:90,duration:.15,ease:"power2.in"}).call(()=>{n.style.setProperty("--c",e),n.innerHTML=uo(i,!0),gt("textoActual").textContent=`${t}-${i}`}).to(n,{rotationY:0,duration:.5,ease:"back.out(3)"}),lt.fromTo("#textoActual",{x:-16,opacity:0},{x:0,opacity:1,duration:.4,ease:"power3.out",delay:.15}),r&&uS(r)}function uS(i){let t=gt("historial"),e=document.createElement("li");e.className="ficha h-10 w-10 sm:h-11 sm:w-11",e.style.setProperty("--c",Un(i).color),e.innerHTML=uo(i),e.setAttribute("aria-label",`${Un(i).letra} ${i}`),t.prepend(e),lt.from(e,{x:-60,rotation:-270,scale:.3,duration:.7,ease:"back.out(1.8)"}),lt.from([...t.children].slice(1),{x:-46,duration:.5,ease:"power3.out"});let n=t.children;for(;n.length>mg;)n[n.length-1].remove()}var gg=i=>{let t=Math.floor(i/1e3);return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`},sd=()=>ot.tiempoAcumulado+(ot.jugando?performance.now()-ot.inicioTramo:0),lc=()=>{gt("tiempo").textContent=gg(sd())},dg=null;function jr(i){let t=gt("aviso");t.textContent=i,dg?.kill(),dg=lt.timeline().fromTo(t,{xPercent:-50,y:-30,rotation:-4,opacity:0},{y:0,rotation:-2,opacity:1,duration:.45,ease:"back.out(2.5)"}).to(t,{y:-20,opacity:0,duration:.3,delay:1.8,ease:"power2.in"})}function Qr(){gt("iconoPlay").classList.toggle("hidden",ot.jugando),gt("iconoPausa").classList.toggle("hidden",!ot.jugando);let i=ot.jugando?"Pausar":ot.indice>=0?"Continuar":"Iniciar";gt("playBtn").setAttribute("aria-label",i),gt("playBtn").disabled=ot.terminado}function _g(){if(ot.restantes.length===0)return ad();let i=km(ot.restantes);ot.bolas.push(i),ot.indice=ot.bolas.length-1,xg(i),ot.indice<ts-1&&vg()}function xg(i){let t={...Un(i),numero:i};ot.salidas.add(i);let e=aS(),n=ha,r=()=>n===ha,s=()=>r()&&!Bi;ot.sonido&&Lm(1.5*e),_i.sortear(i,{ritmo:e,onSalida:()=>s()&&ot.sonido&&Im(.8*e),onRevelar:()=>s()&&ot.sonido&&na(),onImpacto:()=>{r()&&(s()&&(ot.sonido&&(Jr(),lt.delayedCall(.35,()=>s()&&ot.sonido&&Fi(tc(t.letra,i)))),Rm(t,{ritmo:e,reducirMovimiento:xi})),lS(i),cS(i),rd(),!wn&&ot.indice>=ts-1&&(co=lt.delayedCall(1.6,ad)))}})}function vg(){Tn?.kill(),Tn=lt.delayedCall(ot.intervalo/1e3,_g),ot.jugando||Tn.pause()}var lo=null;function yg(i){ot.sonido&&(i>0?Jr(.55):na())}function Mg(){if(!(ot.jugando||ot.terminado)){if(ot.jugando=!0,Qr(),!Tn&&ot.bolas.length===0){let i=ha;lo=td({ms:4e3,alTick:yg,alTerminar:()=>{lo=null,i===ha&&ot.jugando&&fg()}});return}fg()}}function fg(){ot.inicioTramo=performance.now(),nd=setInterval(lc,250),Tn?Tn.resume():_g()}function da(){if(ot.jugando){if(lo){lo.cancelar(),lo=null,ot.jugando=!1,Qr();return}ot.tiempoAcumulado=sd(),ot.jugando=!1,clearInterval(nd),Tn?.pause(),ql(),lc(),Qr()}}var bg=()=>wn?wn.alternar():ot.jugando?da():Mg();function ad(i){if(ot.terminado)return;da(),Tn?.kill(),Tn=null,ot.terminado=!0,Qr(),_i.terminar(),gt("fin").classList.replace("hidden","grid"),Wl(gt("finSello"),{texto:"",fondo:"#ffc43d"},xi),gt("finSello").innerHTML=typeof i=="string"?i:'<p class="font-display text-3xl sm:text-5xl">\xA1Se acabaron!</p><p class="etiqueta mt-1">Salieron las 75 bolas</p>',eo(ua,{cantidad:xi?0:80}),ot.sonido&&ia()}function od({aviso:i="\xA1Las bolas vuelven al bombo!"}={}){ha++,da(),Tn?.kill(),Tn=null,co?.kill(),co=null,ic?.kill(),ql(),Object.assign(ot,{bolas:[],restantes:id(),indice:-1,salidas:new Set,terminado:!1,tiempoAcumulado:0}),mr?.classList.remove("ultima"),mr=null,rc=null,lt.to("#tablero .casilla-giro",{rotationX:0,duration:.5,ease:"power3.inOut",stagger:{each:.012,from:"end"}});let t=[...gt("historial").children];lt.to(t,{y:80,rotation:90,opacity:0,duration:.4,stagger:.05,ease:"power2.in",onComplete:()=>t.forEach(n=>n.remove())});let e=gt("fichaActual");e.style.setProperty("--c","#3b2a6e"),e.innerHTML='<span class="ficha-centro">?</span>',gt("textoActual").textContent="\u2014",gt("fin").classList.replace("grid","hidden"),_i.reiniciar({alEntrar:(n,r)=>{ot.sonido&&n%2===0&&Dm(r>1?n/(r-1):.5)}}),rd(),lc(),Qr(),i&&jr(i)}function hS(i){ot.salidas.has(i)||ot.salidas.size>=ts||(ot.indice=ot.salidas.size,ot.bolas=[...ot.bolas.slice(0,ot.indice),i],ot.restantes=ot.restantes.filter(t=>t!==i),xg(i))}function dS(i){let t=ot.bolas.slice(0,ot.indice+1);if(t.length===i.length&&i.every((s,a)=>s===t[a]))return!1;ha++,co?.kill(),co=null,ic?.kill(),ot.bolas=[...i],ot.indice=i.length-1,ot.salidas=new Set(i),ot.restantes=id().filter(s=>!ot.salidas.has(s)),_i.retirar(i),nc&&nc.progress()<1?nc.eventCallback("onComplete",pg):pg(),mr?.classList.remove("ultima"),mr=null;let e=i[i.length-1]??null,n=gt("fichaActual");lt.set(n,{rotationY:0}),rc=e,e?(mr=gt("num"+e),mr.classList.add("ultima"),n.style.setProperty("--c",Un(e).color),n.innerHTML=uo(e,!0),gt("textoActual").textContent=`${Un(e).letra}-${e}`):(n.style.setProperty("--c","#3b2a6e"),n.innerHTML='<span class="ficha-centro">?</span>',gt("textoActual").textContent="\u2014");let r=gt("historial");return lt.killTweensOf(r.children),r.innerHTML="",i.slice(0,-1).slice(-mg).reverse().forEach(s=>{let a=document.createElement("li");a.className="ficha h-10 w-10 sm:h-11 sm:w-11",a.style.setProperty("--c",Un(s).color),a.innerHTML=uo(s),a.setAttribute("aria-label",`${Un(s).letra} ${s}`),r.appendChild(a)}),rd(),!0}function pg(){for(let i=1;i<=ts;i++){let t=gt("num"+i);lt.killTweensOf([t,t.firstElementChild]),lt.set(t.firstElementChild,{rotationX:ot.salidas.has(i)?180:0,opacity:1}),lt.set(t,{scale:1,clearProps:"zIndex"})}}function fS(i){if(i!==ot.jugando){if(!i)return da();ot.jugando=!0,ot.inicioTramo=performance.now(),nd=setInterval(lc,250),Qr()}}function pS(i){!oo.includes(i)||i===ot.intervalo||(ot.intervalo=i,sc())}function mS(){Bi&&es(),cc(gt("modalBingo")),Fh({colores:ua,reducirMovimiento:xi}),_i.celebrar(),ot.sonido&&(ia(),Fi(ec("bingo")))}lt.ticker.add(()=>{let i=wn?wn.progresoAnillo():Tn&&!ot.terminado?Tn.progress():0;gt("anillo").setAttribute("stroke-dashoffset",String(100-i*100))});var Bi=null,Sg=null;function cc(i){Sg=document.activeElement,Bi=i,i.classList.replace("hidden","flex"),lt.fromTo(i.querySelector(".modal-fondo"),{opacity:0},{opacity:1,duration:.3}),i.id==="modalReset"&&lt.fromTo(i.querySelector(".modal-caja"),{scale:.4,rotation:-10,opacity:0},{scale:1,rotation:0,opacity:1,duration:.55,ease:"elastic.out(1, 0.6)"}),(i.querySelector("[data-autofoco]")??i.querySelector("button:not([data-cerrar])"))?.focus({preventScroll:!0})}function es(){let i=Bi;i&&(Bi=null,Pm(),lt.to(i.querySelector(".modal-fondo"),{opacity:0,duration:.25}),lt.to(i.querySelectorAll(".modal-caja, .letra-bingo"),{y:60,scale:.85,opacity:0,duration:.25,ease:"power2.in",stagger:.02,onComplete:()=>{i.classList.replace("flex","hidden"),lt.set(i.querySelectorAll(".modal-caja, .letra-bingo"),{clearProps:"all"})}}),Sg?.focus?.({preventScroll:!0}))}document.querySelectorAll("[data-cerrar]").forEach(i=>i.addEventListener("click",es));document.addEventListener("keydown",i=>{if(!Bi||i.key!=="Tab")return;let t=[...Bi.querySelectorAll("button, textarea, input, summary")].filter(r=>r.offsetParent),e=t[0],n=t[t.length-1];i.shiftKey&&document.activeElement===e?(i.preventDefault(),n.focus()):!i.shiftKey&&document.activeElement===n&&(i.preventDefault(),e.focus())});function Eg(){if(!wn){if(ot.salidas.size===0){jr("A\xFAn no ha salido ninguna bola"),lt.fromTo("#bingoBtn",{rotation:-8},{rotation:0,duration:.6,ease:"elastic.out(1, 0.25)",clearProps:"transform"});return}da(),gt("bingoBolas").textContent=ot.salidas.size,gt("bingoBolasPalabra").textContent=ot.salidas.size===1?"bola":"bolas",gt("bingoTiempo").textContent=gg(sd()),gt("codigoCarton").value="",gt("numerosCarton").value="",gt("aMano").open=!1,gt("resultado").classList.add("hidden"),gt("sello").classList.add("hidden"),ho=null,Ag(),wg(),cc(gt("modalBingo")),Fh({colores:ua,reducirMovimiento:xi}),_i.celebrar(),ot.sonido&&(ia(),Fi(ec("bingo")))}}var ho=null;function Tg(){let i=Om(ca("serie",""));return Xh(i)?i:null}function wg(){gt("serieActual").textContent=Tg()??"\u2014"}function Ag(){document.querySelectorAll("#patrones [data-patron]").forEach(i=>{i.setAttribute("aria-checked",String(i.dataset.patron===ot.patron))})}function Cg(){gt("resultado").classList.remove("hidden"),gt("resultadoCarton").innerHTML="",gt("resultadoChips").innerHTML=""}function Rg(i){gt("resultadoTexto").textContent=i,gt("resultadoTexto").className="mb-3 text-center font-ui font-black text-tinta/60",gt("sello").classList.add("hidden")}function ed(i,t){let e=gt("resultadoTexto");e.textContent=t,e.className=`mb-3 text-center font-ui font-black ${i?"text-tinta":"text-tomate"}`,i?(Wl(gt("sello"),{texto:"\xA1V\xE1lido!",fondo:"#19c3a0"},xi),lt.delayedCall(.4,()=>{eo(ua,{cantidad:xi?0:70}),ot.sonido&&Jr(.8)})):(Wl(gt("sello"),{texto:"No vale",fondo:"#ff5a36",color:"#fff3df"},xi),lt.delayedCall(.4,()=>ot.sonido&&Jr(.6)))}var gS=i=>i.map(t=>Un(t).letra+t).join(", "),Pg=i=>`${i.length===1?"falta 1 n\xFAmero":`faltan ${i.length} n\xFAmeros`}: ${gS(i)}`;function ld(){ho=ld,Cg();let i=Fm(gt("codigoCarton").value,Tg());if(i.error)return Rg(i.error);oc("serie",i.serie),wg();let t=Yl(i.serie,i.numero),e=Zl(t,ot.salidas,ot.patron),{nombre:n}=Kr[ot.patron];gt("resultadoCarton").innerHTML=Jl(t,{marcadas:e.marcadas,clave:e.figura,faltan:e.faltan}),lt.from("#resultadoCarton .carton-celda",{scale:0,duration:.35,ease:"back.out(2.5)",stagger:{amount:.35,grid:[5,5],from:"center"}});let r=e.gana?`Cart\xF3n ${t.codigo}: \xA1${n}!`:`Cart\xF3n ${t.codigo}: para ${n.toLowerCase()} le ${Pg(e.faltan)}`;ed(e.gana,r)}function Lg(){ho=null,Cg();let i=gt("numerosCarton").value,t=[...new Set((i.match(/\d+/g)||[]).map(Number))].filter(r=>r>=1&&r<=ts);if(t.length===0)return Rg("Escribe n\xFAmeros del 1 al 75.");let e=gt("resultadoChips");t.forEach(r=>{let s=ot.salidas.has(r),a=document.createElement("span");a.className="ficha h-14 w-14"+(s?"":" opacity-40 grayscale"),a.style.setProperty("--c",Un(r).color),a.innerHTML=uo(r,!0),s||(a.title="A\xFAn no ha salido"),e.appendChild(a)}),lt.from(e.children,{scale:0,rotation:-180,duration:.5,stagger:.05,ease:"back.out(2.5)"});let n=t.filter(r=>!ot.salidas.has(r));if(n.length===0)ed(!0,`Los ${t.length} n\xFAmeros ya salieron.`);else{let r=Pg(n);ed(!1,r[0].toUpperCase()+r.slice(1))}}function uc(i){let t=gt("pizarra"),e=gt("pizarraFondo"),n=i??!t.classList.contains("abierta");t.classList.toggle("abierta",n),gt("pizarraBtn").setAttribute("aria-expanded",String(n)),n?(e.classList.remove("hidden"),lt.fromTo(e,{opacity:0},{opacity:1,duration:.3}),lt.from("#tablero > div",{scale:.5,opacity:0,duration:.35,stagger:{amount:.4,grid:"auto",from:"start"},ease:"back.out(2)",delay:.15})):lt.to(e,{opacity:0,duration:.25,onComplete:()=>e.classList.add("hidden")})}function Ig(){if(wn)return wn.pedirReinicio();if(ot.salidas.size===0)return jr("La partida a\xFAn no ha empezado");da(),cc(gt("modalReset"))}function Dg(){gt("sonidoBtn").setAttribute("aria-label",ot.sonido?"Sonido activado: abrir controles de volumen":"Sonido apagado: abrir controles de volumen"),gt("iconoSonidoOn").classList.toggle("hidden",!ot.sonido),gt("iconoSonidoOff").classList.toggle("hidden",ot.sonido)}function sc(){let i=ot.intervalo/1e3;gt("velocidadBtn").textContent=`${i}s`,gt("velocidadBtn").setAttribute("aria-label",`Velocidad: una bola cada ${i} segundos`)}gt("playBtn").addEventListener("click",bg);gt("resetBtn").addEventListener("click",Ig);gt("bingoBtn").addEventListener("click",Eg);gt("verificarBtn").addEventListener("click",ld);gt("codigoCarton").addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),ld())});gt("verificarNumerosBtn").addEventListener("click",Lg);gt("numerosCarton").addEventListener("keydown",i=>{i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),Lg())});gt("patrones").addEventListener("click",i=>{let t=i.target.closest("[data-patron]");!t||t.dataset.patron===ot.patron||(ot.patron=t.dataset.patron,oc("patron",ot.patron),Ag(),ho&&gt("codigoCarton").value.trim()&&ho())});gt("seguirBtn").addEventListener("click",()=>{es(),wn||Mg()});gt("nuevaPartidaBtn").addEventListener("click",()=>{es(),od()});gt("confirmarResetBtn").addEventListener("click",()=>{es(),wn?wn.nuevaPartida():od()});gt("pizarraBtn").addEventListener("click",()=>uc());gt("cerrarPizarra").addEventListener("click",()=>uc(!1));gt("pizarraFondo").addEventListener("click",()=>uc(!1));cg(gt("sonidoBtn"),{activo:()=>ot.sonido,alternar:()=>{ot.sonido=!ot.sonido,ot.sonido||ql(),oc("sonido",ot.sonido),Dg()},probar:i=>{i!=="voz"&&na(),i!=="efectos"&&lt.delayedCall(i==="todo"?.4:0,()=>Fi(tc("B",15)))}});gt("vozBtn").addEventListener("click",()=>{let i=la.findIndex(e=>e.id===ao()),t=la[(i+1)%la.length];hg(t.id),jr(t.nombre),ot.sonido&&Fi(tc("B",15,t.id))});gt("vozBtn").title=`Voz del narrador: ${Ql(ao()).nombre}`;gt("velocidadBtn").addEventListener("click",()=>{let i=oo.indexOf(ot.intervalo);if(ot.intervalo=oo[(i+1)%oo.length],wn)return sc(),wn.velocidad(ot.intervalo);oc("intervalo",ot.intervalo),sc(),Tn&&vg(),jr(`Una bola cada ${ot.intervalo/1e3} segundos`)});document.addEventListener("click",i=>{let t=i.target.closest("header button, header a, #controles button");t&&i.detail>0&&t.blur()});document.addEventListener("keydown",i=>{if(Bi){i.key==="Escape"&&es();return}if(i.key==="Escape"&&gt("pizarra").classList.contains("abierta"))return uc(!1);i.target.closest("textarea, input")||i.ctrlKey||i.metaKey||i.altKey||(i.code==="Space"&&!i.target.closest("button")?(i.preventDefault(),ot.terminado||bg()):i.key.toLowerCase()==="b"?(i.preventDefault(),Eg()):i.key.toLowerCase()==="r"&&Ig())});async function _S(){try{await Promise.race([document.fonts.load("48px Bungee"),new Promise(r=>setTimeout(r,2500))])}catch{}ot.restantes=id(),oS(),Dg(),sc(),Qr();let i=!0;try{_i=Am(gt("escena"),{columnaDe:Un,colores:ua,reducirMovimiento:xi})}catch(r){console.warn("No se pudo iniciar la escena 3D:",r),_i=xS(),gt("escena").classList.add("hidden"),i=!1}let t=window.innerWidth>=1024,e=lt.timeline();nc=e,e.to(".telon-izq",{xPercent:-102,duration:1.3,ease:"power3.inOut"},.25).to(".telon-der",{xPercent:102,duration:1.3,ease:"power3.inOut"},.25).set("#telon",{display:"none"}).add(_i.intro(),.2).fromTo(".logo-ficha",{y:-160,rotation:()=>lt.utils.random(-120,120),opacity:0},{y:0,rotation:(r,s)=>Number(s.dataset.rot),opacity:1,duration:1,ease:"bounce.out",stagger:.09},.9).from("#enVivo",{scale:0,rotation:-30,duration:.6,ease:"back.out(3)"},1.6).from("#lema",{x:-20,opacity:0,duration:.5},1.75).from("#stats > *",{y:-80,rotation:8,opacity:0,duration:.7,ease:"back.out(2)",stagger:.1,clearProps:"transform"},1.2).from("#actual > div",{x:-140,rotation:-8,opacity:0,duration:.8,ease:"back.out(1.6)"},1.5).from("#controles > *",{y:120,opacity:0,duration:.7,ease:"back.out(2)",stagger:.07,clearProps:"transform"},1.6),t&&e.from("#pizarra",{x:480,rotation:6,duration:1,ease:"power4.out",clearProps:"transform"},1.1).from("#tablero .casilla-giro",{rotationX:-100,opacity:0,duration:.5,ease:"back.out(2)",stagger:{amount:1,from:"start"}},1.5),i||e.call(()=>jr("Modo sin 3D: el sorteo funciona igual"),null,2.4);let n=sg();n&&(wn=ag(n,{bola:hS,fijarBolas:dS,reiniciar:od,finalizar:ad,correrReloj:fS,fijarVelocidad:pS,celebrarGanador:mS,avisar:jr,abrirModal:r=>cc(gt(r)),cerrarModal:es,hayModal:()=>!!Bi,cantadas:()=>ot.salidas.size,sonido:()=>ot.sonido,sacudir:()=>_i.sacudir?.(),cuentaAtras:r=>td({ms:r,alTick:yg}),voz:ec,columnaDe:Un,colores:ua,reducirMovimiento:xi}))}function xS(){let i=()=>lt.timeline(),t=null;return{intro:i,celebrar(){return t?.progress(1),i()},reiniciar(){t?.progress(1)},terminar(){},sacudir(){},retirar(){},sortear(e,{onSalida:n,onRevelar:r,onImpacto:s}={}){return t?.progress(1),t=lt.timeline().call(()=>n?.(),null,0).call(()=>r?.(),null,.4).call(()=>s?.(),null,.6),t}}}_S();})();
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
