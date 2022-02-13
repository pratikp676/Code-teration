use demos;
let cons= db.getCollectionNames();
if(cons.includes('events')){
	print(db.events.drop());
}
db.createCollection("events");
db.events.insertMany([
    {
        topic:'Coding challenges',
        title:'Hackathon',
        host:'Pratik Patel',
        details:"Have you ever heard about Hackathon? Hackathon is basically 24 hours of hardcore coding challenge where you are given a problem from different domains to solve as soon as possible. If you want to get noticed by recruiters , Hackathon is one of the best ways.",
        location: 'Woodward Hall 102',
        date: '2021-10-20',
        start:'12:00',
        end:'12:30',
        imageURL:'https://www.founderpassion.org/wp-content/uploads/2017/09/hackathon-founderpassion-foundation.png',
    },
    {
        topic:'Workshops',
        title:'How to master HTML/CSS',
        host:'Pratik Patel',
        details:"Have you ever heard about Hackathon? Hackathon is basically 24 hours of hardcore coding challenge where you are given a problem from different domains to solve as soon as possible. If you want to get noticed by recruiters , Hackathon is one of the best ways.",
        location: 'Woodward Hall 102',
        date: '2021-10-30',
        start:'2:00',
        end:'5:00',
        imageURL:'https://m.media-amazon.com/images/I/41vtTHBoFPL._SX260_.jpg',
    },
    {
        topic:'Coding challenges',
        title:'Duke Coding Competition',
        host:'Shubham Patel',
        details:"Join the coding competition to win the exciting games.",
        location: 'Online',
        date: '2021-10-25',
        start:'12:00',
        end:'12:30',
        imageURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Duke_Athletics_logo.svg/1200px-Duke_Athletics_logo.svg.png',
    },
    {
        topic:'Workshops',
        title:'How to Hack',
        host:'Jeel Patel',
        details:"Start learning hacking by attending the workshop by famous hacker Sunny Vaghela",
        location: 'GTU 124',
        date: '2021-10-10',
        start:'2:00',
        end:'5:00',
        imageURL:'https://physicsworld.com/wp-content/uploads/2020/08/car-hacker-1197675498-iStock_peshkov-635x423.jpg'
    },
    {
        topic:'Coding challenges',
        title:'GTU Techfest Coding',
        host:'Suraj Patel',
        details:"Earn exciting certificates for your resume building.",
        location: 'GTU, Ahmedabad',
        date: '2021-11-20',
        start:'12:00',
        end:'12:30',
        imageURL:'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_techfest.jpg'
    },
    {
        topic:'Workshops',
        title:'Youtube content maker',
        host:'Vatsal Shah',
        details:"Earn by making good content on youtube and other social media plateforms.",
        location: 'Webx',
        date: '2021-07-30',
        start:'2:00',
        end:'5:00',
        imageURL:'https://lumen5.com/learn/wp-content/uploads/2019/08/7-Best-YouTube-Video-Editor-Tools-to-Make-Killer-YouTube-Videos.jpg'
    },

])