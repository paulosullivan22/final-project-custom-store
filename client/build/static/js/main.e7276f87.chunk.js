(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{30:function(e,t,a){e.exports=a(55)},35:function(e,t,a){},55:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(26),l=a.n(s),c=a(1),i=a(2),o=a(4),u=a(3),m=a(5),h=a(14),p=(a(35),a(8)),g=a(6),d=a.n(g),f=function(e){return r.a.createElement("div",{className:"nav-container"},r.a.createElement("nav",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(p.b,{className:"nav-item",to:"/"},"Home")),e.user?r.a.createElement(r.a.Fragment,null,r.a.createElement("li",null,r.a.createElement(p.b,{className:"nav-item",to:"/store"},"Main Store")),r.a.createElement("li",null,r.a.createElement(p.b,{className:"nav-item",to:"/wishlist"},"Wishlist"))):null,e.user?r.a.createElement(r.a.Fragment,null,r.a.createElement("li",null,r.a.createElement(p.b,{className:"nav-item",to:"/user"},"Profile")),r.a.createElement("li",null,r.a.createElement(p.b,{className:"nav-item",onClick:function(){return function(e){d.a.post("/api/auth/logout").then(function(e){return e.data}).then(function(){e.setUser(null)}).catch(function(e){console.log(e)})}(e)},to:"/logout"},"Logout"))):r.a.createElement(r.a.Fragment,null,r.a.createElement("li",null,r.a.createElement(p.b,{className:"nav-item",to:"/login"},"Login")),r.a.createElement("li",null,r.a.createElement(p.b,{className:"nav-item",to:"/signup"},"Signup"))))))},E=a(29),v=function(e){var t=e.component,a=e.user,n=e.path,s=e.redirectPath,l=void 0===s?"/":s,c=Object(E.a)(e,["component","user","path","redirectPath"]);return r.a.createElement(h.b,{path:n,render:function(e){return a?r.a.createElement(t,Object.assign({},e,c,{user:a})):r.a.createElement(h.a,{to:l})}})},b=function(e){function t(){return Object(c.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"home-container"},r.a.createElement("div",{className:"card-container"},r.a.createElement("div",{className:"homepage-card content-card"},r.a.createElement("h1",null,"Welcome to the ",r.a.createElement("span",{className:"underline"},"Smarter Store"),".")),r.a.createElement("div",{className:"homepage-card"},r.a.createElement("div",{className:"background-image first-image"})),r.a.createElement("div",{className:"homepage-card content-card"},r.a.createElement("div",{className:"card-content"},r.a.createElement("h5",null,"Website authentification routes lose ",r.a.createElement("span",{className:"underline"},"millions of visitors")," every year through poor user experience."))),r.a.createElement("div",{className:"homepage-card"},r.a.createElement("div",{className:"background-image second-image"})),r.a.createElement("div",{className:"homepage-card"},r.a.createElement("div",{className:"background-image third-image"})),r.a.createElement("div",{className:"homepage-card content-card"},r.a.createElement("div",{className:"card-content"},r.a.createElement("h5",null,"This website provides ",r.a.createElement("span",{className:"underline"},"facial authentification")," to provide a streamlined user experience."))),r.a.createElement("div",{className:"homepage-card"},r.a.createElement("div",{className:"background-image fourth-image"})),r.a.createElement("div",{className:"homepage-card content-card"},r.a.createElement("div",{className:"card-content card-content-last"},r.a.createElement("h5",null,"By analysing facial photos, we learn about the user."),r.a.createElement("h5",null,"From this data, we create a ",r.a.createElement("span",{className:"underline"},"personalised collection")," for every single user.")))))}}]),t}(r.a.Component),y=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).handleClick=function(){d.a.post("/api/store/wishlist",{user:a.props.user,item:a.props.item}).then(function(e){a.props.setUser(e.data)}).catch(function(e){return console.log(e)})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("button",{className:"wishlist-button",onClick:function(){return e.handleClick()}},"Add to wishlist")}}]),t}(r.a.Component),O=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={city:"",inventory:[]},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;d.a.get("https://ipapi.co/json/").then(function(t){e.setState({city:" from ".concat(t.data.city)})}).catch(function(e){return console.log(e)}),d.a.get("/api/store").then(function(t){var a=[],n=[];e.props.user.wishlist&&(a=e.props.user.wishlist.map(function(e){return e.category}),n=e.props.user.wishlist.map(function(e){return e.color}));var r=function(){var e,a,n,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t.data;for(n=r.length-1;n>0;n--)e=Math.floor(Math.random()*(n+1)),a=r[n],r[n]=r[e],r[e]=a;return r}(a.length?t.data.filter(function(t){return e.props.user.gender===t.gender&&(a.includes(t.category)||n.includes(t.color)||t.ageRange===e.props.user.age)}):t.data.filter(function(t){return e.props.user.gender===t.gender}));e.setState({inventory:r})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"user-homepage-container"},r.a.createElement("div",{className:"user-homepage-content"},r.a.createElement("h1",null,"Hello, ",this.props.user.username,"."),r.a.createElement("h3",null,"Welcome",this.state.city,"."),this.props.user.profileImg?r.a.createElement("h4",null,"This collection has been personalised just for you, from data taken from your facial login."):r.a.createElement("h4",null,"This collection has been personalised for you based on the information you submitted at sign up.")),r.a.createElement("div",{className:"store-container"},this.state.inventory.length?r.a.createElement("div",{className:"item-container"},this.state.inventory.map(function(t,a){return a<8?r.a.createElement("div",{className:"item-card",key:t._id},r.a.createElement("p",null,t.name),r.a.createElement("img",{src:t.image,alt:t.name,onMouseOver:function(e){return e.currentTarget.src="".concat(t.image2)},onMouseOut:function(e){return e.currentTarget.src="".concat(t.image)}}),r.a.createElement("div",{className:"item-content"},r.a.createElement("p",null,t.category),r.a.createElement("span",null,"|"),r.a.createElement(y,{item:t,user:e.props.user,setUser:e.props.setUser}))):null})):r.a.createElement("div",null,"Loading")))}}]),t}(r.a.Component),C=function(e){return r.a.createElement("div",null,r.a.createElement("input",{className:"search-bar",type:"text",placeholder:"Search items...",onChange:e.searchChange}))},N=a(16),j=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={male:!1,female:!1,outerwear:!1,shirt:!1,pants:!1,shoes:!1},a.filterChoiceChange=function(e){var t=e.toLowerCase(),n=[];a.setState(Object(N.a)({},t,!a.state[t]),function(){for(var e in a.state){a.state[e]&&n.push(e)}a.props.filterChange(n)})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"filter-choices-container"},r.a.createElement("h2",null,"Filters"),r.a.createElement("ul",null,r.a.createElement("li",{className:this.state.male?"filter-active":null,onClick:function(){return e.filterChoiceChange("Male")}},"Men"),r.a.createElement("li",{className:this.state.female?"filter-active":null,onClick:function(){return e.filterChoiceChange("Female")}},"Women")),r.a.createElement("ul",null,r.a.createElement("li",{className:this.state.outerwear?"filter-active":null,onClick:function(){return e.filterChoiceChange("Outerwear")}},"Outerwear"),r.a.createElement("li",{className:this.state.shirt?"filter-active":null,onClick:function(){return e.filterChoiceChange("Shirt")}},"Shirts"),r.a.createElement("li",{className:this.state.pants?"filter-active":null,onClick:function(){return e.filterChoiceChange("Pants")}},"Pants"),r.a.createElement("li",{className:this.state.shoes?"filter-active":null,onClick:function(){return e.filterChoiceChange("Shoes")}},"Shoes")))}}]),t}(r.a.Component),w=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={inventory:[],originalInventory:[]},a.searchChange=function(e){var t=a.state.originalInventory.filter(function(t){return t.name.toLowerCase().includes(e.target.value.toLowerCase()||t.gender.toLowerCase()===e.target.value.toLowerCase())});a.setState({inventory:t})},a.filterChange=function(e){var t=a.state.originalInventory.filter(function(t){return e.includes(t.category.toLowerCase())});0===t.length&&(t=a.state.originalInventory),e.includes("male")&&(t=t.filter(function(e){return"Male"===e.gender})),e.includes("female")&&(t=t.filter(function(e){return"Female"===e.gender})),t.length||(t=a.state.originalInventory),e.includes("male")&&e.includes("female")&&(t=[]),a.setState({inventory:t})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;d.a.get("/api/store").then(function(t){e.setState({inventory:t.data,originalInventory:t.data})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"store-body-container"},r.a.createElement("h1",null,"Main Store"),r.a.createElement("hr",null),r.a.createElement(j,{inventory:this.state.originalInventory,filterChange:this.filterChange}),r.a.createElement(C,{searchChange:this.searchChange}),r.a.createElement("div",{className:"store-container"},this.state.inventory.length?r.a.createElement("div",{className:"item-container"},this.state.inventory.map(function(t){return r.a.createElement("div",{className:"item-card",key:t._id},r.a.createElement("p",null,t.name),r.a.createElement("img",{src:t.image,alt:t.name,onMouseOver:function(e){return e.currentTarget.src="".concat(t.image2)},onMouseOut:function(e){return e.currentTarget.src="".concat(t.image)}}),r.a.createElement("div",{className:"item-content"},r.a.createElement("p",null,t.category),r.a.createElement("span",null,"|"),r.a.createElement(y,{item:t,user:e.props.user,setUser:e.props.setUser})))})):r.a.createElement("div",null,"There are no items available for your search term.")))}}]),t}(r.a.Component),S=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).handleClick=function(){d.a.post("/api/store/wishlistremove",{user:a.props.user,item:a.props.item}).then(function(e){a.props.setUser(e.data)}).catch(function(e){return console.log(e)})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("button",{className:"wishlist-button",onClick:function(){return e.handleClick()}},"Remove from wishlist")}}]),t}(r.a.Component),k=function(e){function t(){return Object(c.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"wishlist-container"},r.a.createElement("h1",null,"Wishlist"),r.a.createElement("hr",null),this.props.user.wishlist.length?r.a.createElement("div",{className:"store-container"},r.a.createElement("div",{className:"item-container"},this.props.user.wishlist.map(function(t){return r.a.createElement("div",{className:"item-card",key:t._id},r.a.createElement("p",null,t.name),r.a.createElement("img",{src:t.image,alt:t.name,onMouseOver:function(e){return e.currentTarget.src="".concat(t.image2)},onMouseOut:function(e){return e.currentTarget.src="".concat(t.image)}}),r.a.createElement("div",{className:"item-content"},r.a.createElement("p",null,t.category),r.a.createElement("span",null,"|"),r.a.createElement(S,{item:t,user:e.props.user,removedItem:e.removedItem,setUser:e.props.setUser})))}))):r.a.createElement("div",{className:"empty-wishlist-message"},"Visit the store to add to your wishlist."))}}]),t}(r.a.Component),U=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",message:""},a.handleChange=function(e){a.setState({username:e.target.value})},a.handleClick=function(e){d.a.post("/api/auth/login",{username:a.state.username}).then(function(t){var n=t.data.message;return n?a.setState({message:n}):a.props.history.push("/".concat(e,"login/").concat(a.state.username))}).catch(function(e){return console.log(e)})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"auth-container"},r.a.createElement("div",{className:"auth-content-container login-home"},r.a.createElement("h1",null,"Login"),r.a.createElement("p",null,"Please enter your username:"),r.a.createElement("input",{type:"text",name:"username",onChange:this.handleChange}),r.a.createElement("button",{className:"button auth-button",onClick:function(){return e.handleClick("facial")}},"Facial Login"),r.a.createElement("button",{className:"button auth-button",onClick:function(){return e.handleClick("email")}},"Password Login"),this.state.message.length?r.a.createElement("button",{className:"error-message"},this.state.message):null))}}]),t}(r.a.Component),M=a(17),F=a.n(M),I=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={success:!1,url:""},a.handleChange=function(e){a.setState({success:!1,url:""})},a.handleUpload=function(e){!function(e){var t=new FileReader;t.readAsDataURL(e),t.onload=function(){a.props.exportFile(t.result)},t.onerror=function(e){console.log("Error: ",e)}}(a.uploadInput.files[0])},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("center",null,r.a.createElement("label",{htmlFor:"file",className:"auth-button file-choice"},"Choose a file"),r.a.createElement("input",{onChange:this.handleChange,ref:function(t){e.uploadInput=t},type:"file",name:"file",className:"input-file",id:"file"}),r.a.createElement("br",null),r.a.createElement("button",{className:"auth-button login-button",onClick:this.handleUpload},"Login")))}}]),t}(n.Component),P=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={errorMessage:"",mobile:!1},a.importUploadedFile=function(e){var t=window.location.href.split("/").reverse()[0];d.a.post("/api/auth/faciallogin",{username:t,image:e}).then(function(e){var t=e.data.message;return t?a.setState({errorMessage:t}):a.props.setUser(e.data)}).catch(function(e){return console.log(e)})},a.setRef=function(e){a.webcam=e},a.capture=function(){var e=window.location.href.split("/").reverse()[0],t=a.webcam.getScreenshot();d.a.post("/api/auth/faciallogin",{image:t,username:e}).then(function(e){var t,n=e.data.message;return n?a.setState({errorMessage:n}):(t=e.data,a.props.setUser(t),void a.props.history.push("/user"))}).catch(function(e){return console.log(e)})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&this.setState({mobile:!0})}},{key:"render",value:function(){return r.a.createElement("div",{className:"facial-auth-container"},r.a.createElement("div",{className:"facial-auth-content facial-login"},r.a.createElement("h1",null,"Facial Login"),r.a.createElement("hr",{className:"title-hr"}),this.state.mobile?null:r.a.createElement(F.a,{audio:!1,height:350,ref:this.setRef,screenshotFormat:"image/jpeg",width:350,videoConstraints:{width:1280,height:720,facingMode:"user"}}),this.state.errorMessage?r.a.createElement("button",{className:"error-message"},this.state.errorMessage):null,this.state.mobile?null:r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:"auth-button",id:"facial-login-capture",onClick:this.capture},"Capture photo & login"),r.a.createElement("hr",null),r.a.createElement("h4",null,"Or"),r.a.createElement("hr",null)),r.a.createElement(I,{exportFile:this.importUploadedFile})))}}]),t}(r.a.Component),x=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",password:"",message:""},a.handleChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(N.a)({},n,r))},a.handleSubmit=function(e){e.preventDefault(),d.a.post("/api/auth/emaillogin",{username:window.location.href.split("/").reverse()[0],password:a.state.password}).then(function(e){var t=e.data.message;if(t)return a.setState({message:t});a.props.setUser(e.data),a.props.history.push("/user")}).catch(function(e){console.log(e)})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"auth-container"},r.a.createElement("div",{className:"auth-content-container local-login"},r.a.createElement("h1",null,"Login"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("label",{htmlFor:"password"},"Password: "),r.a.createElement("input",{type:"password",name:"password",onChange:this.handleChange}),r.a.createElement("button",{className:"auth-button",type:"submit"},"Submit"),this.state.message?r.a.createElement("button",{className:"error-message"},this.state.message):null)))}}]),t}(r.a.Component),A=function(e){function t(){return Object(c.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"auth-container"},r.a.createElement("div",{className:"auth-content-container sign-up-home"},r.a.createElement("h1",null,"Signup"),r.a.createElement("p",null,"Sign up for a new account using one of the options below."),r.a.createElement(p.b,{to:"/facialsignup"},r.a.createElement("button",{className:"auth-button signup-auth"},"Sign up with a photo")),r.a.createElement(p.b,{to:"/localsignup"},r.a.createElement("button",{className:"auth-button signup-auth"},"Sign up with a password"))))}}]),t}(r.a.Component),L=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={success:!1,url:""},a.handleChange=function(e){a.setState({success:!1,url:""})},a.handleUpload=function(e){if(!a.props.username.length)return a.props.errorMessage("Please fill in username");var t=a.uploadInput.files[0]||a.props.capturedImage,n=t.name.split("."),r=n[0],s=n[1];d.a.post("/api/sign_s3",{fileName:r,fileType:s}).then(function(e){var n=e.data.data.returnData,l=n.signedRequest,c=n.url;a.setState({url:c});var i={headers:{"Content-Type":s,"x-amz-acl":"public-read"}};d.a.put(l,t,i).then(function(e){a.setState({success:!0}),d.a.post("/api/auth/facialsignup",{username:a.props.username,profileImg:"https://project3profileimages.s3.us-east-2.amazonaws.com/".concat(r)}).then(function(e){return e.data.message?a.props.redirect(!1,e.data.message):a.props.redirect(!0,e.data)})})}).catch(function(e){alert(JSON.stringify(e))})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("center",null,r.a.createElement("label",{htmlFor:"file",className:"auth-button file-choice"},"Choose a file"),r.a.createElement("input",{onChange:this.handleChange,ref:function(t){e.uploadInput=t},type:"file",name:"file",className:"input-file",id:"file"}),r.a.createElement("br",null),r.a.createElement("button",{className:"auth-button login-button",onClick:this.handleUpload},"Submit")))}}]),t}(n.Component),T=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={image:"",username:"",errorMessage:"",uploadImg:"",mobile:!1},a.handleChange=function(e){a.setState({username:e.target.value})},a.errorMessage=function(e){a.setState({errorMessage:e})},a.redirect=function(e,t){e?(a.props.setUser(t),a.props.history.push("/user")):a.setState({errorMessage:t})},a.setRef=function(e){a.webcam=e},a.capture=function(){if(!a.state.username.length)return a.setState({errorMessage:"Please enter a username"});var e=a.webcam.getScreenshot(),t=e.replace(/^data:image\/\w+;base64,/,""),n=a.state.username;fetch(e).then(function(e){return e.blob()}).then(function(e){var t=new FormData;e.lastModifiedDate=new Date,e.name="".concat(n,"-profile-image"),t.append("image",e,"name"),a.setState({uploadImg:e})}),a.setState({image:e,uploadImg:t})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&this.setState({mobile:!0})}},{key:"render",value:function(){return r.a.createElement("div",{className:"facial-auth-container"},r.a.createElement("div",{className:"facial-auth-content facial-signup"},r.a.createElement("h1",null,"Facial Signup"),r.a.createElement("hr",{className:"title-hr"}),r.a.createElement("p",null,"Please enter a username:"),r.a.createElement("input",{type:"text",name:"username",onChange:this.handleChange}),this.state.errorMessage.length?r.a.createElement("button",{className:"error-message"},this.state.errorMessage):null,this.state.image.length?r.a.createElement("img",{className:"captured-photo",src:this.state.image,width:"350px",alt:"profile"}):this.state.mobile?null:r.a.createElement(r.a.Fragment,null,r.a.createElement(F.a,{audio:!1,height:350,ref:this.setRef,screenshotFormat:"image/jpeg",width:350,videoConstraints:{width:1280,height:720,facingMode:"user"}}),r.a.createElement("button",{className:"auth-button",onClick:this.capture},"Capture photo")),this.state.mobile?null:r.a.createElement(r.a.Fragment,null,r.a.createElement("hr",null),r.a.createElement("h4",null,"Or"),r.a.createElement("hr",null)),r.a.createElement(L,{username:this.state.username,capturedImage:this.state.uploadImg,errorMessage:this.errorMessage,redirect:this.redirect,setUser:this.props.setUser})))}}]),t}(r.a.Component),D=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",password:"",gender:"Male",message:""},a.handleChange=function(e){var t=e.target,n=t.name,r=t.value;"Not specified"===r&&(r=""),a.setState(Object(N.a)({},n,r))},a.handleSubmit=function(e){e.preventDefault(),d.a.post("/api/auth/localsignup",{username:a.state.username,password:a.state.password,gender:a.state.gender}).then(function(e){var t=e.data.message;if(t)return a.setState({message:t});a.props.setUser(e.data),a.props.history.push("/user")}).catch(function(e){console.log(e)})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"auth-container"},r.a.createElement("div",{className:"auth-content-container local-sign-up"},r.a.createElement("h1",null,"Sign up"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("label",{htmlFor:"username"},"Username: "),r.a.createElement("input",{type:"text",name:"username",onChange:this.handleChange}),r.a.createElement("label",{htmlFor:"gender"},"Gender: "),r.a.createElement("select",{name:"gender",onChange:this.handleChange},r.a.createElement("option",{value:"Male"},"Male"),r.a.createElement("option",{value:"Female"},"Female"),r.a.createElement("option",{value:"Not specified"},"Not specified")),r.a.createElement("label",{htmlFor:"password"},"Password: "),r.a.createElement("input",{type:"password",name:"password",onChange:this.handleChange}),r.a.createElement("button",{className:"auth-button",type:"submit"},"Submit"),this.state.message?r.a.createElement("button",{className:"error-message"},this.state.message):null)))}}]),t}(r.a.Component),R=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={user:a.props.user},a.setUser=function(e){console.log(e),a.setState({user:e})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(f,{setUser:this.setUser,user:this.state.user}),r.a.createElement(h.d,null,r.a.createElement(h.b,{exact:!0,path:"/",component:b,user:this.state.user}),r.a.createElement(v,{exact:!0,path:"/user",redirectPath:"/login",user:this.state.user,component:O}),r.a.createElement(v,{exact:!0,path:"/store",redirectPath:"/login",setUser:this.setUser,user:this.state.user,component:w}),r.a.createElement(v,{exact:!0,path:"/wishlist",redirectPath:"/login",setUser:this.setUser,user:this.state.user,component:k}),r.a.createElement(v,{exact:!0,path:"/login",redirectPath:"/user",setUser:this.setUser,user:!this.state.user,component:U}),r.a.createElement(v,{exact:!0,path:"/faciallogin/:id",component:P,setUser:this.setUser,user:!this.state.user}),r.a.createElement(v,{exact:!0,path:"/emaillogin/:id",component:x,setUser:this.setUser,user:!this.state.user}),r.a.createElement(v,{exact:!0,path:"/signup",redirectPath:"/user",setUser:this.setUser,user:!this.state.user,component:A}),r.a.createElement(v,{exact:!0,path:"/localsignup",component:D,setUser:this.setUser,user:!this.state.user}),r.a.createElement(v,{exact:!0,path:"/facialsignup",component:T,setUser:this.setUser,user:!this.state.user}),r.a.createElement(v,{exact:!0,path:"/logout",component:b})))}}]),t}(r.a.Component);d.a.get("/api/auth/loggedin").then(function(e){l.a.render(r.a.createElement(p.a,null,r.a.createElement(R,{user:e.data})),document.getElementById("root"))}).catch(function(e){console.log(e)})}},[[30,1,2]]]);
//# sourceMappingURL=main.e7276f87.chunk.js.map