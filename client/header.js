let body = document.body
//create header
let header = document.createElement("header")
header.setAttribute('id','header')
body.appendChild(header)

//put contents in header
let navbar = document.createElement("nav")
navbar.setAttribute('id', 'nav')
header.appendChild(navbar)

let navbarContent = document.createElement("h3")
navbarContent.setAttribute('id', 'navleft')
let appName = document.createTextNode('HacktivGit')
navbarContent.appendChild(appName)
navbar.appendChild(navbarContent)

let author = document.createElement("h3")
author.setAttribute('id', 'navright')
let authorName = document.createTextNode('Nsamudera')
let authorimg = document.createElement('IMG')
authorimg.setAttribute("src","./assets/author.jpg")
author.appendChild(authorimg)
author.appendChild(authorName)
navbar.appendChild(author)