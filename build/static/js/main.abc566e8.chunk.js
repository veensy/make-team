(this.webpackJsonpmain=this.webpackJsonpmain||[]).push([[0],{68:function(e,t,n){"use strict";n.r(t);var a,r,c,s,i,l,u=n(4),d=n(52),o=n.n(d),b=n(9),j=n(32),m=n(38),h=n(10),O=n(17),f=Object(b.gql)(a||(a=Object(O.a)(["\n  query GetUsers {\n    users {\n      id\n      name\n      role {\n        role\n      }\n      isDm {\n        status\n      }\n      isAdmin {\n        status\n      }\n    }\n  }\n"]))),g=(Object(b.gql)(r||(r=Object(O.a)(["\n  query GET_DM {\n    isDm {\n      users {\n        name\n      }\n    }\n  }\n"]))),Object(b.gql)(c||(c=Object(O.a)(["\n  query GetTeamsMonth($year: String, $month: String) {\n    team(year: $year, month: $month) {\n      id\n      year\n      month\n      sunday\n      md\n      keyboard\n      bass\n      guitar\n      drum\n    }\n  }\n"])))),x=Object(b.gql)(s||(s=Object(O.a)(["\n  mutation AddTeam(\n    $year: String!\n    $month: String!\n    $sunday: String!\n    $md: String\n    $bass: String\n    $guitar: String\n    $keyboard: String\n    $drum: String\n  ) {\n    addTeam(\n      year: $year\n      month: $month\n      sunday: $sunday\n      md: $md\n      bass: $bass\n      guitar: $guitar\n      keyboard: $keyboard\n      drum: $drum\n    ) {\n      id\n      year\n      month\n      sunday\n      md\n      bass\n      keyboard\n      guitar\n      drum\n    }\n  }\n"]))),p=Object(b.gql)(i||(i=Object(O.a)(["\n  mutation UpdateTeam(\n    $id: ID!\n    $md: String\n    $bass: String\n    $guitar: String\n    $keyboard: String\n    $drum: String\n  ) {\n    updateTeam(\n      id: $id\n      md: $md\n      bass: $bass\n      guitar: $guitar\n      keyboard: $keyboard\n      drum: $drum\n    ) {\n      id\n      year\n      month\n      sunday\n      md\n      bass\n      keyboard\n      guitar\n      drum\n    }\n  }\n"]))),y=(Object(b.gql)(l||(l=Object(O.a)(["\n  mutation DeleteTeam(\n    $id: ID!\n  ) {\n    deleteTeam(\n      id: $id\n    ) {\n      id\n    }\n  }\n"]))),{0:"Janvier",1:"F\xe9vrier",2:"Mars",3:"Avril",4:"Mai",5:"Juin",6:"Juillet",7:"Aout",8:"Septembre",9:"Octobre",10:"Novembre",11:"Decembre"}),v="next",S="prev",w=function(e){var t,n,a=e.step,r=e.month,c=e.year;e.date;return a===v&&(11===r?(t=c+1,n=0):(n=r+1,t=c)),a===S&&(0===r?(t=c-1,n=11):(n=r-1,t=c)),{newMonth:n,newYear:t,newDate:undefined}},N=function(e,t){for(var n=function(e,t){return new Date(t,e,0).getDate()}(e,t),a=[],r=1;r<=n;r++){0===new Date(t,e,r).getDay()&&a.push(r)}return a},$=function(e){var t=[],n=[],a=[],r=[],c=[],s=[];return Object.keys(e).forEach((function(i){switch("yes"===e[i].isDm.status&&t.push(e[i].name),"yes"===e[i].isAdmin.status&&n.push(e[i].name),e[i].role.role){case"Bass":a.push(e[i].name);break;case"Guitar":r.push(e[i].name);break;case"Keyboard":c.push(e[i].name);break;case"Drum":s.push(e[i].name);break;default:return"unknow role"}})),{md:t,admin:n,bass:a,guitar:r,keyboard:c,drum:s}},k=n(2),C=function(){return Object(k.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-left",viewBox:"0 0 16 16",children:Object(k.jsx)("path",{fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"})})},D=function(){return Object(k.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-right",viewBox:"0 0 16 16",children:Object(k.jsx)("path",{fillRule:"evenodd",d:"M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"})})},M=function(){return Object(k.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-shield-lock",viewBox:"0 0 16 16",children:[Object(k.jsx)("path",{d:"M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"}),Object(k.jsx)("path",{d:"M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"})]})},z=function(){return Object(k.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-person",viewBox:"0 0 16 16",children:Object(k.jsx)("path",{d:"M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"})})},q=new Date;var A=function(){var e=Object(u.useState)(q.getMonth()),t=Object(h.a)(e,2),n=t[0],a=t[1],r=Object(u.useState)(q.getFullYear()),c=Object(h.a)(r,2),s=c[0],i=c[1],l=Object(u.useState)([]),d=Object(h.a)(l,2),o=d[0],O=d[1],A=Object(u.useState)(!1),T=Object(h.a)(A,2),B=T[0],G=T[1],E=Object(u.useState)(""),L=Object(h.a)(E,2),F=L[0],I=L[1],J=Object(u.useState)(!0),H=Object(h.a)(J,2),P=H[0],Q=H[1],Y=Object(u.useState)(!0),K=Object(h.a)(Y,2),R=K[0],U=K[1],_=Object(u.useState)(""),V=Object(h.a)(_,2),W=V[0],X=V[1],Z=Object(u.useState)([]),ee=Object(h.a)(Z,2),te=ee[0],ne=ee[1],ae=Object(u.useState)([]),re=Object(h.a)(ae,2),ce=re[0],se=re[1],ie=Object(u.useState)([]),le=Object(h.a)(ie,2),ue=le[0],de=le[1],oe=Object(u.useState)([]),be=Object(h.a)(oe,2),je=be[0],me=be[1],he=Object(u.useState)([]),Oe=Object(h.a)(he,2),fe=Oe[0],ge=Oe[1],xe=Object(u.useState)([]),pe=Object(h.a)(xe,2),ye=pe[0],ve=pe[1],Se=Object(u.useState)([]),we=Object(h.a)(Se,2),Ne=we[0],$e=we[1],ke=Object(b.useMutation)(x),Ce=Object(h.a)(ke,1)[0],De=Object(b.useMutation)(p),Me=Object(h.a)(De,1)[0],ze=Object(b.useQuery)(f),qe=ze.loading,Ae=ze.data,Te=Object(b.useQuery)(g,{variables:{year:String(s),month:String(n)}}).data;ye.length;var Be=function(e){var t=w({step:e,month:n,year:s}),r=t.newMonth,c=t.newYear;a(r),i(c)};Object(u.useEffect)((function(){if(Ae&&Te){var e=$(Ae.users),t=e.md,a=e.bass,r=e.guitar,c=e.keyboard,i=e.drum;O(t),ne(a),se(r),de(c),me(i),ge(Te);var l=[];ye.length&&Te&&ye.forEach((function(e,t){var a,r;(null===(a=Te.team[t])||void 0===a?void 0:a.id)?(l.push({id:null===(r=Te.team[t])||void 0===r?void 0:r.id}),$e(l)):Ce({variables:{year:String(s),month:String(n),sunday:String(e)}})}))}ve(N(n,s))}),[Ae,n,s,Te,Ce]);var Ge=function(e,t,n){if(Ne.length){var a=e.target.value;Ne.forEach((function(e,r){e.id===n&&(Ne[r]=Object(m.a)(Object(m.a)({},Ne[r]),{},Object(j.a)({},t,a)))}))}};if(qe||!ye.length||!fe.team||fe.length<0)return Object(k.jsx)("div",{className:"d-flex justify-content-center align-items-center m-5",children:Object(k.jsx)("div",{className:"spinner-border",role:"status",children:Object(k.jsx)("span",{className:"visually-hidden",children:"Loading..."})})});var Ee="form-control ".concat(P?"":"is-invalid"),Le="form-control ".concat(R?"":"is-invalid");return Object(k.jsxs)("div",{className:"px-2",children:[Object(k.jsx)("nav",{className:"navbar navbar-light bg-light",children:Object(k.jsxs)("div",{className:"container-fluid",children:[Object(k.jsx)("span",{className:"navbar-brand mb-0 h1",children:"Sunday team"}),Object(k.jsx)("form",{className:"row g-3 float-end",children:B?Object(k.jsx)("button",{className:"btn btn-outline-secondary",type:"submit",id:"button-addon2",onClick:function(e){e.preventDefault(),I(""),X(""),Q(!0),U(!0),G(!1)},children:"Logout"}):Object(k.jsxs)("div",{className:"d-flex justify-content-end",children:[Object(k.jsx)("div",{className:"col-md-4 ",children:Object(k.jsxs)("div",{className:"input-group",children:[Object(k.jsx)("span",{className:"input-group-text",id:"inputGroup-sizing-sm",children:Object(k.jsx)(z,{})}),Object(k.jsx)("input",{type:"text",id:"user",className:Ee,"aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-sm",onChange:function(e){I(e.target.value)}}),Object(k.jsx)("div",{id:"user",className:"invalid-feedback",children:"you suck !!!"})]})}),Object(k.jsx)("div",{className:"col-md-5",children:Object(k.jsxs)("div",{className:"input-group",children:[Object(k.jsx)("span",{className:"input-group-text",children:Object(k.jsx)(M,{})}),Object(k.jsx)("input",{type:"password",className:Le,"aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-sm",onChange:function(e){X(e.target.value)}}),Object(k.jsx)("button",{className:"btn btn-outline-secondary",type:"submit",id:"button-addon2",onClick:function(e){e.preventDefault();var t="admin";G(F===t&&W===t),!F!==t&&Q(!1),!F!==t&&U(!1)},children:"Login"}),Object(k.jsx)("div",{id:"user",className:"invalid-feedback",children:"you really suck !!!"})]})})]})})]})}),Object(k.jsxs)("main",{children:[Object(k.jsxs)("div",{className:"d-flex flex-row justify-content-between py-4",children:[Object(k.jsx)("button",{type:"button",className:"btn btn-secondary",onClick:function(){return Be(S)},children:Object(k.jsx)(C,{})}),Object(k.jsxs)("h2",{className:"text-center",children:[y[n]," ",s]}),Object(k.jsx)("button",{type:"button",className:"btn btn-secondary",onClick:function(){return Be(v)},children:Object(k.jsx)(D,{})})]}),Object(k.jsxs)("table",{className:"table table-hover",children:[Object(k.jsx)("thead",{children:Object(k.jsxs)("tr",{children:[Object(k.jsx)("th",{style:{width:"6%"},children:"Sunday"}),Object(k.jsx)("th",{style:{width:"10%"},children:"Md"}),Object(k.jsx)("th",{style:{width:"10%"},children:"Keyboard"}),Object(k.jsx)("th",{style:{width:"10%"},children:"Bass"}),Object(k.jsx)("th",{style:{width:"10%"},children:"Drum"}),Object(k.jsx)("th",{style:{width:"10%"},children:"Guitar"}),B&&Object(k.jsx)("th",{style:{width:"10%"},children:"Save"})]})}),Object(k.jsx)("tbody",{children:ye.map((function(e,t){var a=fe.team[t],r=a.id,c=a.sunday,i=a.md,l=a.bass,u=a.guitar,d=a.keyboard,b=a.drum;return Object(k.jsxs)("tr",{className:"",children:[Object(k.jsx)("th",{scope:"row align-middle",children:"".concat(e," ").concat(y[n])}),Object(k.jsx)("td",{children:B?Object(k.jsxs)("select",{className:"form-select","aria-label":"Default select example",onChange:function(e){return Ge(e,"md",r)},children:[Object(k.jsx)("option",{}),o.map((function(n){return Object(k.jsx)("option",{selected:n===function(){if(fe.team[t]&&c===String(e))return i}(),value:n,children:n},n)}))]}):Object(k.jsx)("p",{className:"m-0",children:o.filter((function(n){return n===function(){if(fe.team[t]&&c===String(e))return i}()}))})}),Object(k.jsx)("td",{children:B?Object(k.jsxs)("select",{className:"form-select","aria-label":"Default select example",onChange:function(e){return Ge(e,"keyboard",r)},children:[Object(k.jsx)("option",{}),ue.map((function(n){return Object(k.jsx)("option",{selected:n===function(){if(fe.team[t]&&c===String(e))return d}(),value:n,children:n},n)}))]}):Object(k.jsx)("p",{className:"m-0",children:ue.filter((function(n){return n===function(){if(fe.team[t]&&c===String(e))return d}()}))})}),Object(k.jsx)("td",{children:B?Object(k.jsxs)("select",{className:"form-select","aria-label":"Default select example",onChange:function(e){return Ge(e,"bass",r)},children:[Object(k.jsx)("option",{}),te.map((function(n){return Object(k.jsx)("option",{selected:n===function(){if(fe.team[t]&&c===String(e))return l}(),value:n,children:n},n)}))]}):Object(k.jsx)("p",{className:"m-0",children:te.filter((function(n){return n===function(){if(fe.team[t]&&c===String(e))return l}()}))})}),Object(k.jsx)("td",{children:B?Object(k.jsxs)("select",{className:"form-select","aria-label":"Default select example",onChange:function(e){return Ge(e,"drum",r)},children:[Object(k.jsx)("option",{}),je.map((function(n){return Object(k.jsx)("option",{selected:n===function(){if(fe.team[t]&&c===String(e))return b}(),value:n,children:n},n)}))]}):Object(k.jsx)("p",{className:"m-0",children:je.filter((function(n){return n===function(){if(fe.team[t]&&c===String(e))return b}()}))})}),Object(k.jsx)("td",{children:B?Object(k.jsxs)("select",{className:"form-select","aria-label":"Default select example",onChange:function(e){return Ge(e,"guitar",r)},children:[Object(k.jsx)("option",{}),ce.map((function(n){return Object(k.jsx)("option",{selected:n===function(){if(fe.team[t]&&c===String(e))return u}(),value:n,children:n},n)}))]}):Object(k.jsx)("p",{className:"m-0",children:ce.filter((function(n){return n===function(){if(fe.team[t]&&c===String(e))return u}()}))})}),B&&Object(k.jsx)("td",{children:Object(k.jsx)("button",{onClick:function(){return function(e){Ne.forEach((function(t,a){if(t.id===e){var r=Ne[a],c=r.md,i=r.keyboard,l=r.bass,u=r.drum,d=r.guitar;Me({variables:{id:e,md:c,keyboard:i,bass:l,drum:u,guitar:d},refetchQueries:[{query:g,variables:{year:String(s),month:String(n)}}]})}}))}(r,fe.team[t])},type:"button",className:"btn btn-outline-primary",children:"save"})})]},e)}))})]})]})]})},T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,69)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))},B=new b.ApolloClient({uri:"http://localhost:3001/graphql",cache:new b.InMemoryCache});o.a.render(Object(k.jsxs)(b.ApolloProvider,{client:B,children:[Object(k.jsx)(A,{}),","]}),document.getElementById("root")),T()}},[[68,1,2]]]);
//# sourceMappingURL=main.abc566e8.chunk.js.map