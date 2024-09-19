import axios from "axios";
import { API_END_POINT } from "../utils/constant";




const nowPlayingData=[     
    {
      "adult": false,
      "backdrop_path": "/mKOBdgaEFguADkJhfFslY7TYxIh.jpg",
      "genre_ids": [28, 878, 35, 12, 53],
      "id": 365177,
      "original_language": "en",
      "original_title": "Borderlands",
      "overview": "Returning to her home planet, an infamous bounty hunter forms an unexpected alliance with a team of unlikely heroes...",
      "popularity": 1376.577,
      "poster_path": "/865DntZzOdX6rLMd405R0nFkLmL.jpg",
      "release_date": "2024-08-07",
      "title": "Borderlands",
      "video": false,
      "vote_average": 5.838,
      "vote_count": 522
    },
    {
      "adult": false,
      "backdrop_path": "/cyKH7pDFlxIXluqRyNoHHEpxSDX.jpg",
      "genre_ids": [80, 28, 53],
      "id": 646097,
      "original_language": "en",
      "original_title": "Rebel Ridge",
      "overview": "A former Marine confronts corruption in a small town...",
      "popularity": 1132.247,
      "poster_path": "/xEt2GSz9z5rSVpIHMiGdtf0czyf.jpg",
      "release_date": "2024-08-27",
      "title": "Rebel Ridge",
      "video": false,
      "vote_average": 7.029,
      "vote_count": 564
    },
    {
      "adult": false,
      "backdrop_path": "/lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      "genre_ids": [16, 10751, 35, 28],
      "id": 519182,
      "original_language": "en",
      "original_title": "Despicable Me 4",
      "overview": "Gru and Lucy and their girls welcome a new member to the family...",
      "popularity": 1106.233,
      "poster_path": "/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      "release_date": "2024-06-20",
      "title": "Despicable Me 4",
      "video": false,
      "vote_average": 7.18,
      "vote_count": 1609
    },
    {
      "adult": false,
      "backdrop_path": "/cgKZtNSETjXJPkAQ4rasV7dnyQH.jpg",
      "genre_ids": [35, 14, 27],
      "id": 917496,
      "original_language": "en",
      "original_title": "Beetlejuice Beetlejuice",
      "overview": "After a family tragedy, three generations of the Deetz family return home to Winter River...",
      "popularity": 1032.671,
      "poster_path": "/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg",
      "release_date": "2024-09-04",
      "title": "Beetlejuice Beetlejuice",
      "video": false,
      "vote_average": 7.175,
      "vote_count": 566
    },
    {
      "adult": false,
      "backdrop_path": "/Asg2UUwipAdE87MxtJy7SQo08XI.jpg",
      "genre_ids": [28, 14, 27],
      "id": 957452,
      "original_language": "en",
      "original_title": "The Crow",
      "overview": "Soulmates Eric and Shelly are brutally murdered when the demons of her dark past catch up with them...",
      "popularity": 1058.32,
      "poster_path": "/58QT4cPJ2u2TqWZkterDq9q4yxQ.jpg",
      "release_date": "2024-08-21",
      "title": "The Crow",
      "video": false,
      "vote_average": 5.37,
      "vote_count": 234
    },
    {
      "adult": false,
      "backdrop_path": "/7aPrv2HFssWcOtpig5G3HEVk3uS.jpg",
      "genre_ids": [28, 12, 53],
      "id": 718821,
      "original_language": "en",
      "original_title": "Twisters",
      "overview": "As storm season intensifies, the paths of former storm chaser Kate Carter and Tyler Owens collide...",
      "popularity": 620.794,
      "poster_path": "/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg",
      "release_date": "2024-07-10",
      "title": "Twisters",
      "video": false,
      "vote_average": 6.985,
      "vote_count": 1404
    },
    {
      "adult": false,
      "backdrop_path": "/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg",
      "genre_ids": [27, 878, 28],
      "id": 945961,
      "original_language": "en",
      "original_title": "Alien: Romulus",
      "overview": "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face...",
      "popularity": 598.755,
      "poster_path": "/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
      "release_date": "2024-08-13",
      "title": "Alien: Romulus",
      "video": false,
      "vote_average": 7.1,
      "vote_count": 1005
    },
    {
      "adult": false,
      "backdrop_path": "/9BQqngPfwpeAfK7c2H3cwIFWIVR.jpg",
      "genre_ids": [10749, 18],
      "id": 1079091,
      "original_language": "en",
      "original_title": "It Ends with Us",
      "overview": "When a woman's first love suddenly reenters her life...",
      "popularity": 555.445,
      "poster_path": "/4TzwDWpLmb9bWJjlN3iBUdvgarw.jpg",
      "release_date": "2024-08-07",
      "title": "It Ends with Us",
      "video": false,
      "vote_average": 6.7,
      "vote_count": 304
    },
    {
      "adult": false,
      "backdrop_path": "/tCQfubckzzcuCbsGugkpLhfjS5z.jpg",
      "genre_ids": [28, 53, 80],
      "id": 970347,
      "original_language": "en",
      "original_title": "The Killer",
      "overview": "Zee is a feared contract killer known as 'the Queen of the Dead,' but when she refuses to murder a young blind woman...",
      "popularity": 492.997,
      "poster_path": "/6PCnxKZZIVRanWb710pNpYVkCSw.jpg",
      "release_date": "2024-08-22",
      "title": "The Killer",
      "video": false,
      "vote_average": 6.586,
      "vote_count": 203
    },
    {
      "adult": false,
      "backdrop_path": "/sIzZQdXY21sEks9lGkGuXzqdGSA.jpg",
      "genre_ids": [14, 35],
      "id": 4011,
      "original_language": "en",
      "original_title": "Beetlejuice",
      "overview": "A newly dead couple seeks help from a deranged demon exorcist...",
      "popularity": 542.116,
      "poster_path": "/nnl6OWkyPpuMm595hmAxNW3rZFn.jpg",
      "release_date": "1988-03-30",
      "title": "Beetlejuice",
      "video": false,
      "vote_average": 7.378,
      "vote_count": 7045
    },
    {
      "adult": false,
      "backdrop_path": "/bM4gNeDemQnY3TujjMe1usjt4iZ.jpg",
      "genre_ids": [878, 12],
      "id": 748167,
      "original_language": "en",
      "original_title": "Uglies",
      "overview": "In a futuristic dystopia with enforced beauty standards, a teen embarks on a journey to find her missing friend...",
      "popularity": 529.326,
      "poster_path": "/jaUu9zHtbcFwrB5Y1DNYE09HMex.jpg",
      "release_date": "2024-09-12",
      "title": "Uglies",
      "video": false,
      "vote_average": 6.35,
      "vote_count": 435
    },
   
  ]
  

// axios.post(`${API_END_POINT}/movies`, nowPlayingData)
// .then(response => console.log('Movies saved:', response.data))
// .catch(error => console.error('Error saving movies:', error));

export default nowPlayingData;